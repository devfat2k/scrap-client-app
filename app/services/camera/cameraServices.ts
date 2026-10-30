import { Linking } from "react-native"
import * as ImagePicker from "expo-image-picker"

import { PickerResult, ProcessedAsset } from "./cameraTypes"
import { compressAndNormalizeImage } from "./imageCompressor"
import { validateProcessedAsset, validateRawAsset } from "./imageValidator"

const defaultOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
  allowsEditing: false,
  quality: 0.9,
  exif: false,
  base64: false,
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message
  return String(error)
}

/**
 * Open device system settings when permissions are permanently blocked
 */
export async function openAppSettings(): Promise<void> {
  await Linking.openSettings()
}

/**
 * Processes, validates and normalizes raw assets selected by user
 */
async function processSelectedAssets(
  rawAssets: ImagePicker.ImagePickerAsset[],
): Promise<PickerResult> {
  const processedAssets: ProcessedAsset[] = []

  for (const rawAsset of rawAssets) {
    const rawValidation = validateRawAsset(rawAsset)
    if (!rawValidation.valid) {
      return {
        canceled: false,
        assets: [],
        errorCode: rawValidation.errorCode ?? "others",
        errorMessage: rawValidation.errorMessage,
      }
    }

    const compressed = await compressAndNormalizeImage(rawAsset)

    const processedValidation = validateProcessedAsset(compressed)
    if (!processedValidation.valid) {
      return {
        canceled: false,
        assets: [],
        errorCode: processedValidation.errorCode ?? "others",
        errorMessage: processedValidation.errorMessage,
      }
    }

    processedAssets.push(compressed)
  }

  return { canceled: false, assets: processedAssets }
}

/**
 * Pick a single image from the media library
 */
export async function pickImage(
  overrides: Partial<ImagePicker.ImagePickerOptions> = {},
): Promise<PickerResult> {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (!perm.granted) {
    return {
      canceled: false,
      assets: [],
      errorCode: "permission_denied",
      errorMessage: "Media library permission denied",
      canAskAgain: perm.canAskAgain,
    }
  }

  try {
    const res = await ImagePicker.launchImageLibraryAsync({
      ...defaultOptions,
      allowsMultipleSelection: false,
      ...overrides,
    })
    if (res.canceled) return { canceled: true, assets: [] }
    return await processSelectedAssets(res.assets ?? [])
  } catch (error: unknown) {
    return {
      canceled: false,
      assets: [],
      errorCode: "others",
      errorMessage: getErrorMessage(error),
    }
  }
}

/**
 * Pick multiple images from media library (defaults to max 3 for scrap pickup)
 */
export async function pickImages(
  maxPhotos = 3,
  overrides: Partial<ImagePicker.ImagePickerOptions> = {},
): Promise<PickerResult> {
  const perm = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (!perm.granted) {
    return {
      canceled: false,
      assets: [],
      errorCode: "permission_denied",
      errorMessage: "Media library permission denied",
      canAskAgain: perm.canAskAgain,
    }
  }

  try {
    const res = await ImagePicker.launchImageLibraryAsync({
      ...defaultOptions,
      allowsMultipleSelection: true,
      selectionLimit: maxPhotos,
      ...overrides,
    })
    if (res.canceled) return { canceled: true, assets: [] }
    return await processSelectedAssets(res.assets ?? [])
  } catch (error: unknown) {
    return {
      canceled: false,
      assets: [],
      errorCode: "others",
      errorMessage: getErrorMessage(error),
    }
  }
}

/**
 * Open camera to take a photo
 */
export async function takePhoto(
  overrides: Partial<ImagePicker.ImagePickerOptions> = {},
): Promise<PickerResult> {
  const perm = await ImagePicker.requestCameraPermissionsAsync()
  if (!perm.granted) {
    return {
      canceled: false,
      assets: [],
      errorCode: "permission_denied",
      errorMessage: "Camera permission denied",
      canAskAgain: perm.canAskAgain,
    }
  }

  try {
    const res = await ImagePicker.launchCameraAsync({
      ...defaultOptions,
      cameraType: ImagePicker.CameraType.back,
      ...overrides,
    })
    if (res.canceled) return { canceled: true, assets: [] }
    return await processSelectedAssets(res.assets ?? [])
  } catch (error: unknown) {
    return {
      canceled: false,
      assets: [],
      errorCode: "others",
      errorMessage: getErrorMessage(error),
    }
  }
}

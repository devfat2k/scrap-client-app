import { Linking } from "react-native"
import * as ImagePicker from "expo-image-picker"

import {
  ensureCameraPermission,
  ensureMediaLibraryPermission,
  permissionDeniedResult,
} from "./cameraPermissions"
import { PickerResult, ProcessedAsset } from "./cameraTypes"
import { compressAndNormalizeImage } from "./imageCompressor"
import { validateProcessedAsset, validateRawAsset } from "./imageValidator"

const defaultOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: false,
  quality: 0.9,
  exif: false,
  base64: false,
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error)
}

export async function openAppSettings(): Promise<void> {
  await Linking.openSettings()
}

async function processSelectedAssets(
  rawAssets: ImagePicker.ImagePickerAsset[],
): Promise<PickerResult> {
  const processedAssets: ProcessedAsset[] = []
  for (const rawAsset of rawAssets) {
    const rawVal = validateRawAsset(rawAsset)
    if (!rawVal.valid) {
      return {
        canceled: false,
        assets: [],
        errorCode: rawVal.errorCode ?? "others",
        errorMessage: rawVal.errorMessage,
      }
    }
    try {
      const compressed = await compressAndNormalizeImage(rawAsset)
      const postVal = validateProcessedAsset(compressed)
      if (!postVal.valid) {
        return {
          canceled: false,
          assets: [],
          errorCode: postVal.errorCode ?? "others",
          errorMessage: postVal.errorMessage,
        }
      }
      processedAssets.push(compressed)
    } catch (error: unknown) {
      return {
        canceled: false,
        assets: [],
        errorCode: "others",
        errorMessage: getErrorMessage(error),
      }
    }
  }
  return { canceled: false, assets: processedAssets }
}

async function requestMediaLibraryPermissionQuietly(): Promise<ImagePicker.PermissionResponse | null> {
  try {
    return await ensureMediaLibraryPermission()
  } catch {
    // The system picker still works on iOS 14+ even when the permission API fails.
    return null
  }
}

export async function pickImage(
  overrides: Partial<ImagePicker.ImagePickerOptions> = {},
): Promise<PickerResult> {
  await requestMediaLibraryPermissionQuietly()
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

export async function pickImages(
  maxPhotos = 3,
  overrides: Partial<ImagePicker.ImagePickerOptions> = {},
): Promise<PickerResult> {
  await requestMediaLibraryPermissionQuietly()
  try {
    const res = await ImagePicker.launchImageLibraryAsync({
      ...defaultOptions,
      allowsMultipleSelection: true,
      selectionLimit: maxPhotos,
      ...overrides,
    })
    if (res.canceled) return { canceled: true, assets: [] }
    return await processSelectedAssets((res.assets ?? []).slice(0, maxPhotos))
  } catch (error: unknown) {
    return {
      canceled: false,
      assets: [],
      errorCode: "others",
      errorMessage: getErrorMessage(error),
    }
  }
}

export async function takePhoto(
  overrides: Partial<ImagePicker.ImagePickerOptions> = {},
): Promise<PickerResult> {
  const perm = await ensureCameraPermission()
  if (!perm.granted) return permissionDeniedResult("camera", perm.canAskAgain)
  try {
    const res = await ImagePicker.launchCameraAsync({
      ...defaultOptions,
      cameraType: ImagePicker.CameraType.back,
      ...overrides,
    })
    if (res.canceled) return { canceled: true, assets: [] }
    return await processSelectedAssets(res.assets ?? [])
  } catch (error: unknown) {
    const msg = getErrorMessage(error)
    const isUnavailable = msg.toLowerCase().includes("camera not available")
    return {
      canceled: false,
      assets: [],
      errorCode: isUnavailable ? "camera_unavailable" : "others",
      errorMessage: msg,
    }
  }
}

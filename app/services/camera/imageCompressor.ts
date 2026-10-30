import * as ImageManipulator from "expo-image-manipulator"
import type * as ImagePicker from "expo-image-picker"

import { ProcessedAsset } from "./cameraTypes"

const MAX_DIMENSION = 1600
const COMPRESS_QUALITY = 0.8

/**
 * Calculates resize action keeping aspect ratio with maximum dimension capped
 */
function getResizeAction(width: number, height: number): ImageManipulator.ActionResize | null {
  if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) {
    return null
  }

  if (width >= height) {
    return { resize: { width: MAX_DIMENSION } }
  }

  return { resize: { height: MAX_DIMENSION } }
}

/**
 * Compress and normalize an ImagePicker asset to standard dimensions and format
 */
export async function compressAndNormalizeImage(
  asset: ImagePicker.ImagePickerAsset,
): Promise<ProcessedAsset> {
  const actions: ImageManipulator.Action[] = []
  const resizeAction = getResizeAction(asset.width, asset.height)
  if (resizeAction) {
    actions.push(resizeAction)
  }

  try {
    const result = await ImageManipulator.manipulateAsync(asset.uri, actions, {
      compress: COMPRESS_QUALITY,
      format: ImageManipulator.SaveFormat.JPEG,
    })

    return {
      uri: result.uri,
      width: result.width,
      height: result.height,
      fileName: asset.fileName ?? "photo.jpg",
      mimeType: "image/jpeg",
      fileSize: (result as { fileSize?: number }).fileSize ?? asset.fileSize,
    }
  } catch {
    // ponytail: fallback to original asset when manipulation fails to prevent user flow disruption
    return {
      uri: asset.uri,
      width: asset.width,
      height: asset.height,
      fileName: asset.fileName ?? undefined,
      mimeType: asset.mimeType ?? "image/jpeg",
      fileSize: asset.fileSize,
    }
  }
}

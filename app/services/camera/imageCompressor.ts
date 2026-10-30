import * as ImageManipulator from "expo-image-manipulator"
import type * as ImagePicker from "expo-image-picker"

import { ProcessedAsset } from "./cameraTypes"

const MAX_DIMENSION = 1600
const COMPRESS_QUALITY = 0.8

function getResizeAction(width: number, height: number): ImageManipulator.ActionResize | null {
  if (width <= MAX_DIMENSION && height <= MAX_DIMENSION) return null
  if (width >= height) return { resize: { width: MAX_DIMENSION } }
  return { resize: { height: MAX_DIMENSION } }
}

async function getFileSizeFromUri(uri: string): Promise<number | undefined> {
  try {
    const res = await fetch(uri)
    const blob = await res.blob()
    return blob.size
  } catch {
    return undefined
  }
}

/**
 * Compress and normalize an ImagePicker asset to standard dimensions and format
 */
export async function compressAndNormalizeImage(
  asset: ImagePicker.ImagePickerAsset,
): Promise<ProcessedAsset> {
  const actions: ImageManipulator.Action[] = []
  const resizeAction = getResizeAction(asset.width, asset.height)
  if (resizeAction) actions.push(resizeAction)

  const result = await ImageManipulator.manipulateAsync(asset.uri, actions, {
    compress: COMPRESS_QUALITY,
    format: ImageManipulator.SaveFormat.JPEG,
  })

  const actualSize = await getFileSizeFromUri(result.uri)

  return {
    uri: result.uri,
    width: result.width,
    height: result.height,
    fileName: asset.fileName ?? "photo.jpg",
    mimeType: "image/jpeg",
    fileSize: actualSize ?? asset.fileSize,
  }
}

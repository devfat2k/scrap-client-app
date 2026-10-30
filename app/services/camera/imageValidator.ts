import type * as ImagePicker from "expo-image-picker"

import {
  ALLOWED_MIME_TYPES,
  MAX_PROCESSED_FILE_SIZE,
  MAX_RAW_FILE_SIZE,
  ProcessedAsset,
  ValidationResult,
} from "./cameraTypes"

/**
 * Validate raw asset returned by ImagePicker before any heavy processing
 */
export function validateRawAsset(asset: ImagePicker.ImagePickerAsset): ValidationResult {
  if (asset.fileSize && asset.fileSize > MAX_RAW_FILE_SIZE) {
    return {
      valid: false,
      errorCode: "file_too_large",
      errorMessage: "Photo exceeds 10MB limit. Please select a smaller photo.",
    }
  }

  if (asset.mimeType && !ALLOWED_MIME_TYPES.includes(asset.mimeType.toLowerCase())) {
    return {
      valid: false,
      errorCode: "invalid_format",
      errorMessage: "Unsupported format. Only JPG, PNG, HEIC, and WEBP are allowed.",
    }
  }

  return { valid: true }
}

/**
 * Validate processed asset after compression to ensure server acceptance
 */
export function validateProcessedAsset(asset: ProcessedAsset): ValidationResult {
  if (asset.fileSize && asset.fileSize > MAX_PROCESSED_FILE_SIZE) {
    return {
      valid: false,
      errorCode: "file_too_large",
      errorMessage: "Processed image still exceeds 2MB limit. Please choose a different photo.",
    }
  }

  return { valid: true }
}

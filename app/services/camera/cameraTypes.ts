export interface ProcessedAsset {
  uri: string
  width: number
  height: number
  fileName?: string
  mimeType?: string
  fileSize?: number
}

export type PickerErrorCode =
  "camera_unavailable" | "permission_denied" | "file_too_large" | "invalid_format" | "others"

export interface PickerResultOk {
  canceled: false
  assets: ProcessedAsset[]
}

export interface PickerResultCancelled {
  canceled: true
  assets: []
}

export interface PickerResultError {
  canceled: false
  assets: []
  errorCode: PickerErrorCode
  errorMessage?: string
  canAskAgain?: boolean
}

export type PickerResult = PickerResultOk | PickerResultCancelled | PickerResultError

export interface ValidationResult {
  valid: boolean
  errorCode?: PickerErrorCode
  errorMessage?: string
}

export const MAX_RAW_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const MAX_PROCESSED_FILE_SIZE = 2 * 1024 * 1024 // 2MB
export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/heic", "image/webp"]

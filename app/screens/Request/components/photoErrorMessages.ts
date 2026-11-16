import type { TxKeyPath } from "@/i18n"
import type { PickerErrorCode } from "@/services/camera"

/**
 * i18n message for each picker error code.
 */
export const PHOTO_ERROR_TX: Record<PickerErrorCode, TxKeyPath> = {
  camera_unavailable: "request:photoErrors.cameraUnavailable",
  permission_denied: "request:photoErrors.permissionDenied",
  file_too_large: "request:photoErrors.fileTooLarge",
  invalid_format: "request:photoErrors.invalidFormat",
  others: "request:photoErrors.generic",
}

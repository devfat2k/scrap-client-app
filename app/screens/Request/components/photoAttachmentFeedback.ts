import { Alert } from "react-native"

import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import type { PickerErrorCode } from "@/services/camera"
import { openAppSettings } from "@/services/camera"

export type PhotoSource = "camera" | "library"

/**
 * Explains why the picker cannot open and, when iOS will no longer prompt,
 * gives the user a direct route to the app settings.
 */
export function showPermissionAlert(source: PhotoSource, canAskAgain?: boolean) {
  const title = translate(
    source === "camera"
      ? "request:photoErrors.cameraPermissionTitle"
      : "request:photoErrors.permissionTitle",
  )

  if (canAskAgain === false) {
    Alert.alert(title, translate("request:photoErrors.permissionBlockedMessage"), [
      { text: translate("common:cancel"), style: "cancel" },
      {
        text: translate("request:photoErrors.openSettings"),
        onPress: () => {
          void openAppSettings()
        },
      },
    ])
    return
  }

  Alert.alert(title, translate("request:photoErrors.permissionMessage"), [
    { text: translate("common:ok") },
  ])
}

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

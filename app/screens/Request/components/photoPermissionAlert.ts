import { Alert } from "react-native"

import { translate } from "@/i18n/translate"
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

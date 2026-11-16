import * as ImagePicker from "expo-image-picker"

import type { PickerResultError } from "./cameraTypes"

/**
 * Checks the current status first so iOS only shows its system prompt when it can,
 * and a permanently denied permission is reported without a useless request.
 */
async function ensurePermission(
  get: () => Promise<ImagePicker.PermissionResponse>,
  request: () => Promise<ImagePicker.PermissionResponse>,
): Promise<ImagePicker.PermissionResponse> {
  const current = await get()
  if (current.granted || !current.canAskAgain) return current
  return request()
}

export function ensureMediaLibraryPermission(): Promise<ImagePicker.PermissionResponse> {
  return ensurePermission(
    ImagePicker.getMediaLibraryPermissionsAsync,
    ImagePicker.requestMediaLibraryPermissionsAsync,
  )
}

export function ensureCameraPermission(): Promise<ImagePicker.PermissionResponse> {
  return ensurePermission(
    ImagePicker.getCameraPermissionsAsync,
    ImagePicker.requestCameraPermissionsAsync,
  )
}

export function permissionDeniedResult(
  permission: "library" | "camera",
  canAskAgain: boolean,
): PickerResultError {
  const label = permission === "camera" ? "Camera" : "Media library"
  return {
    canceled: false,
    assets: [],
    errorCode: "permission_denied",
    errorMessage: `${label} permission denied`,
    canAskAgain,
  }
}

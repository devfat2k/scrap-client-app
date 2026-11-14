import { StyleProp, ViewStyle } from "react-native"
import Toast from "react-native-toast-message"

export type IToastType =
  | "SUCCESS"
  | "ERROR"
  | "WARNING"
  | "NORMAL"
  | "CUSTOM"
  | "success"
  | "error"
  | "warning"
  | "normal"
  | "custom"

export type IToastPosition = "TOP" | "BOTTOM" | "top" | "bottom"

export interface ShowToastOptions {
  message?: string
  subtitle?: string
  type?: IToastType
  position?: IToastPosition
  duration?: number
  animationDuration?: number
  style?: StyleProp<ViewStyle>
  onPress?: () => void
}

const TYPE_MAP: Record<string, string> = {
  success: "success",
  error: "error",
  danger: "error",
  warning: "warning",
  normal: "normal",
  custom: "custom",
}

function resolveToastType(type?: IToastType): string {
  if (!type) return "normal"
  const normalized = type.toLowerCase()
  return TYPE_MAP[normalized] ?? "normal"
}

function resolveToastPosition(position?: IToastPosition): "top" | "bottom" {
  if (!position) return "top"
  return position.toLowerCase() === "bottom" ? "bottom" : "top"
}

/**
 * Shows global toast notification.
 * Hides previous toast to prevent stacking.
 */
export function showToast({
  message = "System notification",
  subtitle,
  type = "NORMAL",
  position = "TOP",
  duration = 2000,
  animationDuration = 250,
  style,
  onPress,
}: ShowToastOptions): void {
  Toast.hide()

  Toast.show({
    type: resolveToastType(type),
    text1: message,
    text2: subtitle,
    position: resolveToastPosition(position),
    visibilityTime: duration,
    onPress,
    props: {
      style,
      animationDuration,
    },
  })
}

/**
 * Immediately hides currently active toast.
 */
export function hideToast(): void {
  Toast.hide()
}

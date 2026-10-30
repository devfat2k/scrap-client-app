import { Platform } from "react-native"
import * as Application from "expo-application"

export const APP_HEADERS = {
  "X-App-Version": Application.nativeApplicationVersion ?? "unknown",
  "X-Platform": Platform.OS,
} as const

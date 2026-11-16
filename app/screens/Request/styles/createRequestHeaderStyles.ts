import { StyleSheet } from "react-native"
import type { ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

/**
 * Thin divider under the shared Header; the form scrolls beneath it.
 */
export const $header: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: colors.separator,
})

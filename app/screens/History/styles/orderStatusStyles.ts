import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $statusRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

export const $statusText: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.medium,
})

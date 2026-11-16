import { StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingTop: spacing.md,
  paddingBottom: spacing.xxxl + spacing.xxl,
  gap: spacing.md,
})

export const $header: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxxs,
})

export const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $subtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $list: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

export const $empty: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxl,
})

export const $row: ThemedStyle<ViewStyle> = ({ colors, isDark, spacing }) => ({
  borderWidth: 1,
  borderColor: colors.border,
  borderStartWidth: spacing.xxs,
  borderRadius: spacing.md,
  backgroundColor: colors.card,
  padding: spacing.md,
  shadowColor: isDark ? colors.palette.neutral200 : colors.palette.neutral900,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
})

export const $rowPressed: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.7 : 0.6,
})

export const $rowBody: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xxs,
})

export const $rowHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.sm,
})

export const $rowId: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $rowDivider: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: StyleSheet.hairlineWidth,
  backgroundColor: colors.separator,
  marginVertical: spacing.xs,
})

export const $rowAddress: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.text,
  fontFamily: typography.primary.medium,
})

export const $rowItems: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $rowFooter: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.sm,
  marginTop: spacing.xs,
})

export const $rowMeta: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $chevron: ViewStyle = {
  transform: [{ rotate: "-90deg" }],
}

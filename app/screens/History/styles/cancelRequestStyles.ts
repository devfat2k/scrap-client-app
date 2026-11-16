import { StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

/**
 * Destructive outline button under the detail cards.
 */
export const $cancelButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginTop: spacing.sm,
  borderColor: colors.error,
  backgroundColor: colors.errorBackground,
})

export const $cancelButtonPressed: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.errorBackground,
  opacity: 0.8,
})

export const $cancelButtonDisabled: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.45 : 0.5,
})

export const $cancelText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.error,
})

/**
 * Cancel reason sheet.
 */
export const $sheet: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.card,
  borderTopStartRadius: spacing.md,
  borderTopEndRadius: spacing.md,
})

export const $handle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: spacing.xxl,
  height: spacing.xxs,
  borderRadius: spacing.xxs,
  backgroundColor: colors.palette.neutral400,
})

export const $sheetContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xs,
  paddingBottom: spacing.md,
})

export const $sheetTitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.text,
  paddingBottom: spacing.xxs,
})

export const $sheetMessage: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  paddingBottom: spacing.sm,
})

export const $reasonRow: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: spacing.xxl,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.sm,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: colors.separator,
  paddingVertical: spacing.xs,
})

export const $reasonPressed: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.7 : 0.6,
})

export const $reasonText: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.text,
})

export const $reasonTextSelected: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.tint,
  fontFamily: typography.primary.semiBold,
})

export const $sheetActions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
  marginTop: spacing.md,
})

export const $confirmButton: ThemedStyle<ViewStyle> = ({ colors, isDark }) => ({
  backgroundColor: isDark ? colors.palette.angry100 : colors.error,
})

export const $confirmButtonPressed: ThemedStyle<ViewStyle> = ({ colors, isDark }) => ({
  backgroundColor: isDark ? colors.palette.angry100 : colors.error,
  opacity: 0.85,
})

export const $confirmText: ThemedStyle<TextStyle> = ({ isDark, colors }) => ({
  color: isDark ? colors.palette.neutral900 : colors.palette.neutral100,
})

export const $confirmButtonDisabled: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.45 : 0.5,
})

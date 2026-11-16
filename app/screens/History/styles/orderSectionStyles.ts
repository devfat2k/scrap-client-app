import { StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

/**
 * Shared chrome for the collection and scrap sections.
 */
export const $sectionCard: ThemedStyle<ViewStyle> = ({ colors, isDark, spacing }) => ({
  padding: spacing.md,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.md,
  backgroundColor: colors.card,
  shadowColor: isDark ? colors.palette.neutral200 : colors.palette.neutral900,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 2,
})

export const $sectionTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $sectionDivider: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: StyleSheet.hairlineWidth,
  backgroundColor: colors.separator,
  marginTop: spacing.xs,
  marginBottom: spacing.md,
})

/**
 * Collection rows.
 */
export const $infoList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

export const $infoRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.sm,
})

export const $infoIcon: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xxxs,
})

export const $infoBody: ViewStyle = {
  flex: 1,
}

export const $infoText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $infoSubtext: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $infoLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $timePanel: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginTop: spacing.md,
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
  padding: spacing.sm,
  borderRadius: spacing.sm,
  backgroundColor: colors.palette.neutral300,
})

export const $timePanelConfirmed: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderWidth: 1,
  borderColor: colors.palette.primary200,
  backgroundColor: colors.palette.primary100,
})

export const $timeValue: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.text,
  marginTop: spacing.xxxs,
})

export const $volumeText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginTop: spacing.sm,
})

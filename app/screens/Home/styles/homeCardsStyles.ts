import { StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $quickActions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

export const $quickAction: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flex: 1,
  gap: spacing.xs,
  padding: spacing.md,
  backgroundColor: colors.card,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.md,
})

export const $quickActionPressed: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.7 : 0.6,
})

export const $quickActionIcon: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  width: spacing.xl,
  height: spacing.xl,
  borderRadius: spacing.md,
})

export const $quickActionIconPrimary: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.primary100,
})

export const $quickActionIconSecondary: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.secondary100,
})

export const $quickActionTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $quickActionHint: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $recentSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.xs,
})

export const $recentTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $recentCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  padding: spacing.md,
  backgroundColor: colors.card,
  borderWidth: 1,
  borderColor: colors.border,
  borderStartWidth: spacing.xxs,
  borderRadius: spacing.md,
})

export const $recentPressed: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.7 : 0.6,
})

export const $recentHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.sm,
})

export const $recentId: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $recentStatus: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

export const $recentStatusText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $recentDivider: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: StyleSheet.hairlineWidth,
  backgroundColor: colors.separator,
  marginVertical: spacing.xs,
})

export const $recentAddress: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.text,
  fontFamily: typography.primary.medium,
})

export const $recentMeta: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $recentFooter: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.sm,
  marginTop: spacing.xs,
})

export const $chevron: ViewStyle = {
  transform: [{ rotate: "-90deg" }],
}

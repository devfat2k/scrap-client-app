import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 1,
  paddingHorizontal: spacing.md,
  paddingTop: spacing.md,
  // Leaves room for the floating tab bar and the home indicator.
  paddingBottom: spacing.xxxl + spacing.xxl,
  gap: spacing.lg,
})

export const $topBar: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.sm,
})

export const $greetingBlock: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flex: 1,
  gap: spacing.xxxs,
})

export const $greeting: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $greetingSubtitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $headerActions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

export const $actionButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  width: spacing.xxl - spacing.xxs,
  height: spacing.xxl - spacing.xxs,
  borderRadius: (spacing.xxl - spacing.xxs) / 2,
  backgroundColor: colors.card,
  borderWidth: 1,
  borderColor: colors.border,
})

export const $actionButtonPressed: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.7 : 0.6,
})

export const $hero: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.palette.primary100,
  borderColor: colors.palette.primary200,
  borderRadius: spacing.md,
  borderWidth: 1,
  padding: spacing.lg,
  gap: spacing.sm,
})

export const $badge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  alignItems: "center",
  alignSelf: "flex-start",
  backgroundColor: colors.palette.primary200,
  borderRadius: (spacing.xxl + spacing.xs) / 2,
  height: spacing.xxl + spacing.xs,
  justifyContent: "center",
  width: spacing.xxl + spacing.xs,
})

export const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $subtitle: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  marginBottom: spacing.xs,
})

export const $cta: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.sm,
})

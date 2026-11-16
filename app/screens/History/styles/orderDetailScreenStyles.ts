import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const $screen: ViewStyle = {
  flex: 1,
}

export const $header: ThemedStyle<ViewStyle> = ({ colors, isDark }) => ({
  shadowColor: isDark ? colors.palette.neutral200 : colors.palette.neutral900,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 4,
  elevation: 3,
})

export const $headerTitle: ThemedStyle<TextStyle> = ({ typography }) => ({
  fontFamily: typography.primary.semiBold,
})

export const $headerStatus: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingRight: spacing.md,
})

export const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingTop: spacing.md,
  paddingBottom: spacing.xxxl,
  gap: spacing.lg,
})

export const $metaLine: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $notFoundIcon: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
})

export const $offlineBanner: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderWidth: 1,
  borderColor: colors.palette.accent300,
  backgroundColor: colors.palette.accent100,
  borderRadius: spacing.sm,
  padding: spacing.sm,
  gap: spacing.xxxs,
})

export const $offlineTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.accent500,
})

export const $offlineText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.accent500,
})

export const $notFound: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexGrow: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.lg,
  gap: spacing.sm,
})

export const $notFoundMessage: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  textAlign: "center",
})

export const $notFoundTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  textAlign: "center",
})

export const $notFoundButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignSelf: "stretch",
  marginTop: spacing.sm,
})

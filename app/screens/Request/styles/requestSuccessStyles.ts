import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

/**
 * Scroll content for the request success screen.
 */
export const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xxl,
  paddingBottom: spacing.lg,
  gap: spacing.lg,
})

export const $hero: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  gap: spacing.sm,
})

export const $successCircle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => {
  const size = spacing.xxxl + spacing.xl

  return {
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.palette.primary500,
  }
}

export const $title: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
  textAlign: "center",
})

export const $message: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.textDim,
  textAlign: "center",
  paddingHorizontal: spacing.sm,
})

export const $requestIdPill: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  marginTop: spacing.xxs,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xxs,
  borderRadius: spacing.xs,
  backgroundColor: colors.palette.primary100,
})

export const $requestIdText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary600,
})

export const $ecoCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderWidth: 1,
  borderRadius: spacing.sm,
  borderColor: colors.palette.primary200,
  backgroundColor: colors.palette.primary100,
  padding: spacing.md,
  gap: spacing.xs,
})

export const $ecoHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

export const $ecoTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.primary600,
})

export const $ecoText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $actions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

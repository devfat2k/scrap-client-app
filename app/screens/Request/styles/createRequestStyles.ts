import type { ImageStyle, TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

/**
 * Shared surface for pressable form fields (select, date/time, read-only).
 */
export const $fieldSurface: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: spacing.xxl,
  borderWidth: 1,
  borderRadius: spacing.xs,
  borderColor: colors.palette.neutral400,
  backgroundColor: colors.palette.neutral200,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.sm,
  justifyContent: "center",
})

export const $fieldSurfaceError: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderColor: colors.error,
})

export const $fieldSurfaceDisabled: ThemedStyle<ViewStyle> = ({ colors }) => ({
  backgroundColor: colors.palette.neutral300,
})

export const $fieldSurfacePressed: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.7 : 0.6,
})

export const $fieldRow: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

export const $fieldValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.text,
})

export const $fieldPlaceholder: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.textDim,
})

export const $fieldIcon: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginStart: spacing.xs,
})

/**
 * Photo attachment grid.
 */
export const $photoGrid: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  flexWrap: "wrap",
  gap: spacing.xs,
})

export const $photoThumb: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: spacing.xxxl,
  height: spacing.xxxl,
  borderRadius: 4,
  backgroundColor: colors.palette.neutral300,
})

export const $photoThumbImage: ImageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 4,
}

export const $photoRemoveButton: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  top: spacing.xxxs,
  end: spacing.xxxs,
  width: spacing.lg,
  height: spacing.lg,
  borderRadius: spacing.sm,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.palette.overlay50,
})

export const $photoAddTile: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: spacing.xxxl,
  height: spacing.xxxl,
  borderRadius: 4,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: colors.palette.neutral500,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.card,
})

export const $photoAddTileDisabled: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.5 : 0.4,
})

export const $photoAddIcon: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $photoHelper: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})

/**
 * Scrap item card.
 */
export const $scrapCard: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.card,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: spacing.xs,
  padding: spacing.md,
  gap: spacing.sm,
})

export const $scrapCardHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.xs,
})

export const $scrapCardTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.text,
})

export const $scrapRemoveButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  width: spacing.lg,
  height: spacing.lg,
  alignItems: "center",
  justifyContent: "center",
})

export const $scrapFieldRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

export const $scrapFieldItem: ViewStyle = {
  flex: 1,
}

export const $addScrapButton: ThemedStyle<ViewStyle> = ({ colors }) => ({
  borderStyle: "dashed",
  borderColor: colors.palette.neutral500,
  backgroundColor: colors.transparent,
})

export const $addScrapPlus: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $scrapList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.md,
})

/**
 * Create request screen layout.
 */
export const $formScreen: ViewStyle = {
  flex: 1,
}

export const $formContent: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingTop: spacing.md,
  // Leaves room for the sticky submit bar at the bottom of the scroll view.
  paddingBottom: spacing.xxl + spacing.xl,
  gap: spacing.lg,
})

export const $offlineBanner: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  borderWidth: 1,
  borderRadius: spacing.xs,
  borderColor: colors.palette.accent300,
  backgroundColor: colors.palette.accent100,
  padding: spacing.sm,
  gap: spacing.xxxs,
})

export const $offlineTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.accent500,
})

export const $offlineText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.accent500,
})

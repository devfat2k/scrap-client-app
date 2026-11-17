import type { ImageStyle, TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  /**
   * Shared surface for pressable form fields (select, date/time, read-only).
   */
  $fieldSurface: (({ colors, spacing }) => ({
    height: spacing.xxl,
    borderWidth: 1,
    borderRadius: spacing.xs,
    borderColor: colors.palette.neutral400,
    backgroundColor: colors.palette.neutral200,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    justifyContent: "center",
  })) as ThemedStyle<ViewStyle>,

  $fieldSurfaceError: (({ colors }) => ({
    borderColor: colors.error,
  })) as ThemedStyle<ViewStyle>,

  $fieldSurfaceDisabled: (({ colors }) => ({
    backgroundColor: colors.palette.neutral300,
  })) as ThemedStyle<ViewStyle>,

  $fieldSurfacePressed: (({ isDark }) => ({
    opacity: isDark ? 0.7 : 0.6,
  })) as ThemedStyle<ViewStyle>,

  $fieldRow: {
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  $fieldValue: (({ colors }) => ({
    flex: 1,
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $fieldPlaceholder: (({ colors }) => ({
    flex: 1,
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $fieldIcon: (({ spacing }) => ({
    marginStart: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  /**
   * Photo attachment grid.
   */
  $photoGrid: (({ spacing }) => ({
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $photoThumb: (({ colors, spacing }) => ({
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: 4,
    backgroundColor: colors.palette.neutral300,
  })) as ThemedStyle<ViewStyle>,

  $photoThumbImage: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  } as ImageStyle,

  $photoRemoveButton: (({ colors, spacing }) => ({
    position: "absolute",
    top: spacing.xxxs,
    end: spacing.xxxs,
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.palette.overlay50,
  })) as ThemedStyle<ViewStyle>,

  $photoAddTile: (({ colors, spacing }) => ({
    width: spacing.xxxl,
    height: spacing.xxxl,
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.palette.neutral500,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.card,
  })) as ThemedStyle<ViewStyle>,

  $photoAddTileDisabled: (({ isDark }) => ({
    opacity: isDark ? 0.5 : 0.4,
  })) as ThemedStyle<ViewStyle>,

  $photoAddIcon: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $photoHelper: (({ spacing }) => ({
    marginTop: spacing.xs,
  })) as ThemedStyle<TextStyle>,

  /**
   * Scrap item card.
   */
  $scrapCard: (({ colors, spacing }) => ({
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: spacing.xs,
    padding: spacing.md,
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $scrapCardHeader: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $scrapCardTitle: (({ colors }) => ({
    flex: 1,
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $scrapRemoveButton: (({ spacing }) => ({
    width: spacing.lg,
    height: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  })) as ThemedStyle<ViewStyle>,

  $scrapFieldRow: (({ spacing }) => ({
    flexDirection: "row",
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $scrapFieldItem: {
    flex: 1,
  } as ViewStyle,

  $addScrapButton: (({ colors }) => ({
    borderStyle: "dashed",
    borderColor: colors.palette.neutral500,
    backgroundColor: colors.transparent,
  })) as ThemedStyle<ViewStyle>,

  $addScrapPlus: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $scrapList: (({ spacing }) => ({
    gap: spacing.md,
  })) as ThemedStyle<ViewStyle>,
}

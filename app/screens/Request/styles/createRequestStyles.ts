import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing, isDark }: Theme) =>
  ({
    fieldSurface: {
      height: spacing.xxl,
      borderWidth: 1,
      borderRadius: spacing.xs,
      borderColor: colors.palette.neutral400,
      backgroundColor: colors.palette.neutral200,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
      justifyContent: "center",
    },
    fieldSurfaceError: {
      borderColor: colors.error,
    },
    fieldSurfaceDisabled: {
      backgroundColor: colors.palette.neutral300,
    },
    fieldSurfacePressed: {
      opacity: isDark ? 0.7 : 0.6,
    },
    fieldRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    fieldValue: {
      flex: 1,
    },
    fieldPlaceholder: {
      flex: 1,
      color: colors.textDim,
    },
    fieldIcon: {
      marginStart: spacing.xs,
    },
    photoGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
    },
    photoThumb: {
      width: spacing.xxxl,
      height: spacing.xxxl,
      borderRadius: 4,
      backgroundColor: colors.palette.neutral300,
    },
    photoThumbImage: {
      width: "100%",
      height: "100%",
      borderRadius: 4,
    },
    photoRemoveButton: {
      position: "absolute",
      top: spacing.xxxs,
      end: spacing.xxxs,
      width: spacing.lg,
      height: spacing.lg,
      borderRadius: spacing.sm,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.palette.overlay50,
    },
    photoAddTile: {
      width: spacing.xxxl,
      height: spacing.xxxl,
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.palette.neutral500,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card,
    },
    photoAddTileDisabled: {
      opacity: isDark ? 0.5 : 0.4,
    },
    photoAddIcon: {
      color: colors.textDim,
    },
    photoHelper: {
      marginTop: spacing.xs,
    },
    scrapCard: {
      backgroundColor: colors.card,
      borderWidth: 2,
      borderColor: colors.border,
      borderRadius: spacing.xs,
      padding: spacing.md,
      gap: spacing.sm,
    },
    scrapCardHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.xs,
    },
    scrapCardTitle: {
      flex: 1,
    },
    scrapRemoveButton: {
      width: spacing.lg,
      height: spacing.lg,
      alignItems: "center",
      justifyContent: "center",
    },
    scrapFieldRow: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    scrapFieldItem: {
      flex: 1,
    },
    addScrapButton: {
      borderStyle: "dashed",
      borderColor: colors.palette.neutral500,
      backgroundColor: colors.transparent,
    },
    addScrapPlus: {
      color: colors.textDim,
    },
    scrapList: {
      gap: spacing.md,
    },
  }) as const

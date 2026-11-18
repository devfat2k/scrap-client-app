import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, isDark, typography, spacing }: Theme) =>
  ({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      shadowColor: isDark ? colors.palette.neutral200 : colors.palette.neutral900,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 3,
    },
    headerTitle: {
      fontFamily: typography.primary.semiBold,
    },
    headerStatus: {
      paddingRight: spacing.md,
    },
    content: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: spacing.xxxl,
      gap: spacing.md,
    },
    summary: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.xs,
    },
    driverCard: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: spacing.md,
      overflow: "hidden",
    },
    metaLine: {
      color: colors.textDim,
    },
    notFoundIcon: {
      marginBottom: spacing.xs,
    },
    offlineBanner: {
      borderWidth: 1,
      borderColor: colors.palette.accent300,
      backgroundColor: colors.palette.accent100,
      borderRadius: spacing.sm,
      padding: spacing.sm,
      gap: spacing.xxxs,
    },
    offlineTitle: {
      color: colors.palette.accent500,
    },
    offlineText: {
      color: colors.palette.accent500,
    },
    notFound: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.lg,
      gap: spacing.sm,
    },
    notFoundMessage: {
      color: colors.textDim,
      textAlign: "center",
    },
    notFoundTitle: {
      textAlign: "center",
    },
    notFoundButton: {
      alignSelf: "stretch",
      marginTop: spacing.sm,
    },
  }) as const

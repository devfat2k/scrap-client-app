import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing }: Theme) => {
  const size = spacing.xxxl + spacing.xl
  return {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xxl,
      paddingBottom: spacing.lg,
      gap: spacing.lg,
    },
    hero: {
      alignItems: "center",
      gap: spacing.sm,
    },
    successCircle: {
      width: size,
      height: size,
      borderRadius: size / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.palette.primary500,
    },
    title: {
      color: colors.text,
      textAlign: "center",
    },
    message: {
      color: colors.textDim,
      textAlign: "center",
      paddingHorizontal: spacing.sm,
    },
    requestIdPill: {
      marginTop: spacing.xxs,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      borderRadius: spacing.xs,
      backgroundColor: colors.palette.primary100,
    },
    requestIdText: {
      color: colors.palette.primary600,
    },
    ecoCard: {
      borderWidth: 1,
      borderRadius: spacing.sm,
      borderColor: colors.palette.primary200,
      backgroundColor: colors.palette.primary100,
      padding: spacing.md,
      gap: spacing.xs,
    },
    ecoHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    ecoTitle: {
      color: colors.palette.primary600,
    },
    ecoText: {
      color: colors.textDim,
    },
    actions: {
      gap: spacing.sm,
    },
  } as const
}

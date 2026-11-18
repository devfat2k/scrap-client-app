import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing, isDark }: Theme) =>
  ({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      // Leaves room for the floating tab bar and the home indicator.
      paddingBottom: spacing.xxxl + spacing.xxl,
      gap: spacing.lg,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.sm,
    },
    greetingBlock: {
      flex: 1,
      gap: spacing.xxxs,
    },
    greeting: {
      color: colors.text,
    },
    greetingSubtitle: {
      color: colors.textDim,
    },
    headerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    actionButton: {
      alignItems: "center",
      justifyContent: "center",
      width: spacing.xxl - spacing.xxs,
      height: spacing.xxl - spacing.xxs,
      borderRadius: (spacing.xxl - spacing.xxs) / 2,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    actionButtonPressed: {
      opacity: isDark ? 0.7 : 0.6,
    },
    hero: {
      backgroundColor: colors.palette.primary100,
      borderColor: colors.palette.primary200,
      borderRadius: spacing.md,
      borderWidth: 1,
      padding: spacing.lg,
      gap: spacing.sm,
    },
    badge: {
      alignItems: "center",
      alignSelf: "flex-start",
      backgroundColor: colors.palette.primary200,
      borderRadius: (spacing.xxl + spacing.xs) / 2,
      height: spacing.xxl + spacing.xs,
      justifyContent: "center",
      width: spacing.xxl + spacing.xs,
    },
    title: {
      color: colors.text,
    },
    subtitle: {
      color: colors.textDim,
      marginBottom: spacing.xs,
    },
    cta: {
      marginTop: spacing.sm,
    },
  }) as const

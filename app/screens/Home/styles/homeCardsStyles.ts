import type { Theme } from "@/theme/types"

export const createStyles = ({ spacing, colors, isDark }: Theme) =>
  ({
    quickActions: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    quickAction: {
      flex: 1,
      gap: spacing.xs,
      padding: spacing.md,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: spacing.md,
    },
    quickActionPressed: {
      opacity: isDark ? 0.7 : 0.6,
    },
    quickActionIcon: {
      alignItems: "center",
      justifyContent: "center",
      width: spacing.xl,
      height: spacing.xl,
      borderRadius: spacing.md,
    },
    quickActionIconPrimary: {
      backgroundColor: colors.palette.primary100,
    },
    quickActionIconSecondary: {
      backgroundColor: colors.palette.secondary100,
    },

    quickActionHint: {
      color: colors.textDim,
    },
    recentSection: {
      gap: spacing.xs,
    },

    recentLocation: { flexDirection: "row", alignItems: "flex-start", gap: spacing.xs },
    recentLocationText: { flex: 1, gap: spacing.xxs },

    recentMeta: {
      color: colors.textDim,
    },
  }) as const

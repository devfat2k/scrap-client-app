import { StyleSheet } from "react-native"

import type { Theme } from "@/theme/types"

export const createStyles = ({ spacing, colors, isDark, typography }: Theme) =>
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
    quickActionTitle: {
      color: colors.text,
    },
    quickActionHint: {
      color: colors.textDim,
    },
    recentSection: {
      gap: spacing.xs,
    },
    recentTitle: {
      color: colors.text,
    },
    recentCard: {
      padding: spacing.md,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      borderStartWidth: spacing.xxs,
      borderRadius: spacing.md,
    },
    recentPressed: {
      opacity: isDark ? 0.7 : 0.6,
    },
    recentHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.sm,
    },
    recentId: {
      color: colors.text,
    },
    recentStatus: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
    },
    recentStatusText: {
      color: colors.textDim,
    },
    recentDivider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.separator,
      marginVertical: spacing.xs,
    },
    recentAddress: {
      color: colors.text,
      fontFamily: typography.primary.medium,
    },
    recentMeta: {
      color: colors.textDim,
    },
    recentFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.sm,
      marginTop: spacing.xs,
    },
    chevron: {
      transform: [{ rotate: "-90deg" }],
    },
  }) as const

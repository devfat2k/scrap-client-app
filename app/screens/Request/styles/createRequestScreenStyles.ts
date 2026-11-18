import { StyleSheet } from "react-native"

import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing }: Theme) =>
  ({
    flex: { flex: 1 },
    formScreen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    formContent: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      // Leaves room for the sticky submit bar at the bottom of the scroll view.
      paddingBottom: spacing.xxl + spacing.xl,
      gap: spacing.lg,
    },
    offlineBanner: {
      borderWidth: 1,
      borderRadius: spacing.xs,
      borderColor: colors.palette.accent300,
      backgroundColor: colors.palette.accent100,
      padding: spacing.sm,
      gap: spacing.xxxs,
    },
    offlineTitle: {
      color: colors.palette.accent500,
    },
    offlineText: {
      color: colors.palette.accent500,
    },
    header: {
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.separator,
    },
  }) as const

import { StyleSheet } from "react-native"

import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing, isDark }: Theme) =>
  ({
    content: {
      paddingBottom: spacing.md,
    },
    title: {
      paddingBottom: spacing.xs,
    },
    option: {
      minHeight: spacing.xxl,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.separator,
      paddingVertical: spacing.xs,
    },
    optionPressed: {
      opacity: isDark ? 0.7 : 0.6,
    },
    optionText: {
      flex: 1,
    },
    optionTextSelected: {
      color: colors.tint,
    },
  }) as const

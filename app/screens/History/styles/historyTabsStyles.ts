import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing, isDark }: Theme) =>
  ({
    bar: {
      backgroundColor: colors.background,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    indicator: {
      backgroundColor: isDark ? colors.palette.primary500 : colors.palette.primary600,
      height: spacing.xxxs,
    },
    tab: {
      minHeight: 44,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.sm,
    },
    scrollTab: { width: "auto" },
  }) as const

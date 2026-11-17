import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $bar: (({ colors }) => ({
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  })) as ThemedStyle<ViewStyle>,

  $indicator: (({ colors, spacing, isDark }) => ({
    backgroundColor: isDark ? colors.palette.primary500 : colors.palette.primary600,
    height: spacing.xxxs,
  })) as ThemedStyle<ViewStyle>,

  $tab: (({ spacing }) => ({
    minHeight: 44,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $scrollTab: { width: "auto" } as ViewStyle,

  $label: (({ typography }) => ({
    fontFamily: typography.primary.semiBold,
  })) as ThemedStyle<TextStyle>,
}

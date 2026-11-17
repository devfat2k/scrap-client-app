import { StyleSheet, type TextStyle, type ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $sheet: (({ colors, spacing }) => ({
    backgroundColor: colors.card,
    borderTopStartRadius: spacing.md,
    borderTopEndRadius: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $handle: (({ colors, spacing }) => ({
    width: spacing.xxl,
    height: spacing.xxs,
    borderRadius: spacing.xxs,
    backgroundColor: colors.palette.neutral400,
  })) as ThemedStyle<ViewStyle>,

  $content: (({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $title: (({ colors, spacing }) => ({
    color: colors.text,
    paddingBottom: spacing.xs,
  })) as ThemedStyle<TextStyle>,

  $option: (({ colors, spacing }) => ({
    minHeight: spacing.xxl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
    paddingVertical: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $optionPressed: (({ isDark }) => ({
    opacity: isDark ? 0.7 : 0.6,
  })) as ThemedStyle<ViewStyle>,

  $optionText: (({ colors }) => ({
    flex: 1,
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $optionTextSelected: (({ colors, typography }) => ({
    color: colors.tint,
    fontFamily: typography.primary.semiBold,
  })) as ThemedStyle<TextStyle>,
}

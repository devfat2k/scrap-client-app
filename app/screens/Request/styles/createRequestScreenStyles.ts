import { StyleSheet, type TextStyle, type ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $flex: { flex: 1 } as ViewStyle,
  $formScreen: (({ colors }) => ({
    flex: 1,
    backgroundColor: colors.background,
  })) as ThemedStyle<ViewStyle>,
  $formContent: (({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    // Leaves room for the sticky submit bar at the bottom of the scroll view.
    paddingBottom: spacing.xxl + spacing.xl,
    gap: spacing.lg,
  })) as ThemedStyle<ViewStyle>,
  $offlineBanner: (({ colors, spacing }) => ({
    borderWidth: 1,
    borderRadius: spacing.xs,
    borderColor: colors.palette.accent300,
    backgroundColor: colors.palette.accent100,
    padding: spacing.sm,
    gap: spacing.xxxs,
  })) as ThemedStyle<ViewStyle>,
  $offlineTitle: (({ colors }) => ({
    color: colors.palette.accent500,
  })) as ThemedStyle<TextStyle>,
  $offlineText: (({ colors }) => ({
    color: colors.palette.accent500,
  })) as ThemedStyle<TextStyle>,
  $header: (({ colors }) => ({
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  })) as ThemedStyle<ViewStyle>,
}

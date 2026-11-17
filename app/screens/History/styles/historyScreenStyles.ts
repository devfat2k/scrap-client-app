import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $container: (({ colors }) => ({
    flex: 1,
    backgroundColor: colors.background,
  })) as ThemedStyle<ViewStyle>,

  $content: { flex: 1 } as ViewStyle,

  $header: (({ spacing }) => ({
    padding: spacing.md,
    gap: spacing.xxxs,
  })) as ThemedStyle<ViewStyle>,

  $title: (({ colors }) => ({ color: colors.text })) as ThemedStyle<TextStyle>,

  $subtitle: (({ colors }) => ({ color: colors.textDim })) as ThemedStyle<TextStyle>,

  $list: (({ spacing }) => ({
    padding: spacing.md,
    paddingBottom: spacing.xxxl + spacing.xl,
    gap: spacing.md,
    flexGrow: 1,
  })) as ThemedStyle<ViewStyle>,

  $empty: (({ spacing }) => ({
    paddingVertical: spacing.xxl,
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,
}

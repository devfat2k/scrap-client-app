import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $container: (({ colors }) => ({
    flex: 1,
    backgroundColor: colors.background,
  })) as ThemedStyle<ViewStyle>,
  $content: (({ spacing }) => ({
    flexGrow: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    // Leaves room for the floating tab bar and the home indicator.
    paddingBottom: spacing.xxxl + spacing.xxl,
    gap: spacing.lg,
  })) as ThemedStyle<ViewStyle>,

  $topBar: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $greetingBlock: (({ spacing }) => ({
    flex: 1,
    gap: spacing.xxxs,
  })) as ThemedStyle<ViewStyle>,

  $greeting: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $greetingSubtitle: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $headerActions: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $actionButton: (({ colors, spacing }) => ({
    alignItems: "center",
    justifyContent: "center",
    width: spacing.xxl - spacing.xxs,
    height: spacing.xxl - spacing.xxs,
    borderRadius: (spacing.xxl - spacing.xxs) / 2,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  })) as ThemedStyle<ViewStyle>,

  $actionButtonPressed: (({ isDark }) => ({
    opacity: isDark ? 0.7 : 0.6,
  })) as ThemedStyle<ViewStyle>,

  $hero: (({ colors, spacing }) => ({
    backgroundColor: colors.palette.primary100,
    borderColor: colors.palette.primary200,
    borderRadius: spacing.md,
    borderWidth: 1,
    padding: spacing.lg,
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $badge: (({ colors, spacing }) => ({
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.palette.primary200,
    borderRadius: (spacing.xxl + spacing.xs) / 2,
    height: spacing.xxl + spacing.xs,
    justifyContent: "center",
    width: spacing.xxl + spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $title: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $subtitle: (({ colors, spacing }) => ({
    color: colors.textDim,
    marginBottom: spacing.xs,
  })) as ThemedStyle<TextStyle>,

  $cta: (({ spacing }) => ({
    marginTop: spacing.sm,
  })) as ThemedStyle<ViewStyle>,
}

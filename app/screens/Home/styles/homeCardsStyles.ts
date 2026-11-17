import { StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $quickActions: (({ spacing }) => ({
    flexDirection: "row",
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $quickAction: (({ colors, spacing }) => ({
    flex: 1,
    gap: spacing.xs,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $quickActionPressed: (({ isDark }) => ({
    opacity: isDark ? 0.7 : 0.6,
  })) as ThemedStyle<ViewStyle>,

  $quickActionIcon: (({ spacing }) => ({
    alignItems: "center",
    justifyContent: "center",
    width: spacing.xl,
    height: spacing.xl,
    borderRadius: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $quickActionIconPrimary: (({ colors }) => ({
    backgroundColor: colors.palette.primary100,
  })) as ThemedStyle<ViewStyle>,

  $quickActionIconSecondary: (({ colors }) => ({
    backgroundColor: colors.palette.secondary100,
  })) as ThemedStyle<ViewStyle>,

  $quickActionTitle: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $quickActionHint: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $recentSection: (({ spacing }) => ({
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $recentTitle: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $recentCard: (({ colors, spacing }) => ({
    padding: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderStartWidth: spacing.xxs,
    borderRadius: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $recentPressed: (({ isDark }) => ({
    opacity: isDark ? 0.7 : 0.6,
  })) as ThemedStyle<ViewStyle>,

  $recentHeader: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $recentId: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $recentStatus: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  })) as ThemedStyle<ViewStyle>,

  $recentStatusText: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $recentDivider: (({ colors, spacing }) => ({
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginVertical: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $recentAddress: (({ colors, typography }) => ({
    color: colors.text,
    fontFamily: typography.primary.medium,
  })) as ThemedStyle<TextStyle>,

  $recentMeta: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $recentFooter: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    marginTop: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $chevron: {
    transform: [{ rotate: "-90deg" }],
  } as ViewStyle,
}

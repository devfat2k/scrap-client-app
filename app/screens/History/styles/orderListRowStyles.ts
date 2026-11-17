import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $card: (({ colors, spacing }) => ({
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.md,
    backgroundColor: colors.card,
    overflow: "hidden",
  })) as ThemedStyle<ViewStyle>,

  $body: (({ spacing }) => ({
    padding: spacing.md,
    gap: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $pressed: (({ colors }) => ({
    backgroundColor: colors.background,
  })) as ThemedStyle<ViewStyle>,

  $stack: (({ spacing }) => ({ gap: spacing.xxs })) as ThemedStyle<ViewStyle>,

  $row: (({ spacing }) => ({
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.xs,
    alignItems: "center",
  })) as ThemedStyle<ViewStyle>,

  $meta: (({ colors }) => ({ color: colors.textDim })) as ThemedStyle<TextStyle>,

  $headline: (({ colors, typography }) => ({
    color: colors.text,
    fontFamily: typography.primary.semiBold,
  })) as ThemedStyle<TextStyle>,

  $footer: (({ colors, spacing }) => ({
    borderTopWidth: 1,
    borderTopColor: colors.separator,
    paddingTop: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  })) as ThemedStyle<ViewStyle>,

  $driver: (({ colors, spacing }) => ({
    marginHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.separator,
    gap: spacing.sm,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  })) as ThemedStyle<ViewStyle>,

  $driverInfo: { flexGrow: 1, flexShrink: 1 } as ViewStyle,

  $call: (({ colors, spacing }) => ({
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.xs,
    minHeight: 44,
    minWidth: 44,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    justifyContent: "center",
  })) as ThemedStyle<ViewStyle>,

  $chevron: { transform: [{ rotate: "-90deg" }] } as ViewStyle,
}

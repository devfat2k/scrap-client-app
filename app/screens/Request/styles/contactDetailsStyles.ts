import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const contactDetailsStyles = {
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
    gap: spacing.xl,
  })) as ThemedStyle<ViewStyle>,
  $title: (({ colors }) => ({ color: colors.text })) as ThemedStyle<TextStyle>,
  $error: (({ colors }) => ({ color: colors.error })) as ThemedStyle<TextStyle>,
  $actions: (({ spacing }) => ({
    flexDirection: "row",
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,
  $input: (({ colors, spacing, typography }) => ({
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    color: colors.text,
    fontFamily: typography.primary.normal,
    fontSize: spacing.md,
    height: spacing.xxl,
  })) as ThemedStyle<TextStyle>,
  $inputError: (({ colors }) => ({ borderColor: colors.error })) as ThemedStyle<TextStyle>,
  $action: { flex: 1 } as ViewStyle,
  $form: { gap: 6 } as ViewStyle,
}

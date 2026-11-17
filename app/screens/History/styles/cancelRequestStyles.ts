import { StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  /**
   * Destructive outline button under the detail cards.
   */
  $cancelButton: (({ colors, spacing }) => ({
    marginTop: spacing.sm,
    borderColor: colors.error,
    backgroundColor: colors.errorBackground,
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $cancelButtonPressed: (({ colors }) => ({
    backgroundColor: colors.errorBackground,
    opacity: 0.8,
  })) as ThemedStyle<ViewStyle>,

  $cancelButtonDisabled: (({ isDark }) => ({
    opacity: isDark ? 0.45 : 0.5,
  })) as ThemedStyle<ViewStyle>,

  $cancelText: (({ colors }) => ({
    color: colors.error,
  })) as ThemedStyle<TextStyle>,

  /**
   * Cancel reason sheet.
   */
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

  $sheetContent: (({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $sheetTitle: (({ colors, spacing }) => ({
    color: colors.text,
    paddingBottom: spacing.xxs,
  })) as ThemedStyle<TextStyle>,

  $sheetMessage: (({ colors, spacing }) => ({
    color: colors.textDim,
    paddingBottom: spacing.sm,
  })) as ThemedStyle<TextStyle>,

  $reasonRow: (({ colors, spacing }) => ({
    minHeight: spacing.xxl,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
    paddingVertical: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $reasonPressed: (({ isDark }) => ({
    opacity: isDark ? 0.7 : 0.6,
  })) as ThemedStyle<ViewStyle>,

  $reasonText: (({ colors }) => ({
    flex: 1,
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $reasonTextSelected: (({ colors, typography }) => ({
    color: colors.tint,
    fontFamily: typography.primary.semiBold,
  })) as ThemedStyle<TextStyle>,

  $sheetActions: (({ spacing }) => ({
    gap: spacing.sm,
    marginTop: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $confirmButton: (({ colors, isDark }) => ({
    backgroundColor: isDark ? colors.palette.angry100 : colors.error,
  })) as ThemedStyle<ViewStyle>,

  $confirmButtonPressed: (({ colors, isDark }) => ({
    backgroundColor: isDark ? colors.palette.angry100 : colors.error,
    opacity: 0.85,
  })) as ThemedStyle<ViewStyle>,

  $confirmText: (({ isDark, colors }) => ({
    color: isDark ? colors.palette.neutral900 : colors.palette.neutral100,
  })) as ThemedStyle<TextStyle>,

  $confirmButtonDisabled: (({ isDark }) => ({
    opacity: isDark ? 0.45 : 0.5,
  })) as ThemedStyle<ViewStyle>,
}

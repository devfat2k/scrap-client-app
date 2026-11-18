import { StyleSheet } from "react-native"

import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing, isDark }: Theme) =>
  ({
    cancelButton: {
      marginTop: spacing.sm,
      borderColor: colors.error,
      backgroundColor: colors.errorBackground,
      gap: spacing.xs,
    },
    cancelButtonPressed: {
      backgroundColor: colors.errorBackground,
      opacity: 0.8,
    },
    cancelButtonDisabled: {
      opacity: isDark ? 0.45 : 0.5,
    },
    cancelText: {
      color: colors.error,
    },
    sheetContent: {
      paddingBottom: spacing.md,
    },
    sheetTitle: {
      paddingBottom: spacing.xxs,
    },
    sheetMessage: {
      color: colors.textDim,
      paddingBottom: spacing.sm,
    },
    reasonRow: {
      minHeight: spacing.xxl,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.sm,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.separator,
      paddingVertical: spacing.xs,
    },
    reasonPressed: {
      opacity: isDark ? 0.7 : 0.6,
    },
    reasonText: {
      flex: 1,
    },
    reasonTextSelected: {
      color: colors.tint,
    },
    sheetActions: {
      gap: spacing.sm,
      marginTop: spacing.md,
    },
    confirmButton: {
      backgroundColor: isDark ? colors.palette.angry100 : colors.error,
    },
    confirmButtonPressed: {
      backgroundColor: isDark ? colors.palette.angry100 : colors.error,
      opacity: 0.85,
    },
    confirmText: {
      color: isDark ? colors.palette.neutral900 : colors.palette.neutral100,
    },
    confirmButtonDisabled: {
      opacity: isDark ? 0.45 : 0.5,
    },
  }) as const

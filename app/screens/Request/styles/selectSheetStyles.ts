import { StyleSheet } from "react-native"

import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing, isDark, typography }: Theme) =>
  ({
    sheet: {
      backgroundColor: colors.card,
      borderTopStartRadius: spacing.md,
      borderTopEndRadius: spacing.md,
    },
    handle: {
      width: spacing.xxl,
      height: spacing.xxs,
      borderRadius: spacing.xxs,
      backgroundColor: colors.palette.neutral400,
    },
    content: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xs,
      paddingBottom: spacing.md,
    },
    title: {
      color: colors.text,
      paddingBottom: spacing.xs,
    },
    option: {
      minHeight: spacing.xxl,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.separator,
      paddingVertical: spacing.xs,
    },
    optionPressed: {
      opacity: isDark ? 0.7 : 0.6,
    },
    optionText: {
      flex: 1,
      color: colors.text,
    },
    optionTextSelected: {
      color: colors.tint,
      fontFamily: typography.primary.semiBold,
    },
  }) as const

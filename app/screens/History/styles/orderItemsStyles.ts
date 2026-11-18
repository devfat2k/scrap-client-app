import { StyleSheet } from "react-native"

import type { Theme } from "@/theme/types"

export const createStyles = ({ spacing, colors, isDark }: Theme) =>
  ({
    itemsList: {
      gap: spacing.md,
    },
    itemRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    itemInfo: {
      flex: 1,
    },

    itemQuantity: {
      color: colors.textDim,
    },
    awaitingQuote: {
      color: colors.textDim,
      flexShrink: 1,
      textAlign: "right",
    },
    priceCell: {
      flex: 1,
      minWidth: 0,
    },
    totalCell: {
      flex: 1,
      minWidth: 0,
    },
    alignRight: {
      textAlign: "right",
    },
    unitPriceText: {
      color: colors.textDim,
    },

    columnHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      marginBottom: spacing.sm,
    },
    columnText: {
      color: colors.textDim,
    },
    totalDivider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.separator,
      marginTop: spacing.md,
    },
    totalRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.sm,
      flexWrap: "wrap",
      paddingTop: spacing.sm,
    },

    totalValue: {
      color: isDark ? colors.palette.primary400 : colors.palette.primary600,
    },
    totalPending: {
      color: colors.textDim,
    },
    pendingTotal: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
    },
    disclaimer: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.xs,
      marginTop: spacing.md,
      padding: spacing.sm,
      borderWidth: 1,
      borderColor: colors.palette.accent200,
      borderRadius: spacing.sm,
      backgroundColor: colors.palette.accent100,
    },
    disclaimerIcon: {
      color: colors.palette.accent500,
      fontSize: 14,
      lineHeight: 20,
    },
    disclaimerText: {
      flex: 1,
      color: colors.palette.accent500,
    },
  }) as const

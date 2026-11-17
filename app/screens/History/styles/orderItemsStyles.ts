import { StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  /**
   * Scrap item rows.
   */
  $itemsList: (({ spacing }) => ({
    gap: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $itemRow: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $itemInfo: {
    flex: 1,
  } as ViewStyle,

  $itemCategory: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $itemQuantity: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $awaitingQuote: (({ colors }) => ({
    color: colors.textDim,
    flexShrink: 1,
    textAlign: "right",
  })) as ThemedStyle<TextStyle>,

  $priceCell: {
    width: 76,
  } as ViewStyle,

  $totalCell: {
    width: 76,
  } as ViewStyle,

  $alignRight: {
    textAlign: "right",
  } as TextStyle,

  $unitPriceText: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $lineTotalText: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  /**
   * Quote column header.
   */
  $columnHeader: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $columnText: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  /**
   * Totals and disclaimer.
   */
  $totalDivider: (({ colors, spacing }) => ({
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginTop: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $totalRow: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    paddingTop: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $totalLabel: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $totalValue: (({ colors }) => ({
    color: colors.tint,
  })) as ThemedStyle<TextStyle>,

  $totalPending: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $pendingTotal: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  })) as ThemedStyle<ViewStyle>,

  $disclaimer: (({ colors, spacing }) => ({
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.xs,
    marginTop: spacing.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.palette.accent200,
    borderRadius: spacing.sm,
    backgroundColor: colors.palette.accent100,
  })) as ThemedStyle<ViewStyle>,

  $disclaimerIcon: (({ colors }) => ({
    color: colors.palette.accent500,
    fontSize: 14,
    lineHeight: 20,
  })) as ThemedStyle<TextStyle>,

  $disclaimerText: (({ colors }) => ({
    flex: 1,
    color: colors.palette.accent500,
    fontSize: 12,
    lineHeight: 18,
  })) as ThemedStyle<TextStyle>,
}

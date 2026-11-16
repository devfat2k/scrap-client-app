import { StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

/**
 * Scrap item rows.
 */
export const $itemsList: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.md,
})

export const $itemRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

export const $itemInfo: ViewStyle = {
  flex: 1,
}

export const $itemCategory: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $itemQuantity: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $awaitingQuote: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
  flexShrink: 1,
  textAlign: "right",
})

export const $priceCell: ViewStyle = {
  width: 76,
}

export const $totalCell: ViewStyle = {
  width: 76,
}

export const $alignRight: TextStyle = {
  textAlign: "right",
}

export const $unitPriceText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $lineTotalText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

/**
 * Quote column header.
 */
export const $columnHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
  marginBottom: spacing.sm,
})

export const $columnText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

/**
 * Totals and disclaimer.
 */
export const $totalDivider: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  height: StyleSheet.hairlineWidth,
  backgroundColor: colors.separator,
  marginTop: spacing.md,
})

export const $totalRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: spacing.sm,
  paddingTop: spacing.sm,
})

export const $totalLabel: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

export const $totalValue: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.tint,
})

export const $totalPending: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.textDim,
})

export const $pendingTotal: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xxs,
})

export const $disclaimer: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  flexDirection: "row",
  alignItems: "flex-start",
  gap: spacing.xs,
  marginTop: spacing.md,
  padding: spacing.sm,
  borderWidth: 1,
  borderColor: colors.palette.accent200,
  borderRadius: spacing.sm,
  backgroundColor: colors.palette.accent100,
})

export const $disclaimerIcon: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.palette.accent500,
  fontSize: 14,
  lineHeight: 20,
})

export const $disclaimerText: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.palette.accent500,
  fontSize: 12,
  lineHeight: 18,
})

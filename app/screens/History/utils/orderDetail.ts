import type { AustralianAddress } from "@/domain/address"
import { ORDER_STATUS } from "@/domain/orderStatus"
import type { ScrapCategory, ScrapUnit } from "@/domain/scrapCategory"
import { translate } from "@/i18n/translate"
import { CATEGORY_OPTIONS, UNIT_OPTIONS } from "@/screens/Request/form/requestFormOptions"
import type { Theme } from "@/theme/types"

import type { OrderItem } from "../types/order"

export type HeaderTone = "neutral" | "primary"

/**
 * Only CONFIRMED gets the green header; every other status is safe on grey.
 */
export function getHeaderTone(status: unknown): HeaderTone {
  return status === ORDER_STATUS.CONFIRMED ? "primary" : "neutral"
}

/**
 * Header background for the current theme and status.
 */
export function getHeaderBackground(theme: Theme, status: unknown): string {
  if (getHeaderTone(status) === "primary") {
    return theme.isDark ? theme.colors.palette.primary200 : theme.colors.palette.primary600
  }

  return theme.isDark ? theme.colors.palette.neutral300 : theme.colors.palette.neutral700
}

/**
 * High-contrast foreground for the coloured header, in both themes.
 */
export const getHeaderForeground = (theme: Theme): string =>
  theme.isDark ? theme.colors.palette.neutral900 : theme.colors.palette.neutral100

/**
 * Category label from the shared request form options.
 */
export function getCategoryLabel(category: ScrapCategory): string {
  const option = CATEGORY_OPTIONS.find((item) => item.value === category)
  return translate(option?.labelTx ?? "category:other")
}

/**
 * Unit label from the shared request form options.
 */
export function getUnitLabel(unit: ScrapUnit): string {
  const option = UNIT_OPTIONS.find((item) => item.value === unit)
  return translate(option?.labelTx ?? "unit:kg")
}

/**
 * Formats a quantity and unit, e.g. `20 Kg`.
 */
export const formatQuantity = (quantity: number, unit: ScrapUnit): string =>
  `${quantity} ${getUnitLabel(unit)}`

export interface FormattedAddress {
  line1: string
  line2: string
}

/**
 * Splits an Australian address into street and suburb lines.
 */
export function formatOrderAddress(address: AustralianAddress): FormattedAddress {
  const line1 = [address.unitOrHouseNo, address.streetName].filter(Boolean).join(", ")
  const line2 = `${address.suburb.toUpperCase()}, ${address.state} ${address.postcode}`

  return { line1, line2 }
}

/**
 * Short category summary for a History row, e.g. `Plastic · Aluminium`.
 */
export function getItemsSummary(items: OrderItem[]): string {
  const labels = items.slice(0, 2).map((item) => getCategoryLabel(item.category))
  const remaining = items.length - labels.length

  if (remaining > 0) {
    labels.push(translate("history:moreTypes", { count: remaining }))
  }

  return labels.join(", ")
}

/**
 * Formats a volume for display, e.g. `~0.5 m³`.
 */
export const formatVolume = (cubicMeters: number): string => `~${cubicMeters} m³`

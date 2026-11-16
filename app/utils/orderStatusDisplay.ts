import type { ISvgType } from "@assets/svg"

import { ORDER_STATUS, getStatusConfig } from "@/domain/orderStatus"
import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import type { Theme } from "@/theme/types"

/**
 * Customer-facing status label from the domain status config.
 * Domain keys use dots, i18n resources are organised by colon namespaces.
 */
export function getStatusLabel(status: unknown): string {
  const { labelKey } = getStatusConfig(status)
  return translate(labelKey.replace(".", ":") as TxKeyPath)
}

/**
 * SVG icon for a status. The domain stores emoji, which we never render.
 */
export function getStatusIconName(status: unknown): ISvgType {
  switch (status) {
    case ORDER_STATUS.CONFIRMED:
    case ORDER_STATUS.PAID:
      return "Check"
    case ORDER_STATUS.DISPATCHED:
      return "Send"
    case ORDER_STATUS.RESCHEDULING:
      return "History"
    case ORDER_STATUS.CANCELLED:
      return "Close"
    default:
      return "Clock"
  }
}

/**
 * Resolves the domain status colour key to a real theme colour.
 */
export function getStatusColor(theme: Theme, status: unknown): string {
  const { colorKey } = getStatusConfig(status)

  switch (colorKey) {
    case "secondary400":
      return theme.colors.palette.secondary400
    case "accent400":
      return theme.colors.palette.accent400
    default:
      return theme.colors[colorKey]
  }
}

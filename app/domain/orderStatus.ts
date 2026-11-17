/**
 * Single source of truth for Order Status across the client app.
 * Follows docs/product/order-status.md strictly.
 * RULE: Status must be displayed via pure Text + standard Icon. NO Badge component.
 */

export const ORDER_STATUS = {
  NEW: "NEW",
  CONFIRMED: "CONFIRMED",
  DISPATCHED: "DISPATCHED",
  PAID: "PAID",
  RESCHEDULING: "RESCHEDULING",
  CANCELLED: "CANCELLED",
} as const

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS]

export interface StatusVisualConfig {
  readonly labelKey: string
  readonly icon: string
  readonly colorKey: "textDim" | "tint" | "secondary400" | "accent400" | "error"
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, StatusVisualConfig> = {
  [ORDER_STATUS.NEW]: {
    labelKey: "orderStatus.pending",
    icon: "⏳",
    colorKey: "textDim",
  },
  [ORDER_STATUS.CONFIRMED]: {
    labelKey: "orderStatus.quoteReady",
    icon: "✓",
    colorKey: "tint",
  },
  [ORDER_STATUS.DISPATCHED]: {
    labelKey: "orderStatus.scheduled",
    icon: "🚚",
    colorKey: "secondary400",
  },
  [ORDER_STATUS.PAID]: {
    labelKey: "orderStatus.completed",
    icon: "✓",
    colorKey: "tint",
  },
  [ORDER_STATUS.RESCHEDULING]: {
    labelKey: "orderStatus.rescheduling",
    icon: "🔄",
    colorKey: "accent400",
  },
  [ORDER_STATUS.CANCELLED]: {
    labelKey: "orderStatus.cancelled",
    icon: "✕",
    colorKey: "error",
  },
}

const UNKNOWN_STATUS_CONFIG: StatusVisualConfig = {
  labelKey: "orderStatus.unavailable",
  icon: "",
  colorKey: "textDim",
}

export const getStatusConfig = (status: unknown): StatusVisualConfig => {
  if (
    typeof status === "string" &&
    Object.prototype.hasOwnProperty.call(ORDER_STATUS_CONFIG, status)
  ) {
    return ORDER_STATUS_CONFIG[status as OrderStatus]
  }
  return UNKNOWN_STATUS_CONFIG
}

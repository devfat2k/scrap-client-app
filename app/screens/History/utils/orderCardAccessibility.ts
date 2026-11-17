import { ORDER_STATUS } from "@/domain/orderStatus"
import { translate } from "@/i18n/translate"
import { formatDateTime, formatShortDate } from "@/utils/formatDate"
import { formatMoneyFromCents } from "@/utils/formatMoney"
import { getStatusLabel } from "@/utils/orderStatusDisplay"

import { getCollectionSchedule } from "./collectionSchedule"
import {
  formatOrderAddress,
  formatQuantity,
  getCategoryLabel,
  getItemsSummary,
} from "./orderDetail"
import type { RequestOrder } from "../types/order"

/** The card is one accessible action, so its label includes the visible business content. */
export function getOrderCardAccessibilityLabel(order: RequestOrder): string {
  const parts = [order.id, getStatusLabel(order.status)]
  if (order.status === ORDER_STATUS.PAID) {
    const settlement = order.settlement
    parts.push(
      settlement?.completedAt
        ? translate("history:completedOn", { date: formatShortDate(settlement.completedAt) })
        : translate("history:completionDateUnavailable"),
    )
    const items = settlement?.actualItems ?? []
    if (!items.length) parts.push(translate("history:breakdownUnavailable"))
    for (const item of items.slice(0, 2)) {
      parts.push(
        `${getCategoryLabel(item.category)}, ${formatQuantity(item.quantity, item.unit)}, ${
          item.unitPriceCents === undefined
            ? translate("history:priceUnavailable")
            : `AUD ${formatMoneyFromCents(item.unitPriceCents)}`
        }`,
      )
    }
    if (items.length > 2) parts.push(translate("history:moreTypes", { count: items.length - 2 }))
    parts.push(
      translate(
        settlement?.paymentMethod === "bankTransfer"
          ? "history:bankTransfer"
          : settlement?.paymentMethod === "cash"
            ? "history:cash"
            : "history:paymentUnavailable",
      ),
    )
    parts.push(
      translate("history:totalReceived"),
      settlement?.receivedTotalCents === undefined
        ? translate("history:amountUnavailable")
        : `AUD ${formatMoneyFromCents(settlement.receivedTotalCents)}`,
    )
  } else {
    if (order.status === ORDER_STATUS.CANCELLED) {
      parts.push(
        order.cancellation?.cancelledAt
          ? translate("history:cancelledOn", {
              date: formatShortDate(order.cancellation.cancelledAt),
            })
          : translate("history:cancellationDateUnavailable"),
      )
      parts.push(
        translate("history:cancellationReason"),
        order.cancellation?.reason?.trim() || translate("history:reasonUnavailable"),
      )
    } else {
      const schedule = getCollectionSchedule(order)
      parts.push(
        translate("history:submitted", { date: formatShortDate(order.createdAt) }),
        translate(schedule.label),
      )
      if (schedule.date) parts.push(formatDateTime(schedule.date))
    }
    const address = formatOrderAddress(order.address)
    parts.push(address.line1, address.line2, getItemsSummary(order.items))
  }
  parts.push(translate("history:viewDetails"))
  return parts.join(". ")
}

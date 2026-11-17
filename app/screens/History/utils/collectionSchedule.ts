import { ORDER_STATUS } from "@/domain/orderStatus"
import type { TxKeyPath } from "@/i18n"

import type { RequestOrder } from "../types/order"

interface CollectionSchedule {
  label: TxKeyPath
  date?: Date
}

export function getCollectionSchedule(
  order: Pick<RequestOrder, "status" | "proposedAt" | "confirmedAt">,
  status: unknown = order.status,
): CollectionSchedule {
  switch (status) {
    case ORDER_STATUS.NEW:
      return { label: "history:preferredCollection", date: order.proposedAt }
    case ORDER_STATUS.CONFIRMED:
    case ORDER_STATUS.DISPATCHED:
      return order.confirmedAt
        ? { label: "history:confirmedCollection", date: order.confirmedAt }
        : { label: "history:timeNotConfirmed" }
    case ORDER_STATUS.RESCHEDULING:
      return { label: "history:timeRearranging" }
    case ORDER_STATUS.PAID:
    case ORDER_STATUS.CANCELLED:
      return { label: "history:recordedCollection", date: order.confirmedAt ?? order.proposedAt }
    default:
      return { label: "history:timeUnavailable" }
  }
}

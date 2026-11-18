import { OrderCard } from "@/components/order/OrderCard"
import { ORDER_STATUS } from "@/domain/orderStatus"
import { translate } from "@/i18n/translate"
import { formatShortDate } from "@/utils/formatDate"

import { OrderCardContent } from "./OrderCardContent"
import { OrderDriver } from "./OrderDriver"
import type { RequestOrder } from "../types/order"
import { getOrderCardAccessibilityLabel } from "../utils/orderCardAccessibility"

export interface OrderListRowProps {
  order: RequestOrder
  onPress: () => void
}

function getCardDate(order: RequestOrder) {
  if (order.status === ORDER_STATUS.PAID) {
    return order.settlement?.completedAt
      ? translate("history:completedOn", { date: formatShortDate(order.settlement.completedAt) })
      : translate("history:completionDateUnavailable")
  }
  if (order.status === ORDER_STATUS.CANCELLED) {
    return order.cancellation?.cancelledAt
      ? translate("history:cancelledOn", { date: formatShortDate(order.cancellation.cancelledAt) })
      : translate("history:cancellationDateUnavailable")
  }
  return translate("history:submitted", { date: formatShortDate(order.createdAt) })
}

export function OrderListRow({ order, onPress }: OrderListRowProps) {
  return (
    <OrderCard
      id={order.id}
      status={order.status}
      dateLabel={getCardDate(order)}
      accessibilityLabel={getOrderCardAccessibilityLabel(order)}
      onPress={onPress}
      driverContact={
        order.status === ORDER_STATUS.DISPATCHED ? (
          <OrderDriver driver={order.driverAssignment} />
        ) : undefined
      }
    >
      <OrderCardContent order={order} />
    </OrderCard>
  )
}

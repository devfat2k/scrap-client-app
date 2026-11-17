import { ORDER_STATUS } from "@/domain/orderStatus"

import type { RequestOrder } from "../types/order"

export const HISTORY_TABS = ["inProgress", "completed", "cancelled"] as const
export type HistoryTabKey = (typeof HISTORY_TABS)[number]

export function getHistoryTab(status: unknown): HistoryTabKey {
  if (status === ORDER_STATUS.PAID) return "completed"
  if (status === ORDER_STATUS.CANCELLED) return "cancelled"
  return "inProgress"
}

export function groupHistoryOrders(orders: RequestOrder[]) {
  const groups: Record<HistoryTabKey, RequestOrder[]> = {
    inProgress: [],
    completed: [],
    cancelled: [],
  }
  const sorted = [...orders].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime() || a.id.localeCompare(b.id),
  )
  for (const order of sorted) groups[getHistoryTab(order.status)].push(order)
  return groups
}

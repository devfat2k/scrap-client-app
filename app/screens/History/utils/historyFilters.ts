import type { ScrapCategory } from "@/domain/scrapCategory"

import type { RequestOrder } from "../types/order"

export interface HistoryFilters {
  submittedWithinDays: 30 | 90 | null
  categories: readonly ScrapCategory[]
}

export const DEFAULT_HISTORY_FILTERS: HistoryFilters = {
  submittedWithinDays: null,
  categories: [],
}

export function normalizeHistoryQuery(query: string) {
  return query.trim().replace(/^#/, "").trim().toLowerCase()
}

export function countHistoryFilters(filters: HistoryFilters) {
  return Number(filters.submittedWithinDays !== null) + Number(filters.categories.length > 0)
}

function hasSelectedCategory(order: RequestOrder, categories: readonly ScrapCategory[]) {
  if (!categories.length) return true
  const actualCategories = order.settlement?.actualItems?.map((item) => item.category) ?? []
  return [...order.items.map((item) => item.category), ...actualCategories].some((category) =>
    categories.includes(category),
  )
}

function isWithinDateRange(createdAt: Date, days: 30 | 90, now: Date) {
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (days - 1))
  return createdAt >= start && createdAt < end
}

export function filterHistoryOrders(
  orders: RequestOrder[],
  query: string,
  filters: HistoryFilters,
  now = new Date(),
) {
  const normalizedQuery = normalizeHistoryQuery(query)
  return orders.filter((order) => {
    const matchesQuery = !normalizedQuery || order.id.toLowerCase().includes(normalizedQuery)
    const matchesDate =
      filters.submittedWithinDays === null ||
      isWithinDateRange(order.createdAt, filters.submittedWithinDays, now)
    return matchesQuery && matchesDate && hasSelectedCategory(order, filters.categories)
  })
}

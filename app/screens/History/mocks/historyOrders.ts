import { FIXED_COUNTRY } from "@/domain/address"
import { ORDER_STATUS } from "@/domain/orderStatus"
import { SCRAP_CATEGORIES, SCRAP_UNITS } from "@/domain/scrapCategory"

import { createHistoryScenarios } from "./historyScenarios"
import type { RequestOrder } from "../types/order"

const MOCK_CONTACT = {
  name: "Alex Nguyen",
  phone: "0412 345 678",
} as const

const PENDING_ORDER: RequestOrder = {
  id: "REQ-102",
  status: ORDER_STATUS.NEW,
  createdAt: new Date(2026, 10, 16, 9, 30),
  contact: MOCK_CONTACT,
  address: {
    unitOrHouseNo: "Unit 12",
    streetName: "45 Main Street",
    suburb: "Sydney",
    state: "NSW",
    postcode: "2000",
    country: FIXED_COUNTRY,
  },
  proposedAt: new Date(2026, 10, 25, 10, 0),
  items: [
    {
      id: "req-102-plastic",
      category: SCRAP_CATEGORIES.PLASTIC,
      quantity: 20,
      unit: SCRAP_UNITS.KG,
      photoCount: 2,
    },
    {
      id: "req-102-aluminium",
      category: SCRAP_CATEGORIES.ALUMINIUM,
      quantity: 5,
      unit: SCRAP_UNITS.KG,
      photoCount: 0,
    },
  ],
}

const QUOTED_ORDER: RequestOrder = {
  id: "REQ-101",
  status: ORDER_STATUS.CONFIRMED,
  createdAt: new Date(2026, 10, 14, 15, 10),
  contact: MOCK_CONTACT,
  address: {
    unitOrHouseNo: "",
    streetName: "120 George Street",
    suburb: "Parramatta",
    state: "NSW",
    postcode: "2150",
    country: FIXED_COUNTRY,
  },
  proposedAt: new Date(2026, 10, 20, 9, 0),
  confirmedAt: new Date(2026, 10, 21, 14, 0),
  volumeCubicMeters: 0.5,
  items: [
    {
      id: "req-101-plastic",
      category: SCRAP_CATEGORIES.PLASTIC,
      quantity: 20,
      unit: SCRAP_UNITS.KG,
      photoCount: 1,
      unitPriceCents: 50,
      lineTotalCents: 1000,
    },
    {
      id: "req-101-aluminium",
      category: SCRAP_CATEGORIES.ALUMINIUM,
      quantity: 5,
      unit: SCRAP_UNITS.KG,
      photoCount: 1,
      unitPriceCents: 200,
      lineTotalCents: 1000,
    },
  ],
  quoteTotalCents: 2000,
}

/**
 * Newest first, so the pending request is the first row in History.
 */
export const HISTORY_ORDERS: RequestOrder[] = [
  PENDING_ORDER,
  QUOTED_ORDER,
  ...createHistoryScenarios(QUOTED_ORDER),
]

/**
 * Looks up a mock order by its request id.
 */
export const getMockOrder = (orderId: string): RequestOrder | undefined =>
  HISTORY_ORDERS.find((order) => order.id === orderId)

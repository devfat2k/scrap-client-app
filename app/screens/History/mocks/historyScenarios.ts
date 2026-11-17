import { ORDER_STATUS } from "@/domain/orderStatus"

import type { RequestOrder } from "../types/order"

/** Fictional scenarios only. Demo contacts must never launch the dialler. */
export function createHistoryScenarios(base: RequestOrder): RequestOrder[] {
  return [
    {
      ...base,
      id: "REQ-100",
      status: ORDER_STATUS.DISPATCHED,
      createdAt: new Date(2026, 10, 13, 9),
      driverAssignment: {
        name: "Jordan Taylor",
        vehiclePlate: "DEMO-01",
        phone: "0000000000",
        isDemoContact: true,
      },
    },
    {
      ...base,
      id: "REQ-099",
      status: ORDER_STATUS.RESCHEDULING,
      createdAt: new Date(2026, 10, 12, 9),
    },
    {
      ...base,
      id: "REQ-098",
      status: ORDER_STATUS.PAID,
      createdAt: new Date(2026, 10, 10, 9),
      proposedAt: new Date(2026, 10, 12, 10),
      confirmedAt: new Date(2026, 10, 12, 11),
      settlement: {
        completedAt: new Date(2026, 10, 12, 11, 30),
        paymentMethod: "bankTransfer",
        receivedTotalCents: 2250,
        actualItems: base.items.map((item, index) => ({
          id: `actual-${index}`,
          category: item.category,
          quantity: index === 0 ? 25 : 5,
          unit: item.unit,
          unitPriceCents: index === 0 ? 50 : 200,
        })),
      },
    },
    {
      ...base,
      id: "REQ-097",
      status: ORDER_STATUS.CANCELLED,
      createdAt: new Date(2026, 10, 9, 9),
      cancellation: {
        cancelledAt: new Date(2026, 10, 10, 14),
        reason: "Collection is no longer needed.",
      },
    },
  ]
}

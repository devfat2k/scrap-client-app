import type { AustralianAddress } from "@/domain/address"
import type { DriverAssignment } from "@/domain/driver"
import type { OrderStatus } from "@/domain/orderStatus"
import type { ScrapCategory, ScrapUnit } from "@/domain/scrapCategory"

export interface OrderItem {
  id: string
  category: ScrapCategory
  quantity: number
  unit: ScrapUnit
  photoCount: number
  unitPriceCents?: number
  lineTotalCents?: number
}

export interface OrderContact {
  name: string
  phone: string
}

export type { DriverAssignment } from "@/domain/driver"

export interface OrderSettlement {
  completedAt?: Date
  actualItems?: Pick<OrderItem, "id" | "category" | "quantity" | "unit" | "unitPriceCents">[]
  paymentMethod?: string
  receivedTotalCents?: number
}

export interface RequestOrder {
  id: string
  status: OrderStatus
  createdAt: Date
  contact: OrderContact
  address: AustralianAddress
  proposedAt: Date
  confirmedAt?: Date
  volumeCubicMeters?: number
  items: OrderItem[]
  driverAssignment?: DriverAssignment
  settlement?: OrderSettlement
  cancellation?: { cancelledAt?: Date; reason?: string }
  quoteTotalCents?: number
}

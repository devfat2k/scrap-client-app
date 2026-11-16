import type { AustralianAddress } from "@/domain/address"
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
  quoteTotalCents?: number
}

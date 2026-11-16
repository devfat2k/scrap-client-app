import type { AustralianState } from "@/domain/address"
import type { ScrapCategory, ScrapUnit } from "@/domain/scrapCategory"
import type { TxKeyPath } from "@/i18n"
import type { ProcessedAsset } from "@/services/camera/cameraTypes"

export const MAX_REQUEST_PHOTOS = 3

export type ScrapItemDraft = {
  id: string
  category: ScrapCategory | ""
  quantity: string
  unit: ScrapUnit | ""
  volume: string
  photos: ProcessedAsset[]
}

export type AddressDraft = {
  unitOrHouseNo: string
  streetName: string
  suburb: string
  state: AustralianState | ""
  postcode: string
  country: "AUSTRALIA"
  mapUrl: string
}

export type CreateRequestDraft = {
  items: ScrapItemDraft[]
  address: AddressDraft
  proposedAt: Date | null
}

export type ScrapItemErrors = Partial<
  Record<"category" | "quantity" | "unit" | "volume", TxKeyPath>
>

export type AddressErrors = Partial<
  Record<"streetName" | "suburb" | "state" | "postcode", TxKeyPath>
>

export type RequestFormErrors = {
  itemsRequired?: TxKeyPath
  items: Record<string, ScrapItemErrors>
  address: AddressErrors
  proposedAt?: TxKeyPath
}

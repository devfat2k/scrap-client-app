import { FIXED_COUNTRY } from "@/domain/address"

import type { CreateRequestDraft, RequestFormErrors, ScrapItemDraft } from "./requestFormTypes"

let nextItemId = 0

export const createEmptyItem = (): ScrapItemDraft => {
  nextItemId += 1

  return {
    id: `item-${nextItemId}`,
    category: "",
    quantity: "",
    unit: "",
    volume: "",
    photos: [],
  }
}

export const createInitialDraft = (): CreateRequestDraft => ({
  items: [createEmptyItem()],
  address: {
    unitOrHouseNo: "",
    streetName: "",
    suburb: "",
    state: "",
    postcode: "",
    country: FIXED_COUNTRY,
    mapUrl: "",
  },
  proposedAt: null,
})

export const createEmptyErrors = (): RequestFormErrors => ({
  items: {},
  address: {},
})

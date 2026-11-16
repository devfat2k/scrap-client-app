import { isValidAuPostcode } from "@/domain/address"

import { createEmptyErrors } from "./requestFormDefaults"
import type {
  CreateRequestDraft,
  RequestFormErrors,
  ScrapItemDraft,
  ScrapItemErrors,
} from "./requestFormTypes"

const QUANTITY_PATTERN = /^\d+(\.\d+)?$/

const isBlank = (value: string) => value.trim().length === 0

const validateItem = (item: ScrapItemDraft): ScrapItemErrors => {
  const errors: ScrapItemErrors = {}
  const quantityText = item.quantity.trim()

  if (!item.category) {
    errors.category = "request:validation.categoryRequired"
  }

  if (!quantityText) {
    errors.quantity = "request:validation.quantityRequired"
  } else if (!QUANTITY_PATTERN.test(quantityText) || Number(quantityText) <= 0) {
    errors.quantity = "request:validation.quantityInvalid"
  }

  if (!item.unit) {
    errors.unit = "request:validation.unitRequired"
  }

  if (!item.volume) {
    errors.volume = "request:validation.volumeRequired"
  }

  return errors
}

export const validateRequestForm = (
  draft: CreateRequestDraft,
  now: Date = new Date(),
): RequestFormErrors => {
  const errors = createEmptyErrors()

  if (draft.items.length === 0) {
    errors.itemsRequired = "request:validation.itemsRequired"
  }

  draft.items.forEach((item) => {
    const itemErrors = validateItem(item)
    if (Object.keys(itemErrors).length > 0) {
      errors.items[item.id] = itemErrors
    }
  })

  if (isBlank(draft.address.streetName)) {
    errors.address.streetName = "request:validation.streetRequired"
  }

  if (isBlank(draft.address.suburb)) {
    errors.address.suburb = "request:validation.suburbRequired"
  }

  if (!draft.address.state) {
    errors.address.state = "request:validation.stateRequired"
  }

  if (!isValidAuPostcode(draft.address.postcode)) {
    errors.address.postcode = "request:validation.postcodeInvalid"
  }

  if (!draft.proposedAt) {
    errors.proposedAt = "request:validation.timeRequired"
  } else if (draft.proposedAt.getTime() <= now.getTime()) {
    errors.proposedAt = "request:validation.timeInPast"
  }

  return errors
}

export const hasRequestFormErrors = (errors: RequestFormErrors): boolean =>
  !!errors.itemsRequired ||
  Object.keys(errors.items).length > 0 ||
  Object.keys(errors.address).length > 0 ||
  !!errors.proposedAt

import { useRef, useState } from "react"

import { createEmptyErrors, createEmptyItem, createInitialDraft } from "./requestFormDefaults"
import type {
  AddressDraft,
  CreateRequestDraft,
  RequestFormErrors,
  ScrapItemDraft,
  ScrapItemErrors,
} from "./requestFormTypes"
import { hasRequestFormErrors, validateRequestForm } from "./requestFormValidation"
import { MOCK_REQUEST_ID, MOCK_SUBMIT_DELAY_MS } from "../mocks/createRequestMock"

const ITEM_ERROR_FIELDS: (keyof ScrapItemErrors)[] = ["category", "quantity", "unit", "volume"]
const ADDRESS_ERROR_FIELDS: (keyof RequestFormErrors["address"])[] = [
  "streetName",
  "suburb",
  "state",
  "postcode",
]

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

function clearItemErrors(
  errors: RequestFormErrors,
  id: string,
  patch: Partial<ScrapItemDraft>,
): RequestFormErrors {
  const current = errors.items[id]
  if (!current) return errors

  const nextItemErrors = { ...current }
  let changed = false
  ITEM_ERROR_FIELDS.forEach((field) => {
    if (field in patch && nextItemErrors[field]) {
      delete nextItemErrors[field]
      changed = true
    }
  })
  if (!changed) return errors

  const nextItems = { ...errors.items }
  if (Object.keys(nextItemErrors).length === 0) {
    delete nextItems[id]
  } else {
    nextItems[id] = nextItemErrors
  }

  return { ...errors, items: nextItems }
}

function clearAddressErrors(
  errors: RequestFormErrors,
  patch: Partial<AddressDraft>,
): RequestFormErrors {
  const nextAddress = { ...errors.address }
  let changed = false
  ADDRESS_ERROR_FIELDS.forEach((field) => {
    if (field in patch && nextAddress[field]) {
      delete nextAddress[field]
      changed = true
    }
  })

  return changed ? { ...errors, address: nextAddress } : errors
}

/**
 * Owns the create request draft, its validation errors, and the mock submit lifecycle.
 */
export function useCreateRequestForm() {
  const [draft, setDraft] = useState<CreateRequestDraft>(createInitialDraft)
  const [errors, setErrors] = useState<RequestFormErrors>(createEmptyErrors)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submittingRef = useRef(false)

  function updateItem(id: string, patch: Partial<ScrapItemDraft>) {
    setDraft((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }))
    setErrors((prev) => clearItemErrors(prev, id, patch))
  }

  function addItem() {
    setDraft((prev) => ({ ...prev, items: [...prev.items, createEmptyItem()] }))
    setErrors((prev) => (prev.itemsRequired ? { ...prev, itemsRequired: undefined } : prev))
  }

  function removeItem(id: string) {
    setDraft((prev) => ({ ...prev, items: prev.items.filter((item) => item.id !== id) }))
    setErrors((prev) => {
      if (!prev.items[id]) return prev
      const nextItems = { ...prev.items }
      delete nextItems[id]
      return { ...prev, items: nextItems }
    })
  }

  function updateAddress(patch: Partial<AddressDraft>) {
    setDraft((prev) => ({ ...prev, address: { ...prev.address, ...patch } }))
    setErrors((prev) => clearAddressErrors(prev, patch))
  }

  function setProposedAt(proposedAt: Date | null) {
    setDraft((prev) => ({ ...prev, proposedAt }))
    setErrors((prev) => (prev.proposedAt ? { ...prev, proposedAt: undefined } : prev))
  }

  async function submit(): Promise<string | false> {
    if (submittingRef.current) return false

    const nextErrors = validateRequestForm(draft)
    if (hasRequestFormErrors(nextErrors)) {
      setErrors(nextErrors)
      return false
    }

    setErrors(createEmptyErrors())
    submittingRef.current = true
    setIsSubmitting(true)

    try {
      await wait(MOCK_SUBMIT_DELAY_MS)
      return MOCK_REQUEST_ID
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }

  return {
    draft,
    errors,
    isSubmitting,
    updateItem,
    addItem,
    removeItem,
    updateAddress,
    setProposedAt,
    submit,
  }
}

/**
 * Australian Address Standards.
 * Rule: Postcode is strictly 4 digits.
 * Country is strictly AUSTRALIA (fixed).
 */

export const AUSTRALIAN_STATES = ["NSW", "VIC", "QLD", "WA", "SA", "TAS", "ACT", "NT"] as const

export type AustralianState = (typeof AUSTRALIAN_STATES)[number]

export const FIXED_COUNTRY = "AUSTRALIA" as const

export interface AustralianAddress {
  unitOrHouseNo: string
  streetName: string
  suburb: string
  state: AustralianState
  postcode: string
  country: typeof FIXED_COUNTRY
  mapCoordinatesOrUrl?: string
}

export const isValidAuPostcode = (code: string): boolean => {
  return /^\d{4}$/.test(code.trim())
}

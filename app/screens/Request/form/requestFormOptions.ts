import { AUSTRALIAN_STATES, type AustralianState } from "@/domain/address"
import {
  SCRAP_CATEGORIES,
  SCRAP_UNITS,
  VOLUME_OPTIONS,
  type ScrapCategory,
  type ScrapUnit,
} from "@/domain/scrapCategory"
import type { TxKeyPath } from "@/i18n"

export type SelectOption<T extends string = string> = {
  value: T
  labelTx: TxKeyPath
}

export const CATEGORY_OPTIONS: readonly SelectOption<ScrapCategory>[] = [
  { value: SCRAP_CATEGORIES.MIXED, labelTx: "category:mixed" },
  { value: SCRAP_CATEGORIES.PLASTIC, labelTx: "category:plastic" },
  { value: SCRAP_CATEGORIES.GLASS, labelTx: "category:glass" },
  { value: SCRAP_CATEGORIES.ALUMINIUM, labelTx: "category:aluminium" },
  { value: SCRAP_CATEGORIES.PAPER, labelTx: "category:paper" },
  { value: SCRAP_CATEGORIES.OTHER, labelTx: "category:other" },
]

export const UNIT_OPTIONS: readonly SelectOption<ScrapUnit>[] = [
  { value: SCRAP_UNITS.KG, labelTx: "unit:kg" },
  { value: SCRAP_UNITS.BAG, labelTx: "unit:bag" },
  { value: SCRAP_UNITS.PIECE, labelTx: "unit:piece" },
]

export const VOLUME_SELECT_OPTIONS: readonly SelectOption[] = VOLUME_OPTIONS.map((option) => ({
  value: option.value,
  labelTx: option.labelKey.replace(".", ":") as TxKeyPath,
}))

export const STATE_OPTIONS: readonly SelectOption<AustralianState>[] = AUSTRALIAN_STATES.map(
  (state) => ({
    value: state,
    labelTx: `state:${state}` as TxKeyPath,
  }),
)

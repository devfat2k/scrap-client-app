import type { TxKeyPath } from "@/i18n"

import { SCRAP_CATEGORIES, SCRAP_UNITS, type ScrapCategory, type ScrapUnit } from "./scrapCategory"

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

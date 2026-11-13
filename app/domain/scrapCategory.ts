/**
 * Scrap Category & Volume Estimations.
 * Follows docs/product/client-app-scope.md.
 * Categories are stored in standard English.
 */

export const SCRAP_CATEGORIES = {
  MIXED: "mixed",
  PLASTIC: "plastic",
  GLASS: "glass",
  ALUMINIUM: "aluminium",
  PAPER: "paper",
  OTHER: "other",
} as const

export type ScrapCategory = (typeof SCRAP_CATEGORIES)[keyof typeof SCRAP_CATEGORIES]

export const SCRAP_UNITS = {
  KG: "kg",
  BAG: "bag",
  PIECE: "piece",
} as const

export type ScrapUnit = (typeof SCRAP_UNITS)[keyof typeof SCRAP_UNITS]

export interface VolumeOption {
  readonly value: string
  readonly labelKey: string
  readonly approximateCubicMeters: number
}

export const VOLUME_OPTIONS: readonly VolumeOption[] = [
  {
    value: "0.24",
    labelKey: "volume.bin240L",
    approximateCubicMeters: 0.24,
  },
  {
    value: "0.5",
    labelKey: "volume.sedanBoot",
    approximateCubicMeters: 0.5,
  },
  {
    value: "2.0",
    labelKey: "volume.ute",
    approximateCubicMeters: 2.0,
  },
  {
    value: "4.0",
    labelKey: "volume.largeTruck",
    approximateCubicMeters: 4.0,
  },
] as const

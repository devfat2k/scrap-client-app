import { AUSTRALIAN_STATES, type AustralianState } from "@/domain/address"
import { VOLUME_OPTIONS } from "@/domain/scrapCategory"
import type { SelectOption } from "@/domain/scrapOptions"
import type { TxKeyPath } from "@/i18n"

export { CATEGORY_OPTIONS, UNIT_OPTIONS, type SelectOption } from "@/domain/scrapOptions"

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

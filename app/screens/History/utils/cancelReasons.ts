import type { TxKeyPath } from "@/i18n"

export type CancelReason = "outOfArea" | "changedMind" | "alreadySold" | "other"

export const CANCEL_REASON_OPTIONS: { value: CancelReason; labelTx: TxKeyPath }[] = [
  { value: "outOfArea", labelTx: "orderDetail:cancelReasons.outOfArea" },
  { value: "changedMind", labelTx: "orderDetail:cancelReasons.changedMind" },
  { value: "alreadySold", labelTx: "orderDetail:cancelReasons.alreadySold" },
  { value: "other", labelTx: "orderDetail:cancelReasons.other" },
]

import { useCallback, useEffect, useRef } from "react"
import type { BottomSheetModal } from "@gorhom/bottom-sheet"

type SheetPhase = "idle" | "presented" | "dismissing"

export interface UseBottomSheetModalOptions {
  /**
   * Whether the sheet should be visible.
   */
  visible: boolean
  /**
   * Called once the sheet is fully dismissed, including backdrop and swipe down.
   */
  onClose: () => void
  /**
   * Skips the present/dismiss logic, e.g. when the platform uses a native picker.
   */
  enabled?: boolean
}

/**
 * Drives a `BottomSheetModal` from a `visible` flag.
 *
 * `present()` is ignored while the modal is still dismissing, and `dismiss()` on
 * an unmounted modal leaves its internal status stuck, which silently swallows
 * every later `present()`. This hook only dismisses a presented sheet and
 * re-presents a sheet that was reopened during its closing animation.
 */
export function useBottomSheetModal(options: UseBottomSheetModalOptions) {
  const { visible, onClose, enabled = true } = options
  const sheetRef = useRef<BottomSheetModal>(null)
  const phaseRef = useRef<SheetPhase>("idle")
  const reopenRef = useRef(false)

  useEffect(() => {
    if (!enabled) return

    if (visible) {
      if (phaseRef.current === "dismissing") {
        reopenRef.current = true
        return
      }

      if (phaseRef.current === "presented") return

      phaseRef.current = "presented"
      sheetRef.current?.present()
      return
    }

    reopenRef.current = false

    if (phaseRef.current !== "presented") return

    phaseRef.current = "dismissing"
    sheetRef.current?.dismiss()
  }, [enabled, visible])

  const handleDismiss = useCallback(() => {
    const shouldReopen = reopenRef.current
    reopenRef.current = false

    if (shouldReopen) {
      phaseRef.current = "presented"
      sheetRef.current?.present()
      return
    }

    phaseRef.current = "idle"
    onClose()
  }, [onClose])

  return { sheetRef, handleDismiss }
}

import { useMemo, useRef, useState } from "react"
import { Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

import { AppSheet, type AppSheetHandle } from "@/components/AppSheet"
import { useStyles } from "@/theme/useStyles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

import { CollectionTimePicker } from "./CollectionTimePicker"
import { createStyles } from "../styles/collectionTimeSheetStyles"

type AndroidStep = "date" | "time"

export interface CollectionTimeSheetProps {
  /**
   * Whether the sheet is visible.
   */
  visible: boolean
  /**
   * Currently committed value; used as the picker start value.
   */
  value: Date | null
  /**
   * Called with the committed date/time.
   */
  onChange: (date: Date) => void
  /**
   * Called when the sheet is dismissed without a change.
   */
  onClose: () => void
}

/**
 * Collection time picker: bottom sheet with an inline wheel on iOS and
 * sequential native dialogs on Android.
 */
export function CollectionTimeSheet(props: CollectionTimeSheetProps) {
  const styles = useStyles(createStyles)
  const bottomInset = useSafeAreaInsetsStyle(["bottom"], "margin")

  const { visible, value, onChange, onClose } = props
  const sheetRef = useRef<AppSheetHandle>(null)
  const minimumDate = useMemo(() => new Date(), [])

  const [draft, setDraft] = useState<Date>(value ?? new Date())
  const [androidStep, setAndroidStep] = useState<AndroidStep>("date")

  /**
   * Closes the picker, optionally committing a value first.
   */
  function close(nextValue?: Date) {
    if (nextValue) onChange(nextValue)

    if (sheetRef.current) {
      sheetRef.current.dismiss()
    } else {
      onClose()
    }
  }

  function handleAndroidValueChange(selected: Date) {
    if (androidStep === "date") {
      setDraft(selected)
      setAndroidStep("time")
      return
    }

    const merged = new Date(draft)
    merged.setHours(selected.getHours(), selected.getMinutes(), 0, 0)
    close(merged)
  }

  if (Platform.OS === "android") {
    if (!visible) return null

    return androidStep === "date" ? (
      <DateTimePicker
        value={draft}
        mode="date"
        minimumDate={minimumDate}
        onValueChange={(_, date) => handleAndroidValueChange(date)}
        onDismiss={onClose}
      />
    ) : (
      <DateTimePicker
        value={draft}
        mode="time"
        onValueChange={(_, date) => handleAndroidValueChange(date)}
        onDismiss={onClose}
      />
    )
  }

  return (
    <AppSheet
      visible={visible}
      onClose={onClose}
      ref={sheetRef}
      keyboardBlurBehavior="none"
      enableContentPanningGesture={false}
      contentMode="static"
      contentContainerStyle={[styles.content, bottomInset]}
    >
      <CollectionTimePicker
        value={draft}
        minimumDate={minimumDate}
        onChange={setDraft}
        onCancel={() => close()}
        onConfirm={() => close(draft)}
      />
    </AppSheet>
  )
}

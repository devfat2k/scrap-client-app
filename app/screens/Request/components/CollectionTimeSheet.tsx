import { useEffect, useMemo, useState } from "react"
import { BackHandler, Platform, View, ViewStyle } from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet"
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Button } from "@/components/Button"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useBottomSheetModal } from "@/utils/useBottomSheetModal"

type AndroidStep = "date" | "time"

function renderBackdrop(backdropProps: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...backdropProps}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
    />
  )
}

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
  const { visible, value, onChange, onClose } = props
  const { themed } = useAppTheme()
  const insets = useSafeAreaInsets()
  const { sheetRef, handleDismiss } = useBottomSheetModal({
    visible,
    onClose,
    enabled: Platform.OS !== "android",
  })
  const minimumDate = useMemo(() => new Date(), [])

  const [draft, setDraft] = useState<Date>(value ?? new Date())
  const [androidStep, setAndroidStep] = useState<AndroidStep>("date")

  useEffect(() => {
    if (!visible || Platform.OS === "android") return

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      sheetRef.current?.dismiss()
      return true
    })

    return () => subscription.remove()
  }, [visible, sheetRef])

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

  function handleAndroidChange(event: DateTimePickerEvent, selected?: Date) {
    if (event.type === "dismissed" || !selected) {
      // Cancelling keeps the previously committed value.
      onClose()
      return
    }

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
        onChange={handleAndroidChange}
      />
    ) : (
      <DateTimePicker value={draft} mode="time" onChange={handleAndroidChange} />
    )
  }

  return (
    <BottomSheetModal
      ref={sheetRef}
      enablePanDownToClose
      keyboardBlurBehavior="none"
      bottomInset={insets.bottom}
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={themed($handle)}
      backgroundStyle={themed($sheet)}
    >
      <BottomSheetView style={themed($content)}>
        <DateTimePicker
          value={draft}
          mode="datetime"
          minimumDate={minimumDate}
          onChange={(_, date) => {
            if (date) setDraft(date)
          }}
        />

        <View style={themed($actions)}>
          <Button
            preset="default"
            tx="common:cancel"
            onPress={() => close()}
            style={themed($actionSurface)}
          />
          <Button
            preset="primary"
            tx="common:done"
            onPress={() => close(draft)}
            style={themed($actionSurface)}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const $sheet: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.card,
  borderTopStartRadius: spacing.md,
  borderTopEndRadius: spacing.md,
})

const $handle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: spacing.xxl,
  height: spacing.xxs,
  borderRadius: spacing.xxs,
  backgroundColor: colors.palette.neutral400,
})

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xs,
  paddingBottom: spacing.md,
  gap: spacing.xs,
})

const $actions: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  gap: spacing.sm,
})

const $actionSurface: ViewStyle = {
  flex: 1,
}

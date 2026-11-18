import { useCallback, useEffect, useMemo, useState } from "react"
import { BackHandler, View, useWindowDimensions } from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { useBottomSheetModal } from "@/utils/useBottomSheetModal"

import { CancelReasonList } from "./CancelReasonList"
import { createStyles } from "../styles/cancelRequestStyles"
import type { CancelReason } from "../utils/cancelReasons"

const SHEET_MAX_HEIGHT_RATIO = 0.8
const SHEET_CONTENT_HEIGHT_UNITS = 8

export interface CancelRequestSheetProps {
  /**
   * Whether the sheet is visible.
   */
  visible: boolean
  /**
   * Called when the sheet is dismissed from the backdrop, swipe, or Keep.
   */
  onClose: () => void
  /**
   * Called with the selected reason when the user confirms.
   */
  onConfirm: (reason: CancelReason) => void
}

/**
 * Bottom sheet that collects a cancellation reason before confirming.
 */
export function CancelRequestSheet(props: CancelRequestSheetProps) {
  const styles = useStyles(createStyles)

  const { visible, onClose, onConfirm } = props
  const { theme } = useAppTheme()
  const { height: windowHeight } = useWindowDimensions()
  const { sheetRef, handleDismiss } = useBottomSheetModal({ visible, onClose })
  const [reason, setReason] = useState<CancelReason | null>(null)

  const snapPoints = useMemo(() => {
    const contentHeight = theme.spacing.xxxl * SHEET_CONTENT_HEIGHT_UNITS
    return [Math.min(contentHeight, windowHeight * SHEET_MAX_HEIGHT_RATIO)]
  }, [theme.spacing.xxxl, windowHeight])

  const handleSheetDismiss = useCallback(() => {
    setReason(null)
    handleDismiss()
  }, [handleDismiss])

  useEffect(() => {
    if (!visible) return

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      sheetRef.current?.dismiss()
      return true
    })

    return () => subscription.remove()
  }, [visible, sheetRef])

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  )

  function handleConfirm() {
    if (!reason) return
    onConfirm(reason)
  }

  return (
    <BottomSheetModal
      ref={sheetRef}
      enablePanDownToClose
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      onDismiss={handleSheetDismiss}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.sheet}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.sheetContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text preset="subheading" tx="orderDetail:cancelSheetTitle" style={styles.sheetTitle} />
        <Text preset="formHelper" tx="orderDetail:cancelSheetMessage" style={styles.sheetMessage} />

        <CancelReasonList selected={reason} onSelect={setReason} />

        <View style={styles.sheetActions}>
          <Button
            preset="primary"
            tx="orderDetail:confirmCancel"
            onPress={handleConfirm}
            disabled={!reason}
            style={styles.confirmButton}
            pressedStyle={styles.confirmButtonPressed}
            disabledStyle={styles.confirmButtonDisabled}
            textStyle={styles.confirmText}
          />
          <Button preset="default" tx="orderDetail:keepRequest" onPress={onClose} />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

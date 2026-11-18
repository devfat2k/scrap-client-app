import { useCallback, useMemo, useState } from "react"
import { Pressable, View, useWindowDimensions } from "react-native"

import { AppSheet } from "@/components/AppSheet"
import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/cancelRequestStyles"
import { CANCEL_REASON_OPTIONS, type CancelReason } from "../utils/cancelReasons"

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
  const [reason, setReason] = useState<CancelReason | null>(null)

  const snapPoints = useMemo(() => {
    const contentHeight = theme.spacing.xxxl * SHEET_CONTENT_HEIGHT_UNITS
    return [Math.min(contentHeight, windowHeight * SHEET_MAX_HEIGHT_RATIO)]
  }, [theme.spacing.xxxl, windowHeight])

  const handleSheetDismiss = useCallback(() => {
    setReason(null)
  }, [])

  function handleConfirm() {
    if (!reason) return
    onConfirm(reason)
  }

  return (
    <AppSheet
      visible={visible}
      onClose={onClose}
      onDismiss={handleSheetDismiss}
      sizing={{ mode: "fixed", snapPoints }}
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
    </AppSheet>
  )
}

interface CancelReasonListProps {
  /**
   * Currently selected reason, or null.
   */
  selected: CancelReason | null
  /**
   * Called when a reason row is pressed.
   */
  onSelect: (reason: CancelReason) => void
}

/**
 * Radio-style reason rows for the cancellation sheet.
 */
function CancelReasonList(props: CancelReasonListProps) {
  const styles = useStyles(createStyles)

  const { selected, onSelect } = props
  const { theme } = useAppTheme()

  return (
    <>
      {CANCEL_REASON_OPTIONS.map((option) => {
        const isSelected = option.value === selected

        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={translate(option.labelTx)}
            style={({ pressed }) => [styles.reasonRow, pressed && styles.reasonPressed]}
          >
            <Text
              weight={isSelected ? "semiBold" : undefined}
              text={translate(option.labelTx)}
              style={[styles.reasonText, isSelected && styles.reasonTextSelected]}
            />
            {isSelected && <SvgIcon icon="Check" size={18} fill={theme.colors.tint} />}
          </Pressable>
        )
      })}
    </>
  )
}

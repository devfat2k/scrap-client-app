import { useCallback, useEffect, useMemo } from "react"
import { BackHandler, Pressable, useWindowDimensions } from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useBottomSheetModal } from "@/utils/useBottomSheetModal"

import type { SelectOption } from "../form/requestFormOptions"
import { styles } from "../styles/selectSheetStyles"

const SHEET_MAX_HEIGHT_RATIO = 0.75

export interface SelectSheetProps<T extends string> {
  /**
   * Whether the sheet is visible.
   */
  visible: boolean
  /**
   * Options to render in the sheet.
   */
  options: readonly SelectOption<T>[]
  /**
   * Currently selected value, used to show the check mark.
   */
  selectedValue: T | ""
  /**
   * Called when the user taps an option. The caller is responsible for closing the sheet.
   */
  onSelect: (value: T) => void
  /**
   * Called when the sheet is dismissed, including backdrop press and swipe down.
   */
  onClose: () => void
  /**
   * Sheet title text to display if not using `titleTx`.
   */
  title?: string
  /**
   * Sheet title text which is looked up via i18n.
   */
  titleTx?: TxKeyPath
}

/**
 * Bottom sheet with a single-choice list of options.
 */
export function SelectSheet<T extends string>(props: SelectSheetProps<T>) {
  const { visible, options, selectedValue, onSelect, onClose, title, titleTx } = props
  const { themed, theme } = useAppTheme()
  const insets = useSafeAreaInsets()
  const { height: windowHeight } = useWindowDimensions()
  const { sheetRef, handleDismiss } = useBottomSheetModal({ visible, onClose })

  // Explicit detents make the first `present()` work. With dynamic sizing the
  // sheet content is not measured yet when `present()` runs, so the modal can
  // stay closed and never retry.
  const snapPoints = useMemo(() => {
    const titleHeight = title || titleTx ? theme.spacing.xxl : 0
    const contentHeight = theme.spacing.xxxl + titleHeight + options.length * theme.spacing.xxl

    return [Math.min(contentHeight, windowHeight * SHEET_MAX_HEIGHT_RATIO)]
  }, [options.length, theme.spacing, title, titleTx, windowHeight])

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

  return (
    <BottomSheetModal
      ref={sheetRef}
      enablePanDownToClose
      enableDynamicSizing={false}
      keyboardBlurBehavior="none"
      snapPoints={snapPoints}
      bottomInset={insets.bottom}
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={themed(styles.$handle)}
      backgroundStyle={themed(styles.$sheet)}
    >
      <BottomSheetScrollView
        contentContainerStyle={themed(styles.$content)}
        keyboardShouldPersistTaps="handled"
      >
        {!!(title || titleTx) && (
          <Text preset="subheading" text={title} tx={titleTx} style={themed(styles.$title)} />
        )}

        {options.map((option) => {
          const isSelected = option.value === selectedValue

          return (
            <Pressable
              key={option.value}
              onPress={() => onSelect(option.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              style={({ pressed }) => [
                themed(styles.$option),
                pressed && themed(styles.$optionPressed),
              ]}
            >
              <Text
                text={translate(option.labelTx)}
                style={[
                  themed(styles.$optionText),
                  isSelected && themed(styles.$optionTextSelected),
                ]}
              />
              {isSelected && <SvgIcon icon="Check" size={20} fill={theme.colors.tint} />}
            </Pressable>
          )
        })}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

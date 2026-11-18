import { useMemo } from "react"
import { Pressable, useWindowDimensions } from "react-native"

import { AppSheet } from "@/components/AppSheet"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import type { SelectOption } from "../form/requestFormOptions"
import { createStyles } from "../styles/selectSheetStyles"

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
  const styles = useStyles(createStyles)

  const { visible, options, selectedValue, onSelect, onClose, title, titleTx } = props
  const { theme } = useAppTheme()
  const { height: windowHeight } = useWindowDimensions()

  // Explicit detents make the first `present()` work. With dynamic sizing the
  // sheet content is not measured yet when `present()` runs, so the modal can
  // stay closed and never retry.
  const snapPoints = useMemo(() => {
    const titleHeight = title || titleTx ? theme.spacing.xxl : 0
    const contentHeight = theme.spacing.xxxl + titleHeight + options.length * theme.spacing.xxl

    return [Math.min(contentHeight, windowHeight * SHEET_MAX_HEIGHT_RATIO)]
  }, [options.length, theme.spacing, title, titleTx, windowHeight])

  return (
    <AppSheet
      visible={visible}
      onClose={onClose}
      sizing={{ mode: "fixed", snapPoints }}
      keyboardBlurBehavior="none"
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      {!!(title || titleTx) && (
        <Text preset="subheading" text={title} tx={titleTx} style={styles.title} />
      )}

      {options.map((option) => {
        const isSelected = option.value === selectedValue

        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
          >
            <Text
              weight={isSelected ? "semiBold" : undefined}
              text={translate(option.labelTx)}
              style={[styles.optionText, isSelected && styles.optionTextSelected]}
            />
            {isSelected && <SvgIcon icon="Check" size={20} fill={theme.colors.tint} />}
          </Pressable>
        )
      })}
    </AppSheet>
  )
}

import { useState } from "react"
import { Keyboard, Pressable, StyleProp, View, ViewStyle } from "react-native"

import { FieldError, FieldLabel } from "@/components/FormField"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"

import { SelectSheet } from "./SelectSheet"
import type { SelectOption } from "../form/requestFormOptions"
import { styles } from "../styles/createRequestStyles"

export interface SelectFieldProps<T extends string> {
  /**
   * Options shown in the sheet.
   */
  options: readonly SelectOption<T>[]
  /**
   * Current value, or an empty string when nothing is selected.
   */
  value: T | ""
  /**
   * Called with the selected value.
   */
  onChange: (value: T) => void
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: string
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TxKeyPath
  /**
   * Shows a required marker next to the label.
   */
  required?: boolean
  /**
   * Placeholder text to display when there is no value.
   */
  placeholder?: string
  /**
   * Placeholder text which is looked up via i18n.
   */
  placeholderTx?: TxKeyPath
  /**
   * Inline error text which is looked up via i18n.
   */
  errorTx?: TxKeyPath
  /**
   * Prevents the sheet from opening.
   */
  disabled?: boolean
  /**
   * Optional sheet title. Defaults to the field label.
   */
  sheetTitle?: string
  /**
   * Optional sheet title which is looked up via i18n.
   */
  sheetTitleTx?: TxKeyPath
  /**
   * Style overrides for the container.
   */
  containerStyle?: StyleProp<ViewStyle>
  /**
   * Test identifier forwarded to the pressable field.
   */
  testID?: string
}

/**
 * A pressable form field that opens a single-choice bottom sheet.
 */
export function SelectField<T extends string>(props: SelectFieldProps<T>) {
  const {
    options,
    value,
    onChange,
    label,
    labelTx,
    required = false,
    placeholder,
    placeholderTx,
    errorTx,
    disabled = false,
    sheetTitle,
    sheetTitleTx,
    containerStyle,
    testID,
  } = props
  const { themed, theme } = useAppTheme()
  const [isSheetVisible, setIsSheetVisible] = useState(false)

  const selectedOption = options.find((option) => option.value === value)
  const displayText = selectedOption ? translate(selectedOption.labelTx) : undefined
  const placeholderText = placeholder ?? (placeholderTx ? translate(placeholderTx) : undefined)
  const accessibilityLabel =
    label ?? (labelTx ? translate(labelTx) : undefined) ?? displayText ?? placeholderText

  function openSheet() {
    if (disabled) return

    // Blur the active input first so the keyboard slides down together with
    // the sheet, and it does not pop back up when the sheet closes.
    Keyboard.dismiss()
    setIsSheetVisible(true)
  }

  function handleSelect(nextValue: T) {
    setIsSheetVisible(false)
    onChange(nextValue)
  }

  return (
    <View style={containerStyle}>
      <FieldLabel label={label} labelTx={labelTx} required={required} />

      <Pressable
        onPress={openSheet}
        disabled={disabled}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled, expanded: isSheetVisible }}
        style={({ pressed }) => [
          themed(styles.$fieldSurface),
          !!errorTx && themed(styles.$fieldSurfaceError),
          disabled && themed(styles.$fieldSurfaceDisabled),
          pressed && !disabled && themed(styles.$fieldSurfacePressed),
        ]}
      >
        <View style={themed(styles.$fieldRow)}>
          <Text
            text={displayText ?? placeholderText}
            style={displayText ? themed(styles.$fieldValue) : themed(styles.$fieldPlaceholder)}
          />
          <SvgIcon
            icon="ChevronDown"
            size={20}
            fill={disabled ? theme.colors.textDim : theme.colors.text}
            style={themed(styles.$fieldIcon)}
          />
        </View>
      </Pressable>

      <FieldError messageTx={errorTx} />

      <SelectSheet
        visible={isSheetVisible}
        options={options}
        selectedValue={value}
        onSelect={handleSelect}
        onClose={() => setIsSheetVisible(false)}
        title={sheetTitle ?? label}
        titleTx={sheetTitleTx ?? (sheetTitle ? undefined : labelTx)}
      />
    </View>
  )
}

import { useState } from "react"
import { Keyboard, Pressable, View } from "react-native"

import { FieldError, FieldLabel } from "@/components/FormField"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { formatDateTime } from "@/utils/formatDate"

import { CollectionTimeSheet } from "./CollectionTimeSheet"
import { styles } from "../styles/createRequestStyles"

export interface CollectionTimeFieldProps {
  /**
   * Currently committed date/time, or null when unset.
   */
  value: Date | null
  /**
   * Called with the committed date/time.
   */
  onChange: (date: Date) => void
  /**
   * Label looked up via i18n.
   */
  labelTx?: TxKeyPath
  /**
   * Shows the required marker next to the label.
   */
  required?: boolean
  /**
   * Placeholder looked up via i18n.
   */
  placeholderTx?: TxKeyPath
  /**
   * Inline error looked up via i18n.
   */
  errorTx?: TxKeyPath
  /**
   * Prevents the picker from opening.
   */
  disabled?: boolean
}

/**
 * Pressable field that opens the collection date/time picker.
 */
export function CollectionTimeField(props: CollectionTimeFieldProps) {
  const {
    value,
    onChange,
    labelTx = "request:proposedAtLabel",
    required = false,
    placeholderTx = "request:proposedAtPlaceholder",
    errorTx,
    disabled = false,
  } = props
  const { themed, theme } = useAppTheme()
  const [isSheetVisible, setIsSheetVisible] = useState(false)

  const placeholderText = translate(placeholderTx)
  const displayText = value ? formatDateTime(value) : placeholderText

  function openPicker() {
    if (disabled) return

    // Blur the active input first so the keyboard slides down together with
    // the picker, and it does not pop back up when the picker closes.
    Keyboard.dismiss()
    setIsSheetVisible(true)
  }

  return (
    <View>
      <FieldLabel labelTx={labelTx} required={required} />

      <Pressable
        onPress={openPicker}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${translate(labelTx)}${value ? ` ${displayText}` : ""}`}
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
            text={displayText}
            style={value ? themed(styles.$fieldValue) : themed(styles.$fieldPlaceholder)}
          />
          <SvgIcon
            icon="Clock"
            size={20}
            fill={disabled ? theme.colors.textDim : theme.colors.text}
            style={themed(styles.$fieldIcon)}
          />
        </View>
      </Pressable>

      <FieldError messageTx={errorTx} />

      <CollectionTimeSheet
        key={isSheetVisible ? "collection-time-open" : "collection-time-closed"}
        visible={isSheetVisible}
        value={value}
        onChange={onChange}
        onClose={() => setIsSheetVisible(false)}
      />
    </View>
  )
}

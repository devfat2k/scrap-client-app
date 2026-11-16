import { StyleProp, TextStyle, View, ViewStyle } from "react-native"

import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { Text, TextProps } from "./Text"

export interface FieldLabelProps {
  /**
   * The label text to display if not using `labelTx`.
   */
  label?: TextProps["text"]
  /**
   * Label text which is looked up via i18n.
   */
  labelTx?: TextProps["tx"]
  /**
   * Optional label options to pass to i18n.
   */
  labelTxOptions?: TextProps["txOptions"]
  /**
   * Shows a required marker next to the label.
   */
  required?: boolean
  /**
   * Style override for the label text.
   */
  style?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the label Text component.
   */
  TextProps?: TextProps
}

/**
 * Shared form label with an optional required marker.
 */
export function FieldLabel(props: FieldLabelProps) {
  const {
    label,
    labelTx,
    labelTxOptions,
    required = false,
    style: $styleOverride,
    TextProps: textProps,
  } = props
  const { themed } = useAppTheme()

  if (!label && !labelTx) return null

  return (
    <View style={themed($labelRow)}>
      <Text
        preset="formLabel"
        text={label}
        tx={labelTx}
        txOptions={labelTxOptions}
        {...textProps}
        style={[themed($label), $styleOverride, textProps?.style]}
      />
      {required && (
        <Text
          preset="formLabel"
          text="*"
          accessibilityLabel={translate("common:required")}
          style={themed($requiredMark)}
        />
      )}
    </View>
  )
}

export interface FieldErrorProps {
  /**
   * Error text to display if not using `messageTx`.
   */
  message?: TextProps["text"]
  /**
   * Error text which is looked up via i18n.
   */
  messageTx?: TextProps["tx"]
  /**
   * Optional error options to pass to i18n.
   */
  messageTxOptions?: TextProps["txOptions"]
  /**
   * Style override for the error text.
   */
  style?: StyleProp<TextStyle>
  /**
   * Pass any additional props directly to the error Text component.
   */
  TextProps?: TextProps
}

/**
 * Shared inline error text for form fields.
 */
export function FieldError(props: FieldErrorProps) {
  const {
    message,
    messageTx,
    messageTxOptions,
    style: $styleOverride,
    TextProps: textProps,
  } = props
  const { themed } = useAppTheme()

  if (!message && !messageTx) return null

  return (
    <Text
      preset="formHelper"
      text={message}
      tx={messageTx}
      txOptions={messageTxOptions}
      accessibilityLiveRegion="polite"
      {...textProps}
      style={[themed($errorText), $styleOverride, textProps?.style]}
    />
  )
}

const $labelRow: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  marginBottom: spacing.xs,
})

const $label: ThemedStyle<TextStyle> = () => ({
  flexShrink: 1,
})

const $requiredMark: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginStart: spacing.xxxs,
})

const $errorText: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.error,
  marginTop: spacing.xs,
})

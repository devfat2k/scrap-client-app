import { StyleProp, ViewStyle } from "react-native"
import { ToastConfig, ToastConfigParams } from "react-native-toast-message"

import { ToastItem } from "./ToastItem"

type CustomToastProps = {
  style?: StyleProp<ViewStyle>
}

export const toastConfig: ToastConfig = {
  success: ({ text1, text2, onPress, props }: ToastConfigParams<CustomToastProps>) => (
    <ToastItem type="success" text1={text1} text2={text2} onPress={onPress} style={props?.style} />
  ),
  error: ({ text1, text2, onPress, props }: ToastConfigParams<CustomToastProps>) => (
    <ToastItem type="error" text1={text1} text2={text2} onPress={onPress} style={props?.style} />
  ),
  warning: ({ text1, text2, onPress, props }: ToastConfigParams<CustomToastProps>) => (
    <ToastItem type="warning" text1={text1} text2={text2} onPress={onPress} style={props?.style} />
  ),
  normal: ({ text1, text2, onPress, props }: ToastConfigParams<CustomToastProps>) => (
    <ToastItem type="normal" text1={text1} text2={text2} onPress={onPress} style={props?.style} />
  ),
  custom: ({ text1, text2, onPress, props }: ToastConfigParams<CustomToastProps>) => (
    <ToastItem type="custom" text1={text1} text2={text2} onPress={onPress} style={props?.style} />
  ),
}

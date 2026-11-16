import { View } from "react-native"
import type { StyleProp, TextStyle } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { getStatusColor, getStatusIconName, getStatusLabel } from "@/utils/orderStatusDisplay"

import { $statusRow, $statusText } from "../styles/orderStatusStyles"

export interface OrderStatusLabelProps {
  /**
   * Order status to render.
   */
  status: unknown
  /**
   * Overrides the status colour, e.g. white on a coloured header.
   */
  color?: string
  /**
   * Icon size in pixels.
   */
  iconSize?: number
  /**
   * Optional text style override.
   */
  textStyle?: StyleProp<TextStyle>
}

/**
 * Status as plain text plus one SVG icon. No badge, pill, background, or animation.
 */
export function OrderStatusLabel(props: OrderStatusLabelProps) {
  const { status, color, iconSize = 14, textStyle } = props
  const { themed, theme } = useAppTheme()

  const label = getStatusLabel(status)
  const statusColor = color ?? getStatusColor(theme, status)

  return (
    <View style={themed($statusRow)} accessible accessibilityRole="text" accessibilityLabel={label}>
      <SvgIcon icon={getStatusIconName(status)} size={iconSize} fill={statusColor} />
      <Text
        preset="formHelper"
        text={label}
        style={[themed($statusText), { color: statusColor }, textStyle]}
      />
    </View>
  )
}

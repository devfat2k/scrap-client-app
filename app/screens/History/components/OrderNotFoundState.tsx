import { View } from "react-native"

import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"

import { styles } from "../styles/orderDetailScreenStyles"

export interface OrderNotFoundStateProps {
  /**
   * Returns to the history list.
   */
  onBack: () => void
}

/**
 * Empty state shown when a request id has no matching order.
 */
export function OrderNotFoundState(props: OrderNotFoundStateProps) {
  const { onBack } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed(styles.$notFound)}>
      <SvgIcon
        icon="History"
        size={44}
        fill={theme.colors.textDim}
        style={themed(styles.$notFoundIcon)}
      />
      <Text
        preset="subheading"
        tx="orderDetail:notFoundTitle"
        style={themed(styles.$notFoundTitle)}
      />
      <Text tx="orderDetail:notFoundMessage" style={themed(styles.$notFoundMessage)} />
      <Button
        preset="default"
        tx="orderDetail:backToList"
        onPress={onBack}
        style={themed(styles.$notFoundButton)}
      />
    </View>
  )
}

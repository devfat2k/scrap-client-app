import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"

import {
  $notFound,
  $notFoundButton,
  $notFoundIcon,
  $notFoundMessage,
  $notFoundTitle,
} from "../styles/orderDetailScreenStyles"

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
    <Screen
      preset="fixed"
      safeAreaEdges={["bottom"]}
      systemBarStyle="light"
      contentContainerStyle={themed($notFound)}
    >
      <SvgIcon icon="History" size={44} fill={theme.colors.textDim} style={themed($notFoundIcon)} />
      <Text preset="subheading" tx="orderDetail:notFoundTitle" style={themed($notFoundTitle)} />
      <Text tx="orderDetail:notFoundMessage" style={themed($notFoundMessage)} />
      <Button
        preset="default"
        tx="orderDetail:backToList"
        onPress={onBack}
        style={themed($notFoundButton)}
      />
    </Screen>
  )
}

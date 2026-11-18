import { View } from "react-native"

import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/orderDetailScreenStyles"

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
  const styles = useStyles(createStyles)

  const { onBack } = props
  const { theme } = useAppTheme()

  return (
    <View style={styles.notFound}>
      <SvgIcon icon="History" size={44} fill={theme.colors.textDim} style={styles.notFoundIcon} />
      <Text preset="subheading" tx="orderDetail:notFoundTitle" style={styles.notFoundTitle} />
      <Text tx="orderDetail:notFoundMessage" style={styles.notFoundMessage} />
      <Button
        preset="default"
        tx="orderDetail:backToList"
        onPress={onBack}
        style={styles.notFoundButton}
      />
    </View>
  )
}

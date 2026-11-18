import { Pressable, View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { ORDER_STATUS } from "@/domain/orderStatus"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { formatShortDate } from "@/utils/formatDate"

import { OrderCardContent } from "./OrderCardContent"
import { OrderDriver } from "./OrderDriver"
import { createStyles } from "../styles/orderListRowStyles"
import type { RequestOrder } from "../types/order"
import { getOrderCardAccessibilityLabel } from "../utils/orderCardAccessibility"

export interface OrderListRowProps {
  order: RequestOrder
  onPress: () => void
}

function getCardDate(order: RequestOrder) {
  if (order.status === ORDER_STATUS.PAID) {
    return order.settlement?.completedAt
      ? translate("history:completedOn", { date: formatShortDate(order.settlement.completedAt) })
      : translate("history:completionDateUnavailable")
  }
  if (order.status === ORDER_STATUS.CANCELLED) {
    return order.cancellation?.cancelledAt
      ? translate("history:cancelledOn", { date: formatShortDate(order.cancellation.cancelledAt) })
      : translate("history:cancellationDateUnavailable")
  }
  return translate("history:submitted", { date: formatShortDate(order.createdAt) })
}

export function OrderListRow({ order, onPress }: OrderListRowProps) {
  const styles = useStyles(createStyles)

  const { theme } = useAppTheme()
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={getOrderCardAccessibilityLabel(order)}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View
          style={styles.body}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <View style={styles.row}>
            <Text preset="bold" text={`#${order.id}`} />
            <Text preset="formHelper" text={getCardDate(order)} style={styles.meta} />
          </View>
          <OrderCardContent order={order} />
          <View style={styles.footer}>
            <Text preset="formHelper" tx="history:viewDetails" />
            <SvgIcon
              icon="ChevronDown"
              size={16}
              fill={theme.colors.textDim}
              style={styles.chevron}
            />
          </View>
        </View>
      </Pressable>
      {order.status === ORDER_STATUS.DISPATCHED && <OrderDriver driver={order.driverAssignment} />}
    </View>
  )
}

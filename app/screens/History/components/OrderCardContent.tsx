import { View } from "react-native"

import { Text } from "@/components/Text"
import { ORDER_STATUS } from "@/domain/orderStatus"
import { useAppTheme } from "@/theme/context"
import { formatDateTime } from "@/utils/formatDate"

import { OrderSettlement } from "./OrderSettlement"
import { OrderStatusLabel } from "./OrderStatusLabel"
import { styles } from "../styles/orderListRowStyles"
import type { RequestOrder } from "../types/order"
import { getCollectionSchedule } from "../utils/collectionSchedule"
import { formatOrderAddress, getItemsSummary } from "../utils/orderDetail"

export function OrderCardContent({ order }: { order: RequestOrder }) {
  const { themed, theme } = useAppTheme()
  const { line1, line2 } = formatOrderAddress(order.address)
  const schedule = getCollectionSchedule(order)
  if (order.status === ORDER_STATUS.PAID) return <OrderSettlement settlement={order.settlement} />

  return (
    <>
      {order.status === ORDER_STATUS.CANCELLED ? (
        <View style={themed(styles.$stack)}>
          <Text preset="formHelper" tx="history:cancellationReason" style={themed(styles.$meta)} />
          <Text
            preset="subheading"
            numberOfLines={2}
            style={themed(styles.$headline)}
            text={order.cancellation?.reason?.trim() || undefined}
            tx={order.cancellation?.reason?.trim() ? undefined : "history:reasonUnavailable"}
          />
        </View>
      ) : (
        <View style={themed(styles.$stack)}>
          <OrderStatusLabel status={order.status} color={theme.colors.text} />
          <Text
            preset={schedule.date ? "formHelper" : "subheading"}
            tx={schedule.label}
            style={themed(styles.$meta)}
          />
          {schedule.date && (
            <Text
              preset="subheading"
              text={formatDateTime(schedule.date).replace(" • ", ", ")}
              style={themed(styles.$headline)}
            />
          )}
        </View>
      )}
      <View style={themed(styles.$stack)}>
        <Text text={`${line1}\n${line2}`} numberOfLines={2} />
        <Text
          preset="formHelper"
          text={getItemsSummary(order.items)}
          style={themed(styles.$meta)}
        />
      </View>
    </>
  )
}

import { View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { ORDER_STATUS } from "@/domain/orderStatus"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { formatDateTime } from "@/utils/formatDate"

import { OrderSettlement } from "./OrderSettlement"
import { createStyles } from "../styles/orderListRowStyles"
import type { RequestOrder } from "../types/order"
import { getCollectionSchedule } from "../utils/collectionSchedule"
import { formatOrderAddress, getItemsSummary } from "../utils/orderDetail"

export function OrderCardContent({ order }: { order: RequestOrder }) {
  const styles = useStyles(createStyles)
  const { theme } = useAppTheme()

  const { line1, line2 } = formatOrderAddress(order.address)
  const schedule = getCollectionSchedule(order)
  if (order.status === ORDER_STATUS.PAID) return <OrderSettlement settlement={order.settlement} />

  return (
    <View style={styles.content}>
      {order.status === ORDER_STATUS.CANCELLED ? (
        <View style={styles.stack}>
          <Text preset="formHelper" tx="history:cancellationReason" />
          <Text
            weight="semiBold"
            preset="subheading"
            text={order.cancellation?.reason?.trim() || undefined}
            tx={order.cancellation?.reason?.trim() ? undefined : "history:reasonUnavailable"}
          />
        </View>
      ) : (
        <View style={styles.detailRow}>
          <SvgIcon icon="Clock" size={14} fill={theme.colors.textDim} style={styles.detailIcon} />
          <View style={[styles.schedule, styles.locationText]}>
            <Text preset={schedule.date ? "formHelper" : "subheading"} tx={schedule.label} />
            {schedule.date && (
              <Text weight="semiBold" text={formatDateTime(schedule.date).replace(" • ", ", ")} />
            )}
          </View>
        </View>
      )}
      <View style={styles.locationRow}>
        <SvgIcon icon="Home" size={14} fill={theme.colors.textDim} style={styles.detailIcon} />
        <View style={styles.locationText}>
          <Text text={[line1, line2].filter(Boolean).join(", ")} size="sm" weight="medium" />
          <Text preset="formHelper" text={getItemsSummary(order.items)} />
        </View>
      </View>
    </View>
  )
}

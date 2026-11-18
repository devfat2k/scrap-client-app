import { View } from "react-native"

import { DriverContact } from "@/components/order/DriverContact"
import { OrderCard } from "@/components/order/OrderCard"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { ORDER_STATUS } from "@/domain/orderStatus"
import { translate } from "@/i18n/translate"
import type { RequestOrder } from "@/screens/History/types/order"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { formatShortDate } from "@/utils/formatDate"
import { getStatusLabel } from "@/utils/orderStatusDisplay"

import { createStyles } from "../styles/homeCardsStyles"

export interface RecentRequestCardProps {
  order: RequestOrder
  onPress: () => void
}

/** The shared card shell keeps Home compact without a second visual design. */
export function RecentRequestCard({ order, onPress }: RecentRequestCardProps) {
  const styles = useStyles(createStyles)
  const { theme } = useAppTheme()
  const address = `${order.address.suburb}, ${order.address.state}`
  const dateLabel = translate("history:submitted", { date: formatShortDate(order.createdAt) })
  const itemCount = translate("history:scrapTypes", { count: order.items.length })

  return (
    <OrderCard
      id={order.id}
      status={order.status}
      dateLabel={dateLabel}
      accessibilityLabel={[
        order.id,
        getStatusLabel(order.status),
        dateLabel,
        address,
        itemCount,
        translate("history:viewDetails"),
      ].join(". ")}
      onPress={onPress}
      driverContact={
        order.status === ORDER_STATUS.DISPATCHED ? (
          <DriverContact driver={order.driverAssignment} />
        ) : undefined
      }
    >
      <View style={styles.recentLocation}>
        <SvgIcon icon="Home" size={18} fill={theme.colors.textDim} />
        <View style={styles.recentLocationText}>
          <Text weight="medium" text={address} />
          <Text preset="formHelper" text={itemCount} style={styles.recentMeta} />
        </View>
      </View>
    </OrderCard>
  )
}

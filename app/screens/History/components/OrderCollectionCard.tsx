import { View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { formatDateTime } from "@/utils/formatDate"

import { createStyles } from "../styles/orderSectionStyles"
import type { RequestOrder } from "../types/order"
import { getCollectionSchedule } from "../utils/collectionSchedule"
import { formatOrderAddress, formatVolume } from "../utils/orderDetail"

export interface OrderCollectionCardProps {
  /**
   * Order shown on the detail screen.
   */
  order: RequestOrder
  status?: unknown
}

/**
 * Contact, address, collection window, and confirmed volume.
 * Status is intentionally not repeated here.
 */
export function OrderCollectionCard(props: OrderCollectionCardProps) {
  const styles = useStyles(createStyles)

  const { order, status = order.status } = props
  const { theme } = useAppTheme()

  const { line1, line2 } = formatOrderAddress(order.address)
  const schedule = getCollectionSchedule(order, status)
  const timeColor = theme.colors.text
  const mutedIconColor = theme.colors.textDim

  return (
    <View style={styles.sectionCard}>
      <Text preset="subheading" tx="orderDetail:collectionSection" style={styles.sectionTitle} />
      <View style={styles.sectionDivider} />

      <View style={styles.infoList}>
        <View style={styles.infoRow}>
          <SvgIcon icon="User" size={18} fill={mutedIconColor} style={styles.infoIcon} />
          <Text
            preset="bold"
            text={order.contact.name}
            style={[styles.infoBody, styles.infoText]}
          />
        </View>

        <View style={styles.infoRow}>
          <SvgIcon icon="Phone" size={18} fill={mutedIconColor} style={styles.infoIcon} />
          <Text text={order.contact.phone} style={[styles.infoBody, styles.infoText]} />
        </View>

        <View style={styles.infoRow}>
          <SvgIcon icon="Home" size={18} fill={mutedIconColor} style={styles.infoIcon} />
          <View style={styles.infoBody}>
            <Text text={line1} style={styles.infoText} />
            <Text text={line2} style={styles.infoSubtext} />
          </View>
        </View>
      </View>

      <View style={styles.timePanel}>
        <SvgIcon icon="Clock" size={20} fill={timeColor} />
        <View style={styles.infoBody}>
          <Text
            preset="formHelper"
            tx={schedule.label}
            style={[styles.infoLabel, { color: timeColor }]}
          />
          {schedule.date && (
            <Text preset="bold" text={formatDateTime(schedule.date)} style={styles.timeValue} />
          )}
        </View>
      </View>

      {order.volumeCubicMeters !== undefined && (
        <Text
          preset="formHelper"
          tx="orderDetail:volume"
          txOptions={{ value: formatVolume(order.volumeCubicMeters) }}
          style={styles.volumeText}
        />
      )}
    </View>
  )
}

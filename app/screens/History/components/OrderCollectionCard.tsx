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
  const mutedIconColor = theme.colors.textDim

  return (
    <View style={styles.sectionCard}>
      <Text size="md" weight="semiBold" tx="orderDetail:collectionSection" />
      <View style={styles.sectionDivider} />

      <View style={styles.infoList}>
        <View style={styles.infoRow}>
          <SvgIcon icon="Clock" size={18} fill={mutedIconColor} style={styles.infoIcon} />
          <View style={styles.infoBody}>
            <Text size="xs" tx={schedule.label} style={styles.infoLabel} />
            {schedule.date && (
              <Text weight="semiBold" text={formatDateTime(schedule.date).replace(" • ", ", ")} />
            )}
          </View>
        </View>
        <View style={styles.infoRow}>
          <SvgIcon icon="Home" size={18} fill={mutedIconColor} style={styles.infoIcon} />
          <Text text={[line1, line2].filter(Boolean).join(", ")} style={styles.infoBody} />
        </View>
        <View style={styles.infoRow}>
          <SvgIcon icon="User" size={18} fill={mutedIconColor} style={styles.infoIcon} />
          <View style={styles.contact}>
            <Text weight="medium" text={order.contact.name} />
            <Text text={order.contact.phone} size="xs" style={styles.infoLabel} />
          </View>
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

import { View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { formatDateTime } from "@/utils/formatDate"

import { styles } from "../styles/orderSectionStyles"
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
  const { order, status = order.status } = props
  const { themed, theme } = useAppTheme()

  const { line1, line2 } = formatOrderAddress(order.address)
  const schedule = getCollectionSchedule(order, status)
  const timeColor = theme.colors.text
  const mutedIconColor = theme.colors.textDim

  return (
    <View style={themed(styles.$sectionCard)}>
      <Text
        preset="subheading"
        tx="orderDetail:collectionSection"
        style={themed(styles.$sectionTitle)}
      />
      <View style={themed(styles.$sectionDivider)} />

      <View style={themed(styles.$infoList)}>
        <View style={themed(styles.$infoRow)}>
          <SvgIcon icon="User" size={18} fill={mutedIconColor} style={themed(styles.$infoIcon)} />
          <Text
            preset="bold"
            text={order.contact.name}
            style={[themed(styles.$infoBody), themed(styles.$infoText)]}
          />
        </View>

        <View style={themed(styles.$infoRow)}>
          <SvgIcon icon="Phone" size={18} fill={mutedIconColor} style={themed(styles.$infoIcon)} />
          <Text
            text={order.contact.phone}
            style={[themed(styles.$infoBody), themed(styles.$infoText)]}
          />
        </View>

        <View style={themed(styles.$infoRow)}>
          <SvgIcon icon="Home" size={18} fill={mutedIconColor} style={themed(styles.$infoIcon)} />
          <View style={themed(styles.$infoBody)}>
            <Text text={line1} style={themed(styles.$infoText)} />
            <Text text={line2} style={themed(styles.$infoSubtext)} />
          </View>
        </View>
      </View>

      <View style={themed(styles.$timePanel)}>
        <SvgIcon icon="Clock" size={20} fill={timeColor} />
        <View style={themed(styles.$infoBody)}>
          <Text
            preset="formHelper"
            tx={schedule.label}
            style={[themed(styles.$infoLabel), { color: timeColor }]}
          />
          {schedule.date && (
            <Text
              preset="bold"
              text={formatDateTime(schedule.date)}
              style={themed(styles.$timeValue)}
            />
          )}
        </View>
      </View>

      {order.volumeCubicMeters !== undefined && (
        <Text
          preset="formHelper"
          tx="orderDetail:volume"
          txOptions={{ value: formatVolume(order.volumeCubicMeters) }}
          style={themed(styles.$volumeText)}
        />
      )}
    </View>
  )
}

import { View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { formatDateTime } from "@/utils/formatDate"

import {
  $infoBody,
  $infoIcon,
  $infoLabel,
  $infoList,
  $infoRow,
  $infoSubtext,
  $infoText,
  $sectionCard,
  $sectionDivider,
  $sectionTitle,
  $timePanel,
  $timePanelConfirmed,
  $timeValue,
  $volumeText,
} from "../styles/orderSectionStyles"
import type { RequestOrder } from "../types/order"
import { formatOrderAddress, formatVolume } from "../utils/orderDetail"

export interface OrderCollectionCardProps {
  /**
   * Order shown on the detail screen.
   */
  order: RequestOrder
}

/**
 * Contact, address, collection window, and confirmed volume.
 * Status is intentionally not repeated here.
 */
export function OrderCollectionCard(props: OrderCollectionCardProps) {
  const { order } = props
  const { themed, theme } = useAppTheme()

  const { line1, line2 } = formatOrderAddress(order.address)
  const confirmedAt = order.confirmedAt
  const isConfirmed = confirmedAt !== undefined
  const timeValue = confirmedAt ?? order.proposedAt
  const timeColor = isConfirmed ? theme.colors.tint : theme.colors.textDim
  const mutedIconColor = theme.colors.textDim

  return (
    <View style={themed($sectionCard)}>
      <Text preset="subheading" tx="orderDetail:collectionSection" style={themed($sectionTitle)} />
      <View style={themed($sectionDivider)} />

      <View style={themed($infoList)}>
        <View style={themed($infoRow)}>
          <SvgIcon icon="User" size={18} fill={mutedIconColor} style={themed($infoIcon)} />
          <Text
            preset="bold"
            text={order.contact.name}
            style={[themed($infoBody), themed($infoText)]}
          />
        </View>

        <View style={themed($infoRow)}>
          <SvgIcon icon="Phone" size={18} fill={mutedIconColor} style={themed($infoIcon)} />
          <Text text={order.contact.phone} style={[themed($infoBody), themed($infoText)]} />
        </View>

        <View style={themed($infoRow)}>
          <SvgIcon icon="Home" size={18} fill={mutedIconColor} style={themed($infoIcon)} />
          <View style={themed($infoBody)}>
            <Text text={line1} style={themed($infoText)} />
            <Text text={line2} style={themed($infoSubtext)} />
          </View>
        </View>
      </View>

      <View style={[themed($timePanel), isConfirmed && themed($timePanelConfirmed)]}>
        <SvgIcon icon="Clock" size={20} fill={timeColor} />
        <View style={themed($infoBody)}>
          <Text
            preset="formHelper"
            tx={isConfirmed ? "orderDetail:confirmedTime" : "orderDetail:preferredTime"}
            style={[themed($infoLabel), { color: timeColor }]}
          />
          <Text preset="bold" text={formatDateTime(timeValue)} style={themed($timeValue)} />
        </View>
      </View>

      {order.volumeCubicMeters !== undefined && (
        <Text
          preset="formHelper"
          tx="orderDetail:volume"
          txOptions={{ value: formatVolume(order.volumeCubicMeters) }}
          style={themed($volumeText)}
        />
      )}
    </View>
  )
}

import { Pressable, View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { formatShortDate } from "@/utils/formatDate"
import { getStatusColor, getStatusLabel } from "@/utils/orderStatusDisplay"

import { OrderStatusLabel } from "./OrderStatusLabel"
import {
  $chevron,
  $row,
  $rowAddress,
  $rowBody,
  $rowDivider,
  $rowFooter,
  $rowHeader,
  $rowId,
  $rowItems,
  $rowMeta,
  $rowPressed,
} from "../styles/historyScreenStyles"
import type { RequestOrder } from "../types/order"
import { formatOrderAddress, getItemsSummary } from "../utils/orderDetail"

export interface OrderListRowProps {
  /**
   * Request shown in the row.
   */
  order: RequestOrder
  /**
   * Opens the request detail screen.
   */
  onPress: () => void
}

/**
 * History row: id and status on top, location and scrap below, date and chevron in the footer.
 */
export function OrderListRow(props: OrderListRowProps) {
  const { order, onPress } = props
  const { themed, theme } = useAppTheme()

  const statusLabel = getStatusLabel(order.status)
  const { line1, line2 } = formatOrderAddress(order.address)

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`#${order.id}, ${statusLabel}`}
      style={({ pressed }) => [
        themed($row),
        { borderStartColor: getStatusColor(theme, order.status) },
        pressed && themed($rowPressed),
      ]}
    >
      <View style={themed($rowBody)}>
        <View style={themed($rowHeader)}>
          <Text preset="bold" text={`#${order.id}`} style={themed($rowId)} />
          <OrderStatusLabel status={order.status} />
        </View>

        <View style={themed($rowDivider)} />

        <Text
          preset="formHelper"
          text={`${line1}, ${line2}`}
          numberOfLines={1}
          style={themed($rowAddress)}
        />
        <Text
          preset="formHelper"
          text={getItemsSummary(order.items)}
          numberOfLines={1}
          style={themed($rowItems)}
        />

        <View style={themed($rowFooter)}>
          <Text
            preset="formHelper"
            text={translate("history:submitted", { date: formatShortDate(order.createdAt) })}
            style={themed($rowMeta)}
          />
          <SvgIcon icon="ChevronDown" size={16} fill={theme.colors.textDim} style={$chevron} />
        </View>
      </View>
    </Pressable>
  )
}

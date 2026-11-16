import { View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { formatMoneyFromCents } from "@/utils/formatMoney"

import { OrderItemRow } from "./OrderItemRow"
import {
  $alignRight,
  $columnHeader,
  $columnText,
  $disclaimer,
  $disclaimerIcon,
  $disclaimerText,
  $itemInfo,
  $itemsList,
  $pendingTotal,
  $priceCell,
  $totalCell,
  $totalDivider,
  $totalLabel,
  $totalPending,
  $totalRow,
  $totalValue,
} from "../styles/orderItemsStyles"
import { $sectionCard, $sectionDivider, $sectionTitle } from "../styles/orderSectionStyles"
import type { RequestOrder } from "../types/order"

export interface OrderItemsCardProps {
  /**
   * Order whose scrap lines are shown.
   */
  order: RequestOrder
}

/**
 * Scrap lines with either "Awaiting quote" or unit price, subtotal, and totals.
 */
export function OrderItemsCard(props: OrderItemsCardProps) {
  const { order } = props
  const { themed, theme } = useAppTheme()
  const showQuote = order.quoteTotalCents !== undefined

  return (
    <View style={themed($sectionCard)}>
      <Text preset="subheading" tx="orderDetail:scrapSection" style={themed($sectionTitle)} />
      <View style={themed($sectionDivider)} />

      {showQuote && (
        <View style={themed($columnHeader)}>
          <Text
            preset="formHelper"
            tx="orderDetail:itemColumn"
            style={[themed($itemInfo), themed($columnText)]}
          />
          <Text
            preset="formHelper"
            tx="orderDetail:unitPrice"
            style={[themed($priceCell), themed($alignRight), themed($columnText)]}
          />
          <Text
            preset="formHelper"
            tx="orderDetail:subtotal"
            style={[themed($totalCell), themed($alignRight), themed($columnText)]}
          />
        </View>
      )}

      <View style={themed($itemsList)}>
        {order.items.map((item) => (
          <OrderItemRow key={item.id} item={item} showQuote={showQuote} />
        ))}
      </View>

      <View style={themed($totalDivider)} />

      <View style={themed($totalRow)}>
        <Text preset="bold" tx="orderDetail:estimatedTotal" style={themed($totalLabel)} />

        {order.quoteTotalCents !== undefined ? (
          <Text
            preset="subheading"
            text={formatMoneyFromCents(order.quoteTotalCents)}
            style={themed($totalValue)}
          />
        ) : (
          <View style={themed($pendingTotal)}>
            <SvgIcon icon="Clock" size={14} fill={theme.colors.textDim} />
            <Text
              preset="formHelper"
              tx="orderDetail:quoteUpdating"
              style={themed($totalPending)}
            />
          </View>
        )}
      </View>

      {showQuote && (
        <View style={themed($disclaimer)}>
          <Text preset="bold" text="!" style={themed($disclaimerIcon)} />
          <Text preset="formHelper" tx="orderDetail:disclaimer" style={themed($disclaimerText)} />
        </View>
      )}
    </View>
  )
}

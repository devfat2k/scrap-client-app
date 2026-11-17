import { View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { formatMoneyFromCents } from "@/utils/formatMoney"

import { OrderItemRow } from "./OrderItemRow"
import { styles } from "../styles/orderItemsStyles"
import { styles as orderSectionStyles } from "../styles/orderSectionStyles"
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
    <View style={themed(orderSectionStyles.$sectionCard)}>
      <Text
        preset="subheading"
        tx="orderDetail:scrapSection"
        style={themed(orderSectionStyles.$sectionTitle)}
      />
      <View style={themed(orderSectionStyles.$sectionDivider)} />

      {showQuote && (
        <View style={themed(styles.$columnHeader)}>
          <Text
            preset="formHelper"
            tx="orderDetail:itemColumn"
            style={[themed(styles.$itemInfo), themed(styles.$columnText)]}
          />
          <Text
            preset="formHelper"
            tx="orderDetail:unitPrice"
            style={[
              themed(styles.$priceCell),
              themed(styles.$alignRight),
              themed(styles.$columnText),
            ]}
          />
          <Text
            preset="formHelper"
            tx="orderDetail:subtotal"
            style={[
              themed(styles.$totalCell),
              themed(styles.$alignRight),
              themed(styles.$columnText),
            ]}
          />
        </View>
      )}

      <View style={themed(styles.$itemsList)}>
        {order.items.map((item) => (
          <OrderItemRow key={item.id} item={item} showQuote={showQuote} />
        ))}
      </View>

      <View style={themed(styles.$totalDivider)} />

      <View style={themed(styles.$totalRow)}>
        <Text preset="bold" tx="orderDetail:estimatedTotal" style={themed(styles.$totalLabel)} />

        {order.quoteTotalCents !== undefined ? (
          <Text
            preset="subheading"
            text={formatMoneyFromCents(order.quoteTotalCents)}
            style={themed(styles.$totalValue)}
          />
        ) : (
          <View style={themed(styles.$pendingTotal)}>
            <SvgIcon icon="Clock" size={14} fill={theme.colors.textDim} />
            <Text
              preset="formHelper"
              tx="orderDetail:quoteUpdating"
              style={themed(styles.$totalPending)}
            />
          </View>
        )}
      </View>

      {showQuote && (
        <View style={themed(styles.$disclaimer)}>
          <Text preset="bold" text="!" style={themed(styles.$disclaimerIcon)} />
          <Text
            preset="formHelper"
            tx="orderDetail:disclaimer"
            style={themed(styles.$disclaimerText)}
          />
        </View>
      )}
    </View>
  )
}

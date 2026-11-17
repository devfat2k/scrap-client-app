import { View } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { formatMoneyFromCents } from "@/utils/formatMoney"

import { styles } from "../styles/orderItemsStyles"
import type { OrderItem } from "../types/order"
import { formatQuantity, getCategoryLabel } from "../utils/orderDetail"

export interface OrderItemRowProps {
  /**
   * Scrap line to render.
   */
  item: OrderItem
  /**
   * Shows unit price and subtotal columns instead of "Awaiting quote".
   */
  showQuote: boolean
}

/**
 * One scrap line: category and quantity on the left, price columns on the right.
 */
export function OrderItemRow(props: OrderItemRowProps) {
  const { item, showQuote } = props
  const { themed } = useAppTheme()

  return (
    <View style={themed(styles.$itemRow)}>
      <View style={themed(styles.$itemInfo)}>
        <Text
          preset="bold"
          text={getCategoryLabel(item.category)}
          style={themed(styles.$itemCategory)}
        />
        <Text
          preset="formHelper"
          text={formatQuantity(item.quantity, item.unit)}
          style={themed(styles.$itemQuantity)}
        />
      </View>

      {showQuote ? (
        <>
          <Text
            text={
              item.unitPriceCents !== undefined ? formatMoneyFromCents(item.unitPriceCents) : "—"
            }
            style={[
              themed(styles.$priceCell),
              themed(styles.$alignRight),
              themed(styles.$unitPriceText),
            ]}
          />
          <Text
            preset="bold"
            text={
              item.lineTotalCents !== undefined ? formatMoneyFromCents(item.lineTotalCents) : "—"
            }
            style={[
              themed(styles.$totalCell),
              themed(styles.$alignRight),
              themed(styles.$lineTotalText),
            ]}
          />
        </>
      ) : (
        <Text
          preset="formHelper"
          tx="orderDetail:awaitingQuote"
          style={themed(styles.$awaitingQuote)}
        />
      )}
    </View>
  )
}

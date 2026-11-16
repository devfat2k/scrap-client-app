import { View } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { formatMoneyFromCents } from "@/utils/formatMoney"

import {
  $alignRight,
  $awaitingQuote,
  $itemCategory,
  $itemInfo,
  $itemQuantity,
  $itemRow,
  $lineTotalText,
  $priceCell,
  $totalCell,
  $unitPriceText,
} from "../styles/orderItemsStyles"
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
    <View style={themed($itemRow)}>
      <View style={themed($itemInfo)}>
        <Text preset="bold" text={getCategoryLabel(item.category)} style={themed($itemCategory)} />
        <Text
          preset="formHelper"
          text={formatQuantity(item.quantity, item.unit)}
          style={themed($itemQuantity)}
        />
      </View>

      {showQuote ? (
        <>
          <Text
            text={
              item.unitPriceCents !== undefined ? formatMoneyFromCents(item.unitPriceCents) : "—"
            }
            style={[themed($priceCell), themed($alignRight), themed($unitPriceText)]}
          />
          <Text
            preset="bold"
            text={
              item.lineTotalCents !== undefined ? formatMoneyFromCents(item.lineTotalCents) : "—"
            }
            style={[themed($totalCell), themed($alignRight), themed($lineTotalText)]}
          />
        </>
      ) : (
        <Text preset="formHelper" tx="orderDetail:awaitingQuote" style={themed($awaitingQuote)} />
      )}
    </View>
  )
}

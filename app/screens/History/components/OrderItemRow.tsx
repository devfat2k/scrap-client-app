import { View } from "react-native"

import { Text } from "@/components/Text"
import { useStyles } from "@/theme/useStyles"
import { formatMoneyFromCents } from "@/utils/formatMoney"

import { createStyles } from "../styles/orderItemsStyles"
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
  const styles = useStyles(createStyles)

  const { item, showQuote } = props
  return (
    <View style={styles.itemRow}>
      <View style={styles.itemInfo}>
        <Text preset="bold" text={getCategoryLabel(item.category)} />
        <Text
          preset="formHelper"
          text={formatQuantity(item.quantity, item.unit)}
          style={styles.itemQuantity}
        />
      </View>

      {showQuote ? (
        <>
          <Text
            text={
              item.unitPriceCents !== undefined ? formatMoneyFromCents(item.unitPriceCents) : "—"
            }
            style={[styles.priceCell, styles.alignRight, styles.unitPriceText]}
          />
          <Text
            preset="bold"
            text={
              item.lineTotalCents !== undefined ? formatMoneyFromCents(item.lineTotalCents) : "—"
            }
            style={[styles.totalCell, styles.alignRight]}
          />
        </>
      ) : (
        <Text preset="formHelper" tx="orderDetail:awaitingQuote" style={styles.awaitingQuote} />
      )}
    </View>
  )
}

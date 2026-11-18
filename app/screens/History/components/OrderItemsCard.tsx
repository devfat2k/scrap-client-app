import { View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { formatMoneyFromCents } from "@/utils/formatMoney"

import { createStyles } from "../styles/orderItemsStyles"
import { createStyles as createOrderSectionStyles } from "../styles/orderSectionStyles"
import type { OrderItem, RequestOrder } from "../types/order"
import { formatQuantity, getCategoryLabel } from "../utils/orderDetail"

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
  const orderSectionStyles = useStyles(createOrderSectionStyles)
  const styles = useStyles(createStyles)

  const { order } = props
  const { theme } = useAppTheme()
  const showQuote = order.quoteTotalCents !== undefined

  return (
    <View style={orderSectionStyles.sectionCard}>
      <Text size="md" weight="semiBold" tx="orderDetail:scrapSection" />
      <View style={orderSectionStyles.sectionDivider} />

      {showQuote && (
        <View style={styles.columnHeader}>
          <Text
            preset="formHelper"
            tx="orderDetail:itemColumn"
            style={[styles.itemInfo, styles.columnText]}
          />
          <Text
            preset="formHelper"
            tx="orderDetail:unitPrice"
            style={[styles.priceCell, styles.alignRight, styles.columnText]}
          />
          <Text
            preset="formHelper"
            tx="orderDetail:subtotal"
            style={[styles.totalCell, styles.alignRight, styles.columnText]}
          />
        </View>
      )}

      <View style={styles.itemsList}>
        {order.items.map((item) => (
          <OrderItemRow key={item.id} item={item} showQuote={showQuote} />
        ))}
      </View>

      <View style={styles.totalDivider} />

      <View style={styles.totalRow}>
        <Text weight="medium" tx="orderDetail:estimatedTotal" />

        {order.quoteTotalCents !== undefined ? (
          <Text
            size="lg"
            weight="semiBold"
            text={formatMoneyFromCents(order.quoteTotalCents)}
            style={styles.totalValue}
          />
        ) : (
          <View style={styles.pendingTotal}>
            <SvgIcon icon="Clock" size={14} fill={theme.colors.textDim} />
            <Text preset="formHelper" tx="orderDetail:quoteUpdating" style={styles.totalPending} />
          </View>
        )}
      </View>

      {showQuote && (
        <View style={styles.disclaimer}>
          <Text preset="bold" text="!" style={styles.disclaimerIcon} />
          <Text
            size="xxs"
            preset="formHelper"
            tx="orderDetail:disclaimer"
            style={styles.disclaimerText}
          />
        </View>
      )}
    </View>
  )
}

interface OrderItemRowProps {
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
function OrderItemRow(props: OrderItemRowProps) {
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

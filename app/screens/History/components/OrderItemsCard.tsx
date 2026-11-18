import { View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { formatMoneyFromCents } from "@/utils/formatMoney"

import { OrderItemRow } from "./OrderItemRow"
import { createStyles } from "../styles/orderItemsStyles"
import { createStyles as createOrderSectionStyles } from "../styles/orderSectionStyles"
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
  const orderSectionStyles = useStyles(createOrderSectionStyles)
  const styles = useStyles(createStyles)

  const { order } = props
  const { theme } = useAppTheme()
  const showQuote = order.quoteTotalCents !== undefined

  return (
    <View style={orderSectionStyles.sectionCard}>
      <Text
        preset="subheading"
        tx="orderDetail:scrapSection"
        style={orderSectionStyles.sectionTitle}
      />
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
        <Text preset="bold" tx="orderDetail:estimatedTotal" style={styles.totalLabel} />

        {order.quoteTotalCents !== undefined ? (
          <Text
            preset="subheading"
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
          <Text preset="formHelper" tx="orderDetail:disclaimer" style={styles.disclaimerText} />
        </View>
      )}
    </View>
  )
}

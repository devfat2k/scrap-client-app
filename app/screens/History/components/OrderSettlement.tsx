import { View } from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { formatMoneyFromCents } from "@/utils/formatMoney"

import { styles } from "../styles/orderListRowStyles"
import type { OrderSettlement as Settlement } from "../types/order"
import { formatQuantity, getCategoryLabel } from "../utils/orderDetail"

export function OrderSettlement({ settlement }: { settlement?: Settlement }) {
  const { themed } = useAppTheme()
  const items = settlement?.actualItems ?? []
  const method = settlement?.paymentMethod
  const paymentTx =
    method === "bankTransfer"
      ? "history:bankTransfer"
      : method === "cash"
        ? "history:cash"
        : "history:paymentUnavailable"
  return (
    <View style={themed(styles.$stack)}>
      {items.length === 0 && (
        <Text tx="history:breakdownUnavailable" style={themed(styles.$meta)} />
      )}
      {items.slice(0, 2).map((item) => (
        <View key={item.id} style={themed(styles.$row)}>
          <Text text={getCategoryLabel(item.category)} />
          <Text
            preset="formHelper"
            text={`${formatQuantity(item.quantity, item.unit)} × ${
              item.unitPriceCents === undefined
                ? translate("history:priceUnavailable")
                : `AUD ${formatMoneyFromCents(item.unitPriceCents)}`
            }`}
            style={themed(styles.$meta)}
          />
        </View>
      ))}
      {items.length > 2 && (
        <Text
          tx="history:moreTypes"
          txOptions={{ count: items.length - 2 }}
          style={themed(styles.$meta)}
        />
      )}
      <Text tx={paymentTx} style={themed(styles.$meta)} />
      <Text preset="formHelper" tx="history:totalReceived" style={themed(styles.$meta)} />
      <Text
        preset="heading"
        style={themed(styles.$headline)}
        text={
          settlement?.receivedTotalCents === undefined
            ? translate("history:amountUnavailable")
            : `AUD ${formatMoneyFromCents(settlement.receivedTotalCents)}`
        }
      />
    </View>
  )
}

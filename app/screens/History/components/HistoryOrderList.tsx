import { FlatList, View } from "react-native"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"

import { OrderListRow } from "./OrderListRow"
import { styles } from "../styles/historyScreenStyles"
import type { RequestOrder } from "../types/order"
import type { HistoryTabKey } from "../utils/historyTabs"

interface Props {
  orders: RequestOrder[]
  tabKey: HistoryTabKey
  onOpenOrder: (id: string) => void
}

export function HistoryOrderList({ orders, tabKey, onOpenOrder }: Props) {
  const { themed } = useAppTheme()
  return (
    <FlatList
      data={orders}
      keyExtractor={(order) => order.id}
      contentContainerStyle={themed(styles.$list)}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <OrderListRow order={item} onPress={() => onOpenOrder(item.id)} />}
      ListEmptyComponent={
        <View style={themed(styles.$empty)}>
          <Text preset="subheading" tx={`history:${tabKey}Empty`} />
          <Text tx={`history:${tabKey}EmptyMessage`} style={themed(styles.$subtitle)} />
        </View>
      }
    />
  )
}

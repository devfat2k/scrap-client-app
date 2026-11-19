import { FlatList, View } from "react-native"

import { Button } from "@/components/Button"
import { Skeleton } from "@/components/Skeleton"
import { Text } from "@/components/Text"
import { useStyles } from "@/theme/useStyles"

import { OrderListRow } from "./OrderListRow"
import { createStyles } from "../styles/historyScreenStyles"
import type { RequestOrder } from "../types/order"
import type { HistoryTabKey } from "../utils/historyTabs"

interface Props {
  orders: RequestOrder[]
  tabKey: HistoryTabKey
  onOpenOrder: (id: string) => void
  isLoading?: boolean
  onClearCriteria?: () => void
}

export function HistoryOrderList({
  orders,
  tabKey,
  onOpenOrder,
  isLoading,
  onClearCriteria,
}: Props) {
  const styles = useStyles(createStyles)

  return (
    <FlatList
      data={isLoading ? [] : orders}
      keyExtractor={(order) => order.id}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <OrderListRow order={item} onPress={() => onOpenOrder(item.id)} />}
      ListEmptyComponent={
        isLoading ? (
          <Skeleton preset="card" count={3} containerStyle={styles.list} />
        ) : (
          <View style={styles.empty}>
            {onClearCriteria ? (
              <>
                <Text preset="subheading" tx="history:noMatchingRequests" />
                <Text tx="history:noMatchingRequestsMessage" style={styles.subtitle} />
                <Button tx="history:clearSearchAndFilters" onPress={onClearCriteria} />
              </>
            ) : (
              <>
                <Text preset="subheading" tx={`history:${tabKey}Empty`} />
                <Text tx={`history:${tabKey}EmptyMessage`} style={styles.subtitle} />
              </>
            )}
          </View>
        )
      }
    />
  )
}

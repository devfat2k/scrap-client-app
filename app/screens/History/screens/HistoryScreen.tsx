import { View } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { EmptyState } from "@/components/EmptyState"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { HistoryStackParamList } from "@/navigators/navigationTypes"
import { useNetworkStatus } from "@/services/network"
import { useAppTheme } from "@/theme/context"

import { OfflineNotice } from "../components/OfflineNotice"
import { OrderListRow } from "../components/OrderListRow"
import { HISTORY_ORDERS } from "../mocks/historyOrders"
import { $content, $empty, $header, $list, $subtitle, $title } from "../styles/historyScreenStyles"

type HistoryScreenProps = NativeStackScreenProps<HistoryStackParamList, "HistoryScreen">

/**
 * Minimal request history: newest first, one row per request.
 * Data is mocked until the history API is wired up.
 */
export function HistoryScreen({ navigation }: HistoryScreenProps) {
  const { themed } = useAppTheme()
  const { isOnline } = useNetworkStatus()

  function openOrder(orderId: string) {
    navigation.navigate("OrderDetailScreen", { orderId })
  }

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={themed($content)}
    >
      <View style={themed($header)}>
        <Text preset="heading" tx="history:title" style={themed($title)} />
        <Text preset="formHelper" tx="history:subtitle" style={themed($subtitle)} />
      </View>

      {!isOnline && (
        <OfflineNotice titleTx="history:offlineTitle" messageTx="history:offlineMessage" />
      )}

      {HISTORY_ORDERS.length === 0 ? (
        <EmptyState
          headingTx="history:emptyTitle"
          contentTx="history:emptyMessage"
          button=""
          style={themed($empty)}
        />
      ) : (
        <View style={themed($list)}>
          {HISTORY_ORDERS.map((order) => (
            <OrderListRow key={order.id} order={order} onPress={() => openOrder(order.id)} />
          ))}
        </View>
      )}
    </Screen>
  )
}

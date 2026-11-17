import { View } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Header } from "@/components/Header"
import type { HistoryStackParamList } from "@/navigators/navigationTypes"
import { useNetworkStatus } from "@/services/network"
import { useAppTheme } from "@/theme/context"

import { HistoryTabs } from "../components/HistoryTabs"
import { OfflineNotice } from "../components/OfflineNotice"
import { HISTORY_ORDERS } from "../mocks/historyOrders"
import { styles } from "../styles/historyScreenStyles"

type Props = NativeStackScreenProps<HistoryStackParamList, "HistoryScreen">

export function HistoryScreen({ navigation }: Props) {
  const { isOnline } = useNetworkStatus()
  const {
    themed,
    theme: { spacing },
  } = useAppTheme()
  const insets = useSafeAreaInsets()
  return (
    <View style={[themed(styles.$container), { paddingBottom: insets.bottom + spacing.xxxl }]}>
      {!isOnline && (
        <OfflineNotice titleTx="history:offlineTitle" messageTx="history:offlineMessage" />
      )}
      <Header title="History" />
      <HistoryTabs
        orders={HISTORY_ORDERS}
        onOpenOrder={(orderId) => navigation.navigate("OrderDetailScreen", { orderId })}
      />
    </View>
  )
}

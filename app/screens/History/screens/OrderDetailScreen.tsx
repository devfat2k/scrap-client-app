import { useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import { useScrollToTop } from "@react-navigation/native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Header } from "@/components/Header"
import { Text } from "@/components/Text"
import { ORDER_STATUS } from "@/domain/orderStatus"
import { translate } from "@/i18n/translate"
import type { HistoryStackParamList } from "@/navigators/navigationTypes"
import { useNetworkStatus } from "@/services/network"
import { useAppTheme } from "@/theme/context"
import { formatShortDate } from "@/utils/formatDate"
import { showToast } from "@/utils/toastService"

import { CancelRequestButton } from "../components/CancelRequestButton"
import { CancelRequestSheet } from "../components/CancelRequestSheet"
import { OfflineNotice } from "../components/OfflineNotice"
import { OrderCollectionCard } from "../components/OrderCollectionCard"
import { OrderItemsCard } from "../components/OrderItemsCard"
import { OrderNotFoundState } from "../components/OrderNotFoundState"
import { getMockOrder } from "../mocks/historyOrders"
import { styles } from "../styles/orderDetailScreenStyles"
import { getHeaderBackground } from "../utils/orderDetail"

type OrderDetailScreenProps = NativeStackScreenProps<HistoryStackParamList, "OrderDetailScreen">

/**
 * Request detail for both pending (1.4) and confirmed (1.5) requests.
 */
export function OrderDetailScreen({ navigation, route }: OrderDetailScreenProps) {
  const scrollRef = useRef<ScrollView>(null)
  useScrollToTop(scrollRef)
  const { orderId } = route.params
  const order = getMockOrder(orderId)
  const { themed, theme } = useAppTheme()
  const { isOnline } = useNetworkStatus()
  const [status, setStatus] = useState(order?.status)
  const [cancelVisible, setCancelVisible] = useState(false)

  function handleBack() {
    navigation.goBack()
  }

  function handleCancelConfirm() {
    setStatus(ORDER_STATUS.CANCELLED)
    setCancelVisible(false)
    showToast({
      type: "SUCCESS",
      message: translate("orderDetail:cancelledToastTitle"),
      subtitle: translate("orderDetail:cancelledToastMessage"),
    })
  }

  if (!order) {
    return (
      <View style={themed(styles.$screen)}>
        <Header backgroundColor={getHeaderBackground(theme, undefined)} title={`#${orderId}`} />
        <OrderNotFoundState onBack={handleBack} />
      </View>
    )
  }

  const currentStatus = status ?? order.status
  const canCancel = currentStatus === ORDER_STATUS.NEW

  return (
    <View style={themed(styles.$screen)}>
      <Header leftIcon="Back" title={`#${order.id}`} />

      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={themed(styles.$content)}
      >
        {!isOnline && (
          <OfflineNotice
            titleTx="orderDetail:offlineTitle"
            messageTx="orderDetail:offlineMessage"
          />
        )}

        <Text
          preset="formHelper"
          text={translate("history:submitted", { date: formatShortDate(order.createdAt) })}
          style={themed(styles.$metaLine)}
        />

        <OrderCollectionCard order={order} status={currentStatus} />
        <OrderItemsCard order={order} />

        {canCancel && (
          <CancelRequestButton disabled={!isOnline} onPress={() => setCancelVisible(true)} />
        )}
      </ScrollView>

      <CancelRequestSheet
        visible={cancelVisible && canCancel}
        onClose={() => setCancelVisible(false)}
        onConfirm={handleCancelConfirm}
      />
    </View>
  )
}

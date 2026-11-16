import { useState } from "react"
import { View } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Header, type HeaderProps } from "@/components/Header"
import { Screen } from "@/components/Screen"
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
import { OrderStatusLabel } from "../components/OrderStatusLabel"
import { getMockOrder } from "../mocks/historyOrders"
import {
  $content,
  $header,
  $headerStatus,
  $headerTitle,
  $metaLine,
  $screen,
} from "../styles/orderDetailScreenStyles"
import { getHeaderBackground, getHeaderForeground } from "../utils/orderDetail"

type OrderDetailScreenProps = NativeStackScreenProps<HistoryStackParamList, "OrderDetailScreen">

/**
 * Request detail for both pending (1.4) and confirmed (1.5) requests.
 */
export function OrderDetailScreen({ navigation, route }: OrderDetailScreenProps) {
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

  const foreground = getHeaderForeground(theme)
  const headerProps: Omit<HeaderProps, "backgroundColor" | "title" | "RightActionComponent"> = {
    safeAreaEdges: ["top"],
    titleMode: "left",
    titleStyle: [themed($headerTitle), { color: foreground }],
    leftIcon: "Back",
    leftIconColor: foreground,
    leftIconAccessibilityLabel: translate("common:back"),
    onLeftPress: handleBack,
    containerStyle: themed($header),
  }

  if (!order) {
    return (
      <View style={themed($screen)}>
        <Header
          {...headerProps}
          backgroundColor={getHeaderBackground(theme, undefined)}
          title={`#${orderId}`}
        />
        <OrderNotFoundState onBack={handleBack} />
      </View>
    )
  }

  const currentStatus = status ?? order.status
  const canCancel = currentStatus === ORDER_STATUS.NEW

  return (
    <View style={themed($screen)}>
      <Header
        {...headerProps}
        backgroundColor={getHeaderBackground(theme, currentStatus)}
        title={`#${order.id}`}
        RightActionComponent={
          <View style={themed($headerStatus)}>
            <OrderStatusLabel status={currentStatus} color={foreground} iconSize={16} />
          </View>
        }
      />

      <Screen
        preset="scroll"
        safeAreaEdges={["bottom"]}
        systemBarStyle="light"
        contentContainerStyle={themed($content)}
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
          style={themed($metaLine)}
        />

        <OrderCollectionCard order={order} />
        <OrderItemsCard order={order} />

        {canCancel && (
          <CancelRequestButton disabled={!isOnline} onPress={() => setCancelVisible(true)} />
        )}
      </Screen>

      <CancelRequestSheet
        visible={cancelVisible && canCancel}
        onClose={() => setCancelVisible(false)}
        onConfirm={handleCancelConfirm}
      />
    </View>
  )
}

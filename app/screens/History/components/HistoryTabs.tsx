import { useMemo, useState } from "react"
import { useWindowDimensions } from "react-native"
import { TabBar, TabView } from "react-native-tab-view"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"

import { HistoryOrderList } from "./HistoryOrderList"
import { styles } from "../styles/historyTabsStyles"
import type { RequestOrder } from "../types/order"
import { groupHistoryOrders, HISTORY_TABS, type HistoryTabKey } from "../utils/historyTabs"

const routes = HISTORY_TABS.map((key) => ({ key }))

interface Props {
  orders: RequestOrder[]
  onOpenOrder: (id: string) => void
}

export function HistoryTabs({ orders, onOpenOrder }: Props) {
  const [index, setIndex] = useState(0)
  const { width, fontScale } = useWindowDimensions()
  const { theme, themed } = useAppTheme()
  const groups = useMemo(() => groupHistoryOrders(orders), [orders])
  // Allow full labels to grow rather than truncate when the available measure shrinks.
  const scrollEnabled = width / fontScale < 360

  return (
    <TabView
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      initialLayout={{ width }}
      lazy
      commonOptions={{
        label: ({ route, color }) => (
          <Text
            text={translate(`history:${route.key as HistoryTabKey}`)}
            style={[themed(styles.$label), { color }]}
          />
        ),
      }}
      options={Object.fromEntries(
        routes.map(({ key }) => [
          key,
          {
            accessibilityLabel: translate(`history:${key}`),
          },
        ]),
      )}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          scrollEnabled={scrollEnabled}
          activeColor={theme.colors.text}
          inactiveColor={theme.colors.textDim}
          style={themed(styles.$bar)}
          indicatorStyle={themed(styles.$indicator)}
          tabStyle={[themed(styles.$tab), scrollEnabled && styles.$scrollTab]}
        />
      )}
      renderScene={({ route }) => (
        <HistoryOrderList orders={groups[route.key]} tabKey={route.key} onOpenOrder={onOpenOrder} />
      )}
    />
  )
}

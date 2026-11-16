import { FC, useState } from "react"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { AppStackParamList } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"

import { HomeTopBar } from "../components/HomeTopBar"
import { HowItWorksSheet } from "../components/HowItWorksSheet"
import { NotificationsSheet } from "../components/NotificationsSheet"
import { QuickActions } from "../components/QuickActions"
import { RecentRequestCard } from "../components/RecentRequestCard"
import { ThemeSheet } from "../components/ThemeSheet"
import { RECENT_REQUEST } from "../mocks/recentRequest"
import { $recentSection, $recentTitle } from "../styles/homeCardsStyles"
import { $badge, $content, $cta, $hero, $subtitle, $title } from "../styles/homeScreenStyles"

export const HomeScreen: FC = () => {
  const { themed, theme } = useAppTheme()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const [themeSheetVisible, setThemeSheetVisible] = useState(false)
  const [notificationsVisible, setNotificationsVisible] = useState(false)
  const [howItWorksVisible, setHowItWorksVisible] = useState(false)

  function openHistory() {
    navigation.navigate("MainTab", { screen: "HistoryTab" })
  }

  function openRecentOrder() {
    if (!RECENT_REQUEST) return

    navigation.navigate("MainTab", {
      screen: "HistoryTab",
      params: {
        screen: "OrderDetailScreen",
        params: { orderId: RECENT_REQUEST.id },
      },
    })
  }

  return (
    <Screen preset="scroll" safeAreaEdges={["top"]} contentContainerStyle={themed($content)}>
      <HomeTopBar
        onPressTheme={() => setThemeSheetVisible(true)}
        onPressNotifications={() => setNotificationsVisible(true)}
      />

      <View style={themed($hero)}>
        <View
          style={themed($badge)}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <SvgIcon icon="Earth" size={theme.spacing.xl} fill={theme.colors.palette.primary600} />
        </View>

        <Text preset="heading" tx="home:title" style={themed($title)} />
        <Text preset="formHelper" tx="home:subtitle" style={themed($subtitle)} />

        <Button
          preset="primary"
          tx="home:createRequest"
          style={themed($cta)}
          onPress={() => navigation.navigate("Request")}
        />
      </View>

      <QuickActions
        onPressMyRequests={openHistory}
        onPressHowItWorks={() => setHowItWorksVisible(true)}
      />

      {RECENT_REQUEST && (
        <View style={themed($recentSection)}>
          <Text preset="bold" tx="home:recent.title" style={themed($recentTitle)} />
          <RecentRequestCard order={RECENT_REQUEST} onPress={openRecentOrder} />
        </View>
      )}

      <ThemeSheet visible={themeSheetVisible} onClose={() => setThemeSheetVisible(false)} />
      <NotificationsSheet
        visible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
      />
      <HowItWorksSheet visible={howItWorksVisible} onClose={() => setHowItWorksVisible(false)} />
    </Screen>
  )
}

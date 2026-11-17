import { FC, useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import { useNavigation, useScrollToTop } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { AppStackParamList } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

import { HomeTopBar } from "../components/HomeTopBar"
import { HowItWorksSheet } from "../components/HowItWorksSheet"
import { LanguageSheet } from "../components/LanguageSheet"
import { NotificationsSheet } from "../components/NotificationsSheet"
import { QuickActions } from "../components/QuickActions"
import { RecentRequestCard } from "../components/RecentRequestCard"
import { ThemeSheet } from "../components/ThemeSheet"
import { RECENT_REQUEST } from "../mocks/recentRequest"
import { styles as cardStyles } from "../styles/homeCardsStyles"
import { styles } from "../styles/homeScreenStyles"

export const HomeScreen: FC = () => {
  const { themed, theme } = useAppTheme()
  const containerInsets = useSafeAreaInsetsStyle(["top"])
  const scrollRef = useRef<ScrollView>(null)
  useScrollToTop(scrollRef)
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()
  const [themeSheetVisible, setThemeSheetVisible] = useState(false)
  const [languageSheetVisible, setLanguageSheetVisible] = useState(false)
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
    <View style={[themed(styles.$container), containerInsets]}>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={themed(styles.$content)}
      >
        <HomeTopBar
          onPressLanguage={() => setLanguageSheetVisible(true)}
          onPressTheme={() => setThemeSheetVisible(true)}
          onPressNotifications={() => setNotificationsVisible(true)}
        />

        <View style={themed(styles.$hero)}>
          <View
            style={themed(styles.$badge)}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <SvgIcon icon="Earth" size={theme.spacing.xl} fill={theme.colors.palette.primary600} />
          </View>

          <Text preset="heading" tx="home:title" style={themed(styles.$title)} />
          <Text preset="formHelper" tx="home:subtitle" style={themed(styles.$subtitle)} />

          <Button
            preset="primary"
            tx="home:createRequest"
            style={themed(styles.$cta)}
            onPress={() => navigation.navigate("Request")}
          />
        </View>

        <QuickActions
          onPressMyRequests={openHistory}
          onPressHowItWorks={() => setHowItWorksVisible(true)}
        />

        {RECENT_REQUEST && (
          <View style={themed(cardStyles.$recentSection)}>
            <Text preset="bold" tx="home:recent.title" style={themed(cardStyles.$recentTitle)} />
            <RecentRequestCard order={RECENT_REQUEST} onPress={openRecentOrder} />
          </View>
        )}
      </ScrollView>
      <ThemeSheet visible={themeSheetVisible} onClose={() => setThemeSheetVisible(false)} />
      <LanguageSheet
        visible={languageSheetVisible}
        onClose={() => setLanguageSheetVisible(false)}
      />
      <NotificationsSheet
        visible={notificationsVisible}
        onClose={() => setNotificationsVisible(false)}
      />
      <HowItWorksSheet visible={howItWorksVisible} onClose={() => setHowItWorksVisible(false)} />
    </View>
  )
}

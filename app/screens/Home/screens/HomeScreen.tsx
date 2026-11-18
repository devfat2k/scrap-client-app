import { FC, useRef, useState } from "react"
import { ScrollView, View } from "react-native"
import { useNavigation, useScrollToTop } from "@react-navigation/native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { AppStackParamList } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

import { HomeTopBar } from "../components/HomeTopBar"
import { HowItWorksSheet } from "../components/HowItWorksSheet"
import { LanguageSheet } from "../components/LanguageSheet"
import { NotificationsSheet } from "../components/NotificationsSheet"
import { QuickActions } from "../components/QuickActions"
import { RecentRequestCard } from "../components/RecentRequestCard"
import { ThemeSheet } from "../components/ThemeSheet"
import { RECENT_REQUEST } from "../mocks/recentRequest"
import { createStyles as createCardStyles } from "../styles/homeCardsStyles"
import { createStyles } from "../styles/homeScreenStyles"

export const HomeScreen: FC = () => {
  const styles = useStyles(createStyles)
  const cardStyles = useStyles(createCardStyles)

  const { theme } = useAppTheme()
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
    <View style={[styles.container, containerInsets]}>
      <ScrollView
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
      >
        <HomeTopBar
          onPressLanguage={() => setLanguageSheetVisible(true)}
          onPressTheme={() => setThemeSheetVisible(true)}
          onPressNotifications={() => setNotificationsVisible(true)}
        />

        <View style={styles.hero}>
          <View
            style={styles.badge}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <SvgIcon icon="Earth" size={theme.spacing.xl} fill={theme.colors.palette.primary600} />
          </View>

          <Text preset="heading" tx="home:title" />
          <Text preset="formHelper" tx="home:subtitle" style={styles.subtitle} />

          <Button
            preset="primary"
            tx="home:createRequest"
            style={styles.cta}
            onPress={() => navigation.navigate("Request")}
          />
        </View>

        <QuickActions
          onPressMyRequests={openHistory}
          onPressHowItWorks={() => setHowItWorksVisible(true)}
        />

        {RECENT_REQUEST && (
          <View style={cardStyles.recentSection}>
            <Text preset="bold" tx="home:recent.title" />
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

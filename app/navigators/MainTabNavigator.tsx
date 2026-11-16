import { FC } from "react"
import { Platform } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import SvgIcon from "@/components/SvgIcon"
import type { MainTabParamList } from "@/navigators/navigationTypes"
import { AccountStack } from "@/screens/Account/stack/AccountStack"
import { HistoryStack } from "@/screens/History/stack/HistoryStack"
import { HomeStack } from "@/screens/Home/stack/HomeStack"
import { useAppTheme } from "@/theme/context"
import { spacing } from "@/theme/spacingDark"
import { ThemedStyle } from "@/theme/types"

const Tab = createBottomTabNavigator<MainTabParamList>()

export const MainTabNavigator: FC = () => {
  const {
    theme: { colors },
    themed,
  } = useAppTheme()
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: themed($tabBarLabel),
        tabBarStyle: {
          position: "absolute",
          height: spacing.xxxl + spacing.sm,
          paddingTop: spacing.xs,
          paddingBottom: spacing.xs,
          bottom:
            Platform.OS === "android" ? insets.bottom + spacing.xs : insets.bottom + spacing.xs,
          left: spacing.md + spacing.xs,
          right: spacing.md + spacing.xs,
          borderRadius: spacing.md + spacing.xxs,
          borderWidth: 1,
          borderColor: colors.palette.neutral800,
          elevation: 12,
          shadowColor: colors.palette.neutral900,
          shadowOffset: { width: 0, height: spacing.xxs },
          shadowOpacity: 0.12,
          shadowRadius: 12,
          marginHorizontal: spacing.sm,
          overflow: "visible",
          // backgroundColor: colors.cardAccentBackground,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <SvgIcon name="Home" size={size} fill={color} />,
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryStack}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => <SvgIcon name="History" size={size} fill={color} />,
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, size }) => <SvgIcon name="Profile" size={size} fill={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBarLabel: ThemedStyle<object> = ({ spacing }) => ({
  fontSize: spacing.sm,
  marginBottom: spacing.xxs,
  marginTop: spacing.xxs,
})

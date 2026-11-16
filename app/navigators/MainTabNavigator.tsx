import { FC } from "react"
import { StyleSheet, View, type TextStyle, type ViewStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import SvgIcon, { type SvgIconProps } from "@/components/SvgIcon"
import type { MainTabParamList } from "@/navigators/navigationTypes"
import { AccountStack } from "@/screens/Account/stack/AccountStack"
import { HistoryStack } from "@/screens/History/stack/HistoryStack"
import { HomeStack } from "@/screens/Home/stack/HomeStack"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

const Tab = createBottomTabNavigator<MainTabParamList>()

type TabBarIconProps = {
  name: NonNullable<SvgIconProps["name"]>
  focused: boolean
  color: string
  size: number
}

const TabBarIcon = ({ name, color, size }: TabBarIconProps) => {
  const { themed } = useAppTheme()

  return (
    <View style={themed($tabBarIcon)}>
      <SvgIcon name={name} size={size} fill={color} />
    </View>
  )
}

export const MainTabNavigator: FC = () => {
  const { theme, themed } = useAppTheme()
  const { colors, spacing } = theme
  const insets = useSafeAreaInsets()
  const activeTintColor = theme.isDark ? colors.palette.primary400 : colors.palette.primary600

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: themed($tabBarLabel),
        tabBarHideOnKeyboard: true,
        tabBarStyle: [themed($tabBar), { bottom: insets.bottom + spacing.xs }],
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon name="Home" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="HistoryTab"
        component={HistoryStack}
        options={({ route }) => ({
          tabBarLabel: "History",
          tabBarStyle:
            getFocusedRouteNameFromRoute(route) === "OrderDetailScreen"
              ? $hiddenTabBar
              : [themed($tabBar), { bottom: insets.bottom + spacing.xs }],
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon name="History" focused={focused} color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color, focused, size }) => (
            <TabBarIcon name="Profile" focused={focused} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  position: "absolute",
  height: spacing.xxxl + spacing.xxs,
  left: spacing.xs,
  right: spacing.xs,
  marginHorizontal: spacing.md,
  paddingHorizontal: spacing.xs,
  paddingTop: spacing.xs,
  paddingBottom: spacing.xs,
  borderRadius: (spacing.xxxl + spacing.xxs) / 2,
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: colors.border,
  backgroundColor: colors.card,
  borderCurve: "continuous",
  overflow: "visible",
  elevation: spacing.xxs,
  shadowColor: colors.palette.overlay20,
  shadowOffset: { width: 0, height: spacing.xs },
  shadowOpacity: 1,
  shadowRadius: spacing.md,
})

const $hiddenTabBar: ViewStyle = {
  display: "none",
}

const $tabBarLabel: ThemedStyle<TextStyle> = ({ spacing, typography }) => ({
  fontFamily: typography.primary.medium,
  fontSize: spacing.sm,
  marginTop: spacing.xxs,
  marginBottom: 0,
})

const $tabBarIcon: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  alignItems: "center",
  justifyContent: "center",
  height: spacing.xl - spacing.xxs,
  minWidth: spacing.xl + spacing.xs,
  borderRadius: spacing.md,
})

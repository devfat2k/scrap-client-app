import { FC } from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import SvgIcon from "@/components/SvgIcon"
import type { MainTabParamList } from "@/navigators/navigationTypes"
import { AccountStack } from "@/screens/Account/stack/AccountStack"
import { HistoryStack } from "@/screens/History/stack/HistoryStack"
import { HomeStack } from "@/screens/Home/stack/HomeStack"
import { useAppTheme } from "@/theme/context"

const Tab = createBottomTabNavigator<MainTabParamList>()

export const MainTabNavigator: FC = () => {
  const {
    theme: { colors },
  } = useAppTheme()

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.textDim,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
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

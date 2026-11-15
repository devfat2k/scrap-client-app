import { FC } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import type { AccountStackParamList } from "@/navigators/navigationTypes"

import { AccountScreen } from "../screens/AccountScreen"

const Stack = createNativeStackNavigator<AccountStackParamList>()

export const AccountStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="AccountScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountScreen" component={AccountScreen} />
    </Stack.Navigator>
  )
}

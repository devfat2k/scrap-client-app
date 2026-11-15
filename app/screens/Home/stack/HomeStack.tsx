import { FC } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import type { HomeStackParamList } from "@/navigators/navigationTypes"

import { HomeScreen } from "../screens/HomeScreen"

const Stack = createNativeStackNavigator<HomeStackParamList>()

export const HomeStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )
}

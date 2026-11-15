import { FC } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import type { HistoryStackParamList } from "@/navigators/navigationTypes"

import { HistoryScreen } from "../screens/HistoryScreen"

const Stack = createNativeStackNavigator<HistoryStackParamList>()

export const HistoryStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="HistoryScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
    </Stack.Navigator>
  )
}

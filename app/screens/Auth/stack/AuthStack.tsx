import { FC } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import type { AuthStackParamList } from "@/navigators/navigationTypes"

import { SignInScreen } from "../screens/SignInScreen"

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
  )
}

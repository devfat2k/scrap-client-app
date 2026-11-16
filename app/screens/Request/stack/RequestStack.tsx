import { FC } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import type { RequestStackParamList } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"

import { CreateRequestScreen } from "../screens/CreateRequestScreen"
import { RequestSuccessScreen } from "../screens/RequestSuccessScreen"

const Stack = createNativeStackNavigator<RequestStackParamList>()

export const RequestStack: FC = () => {
  const { theme } = useAppTheme()
  const { colors } = theme

  return (
    <Stack.Navigator
      initialRouteName="CreateRequestScreen"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="CreateRequestScreen" component={CreateRequestScreen} />
      <Stack.Screen
        name="RequestSuccessScreen"
        component={RequestSuccessScreen}
        options={{ gestureEnabled: false }}
      />
    </Stack.Navigator>
  )
}

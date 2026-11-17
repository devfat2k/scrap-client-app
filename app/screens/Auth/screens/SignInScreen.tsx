import { FC } from "react"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"

import { styles } from "../styles/authStyles"

export const SignInScreen: FC = () => {
  const { themed, themeContext } = useAppTheme()

  return (
    <View style={themed(styles.$container)}>
      <StatusBar style={themeContext === "dark" ? "light" : "dark"} />
      <Text preset="subheading" style={themed(styles.$text)} text="Sign In" />
    </View>
  )
}

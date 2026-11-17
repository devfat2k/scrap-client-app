import { FC } from "react"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"

import { styles } from "../styles/accountScreenStyles"

export const AccountScreen: FC = () => {
  const { themed, themeContext } = useAppTheme()

  return (
    <View style={themed(styles.$container)}>
      <StatusBar style={themeContext === "dark" ? "light" : "dark"} />
      <Text preset="subheading" style={themed(styles.$text)} text="Account" />
    </View>
  )
}

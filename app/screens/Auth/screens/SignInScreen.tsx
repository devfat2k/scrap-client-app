import { FC } from "react"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"

import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/authStyles"

export const SignInScreen: FC = () => {
  const styles = useStyles(createStyles)

  const { themeContext } = useAppTheme()

  return (
    <View style={styles.container}>
      <StatusBar style={themeContext === "dark" ? "light" : "dark"} />
      <Text preset="subheading" style={styles.text} text="Sign In" />
    </View>
  )
}

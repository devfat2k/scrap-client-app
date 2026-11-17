import { FC, useEffect } from "react"
import { View } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"
import { StatusBar } from "expo-status-bar"
import { MotiView } from "moti"

import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export const SplashScreen: FC<AppStackScreenProps<"Splash">> = ({ navigation }) => {
  const { themed, themeContext } = useAppTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("MainTab")
    }, 1800)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={themed(styles.$container)}>
      <StatusBar style={themeContext === "dark" ? "light" : "dark"} />
      <MotiView
        from={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 800 }}
      >
        <Text preset="heading" style={themed(styles.$title)} text="ScrapUp" />
      </MotiView>
    </View>
  )
}

const styles = {
  $container: (({ colors }) => ({
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
  })) as ThemedStyle<ViewStyle>,

  $title: (({ colors, typography }) => ({
    color: colors.palette.primary500,
    fontFamily: typography.primary.bold,
  })) as ThemedStyle<TextStyle>,
}

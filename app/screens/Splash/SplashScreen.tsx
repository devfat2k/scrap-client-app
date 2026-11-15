import { FC, useEffect } from "react"
import type { TextStyle, ViewStyle } from "react-native"
import { MotiView } from "moti"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export const SplashScreen: FC<AppStackScreenProps<"Splash">> = ({ navigation }) => {
  const { themed } = useAppTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("MainTab")
    }, 1800)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <Screen preset="fixed" contentContainerStyle={themed($container)}>
      <MotiView
        from={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 800 }}
      >
        <Text preset="heading" style={themed($title)} text="ScrapUp" />
      </MotiView>
    </Screen>
  )
}

const $container: ThemedStyle<ViewStyle> = ({ colors }) => ({
  alignItems: "center",
  backgroundColor: colors.background,
  flex: 1,
  justifyContent: "center",
})

const $title: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.primary500,
  fontFamily: typography.primary.bold,
})

import { FC, useEffect } from "react"
import { View } from "react-native"
import { StatusBar } from "expo-status-bar"
import { MotiView } from "moti"

import { Text } from "@/components/Text"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"

export const SplashScreen: FC<AppStackScreenProps<"Splash">> = ({ navigation }) => {
  const styles = useStyles(createStyles)

  const { themeContext } = useAppTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("MainTab")
    }, 1800)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View style={styles.container}>
      <StatusBar style={themeContext === "dark" ? "light" : "dark"} />
      <MotiView
        from={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 800 }}
      >
        <Text preset="heading" style={styles.title} text="ScrapUp" />
      </MotiView>
    </View>
  )
}

const createStyles = ({ colors, typography }: Theme) =>
  ({
    container: {
      alignItems: "center",
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "center",
    },
    title: {
      color: colors.palette.primary500,
      fontFamily: typography.primary.bold,
    },
  }) as const

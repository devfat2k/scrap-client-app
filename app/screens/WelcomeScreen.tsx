import { FC } from "react"
import { Image, View } from "react-native"
import { StatusBar } from "expo-status-bar"

import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("@assets/images/logo.png")
const welcomeFace = require("@assets/images/welcome-face.png")

export const WelcomeScreen: FC = function WelcomeScreen() {
  const styles = useStyles(createStyles)

  const { theme, themeContext } = useAppTheme()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={styles.container}>
      <StatusBar style={themeContext === "dark" ? "light" : "dark"} />
      <View style={styles.topContainer}>
        <Image
          style={styles.welcomeLogo}
          source={welcomeLogo}
          resizeMode="contain"
          accessibilityLabel="App logo"
        />
        <Text
          testID="welcome-heading"
          style={styles.welcomeHeading}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" />
        <Image
          style={styles.welcomeFace}
          source={welcomeFace}
          resizeMode="contain"
          tintColor={theme.colors.palette.neutral900}
          accessibilityLabel="Welcome illustration"
        />
      </View>

      <View style={[styles.bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen:postscript" size="md" />
      </View>
    </View>
  )
}

const createStyles = ({ colors, spacing }: Theme) =>
  ({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    topContainer: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: "57%",
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
    },
    bottomContainer: {
      flexShrink: 1,
      flexGrow: 0,
      flexBasis: "43%",
      backgroundColor: colors.palette.neutral100,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingHorizontal: spacing.lg,
      justifyContent: "space-around",
    },
    welcomeLogo: {
      height: 88,
      width: "100%",
      marginBottom: spacing.xxl,
    },
    welcomeFace: {
      height: 169,
      width: 269,
      position: "absolute",
      bottom: -47,
      right: -80,
      transform: [{ scaleX: isRTL ? -1 : 1 }],
    },
    welcomeHeading: {
      marginBottom: spacing.md,
    },
  }) as const

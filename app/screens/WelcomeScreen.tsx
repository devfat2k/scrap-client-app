import { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { StatusBar } from "expo-status-bar"

import { Text } from "@/components/Text"
import { isRTL } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("@assets/images/logo.png")
const welcomeFace = require("@assets/images/welcome-face.png")

export const WelcomeScreen: FC = function WelcomeScreen() {
  const { themed, theme, themeContext } = useAppTheme()

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={themed(styles.$container)}>
      <StatusBar style={themeContext === "dark" ? "light" : "dark"} />
      <View style={themed(styles.$topContainer)}>
        <Image
          style={themed(styles.$welcomeLogo)}
          source={welcomeLogo}
          resizeMode="contain"
          accessibilityLabel="App logo"
        />
        <Text
          testID="welcome-heading"
          style={themed(styles.$welcomeHeading)}
          tx="welcomeScreen:readyForLaunch"
          preset="heading"
        />
        <Text tx="welcomeScreen:exciting" preset="subheading" />
        <Image
          style={styles.$welcomeFace}
          source={welcomeFace}
          resizeMode="contain"
          tintColor={theme.colors.palette.neutral900}
          accessibilityLabel="Welcome illustration"
        />
      </View>

      <View style={themed([styles.$bottomContainer, $bottomContainerInsets])}>
        <Text tx="welcomeScreen:postscript" size="md" />
      </View>
    </View>
  )
}

const styles = {
  $container: (({ colors }) => ({
    flex: 1,
    backgroundColor: colors.background,
  })) as ThemedStyle<ViewStyle>,
  $topContainer: (({ spacing }) => ({
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: "57%",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  })) as ThemedStyle<ViewStyle>,

  $bottomContainer: (({ colors, spacing }) => ({
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: "43%",
    backgroundColor: colors.palette.neutral100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: spacing.lg,
    justifyContent: "space-around",
  })) as ThemedStyle<ViewStyle>,

  $welcomeLogo: (({ spacing }) => ({
    height: 88,
    width: "100%",
    marginBottom: spacing.xxl,
  })) as ThemedStyle<ImageStyle>,

  $welcomeFace: {
    height: 169,
    width: 269,
    position: "absolute",
    bottom: -47,
    right: -80,
    transform: [{ scaleX: isRTL ? -1 : 1 }],
  } as ImageStyle,

  $welcomeHeading: (({ spacing }) => ({
    marginBottom: spacing.md,
  })) as ThemedStyle<TextStyle>,
}

import { Pressable, View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"

import { styles } from "../styles/homeScreenStyles"

export interface HomeTopBarProps {
  /**
   * Opens the theme picker sheet.
   */
  onPressTheme: () => void
  /**
   * Opens the notifications sheet.
   */
  onPressNotifications: () => void
}

/**
 * Greeting plus the Home quick controls: theme and notifications.
 */
export function HomeTopBar(props: HomeTopBarProps) {
  const { onPressTheme, onPressNotifications } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed(styles.$topBar)}>
      <View style={themed(styles.$greetingBlock)}>
        <Text preset="subheading" tx="home:greeting" style={themed(styles.$greeting)} />
        <Text
          preset="formHelper"
          tx="home:greetingSubtitle"
          style={themed(styles.$greetingSubtitle)}
        />
      </View>

      <View style={themed(styles.$headerActions)}>
        <Pressable
          onPress={onPressTheme}
          accessibilityRole="button"
          accessibilityLabel={translate("home:themeAction")}
          hitSlop={theme.spacing.xs}
          style={({ pressed }) => [
            themed(styles.$actionButton),
            pressed && themed(styles.$actionButtonPressed),
          ]}
        >
          <SvgIcon icon={theme.isDark ? "Sun" : "Moon"} size={20} fill={theme.colors.text} />
        </Pressable>

        <Pressable
          onPress={onPressNotifications}
          accessibilityRole="button"
          accessibilityLabel={translate("home:notificationsAction")}
          hitSlop={theme.spacing.xs}
          style={({ pressed }) => [
            themed(styles.$actionButton),
            pressed && themed(styles.$actionButtonPressed),
          ]}
        >
          <SvgIcon icon="Bell" size={20} fill={theme.colors.text} />
        </Pressable>
      </View>
    </View>
  )
}

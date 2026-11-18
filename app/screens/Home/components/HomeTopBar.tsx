import { Pressable, View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/homeScreenStyles"

export interface HomeTopBarProps {
  onPressLanguage: () => void
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
  const styles = useStyles(createStyles)

  const { onPressTheme, onPressNotifications, onPressLanguage } = props
  const { theme } = useAppTheme()

  return (
    <View style={styles.topBar}>
      <View style={styles.greetingBlock}>
        <Text preset="subheading" tx="home:greeting" style={styles.greeting} />
        <Text preset="formHelper" tx="home:greetingSubtitle" style={styles.greetingSubtitle} />
      </View>

      <View style={styles.headerActions}>
        <Pressable
          onPress={onPressLanguage}
          accessibilityRole="button"
          accessibilityLabel={translate("home:languageAction")}
          hitSlop={theme.spacing.xs}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
        >
          <SvgIcon icon="Earth" size={20} fill={theme.colors.text} />
        </Pressable>
        <Pressable
          onPress={onPressTheme}
          accessibilityRole="button"
          accessibilityLabel={translate("home:themeAction")}
          hitSlop={theme.spacing.xs}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
        >
          <SvgIcon icon={theme.isDark ? "Sun" : "Moon"} size={20} fill={theme.colors.text} />
        </Pressable>

        <Pressable
          onPress={onPressNotifications}
          accessibilityRole="button"
          accessibilityLabel={translate("home:notificationsAction")}
          hitSlop={theme.spacing.xs}
          style={({ pressed }) => [styles.actionButton, pressed && styles.actionButtonPressed]}
        >
          <SvgIcon icon="Bell" size={20} fill={theme.colors.text} />
        </Pressable>
      </View>
    </View>
  )
}

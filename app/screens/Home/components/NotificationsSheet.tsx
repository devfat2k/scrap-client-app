import { View } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { HomeSheet } from "./HomeSheet"

export interface NotificationsSheetProps {
  /**
   * Whether the sheet is visible.
   */
  visible: boolean
  /**
   * Called when the sheet is dismissed.
   */
  onClose: () => void
}

/**
 * Notifications entry point. Empty until the notifications API is wired.
 */
export function NotificationsSheet(props: NotificationsSheetProps) {
  const { visible, onClose } = props
  const { themed, theme } = useAppTheme()

  return (
    <HomeSheet visible={visible} onClose={onClose} titleTx="home:notifications.title">
      <View style={themed(styles.$empty)}>
        <View
          style={themed(styles.$iconBadge)}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <SvgIcon icon="Bell" size={theme.spacing.xl} fill={theme.colors.palette.primary600} />
        </View>

        <Text preset="bold" tx="home:notifications.emptyTitle" style={themed(styles.$emptyTitle)} />
        <Text
          preset="formHelper"
          tx="home:notifications.emptyMessage"
          style={themed(styles.$emptyMessage)}
        />
      </View>
    </HomeSheet>
  )
}

const styles = {
  $empty: (({ spacing }) => ({
    alignItems: "center",
    gap: spacing.xs,
    paddingVertical: spacing.lg,
  })) as ThemedStyle<ViewStyle>,

  $iconBadge: (({ colors, spacing }) => ({
    alignItems: "center",
    justifyContent: "center",
    width: spacing.xxl,
    height: spacing.xxl,
    borderRadius: spacing.xxl / 2,
    backgroundColor: colors.palette.primary100,
    marginBottom: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $emptyTitle: (({ colors }) => ({
    color: colors.text,
    textAlign: "center",
  })) as ThemedStyle<TextStyle>,

  $emptyMessage: (({ colors }) => ({
    color: colors.textDim,
    textAlign: "center",
  })) as ThemedStyle<TextStyle>,
}

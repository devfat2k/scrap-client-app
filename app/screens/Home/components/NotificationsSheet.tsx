import { View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"

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
  const styles = useStyles(createStyles)

  const { visible, onClose } = props
  const { theme } = useAppTheme()

  return (
    <HomeSheet visible={visible} onClose={onClose} titleTx="home:notifications.title">
      <View style={styles.empty}>
        <View
          style={styles.iconBadge}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <SvgIcon icon="Bell" size={theme.spacing.xl} fill={theme.colors.palette.primary600} />
        </View>

        <Text preset="bold" tx="home:notifications.emptyTitle" style={styles.emptyTitle} />
        <Text
          preset="formHelper"
          tx="home:notifications.emptyMessage"
          style={styles.emptyMessage}
        />
      </View>
    </HomeSheet>
  )
}

const createStyles = ({ spacing, colors }: Theme) =>
  ({
    empty: {
      alignItems: "center",
      gap: spacing.xs,
      paddingVertical: spacing.lg,
    },
    iconBadge: {
      alignItems: "center",
      justifyContent: "center",
      width: spacing.xxl,
      height: spacing.xxl,
      borderRadius: spacing.xxl / 2,
      backgroundColor: colors.palette.primary100,
      marginBottom: spacing.xs,
    },
    emptyTitle: {
      color: colors.text,
      textAlign: "center",
    },
    emptyMessage: {
      color: colors.textDim,
      textAlign: "center",
    },
  }) as const

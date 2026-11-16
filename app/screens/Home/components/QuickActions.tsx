import { Pressable, View } from "react-native"

import type { ISvgType } from "@assets/svg"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"

import {
  $quickAction,
  $quickActionHint,
  $quickActionIcon,
  $quickActionIconPrimary,
  $quickActionIconSecondary,
  $quickActionPressed,
  $quickActions,
  $quickActionTitle,
} from "../styles/homeCardsStyles"

export interface QuickActionsProps {
  /**
   * Opens the History tab.
   */
  onPressMyRequests: () => void
  /**
   * Opens the "How it works" sheet.
   */
  onPressHowItWorks: () => void
}

interface QuickActionCardProps {
  icon: ISvgType
  titleTx: TxKeyPath
  hintTx: TxKeyPath
  tone: "primary" | "secondary"
  onPress: () => void
}

function QuickActionCard(props: QuickActionCardProps) {
  const { icon, titleTx, hintTx, tone, onPress } = props
  const { themed, theme } = useAppTheme()
  const iconFill =
    tone === "primary" ? theme.colors.palette.primary600 : theme.colors.palette.secondary500

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={translate(titleTx)}
      style={({ pressed }) => [themed($quickAction), pressed && themed($quickActionPressed)]}
    >
      <View
        style={[
          themed($quickActionIcon),
          tone === "primary" ? themed($quickActionIconPrimary) : themed($quickActionIconSecondary),
        ]}
      >
        <SvgIcon icon={icon} size={20} fill={iconFill} />
      </View>

      <Text preset="bold" tx={titleTx} style={themed($quickActionTitle)} />
      <Text preset="formHelper" tx={hintTx} style={themed($quickActionHint)} />
    </Pressable>
  )
}

/**
 * Two shortcuts under the hero: request history and a short process explainer.
 */
export function QuickActions(props: QuickActionsProps) {
  const { onPressMyRequests, onPressHowItWorks } = props
  const { themed } = useAppTheme()

  return (
    <View style={themed($quickActions)}>
      <QuickActionCard
        icon="History"
        titleTx="home:quickActions.myRequests"
        hintTx="home:quickActions.myRequestsHint"
        tone="primary"
        onPress={onPressMyRequests}
      />
      <QuickActionCard
        icon="Clock"
        titleTx="home:quickActions.howItWorks"
        hintTx="home:quickActions.howItWorksHint"
        tone="secondary"
        onPress={onPressHowItWorks}
      />
    </View>
  )
}

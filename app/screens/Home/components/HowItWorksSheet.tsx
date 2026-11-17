import { View } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ISvgType } from "@assets/svg"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { HomeSheet } from "./HomeSheet"

const STEPS: { icon: ISvgType; titleTx: TxKeyPath; bodyTx: TxKeyPath }[] = [
  { icon: "Send", titleTx: "home:howItWorks.step1Title", bodyTx: "home:howItWorks.step1Body" },
  { icon: "Clock", titleTx: "home:howItWorks.step2Title", bodyTx: "home:howItWorks.step2Body" },
  { icon: "Check", titleTx: "home:howItWorks.step3Title", bodyTx: "home:howItWorks.step3Body" },
]

export interface HowItWorksSheetProps {
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
 * Three-step explainer shown from the Home quick actions.
 */
export function HowItWorksSheet(props: HowItWorksSheetProps) {
  const { visible, onClose } = props
  const { themed, theme } = useAppTheme()

  return (
    <HomeSheet visible={visible} onClose={onClose} titleTx="home:howItWorks.title">
      <View style={themed(styles.$steps)}>
        {STEPS.map((step) => (
          <View key={step.titleTx} style={themed(styles.$step)}>
            <View style={themed(styles.$stepIcon)}>
              <SvgIcon icon={step.icon} size={18} fill={theme.colors.palette.primary600} />
            </View>

            <View style={themed(styles.$stepText)}>
              <Text preset="bold" tx={step.titleTx} style={themed(styles.$stepTitle)} />
              <Text preset="formHelper" tx={step.bodyTx} style={themed(styles.$stepBody)} />
            </View>
          </View>
        ))}
      </View>
    </HomeSheet>
  )
}

const styles = {
  $steps: (({ spacing }) => ({
    gap: spacing.md,
    paddingVertical: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $step: (({ spacing }) => ({
    flexDirection: "row",
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $stepIcon: (({ colors, spacing }) => ({
    alignItems: "center",
    justifyContent: "center",
    width: spacing.xl + spacing.xxs,
    height: spacing.xl + spacing.xxs,
    borderRadius: (spacing.xl + spacing.xxs) / 2,
    backgroundColor: colors.palette.primary100,
  })) as ThemedStyle<ViewStyle>,

  $stepText: (({ spacing }) => ({
    flex: 1,
    gap: spacing.xxxs,
  })) as ThemedStyle<ViewStyle>,

  $stepTitle: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $stepBody: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,
}

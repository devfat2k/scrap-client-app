import { View } from "react-native"

import type { ISvgType } from "@assets/svg"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"

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
  const styles = useStyles(createStyles)

  const { visible, onClose } = props
  const { theme } = useAppTheme()

  return (
    <HomeSheet visible={visible} onClose={onClose} titleTx="home:howItWorks.title">
      <View style={styles.steps}>
        {STEPS.map((step) => (
          <View key={step.titleTx} style={styles.step}>
            <View style={styles.stepIcon}>
              <SvgIcon icon={step.icon} size={18} fill={theme.colors.palette.primary600} />
            </View>

            <View style={styles.stepText}>
              <Text preset="bold" tx={step.titleTx} style={styles.stepTitle} />
              <Text preset="formHelper" tx={step.bodyTx} style={styles.stepBody} />
            </View>
          </View>
        ))}
      </View>
    </HomeSheet>
  )
}

const createStyles = ({ spacing, colors }: Theme) =>
  ({
    steps: {
      gap: spacing.md,
      paddingVertical: spacing.xs,
    },
    step: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    stepIcon: {
      alignItems: "center",
      justifyContent: "center",
      width: spacing.xl + spacing.xxs,
      height: spacing.xl + spacing.xxs,
      borderRadius: (spacing.xl + spacing.xxs) / 2,
      backgroundColor: colors.palette.primary100,
    },
    stepText: {
      flex: 1,
      gap: spacing.xxxs,
    },
    stepTitle: {
      color: colors.text,
    },
    stepBody: {
      color: colors.textDim,
    },
  }) as const

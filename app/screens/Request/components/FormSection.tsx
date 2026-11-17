import { PropsWithChildren } from "react"
import { StyleSheet, TextStyle, View, ViewStyle } from "react-native"

import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

export interface FormSectionProps {
  /**
   * 1-based step number shown in the badge.
   */
  step: number
  /**
   * Section title looked up via i18n.
   */
  titleTx: TxKeyPath
}

/**
 * Titled, numbered section wrapper for the create request form.
 */
export function FormSection(props: PropsWithChildren<FormSectionProps>) {
  const { step, titleTx, children } = props
  const { themed } = useAppTheme()

  return (
    <View style={themed(styles.$formSection)}>
      <View style={themed(styles.$formSectionHeader)}>
        <View style={themed(styles.$formSectionBadge)}>
          <Text
            preset="formHelper"
            text={String(step)}
            style={themed(styles.$formSectionBadgeText)}
          />
        </View>
        <Text preset="subheading" tx={titleTx} style={themed(styles.$formSectionTitle)} />
      </View>

      <View style={themed(styles.$formSectionDivider)} />

      {children}
    </View>
  )
}

const styles = {
  $formSection: (({ spacing }) => ({
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $formSectionHeader: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $formSectionBadge: (({ spacing }) => ({
    width: spacing.lg,
    height: spacing.lg,
    borderRadius: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  })) as ThemedStyle<ViewStyle>,

  $formSectionBadgeText: (({ colors, typography }) => ({
    color: colors.palette.primary600,
    fontFamily: typography.primary.semiBold,
  })) as ThemedStyle<TextStyle>,

  $formSectionTitle: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $formSectionDivider: (({ colors }) => ({
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
  })) as ThemedStyle<ViewStyle>,
}

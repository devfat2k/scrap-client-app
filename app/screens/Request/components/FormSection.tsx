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
    <View style={themed($formSection)}>
      <View style={themed($formSectionHeader)}>
        <View style={themed($formSectionBadge)}>
          <Text preset="formHelper" text={String(step)} style={themed($formSectionBadgeText)} />
        </View>
        <Text preset="subheading" tx={titleTx} style={themed($formSectionTitle)} />
      </View>

      <View style={themed($formSectionDivider)} />

      {children}
    </View>
  )
}

const $formSection: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

const $formSectionHeader: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.xs,
})

const $formSectionBadge: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: spacing.lg,
  height: spacing.lg,
  borderRadius: spacing.sm,
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: colors.palette.primary100,
})

const $formSectionBadgeText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.palette.primary600,
  fontFamily: typography.primary.semiBold,
})

const $formSectionTitle: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $formSectionDivider: ThemedStyle<ViewStyle> = ({ colors }) => ({
  height: StyleSheet.hairlineWidth,
  backgroundColor: colors.separator,
})

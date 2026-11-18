import { PropsWithChildren } from "react"
import { StyleSheet, View } from "react-native"

import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"

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
  const styles = useStyles(createStyles)

  const { step, titleTx, children } = props
  return (
    <View style={styles.formSection}>
      <View style={styles.formSectionHeader}>
        <View style={styles.formSectionBadge}>
          <Text
            weight="semiBold"
            preset="formHelper"
            text={String(step)}
            style={styles.formSectionBadgeText}
          />
        </View>
        <Text preset="subheading" tx={titleTx} />
      </View>

      <View style={styles.formSectionDivider} />

      {children}
    </View>
  )
}

const createStyles = ({ spacing, colors }: Theme) =>
  ({
    formSection: {
      gap: spacing.sm,
    },
    formSectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    formSectionBadge: {
      width: spacing.lg,
      height: spacing.lg,
      borderRadius: spacing.sm,
      alignItems: "center",
      justifyContent: "center",
    },
    formSectionBadgeText: {
      color: colors.palette.primary600,
    },

    formSectionDivider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.separator,
    },
  }) as const

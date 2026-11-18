import { StyleSheet, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Button } from "@/components/Button"
import { useAppTheme } from "@/theme/context"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"

export interface SubmitBarProps {
  /**
   * Shows the loading spinner and blocks repeat presses.
   */
  isSubmitting: boolean
  /**
   * Disables the submit button, e.g. while offline.
   */
  isOffline: boolean
  /**
   * Called when the submit button is pressed.
   */
  onSubmit: () => void
}

/**
 * Sticky footer with the create request submit button.
 */
export function SubmitBar(props: SubmitBarProps) {
  const styles = useStyles(createStyles)

  const { isSubmitting, isOffline, onSubmit } = props
  const { theme } = useAppTheme()
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.bar, { paddingBottom: theme.spacing.sm + insets.bottom }]}>
      <Button
        preset="primary"
        tx="request:submit"
        loadingTx="request:submitting"
        loading={isSubmitting}
        disabled={isOffline || isSubmitting}
        onPress={onSubmit}
      />
    </View>
  )
}

const createStyles = ({ colors, spacing }: Theme) =>
  ({
    bar: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
      backgroundColor: colors.background,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: colors.separator,
    },
  }) as const

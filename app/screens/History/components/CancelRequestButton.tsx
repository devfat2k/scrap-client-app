import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/cancelRequestStyles"

export interface CancelRequestButtonProps {
  /**
   * Blocks the press, e.g. while offline.
   */
  disabled?: boolean
  /**
   * Opens the cancellation reason sheet.
   */
  onPress: () => void
}

function CancelIcon() {
  const { theme } = useAppTheme()

  return <SvgIcon icon="Close" size={12} fill={theme.colors.error} />
}

/**
 * Danger outline button that starts the cancellation flow for a pending request.
 */
export function CancelRequestButton(props: CancelRequestButtonProps) {
  const styles = useStyles(createStyles)

  const { disabled = false, onPress } = props
  return (
    <Button
      preset="default"
      tx="orderDetail:cancelRequest"
      LeftAccessory={CancelIcon}
      onPress={onPress}
      disabled={disabled}
      style={styles.cancelButton}
      pressedStyle={styles.cancelButtonPressed}
      disabledStyle={styles.cancelButtonDisabled}
      textStyle={styles.cancelText}
    />
  )
}

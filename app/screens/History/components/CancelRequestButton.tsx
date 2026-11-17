import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { useAppTheme } from "@/theme/context"

import { styles } from "../styles/cancelRequestStyles"

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

  return <SvgIcon icon="Close" size={16} fill={theme.colors.error} />
}

/**
 * Danger outline button that starts the cancellation flow for a pending request.
 */
export function CancelRequestButton(props: CancelRequestButtonProps) {
  const { disabled = false, onPress } = props
  const { themed } = useAppTheme()

  return (
    <Button
      preset="default"
      tx="orderDetail:cancelRequest"
      LeftAccessory={CancelIcon}
      onPress={onPress}
      disabled={disabled}
      style={themed(styles.$cancelButton)}
      pressedStyle={themed(styles.$cancelButtonPressed)}
      disabledStyle={themed(styles.$cancelButtonDisabled)}
      textStyle={themed(styles.$cancelText)}
    />
  )
}

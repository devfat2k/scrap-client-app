import { Pressable } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"

import { styles } from "../styles/cancelRequestStyles"
import { CANCEL_REASON_OPTIONS, type CancelReason } from "../utils/cancelReasons"

export interface CancelReasonListProps {
  /**
   * Currently selected reason, or null.
   */
  selected: CancelReason | null
  /**
   * Called when a reason row is pressed.
   */
  onSelect: (reason: CancelReason) => void
}

/**
 * Radio-style reason rows for the cancellation sheet.
 */
export function CancelReasonList(props: CancelReasonListProps) {
  const { selected, onSelect } = props
  const { themed, theme } = useAppTheme()

  return (
    <>
      {CANCEL_REASON_OPTIONS.map((option) => {
        const isSelected = option.value === selected

        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={translate(option.labelTx)}
            style={({ pressed }) => [
              themed(styles.$reasonRow),
              pressed && themed(styles.$reasonPressed),
            ]}
          >
            <Text
              text={translate(option.labelTx)}
              style={[themed(styles.$reasonText), isSelected && themed(styles.$reasonTextSelected)]}
            />
            {isSelected && <SvgIcon icon="Check" size={18} fill={theme.colors.tint} />}
          </Pressable>
        )
      })}
    </>
  )
}

import { Pressable, StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ISvgType } from "@assets/svg"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { HomeSheet } from "./HomeSheet"

type ThemeValue = "light" | "dark"

const THEME_OPTIONS: { value: ThemeValue; labelTx: TxKeyPath; icon: ISvgType }[] = [
  { value: "light", labelTx: "home:theme.light", icon: "Sun" },
  { value: "dark", labelTx: "home:theme.dark", icon: "Moon" },
]

export interface ThemeSheetProps {
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
 * Bottom sheet with the Light/Dark theme choices.
 */
export function ThemeSheet(props: ThemeSheetProps) {
  const { visible, onClose } = props
  const { themed, theme, themeContext, setThemeContextOverride } = useAppTheme()

  function selectTheme(value: ThemeValue) {
    setThemeContextOverride(value)
    onClose()
  }

  return (
    <HomeSheet visible={visible} onClose={onClose} titleTx="home:theme.title">
      {THEME_OPTIONS.map((option) => {
        const isSelected = themeContext === option.value

        return (
          <Pressable
            key={option.value}
            onPress={() => selectTheme(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            style={({ pressed }) => [themed($option), pressed && themed($optionPressed)]}
          >
            <SvgIcon
              icon={option.icon}
              size={20}
              fill={isSelected ? theme.colors.tint : theme.colors.textDim}
            />
            <Text
              tx={option.labelTx}
              style={[themed($optionText), isSelected && themed($optionTextSelected)]}
            />
            {isSelected && <SvgIcon icon="Check" size={20} fill={theme.colors.tint} />}
          </Pressable>
        )
      })}
    </HomeSheet>
  )
}

const $option: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: spacing.xxl,
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: colors.separator,
  paddingVertical: spacing.xs,
})

const $optionPressed: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.7 : 0.6,
})

const $optionText: ThemedStyle<TextStyle> = ({ colors }) => ({
  flex: 1,
  color: colors.text,
})

const $optionTextSelected: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.tint,
  fontFamily: typography.primary.semiBold,
})

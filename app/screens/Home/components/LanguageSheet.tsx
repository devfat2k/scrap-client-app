import { Pressable, StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"
import { useTranslation } from "react-i18next"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { HomeSheet } from "./HomeSheet"

const OPTIONS: { value: string; labelTx: TxKeyPath }[] = [
  { value: "en", labelTx: "home:language.english" },
  { value: "vi", labelTx: "home:language.vietnamese" },
]

export function LanguageSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { i18n } = useTranslation()
  const { themed, theme } = useAppTheme()
  const language = (i18n.resolvedLanguage ?? i18n.language).split("-")[0]

  async function selectLanguage(value: string) {
    await i18n.changeLanguage(value)
    onClose()
  }

  return (
    <HomeSheet visible={visible} onClose={onClose} titleTx="home:language.title">
      {OPTIONS.map((option) => (
        <Pressable
          key={option.value}
          accessibilityRole="button"
          accessibilityState={{ selected: language === option.value }}
          onPress={() => void selectLanguage(option.value)}
          style={({ pressed }) => [themed($option), pressed && $pressed]}
        >
          <Text tx={option.labelTx} style={themed($label)} />
          {language === option.value && <SvgIcon icon="Check" size={20} fill={theme.colors.tint} />}
        </Pressable>
      ))}
    </HomeSheet>
  )
}

const $option: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: spacing.xxl,
  flexDirection: "row",
  alignItems: "center",
  gap: spacing.sm,
  paddingVertical: spacing.xs,
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: colors.separator,
})
const $label: ThemedStyle<TextStyle> = ({ colors }) => ({ flex: 1, color: colors.text })
const $pressed: ViewStyle = { opacity: 0.6 }

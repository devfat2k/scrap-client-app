import { Pressable, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"

import { HomeSheet } from "./HomeSheet"

const OPTIONS: { value: string; labelTx: TxKeyPath }[] = [
  { value: "en", labelTx: "home:language.english" },
  { value: "vi", labelTx: "home:language.vietnamese" },
]

export function LanguageSheet({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { i18n } = useTranslation()
  const styles = useStyles(createStyles)
  const { theme } = useAppTheme()
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
          style={({ pressed }) => [styles.option, pressed && styles.pressed]}
        >
          <Text tx={option.labelTx} style={styles.label} />
          {language === option.value && <SvgIcon icon="Check" size={20} fill={theme.colors.tint} />}
        </Pressable>
      ))}
    </HomeSheet>
  )
}

const createStyles = ({ colors, spacing }: Theme) =>
  ({
    option: {
      minHeight: spacing.xxl,
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      paddingVertical: spacing.xs,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.separator,
    },
    label: { flex: 1 },
    pressed: { opacity: 0.6 },
  }) as const

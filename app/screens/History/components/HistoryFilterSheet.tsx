import { useEffect, useState } from "react"
import { Pressable, View } from "react-native"

import { AppSheet } from "@/components/AppSheet"
import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { CATEGORY_OPTIONS } from "@/domain/scrapOptions"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/historyScreenStyles"
import { DEFAULT_HISTORY_FILTERS, type HistoryFilters } from "../utils/historyFilters"

interface Props {
  visible: boolean
  appliedFilters: HistoryFilters
  onApply: (filters: HistoryFilters) => void
  onClose: () => void
}

const DATE_OPTIONS = [null, 30, 90] as const

export function HistoryFilterSheet({ visible, appliedFilters, onApply, onClose }: Props) {
  const styles = useStyles(createStyles)
  const { theme } = useAppTheme()
  const [draft, setDraft] = useState<HistoryFilters>(appliedFilters)
  useEffect(() => {
    if (!visible) return
    const timer = setTimeout(
      () => setDraft({ ...appliedFilters, categories: [...appliedFilters.categories] }),
      0,
    )
    return () => clearTimeout(timer)
  }, [visible, appliedFilters])

  function toggleCategory(category: HistoryFilters["categories"][number]) {
    setDraft((current) => ({
      ...current,
      categories: current.categories.includes(category)
        ? current.categories.filter((item) => item !== category)
        : [...current.categories, category],
    }))
  }

  return (
    <AppSheet
      visible={visible}
      onClose={onClose}
      contentContainerStyle={styles.filterSheet}
      keyboardShouldPersistTaps="handled"
    >
      <Text preset="subheading" tx="history:filtersTitle" style={styles.sheetHeading} />
      <Text preset="formLabel" tx="history:dateSubmitted" style={styles.filterSectionTitle} />
      <View style={styles.dateOptionsRow}>
        {DATE_OPTIONS.map((days) => {
          const selected = draft.submittedWithinDays === days
          const label =
            days === null
              ? "history:anyTime"
              : days === 30
                ? "history:last30Days"
                : "history:last90Days"
          return (
            <Pressable
              key={String(days)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={translate(label)}
              onPress={() => setDraft((value) => ({ ...value, submittedWithinDays: days }))}
              style={styles.dateOption}
            >
              <SvgIcon
                icon={selected ? "Check" : "Calendar"}
                size={18}
                fill={selected ? theme.colors.tint : theme.colors.textDim}
              />
              <Text tx={label} />
            </Pressable>
          )
        })}
      </View>
      <Text preset="formLabel" tx="history:scrapType" style={styles.filterSectionTitle} />
      <View style={styles.categoryGrid}>
        {CATEGORY_OPTIONS.map((option) => {
          const selected = draft.categories.includes(option.value)
          return (
            <Pressable
              key={option.value}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: selected }}
              accessibilityLabel={translate(option.labelTx)}
              onPress={() => toggleCategory(option.value)}
              style={styles.categoryOption}
            >
              <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                {selected && <SvgIcon icon="Check" size={14} fill={theme.colors.background} />}
              </View>
              <Text tx={option.labelTx} />
            </Pressable>
          )
        })}
      </View>
      <View style={styles.sheetActions}>
        <Button
          preset="default"
          tx="history:resetFilters"
          onPress={() => setDraft(DEFAULT_HISTORY_FILTERS)}
          style={styles.sheetActionButton}
        />
        <Button
          preset="primary"
          tx="history:applyFilters"
          onPress={() => onApply({ ...draft, categories: [...draft.categories] })}
          style={styles.sheetActionButton}
        />
      </View>
    </AppSheet>
  )
}

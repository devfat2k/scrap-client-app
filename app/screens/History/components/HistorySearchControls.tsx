import { Pressable, View } from "react-native"

import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { TextField } from "@/components/TextField"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/historyScreenStyles"

interface Props {
  query: string
  onQueryChange: (query: string) => void
  filterCount: number
  onOpenFilters: () => void
}

export function HistorySearchControls({ query, onQueryChange, filterCount, onOpenFilters }: Props) {
  const styles = useStyles(createStyles)
  const {
    theme: { spacing, colors },
  } = useAppTheme()
  return (
    <View style={styles.controls}>
      <TextField
        value={query}
        onChangeText={onQueryChange}
        placeholderTx="history:searchPlaceholder"
        accessibilityLabel="Search by request ID"
        autoCapitalize="characters"
        returnKeyType="search"
        containerStyle={styles.searchField}
        inputWrapperStyle={styles.searchInputWrapper}
        LeftAccessory={() => (
          <SvgIcon
            icon="Search"
            size={spacing.md + spacing.xxxs}
            fill={colors.text}
            style={{ left: spacing.xs }}
          />
        )}
        RightAccessory={() =>
          query ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              onPress={() => onQueryChange("")}
              style={styles.clearSearch}
            >
              <SvgIcon icon="Close" size={spacing.sm} fill={colors.textDim} />
            </Pressable>
          ) : null
        }
      />
      <Button
        preset="default"
        onPress={onOpenFilters}
        accessibilityLabel={filterCount ? `Filters, ${filterCount} active` : "Filters"}
        style={styles.filterButton}
        textStyle={styles.filterButtonText}
        LeftAccessory={() => <SvgIcon icon="Filter" size={18} fill={colors.tint} />}
        text={filterCount ? `Filters (${filterCount})` : "Filters"}
      />
    </View>
  )
}

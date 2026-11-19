import { useEffect, useMemo, useState } from "react"
import { Keyboard, View } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Header } from "@/components/Header"
import type { HistoryStackParamList } from "@/navigators/navigationTypes"
import { useNetworkStatus } from "@/services/network"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { HistoryFilterSheet } from "../components/HistoryFilterSheet"
import { HistorySearchControls } from "../components/HistorySearchControls"
import { HistoryTabs } from "../components/HistoryTabs"
import { OfflineNotice } from "../components/OfflineNotice"
import { HISTORY_ORDERS } from "../mocks/historyOrders"
import { createStyles } from "../styles/historyScreenStyles"
import {
  countHistoryFilters,
  DEFAULT_HISTORY_FILTERS,
  filterHistoryOrders,
  normalizeHistoryQuery,
  type HistoryFilters,
} from "../utils/historyFilters"

type Props = NativeStackScreenProps<HistoryStackParamList, "HistoryScreen">

export function HistoryScreen({ navigation }: Props) {
  const styles = useStyles(createStyles)

  const { isOnline } = useNetworkStatus()
  const {
    theme: { spacing },
  } = useAppTheme()
  const insets = useSafeAreaInsets()
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [filters, setFilters] = useState<HistoryFilters>(DEFAULT_HISTORY_FILTERS)
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300)
    return () => clearTimeout(timer)
  }, [query])
  const isSearching = query !== debouncedQuery
  const filteredOrders = useMemo(
    () => filterHistoryOrders(HISTORY_ORDERS, debouncedQuery, filters),
    [debouncedQuery, filters],
  )
  useEffect(() => {
    if (!isFiltering) return
    const timer = setTimeout(() => setIsFiltering(false), 180)
    return () => clearTimeout(timer)
  }, [isFiltering, filters])
  const hasCriteria = Boolean(normalizeHistoryQuery(query)) || countHistoryFilters(filters) > 0
  function applyFilters(nextFilters: HistoryFilters) {
    setFilters(nextFilters)
    setIsFiltering(true)
    setFiltersVisible(false)
  }
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + spacing.xxxl }]}>
      {!isOnline && (
        <OfflineNotice titleTx="history:offlineTitle" messageTx="history:offlineMessage" />
      )}
      <Header title="History" />
      <HistorySearchControls
        query={query}
        onQueryChange={setQuery}
        filterCount={countHistoryFilters(filters)}
        onOpenFilters={() => {
          Keyboard.dismiss()
          setFiltersVisible(true)
        }}
      />
      <HistoryTabs
        orders={filteredOrders}
        isLoading={isSearching || isFiltering}
        onClearCriteria={
          hasCriteria
            ? () => {
                setQuery("")
                setDebouncedQuery("")
                setFilters(DEFAULT_HISTORY_FILTERS)
              }
            : undefined
        }
        onOpenOrder={(orderId) => navigation.navigate("OrderDetailScreen", { orderId })}
      />
      <HistoryFilterSheet
        visible={filtersVisible}
        appliedFilters={filters}
        onApply={applyFilters}
        onClose={() => setFiltersVisible(false)}
      />
    </View>
  )
}

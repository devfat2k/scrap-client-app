import { useMemo } from "react"
import { StyleSheet } from "react-native"
import type { ImageStyle, TextStyle, ViewStyle } from "react-native"

import { useAppTheme } from "./context"
import type { Theme } from "./types"

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }

/** Keep factories at module scope to reuse styles between renders until the theme changes. */
export function useStyles<T extends NamedStyles<T>>(factory: (theme: Theme) => T): T {
  const { theme } = useAppTheme()

  return useMemo(() => StyleSheet.create(factory(theme)), [theme, factory])
}

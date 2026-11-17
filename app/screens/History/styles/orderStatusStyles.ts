import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $statusRow: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  })) as ThemedStyle<ViewStyle>,

  $statusText: (({ typography }) => ({
    fontFamily: typography.primary.medium,
  })) as ThemedStyle<TextStyle>,
}

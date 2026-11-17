import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $container: (({ colors }) => ({
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "center",
  })) as ThemedStyle<ViewStyle>,

  $text: (({ colors, typography }) => ({
    color: colors.text,
    fontFamily: typography.primary.semiBold,
  })) as ThemedStyle<TextStyle>,
}

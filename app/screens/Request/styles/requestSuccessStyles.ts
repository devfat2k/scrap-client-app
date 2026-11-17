import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $container: (({ colors }) => ({
    flex: 1,
    backgroundColor: colors.background,
  })) as ThemedStyle<ViewStyle>,
  /**
   * Scroll content for the request success screen.
   */
  $content: (({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  })) as ThemedStyle<ViewStyle>,

  $hero: (({ spacing }) => ({
    alignItems: "center",
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $successCircle: (({ colors, spacing }) => {
    const size = spacing.xxxl + spacing.xl

    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.palette.primary500,
    }
  }) as ThemedStyle<ViewStyle>,

  $title: (({ colors }) => ({
    color: colors.text,
    textAlign: "center",
  })) as ThemedStyle<TextStyle>,

  $message: (({ colors, spacing }) => ({
    color: colors.textDim,
    textAlign: "center",
    paddingHorizontal: spacing.sm,
  })) as ThemedStyle<TextStyle>,

  $requestIdPill: (({ colors, spacing }) => ({
    marginTop: spacing.xxs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: spacing.xs,
    backgroundColor: colors.palette.primary100,
  })) as ThemedStyle<ViewStyle>,

  $requestIdText: (({ colors }) => ({
    color: colors.palette.primary600,
  })) as ThemedStyle<TextStyle>,

  $ecoCard: (({ colors, spacing }) => ({
    borderWidth: 1,
    borderRadius: spacing.sm,
    borderColor: colors.palette.primary200,
    backgroundColor: colors.palette.primary100,
    padding: spacing.md,
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $ecoHeader: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $ecoTitle: (({ colors }) => ({
    color: colors.palette.primary600,
  })) as ThemedStyle<TextStyle>,

  $ecoText: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $actions: (({ spacing }) => ({
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,
}

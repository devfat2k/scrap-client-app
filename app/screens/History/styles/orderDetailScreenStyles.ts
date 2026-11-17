import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  $screen: (({ colors }) => ({
    flex: 1,
    backgroundColor: colors.background,
  })) as ThemedStyle<ViewStyle>,

  $header: (({ colors, isDark }) => ({
    shadowColor: isDark ? colors.palette.neutral200 : colors.palette.neutral900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  })) as ThemedStyle<ViewStyle>,

  $headerTitle: (({ typography }) => ({
    fontFamily: typography.primary.semiBold,
  })) as ThemedStyle<TextStyle>,

  $headerStatus: (({ spacing }) => ({
    paddingRight: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $content: (({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  })) as ThemedStyle<ViewStyle>,

  $metaLine: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $notFoundIcon: (({ spacing }) => ({
    marginBottom: spacing.xs,
  })) as ThemedStyle<ViewStyle>,

  $offlineBanner: (({ colors, spacing }) => ({
    borderWidth: 1,
    borderColor: colors.palette.accent300,
    backgroundColor: colors.palette.accent100,
    borderRadius: spacing.sm,
    padding: spacing.sm,
    gap: spacing.xxxs,
  })) as ThemedStyle<ViewStyle>,

  $offlineTitle: (({ colors }) => ({
    color: colors.palette.accent500,
  })) as ThemedStyle<TextStyle>,

  $offlineText: (({ colors }) => ({
    color: colors.palette.accent500,
  })) as ThemedStyle<TextStyle>,

  $notFound: (({ spacing }) => ({
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $notFoundMessage: (({ colors }) => ({
    color: colors.textDim,
    textAlign: "center",
  })) as ThemedStyle<TextStyle>,

  $notFoundTitle: (({ colors }) => ({
    color: colors.text,
    textAlign: "center",
  })) as ThemedStyle<TextStyle>,

  $notFoundButton: (({ spacing }) => ({
    alignSelf: "stretch",
    marginTop: spacing.sm,
  })) as ThemedStyle<ViewStyle>,
}

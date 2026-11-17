import { StyleSheet } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"

import type { ThemedStyle } from "@/theme/types"

export const styles = {
  /**
   * Shared chrome for the collection and scrap sections.
   */
  $sectionCard: (({ colors, isDark, spacing }) => ({
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.md,
    backgroundColor: colors.card,
    shadowColor: isDark ? colors.palette.neutral200 : colors.palette.neutral900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  })) as ThemedStyle<ViewStyle>,

  $sectionTitle: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $sectionDivider: (({ colors, spacing }) => ({
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.separator,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  /**
   * Collection rows.
   */
  $infoList: (({ spacing }) => ({
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $infoRow: (({ spacing }) => ({
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  })) as ThemedStyle<ViewStyle>,

  $infoIcon: (({ spacing }) => ({
    marginTop: spacing.xxxs,
  })) as ThemedStyle<ViewStyle>,

  $infoBody: {
    flex: 1,
  } as ViewStyle,

  $infoText: (({ colors }) => ({
    color: colors.text,
  })) as ThemedStyle<TextStyle>,

  $infoSubtext: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $infoLabel: (({ colors }) => ({
    color: colors.textDim,
  })) as ThemedStyle<TextStyle>,

  $timePanel: (({ colors, spacing }) => ({
    marginTop: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: spacing.sm,
    backgroundColor: colors.palette.neutral300,
  })) as ThemedStyle<ViewStyle>,

  $timePanelConfirmed: (({ colors }) => ({
    borderWidth: 1,
    borderColor: colors.palette.primary200,
    backgroundColor: colors.palette.primary100,
  })) as ThemedStyle<ViewStyle>,

  $timeValue: (({ colors, spacing }) => ({
    color: colors.text,
    marginTop: spacing.xxxs,
  })) as ThemedStyle<TextStyle>,

  $volumeText: (({ colors, spacing }) => ({
    color: colors.textDim,
    marginTop: spacing.sm,
  })) as ThemedStyle<TextStyle>,
}

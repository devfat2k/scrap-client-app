import { StyleSheet } from "react-native"

import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, isDark, spacing }: Theme) =>
  ({
    sectionCard: {
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
    },
    sectionTitle: {
      color: colors.text,
    },
    sectionDivider: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: colors.separator,
      marginTop: spacing.xs,
      marginBottom: spacing.md,
    },
    infoList: {
      gap: spacing.sm,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.sm,
    },
    infoIcon: {
      marginTop: spacing.xxxs,
    },
    infoBody: {
      flex: 1,
    },
    infoText: {
      color: colors.text,
    },
    infoSubtext: {
      color: colors.textDim,
    },
    infoLabel: {
      color: colors.textDim,
    },
    timePanel: {
      marginTop: spacing.md,
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      padding: spacing.sm,
      borderRadius: spacing.sm,
      backgroundColor: colors.palette.neutral300,
    },
    timePanelConfirmed: {
      borderWidth: 1,
      borderColor: colors.palette.primary200,
      backgroundColor: colors.palette.primary100,
    },
    timeValue: {
      color: colors.text,
      marginTop: spacing.xxxs,
    },
    volumeText: {
      color: colors.textDim,
      marginTop: spacing.sm,
    },
  }) as const

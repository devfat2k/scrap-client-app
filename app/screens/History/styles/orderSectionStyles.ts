import { StyleSheet } from "react-native"

import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing }: Theme) =>
  ({
    sectionCard: {
      padding: spacing.md,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: spacing.md,
      backgroundColor: colors.card,
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

    contact: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      columnGap: spacing.sm,
      rowGap: spacing.xxxs,
    },
    infoLabel: { color: colors.textDim },
    volumeText: {
      color: colors.textDim,
      marginTop: spacing.sm,
    },
  }) as const

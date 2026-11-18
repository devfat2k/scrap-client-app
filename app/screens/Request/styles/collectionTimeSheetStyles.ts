import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing }: Theme) =>
  ({
    content: {
      paddingBottom: spacing.md,
      gap: spacing.md,
    },
    tabs: {
      flexDirection: "row",
      backgroundColor: colors.background,
      borderRadius: spacing.sm,
      padding: spacing.xxs,
    },
    tab: {
      flex: 1,
      minHeight: spacing.xxl,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: spacing.xs,
      borderWidth: 1,
      borderColor: colors.transparent,
    },
    tabSelected: {
      backgroundColor: colors.card,
      borderColor: colors.border,
    },
    tabPressed: {
      opacity: 0.7,
    },
    pickerContainer: {
      alignItems: "center",
    },
    picker: {
      width: "100%",
    },
    actions: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    actionSurface: {
      flex: 1,
    },
  }) as const

import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing, isDark }: Theme) =>
  ({
    stack: { gap: spacing.xs },
    schedule: { gap: spacing.xxxs },
    content: { gap: spacing.sm },
    detailRow: { flexDirection: "row", gap: spacing.xs },
    detailIcon: { marginTop: spacing.xxs },
    locationRow: { flexDirection: "row", justifyContent: "center", gap: spacing.xs },
    locationText: { flex: 1, gap: spacing.xxxs },
    receivedAmount: {
      color: isDark ? colors.palette.primary400 : colors.palette.primary600,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: spacing.xs,
      alignItems: "center",
    },
  }) as const

import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing }: Theme) =>
  ({
    sheet: { backgroundColor: colors.card },
    handle: { backgroundColor: colors.border },
    content: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xs,
      paddingBottom: spacing.md,
      gap: spacing.md,
    },
    identity: { gap: spacing.xxs },
    muted: { color: colors.textDim },
    details: {
      borderTopWidth: 1,
      borderTopColor: colors.separator,
    },
    row: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: spacing.xs,
      paddingVertical: spacing.xs,
    },
    label: { color: colors.textDim, flex: 1 },
    value: { flex: 1, textAlign: "right" },
    actions: { gap: spacing.xs },
    disabledCall: { opacity: 0.45 },
  }) as const

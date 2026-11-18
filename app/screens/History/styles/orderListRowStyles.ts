import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing, typography }: Theme) =>
  ({
    card: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: spacing.md,
      backgroundColor: colors.card,
      overflow: "hidden",
    },
    body: {
      padding: spacing.md,
      gap: spacing.md,
    },
    pressed: {
      backgroundColor: colors.background,
    },
    stack: { gap: spacing.xxs },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: spacing.xs,
      alignItems: "center",
    },
    meta: { color: colors.textDim },
    headline: {
      color: colors.text,
      fontFamily: typography.primary.semiBold,
    },
    footer: {
      borderTopWidth: 1,
      borderTopColor: colors.separator,
      paddingTop: spacing.sm,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    driver: {
      marginHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderTopWidth: 1,
      borderTopColor: colors.separator,
      gap: spacing.sm,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
    driverInfo: { flexGrow: 1, flexShrink: 1 },
    call: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: spacing.xs,
      minHeight: 44,
      minWidth: 44,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      justifyContent: "center",
    },
    chevron: { transform: [{ rotate: "-90deg" }] },
  }) as const

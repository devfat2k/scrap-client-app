import type { Theme } from "@/theme/types"

export const createContactDetailsStyles = ({ colors, spacing, typography }: Theme) =>
  ({
    content: {
      gap: spacing.xl,
    },

    error: { color: colors.error },
    actions: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: spacing.xs,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      color: colors.text,
      fontFamily: typography.primary.normal,
      fontSize: spacing.md,
      height: spacing.xxl,
    },
    inputError: { borderColor: colors.error },
    action: { flex: 1 },
    form: { gap: 6 },
  }) as const

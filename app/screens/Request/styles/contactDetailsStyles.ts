import type { Theme } from "@/theme/types"

export const createContactDetailsStyles = ({ colors, spacing, typography }: Theme) =>
  ({
    sheet: {
      backgroundColor: colors.card,
      borderTopStartRadius: spacing.md,
      borderTopEndRadius: spacing.md,
    },
    handle: {
      width: spacing.xxl,
      height: spacing.xxs,
      borderRadius: spacing.xxs,
      backgroundColor: colors.palette.neutral400,
    },
    content: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.xs,
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

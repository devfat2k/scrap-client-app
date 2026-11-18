import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, spacing }: Theme) =>
  ({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: { flex: 1 },
    header: {
      padding: spacing.md,
      gap: spacing.xxxs,
    },
    title: { color: colors.text },
    subtitle: { color: colors.textDim },
    list: {
      padding: spacing.md,
      paddingBottom: spacing.xxxl + spacing.xl,
      gap: spacing.md,
      flexGrow: 1,
    },
    empty: {
      paddingVertical: spacing.xxl,
      gap: spacing.xs,
    },
  }) as const

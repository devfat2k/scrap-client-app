import type { Theme } from "@/theme/types"

export const createStyles = ({ spacing, typography }: Theme) =>
  ({
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
    },
    statusText: {
      fontFamily: typography.primary.medium,
    },
  }) as const

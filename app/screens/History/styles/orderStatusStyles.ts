import type { Theme } from "@/theme/types"

export const createStyles = ({ spacing }: Theme) =>
  ({
    statusRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
    },
  }) as const

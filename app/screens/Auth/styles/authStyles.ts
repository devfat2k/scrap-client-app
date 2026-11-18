import type { Theme } from "@/theme/types"

export const createStyles = ({ colors }: Theme) =>
  ({
    container: {
      alignItems: "center",
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "center",
    },
  }) as const

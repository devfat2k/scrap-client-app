import type { Theme } from "@/theme/types"

export const createStyles = ({ colors, typography }: Theme) =>
  ({
    container: {
      alignItems: "center",
      backgroundColor: colors.background,
      flex: 1,
      justifyContent: "center",
    },
    text: {
      color: colors.text,
      fontFamily: typography.primary.semiBold,
    },
  }) as const

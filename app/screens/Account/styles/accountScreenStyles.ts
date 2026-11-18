import type { Theme } from "@/theme/types"

// Hallmark: app screen; existing Inter and theme tokens; quiet profile with a single details surface.
export const createStyles = ({ colors, spacing }: Theme) =>
  ({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flexGrow: 1,
      paddingHorizontal: spacing.md,
      gap: spacing.xl,
    },

    profile: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
    },
    avatar: {
      width: spacing.xxxl,
      height: spacing.xxxl,
      borderRadius: spacing.xl,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    avatarLetter: {
      color: colors.text,
    },
    profileText: {
      flex: 1,
      gap: spacing.xxs,
    },
    description: {
      color: colors.textDim,
    },
    section: {
      gap: spacing.sm,
      paddingBottom: spacing.xxxl + spacing.xl,
    },
    details: {
      backgroundColor: colors.card,
      borderRadius: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    detailRow: {
      paddingVertical: spacing.md,
      gap: spacing.xxs,
    },
    rowSeparator: {
      borderTopWidth: 1,
      borderTopColor: colors.separator,
    },
    label: {
      color: colors.textDim,
    },
  }) as const

import { Pressable, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { AppSheet } from "@/components/AppSheet"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"

const SHEET_MAX_HEIGHT_RATIO = 0.6

export interface PhotoSourceSheetProps {
  /**
   * Whether the sheet is visible.
   */
  visible: boolean
  /**
   * Called when the sheet is dismissed, including backdrop press and swipe down.
   */
  onClose: () => void
  /**
   * Called when the user chooses to take a photo.
   */
  onTakePhoto: () => void
  /**
   * Called when the user chooses a photo from the library.
   */
  onChooseLibrary: () => void
  /**
   * Prevents choosing a source while a picker is already running.
   */
  disabled?: boolean
}

type PhotoSourceAction = {
  key: string
  labelTx: TxKeyPath
  onPress: () => void
  isCancel?: boolean
}

/**
 * Bottom sheet with the photo source actions for an attachment.
 */
export function PhotoSourceSheet(props: PhotoSourceSheetProps) {
  const styles = useStyles(createStyles)

  const { visible, onClose, onTakePhoto, onChooseLibrary, disabled = false } = props
  const insets = useSafeAreaInsets()

  const actions: PhotoSourceAction[] = [
    { key: "camera", labelTx: "request:takePhoto", onPress: onTakePhoto },
    { key: "library", labelTx: "request:chooseLibrary", onPress: onChooseLibrary },
    { key: "cancel", labelTx: "request:cancelPhotoSource", onPress: onClose, isCancel: true },
  ]

  return (
    <AppSheet
      visible={visible}
      onClose={onClose}
      sizing={{ mode: "dynamic", maxHeightRatio: SHEET_MAX_HEIGHT_RATIO }}
      bottomInset={insets.bottom}
      keyboardBlurBehavior="none"
      contentContainerStyle={styles.content}
    >
      <Text preset="subheading" tx="request:photoSourceTitle" style={styles.title} />

      {actions.map((action) => {
        const isDisabled = disabled && !action.isCancel

        return (
          <Pressable
            key={action.key}
            onPress={action.onPress}
            disabled={isDisabled}
            accessibilityRole="button"
            accessibilityState={{ disabled: isDisabled }}
            style={({ pressed }) => [
              styles.action,
              action.isCancel && styles.cancelAction,
              pressed && !isDisabled && styles.actionPressed,
            ]}
          >
            <Text
              weight={action.isCancel ? "medium" : undefined}
              tx={action.labelTx}
              style={action.isCancel && styles.cancelText}
            />
          </Pressable>
        )
      })}
    </AppSheet>
  )
}

const createStyles = ({ colors, spacing, isDark }: Theme) =>
  ({
    content: {
      paddingBottom: spacing.md,
    },
    title: {
      paddingBottom: spacing.xs,
    },
    action: {
      minHeight: spacing.xxl,
      justifyContent: "center",
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.separator,
      paddingVertical: spacing.sm,
    },
    cancelAction: {
      borderBottomWidth: 0,
      marginTop: spacing.xs,
    },
    actionPressed: {
      opacity: isDark ? 0.7 : 0.6,
    },

    cancelText: {
      color: colors.textDim,
    },
  }) as const

import { useCallback, useEffect } from "react"
import {
  BackHandler,
  Pressable,
  StyleSheet,
  TextStyle,
  useWindowDimensions,
  ViewStyle,
} from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"
import { useBottomSheetModal } from "@/utils/useBottomSheetModal"

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
  const { visible, onClose, onTakePhoto, onChooseLibrary, disabled = false } = props
  const { themed } = useAppTheme()
  const insets = useSafeAreaInsets()
  const { height: windowHeight } = useWindowDimensions()
  const { sheetRef, handleDismiss } = useBottomSheetModal({ visible, onClose })

  useEffect(() => {
    if (!visible) return

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      sheetRef.current?.dismiss()
      return true
    })

    return () => subscription.remove()
  }, [visible, sheetRef])

  const renderBackdrop = useCallback(
    (backdropProps: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...backdropProps}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  )

  const actions: PhotoSourceAction[] = [
    { key: "camera", labelTx: "request:takePhoto", onPress: onTakePhoto },
    { key: "library", labelTx: "request:chooseLibrary", onPress: onChooseLibrary },
    { key: "cancel", labelTx: "request:cancelPhotoSource", onPress: onClose, isCancel: true },
  ]

  return (
    <BottomSheetModal
      ref={sheetRef}
      enablePanDownToClose
      keyboardBlurBehavior="none"
      maxDynamicContentSize={windowHeight * SHEET_MAX_HEIGHT_RATIO}
      bottomInset={insets.bottom}
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={themed($handle)}
      backgroundStyle={themed($sheet)}
    >
      <BottomSheetScrollView contentContainerStyle={themed($content)}>
        <Text preset="subheading" tx="request:photoSourceTitle" style={themed($title)} />

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
                themed($action),
                action.isCancel && themed($cancelAction),
                pressed && !isDisabled && themed($actionPressed),
              ]}
            >
              <Text
                tx={action.labelTx}
                style={[themed($actionText), action.isCancel && themed($cancelText)]}
              />
            </Pressable>
          )
        })}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

const $sheet: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  backgroundColor: colors.card,
  borderTopStartRadius: spacing.md,
  borderTopEndRadius: spacing.md,
})

const $handle: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  width: spacing.xxl,
  height: spacing.xxs,
  borderRadius: spacing.xxs,
  backgroundColor: colors.palette.neutral400,
})

const $content: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingHorizontal: spacing.md,
  paddingTop: spacing.xs,
  paddingBottom: spacing.md,
})

const $title: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.text,
  paddingBottom: spacing.xs,
})

const $action: ThemedStyle<ViewStyle> = ({ colors, spacing }) => ({
  minHeight: spacing.xxl,
  justifyContent: "center",
  borderBottomWidth: StyleSheet.hairlineWidth,
  borderBottomColor: colors.separator,
  paddingVertical: spacing.sm,
})

const $cancelAction: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  borderBottomWidth: 0,
  marginTop: spacing.xs,
})

const $actionPressed: ThemedStyle<ViewStyle> = ({ isDark }) => ({
  opacity: isDark ? 0.7 : 0.6,
})

const $actionText: ThemedStyle<TextStyle> = ({ colors }) => ({
  color: colors.text,
})

const $cancelText: ThemedStyle<TextStyle> = ({ colors, typography }) => ({
  color: colors.textDim,
  fontFamily: typography.primary.medium,
})

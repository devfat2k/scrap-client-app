import { ReactNode, useCallback, useEffect } from "react"
import { BackHandler, useWindowDimensions } from "react-native"
import type { TextStyle, ViewStyle } from "react-native"
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

const SHEET_MAX_HEIGHT_RATIO = 0.8

export interface HomeSheetProps {
  /**
   * Whether the sheet is visible.
   */
  visible: boolean
  /**
   * Called when the sheet is dismissed, including backdrop press and swipe down.
   */
  onClose: () => void
  /**
   * Sheet title text which is looked up via i18n.
   */
  titleTx: TxKeyPath
  /**
   * Sheet content.
   */
  children: ReactNode
}

/**
 * Shared bottom sheet shell for the Home controls.
 */
export function HomeSheet(props: HomeSheetProps) {
  const { visible, onClose, titleTx, children } = props
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

  return (
    <BottomSheetModal
      ref={sheetRef}
      enablePanDownToClose
      keyboardBlurBehavior="none"
      maxDynamicContentSize={windowHeight * SHEET_MAX_HEIGHT_RATIO}
      bottomInset={insets.bottom}
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={themed(styles.$handle)}
      backgroundStyle={themed(styles.$sheet)}
    >
      <BottomSheetScrollView contentContainerStyle={themed(styles.$content)}>
        <Text preset="subheading" tx={titleTx} style={themed(styles.$title)} />
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

const styles = {
  $sheet: (({ colors, spacing }) => ({
    backgroundColor: colors.card,
    borderTopStartRadius: spacing.md,
    borderTopEndRadius: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $handle: (({ colors, spacing }) => ({
    width: spacing.xxl,
    height: spacing.xxs,
    borderRadius: spacing.xxs,
    backgroundColor: colors.palette.neutral400,
  })) as ThemedStyle<ViewStyle>,

  $content: (({ spacing }) => ({
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
  })) as ThemedStyle<ViewStyle>,

  $title: (({ colors, spacing }) => ({
    color: colors.text,
    paddingBottom: spacing.xs,
  })) as ThemedStyle<TextStyle>,
}

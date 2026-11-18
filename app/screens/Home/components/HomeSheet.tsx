import { ReactNode, useCallback, useEffect } from "react"
import { BackHandler } from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet"

import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import type { Theme } from "@/theme/types"
import { useStyles } from "@/theme/useStyles"
import { useBottomSheetModal } from "@/utils/useBottomSheetModal"

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
  const styles = useStyles(createStyles)

  const { visible, onClose, titleTx, children } = props
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
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.sheet}
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <Text preset="subheading" tx={titleTx} style={styles.title} />
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

const createStyles = ({ colors, spacing }: Theme) =>
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
      paddingBottom: spacing.md,
    },
    title: {
      color: colors.text,
      paddingBottom: spacing.xs,
    },
  }) as const

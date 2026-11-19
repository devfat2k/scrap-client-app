import { forwardRef, useCallback, useEffect, useImperativeHandle, type ReactNode } from "react"
import { BackHandler, type StyleProp, type ViewStyle, useWindowDimensions } from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
  type BottomSheetBackdropProps,
  type BottomSheetModalProps,
} from "@gorhom/bottom-sheet"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useStyles } from "@/theme/useStyles"
import { useBottomSheetModal } from "@/utils/useBottomSheetModal"

import { createStyles } from "./appSheetStyles"

export interface AppSheetHandle {
  dismiss: () => void
}

export interface AppSheetProps extends Pick<
  BottomSheetModalProps,
  | "keyboardBehavior"
  | "keyboardBlurBehavior"
  | "android_keyboardInputMode"
  | "enableContentPanningGesture"
  | "backgroundStyle"
  | "handleIndicatorStyle"
  | "bottomInset"
> {
  visible: boolean
  /** Called after dismissal completes, not when closing is requested. */
  onClose: () => void
  /** Cleanup after every dismissal, including one followed by a queued reopen. */
  onDismiss?: () => void
  children: ReactNode
  appearance?: "standard" | "native"
  contentMode?: "scroll" | "static"
  sizing?:
    | { mode: "dynamic"; maxHeightRatio?: number }
    | { mode: "fixed"; snapPoints: (string | number)[] }
  contentContainerStyle?: StyleProp<ViewStyle>
  keyboardShouldPersistTaps?: "always" | "never" | "handled"
}

function renderBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
    />
  )
}

/** Shared modal mechanics; content and business state stay with the caller. */
export const AppSheet = forwardRef<AppSheetHandle, AppSheetProps>(function AppSheet(props, ref) {
  const {
    visible,
    onClose,
    onDismiss,
    children,
    appearance = "standard",
    contentMode = "scroll",
    sizing,
    contentContainerStyle,
    keyboardShouldPersistTaps,
    backgroundStyle,
    handleIndicatorStyle,
    ...modalProps
  } = props
  const styles = useStyles(createStyles)
  const { height } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const { sheetRef, handleDismiss } = useBottomSheetModal({ visible, onClose })

  useImperativeHandle(ref, () => ({ dismiss: () => sheetRef.current?.dismiss() }), [sheetRef])

  useEffect(() => {
    if (!visible) return

    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      sheetRef.current?.dismiss()
      return true
    })
    return () => subscription.remove()
  }, [visible, sheetRef])

  const handleModalDismiss = useCallback(() => {
    onDismiss?.()
    handleDismiss()
  }, [onDismiss, handleDismiss])

  const contentStyle = [styles.content, contentContainerStyle]

  return (
    <BottomSheetModal
      {...modalProps}
      ref={sheetRef}
      enablePanDownToClose
      enableDynamicSizing={sizing?.mode !== "fixed"}
      snapPoints={sizing?.mode === "fixed" ? sizing.snapPoints : undefined}
      maxDynamicContentSize={
        sizing?.mode === "fixed"
          ? undefined
          : Math.min(
              height - insets.top,
              sizing?.mode === "dynamic" && sizing.maxHeightRatio !== undefined
                ? height * sizing.maxHeightRatio
                : Number.POSITIVE_INFINITY,
            )
      }
      topInset={insets.top}
      onDismiss={handleModalDismiss}
      backdropComponent={renderBackdrop}
      backgroundStyle={[appearance === "standard" && styles.sheet, backgroundStyle]}
      handleIndicatorStyle={[appearance === "standard" && styles.handle, handleIndicatorStyle]}
    >
      {contentMode === "static" ? (
        <BottomSheetView style={contentStyle}>{children}</BottomSheetView>
      ) : (
        <BottomSheetScrollView
          contentContainerStyle={contentStyle}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
        >
          {children}
        </BottomSheetScrollView>
      )}
    </BottomSheetModal>
  )
})

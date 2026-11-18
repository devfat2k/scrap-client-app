import { useCallback, useEffect, useMemo, useState } from "react"
import { BackHandler, View, useWindowDimensions } from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet"

import { Button } from "@/components/Button"
import { FieldLabel } from "@/components/FormField"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { useBottomSheetModal } from "@/utils/useBottomSheetModal"

import { createContactDetailsStyles as createStyles } from "../styles/contactDetailsStyles"

export interface ContactDetailsSheetProps {
  visible: boolean
  isSubmitting: boolean
  onConfirm: () => void
  onClose: () => void
}

export function ContactDetailsSheet({
  visible,
  isSubmitting,
  onConfirm,
  onClose,
}: ContactDetailsSheetProps) {
  const styles = useStyles(createStyles)

  const { theme } = useAppTheme()
  const { height } = useWindowDimensions()
  const { sheetRef, handleDismiss } = useBottomSheetModal({ visible, onClose })
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [showErrors, setShowErrors] = useState(false)
  const snapPoints = useMemo(() => [Math.min(440, height * 0.4)], [height])

  useEffect(() => {
    if (!visible) return
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      sheetRef.current?.dismiss()
      return true
    })
    return () => subscription.remove()
  }, [visible, sheetRef])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  )

  function confirm() {
    setShowErrors(true)
    if (!fullName.trim() || !phone.trim() || isSubmitting) return
    onConfirm()
  }

  return (
    <BottomSheetModal
      ref={sheetRef}
      enablePanDownToClose
      enableDynamicSizing={false}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      onDismiss={handleDismiss}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={styles.handle}
      backgroundStyle={styles.sheet}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text preset="subheading" tx="request:contactTitle" />
          <FieldLabel labelTx="request:contactName" required />
          <BottomSheetTextInput
            accessibilityLabel={translate("request:contactName")}
            placeholder={translate("request:contactNamePlaceholder")}
            placeholderTextColor={theme.colors.textDim}
            value={fullName}
            onChangeText={setFullName}
            editable={!isSubmitting}
            style={[styles.input, showErrors && !fullName.trim() && styles.inputError]}
          />
          {showErrors && !fullName.trim() && (
            <Text preset="formHelper" tx="request:contactNameRequired" style={styles.error} />
          )}
          <FieldLabel labelTx="request:contactPhone" required />
          <BottomSheetTextInput
            accessibilityLabel={translate("request:contactPhone")}
            placeholder={translate("request:contactPhonePlaceholder")}
            placeholderTextColor={theme.colors.textDim}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            editable={!isSubmitting}
            style={[styles.input, showErrors && !phone.trim() && styles.inputError]}
          />
          {showErrors && !phone.trim() && (
            <Text preset="formHelper" tx="request:contactPhoneRequired" style={styles.error} />
          )}
        </View>

        <View style={styles.actions}>
          <Button
            preset="default"
            tx="common:cancel"
            onPress={() => sheetRef.current?.dismiss()}
            disabled={isSubmitting}
            style={styles.action}
          />
          <Button
            preset="primary"
            tx="request:contactConfirm"
            onPress={confirm}
            loading={isSubmitting}
            loadingText={translate("request:submitting")}
            style={styles.action}
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

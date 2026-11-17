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
import { useBottomSheetModal } from "@/utils/useBottomSheetModal"

import { contactDetailsStyles as styles } from "../styles/contactDetailsStyles"

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
  const { themed, theme } = useAppTheme()
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
      handleIndicatorStyle={themed(styles.$handle)}
      backgroundStyle={themed(styles.$sheet)}
    >
      <BottomSheetScrollView
        contentContainerStyle={themed(styles.$content)}
        keyboardShouldPersistTaps="handled"
      >
        <View style={themed(styles.$form)}>
          <Text preset="subheading" tx="request:contactTitle" style={themed(styles.$title)} />
          <FieldLabel labelTx="request:contactName" required />
          <BottomSheetTextInput
            accessibilityLabel={translate("request:contactName")}
            placeholder={translate("request:contactNamePlaceholder")}
            placeholderTextColor={theme.colors.textDim}
            value={fullName}
            onChangeText={setFullName}
            editable={!isSubmitting}
            style={[
              themed(styles.$input),
              showErrors && !fullName.trim() && themed(styles.$inputError),
            ]}
          />
          {showErrors && !fullName.trim() && (
            <Text
              preset="formHelper"
              tx="request:contactNameRequired"
              style={themed(styles.$error)}
            />
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
            style={[
              themed(styles.$input),
              showErrors && !phone.trim() && themed(styles.$inputError),
            ]}
          />
          {showErrors && !phone.trim() && (
            <Text
              preset="formHelper"
              tx="request:contactPhoneRequired"
              style={themed(styles.$error)}
            />
          )}
        </View>

        <View style={themed(styles.$actions)}>
          <Button
            preset="default"
            tx="common:cancel"
            onPress={() => sheetRef.current?.dismiss()}
            disabled={isSubmitting}
            style={themed(styles.$action)}
          />
          <Button
            preset="primary"
            tx="request:contactConfirm"
            onPress={confirm}
            loading={isSubmitting}
            loadingText={translate("request:submitting")}
            style={themed(styles.$action)}
          />
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

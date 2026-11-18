import { useMemo, useRef, useState } from "react"
import { View, useWindowDimensions } from "react-native"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"

import { AppSheet, type AppSheetHandle } from "@/components/AppSheet"
import { Button } from "@/components/Button"
import { FieldLabel } from "@/components/FormField"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

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
  const sheetRef = useRef<AppSheetHandle>(null)
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [showErrors, setShowErrors] = useState(false)
  const snapPoints = useMemo(() => [Math.min(440, height * 0.4)], [height])

  function confirm() {
    setShowErrors(true)
    if (!fullName.trim() || !phone.trim() || isSubmitting) return
    onConfirm()
  }

  return (
    <AppSheet
      visible={visible}
      onClose={onClose}
      ref={sheetRef}
      sizing={{ mode: "fixed", snapPoints }}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
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
    </AppSheet>
  )
}

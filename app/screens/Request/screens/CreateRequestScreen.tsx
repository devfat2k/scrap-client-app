import { useState } from "react"
import { View } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

import { Header } from "@/components/Header"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { RequestStackParamList } from "@/navigators/navigationTypes"
import { useNetworkStatus } from "@/services/network"
import { useAppTheme } from "@/theme/context"
import { showToast } from "@/utils/toastService"

import { AddressFields } from "../components/AddressFields"
import { CollectionTimeField } from "../components/CollectionTimeField"
import { ContactDetailsSheet } from "../components/ContactDetailsSheet"
import { FormSection } from "../components/FormSection"
import { ScrapItemsSection } from "../components/ScrapItemsSection"
import { SubmitBar } from "../components/SubmitBar"
import { useCreateRequestForm } from "../form/useCreateRequestForm"
import { styles } from "../styles/createRequestScreenStyles"

type CreateRequestScreenProps = NativeStackScreenProps<RequestStackParamList, "CreateRequestScreen">

/**
 * Pickup request form: scrap items, collection address, and preferred time.
 */
export function CreateRequestScreen({ navigation }: CreateRequestScreenProps) {
  const { themed, theme } = useAppTheme()
  const { isOnline } = useNetworkStatus()
  const [isContactSheetVisible, setContactSheetVisible] = useState(false)
  const {
    draft,
    errors,
    isSubmitting,
    updateItem,
    addItem,
    removeItem,
    updateAddress,
    setProposedAt,
    validate,
    submit,
  } = useCreateRequestForm()

  async function handleSubmit() {
    if (!isOnline) {
      showToast({
        type: "WARNING",
        message: translate("request:offlineTitle"),
        subtitle: translate("request:offlineMessage"),
      })
      return
    }

    if (validate()) setContactSheetVisible(true)
  }

  async function handleContactConfirm() {
    const requestId = await submit()

    if (!requestId) {
      showToast({ type: "ERROR", message: translate("request:reviewErrors") })
      return
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "RequestSuccessScreen", params: { requestId } }],
    })
  }

  return (
    <View style={themed(styles.$formScreen)}>
      <Header
        titleTx="request:title"
        leftIcon="Back"
        leftIconColor={theme.colors.text}
        leftIconAccessibilityLabel={translate("common:back")}
        onLeftPress={() => navigation.goBack()}
        containerStyle={themed(styles.$header)}
      />

      <KeyboardAwareScrollView
        bottomOffset={50}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={themed(styles.$formContent)}
      >
        {!isOnline && (
          <View style={themed(styles.$offlineBanner)}>
            <Text preset="bold" tx="request:offlineTitle" style={themed(styles.$offlineTitle)} />
            <Text
              preset="formHelper"
              tx="request:offlineMessage"
              style={themed(styles.$offlineText)}
            />
          </View>
        )}

        <FormSection step={1} titleTx="request:sectionScrap">
          <ScrapItemsSection
            items={draft.items}
            errors={errors.items}
            onChangeItem={updateItem}
            onRemoveItem={removeItem}
            onAddItem={addItem}
          />
        </FormSection>

        <FormSection step={2} titleTx="request:sectionCollection">
          <AddressFields
            address={draft.address}
            errors={errors.address}
            onChange={updateAddress}
            disabled={isSubmitting}
          />

          <CollectionTimeField
            value={draft.proposedAt}
            onChange={setProposedAt}
            labelTx="request:proposedAtLabel"
            required
            placeholderTx="request:proposedAtPlaceholder"
            errorTx={errors.proposedAt}
            disabled={isSubmitting}
          />
        </FormSection>
      </KeyboardAwareScrollView>

      <SubmitBar isSubmitting={isSubmitting} isOffline={!isOnline} onSubmit={handleSubmit} />
      <ContactDetailsSheet
        visible={isContactSheetVisible}
        isSubmitting={isSubmitting}
        onClose={() => setContactSheetVisible(false)}
        onConfirm={handleContactConfirm}
      />
    </View>
  )
}

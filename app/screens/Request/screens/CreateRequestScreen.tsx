import { View } from "react-native"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Header } from "@/components/Header"
import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import type { RequestStackParamList } from "@/navigators/navigationTypes"
import { useNetworkStatus } from "@/services/network"
import { useAppTheme } from "@/theme/context"
import { showToast } from "@/utils/toastService"

import { AddressFields } from "../components/AddressFields"
import { CollectionTimeField } from "../components/CollectionTimeField"
import { FormSection } from "../components/FormSection"
import { ScrapItemsSection } from "../components/ScrapItemsSection"
import { SubmitBar } from "../components/SubmitBar"
import { useCreateRequestForm } from "../form/useCreateRequestForm"
import { $header } from "../styles/createRequestHeaderStyles"
import {
  $formContent,
  $formScreen,
  $offlineBanner,
  $offlineText,
  $offlineTitle,
} from "../styles/createRequestStyles"

type CreateRequestScreenProps = NativeStackScreenProps<RequestStackParamList, "CreateRequestScreen">

/**
 * Pickup request form: scrap items, collection address, and preferred time.
 */
export function CreateRequestScreen({ navigation }: CreateRequestScreenProps) {
  const { themed, theme } = useAppTheme()
  const { isOnline } = useNetworkStatus()
  const {
    draft,
    errors,
    isSubmitting,
    updateItem,
    addItem,
    removeItem,
    updateAddress,
    setProposedAt,
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
    <View style={themed($formScreen)}>
      <Header
        titleMode="left"
        titleTx="request:title"
        leftIcon="Back"
        leftIconColor={theme.colors.text}
        leftIconAccessibilityLabel={translate("common:back")}
        onLeftPress={() => navigation.goBack()}
        backgroundColor={theme.colors.background}
        containerStyle={themed($header)}
      />

      <Screen
        preset="scroll"
        keyboardShouldPersistTaps="handled"
        ScrollViewProps={{ keyboardDismissMode: "on-drag" }}
        contentContainerStyle={themed($formContent)}
      >
        {!isOnline && (
          <View style={themed($offlineBanner)}>
            <Text preset="bold" tx="request:offlineTitle" style={themed($offlineTitle)} />
            <Text preset="formHelper" tx="request:offlineMessage" style={themed($offlineText)} />
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
      </Screen>

      <SubmitBar isSubmitting={isSubmitting} isOffline={!isOnline} onSubmit={handleSubmit} />
    </View>
  )
}

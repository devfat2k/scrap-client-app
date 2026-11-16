import { View, ViewStyle } from "react-native"

import { FieldError } from "@/components/FormField"
import { TextField } from "@/components/TextField"
import { FIXED_COUNTRY } from "@/domain/address"
import { useAppTheme } from "@/theme/context"
import type { ThemedStyle } from "@/theme/types"

import { SelectField } from "./SelectField"
import { STATE_OPTIONS } from "../form/requestFormOptions"
import type { AddressDraft, AddressErrors } from "../form/requestFormTypes"
import { $scrapFieldItem, $scrapFieldRow } from "../styles/createRequestStyles"

export interface AddressFieldsProps {
  /**
   * Address draft values.
   */
  address: AddressDraft
  /**
   * Validation errors for the address block.
   */
  errors: AddressErrors
  /**
   * Applies a partial update to the address draft.
   */
  onChange: (patch: Partial<AddressDraft>) => void
  /**
   * Prevents editing while a submit is in flight.
   */
  disabled?: boolean
}

/**
 * Australian collection address fields (unit, street, suburb, state, postcode,
 * fixed country, and optional Google Maps link).
 */
export function AddressFields(props: AddressFieldsProps) {
  const { address, errors, onChange, disabled = false } = props
  const { themed } = useAppTheme()

  return (
    <View style={themed($addressBlock)}>
      <View style={themed($scrapFieldRow)}>
        <View style={$scrapFieldItem}>
          <TextField
            labelTx="request:unitOrHouseNoLabel"
            placeholderTx="request:unitOrHouseNoPlaceholder"
            value={address.unitOrHouseNo}
            onChangeText={(unitOrHouseNo) => onChange({ unitOrHouseNo })}
            editable={!disabled}
          />
        </View>

        <View style={$scrapFieldItem}>
          <TextField
            labelTx="request:streetNameLabel"
            required
            placeholderTx="request:streetNamePlaceholder"
            value={address.streetName}
            onChangeText={(streetName) => onChange({ streetName })}
            editable={!disabled}
            status={errors.streetName ? "error" : undefined}
          />
          <FieldError messageTx={errors.streetName} />
        </View>
      </View>

      <View>
        <TextField
          labelTx="request:suburbLabel"
          required
          placeholderTx="request:suburbPlaceholder"
          value={address.suburb}
          onChangeText={(suburb) => onChange({ suburb })}
          editable={!disabled}
          status={errors.suburb ? "error" : undefined}
        />
        <FieldError messageTx={errors.suburb} />
      </View>

      <View style={themed($scrapFieldRow)}>
        <View style={$scrapFieldItem}>
          <SelectField
            options={STATE_OPTIONS}
            value={address.state}
            onChange={(state) => onChange({ state })}
            labelTx="request:stateLabel"
            required
            placeholderTx="request:statePlaceholder"
            errorTx={errors.state}
            disabled={disabled}
          />
        </View>

        <View style={$scrapFieldItem}>
          <TextField
            labelTx="request:postcodeLabel"
            required
            placeholderTx="request:postcodePlaceholder"
            value={address.postcode}
            onChangeText={(postcode) => onChange({ postcode })}
            keyboardType="number-pad"
            maxLength={4}
            editable={!disabled}
            status={errors.postcode ? "error" : undefined}
          />
          <FieldError messageTx={errors.postcode} />
        </View>
      </View>

      <TextField labelTx="request:countryLabel" value={FIXED_COUNTRY} editable={false} />

      <TextField
        labelTx="request:mapUrlLabel"
        placeholderTx="request:mapUrlPlaceholder"
        value={address.mapUrl}
        onChangeText={(mapUrl) => onChange({ mapUrl })}
        editable={!disabled}
        autoCapitalize="none"
        keyboardType="url"
      />
    </View>
  )
}

const $addressBlock: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  gap: spacing.sm,
})

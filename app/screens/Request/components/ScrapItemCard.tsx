import { Pressable, View } from "react-native"

import { FieldError } from "@/components/FormField"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import { TextField } from "@/components/TextField"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"

import { PhotoAttachmentField } from "./PhotoAttachmentField"
import { SelectField } from "./SelectField"
import { CATEGORY_OPTIONS, UNIT_OPTIONS, VOLUME_SELECT_OPTIONS } from "../form/requestFormOptions"
import type { ScrapItemDraft, ScrapItemErrors } from "../form/requestFormTypes"
import {
  $scrapCard,
  $scrapCardHeader,
  $scrapCardTitle,
  $scrapFieldItem,
  $scrapFieldRow,
  $scrapRemoveButton,
} from "../styles/createRequestStyles"

export interface ScrapItemCardProps {
  /**
   * Draft values for this scrap item.
   */
  item: ScrapItemDraft
  /**
   * 0-based index used for the card title.
   */
  index: number
  /**
   * Validation errors for this item.
   */
  errors?: ScrapItemErrors
  /**
   * Whether the remove control is available.
   */
  canRemove: boolean
  /**
   * Applies a partial update to this item.
   */
  onChange: (patch: Partial<ScrapItemDraft>) => void
  /**
   * Removes this item from the form.
   */
  onRemove: () => void
}

/**
 * One scrap item row inside the create request form.
 */
export function ScrapItemCard(props: ScrapItemCardProps) {
  const { item, index, errors, canRemove, onChange, onRemove } = props
  const { themed, theme } = useAppTheme()

  return (
    <View style={themed($scrapCard)}>
      <View style={themed($scrapCardHeader)}>
        <Text
          preset="subheading"
          tx="request:itemLabel"
          txOptions={{ index: index + 1 }}
          style={themed($scrapCardTitle)}
        />

        {canRemove && (
          <Pressable
            onPress={onRemove}
            hitSlop={theme.spacing.xs}
            accessibilityRole="button"
            accessibilityLabel={translate("request:removeItem")}
            style={themed($scrapRemoveButton)}
          >
            <SvgIcon icon="Close" size={18} fill={theme.colors.textDim} />
          </Pressable>
        )}
      </View>

      <PhotoAttachmentField photos={item.photos} onChange={(photos) => onChange({ photos })} />

      <SelectField
        options={CATEGORY_OPTIONS}
        value={item.category}
        onChange={(category) => onChange({ category })}
        labelTx="request:categoryLabel"
        required
        placeholderTx="request:categoryPlaceholder"
        errorTx={errors?.category}
      />

      <View style={themed($scrapFieldRow)}>
        <View style={$scrapFieldItem}>
          <TextField
            labelTx="request:quantityLabel"
            required
            placeholderTx="request:quantityPlaceholder"
            value={item.quantity}
            onChangeText={(quantity) => onChange({ quantity })}
            keyboardType="decimal-pad"
            status={errors?.quantity ? "error" : undefined}
          />
          <FieldError messageTx={errors?.quantity} />
        </View>

        <View style={$scrapFieldItem}>
          <SelectField
            options={UNIT_OPTIONS}
            value={item.unit}
            onChange={(unit) => onChange({ unit })}
            labelTx="request:unitLabel"
            required
            placeholderTx="request:unitPlaceholder"
            errorTx={errors?.unit}
          />
        </View>
      </View>

      <SelectField
        options={VOLUME_SELECT_OPTIONS}
        value={item.volume}
        onChange={(volume) => onChange({ volume })}
        labelTx="request:volumeLabel"
        required
        placeholderTx="request:volumePlaceholder"
        errorTx={errors?.volume}
      />
    </View>
  )
}

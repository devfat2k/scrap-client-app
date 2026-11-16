import { View } from "react-native"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"

import { ScrapItemCard } from "./ScrapItemCard"
import type { ScrapItemDraft, ScrapItemErrors } from "../form/requestFormTypes"
import { $addScrapButton, $addScrapPlus, $scrapList } from "../styles/createRequestStyles"

function AddScrapIcon() {
  const { themed } = useAppTheme()

  return <Text preset="subheading" text="+" style={themed($addScrapPlus)} />
}

export interface ScrapItemsSectionProps {
  /**
   * Scrap item drafts in display order.
   */
  items: ScrapItemDraft[]
  /**
   * Validation errors keyed by item id.
   */
  errors: Record<string, ScrapItemErrors>
  /**
   * Applies a partial update to one item.
   */
  onChangeItem: (id: string, patch: Partial<ScrapItemDraft>) => void
  /**
   * Removes one item from the draft.
   */
  onRemoveItem: (id: string) => void
  /**
   * Appends an empty item.
   */
  onAddItem: () => void
}

/**
 * List of scrap item cards with an add-another action.
 */
export function ScrapItemsSection(props: ScrapItemsSectionProps) {
  const { items, errors, onChangeItem, onRemoveItem, onAddItem } = props
  const { themed } = useAppTheme()
  const canRemove = items.length > 1

  return (
    <View style={themed($scrapList)}>
      {items.map((item, index) => (
        <ScrapItemCard
          key={item.id}
          item={item}
          index={index}
          errors={errors[item.id]}
          canRemove={canRemove}
          onChange={(patch) => onChangeItem(item.id, patch)}
          onRemove={() => onRemoveItem(item.id)}
        />
      ))}

      <Button
        preset="default"
        tx="request:addAnother"
        onPress={onAddItem}
        LeftAccessory={AddScrapIcon}
        style={themed($addScrapButton)}
      />
    </View>
  )
}

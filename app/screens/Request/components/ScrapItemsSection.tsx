import { View } from "react-native"

import { Button } from "@/components/Button"
import { Text } from "@/components/Text"
import { useStyles } from "@/theme/useStyles"

import { ScrapItemCard } from "./ScrapItemCard"
import type { ScrapItemDraft, ScrapItemErrors } from "../form/requestFormTypes"
import { createStyles } from "../styles/createRequestStyles"

function AddScrapIcon() {
  const styles = useStyles(createStyles)

  return <Text preset="subheading" text="+" style={styles.addScrapPlus} />
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
  const styles = useStyles(createStyles)

  const { items, errors, onChangeItem, onRemoveItem, onAddItem } = props
  const canRemove = items.length > 1

  return (
    <View style={styles.scrapList}>
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
        style={styles.addScrapButton}
      />
    </View>
  )
}

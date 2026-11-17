import { Pressable, View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { RequestOrder } from "@/screens/History/types/order"
import { useAppTheme } from "@/theme/context"
import { formatShortDate } from "@/utils/formatDate"
import { getStatusColor, getStatusIconName, getStatusLabel } from "@/utils/orderStatusDisplay"

import { styles } from "../styles/homeCardsStyles"

export interface RecentRequestCardProps {
  /**
   * Request shown in the card.
   */
  order: RequestOrder
  /**
   * Opens the request detail screen.
   */
  onPress: () => void
}

/**
 * Compact summary of the latest request, linking to its detail screen.
 */
export function RecentRequestCard(props: RecentRequestCardProps) {
  const { order, onPress } = props
  const { themed, theme } = useAppTheme()

  const statusColor = getStatusColor(theme, order.status)
  const statusLabel = getStatusLabel(order.status)

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`#${order.id}, ${statusLabel}`}
      style={({ pressed }) => [
        themed(styles.$recentCard),
        { borderStartColor: statusColor },
        pressed && themed(styles.$recentPressed),
      ]}
    >
      <View style={themed(styles.$recentHeader)}>
        <Text preset="bold" text={`#${order.id}`} style={themed(styles.$recentId)} />

        <View style={themed(styles.$recentStatus)}>
          <SvgIcon icon={getStatusIconName(order.status)} size={14} fill={statusColor} />
          <Text
            preset="formHelper"
            text={statusLabel}
            style={[themed(styles.$recentStatusText), { color: statusColor }]}
          />
        </View>
      </View>

      <View style={themed(styles.$recentDivider)} />

      <Text
        preset="formHelper"
        text={`${order.address.suburb}, ${order.address.state}`}
        numberOfLines={1}
        style={themed(styles.$recentAddress)}
      />
      <Text
        preset="formHelper"
        tx="history:scrapTypes"
        txOptions={{ count: order.items.length }}
        style={themed(styles.$recentMeta)}
      />

      <View style={themed(styles.$recentFooter)}>
        <Text
          preset="formHelper"
          tx="history:submitted"
          txOptions={{ date: formatShortDate(order.createdAt) }}
          style={themed(styles.$recentMeta)}
        />
        <SvgIcon icon="ChevronDown" size={16} fill={theme.colors.textDim} style={styles.$chevron} />
      </View>
    </Pressable>
  )
}

import { Pressable, View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { RequestOrder } from "@/screens/History/types/order"
import { useAppTheme } from "@/theme/context"
import { formatShortDate } from "@/utils/formatDate"
import { getStatusColor, getStatusIconName, getStatusLabel } from "@/utils/orderStatusDisplay"

import {
  $chevron,
  $recentAddress,
  $recentCard,
  $recentDivider,
  $recentFooter,
  $recentHeader,
  $recentId,
  $recentMeta,
  $recentPressed,
  $recentStatus,
  $recentStatusText,
} from "../styles/homeCardsStyles"

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
        themed($recentCard),
        { borderStartColor: statusColor },
        pressed && themed($recentPressed),
      ]}
    >
      <View style={themed($recentHeader)}>
        <Text preset="bold" text={`#${order.id}`} style={themed($recentId)} />

        <View style={themed($recentStatus)}>
          <SvgIcon icon={getStatusIconName(order.status)} size={14} fill={statusColor} />
          <Text
            preset="formHelper"
            text={statusLabel}
            style={[themed($recentStatusText), { color: statusColor }]}
          />
        </View>
      </View>

      <View style={themed($recentDivider)} />

      <Text
        preset="formHelper"
        text={`${order.address.suburb}, ${order.address.state}`}
        numberOfLines={1}
        style={themed($recentAddress)}
      />
      <Text
        preset="formHelper"
        tx="history:scrapTypes"
        txOptions={{ count: order.items.length }}
        style={themed($recentMeta)}
      />

      <View style={themed($recentFooter)}>
        <Text
          preset="formHelper"
          tx="history:submitted"
          txOptions={{ date: formatShortDate(order.createdAt) }}
          style={themed($recentMeta)}
        />
        <SvgIcon icon="ChevronDown" size={16} fill={theme.colors.textDim} style={$chevron} />
      </View>
    </Pressable>
  )
}

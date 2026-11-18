import { Pressable, View } from "react-native"

import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { RequestOrder } from "@/screens/History/types/order"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { formatShortDate } from "@/utils/formatDate"
import { getStatusColor, getStatusIconName, getStatusLabel } from "@/utils/orderStatusDisplay"

import { createStyles } from "../styles/homeCardsStyles"

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
  const styles = useStyles(createStyles)

  const { order, onPress } = props
  const { theme } = useAppTheme()

  const statusColor = getStatusColor(theme, order.status)
  const statusLabel = getStatusLabel(order.status)

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`#${order.id}, ${statusLabel}`}
      style={({ pressed }) => [
        styles.recentCard,
        { borderStartColor: statusColor },
        pressed && styles.recentPressed,
      ]}
    >
      <View style={styles.recentHeader}>
        <Text preset="bold" text={`#${order.id}`} style={styles.recentId} />

        <View style={styles.recentStatus}>
          <SvgIcon icon={getStatusIconName(order.status)} size={14} fill={statusColor} />
          <Text
            preset="formHelper"
            text={statusLabel}
            style={[styles.recentStatusText, { color: statusColor }]}
          />
        </View>
      </View>

      <View style={styles.recentDivider} />

      <Text
        preset="formHelper"
        text={`${order.address.suburb}, ${order.address.state}`}
        numberOfLines={1}
        style={styles.recentAddress}
      />
      <Text
        preset="formHelper"
        tx="history:scrapTypes"
        txOptions={{ count: order.items.length }}
        style={styles.recentMeta}
      />

      <View style={styles.recentFooter}>
        <Text
          preset="formHelper"
          tx="history:submitted"
          txOptions={{ date: formatShortDate(order.createdAt) }}
          style={styles.recentMeta}
        />
        <SvgIcon icon="ChevronDown" size={16} fill={theme.colors.textDim} style={styles.chevron} />
      </View>
    </Pressable>
  )
}

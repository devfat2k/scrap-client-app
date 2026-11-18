import type { ReactNode } from "react"
import { Pressable, View } from "react-native"

import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { getStatusColor, getStatusIconName, getStatusLabel } from "@/utils/orderStatusDisplay"

import { createStyles } from "./orderCardStyles"
import SvgIcon from "../SvgIcon"
import { Text } from "../Text"

interface OrderCardProps {
  id: string
  status: unknown
  dateLabel: string
  accessibilityLabel: string
  onPress: () => void
  children: ReactNode
  driverContact?: ReactNode
}

/** Details and driver contact are sibling actions, never nested press targets. */
export function OrderCard(props: OrderCardProps) {
  const { id, status, dateLabel, accessibilityLabel, onPress, children, driverContact } = props
  const styles = useStyles(createStyles)
  const { theme } = useAppTheme()
  const statusColor = getStatusColor(theme, status)

  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View
          style={styles.body}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
        >
          <View style={styles.header}>
            <Text preset="bold" text={`#${id}`} />
            <View style={styles.status}>
              <SvgIcon icon={getStatusIconName(status)} size={12} fill={statusColor} />
              <Text
                text={getStatusLabel(status)}
                size="sm"
                style={[styles.statusText, { color: statusColor }]}
              />
            </View>
          </View>
          {children}
          <View style={styles.footer}>
            <Text size="xxs" text={dateLabel} style={styles.footerDate} />
            <View style={styles.detailsLink}>
              <Text preset="formHelper" tx="history:viewDetails" style={styles.action} />
              <SvgIcon
                icon="ChevronDown"
                size={18}
                fill={theme.colors.textDim}
                style={styles.chevron}
              />
            </View>
          </View>
        </View>
      </Pressable>
      {driverContact}
    </View>
  )
}

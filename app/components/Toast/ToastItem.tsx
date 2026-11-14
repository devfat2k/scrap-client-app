import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"

import { Icon, IconTypes } from "@/components/Icon"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"

export type ToastVariant = "success" | "error" | "warning" | "normal" | "custom"

export interface ToastItemProps {
  type: ToastVariant
  text1?: string
  text2?: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

interface TypeVisualConfig {
  icon: IconTypes
  color: string
}

export function ToastItem({ type, text1, text2, onPress, style }: ToastItemProps) {
  const { theme } = useAppTheme()

  const visualConfig: Record<ToastVariant, TypeVisualConfig> = {
    success: { icon: "check", color: theme.colors.tint },
    error: { icon: "x", color: theme.colors.error },
    warning: { icon: "bell", color: theme.colors.palette.accent400 },
    normal: { icon: "bell", color: theme.colors.palette.neutral500 },
    custom: { icon: "bell", color: theme.colors.palette.neutral500 },
  }

  const { icon, color } = visualConfig[type] ?? visualConfig.normal

  const $container: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: color,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: theme.colors.border,
    borderRightColor: theme.colors.border,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    marginHorizontal: theme.spacing.md,
    minHeight: 48,
    shadowColor: theme.colors.palette.neutral900,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  }

  const $iconContainer: ViewStyle = {
    marginRight: theme.spacing.xs,
  }

  const $subtitleStyle: TextStyle = {
    color: theme.colors.textDim,
    marginTop: theme.spacing.xxxs,
  }

  return (
    <TouchableOpacity
      accessibilityRole="alert"
      accessibilityLabel={text1 ?? "Notification"}
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      disabled={!onPress}
      style={[$container, style]}
    >
      <View style={$iconContainer}>
        <Icon icon={icon} size={20} color={color} />
      </View>
      <View style={$contentContainer}>
        {text1 ? <Text weight="medium" size="sm" text={text1} /> : null}
        {text2 ? <Text size="xs" text={text2} style={$subtitleStyle} /> : null}
      </View>
    </TouchableOpacity>
  )
}

const $contentContainer: ViewStyle = {
  flex: 1,
}

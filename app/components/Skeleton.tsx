import { ReactNode, FC, useMemo } from "react"
import { View, ViewStyle, DimensionValue } from "react-native"
import { MotiView } from "moti"

import { useAppTheme } from "@/theme/context"

// Skeleton preset types
export type SkeletonPreset =
  | "text"
  | "title"
  | "subtitle"
  | "paragraph"
  | "avatar"
  | "image"
  | "button"
  | "card"
  | "rectangle"
  | "circle"
  | "custom"

// Skeleton item interface
export interface SkeletonItem {
  preset?: SkeletonPreset
  width?: DimensionValue
  height?: DimensionValue
  borderRadius?: number
  marginBottom?: number
  marginRight?: number
  marginLeft?: number
  marginTop?: number
  style?: ViewStyle
}

// Main skeleton component props
export interface SkeletonProps {
  /** Show loading state */
  loading?: boolean
  /** Animation speed (default: 1200ms) */
  speed?: number
  /** Enable/disable animation for performance */
  animated?: boolean
  /** Array of skeleton items to render */
  items?: SkeletonItem[]
  /** Single skeleton configuration (alternative to items) */
  preset?: SkeletonPreset
  width?: DimensionValue
  height?: DimensionValue
  /** Layout direction */
  direction?: "row" | "column"
  /** Gap between items (default: 8) */
  gap?: number
  /** Number of skeleton items (when using preset) */
  count?: number
  /** Container style */
  containerStyle?: ViewStyle
  /** Children to render when not loading */
  children?: ReactNode
}

// Preset configurations
const getPresetConfig = (preset: SkeletonPreset): SkeletonItem => {
  switch (preset) {
    case "text":
      return { width: "80%", height: 16, borderRadius: 4, marginBottom: 8 }
    case "title":
      return { width: "60%", height: 24, borderRadius: 6, marginBottom: 12 }
    case "subtitle":
      return { width: "40%", height: 18, borderRadius: 4, marginBottom: 8 }
    case "paragraph":
      return { width: "100%", height: 80, borderRadius: 8, marginBottom: 16 }
    case "avatar":
      return { width: 40, height: 40, borderRadius: 20, marginRight: 12 }
    case "image":
      return { width: "100%", height: 200, borderRadius: 8, marginBottom: 16 }
    case "button":
      return { width: 120, height: 40, borderRadius: 8, marginBottom: 12 }
    case "card":
      return { width: "100%", height: 96, borderRadius: 12, marginBottom: 12 }
    case "rectangle":
      return { width: "100%", height: 60, borderRadius: 8, marginBottom: 12 }
    case "circle":
      return { width: 60, height: 60, borderRadius: 30, marginBottom: 12 }
    default:
      return { width: "100%", height: 20, borderRadius: 4, marginBottom: 8 }
  }
}

// Single skeleton item component (using MotiView for flat solid pulse)
const SkeletonItemComponent: FC<
  SkeletonItem & {
    durationMs: number
    animationEnabled?: boolean
    solidColor: string
  }
> = ({
  preset = "rectangle",
  width,
  height,
  borderRadius,
  marginBottom,
  marginRight,
  marginLeft,
  marginTop,
  style,
  durationMs,
  animationEnabled = true,
  solidColor,
}) => {
  const config = getPresetConfig(preset)

  const containerStyle: ViewStyle = {
    marginBottom: marginBottom ?? config.marginBottom,
    marginRight: marginRight ?? config.marginRight,
    marginLeft: marginLeft ?? config.marginLeft,
    marginTop: marginTop ?? config.marginTop,
    width: (width ?? config.width) as any,
    height: (height ?? config.height) as any,
    borderRadius: borderRadius ?? config.borderRadius,
    backgroundColor: solidColor,
    ...style,
  }

  if (!animationEnabled) {
    return <View style={containerStyle} />
  }

  return (
    <MotiView
      from={{ opacity: 0.4 }}
      animate={{ opacity: 0.85 }}
      transition={{
        type: "timing",
        duration: durationMs,
        loop: true,
        repeatReverse: true,
      }}
      style={containerStyle}
    />
  )
}

// Main skeleton component
export const Skeleton: FC<SkeletonProps> = ({
  loading = true,
  speed = 1200,
  animated = true,
  items,
  preset = "rectangle",
  width,
  height,
  direction = "column",
  gap = 8,
  count = 1,
  containerStyle,
  children,
}) => {
  const { theme } = useAppTheme()

  const solidColor = useMemo(() => {
    return theme.isDark ? theme.colors.palette.neutral800 : theme.colors.palette.neutral300
  }, [theme.isDark, theme.colors])

  if (!loading && children) return <>{children}</>
  if (!loading) return null

  // Generate skeleton items
  const skeletonItems: SkeletonItem[] =
    items ??
    Array.from({ length: count }, () => ({
      preset,
      width,
      height,
    }))

  const containerStyles: ViewStyle = {
    flexDirection: direction,
    ...containerStyle,
  }

  return (
    <View style={containerStyles}>
      {skeletonItems.map((item, index) => {
        const isLast = index === skeletonItems.length - 1
        const spacingProps: Partial<SkeletonItem> =
          direction === "row"
            ? { marginRight: isLast ? 0 : gap }
            : { marginBottom: isLast ? 0 : gap }

        return (
          <SkeletonItemComponent
            key={index}
            {...item}
            {...spacingProps}
            durationMs={speed}
            animationEnabled={animated}
            solidColor={solidColor}
          />
        )
      })}
    </View>
  )
}

// Export preset configurations for external use
export const SkeletonPresets = {
  text: () => getPresetConfig("text"),
  title: () => getPresetConfig("title"),
  subtitle: () => getPresetConfig("subtitle"),
  paragraph: () => getPresetConfig("paragraph"),
  avatar: () => getPresetConfig("avatar"),
  image: () => getPresetConfig("image"),
  button: () => getPresetConfig("button"),
  card: () => getPresetConfig("card"),
  rectangle: () => getPresetConfig("rectangle"),
  circle: () => getPresetConfig("circle"),
}

export default Skeleton

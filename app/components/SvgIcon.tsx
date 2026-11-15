import { FC } from "react"
import { ViewStyle } from "react-native"
import type { SvgProps } from "react-native-svg"

import { SvgType as Icons, type ISvgType as IconName } from "@assets/svg"

// 1) Import mapping mà bạn đã export default trong src/assets/svg/index.ts

export interface SvgIconProps {
  /** Tên icon (key của object SvgType) */
  icon?: IconName
  /** Alias cho icon để tương thích với các chỗ đang dùng `name` */
  name?: IconName
  /** Kích thước chiều rộng & chiều cao (px) */
  size?: number
  /** Màu fill hoặc stroke */
  fill?: string
  /** Style thêm cho container */
  style?: ViewStyle
  stroke?: string
  width?: string | number
  height?: string | number
  backgroundColor?: string
}

export type SvgIconPropsWithDefaults = SvgProps & {
  backgroundColor?: string
}

/**
 * Một component chung để render SVG icon.
 */
const SvgIcon: FC<SvgIconProps> = ({
  icon,
  name,
  size = 24,
  fill,
  stroke,
  height,
  width,
  backgroundColor,
  style,
}) => {
  // 2) Lấy tên icon đã được resolve từ props `name` hoặc `icon`
  const resolvedName = name ?? icon

  if (!resolvedName) {
    console.warn(
      '[SvgIcon] icon name is undefined. Please pass a valid "icon" or "name" prop to SvgIcon.',
    )
    return null
  }

  const iconKey = resolvedName as IconName
  const IconComponent = Icons[iconKey] as React.FC<SvgIconPropsWithDefaults> | null

  if (!IconComponent) {
    console.warn(`[SvgIcon] icon "${resolvedName}" không tồn tại trong SvgType mapping.`)
    // console.log('[SvgIcon] available icons:', Object.keys(Icons));
    return null
  }

  // 3) Wrapper để ép kích thước và canh giữa
  return (
    <IconComponent
      width={width ?? size}
      height={height ?? size}
      fill={fill}
      stroke={stroke}
      color={fill}
      backgroundColor={backgroundColor}
      style={style}
    />
  )
}

export default SvgIcon

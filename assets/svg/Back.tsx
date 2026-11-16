import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"

const Back = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 44 44" fill="none" {...props}>
    <Path
      d="M18.1729 22.9165L23.3063 28.0498L22 29.3332L14.6667 21.9998L22 14.6665L23.3063 15.9498L18.1729 21.0832H29.3333V22.9165H18.1729V22.9165"
      fill={props.fill ?? '#1B1F1D'} 
    />
  </Svg>
)
export default Back

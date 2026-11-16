import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"

const ChevronDown = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M6 9L12 15L18 9"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={props.fill ?? "black"}
      fillOpacity={0}
    />
  </Svg>
)
export default ChevronDown

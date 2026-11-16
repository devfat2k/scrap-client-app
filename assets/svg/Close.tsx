import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"

const Close = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 9 9" fill="none" {...props}>
    <Path
      d="M0.875 8.75L0 7.875L3.5 4.375L0 0.875L0.875 0L4.375 3.5L7.875 0L8.75 0.875L5.25 4.375L8.75 7.875L7.875 8.75L4.375 5.25L0.875 8.75V8.75"
      fill={props.fill ?? '#191C1B'} 
    />
  </Svg>
)
export default Close

import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"

const Filter = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={props.fill ?? "black"}
      fillOpacity={0}
    />
  </Svg>
)
export default Filter

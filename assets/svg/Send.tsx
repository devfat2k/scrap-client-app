import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"

const Send = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 16 14" fill="none" {...props}>
    <Path
      d="M0 13.3333V0L15.8333 6.66667L0 13.3333V13.3333M1.66667 10.8333L11.5417 6.66667L1.66667 2.5V5.41667L6.66667 6.66667L1.66667 7.91667V10.8333V10.8333M1.66667 10.8333V6.66667V2.5V5.41667V5.41667V7.91667V7.91667V10.8333V10.8333"
      fill={props.fill ?? 'white'} 
    />
  </Svg>
)
export default Send

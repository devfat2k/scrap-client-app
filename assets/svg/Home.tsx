import Svg, { Path } from "react-native-svg"
import type { SvgProps } from "react-native-svg"

const Home = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 16 18" fill="none" {...props}>
    <Path
      d="M2 16H5V10H11V16H14V7L8 2.5L2 7V16V16M0 18V6L8 0L16 6V18H9V12H7V18H0V18M8 9.25V9.25V9.25V9.25V9.25V9.25V9.25V9.25V9.25V9.25V9.25"
      fill={props.fill ?? '#006A3B'} 
    />
  </Svg>
)
export default Home

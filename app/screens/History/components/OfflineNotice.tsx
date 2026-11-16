import { View } from "react-native"

import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useAppTheme } from "@/theme/context"

import { $offlineBanner, $offlineText, $offlineTitle } from "../styles/orderDetailScreenStyles"

export interface OfflineNoticeProps {
  /**
   * Offline heading looked up via i18n.
   */
  titleTx: TxKeyPath
  /**
   * Offline message looked up via i18n.
   */
  messageTx: TxKeyPath
}

/**
 * Amber offline banner shared by History and request detail.
 */
export function OfflineNotice(props: OfflineNoticeProps) {
  const { titleTx, messageTx } = props
  const { themed } = useAppTheme()

  return (
    <View style={themed($offlineBanner)}>
      <Text preset="bold" tx={titleTx} style={themed($offlineTitle)} />
      <Text preset="formHelper" tx={messageTx} style={themed($offlineText)} />
    </View>
  )
}

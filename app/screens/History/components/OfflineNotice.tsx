import { View } from "react-native"

import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/orderDetailScreenStyles"

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
  const styles = useStyles(createStyles)

  const { titleTx, messageTx } = props
  return (
    <View style={styles.offlineBanner}>
      <Text preset="bold" tx={titleTx} style={styles.offlineTitle} />
      <Text preset="formHelper" tx={messageTx} style={styles.offlineText} />
    </View>
  )
}

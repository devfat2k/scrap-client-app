import { FC } from "react"
import { ScrollView, View } from "react-native"

import { Header } from "@/components/Header"
import { Text } from "@/components/Text"
import type { TxKeyPath } from "@/i18n"
import { useStyles } from "@/theme/useStyles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

import { createStyles } from "../styles/accountScreenStyles"

const CONTACT_LABELS = ["account:fullName", "account:phone", "account:email"] satisfies TxKeyPath[]

export const AccountScreen: FC = () => {
  const styles = useStyles(createStyles)
  const safeAreaInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={styles.container}>
      <Header titleTx="account:title" />
      <ScrollView contentContainerStyle={[styles.content, safeAreaInsets]}>
        <View style={styles.profile}>
          <View
            style={styles.avatar}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
          >
            <Text text="G" size="xl" weight="semiBold" />
          </View>
          <View style={styles.profileText}>
            <Text preset="subheading" tx="account:guest" />
            <Text tx="account:description" style={styles.description} />
          </View>
        </View>

        <View style={styles.section}>
          <Text preset="bold" tx="account:contactDetails" accessibilityRole="header" />
          <View style={styles.details}>
            {CONTACT_LABELS.map((label, index) => (
              <View key={label} style={[styles.detailRow, index > 0 && styles.rowSeparator]}>
                <Text tx={label} style={styles.label} />
                <Text tx="account:notProvided" />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

import { FC } from "react"
import { View } from "react-native"

import { Text } from "@/components/Text"
import { useStyles } from "@/theme/useStyles"

import { createStyles } from "../styles/accountScreenStyles"

export const AccountScreen: FC = () => {
  const styles = useStyles(createStyles)

  return (
    <View style={styles.container}>
      <Text preset="subheading" style={styles.text} text="Account" />
    </View>
  )
}

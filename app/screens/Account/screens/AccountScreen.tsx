import { FC } from "react"

import { Screen } from "@/components/Screen"
import { Text } from "@/components/Text"
import { useAppTheme } from "@/theme/context"

import { $container, $text } from "../styles/accountScreenStyles"

export const AccountScreen: FC = () => {
  const { themed } = useAppTheme()

  return (
    <Screen preset="fixed" contentContainerStyle={themed($container)}>
      <Text preset="subheading" style={themed($text)} text="Account" />
    </Screen>
  )
}

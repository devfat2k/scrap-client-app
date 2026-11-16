import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { AppStackParamList, RequestStackParamList } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"

import {
  $actions,
  $content,
  $ecoCard,
  $ecoHeader,
  $ecoText,
  $ecoTitle,
  $hero,
  $message,
  $requestIdPill,
  $requestIdText,
  $successCircle,
  $title,
} from "../styles/requestSuccessStyles"

type RequestSuccessScreenProps = NativeStackScreenProps<
  RequestStackParamList,
  "RequestSuccessScreen"
>
type MainTabName = "HomeTab" | "HistoryTab"

/**
 * Confirmation shown after a pickup request is sent.
 */
export function RequestSuccessScreen({ route }: RequestSuccessScreenProps) {
  const { requestId } = route.params
  const { themed, theme } = useAppTheme()
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  function leaveTo(tab: MainTabName) {
    // Reset the root stack so the success screen and the form leave the history.
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTab", params: { screen: tab } }],
    })
  }

  return (
    <Screen
      preset="scroll"
      safeAreaEdges={["top", "bottom"]}
      contentContainerStyle={themed($content)}
    >
      <View style={themed($hero)}>
        <View style={themed($successCircle)} accessibilityElementsHidden>
          <SvgIcon icon="Check" size={44} fill={theme.colors.background} />
        </View>

        <Text preset="heading" tx="requestSuccess:title" style={themed($title)} />
        <Text preset="formHelper" tx="requestSuccess:message" style={themed($message)} />

        <View style={themed($requestIdPill)}>
          <Text
            preset="bold"
            tx="requestSuccess:requestId"
            txOptions={{ id: requestId }}
            style={themed($requestIdText)}
          />
        </View>
      </View>

      <View style={themed($ecoCard)}>
        <View style={themed($ecoHeader)}>
          <SvgIcon icon="Earth" size={18} fill={theme.colors.palette.primary600} />
          <Text preset="bold" tx="requestSuccess:ecoTitle" style={themed($ecoTitle)} />
        </View>
        <Text preset="formHelper" tx="requestSuccess:ecoMessage" style={themed($ecoText)} />
      </View>

      <View style={themed($actions)}>
        <Button
          preset="primary"
          tx="requestSuccess:viewRequests"
          onPress={() => leaveTo("HistoryTab")}
        />
        <Button preset="default" tx="requestSuccess:backHome" onPress={() => leaveTo("HomeTab")} />
      </View>
    </Screen>
  )
}

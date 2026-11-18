import { ScrollView, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack"

import { Button } from "@/components/Button"
import SvgIcon from "@/components/SvgIcon"
import { Text } from "@/components/Text"
import type { AppStackParamList, RequestStackParamList } from "@/navigators/navigationTypes"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

import { createStyles } from "../styles/requestSuccessStyles"

type RequestSuccessScreenProps = NativeStackScreenProps<
  RequestStackParamList,
  "RequestSuccessScreen"
>
type MainTabName = "HomeTab" | "HistoryTab"

/**
 * Confirmation shown after a pickup request is sent.
 */
export function RequestSuccessScreen({ route }: RequestSuccessScreenProps) {
  const styles = useStyles(createStyles)

  const { requestId } = route.params
  const { theme } = useAppTheme()
  const containerInsets = useSafeAreaInsetsStyle(["top", "bottom"])
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>()

  function leaveTo(tab: MainTabName) {
    // Reset the root stack so the success screen and the form leave the history.
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTab", params: { screen: tab } }],
    })
  }

  return (
    <View style={[styles.container, containerInsets]}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.successCircle} accessibilityElementsHidden>
            <SvgIcon icon="Check" size={44} fill={theme.colors.background} />
          </View>

          <Text preset="heading" tx="requestSuccess:title" style={styles.title} />
          <Text preset="formHelper" tx="requestSuccess:message" style={styles.message} />

          <View style={styles.requestIdPill}>
            <Text
              preset="bold"
              tx="requestSuccess:requestId"
              txOptions={{ id: requestId }}
              style={styles.requestIdText}
            />
          </View>
        </View>

        <View style={styles.ecoCard}>
          <View style={styles.ecoHeader}>
            <SvgIcon icon="Earth" size={18} fill={theme.colors.palette.primary600} />
            <Text preset="bold" tx="requestSuccess:ecoTitle" style={styles.ecoTitle} />
          </View>
          <Text preset="formHelper" tx="requestSuccess:ecoMessage" style={styles.ecoText} />
        </View>

        <View style={styles.actions}>
          <Button
            preset="primary"
            tx="requestSuccess:viewRequests"
            onPress={() => leaveTo("HistoryTab")}
          />
          <Button
            preset="default"
            tx="requestSuccess:backHome"
            onPress={() => leaveTo("HomeTab")}
          />
        </View>
      </ScrollView>
    </View>
  )
}

import { Pressable, View } from "react-native"

import { Text } from "@/components/Text"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"

import { styles } from "../styles/orderListRowStyles"
import type { DriverAssignment } from "../types/order"
import { callDriver, getDriverPhoneUrl } from "../utils/driverCall"

export function OrderDriver({ driver }: { driver?: DriverAssignment }) {
  const { themed } = useAppTheme()
  const disabled = !getDriverPhoneUrl(driver)
  const hint = driver?.isDemoContact ? "history:demoCallUnavailable" : "history:phoneUnavailable"
  return (
    <View style={themed(styles.$driver)}>
      <View style={styles.$driverInfo}>
        {!driver && <Text tx="history:driverUnavailable" style={themed(styles.$meta)} />}
        {!!driver?.name && <Text preset="bold" text={driver.name} />}
        {!!driver?.vehiclePlate && (
          <Text preset="formHelper" text={driver.vehiclePlate} style={themed(styles.$meta)} />
        )}
        {disabled && driver && <Text preset="formHelper" tx={hint} style={themed(styles.$meta)} />}
      </View>
      {driver && (
        <Pressable
          accessibilityRole="button"
          disabled={disabled}
          accessibilityState={{ disabled }}
          accessibilityLabel={translate("history:callDriver", {
            name: driver.name || translate("history:driver"),
          })}
          accessibilityHint={disabled ? translate(hint) : undefined}
          onPress={() => void callDriver(driver)}
          style={({ pressed }) => [themed(styles.$call), pressed && themed(styles.$pressed)]}
        >
          <Text tx="history:call" style={disabled ? themed(styles.$meta) : undefined} />
        </Pressable>
      )}
    </View>
  )
}

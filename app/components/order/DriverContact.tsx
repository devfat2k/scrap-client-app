import { useState } from "react"
import { Pressable, View } from "react-native"

import type { DriverAssignment } from "@/domain/driver"
import { translate } from "@/i18n/translate"
import { useAppTheme } from "@/theme/context"
import { useStyles } from "@/theme/useStyles"

import { DriverContactSheet } from "./DriverContactSheet"
import { createStyles } from "./orderCardStyles"
import SvgIcon from "../SvgIcon"
import { Text } from "../Text"

export function DriverContact({ driver }: { driver?: DriverAssignment }) {
  const [visible, setVisible] = useState(false)
  const { theme } = useAppTheme()
  const styles = useStyles(createStyles)

  if (!driver) {
    return <Text tx="history:driverUnavailable" style={[styles.driverRow, styles.meta]} />
  }

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={translate("history:viewDriver", {
          name: driver.name || translate("history:driver"),
        })}
        onPress={() => setVisible(true)}
        style={({ pressed }) => [styles.driverRow, pressed && styles.contactPressed]}
      >
        <View style={styles.driverText}>
          <Text preset="formHelper" tx="history:assignedDriver" style={styles.meta} />
          <Text
            preset="bold"
            text={driver.name || translate("history:driver")}
            style={styles.driverName}
          />
        </View>
        <SvgIcon icon="Phone" size={20} fill={theme.colors.text} />
        <SvgIcon icon="ChevronDown" size={16} fill={theme.colors.textDim} style={styles.chevron} />
      </Pressable>
      <DriverContactSheet driver={driver} visible={visible} onClose={() => setVisible(false)} />
    </>
  )
}

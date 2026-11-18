import { useEffect } from "react"
import { BackHandler, View } from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet"

import type { DriverAssignment } from "@/domain/driver"
import { translate } from "@/i18n/translate"
import { useStyles } from "@/theme/useStyles"
import { callDriver, getDriverPhoneUrl } from "@/utils/driverCall"
import { useBottomSheetModal } from "@/utils/useBottomSheetModal"
import { useSafeAreaInsetsStyle } from "@/utils/useSafeAreaInsetsStyle"

import { createStyles } from "./driverContactSheetStyles"
import { Button } from "../Button"
import { Text } from "../Text"

function renderBackdrop(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
    />
  )
}

interface DriverContactSheetProps {
  driver: DriverAssignment
  visible: boolean
  onClose: () => void
}

export function DriverContactSheet({ driver, visible, onClose }: DriverContactSheetProps) {
  const styles = useStyles(createStyles)
  const bottomInset = useSafeAreaInsetsStyle(["bottom"], "margin")
  const { sheetRef, handleDismiss } = useBottomSheetModal({ visible, onClose })
  const disabled = !getDriverPhoneUrl(driver)
  const hint = driver.isDemoContact ? "history:demoCallUnavailable" : "history:phoneUnavailable"

  useEffect(() => {
    if (!visible) return
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      sheetRef.current?.dismiss()
      return true
    })
    return () => subscription.remove()
  }, [visible, sheetRef])

  return (
    <BottomSheetModal
      ref={sheetRef}
      onDismiss={handleDismiss}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheet}
      handleIndicatorStyle={styles.handle}
    >
      <BottomSheetView style={[styles.content, bottomInset]}>
        <View style={styles.identity}>
          <Text tx="history:driverDetails" size="xs" style={styles.muted} />
          <Text
            text={driver.name || translate("history:driver")}
            size="xl"
            weight="semiBold"
            accessibilityRole="header"
          />
        </View>
        <View style={styles.details}>
          <View style={styles.row}>
            <Text tx="history:driverPhone" size="xs" style={styles.label} />
            <Text
              text={driver.phone?.trim() || translate("history:phoneUnavailable")}
              size="md"
              weight="medium"
              style={styles.value}
            />
          </View>
          {!!driver.vehiclePlate && (
            <View style={styles.row}>
              <Text tx="history:vehiclePlate" size="xs" style={styles.label} />
              <Text text={driver.vehiclePlate} size="md" weight="medium" style={styles.value} />
            </View>
          )}
        </View>
        <View style={styles.actions}>
          {disabled && <Text tx={hint} size="xs" style={styles.muted} />}
          <Button
            preset="primary"
            tx="history:call"
            disabled={disabled}
            style={disabled ? styles.disabledCall : undefined}
            accessibilityState={{ disabled }}
            accessibilityLabel={translate("history:callDriver", {
              name: driver.name || translate("history:driver"),
            })}
            onPress={() => void callDriver(driver)}
          />
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

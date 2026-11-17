import { Linking } from "react-native"

import { translate } from "@/i18n/translate"
import { showToast } from "@/utils/toastService"

import type { DriverAssignment } from "../types/order"

export function getDriverPhoneUrl(driver?: DriverAssignment): string | undefined {
  if (!driver || driver.isDemoContact !== false) return undefined
  const phone = driver.phone?.replace(/[\s()-]/g, "")
  return phone && /^\+?\d{8,15}$/.test(phone) ? `tel:${phone}` : undefined
}

export async function callDriver(driver?: DriverAssignment): Promise<void> {
  const url = getDriverPhoneUrl(driver)
  if (!url) return
  try {
    if (!(await Linking.canOpenURL(url))) throw new Error("Dialler unavailable")
    await Linking.openURL(url)
  } catch {
    showToast({ type: "ERROR", message: translate("history:callFailed") })
  }
}

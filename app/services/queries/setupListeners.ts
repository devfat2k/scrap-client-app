import { AppState, type AppStateStatus, Platform } from "react-native"
import { focusManager, onlineManager } from "@tanstack/react-query"

import { networkService } from "@/services/network"

import { initQueryPersistence } from "./persister"
import { queryClient } from "./queryClient"

export function setupQueryListeners(): () => void {
  const [unsubscribePersist] = initQueryPersistence(queryClient)
  const stopNetworkService = networkService.start()

  onlineManager.setEventListener((setOnline) => {
    return networkService.subscribe((status) => {
      setOnline(status.isOnline)
    })
  })

  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active")
    }
  }

  const subscription = AppState.addEventListener("change", onAppStateChange)

  return () => {
    subscription.remove()
    stopNetworkService?.()
    unsubscribePersist?.()
  }
}

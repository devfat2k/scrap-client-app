import { useSyncExternalStore } from "react"

import { networkService } from "./networkService"
import type { NetworkStatus } from "./networkTypes"

export function useNetworkStatus(): NetworkStatus {
  return useSyncExternalStore(
    networkService.subscribe,
    networkService.getStatus,
    networkService.getStatus,
  )
}

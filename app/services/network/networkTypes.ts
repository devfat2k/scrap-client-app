import type { NetInfoStateType } from "@react-native-community/netinfo"

export type ConnectionType = NetInfoStateType | `${NetInfoStateType}` | "unknown"

export interface NetworkStatus {
  readonly isOnline: boolean
  readonly isInternetReachable: boolean | null
  readonly connectionType: ConnectionType
  readonly isInitialized: boolean
}

export type NetworkListener = (status: NetworkStatus) => void

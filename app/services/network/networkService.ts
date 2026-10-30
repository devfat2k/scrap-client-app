import NetInfo, { type NetInfoState } from "@react-native-community/netinfo"

import type { ConnectionType, NetworkListener, NetworkStatus } from "./networkTypes"

const DEBOUNCE_MS = 400

const DEFAULT_STATUS: NetworkStatus = {
  isOnline: true,
  isInternetReachable: null,
  connectionType: "unknown",
  isInitialized: false,
}

function calculateIsOnline(
  isConnected: boolean | null,
  isInternetReachable: boolean | null,
): boolean {
  return Boolean(isConnected && isInternetReachable !== false)
}

function mapState(state: NetInfoState): NetworkStatus {
  return {
    isOnline: calculateIsOnline(state.isConnected, state.isInternetReachable),
    isInternetReachable: state.isInternetReachable,
    connectionType: (state.type as ConnectionType) ?? "unknown",
    isInitialized: true,
  }
}

class NetworkService {
  private currentStatus: NetworkStatus = { ...DEFAULT_STATUS }
  private subscribers = new Set<NetworkListener>()
  private debounceTimer: ReturnType<typeof setTimeout> | null = null
  private netInfoUnsubscribe: (() => void) | null = null

  public getStatus = (): NetworkStatus => {
    return this.currentStatus
  }

  public isOnline = (): boolean => {
    return this.currentStatus.isOnline
  }

  public subscribe = (listener: NetworkListener): (() => void) => {
    this.subscribers.add(listener)
    return () => {
      this.subscribers.delete(listener)
    }
  }

  public start = (): (() => void) => {
    if (this.netInfoUnsubscribe) {
      return this.stop
    }

    NetInfo.fetch()
      .then((state) => {
        this.currentStatus = mapState(state)
        this.notify()
      })
      .catch(() => {
        // Fallback to safe default when fetch fails
      })

    this.netInfoUnsubscribe = NetInfo.addEventListener(this.handleStateChange)
    return this.stop
  }

  public stop = (): void => {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = null
    }
    if (this.netInfoUnsubscribe) {
      this.netInfoUnsubscribe()
      this.netInfoUnsubscribe = null
    }
    this.subscribers.clear()
    this.currentStatus = { ...DEFAULT_STATUS }
  }

  private handleStateChange = (state: NetInfoState): void => {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }
    this.debounceTimer = setTimeout(() => {
      this.currentStatus = mapState(state)
      this.notify()
    }, DEBOUNCE_MS)
  }

  private notify = (): void => {
    for (const listener of this.subscribers) {
      listener(this.currentStatus)
    }
  }
}

export const networkService = new NetworkService()

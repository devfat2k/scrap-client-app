import type { ApisauceInstance } from "apisauce"

export interface ApiEnvelope<T> {
  readonly success: boolean
  readonly message?: string
  readonly data: T
  readonly timestamp?: string
}

export interface PageResponse<T> {
  readonly content: T[]
  readonly page: number
  readonly size: number
  readonly totalElements: number
  readonly totalPages: number
  readonly last: boolean
}

export type RefreshOutcome = "success" | "expired" | "failed"

export interface AuthBridge {
  getAccessToken: () => string | null
  hasSession: () => boolean
  refreshSession: () => Promise<RefreshOutcome>
  onSessionExpired: () => void
}

type RequestConfig = NonNullable<Parameters<ApisauceInstance["get"]>[2]>

export type RequestOptions = RequestConfig & {
  skipAuthRefresh?: boolean
  signal?: AbortSignal
}

export interface ApiConfig {
  url: string
  timeout: number
}

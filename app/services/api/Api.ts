import { create, type ApiResponse, type ApisauceInstance } from "apisauce"

import { APP_HEADERS } from "./appHeaders"
import { HTTP_STATUS } from "./constants"
import type { ApiConfig, AuthBridge, RefreshOutcome, RequestOptions } from "./types"
import { unwrap } from "./unwrap"

export class Api {
  readonly apisauce: ApisauceInstance
  private bridge: AuthBridge | null = null
  private refreshing: Promise<RefreshOutcome> | null = null

  constructor(config: ApiConfig) {
    this.apisauce = create({
      baseURL: config.url,
      timeout: config.timeout,
      headers: { Accept: "application/json", ...APP_HEADERS },
    })
    this.apisauce.addRequestTransform((request) => {
      const token = this.bridge?.getAccessToken()
      if (token) request.headers = { ...request.headers, Authorization: `Bearer ${token}` }
    })
  }

  setAuthBridge(bridge: AuthBridge) {
    this.bridge = bridge
  }

  setBaseUrl(url: string) {
    this.apisauce.setBaseURL(url)
  }

  get<T>(path: string, params?: object, options?: RequestOptions) {
    const { skipAuthRefresh, ...config } = options ?? {}
    return this.run(() => this.apisauce.get<T>(path, params, config), unwrap, skipAuthRefresh)
  }

  post<T>(path: string, data?: unknown, options?: RequestOptions) {
    const { skipAuthRefresh, ...config } = options ?? {}
    return this.run(() => this.apisauce.post<T>(path, data, config), unwrap, skipAuthRefresh)
  }

  put<T>(path: string, data?: unknown, options?: RequestOptions) {
    const { skipAuthRefresh, ...config } = options ?? {}
    return this.run(() => this.apisauce.put<T>(path, data, config), unwrap, skipAuthRefresh)
  }

  patch<T>(path: string, data?: unknown, options?: RequestOptions) {
    const { skipAuthRefresh, ...config } = options ?? {}
    return this.run(() => this.apisauce.patch<T>(path, data, config), unwrap, skipAuthRefresh)
  }

  delete<T>(path: string, params?: object, options?: RequestOptions) {
    const { skipAuthRefresh, ...config } = options ?? {}
    return this.run(() => this.apisauce.delete<T>(path, params, config), unwrap, skipAuthRefresh)
  }

  private async run<D, R>(
    send: () => Promise<ApiResponse<D>>,
    parse: (response: ApiResponse<D>) => R,
    skipAuthRefresh = false,
  ): Promise<R> {
    const first = await send()
    if (!this.canRefresh(first, skipAuthRefresh)) return parse(first)

    const outcome = await this.refreshOnce()
    if (outcome === "expired") this.bridge?.onSessionExpired()
    if (outcome !== "success") return parse(first)

    const second = await send()
    if (second.status === HTTP_STATUS.UNAUTHORIZED) this.bridge?.onSessionExpired()
    return parse(second)
  }

  private canRefresh(response: ApiResponse<unknown>, skipAuthRefresh: boolean) {
    return (
      !skipAuthRefresh &&
      response.status === HTTP_STATUS.UNAUTHORIZED &&
      this.bridge?.hasSession() === true
    )
  }

  private refreshOnce(): Promise<RefreshOutcome> {
    const bridge = this.bridge
    if (!bridge) return Promise.resolve("failed")
    if (!this.refreshing) {
      this.refreshing = bridge.refreshSession().finally(() => {
        this.refreshing = null
      })
    }
    return this.refreshing
  }
}

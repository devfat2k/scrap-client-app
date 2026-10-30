import type { GeneralApiProblem } from "./apiProblem"

export type ApiErrorKind = GeneralApiProblem["kind"] | "cancelled"

export class ApiError extends Error {
  readonly kind: ApiErrorKind
  readonly status: number | null
  readonly serverMessage: string | null
  readonly serverData: unknown

  constructor(
    kind: ApiErrorKind,
    status: number | null = null,
    serverMessage: string | null = null,
    serverData: unknown = null,
  ) {
    super(serverMessage ?? kind)
    this.name = "ApiError"
    this.kind = kind
    this.status = status
    this.serverMessage = serverMessage
    this.serverData = serverData
  }
}

export const isApiError = (error: unknown): error is ApiError =>
  error instanceof Error && error.name === "ApiError"

export const getApiErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (isApiError(error) && error.serverMessage) return error.serverMessage
  return fallbackMessage
}

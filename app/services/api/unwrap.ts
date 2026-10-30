import type { ApiResponse } from "apisauce"

import { ApiError } from "./apiError"
import { getGeneralApiProblem } from "./apiProblem"
import type { ApiEnvelope } from "./types"

const CANCEL_PROBLEM = "CANCEL_ERROR"

function extractServerMessage(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return null
  const payload = data as Record<string, unknown>
  if (typeof payload.message === "string" && payload.message.trim().length > 0) {
    return payload.message
  }
  if (typeof payload.detail === "string" && payload.detail.trim().length > 0) {
    return payload.detail
  }
  if (typeof payload.error === "string" && payload.error.trim().length > 0) {
    return payload.error
  }
  return null
}

function toApiError(response: ApiResponse<unknown>): ApiError {
  if (response.problem === CANCEL_PROBLEM) return new ApiError("cancelled")
  const problem = getGeneralApiProblem(response)
  const serverMessage = extractServerMessage(response.data)
  return new ApiError(
    problem?.kind ?? "unknown",
    response.status ?? null,
    serverMessage,
    response.data,
  )
}

function isApiEnvelope<T>(data: unknown): data is ApiEnvelope<T> {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    typeof (data as Record<string, unknown>).success === "boolean" &&
    "data" in data
  )
}

export function unwrap<T>(response: ApiResponse<unknown>): T {
  if (!response.ok) throw toApiError(response)
  if (response.status === 204) return undefined as T

  if (isApiEnvelope<T>(response.data)) {
    if (!response.data.success) throw toApiError(response)
    return response.data.data
  }

  return response.data as T
}

export function unwrapVoid(response: ApiResponse<unknown>): void {
  if (!response.ok) throw toApiError(response)
  if (isApiEnvelope(response.data) && !response.data.success) {
    throw toApiError(response)
  }
}

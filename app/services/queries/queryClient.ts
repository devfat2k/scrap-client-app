import { QueryClient } from "@tanstack/react-query"

import { CACHE, RETRY, STALE } from "./constants"
import { isApiError } from "../api/apiError"

export const shouldRetry = (failureCount: number, error: unknown): boolean =>
  isApiError(error) && RETRY.KINDS.some((kind) => kind === error.kind) && failureCount < RETRY.MAX

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE.DEFAULT,
      gcTime: CACHE.GC_TIME,
      retry: shouldRetry,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: false,
    },
  },
})

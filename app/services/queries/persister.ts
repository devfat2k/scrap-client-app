import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import type { Query, QueryClient } from "@tanstack/react-query"
import { persistQueryClient } from "@tanstack/react-query-persist-client"

import { CACHE, PERSIST } from "./constants"
import { loadString, remove, saveString } from "../../utils/storage"

export const mmkvStorageAdapter = {
  setItem: (key: string, value: string) => {
    saveString(key, value)
    return Promise.resolve()
  },
  getItem: (key: string) => {
    const value = loadString(key)
    return Promise.resolve(value ?? null)
  },
  removeItem: (key: string) => {
    remove(key)
    return Promise.resolve()
  },
}

export const queryPersister = createAsyncStoragePersister({
  storage: mmkvStorageAdapter,
  key: PERSIST.STORAGE_ID,
  throttleTime: PERSIST.THROTTLE_MS,
})

export const shouldDehydrateQuery = (query: Query): boolean => {
  const isSuccess = query.state.status === "success"
  const meta = query.meta as { persist?: boolean } | undefined
  return isSuccess && meta?.persist !== false
}

export const queryPersistOptions = {
  persister: queryPersister,
  maxAge: CACHE.PERSIST_MAX_AGE,
  buster: CACHE.BUSTER,
  dehydrateOptions: {
    shouldDehydrateQuery,
  },
}

export function initQueryPersistence(client: QueryClient) {
  return persistQueryClient({
    queryClient: client,
    ...queryPersistOptions,
  })
}

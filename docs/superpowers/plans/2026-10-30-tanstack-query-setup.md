# TanStack Query React Native Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Triển khai hạ tầng TanStack Query v5 hoàn chỉnh cho React Native theo sát tài liệu chính thức: tích hợp `onlineManager` (NetInfo), `focusManager` (AppState), lưu trữ offline cache với `persistQueryClient` qua MMKV (`@tanstack/react-query-persist-client` + `@tanstack/query-async-storage-persister`), hook screen focus `useRefreshOnFocus` (React Navigation 7), cấu hình `QueryClient`, dọn dẹp stubs và gắn `PersistQueryClientProvider` vào root `app/app.tsx`.

**Architecture:** Tạo tầng dịch vụ server-state độc lập tại `app/services/queries/`. Tách biệt trình lắng nghe trạng thái kết nối mạng và app lifecycle vào `setupListeners.ts`, hỗ trợ screen-level focus refetching qua hook `useRefreshOnFocus.ts`, cấu hình lưu trữ offline cache persister bằng MMKV qua `persister.ts`, khởi tạo `queryClient` với các retry heuristic dựa trên `ApiError`, và mount `PersistQueryClientProvider` tại `app/app.tsx`.

**Tech Stack:** `@tanstack/react-query@5.105.0`, `@tanstack/react-query-persist-client@5.105.0`, `@tanstack/query-async-storage-persister@5.105.0`, `react-native-mmkv@3.3.3`, `@react-native-community/netinfo@12.0.1`, React Native `AppState`, `@react-navigation/native@7.0.14`, Jest, `@testing-library/react-native`.

**Spec:** [Tài liệu TanStack Query React Native](https://tanstack.com/query/latest/docs/framework/react/react-native), [TanStack Persist Plugins](https://tanstack.com/query/latest/docs/framework/react/plugins/persistQueryClient), [TanStack Reference Functions](https://tanstack.com/query/latest/docs/framework/react/reference/functions/).

## Global Constraints

- **Tối đa 150 dòng/file**: Bắt buộc tuân thủ ESLint `max-lines`. Tách nhỏ theo ranh giới chức năng.
- **Không `any`**: Sử dụng `unknown` + type guard / generics.
- **Package manager**: `bun` duy nhất. Không dùng npm, npx, yarn, pnpm.
- **Chạy tests**: Bắt buộc dùng `bun run test`, tuyệt đối KHÔNG dùng `bun test`.
- **Tài liệu TanStack Query v5**: Dùng `gcTime` thay vì `cacheTime` (v4 cũ); không trả về `undefined` từ `queryFn`; `maxAge` của persister phải `<= gcTime`.
- **Bảo mật Australian Privacy Act**: Không dehydrate các query chứa dữ liệu xác thực/token nhạy cảm; hỗ trợ cờ `meta: { persist: false }` để loại trừ query cụ thể.

## Review Focus

1. **Persister MMKV Adapter**: MMKV là synchronous engine, adapter `clientStorage` bọc thành asynchronous `setItem`, `getItem`, `removeItem` đúng interface mà `createAsyncStoragePersister` yêu cầu.
2. **Dehydrate filtering**: `shouldDehydrateQuery` chỉ giữ lại các query có status `"success"` và không bị đánh dấu `meta?.persist === false`.
3. **Buster invalidation**: Khi `CACHE.BUSTER` thay đổi (vd từ `"v1"` sang `"v2"`), toàn bộ cache cũ được dọn dẹp sạch mà không gây crash app.
4. **Network reconnection resume**: Khi mất mạng và có lại, `onlineManager` cập nhật boolean chính xác dựa trên cả `isConnected` và `isInternetReachable !== false`.
5. **App focus refetch deduplication**: Khi app chuyển từ background sang active, `focusManager.setFocused(true)` chỉ kích hoạt trên native (bỏ qua `Platform.OS === 'web'`).
6. **Screen focus initial mount skip**: `useRefreshOnFocus` không gọi `refetch()` ở lần render đầu tiên (mount), chỉ gọi khi màn hình được re-focus lại sau đó.

---

### Task 1: Triển khai `setupListeners.ts` (`onlineManager` & `focusManager`)

**Files:**
- Create: `app/services/queries/setupListeners.ts`
- Test: `app/services/queries/setupListeners.test.ts`

**Interfaces:**
- Consumes: `@tanstack/react-query` (`onlineManager`, `focusManager`), `@react-native-community/netinfo` (`NetInfo`), `react-native` (`AppState`, `Platform`).
- Produces: `setupQueryListeners: () => () => void` (trả về teardown function).

- [ ] **Step 1: Viết failing test `setupListeners.test.ts`**

Kiểm thử:
1. `onlineManager.setEventListener` nhận đúng trạng thái online khi `isConnected: true` và `isInternetReachable: true`.
2. `onlineManager` nhận false khi `isConnected: false` hoặc `isInternetReachable: false`.
3. `focusManager.setFocused` được gọi với `true` khi `AppState` chuyển sang `active`, và `false` khi `background`.
4. Gọi hàm teardown trả về sẽ hủy cả 2 subscription của NetInfo và AppState.

- [ ] **Step 2: Chạy test để xác nhận test FAIL**

Run: `bun run test app/services/queries/setupListeners.test.ts`
Expected: FAIL với lỗi file hoặc hàm chưa tồn tại.

- [ ] **Step 3: Triển khai `setupListeners.ts`**

Cài đặt `setupQueryListeners()`:
```typescript
import NetInfo, { type NetInfoState } from "@react-native-community/netinfo"
import { focusManager, onlineManager } from "@tanstack/react-query"
import { AppState, type AppStateStatus, Platform } from "react-native"

export function setupQueryListeners(): () => void {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state: NetInfoState) => {
      setOnline(Boolean(state.isConnected && state.isInternetReachable !== false))
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
  }
}
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `bun run test app/services/queries/setupListeners.test.ts`
Expected: PASS 100%.

- [ ] **Step 5: Commit**

```bash
git add app/services/queries/setupListeners.ts app/services/queries/setupListeners.test.ts
git commit -m "feat(queries): add onlineManager and focusManager setup for react-native"
```

---

### Task 2: Triển khai MMKV Persister `persister.ts` (`persistQueryClient`)

**Files:**
- Create: `app/services/queries/persister.ts`
- Test: `app/services/queries/persister.test.ts`

**Interfaces:**
- Consumes: `@tanstack/query-async-storage-persister` (`createAsyncStoragePersister`), `app/utils/storage` (`storage`), `app/services/queries/constants` (`CACHE`, `PERSIST`).
- Produces: `asyncStoragePersister`, `shouldDehydrateQuery: (query: Query) => boolean`, `persistOptions`.

- [ ] **Step 1: Viết failing test `persister.test.ts`**

Kiểm thử:
1. `clientStorage.setItem`, `getItem`, `removeItem` kết nối chính xác tới MMKV `storage`.
2. `shouldDehydrateQuery` trả về `true` cho query thành công (`status: "success"`).
3. `shouldDehydrateQuery` trả về `false` cho query lỗi (`status: "error"`) hoặc query có `meta?.persist === false`.
4. `persistOptions` có đúng cấu hình: `maxAge: CACHE.PERSIST_MAX_AGE`, `buster: CACHE.BUSTER`, `persister`.

- [ ] **Step 2: Chạy test để xác nhận test FAIL**

Run: `bun run test app/services/queries/persister.test.ts`
Expected: FAIL với lỗi file hoặc module chưa tồn tại.

- [ ] **Step 3: Triển khai `persister.ts`**

```typescript
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister"
import type { Query } from "@tanstack/react-query"
import { storage } from "../../utils/storage"
import { CACHE, PERSIST } from "./constants"

export const mmkvStorageAdapter = {
  setItem: (key: string, value: string) => {
    storage.set(key, value)
    return Promise.resolve()
  },
  getItem: (key: string) => {
    const value = storage.getString(key)
    return Promise.resolve(value ?? null)
  },
  removeItem: (key: string) => {
    storage.delete(key)
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
  const shouldPersist = meta?.persist !== false
  return isSuccess && shouldPersist
}

export const queryPersistOptions = {
  persister: queryPersister,
  maxAge: CACHE.PERSIST_MAX_AGE,
  buster: CACHE.BUSTER,
  dehydrateOptions: {
    shouldDehydrateQuery,
  },
}
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `bun run test app/services/queries/persister.test.ts`
Expected: PASS 100%.

- [ ] **Step 5: Commit**

```bash
git add app/services/queries/persister.ts app/services/queries/persister.test.ts
git commit -m "feat(queries): add mmkv async persister for offline query cache"
```

---

### Task 3: Triển khai hook `useRefreshOnFocus.ts` (React Navigation 7)

**Files:**
- Create: `app/services/queries/useRefreshOnFocus.ts`
- Test: `app/services/queries/useRefreshOnFocus.test.ts`

**Interfaces:**
- Consumes: `@react-navigation/native` (`useFocusEffect`), `react` (`useCallback`, `useRef`).
- Produces: `useRefreshOnFocus: <T>(refetch: () => Promise<T>) => void`.

- [ ] **Step 1: Viết failing test `useRefreshOnFocus.test.ts`**

Kiểm thử:
1. Lần focus đầu tiên (mount): `refetch()` KHÔNG được gọi (tránh duplicate request do query đã tự fetch on mount).
2. Lần focus tiếp theo (khi screen quay lại foreground qua `useFocusEffect` callback): `refetch()` được gọi đúng 1 lần.

- [ ] **Step 2: Chạy test để xác nhận test FAIL**

Run: `bun run test app/services/queries/useRefreshOnFocus.test.ts`
Expected: FAIL với lỗi file hoặc module chưa tồn tại.

- [ ] **Step 3: Triển khai `useRefreshOnFocus.ts`**

```typescript
import { useCallback, useRef } from "react"
import { useFocusEffect } from "@react-navigation/native"

export function useRefreshOnFocus<T>(refetch: () => Promise<T>): void {
  const isFirstRun = useRef(true)

  useFocusEffect(
    useCallback(() => {
      if (isFirstRun.current) {
        isFirstRun.current = false
        return
      }
      void refetch()
    }, [refetch]),
  )
}
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `bun run test app/services/queries/useRefreshOnFocus.test.ts`
Expected: PASS 100%.

- [ ] **Step 5: Commit**

```bash
git add app/services/queries/useRefreshOnFocus.ts app/services/queries/useRefreshOnFocus.test.ts
git commit -m "feat(queries): add useRefreshOnFocus hook for react-navigation integration"
```

---

### Task 4: Củng cố cấu hình `queryClient.ts` & Unit Test

**Files:**
- Modify: `app/services/queries/queryClient.ts`
- Create: `app/services/queries/queryClient.test.ts`

**Interfaces:**
- Consumes: `@tanstack/react-query` (`QueryClient`), `app/services/api/apiError` (`isApiError`), `app/services/queries/constants` (`CACHE`, `RETRY`, `STALE`).
- Produces: `queryClient: QueryClient`, `shouldRetry: (failureCount: number, error: unknown) => boolean`.

- [ ] **Step 1: Viết test `queryClient.test.ts`**

Kiểm thử:
1. `shouldRetry` trả về `false` với lỗi 400/401/403/404/422 (`kind: "rejected"` hoặc `"unauthorized"`).
2. `shouldRetry` trả về `true` với lỗi mạng tạm thời (`timeout`, `cannot-connect`, `server`) khi `failureCount < RETRY.MAX`.
3. `shouldRetry` trả về `false` khi `failureCount >= RETRY.MAX`.
4. `queryClient` có các default options chính xác: `staleTime`, `gcTime`, `refetchOnReconnect: true`, `refetchOnWindowFocus: true`.

- [ ] **Step 2: Chạy test để xác nhận test FAIL**

Run: `bun run test app/services/queries/queryClient.test.ts`
Expected: FAIL hoặc thiếu các assertions kiểm tra options.

- [ ] **Step 3: Chuẩn hóa `queryClient.ts`**

```typescript
import { QueryClient } from "@tanstack/react-query"
import { isApiError } from "../api/apiError"
import { CACHE, RETRY, STALE } from "./constants"

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
```

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `bun run test app/services/queries/queryClient.test.ts`
Expected: PASS 100%.

- [ ] **Step 5: Commit**

```bash
git add app/services/queries/queryClient.ts app/services/queries/queryClient.test.ts
git commit -m "feat(queries): strengthen queryClient configuration with robust retry heuristics"
```

---

### Task 5: Dọn dẹp stub files & Tạo barrel export `index.ts`

**Files:**
- Delete: `app/services/queries/EnumKey.ts` (stub trống, quy chuẩn dùng feature-level Query Key Factory)
- Delete: `app/services/queries/types.ts` (file rỗng 0 byte)
- Delete: `app/services/queries/Auth/` (thư mục rỗng)
- Create: `app/services/queries/index.ts`

**Interfaces:**
- Produces: Export `queryClient`, `setupQueryListeners`, `useRefreshOnFocus`, `queryPersistOptions`, `queryPersister`, `STALE`, `CACHE`, `RETRY`.

- [ ] **Step 1: Xóa các file stub không đạt chuẩn**

- [ ] **Step 2: Tạo `app/services/queries/index.ts`**

```typescript
export * from "./constants"
export * from "./persister"
export * from "./queryClient"
export * from "./setupListeners"
export * from "./useRefreshOnFocus"
```

- [ ] **Step 3: Kiểm tra compile & lint**

Run: `bun run compile && bun run lint:check`
Expected: PASS không có lỗi TypeScript hay ESLint.

- [ ] **Step 4: Commit**

```bash
git add app/services/queries/
git commit -m "refactor(queries): clean up empty stubs and add barrel export index"
```

---

### Task 6: Tích hợp `PersistQueryClientProvider` & `setupQueryListeners` tại `app/app.tsx`

**Files:**
- Modify: `app/app.tsx`

**Interfaces:**
- Consumes: `@tanstack/react-query-persist-client` (`PersistQueryClientProvider`), `app/services/queries` (`queryClient`, `queryPersistOptions`, `setupQueryListeners`).

- [ ] **Step 1: Đăng ký `setupQueryListeners` trong `useEffect` của `App`**

Gọi `setupQueryListeners()` khi component mount và return cleanup.

- [ ] **Step 2: Bọc `PersistQueryClientProvider` bên ngoài `AppNavigator`**

```tsx
<PersistQueryClientProvider client={queryClient} persistOptions={queryPersistOptions}>
  <ThemeProvider>
    <AppNavigator ... />
  </ThemeProvider>
</PersistQueryClientProvider>
```

- [ ] **Step 3: Chạy full validation suite**

Run: `bun run check`
Expected: `compile`, `lint:check`, `deps:check`, `test` tất cả đều PASS.

- [ ] **Step 4: Commit**

```bash
git add app/app.tsx
git commit -m "feat(app): mount PersistQueryClientProvider with MMKV cache and register native listeners"
```

---

## Tiêu chí hoàn thành (Verification Contract)
1. `bun run compile`: 0 lỗi type.
2. `bun run lint:check`: tất cả các file ≤ 150 dòng, 0 warning/error.
3. `bun run deps:check`: tuân thủ toàn bộ dependency rules.
4. `bun run test`: 100% test cases của `setupListeners.test.ts`, `persister.test.ts`, `useRefreshOnFocus.test.ts`, `queryClient.test.ts` cùng toàn bộ suite test của dự án đều pass.

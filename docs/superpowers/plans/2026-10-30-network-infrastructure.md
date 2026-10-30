# Network Infrastructure Base Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng hạ tầng quản lý trạng thái online/offline tập trung (Base Layer) sử dụng `@react-native-community/netinfo`, cung cấp `networkService`, hook React 19 `useNetworkStatus`, và kết nối đồng bộ với TanStack Query.

**Architecture:** Sử dụng singleton `networkService` quản lý một listener duy nhất từ NetInfo với cơ chế debounce 400ms chống nhiễu flapping. Quản lý trạng thái bằng mô hình external store chuẩn React 19 qua `useSyncExternalStore` mà không cần cài đặt thêm state library bên ngoài. Nối trực tiếp trạng thái chuẩn hóa tới TanStack Query `onlineManager`.

**Tech Stack:** React Native 0.86, Expo SDK 57, React 19.2 (`useSyncExternalStore`), `@react-native-community/netinfo`, `@tanstack/react-query`, TypeScript strict, Jest + React Native Testing Library.

**Spec:** [docs/superpowers/specs/2026-10-30-network-infrastructure-design.md](docs/superpowers/specs/2026-10-30-network-infrastructure-design.md)

## Global Constraints

- Không cài thêm thư viện quản lý state (dùng `useSyncExternalStore` native của React).
- Dưới 150 dòng/file (tuân thủ quy định ESLint `max-lines`).
- TypeScript strict, cấm sử dụng `any` (dùng `unknown` + type guard).
- Không dùng `console.log` trong code commit (dùng Reactotron nếu cần debug).
- Kiểm tra toàn bộ bằng `bun run check` (compile + lint + depcruise + test).

## Review Focus

1. **Vừa bật app chưa có kết nối native (`isInitialized === false`)**: Snapshot mặc định trả về an toàn `{ isOnline: true, isInternetReachable: null, connectionType: "unknown", isInitialized: false }` và kích hoạt ngay `NetInfo.fetch()` để lấy kết nối thực tế mà không chặn request hợp lệ.
2. **Wi-Fi có vạch sóng nhưng mất internet (`isConnected: true, isInternetReachable: false`)**: `isOnline` phải trả về `false`.
3. **Flapping chuyển mạng Wi-Fi sang 4G trong vòng <400ms**: Timer debounce phải triệt tiêu event trung gian, không phát thông báo offline chớp nhoáng.
4. **Hủy đăng ký (cleanup/unsubscribe)**: Khi component unmount hoặc `stop()` được gọi, timer debounce và native listener phải được dọn dẹp sạch sẽ, không rò rỉ bộ nhớ.
5. **TanStack Query đồng bộ đúng**: `onlineManager` chỉ nhận `true` khi `isOnline === true` theo logic chuẩn hóa của `networkService`.

---

### Task 1: Network Types & Contract Definitions

**Files:**
- Create: `app/services/network/networkTypes.ts`

**Interfaces:**
- Produces:
  - `type ConnectionType = NetInfoStateType | "unknown"`
  - `interface NetworkStatus`:
    - `readonly isOnline: boolean`
    - `readonly isInternetReachable: boolean | null`
    - `readonly connectionType: ConnectionType`
    - `readonly isInitialized: boolean`
  - `type NetworkListener = (status: NetworkStatus) => void`

- [ ] **Step 1: Định nghĩa interface và types trong `app/services/network/networkTypes.ts`**

Tạo file `app/services/network/networkTypes.ts` với đầy đủ `NetworkStatus`, `ConnectionType` (import từ `@react-native-community/netinfo`), và `NetworkListener`.

- [ ] **Step 2: Chạy kiểm tra TypeScript compile**

Run: `bun run compile`
Expected: PASS không có lỗi type.

- [ ] **Step 3: Commit**

```bash
git add app/services/network/networkTypes.ts
git commit -m "feat(network): define network status types and interfaces"
```

---

### Task 2: Core Network Service (`networkService`)

**Files:**
- Create: `app/services/network/networkService.ts`
- Test: `app/services/network/networkService.test.ts`

**Interfaces:**
- Consumes: `NetworkStatus`, `ConnectionType`, `NetworkListener` từ `./networkTypes`
- Produces:
  - `export const networkService`:
    - `start(): () => void`
    - `stop(): void`
    - `getStatus(): NetworkStatus`
    - `isOnline(): boolean`
    - `subscribe(listener: NetworkListener): () => void`

- [ ] **Step 1: Viết test suite cho `networkService` trong `app/services/network/networkService.test.ts`**

Mock `@react-native-community/netinfo`. Viết các test case:
1. Trạng thái khởi tạo mặc định trước khi native event gửi tới.
2. Cập nhật trạng thái sau khi gọi `start()` và `NetInfo.fetch()` giải quyết.
3. `isOnline` tính đúng: `true` khi `isConnected: true, isInternetReachable: true` hoặc `null`; `false` khi `isInternetReachable: false` hoặc `isConnected: false`.
4. Debounce 400ms: Khi có nhiều event dồn dập, listener chỉ được gọi 1 lần với giá trị cuối sau 400ms.
5. Hủy đăng ký listener và dọn dẹp subscription khi gọi hàm unsubscribe hoặc `stop()`.

- [ ] **Step 2: Chạy test để xác nhận test FAIL**

Run: `bun run test app/services/network/networkService.test.ts`
Expected: FAIL (Module `networkService` chưa tồn tại).

- [ ] **Step 3: Hiện thực `app/services/network/networkService.ts`**

Hiện thực singleton `networkService`:
- Lưu snapshot nội bộ `currentStatus`.
- Hàm `start()`: Gọi `NetInfo.fetch()` cập nhật ban đầu và gắn `NetInfo.addEventListener`.
- Hàm xử lý event với `setTimeout` debounce 400ms.
- Hàm `subscribe()`: Thêm callback vào `Set<NetworkListener>`, trả về hàm unsubscribe.
- Hàm `stop()`: Clear debounce timer, gỡ NetInfo listener, clear subscriber set.

- [ ] **Step 4: Chạy lại test để xác nhận PASS**

Run: `bun run test app/services/network/networkService.test.ts`
Expected: PASS toàn bộ các test cases.

- [ ] **Step 5: Commit**

```bash
git add app/services/network/networkService.ts app/services/network/networkService.test.ts
git commit -m "feat(network): implement networkService singleton with debouncing"
```

---

### Task 3: React 19 Hook `useNetworkStatus` & Public Barrel Export

**Files:**
- Create: `app/services/network/useNetworkStatus.ts`
- Create: `app/services/network/index.ts`
- Test: `app/services/network/useNetworkStatus.test.ts`

**Interfaces:**
- Consumes: `networkService` từ `./networkService`, `NetworkStatus` từ `./networkTypes`
- Produces:
  - `export function useNetworkStatus(): NetworkStatus`
  - Re-exports từ `app/services/network/index.ts`

- [ ] **Step 1: Viết test cho `useNetworkStatus` trong `app/services/network/useNetworkStatus.test.ts`**

Dùng `renderHook` từ `@testing-library/react-native`:
1. Trả về đúng `getStatus()` snapshot ban đầu.
2. Tự động rerender và cập nhật state mới khi `networkService` phát sự kiện thay đổi.

- [ ] **Step 2: Chạy test để xác nhận FAIL**

Run: `bun run test app/services/network/useNetworkStatus.test.ts`
Expected: FAIL (`useNetworkStatus` chưa được định nghĩa).

- [ ] **Step 3: Hiện thực `useNetworkStatus.ts` và barrel export `index.ts`**

Trong `useNetworkStatus.ts`:
- Sử dụng `useSyncExternalStore` từ `react` với `networkService.subscribe` và `networkService.getStatus`.
Trong `index.ts`:
- Export `networkService`, `useNetworkStatus`, và các types.

- [ ] **Step 4: Chạy test để xác nhận PASS**

Run: `bun run test app/services/network/useNetworkStatus.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add app/services/network/useNetworkStatus.ts app/services/network/useNetworkStatus.test.ts app/services/network/index.ts
git commit -m "feat(network): add useNetworkStatus hook with useSyncExternalStore"
```

---

### Task 4: TanStack Query Integration & End-to-End Verification

**Files:**
- Modify: `app/services/queries/setupListeners.ts:11-15`
- Test: `bun run check`

**Interfaces:**
- Consumes: `networkService` từ `app/services/network`
- Produces:
  - Cập nhật `setupQueryListeners` để kết nối `onlineManager.setEventListener` vào `networkService.subscribe`.

- [ ] **Step 1: Cập nhật `setupListeners.ts` sử dụng `networkService`**

Thay thế đoạn code gọi trực tiếp `NetInfo.addEventListener` bằng:
```typescript
onlineManager.setEventListener((setOnline) => {
  return networkService.subscribe((status) => {
    setOnline(status.isOnline)
  })
})
```
Đồng thời đảm bảo `networkService.start()` được khởi động cùng vòng đời của `setupQueryListeners()`, và cleanup khi unmount.

- [ ] **Step 2: Chạy toàn bộ test suites**

Run: `bun run test`
Expected: Tất cả unit tests đều PASS.

- [ ] **Step 3: Chạy toàn bộ quy trình kiểm tra chất lượng của dự án**

Run: `bun run check` (Bao gồm: `compile` + `lint:check` + `deps:check` + `test`)
Expected: Toàn bộ pass không có warning hoặc error.

- [ ] **Step 4: Commit**

```bash
git add app/services/queries/setupListeners.ts
git commit -m "refactor(queries): bridge onlineManager with networkService"
```

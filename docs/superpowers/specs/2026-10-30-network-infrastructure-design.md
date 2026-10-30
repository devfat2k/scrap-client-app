# Network Infrastructure Service Design

- **Date**: 2026-10-30
- **Status**: Pending User Approval
- **Feature Scope**: Global Network Infrastructure (Base Layer)
- **Target Platform**: React Native 0.86, Expo SDK 57 (New Architecture), iOS & Android

---

## 1. Context & Business Intent

Khách hàng của Scrap Client App hoạt động trong bối cảnh thực tế (kho bãi, bãi phế liệu, ngoài trời), nơi đường truyền mạng biến động:
- Khách chưa bật Wi-Fi/4G.
- Mất kết nối khi đang thao tác.
- Kết nối Wi-Fi/4G có vạch sóng nhưng không có internet thực tế (hết dung lượng, chưa thanh toán, captive portal).
- Sóng chập chờn nhảy qua lại giữa 4G và Wi-Fi gây nhiễu trạng thái (flapping/jitter).

Mục tiêu giai đoạn này: **Xây dựng hạ tầng quản lý trạng thái mạng ở mức Base**, tập trung vào tính chính xác, gọn nhẹ, không over-engineering, phục vụ toàn diện cho tầng data (TanStack Query, API) và sẵn sàng tích hợp tầng UI (Global Toast/Banner) ở giai đoạn tiếp theo.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
1. **Dịch vụ mạng tập trung (`networkService`)**:
   - Quản lý vòng đời listener của `@react-native-community/netinfo` qua một nguồn chân lý duy nhất (Single Source of Truth).
   - Đánh giá chính xác trạng thái online thực tế kết hợp giữa `isConnected` và `isInternetReachable`.
   - Cơ chế Debounce nhẹ (~400ms) để chống rung nhiễu (flapping) khi chuyển mạng hoặc sóng yếu.
2. **Hook phản ứng nhanh (`useNetworkStatus`)**:
   - Sử dụng `useSyncExternalStore` chuẩn React 19 (không cần cài thêm thư viện quản lý state trung gian như Zustand cho tác vụ này).
   - Cung cấp: `isOnline`, `isInternetReachable`, `connectionType`, `isInitialized`.
3. **Đồng bộ với TanStack Query**:
   - Tái cấu trúc `app/services/queries/setupListeners.ts` để đồng bộ trực tiếp từ `networkService`, loại bỏ duplicate listener.
4. **Chuẩn mực code**:
   - Dưới 150 dòng/file.
   - Strict TypeScript, không dùng `any`.
   - Unit test đầy đủ với Jest cho service và hook.

### Non-Goals
- **UI Toast / Banner**: Tạm hoãn theo yêu cầu, sẽ phát triển cùng hệ thống Global Toast sau khi xong hạ tầng.
- **Custom Reachability Ping Server**: Dùng cơ chế mặc định của NetInfo trước; chỉ mở rộng ping URL về backend API khi server chính thức sẵn sàng.
- **Offline Mutation Queue / Sync Manager**: Chưa triển khai hàng đợi ghi ngoại tuyến (sẽ thiết kế theo từng feature nghiệp vụ cụ thể).

### Anti-Goals
- Không thêm dependency mới (Zustand hay state container khác) khi React `useSyncExternalStore` và NetInfo đã giải quyết triệt để.
- Không để xảy ra rò rỉ listener (memory leaks) khi app background hoặc unmount.
- Không chặn cứng hoặc làm gián đoạn luồng người dùng khi đang xem cache ngoại tuyến.

---

## 3. Architecture & Module Design

### 3.1. Cấu trúc thư mục

```text
app/
└── services/
    └── network/
        ├── networkTypes.ts         # Types: NetworkStatus, ConnectionType
        ├── networkService.ts       # Singleton: NetInfo listener, debounce, subscribers
        ├── useNetworkStatus.ts     # React 19 useSyncExternalStore hook
        └── index.ts                # Public exports
```

### 3.2. Chi tiết Module

#### `networkTypes.ts`
```typescript
import type { NetInfoStateType } from "@react-native-community/netinfo"

export type ConnectionType = NetInfoStateType | "unknown"

export interface NetworkStatus {
  readonly isOnline: boolean
  readonly isInternetReachable: boolean | null
  readonly connectionType: ConnectionType
  readonly isInitialized: boolean
}
```

#### `networkService.ts`
- **Trạng thái khởi tạo mặc định (Initial State)**:
  - `{ isOnline: true, isInternetReachable: null, connectionType: "unknown", isInitialized: false }`
  - Ngay khi `start()` được gọi, `NetInfo.fetch()` được kích hoạt ngay lập tức để lấy snapshot ban đầu từ native bridge trước khi listener sự kiện kế tiếp tới, chuyển `isInitialized = true`.
- **Quy tắc tính toán trạng thái Online**:
  - `isOnline = Boolean(state.isConnected && state.isInternetReachable !== false)`
  - (Khi `isInternetReachable === null` lúc mới khởi động, nếu `isConnected === true` thì tạm coi là online để tránh gián đoạn request hợp lệ).
- **Bộ lọc Debounce (400ms)**:
  - Khi trạng thái mạng thay đổi (đặc biệt khi chuyển đổi giữa Wi-Fi và Cellular), debounce 400ms trước khi cập nhật snapshot và thông báo cho các subscriber, giúp triệt tiêu hiện tượng flapping.
- **Quản lý vòng đời**:
  - `start(): () => void`: Tự động gọi 1 lần khi `setupQueryListeners` khởi chạy hoặc tại root `app.tsx`. Trả về hàm cleanup unsubscribe.
  - `getStatus(): NetworkStatus`: Lấy snapshot đồng bộ hiện tại.
  - `subscribe(listener: (status: NetworkStatus) => void): () => void`: Đăng ký lắng nghe thay đổi.

#### `useNetworkStatus.ts`
- Cung cấp hook React dùng `useSyncExternalStore` (React 19 native, không cần Zustand):
  ```typescript
  export function useNetworkStatus(): NetworkStatus {
    return useSyncExternalStore(
      networkService.subscribe,
      networkService.getStatus,
      networkService.getStatus
    )
  }
  ```

#### Tích hợp TanStack Query (`setupListeners.ts`)
- Thay vì gọi trực tiếp `NetInfo.addEventListener`, `onlineManager.setEventListener` sẽ nối qua `networkService.subscribe`. Đảm bảo TanStack Query nhận trạng thái đã được chuẩn hóa và debounce.
- Không cần sửa đổi `Api.ts` ở giai đoạn này vì TanStack Query `onlineManager` đã tự động pause/resume query & mutation khi offline.

---

## 4. Testing Strategy

1. **`networkService.test.ts`**:
   - Test đánh giá `isOnline` khi `isConnected` và `isInternetReachable` thay đổi.
   - Test debounce hoạt động chính xác khi có nhiều event bắn tới liên tiếp.
   - Test hủy đăng ký listener khi dừng service.
2. **`useNetworkStatus.test.ts`**:
   - Test hook render đúng trạng thái khởi tạo và cập nhật khi service thông báo trạng thái mới.

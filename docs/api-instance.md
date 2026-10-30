# Hướng dẫn kiến trúc & sử dụng API Instance

Tài liệu hướng dẫn chi tiết về tầng kết nối mạng (API Instance) của dự án **Scrap Client App**, được thiết kế chuyên biệt để tương thích với Backend **Java Spring Boot** và **TanStack Query v5**.

---

## 1. Tổng quan kiến trúc

Tầng API nằm tại [app/services/api/](app/services/api/) với các nhiệm vụ cốt lõi:
- **Singleton Client**: Cung cấp một phiên bản duy nhất `api` cho toàn bộ ứng dụng.
- **Tương thích Spring Boot**: Tự động nhận diện và mở gói `ApiEnvelope<T>` (`success`, `message`, `data`, `timestamp`).
- **Tự động làm mới phiên (Silent Refresh)**: Khi Access Token hết hạn (401), API tự động gọi cấp token mới và gửi lại request ngầm dưới nền, không làm gián đoạn người dùng.
- **Bảo toàn dữ liệu lỗi**: Không làm mất thông tin validation (400/422) từ backend để form có thể hiển thị chính xác.
- **Tích hợp TanStack Query**: Ném lỗi tự nhiên (`throw ApiError`) thay vì chỉ trả response thông thường, hỗ trợ `AbortSignal` để hủy request khi unmount.

---

## 2. Cấu trúc thư mục

```text
app/services/api/
├── Api.ts            # Class lõi bọc Apisauce, chứa pipeline run() và deduplicate refresh token
├── apiError.ts       # Class lỗi ApiError và helper trích xuất message từ server
├── apiProblem.ts     # Ánh xạ mã lỗi HTTP/mạng sang domain problem
├── appHeaders.ts     # Gắn các client headers mặc định (X-App-Version, X-Platform)
├── constants.ts      # Timeout (30s), mã HTTP status
├── index.ts          # Khởi tạo singleton instance `api`
├── types.ts          # Định nghĩa ApiEnvelope, PageResponse, AuthBridge, RequestOptions
├── unwrap.ts         # Logic bóc tách dữ liệu và ném lỗi
├── Api.test.ts       # Unit tests kiểm thử Api class & refresh token
└── unwrap.test.ts    # Unit tests kiểm thử unwrap & error handling
```

---

## 3. Các cấu trúc dữ liệu chuẩn (`types.ts`)

### Phản hồi chuẩn Spring Boot (`ApiEnvelope<T>`)
Tương thích với class `ApiResponse<T>` bên phía Spring Boot:
```typescript
export interface ApiEnvelope<T> {
  readonly success: boolean
  readonly message?: string
  readonly data: T
  readonly timestamp?: string
}
```

### Phân trang chuẩn Spring Data (`PageResponse<T>`)
Tương thích với `Page<T>` trong Spring Boot:
```typescript
export interface PageResponse<T> {
  readonly content: T[]
  readonly page: number          // 0-indexed theo chuẩn Spring Boot
  readonly size: number
  readonly totalElements: number
  readonly totalPages: number
  readonly last: boolean
}
```

---

## 4. Cơ chế hoạt động của `unwrap` & `ApiError`

### Cách `unwrap` hoạt động:
1. **Thành công có Envelope**: Nếu backend trả về `{ success: true, data: { id: 1 } }`, `unwrap` tự động bóc tách và trả về `{ id: 1 }`.
2. **Không có Envelope**: Trả về dữ liệu thô nếu endpoint không dùng envelope (hoặc từ dịch vụ bên thứ ba).
3. **HTTP 204 No Content**: Trả về `undefined` an toàn mà không ném lỗi `bad-data`.
4. **Thất bại**: Nếu `!response.ok` hoặc `success === false`, hàm sẽ ném `ApiError`.

### Cấu trúc `ApiError`:
```typescript
export class ApiError extends Error {
  readonly kind: ApiErrorKind       // "rejected" | "unauthorized" | "timeout" | "server" | "cancelled" | ...
  readonly status: number | null     // 400, 401, 403, 500...
  readonly serverMessage: string | null // Message từ backend (VD: "Số điện thoại đã tồn tại")
  readonly serverData: unknown       // Toàn bộ body lỗi (chứa mảng errors validation nếu có)
}
```

### Hàm tiện ích: `getApiErrorMessage`
Dùng trên UI/Form để hiển thị thông báo lỗi thân thiện:
```typescript
import { getApiErrorMessage } from "@/services/api/apiError"

try {
  await api.post("/orders", payload)
} catch (error) {
  // Ưu tiên serverMessage từ backend, nếu không có sẽ lấy thông điệp fallback
  const message = getApiErrorMessage(error, "Không thể tạo đơn hàng, vui lòng thử lại sau.")
  showToast(message)
}
```

---

## 5. Cơ chế Tự động làm mới Token (AuthBridge & `run()`)

### Luồng xử lý khi gặp lỗi 401 (Auto-Refresh & Replay):
```text
Client gọi api.get() ──► Gửi request (Lần 1)
                              │
                    ┌─────────┴─────────┐
             Thành công / Lỗi != 401   Bị lỗi 401 Unauthorized
                    │                   │
               unwrap(data)     Đang có Session?
                                        │
                                  ┌─────┴─────┐
                                 Có          Không
                                  │            │
                     Gọi refreshOnce()    Ném ApiError(401)
                                  │
                          ┌───────┴───────┐
                     Thành công         Hết hạn hẳn (expired)
                          │                       │
               Gửi lại request (Lần 2)    Gọi onSessionExpired()
                          │                  (về màn Login)
                     unwrap(data)
```

### Tính năng chống nghẽn mạng (Promise Deduplication):
Nếu người dùng mở app và có nhiều request kích hoạt đồng thời (`/profile`, `/orders`, `/notifications`) và cùng bị 401:
- `Api` sẽ lưu Promise refresh đang chạy vào `this.refreshing`.
- Cả 3 request sẽ **dùng chung một lượt refresh token duy nhất**, không spam server.

---

## 6. Hướng dẫn sử dụng trong code thực tế

### Gọi API thông thường:
```typescript
import { api } from "@/services/api"
import type { PageResponse } from "@/services/api/types"
import type { Order } from "@/domain/order"

// 1. GET danh sách
export const getOrders = (page = 0, size = 10) => {
  return api.get<PageResponse<Order>>("/orders", { page, size })
}

// 2. GET chi tiết
export const getOrderDetail = (id: string, signal?: AbortSignal) => {
  return api.get<Order>(`/orders/${id}`, undefined, { signal })
}

// 3. POST tạo mới (trả về Order vừa tạo)
export const createOrder = (payload: CreateOrderInput) => {
  return api.post<Order>("/orders", payload)
}

// 4. PUT / PATCH cập nhật
export const updateOrder = (id: string, payload: Partial<Order>) => {
  return api.patch<Order>(`/orders/${id}`, payload)
}

// 5. DELETE
export const cancelOrder = (id: string) => {
  return api.delete<void>(`/orders/${id}`)
}
```

### Kết hợp với TanStack Query:
```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getOrderDetail, cancelOrder } from "./orderApi"

// Query Hook
export const useOrderDetail = (orderId: string) => {
  return useQuery({
    queryKey: ["orders", "detail", orderId],
    queryFn: ({ signal }) => getOrderDetail(orderId, signal),
    staleTime: 1000 * 60, // 1 phút
    enabled: Boolean(orderId),
  })
}

// Mutation Hook
export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderId: string) => cancelOrder(orderId),
    onSuccess: (_data, orderId) => {
      queryClient.invalidateQueries({ queryKey: ["orders", "detail", orderId] })
      queryClient.invalidateQueries({ queryKey: ["orders", "list"] })
    },
  })
}
```

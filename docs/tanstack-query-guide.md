# Hướng dẫn & Code mẫu: Tích hợp TanStack Query v5 & API Instance

Tài liệu mẫu chuẩn mực hướng dẫn cách xây dựng tính năng kết nối mạng và quản lý server-state trong dự án **Scrap Client App**.

---

## 1. Luồng dữ liệu tổng quan (Architecture Flow)

```text
[ Backend: Java Spring Boot ]
             │  (Trả về ApiResponse<T> hoặc PageResponse<T>)
             ▼
[ Singleton: api (app/services/api) ]
             │  (Tự động chèn Bearer Token, Silent Refresh khi 401, unwrap dữ liệu)
             ▼
[ Feature API Service (orderApi.ts) ]
             │  (Gắn AbortSignal, gọi api.get / api.post / api.patch)
             ▼
[ Custom Query/Mutation Hooks (useOrders.ts) ]
             │  (Dùng Query Key Factory, cấu hình STALE time, useRefreshOnFocus)
             ▼
[ Thin Screen UI (OrderDetailScreen.tsx) ]
                (Hiển thị 4 trạng thái: Loading, Error, Empty, Success)
```

---

## 2. Quy chuẩn 5 lớp cho một Feature

Mỗi feature kết nối API (ví dụ: `orders`, `profile`, `notifications`) được tổ chức theo 5 lớp tách bạch:

```text
app/features/orders/
├── types.ts                 # 1. Định nghĩa Data Model & DTOs
├── api/
│   ├── orderApi.ts          # 2. Tầng gọi HTTP (sử dụng `api`)
│   └── orderKeys.ts         # 3. Query Key Factory chuẩn hóa Cache Keys
├── hooks/
│   └── useOrders.ts         # 4. Custom Hooks (useQuery, useMutation)
└── screens/
    └── OrderDetailScreen.tsx # 5. Thin Screen Component
```

---

## 3. Code mẫu chi tiết từng lớp

### Bước 1: Định nghĩa kiểu dữ liệu (`types.ts`)
```typescript
// app/features/orders/types.ts

export type OrderStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"

export interface Order {
  readonly id: string
  readonly scrapCategory: string
  readonly estimatedWeightKg: number
  readonly status: OrderStatus
  readonly address: string
  readonly createdAt: string
}

export interface CreateOrderInput {
  readonly scrapCategory: string
  readonly estimatedWeightKg: number
  readonly address: string
}
```

---

### Bước 2: Tầng API Service (`api/orderApi.ts`)
- **Không bao giờ gọi Axios/Fetch trực tiếp**, luôn dùng singleton `api`.
- Nhận `signal?: AbortSignal` cho các hàm GET để hỗ trợ tự động hủy request khi chuyển màn hình.

```typescript
// app/features/orders/api/orderApi.ts
import { api } from "@/services/api"
import type { PageResponse } from "@/services/api/types"
import type { CreateOrderInput, Order } from "../types"

export const orderApi = {
  // GET danh sách phân trang (tự động unwrap Spring Boot PageResponse)
  getOrders: (page = 0, size = 10, signal?: AbortSignal) => {
    return api.get<PageResponse<Order>>("/orders", { page, size }, { signal })
  },

  // GET chi tiết 1 đơn hàng
  getOrderDetail: (id: string, signal?: AbortSignal) => {
    return api.get<Order>(`/orders/${id}`, undefined, { signal })
  },

  // POST tạo đơn mới
  createOrder: (input: CreateOrderInput) => {
    return api.post<Order>("/orders", input)
  },

  // PATCH cập nhật trạng thái hủy
  cancelOrder: (id: string) => {
    return api.patch<Order>(`/orders/${id}/cancel`)
  },
}
```

---

### Bước 3: Query Key Factory (`api/orderKeys.ts`)
Tuân thủ cấu trúc mảng phân cấp của TanStack Query:

```typescript
// app/features/orders/api/orderKeys.ts

export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (page: number, size: number) => [...orderKeys.lists(), { page, size }] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
}
```

---

### Bước 4: Custom Hooks (`hooks/useOrders.ts`)
- Bọc toàn bộ tương tác TanStack Query bên trong hooks, không để UI component gọi `useQuery` trực tiếp.
- Tích hợp `STALE` tokens từ `@/services/queries`.
- Gắn `useRefreshOnFocus` để tự động làm mới khi quay lại màn hình.

```typescript
// app/features/orders/hooks/useOrders.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { STALE, useRefreshOnFocus } from "@/services/queries"
import { orderApi } from "../api/orderApi"
import { orderKeys } from "../api/orderKeys"
import type { CreateOrderInput } from "../types"

// 1. Hook lấy chi tiết đơn hàng
export const useOrderDetail = (orderId: string) => {
  const query = useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: ({ signal }) => orderApi.getOrderDetail(orderId, signal),
    staleTime: STALE.DEFAULT, // 1 phút (sau 1 phút dữ liệu mới stale)
    enabled: Boolean(orderId), // Chỉ fetch khi có orderId
    meta: { persist: true },  // Cho phép lưu cache offline vào MMKV
  })

  // Tự động refetch khi người dùng quay lại màn hình này (nếu data đã stale)
  useRefreshOnFocus(query.refetch)

  return query
}

// 2. Hook lấy danh sách đơn hàng
export const useOrdersList = (page = 0, size = 10) => {
  return useQuery({
    queryKey: orderKeys.list(page, size),
    queryFn: ({ signal }) => orderApi.getOrders(page, size, signal),
    staleTime: STALE.SHORT, // 30 giây
  })
}

// 3. Hook tạo đơn mới
export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateOrderInput) => orderApi.createOrder(input),
    onSuccess: () => {
      // Làm mới danh sách đơn hàng sau khi tạo thành công
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
    },
  })
}

// 4. Hook hủy đơn hàng
export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderId: string) => orderApi.cancelOrder(orderId),
    onSuccess: (_updatedOrder, orderId) => {
      // Làm mới đồng thời chi tiết đơn và danh sách
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) })
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
    },
  })
}
```

---

### Bước 5: Thin Screen UI (`screens/OrderDetailScreen.tsx`)
Quy tắc: Screen chỉ đảm nhận layout, render và gọi hook. Phải xử lý đủ 4 trạng thái:
1. **Loading state**: Hiển thị indicator.
2. **Error state**: Hiển thị thông điệp lỗi (lấy qua `getApiErrorMessage`).
3. **Empty state**: Xử lý khi không có dữ liệu.
4. **Success state**: Render dữ liệu chính.

```tsx
// app/features/orders/screens/OrderDetailScreen.tsx
import React from "react"
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native"
import { getApiErrorMessage } from "@/services/api/apiError"
import { useCancelOrder, useOrderDetail } from "../hooks/useOrders"

interface OrderDetailScreenProps {
  orderId: string
}

export function OrderDetailScreen({ orderId }: OrderDetailScreenProps) {
  // Đọc Server State
  const { data: order, isLoading, isError, error, refetch } = useOrderDetail(orderId)

  // Mutation
  const { mutate: cancelOrder, isPending: isCancelling } = useCancelOrder()

  const handleCancel = () => {
    cancelOrder(orderId, {
      onError: (err) => {
        // Lấy chính xác thông điệp lỗi từ Backend trả về (RFC 7807 / Spring ProblemDetail)
        const message = getApiErrorMessage(err, "Không thể hủy đơn hàng.")
        Alert.alert("Lỗi", message)
      },
      onSuccess: () => {
        Alert.alert("Thành công", "Đã hủy đơn hàng thành công.")
      },
    })
  }

  // 1. Loading State
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // 2. Error State
  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {getApiErrorMessage(error, "Đã xảy ra lỗi khi tải dữ liệu.")}
        </Text>
        <Pressable onPress={() => refetch()} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Thử lại</Text>
        </Pressable>
      </View>
    )
  }

  // 3. Empty State
  if (!order) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy thông tin đơn hàng.</Text>
      </View>
    )
  }

  // 4. Success State
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đơn hàng #{order.id}</Text>
      <Text style={styles.detail}>Loại phế liệu: {order.scrapCategory}</Text>
      <Text style={styles.detail}>Khối lượng ước tính: {order.estimatedWeightKg} kg</Text>
      <Text style={styles.detail}>Trạng thái: {order.status}</Text>
      <Text style={styles.detail}>Địa chỉ thu gom: {order.address}</Text>

      {order.status === "PENDING" && (
        <Pressable
          onPress={handleCancel}
          disabled={isCancelling}
          style={[styles.cancelButton, isCancelling && styles.disabled]}
        >
          <Text style={styles.buttonText}>
            {isCancelling ? "Đang xử lý hủy..." : "Hủy đơn hàng"}
          </Text>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  detail: { fontSize: 16, marginBottom: 6 },
  errorText: { color: "#D32F2F", marginBottom: 12, textAlign: "center" },
  retryButton: { backgroundColor: "#007AFF", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 6 },
  retryButtonText: { color: "#FFFFFF", fontWeight: "600" },
  cancelButton: { marginTop: 24, backgroundColor: "#E53935", padding: 12, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#FFFFFF", fontWeight: "bold" },
  disabled: { opacity: 0.6 },
})
```

---

## 4. Các quy tắc quan trọng (Best Practices & Anti-patterns)

| CẦN LÀM (DO) | CẤM LÀM (DON'T) |
| :--- | :--- |
| Truyền `{ signal }` từ queryFn xuống `api.get(url, params, { signal })` để tự động hủy request khi unmount. | Bỏ qua `signal`, khiến request tiếp tục chạy ngầm khi người dùng đã rời màn hình. |
| Dùng `getApiErrorMessage(error, fallback)` để hiển thị validation lỗi thân thiện từ server. | Tự parse `error.message` thô khiến người dùng nhìn thấy các lỗi khó hiểu. |
| Sử dụng `Query Key Factory` mảng phân cấp (`orderKeys.detail(id)`). | Hardcode string rời rạc như `['order', id]` dễ gây lệch key khi invalidate. |
| Derive state trực tiếp từ `data` của query trong lúc render. | **CẤM** copy `data` từ `useQuery` vào `useState` hoặc `Zustand` (Mirroring Server State). |
| Gắn `meta: { persist: false }` cho các query chứa thông tin nhạy cảm (token, mật khẩu, PII) để bảo vệ quyền riêng tư. | Để lưu cache offline bừa bãi dữ liệu bảo mật xuống bộ nhớ đĩa máy. |
| Dùng `STALE.DEFAULT`, `STALE.SHORT` từ `@/services/queries`. | Hardcode số milliseconds tùy tiện ở từng file hook. |

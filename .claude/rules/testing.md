---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - ".maestro/**"
---
# Testing Rules

- **Framework**: Jest (`jest-expo`) + React Native Testing Library. Luôn chạy bằng `bun run test`, TUYỆT ĐỐI KHÔNG dùng `bun test`.
- **Test Behavior**: Kiểm thử hành vi người dùng (nhìn thấy gì, tương tác ra sao), không test chi tiết triển khai bên trong. Tránh lạm dụng snapshot lớn.
- **Test bắt buộc**: Form validation, ánh xạ trạng thái sang UI, xử lý mất mạng, chuẩn hóa lỗi API, custom hooks có chứa business logic.
- **Co-location**: Đặt file test ngay cạnh file source (`Thing.test.tsx` bên cạnh `Thing.tsx`).
- **Mocking**: Mock network ở tầng service boundary (`app/services/api`), không mock sâu bên trong components.
- **Maestro E2E**: Kiểm thử luồng chính trên `.maestro/flows`: Khách vãng lai gửi yêu cầu → xem chi tiết đơn chờ xử lý.
- **Tính toàn vẹn**: Tuyệt đối không làm yếu assertion hoặc xóa test đang fail để qua ải `bun run check`. Tìm nguyên nhân gốc hoặc hỏi người dùng.

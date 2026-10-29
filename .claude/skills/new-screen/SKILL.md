---
name: new-screen
description: Tạo màn hình mới cho Scrap Client App (screen + navigation + i18n + states). Dùng khi được yêu cầu tạo mới một màn hình hoặc UI screen.
---
Tạo màn hình `$ARGUMENTS` theo các bước:
1. Đọc 1 screen hiện có trong `app/screens/` hoặc `app/features/` làm mẫu về cấu trúc.
2. Dùng generator của Ignite nếu phù hợp (kiểm tra bằng `bunx ignite-cli generate --help`).
3. Dùng `Screen` + `useAppTheme()` + `translate()`; không import component UI thô từ `react-native`.
4. Đăng ký `AppStackParamList` và `Stack.Screen` (theo rule navigation).
5. Thêm key i18n vào `en.ts` (tiếng Anh là ngôn ngữ chính duy nhất).
6. Có loading / error / empty / offline state; dữ liệu server qua TanStack Query.
7. Đảm bảo file <= 150 dòng, không magic number, có `accessibilityLabel`.
8. Chạy `bun run compile` và `bun run lint:check`, rồi báo cáo file đã tạo/sửa.

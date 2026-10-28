# Nhật ký quyết định kiến trúc & kỹ thuật (Decisions Log)

Ghi nhận các quyết định kỹ thuật quan trọng của dự án. File này được cập nhật mỗi khi có thỏa thuận hoặc quyết định mới.

- **2026-10-28: Quy trình phát triển (Superpowers Workflow)**
  - Với các tác vụ phức tạp (tạo feature mới, thay đổi kiến trúc lớn), áp dụng luồng: `brainstorming` → `writing-plans` → lưu tài liệu kế hoạch vào `docs/superpowers/` → chờ người dùng duyệt trước khi code.

- **2026-10-28: Ngôn ngữ ứng dụng (i18n)**
  - App phục vụ khách hàng thị trường Úc nên sử dụng Tiếng Anh (`en.ts`) làm ngôn ngữ chính và duy nhất.
  - Ngay từ khi bắt đầu code, không hardcode chuỗi text trực tiếp mà phải qua i18n (`tx` prop hoặc `translate()`).
  - Chỉ bổ sung ngôn ngữ khác khi có yêu cầu tường minh từ người dùng.

- **2026-10-28: Tiêu chuẩn Clean Code & UI**
  - Giới hạn tối đa 150 dòng cho mỗi file code để thuận tiện đọc và bảo trì.
  - Phân tách theo boundary kiến trúc, không chia nhỏ cơ học.
  - Tuyệt đối không dùng magic numbers; toàn bộ kích thước, màu sắc phải lấy từ theme tokens hoặc domain constants.
  - Xử lý đầy đủ 4 trạng thái trên UI: Loading, Error, Empty, Offline.
  - Không dùng badge chớp nháy/nhấp nháy; chỉ cho phép hiệu ứng xuất hiện nhẹ 1 lần (fade-in/scale-in) có kiểm soát cho trạng thái mới.
  - Mock data tối thiểu: chỉ 1 item mẫu hoặc ternary fallback, không tạo mảng dữ liệu giả bừa bãi.
  - Không dùng `any` trong TypeScript; không dùng `console.log` trong production code.
  - Comment code giải thích "tại sao", không comment mô tả "làm gì".

- **2026-10-28: Kiến trúc State & API**
  - API Client: Giữ nguyên `apisauce` đi kèm boilerplate Ignite 11.5, không chuyển sang Axios thuần.
  - Realtime: Sử dụng `@stomp/stompjs` kết nối trực tiếp qua WebSocket native của React Native, không dùng SockJS polyfill.
  - State Management: Không dùng MobX-State-Tree (MST). Sử dụng React Context hiện tại cho layout/theme, bổ sung Zustand khi cần chia sẻ UI state phức tạp. TanStack Query quản lý toàn bộ server state.

- **2026-10-28: Quản lý gói phụ thuộc**
  - Sử dụng `bun` duy nhất. Không dùng npm, npx, yarn hay pnpm. Chạy test bằng `bun run test` (Jest), không dùng `bun test`.

- **2026-10-28: Native & Expo Setup**
  - Expo SDK 57 (RN 0.86) với Prebuild / CNG. Thư mục `android/` và `ios/` được sinh tự động, không can thiệp thủ công.
  - Bỏ `react-native-edge-to-edge` (deprecated từ SDK 54+); dùng `StatusBar` từ `expo-status-bar`.
  - Sử dụng React Navigation 7, không dùng Expo Router.

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
  - Cấm tuyệt đối component Badge và mọi hiệu ứng animation, chớp nháy cho trạng thái đơn hàng. Trạng thái được thể hiện bằng Text thuần kết hợp Icon tiêu chuẩn.
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

- **2026-10-29: Đồng bộ Hạ tầng AI & Quy định Trạng thái Đơn hàng**
  - Chốt Phương án A: Cấm hoàn toàn component Badge trên UI. Hiển thị trạng thái bằng Text thuần + Icon tiêu chuẩn trong Header, không animation.
  - Giữ nguyên trạng thái `RESCHEDULING` (Đang sắp xếp lại lịch) trong enum domain và bổ sung luồng hiển thị trên UI.
  - Đưa quy định ≤ 150 dòng/file lên Tầng 1 qua ESLint `max-lines`.
  - Gán `paths` chặt chẽ cho toàn bộ rules trong `.claude/rules/` để tránh loãng ngữ cảnh.

- **2026-10-29: Chuyển đổi Font chủ đạo sang Inter**
  - Chuyển `typography.primary` từ `Space Grotesk` sang `Inter` (`@expo-google-fonts/inter`).
  - Lý do: Tối ưu khả năng đọc (legibility & readability) cho giao diện nhập liệu/giao dịch (form đặt đơn, bảng giá AUD, biên lai) bằng tiếng Anh. Đảm bảo trải nghiệm native và metric đồng nhất trên cả iOS và Android.


## 2026-11-17: Shared Codex / Claude workflow and phase lifecycle

- Người dùng duyệt triển khai setup theo spec `2026-11-17-codex-claude-workflow-design.md`.
- `docs/ai/` là nguồn quy tắc chung; `AGENTS.md`, `CLAUDE.md` và `.claude/rules/` định tuyến tới đó. Thay thế hướng dẫn tool-specific trùng/mâu thuẫn, không thay đổi quyền runtime.
- Phase active: `2026-11-mock-flow-mvp`; [current-phase.md](current-phase.md) là con trỏ. Mock, Auth không bắt buộc và chưa tích hợp API là giới hạn giai đoạn, không phải giới hạn sản phẩm vĩnh viễn.
- Đối chất → spec duyệt → plan duyệt → implementation. Lệnh triển khai rõ ràng cho setup đã mô tả là ủy quyền, không yêu cầu duyệt lại cùng phạm vi.
- Chạy kiểm tra có sẵn; chỉ tạo test mới khi người dùng yêu cầu. Thay thế quy định cũ bắt buộc tạo test mới cho mọi hook/validation.
- Commit theo Conventional Commits khi được yêu cầu; không tự commit. Lịch sử commit ngắn không phải quy chuẩn bắt buộc.
- Superpowers pin theo nguồn/hash trong `docs/ai/superpowers.lock.json`, cài theo repo cho Codex. Claude giữ plugin/config/hook hiện có; hai công cụ áp dụng ngoại lệ repository.
- Chuyển phase cần người dùng chốt, hồ sơ mới, cập nhật con trỏ và quyết định; giữ lịch sử phase cũ.

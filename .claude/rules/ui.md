---
paths:
  - "app/screens/**"
  - "app/components/**"
  - "app/features/**"
---
# UI & Component Rules

- **Theme**: Dùng `useAppTheme()` để lấy colors/spacing; hỗ trợ dark mode, tuyệt đối không hardcode màu hex/rgb hay magic numbers.
- **i18n**: Ngôn ngữ chính duy nhất là tiếng Anh (`en.ts`). Dùng `tx` prop hoặc `translate()`. Tuyệt đối không hardcode text trực tiếp.
- **Danh sách dài**: Dùng `FlatList` (kèm memoized item và stable keyExtractor), KHÔNG dùng `ScrollView` + `map()`.
- **UI States**: Mọi màn hình/component chính phải xử lý đủ các trạng thái: Loading (skeleton/spinner), Error, Empty, Offline.
- **A11y**: Bắt buộc có `accessibilityLabel` trên mọi phần tử tương tác (Button, Touchable, Switch) và hình ảnh.
- **File Length**: Giới hạn tối đa 150 dòng/file.
- **Badge Animation**: Cho phép animation nhẹ 1 lần (fade-in, scale-in) khi trạng thái mới xuất hiện. CẤM badge nhấp nháy/chớp nháy hoặc lặp liên tục.

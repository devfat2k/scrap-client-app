---
name: new-api-service
description: Thêm service API và hook TanStack Query cho domain mới. Dùng khi tạo endpoint, API service hoặc custom hook data fetching.
---
Thêm API cho `$ARGUMENTS`:
0. TIỀN ĐIỀU KIỆN: Phải có Spec & Plan đã được user duyệt trong `docs/superpowers/`. Nếu chưa có, DỪNG LẠI và yêu cầu brainstorm/lập plan trước.
1. Đọc `app/services/api/` và tài liệu `docs/tanstack-query-guide.md` để theo đúng pattern 5 tầng.
2. Tạo service riêng inject `api.apisauce`, map lỗi qua `apiProblem`. KHÔNG thêm method vào class `Api`.
3. Tạo hook TanStack Query (query key rõ ràng theo array factory, có invalidate sau mutation).
4. Không lưu dữ liệu server vào global UI state hay useState.
5. Chạy `bun run compile` + `bun run lint:check`.

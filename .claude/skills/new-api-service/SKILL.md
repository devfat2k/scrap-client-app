---
name: new-api-service
description: Thêm service API + hook TanStack Query cho một domain mới
disable-model-invocation: true
---
Thêm API cho `$ARGUMENTS`:
1. Đọc `app/services/api/` và một service có sẵn để theo đúng pattern.
2. Tạo service riêng inject `api.apisauce`, map lỗi qua `apiProblem`.
3. Tạo hook TanStack Query (query key rõ ràng theo array factory, có invalidate sau mutation).
4. Không lưu dữ liệu server vào global UI state.
5. Chạy `bun run compile` + `bun run lint:check`.

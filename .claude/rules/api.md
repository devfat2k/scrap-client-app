---
paths:
  - "app/services/**"
---
# API Service Rules

- **Singleton API**: Dùng instance `api` (apisauce) từ `@/services/api`; KHÔNG thêm method trực tiếp vào class `Api`.
- **Domain Service**: Mỗi domain tạo service riêng (`AuthApi`, `EventApi`), inject `api.apisauce`.
- **Config & Error**: Lấy Base URL từ `Config.API_URL`; map tất cả response error qua `apiProblem.ts`.
- **Server State Hook**: Mỗi API service đi kèm custom hook TanStack Query (`useQuery` / `useMutation`).

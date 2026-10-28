---
paths:
  - "app/**/*.ts"
  - "app/**/*.tsx"
---
# Architecture Rules

- **Feature folders**: `app/features/<name>/`. Một feature chứa `screens/`, `components/`, `api/`, `hooks/`, `schemas/`, `types.ts`.
- **Phân tách phụ thuộc**: Feature có thể import từ `app/components`, `app/services`, `app/domain`, `app/theme`, `app/i18n`, `app/utils`. Feature KHÔNG được import từ feature khác (`bun run deps:check` kiểm tra). Nếu dùng chung, chuyển lên shared folder.
- **Thin Screens**: Screen chỉ làm nhiệm vụ layout và wiring. Business logic đưa vào hooks, API calls vào `api/`, validation vào `schemas/` (Zod).
- **API Boundary**: Component không bao giờ gọi apisauce trực tiếp. Toàn bộ HTTP đi qua `app/services/api` và feature `api/`.
- **Shared Domain**: Enum và hằng số dùng chung (order status, scrap categories, AU states) nằm ở `app/domain` làm single source of truth.
- **Navigation**: React Navigation 7. Typed params trong `app/navigators/navigationTypes.ts`. Không dùng Expo Router.
- **Giới hạn dòng code**: Tối đa 150 dòng/file. Chia nhỏ theo boundary kiến trúc, không chia cắt cơ học.
- **Naming Conventions**: Components `PascalCase.tsx`, hooks `useThing.ts`, utils/services `camelCase.ts`. Một exported component mỗi file.
- **Clean Code**: Không circular imports. Không barrel files re-export toàn bộ feature. Không dùng `any` (dùng `unknown` + type guard). Không `console.log` trong code commit (dùng Reactotron). Tên biến và hàm phải tự mô tả, không viết tắt mơ hồ.
- **Generated Code**: Không chỉnh sửa file generated (`app/components/icons/generated/*`, `assets/images/generated/*`). Chạy `bun run gen`.

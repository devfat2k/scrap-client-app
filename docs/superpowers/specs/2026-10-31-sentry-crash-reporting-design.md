# Sentry Crash Reporting & Monitoring Service Design

- **Date**: 2026-10-31
- **Status**: Proposed / Pending User Review
- **Feature Scope**: Client App - Infrastructure / Crash Reporting & Monitoring
- **Target Platform**: React Native 0.86, Expo SDK 57 (New Architecture), iOS & Android

---

## 1. Context & Business Intent

Scrap Client App là ứng dụng di động cho khách hàng thu gom phế liệu tại thị trường Úc:
- Ứng dụng xử lý các luồng nghiệp vụ quan trọng: tạo yêu cầu thu gom, chụp ảnh phế liệu, lưu trữ offline-first và đồng bộ dữ liệu.
- Để đảm bảo tính ổn định cao và phát hiện kịp thời các lỗi runtime/crash khi người dùng sử dụng trên thiết bị thật, hệ thống cần tích hợp dịch vụ giám sát lỗi **Sentry** (`@sentry/react-native`).
- **Hiện trạng cấu hình**:
  - Gói `@sentry/react-native: ~7.11.0` đã được cài đặt và tương thích với Expo SDK 57 & React Native 0.86 (New Architecture).
  - Plugin `"@sentry/react-native"` đã được khai báo trong `app.json`.
  - Dự án Sentry đã tạo trên cloud với DSN:
    `https://9f1ba4a6b090be39ebbace00b39e44c1@o4512221424517120.ingest.us.sentry.io/4512349519740928`
- **Mục tiêu**:
  - Thiết lập hoàn chỉnh chuỗi cấu hình từ Metro bundler, khởi tạo SDK, định tuyến navigation tracking, bọc Error Boundary, lọc dữ liệu nhạy cảm (PII/tokens) theo quy chuẩn bảo mật dự án.

---

## 2. Goals, Non-Goals & Anti-Goals

### Goals
1. **Khởi tạo SDK an toàn & đúng thời điểm (`initCrashReporting`)**:
   - Khởi tạo Sentry ngay tại module entry (`index.tsx`) trước khi mount React root component.
   - Quản trị cấu hình DSN tập trung qua `app/config/`.
2. **Cấu hình Metro Bundler (`metro.config.js`)**:
   - Sử dụng `getSentryExpoConfig` để tự động hóa inject Debug ID và tạo source maps chính xác khi build native/EAS.
   - Giữ nguyên các tối ưu Metro hiện hữu (`unstable_conditionNames`, `inlineRequires`, `sourceExts`).
3. **Theo dõi Navigation & Breadcrumbs (`React Navigation 7`)**:
   - Tích hợp `reactNavigationIntegration` gắn vào `navigationRef` hiện hữu tại `AppNavigator.tsx`.
   - Tự động ghi nhận transaction chuyển trang và breadcrumbs đường dẫn màn hình.
4. **Bọc Root Component & Error Boundary**:
   - Bọc root `App` bằng `Sentry.wrap(App)`.
   - Kết nối `ErrorBoundary.tsx` với hàm `reportCrash(error, ErrorType.FATAL)` để thu thập stack trace của render crash.
5. **Cổng lọc PII & Bảo mật Dữ liệu (Security & Privacy Gate)**:
   - Tuân thủ nghiêm ngặt quy định `.claude/rules/security-privacy.md` (Đạo luật Privacy Act của Úc).
   - Tự động lọc sạch token (Authorization Header, Bearer tokens), số điện thoại Úc, thông tin tài khoản ngân hàng (BSB, Account Number) và password trước khi gửi event lên Sentry.
6. **Tuân thủ quy chuẩn mã nguồn**:
   - Tất cả các file ≤ 150 dòng (ESLint `max-lines`).
   - Không dùng `console.log` (thay bằng `Reactotron.tron.error` trong dev).
   - Xử lý kiểu an toàn với TypeScript strict, không dùng `any`.

### Non-Goals
- Native Session Replay dạng video/screenshot (tránh tăng dung lượng bundle và rủi ro quay chụp dữ liệu riêng tư của khách hàng).
- User Feedback popup dialog (tập trung vào crash reporting tự động, không làm gián đoạn trải nghiệm người dùng).
- Can thiệp thủ công vào thư mục `android/` và `ios/` (toàn bộ qua Expo CNG / Prebuild).

### Anti-Goals
- **Tuyệt đối không để lọt PII** (Họ tên, SĐT, BSB/Bank Account, Access Token) lên Sentry logs.
- Không để sự cố khởi tạo Sentry (ví dụ: mất mạng, cấu hình DSN sai) gây crash hoặc chặn khởi động ứng dụng.

---

## 3. Architecture & File Structure

```text
app/
├── config/
│   ├── config.base.ts             # Khai báo kiểu & DSN mặc định cho Sentry
│   └── index.ts                   # Export Config tổng hợp
├── navigators/
│   └── AppNavigator.tsx           # Đăng ký navigationRef với Sentry routing instrumentation
├── screens/
│   └── ErrorScreen/
│       └── ErrorBoundary.tsx      # Gọi reportCrash khi bắt được render error
├── services/
│   └── sentry/
│       ├── piiScrubber.ts         # Module bóc tách, lọc sạch PII & auth tokens
│       └── sentryIntegration.ts   # Routing instrumentation instance cho React Navigation
└── utils/
    └── crashReporting.ts          # Triển khai initCrashReporting & reportCrash chuẩn hóa
index.tsx                          # Gọi initCrashReporting() và bọc Sentry.wrap(App)
metro.config.js                    # Bọc Metro config bằng getSentryExpoConfig
```

---

## 4. Detailed Component Design

### 4.1. Config Management (`app/config/config.base.ts`)
```typescript
export interface ConfigBaseProps {
  persistNavigation: "always" | "dev" | "prod" | "never"
  catchErrors: "always" | "dev" | "prod" | "never"
  exitRoutes: string[]
  sentryDsn: string
  sentryEnabled: boolean
}
```
- DSN được lưu tại `config.base.ts`:
  `https://9f1ba4a6b090be39ebbace00b39e44c1@o4512221424517120.ingest.us.sentry.io/4512349519740928`
- `sentryEnabled`: `!__DEV__` (mặc định chỉ gửi lên Sentry trên production; có thể bật tạm khi kiểm thử).

### 4.2. PII Scrubber (`app/services/sentry/piiScrubber.ts`)
Tuân thủ `.claude/rules/security-privacy.md`:
- **Header Scrubber**: Xóa bỏ `Authorization`, `Cookie`, `X-Auth-Token` trong request data.
- **Pattern Matcher**:
  - Token Bearer: `Bearer\s+[A-Za-z0-9-_=.]+` → `Bearer [REDACTED]`
  - BSB Úc: `\b\d{3}[-\s]?\d{3}\b` → `[REDACTED_BSB]`
  - SĐT Úc: `\b(?:\+?61|0)[2-478](?:[ -]?\d){8}\b` → `[REDACTED_PHONE]`
  - Mật khẩu: Các trường có key `password`, `refreshToken`, `accessToken` bị che giá trị.
- Cung cấp 2 hook chính:
  - `scrubEvent(event: Sentry.Event): Sentry.Event` (cho `beforeSend`).
  - `scrubBreadcrumb(breadcrumb: Sentry.Breadcrumb): Sentry.Breadcrumb | null` (cho `beforeBreadcrumb`).

### 4.3. Navigation Tracing (`app/services/sentry/sentryIntegration.ts`)
```typescript
import * as Sentry from "@sentry/react-native"

export const routingInstrumentation = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: true,
})
```
- Được import vào `AppNavigator.tsx`:
```typescript
useEffect(() => {
  if (navigationRef.isReady()) {
    routingInstrumentation.registerNavigationContainer(navigationRef)
  }
}, [])
```

### 4.4. Crash Reporting Implementation (`app/utils/crashReporting.ts`)
- Thay thế hoàn toàn boilerplate cũ:
  - Khởi tạo `Sentry.init` với DSN, environment, release version, tracesSampleRate, integrations.
  - Cấu hình `beforeSend: scrubEvent` và `beforeBreadcrumb: scrubBreadcrumb`.
  - Cập nhật hàm `reportCrash(error: Error, type: ErrorType)`:
    - Trong dev: Ghi log qua `Reactotron.tron.error` (loại bỏ `console.log` / `console.error`).
    - Trong prod: Gửi qua `Sentry.captureException(error, { tags: { errorType: type } })`.

### 4.5. Metro Config (`metro.config.js`)
```javascript
const { getSentryExpoConfig } = require("@sentry/react-native/metro")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(__dirname)

config.transformer.getTransformOptions = async () => ({
  transform: {
    inlineRequires: true,
  },
})

config.resolver.unstable_conditionNames = ["require", "default", "browser"]
config.resolver.sourceExts.push("cjs")

module.exports = config
```

### 4.6. Root Wrap & Early Init (`index.tsx`)
```typescript
import "@expo/metro-runtime"
import * as Sentry from "@sentry/react-native"
import { registerRootComponent } from "expo"

import { App } from "@/app"
import { initCrashReporting } from "@/utils/crashReporting"

initCrashReporting()

registerRootComponent(Sentry.wrap(App))
```

---

## 5. Security & Privacy Considerations

1. **Australia Privacy Act Compliance**:
   - Thông tin cá nhân khách hàng thu mua (tên, số điện thoại, địa chỉ nhà, tọa độ GPS) không được đính kèm vào event context hoặc breadcrumbs.
2. **Token & Credentials Protection**:
   - JWT access token và refresh token tuyệt đối không bao giờ được log hoặc gửi trong breadcrumbs HTTP.
3. **Fail-safe SDK Initialization**:
   - `initCrashReporting` được bọc try-catch phòng ngừa trường hợp SDK gặp trục trặc native khiến app không thể khởi động.

---

## 6. Verification & Quality Assurance Plan

1. **Type Checking & Linting**:
   - `bun run compile`: Kiểm tra toàn bộ mã nguồn không phát sinh lỗi TypeScript.
   - `bun run lint:check`: Đảm bảo không có file nào vượt quá 150 dòng, không sót `console.log`.
   - `bun run deps:check`: Kiểm tra cây phụ thuộc sạch sẽ, không có vòng lặp (circular dependency).
2. **Unit Tests (`test/services/sentry/piiScrubber.test.ts`)**:
   - Test hàm `scrubEvent` với event chứa token, số điện thoại Úc, BSB ngân hàng để xác nhận dữ liệu đã được redacted 100%.
   - Test `reportCrash` gọi đúng `Sentry.captureException` với metadata tương ứng.
3. **CI Check**:
   - `bun run check`: Toàn bộ các bước compile, lint, deps:check và test Jest đều pass.

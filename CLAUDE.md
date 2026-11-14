# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# Scrap Client App

Mobile app (React Native) for CUSTOMERS of an Australian scrap-buying company: create a pickup request, track order status, get notifications, view receipts.
Out of scope: in-app payment, price negotiation, maps, chat, web, the Driver/Collaborator app (separate project, later).

## QUY TRÌNH BẮT BUỘC (HARD GATE - KHÔNG ĐƯỢC BỎ QUA)

MỌI task (thêm/sửa tính năng, màn hình, luồng nghiệp vụ, API, domain, hook, state) BẮT BUỘC tuân thủ 4 bước tuần tự. KHÔNG BAO GIỜ viết code ngay khi vừa nhận prompt:

1. **Brainstorming & Đối chất (Clarify & Challenge):**
   - Đọc kỹ `CLAUDE.md`, `.claude/rules/` và tài liệu liên quan (`docs/product/`).
   - Đặt câu hỏi làm rõ yêu cầu, phân tích trade-offs, edge cases, 4 trạng thái UI (loading/empty/error/offline).
   - Kiểm tra `docs/product/open-questions.md`: nếu task dính đến mục OPEN, **DỪNG LẠI và hỏi người dùng**, tuyệt đối KHÔNG đoán mò.
   - Đưa ra phương án và đối chất để thống nhất trước khi viết spec.

2. **Lập Spec (Specification):**
   - Tạo spec tại `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`.
   - Xác định rõ: Goals, Non-goals, Data flow, Security/Privacy, danh sách file dự kiến.

3. **Lập Plan (Implementation Plan):**
   - Dùng skill `superpowers:writing-plans` lập plan tại `docs/superpowers/plans/YYYY-MM-DD-<topic>.md`.
   - Chia nhỏ thành từng bước cụ thể, file nào sửa gì, cách verify ra sao (không tạo file .test).

4. **CHỜ USER DUYỆT (HARD STOP):**
   - **CẤM tuyệt đối gọi `Edit`, `Write` hoặc sinh file TRƯỚC KHI người dùng xác nhận duyệt plan** (ví dụ: "ok", "tiến hành", "approved").
   - Chỉ được viết code sau khi có sự đồng ý rõ ràng.

**NGOẠI LỆ DUY NHẤT BỎ QUA SPEC/PLAN:**
- Sửa lỗi chính tả (typo), sửa text i18n đơn lẻ, chỉnh 1 dòng style/spacing trên đúng 1 file được người dùng chỉ định đích danh. Mọi thay đổi > 1 file hoặc liên quan logic: BẮT BUỘC qua 4 bước trên.

## Stack
- Installed: Ignite 11.5 boilerplate, Expo SDK 57 (dev client, CNG/prebuild), React Native 0.86, React 19.2, TypeScript strict, New Architecture only, React Navigation 7 (NOT Expo Router), apisauce, MMKV, i18next, Reanimated 4, Jest + RNTL, Maestro, dependency-cruiser.
- Planned (add only when a task needs it; record in docs/product/decisions.md): TanStack Query, Zustand, React Hook Form + Zod, expo-secure-store, expo-image (+ picker, manipulator), react-native-svg, expo-notifications, netinfo, @stomp/stompjs (WebSocket native, NOT SockJS), Sentry.

## Package manager: bun ONLY
- Never use npm, npx, yarn or pnpm. Never create package-lock.json or yarn.lock.
- Install: `bun add <pkg>`. Expo-managed packages: `bunx expo install <pkg>`. Remove: `bun remove <pkg>`.
- Run tests with `bun run test`, NEVER `bun test` (that is Bun's own runner, not Jest).

## Commands
- `bun run start` / `ios` / `android`: dev client
- `bun run check`: compile + lint + depcruise + tests. MUST pass before you say a task is done
- `bun run compile` | `lint` | `lint:check` | `deps:check` | `test` | `test:ci`
- Single test: `bun run test -- --testPathPattern=<pattern>` or `bun run test -- path/to/file.test.ts`
- `bun run gen`: generate SVG components and optimized images from assets-src/
- `bun run doctor`: expo-doctor. `bun run align-deps`: expo install --fix
- `bun run prebuild:clean`, `bun run clean`: regenerate native projects

## Hard rules
- `android/` and `ios/` are generated. Never edit them. Change app.json or config plugins, then `bun run prebuild:clean`.
- Never read or print `.env*`. Never commit secrets.
- Path aliases: `@/*` → `app/*`, `@assets/*` → `assets/*`.
- Before adding a dependency, use the `researcher` agent: Expo SDK 57 compatible, New Architecture, maintained.
- Some product decisions are still OPEN (docs/product/open-questions.md). If a task depends on an OPEN item, STOP and ask the user. Do not guess.

## Coding rules
- ≤ 150 lines per file (enforced by ESLint `max-lines`). Split by boundary (UI / logic / data), not mechanically.
- No `any` — use `unknown` + type guard. No `console.log` — use Reactotron.
- Comment only "why", never "what".
- Every screen/component must handle: loading, empty, error, offline states.
- Mock data: 1 sample item or ternary fallback — no large fake arrays.
- Status UI: CẤM tuyệt đối component Badge và hiệu ứng chớp nháy. Dùng Text thuần + Icon tiêu chuẩn.
- Detailed conventions auto-load from `.claude/rules/` (api, architecture, domain, i18n, navigation, security-privacy, state, testing, ui).

## Architecture

### App entry & provider tree
`app/app.tsx` → SafeAreaProvider → QueryClientProvider → KeyboardProvider → ThemeProvider → AppNavigator (NavigationContainer + ErrorBoundary + AppStack).
Init sequence: Reactotron (dev only) → fonts + i18n + query listeners → render.

### Navigation (React Navigation 7, native stack)
- Single `AppStack` in `app/navigators/AppNavigator.tsx`. No tab navigator yet.
- Route types: `AppStackParamList` in `app/navigators/navigationTypes.ts`. Screen props: `AppStackScreenProps<"Name">`.
- Add screen: (1) add to `AppStackParamList`, (2) add `Stack.Screen` at `IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS`, (3) deep link config in `app.tsx`.
- Use the `new-screen` skill for guided creation.

### API layer (apisauce + auto-refresh)
- Singleton `api` exported from `app/services/api/index.ts`, configured with `Config.API_URL`.
- `Api` class wraps apisauce with transparent 401-retry: injects Bearer token via `AuthBridge`, deduplicates concurrent refresh calls, calls `onSessionExpired` on final failure.
- `unwrap<T>()` extracts data from `ApiEnvelope<T>` (`{success, data, message}`), throws `ApiError` on failure. `ApiError` carries `kind`, `status`, `serverMessage`, `serverData`.
- Domain services (e.g. `app/services/api/Auth/AuthService.ts`) inject `api.apisauce`.
- Use the `new-api-service` skill for guided creation.

### Server state (TanStack Query)
- `queryClient` in `app/services/queries/queryClient.ts` with project-wide retry logic (only retries `timeout`, `cannot-connect`, `server`; max 3).
- Stale time tiers: `STALE.NONE` (realtime) / `SHORT` (30s) / `DEFAULT` (1m) / `LONG` (5m) / `FOREVER`. Pick from `app/services/queries/constants.ts`.
- Query keys: register scope in `QueryScope` (`app/services/queries/EnumKey.ts`).
- MMKV persister at `app/services/queries/persister.ts`.

### Theme & styling
- `useAppTheme()` from `app/theme/context.tsx` returns `{theme, navigationTheme, themeContext}`.
- Theme object: `{colors, spacing, typography, timing, isDark}`. Light/dark variants in separate files (`colors.ts`/`colorsDark.ts`, `spacing.ts`/`spacingDark.ts`).
- Never hardcode hex/rgb or magic numbers. Always use theme tokens.

### i18n
- English only (`app/i18n/en.ts`). Use `tx` prop on `<Text>` or `translate()` from `app/i18n/translate.ts`. Never hardcode UI text.

### Domain constants (single source of truth)
`app/domain/` contains: `orderStatus.ts` (order status enum + visual config), `scrapCategory.ts` (scrap types + volume options), `address.ts` (AU address schema, states, postcode validation). Always import from here; never duplicate or compare raw strings.

### Shared components
Ignite primitives in `app/components/`: `Screen`, `Text`, `TextField`, `Button`, `Header`, `Icon`, `Card`, `ListItem`, `EmptyState`, `AutoImage`, `Toggle/`, `Toast/`. ESLint `max-lines` is disabled for `app/components/` (Ignite boilerplate). ESLint forbids importing `Text`, `Button`, `TextInput`, `SafeAreaView` from `react-native` — use the custom wrappers.

### Feature module structure
`app/features/<name>/` contains: `screens/`, `components/`, `api/`, `hooks/`, `schemas/` (Zod), `types.ts`. Features import from shared layers (`app/components`, `app/services`, `app/domain`, `app/theme`, `app/i18n`, `app/utils`). Features MUST NOT import from other features — enforced by `bun run deps:check`.

### Config
`app/config/` merges `config.base.ts` + `config.dev.ts`/`config.prod.ts` via `__DEV__`. Access via `import Config from "@/config"`.

### Testing
- Jest + jest-expo. Setup in `test/setup.ts` (mocks RN Image, i18n, expo-localization).
- Run single test: `bun run test -- --testPathPattern=<pattern>` or `bun run test -- path/to/file.test.ts`.
- Test files co-located with source (e.g. `Text.test.tsx`) or in `test/`.
- E2E: Maestro flows in `.maestro/flows/`, run with `bun run test:maestro`.

### ESLint import order
Enforced: (1) react, react-native, expo → (2) external → (3) `@/` internal → (4) parent/sibling → (5) index. Alphabetical within groups, blank line between groups.

### Asset generation
SVG → component: `assets-src/svg/` → `bun run gen:icons` → `app/components/icons/generated/`. Images: `bun run gen:images`. Never edit generated files directly.

### Dependency cruiser
`bun run deps:check` enforces: no circular deps, no orphans, no feature-to-feature imports. Config in `.dependency-cruiser.js`.

### EAS Build
Local builds via `bun run build:<platform>:<profile>`. Profiles: `development`, `development:device`, `preview`, `production`.

## Quy chuẩn hoàn thành task
1. Tuân thủ Hard Gate: Brainstorm → Spec → Plan → Duyệt → Code.
2. Diffs nhỏ, tập trung. KHÔNG tạo file .test trong quá trình làm task (đã loại bỏ khỏi quy trình để tối ưu thời gian; chỉ viết test khi người dùng yêu cầu đích danh).
3. Chạy `bun run check` (compile + lint:check + deps:check + test). Phải pass 100% trước khi thông báo hoàn thành.
4. Conventional commits (feat:, fix:, chore:, refactor:, test:, docs:). Không bao giờ commit khi test hoặc lint lỗi.

## Read on demand (not auto-loaded)
docs/product/client-app-scope.md, order-status.md, open-questions.md, decisions.md

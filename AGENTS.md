# AGENTS.md

Customer-facing React Native app (Ignite 11.5) for an Australian scrap-pickup company: Expo SDK 57, RN 0.86, React 19.2, TypeScript strict, React Navigation 7, New Architecture. `README.md` is stock Ignite boilerplate; do not use it as project documentation.

## Required workflow

- Non-trivial work follows the gate in `CLAUDE.md`: clarify/brainstorm → spec in `docs/superpowers/specs/` → plan in `docs/superpowers/plans/` → wait for explicit user approval **before** any edit/write.
- Only skip the gate for a typo, a single i18n string, or a one-line style change in one file the user named.
- If a task depends on an `OPEN` row in `docs/product/open-questions.md`, stop and ask. Never guess business rules.
- Do not create `.test` files during normal feature work unless the user explicitly asks. Never weaken or delete a failing test to make checks pass.

## Commands

- `bun` only. Never use npm/npx/yarn/pnpm, never create `package-lock.json`/`yarn.lock`, and never use `bun test` (Bun's runner) — run Jest with `bun run test`.
- `bun run check` is the required gate: `compile` → `lint:check` → `deps:check` → `test`.
- Single test: `bun run test -- path/to/file.test.ts` or `bun run test -- --testPathPattern=<pattern>`.
- `bun run compile`, `bun run lint` (writes fixes), `bun run lint:check`, `bun run deps:check`, `bun run test`.
- Dev client: `bun run start`, `bun run ios`, `bun run android`.
- Native regeneration: `bun run prebuild:clean`; full reset: `bun run clean`.
- Assets: `bun run gen` (or `gen:icons` / `gen:images`) after changing source assets.
- Dependency health: `bun run doctor`, `bun run align-deps`; Expo-managed packages: `bunx expo install <pkg>`.

### Known baseline issue

`bun run check` currently fails at `compile` with `TS5101: Option 'baseUrl' is deprecated` under TypeScript 6.0 (`tsconfig.json:20`). `lint:check`, `deps:check`, and `test` pass. If you touch `tsconfig.json`, fix it deliberately (e.g. `"ignoreDeprecations": "6.0"` or remove `baseUrl`); otherwise do not report `check` as green.

`deps:check` also reports 7 `no-orphans` warnings for `app/domain/*`, `app/services/api/Auth/*`, and `app/services/queries/types.ts`; these are warnings, not failures.

## Runtime wiring

- `index.tsx` registers `Sentry.wrap(App)`.
- `app/app.tsx` waits for navigation-state restore, fonts, and i18n, then mounts `SafeAreaProvider` → `QueryClientProvider` → `KeyboardProvider` → `ThemeProvider` → `AppNavigator` (+ `Toast`).
- `setupQueryListeners()` wires MMKV query persistence, NetInfo → TanStack `onlineManager`, and AppState → `focusManager`.

## Navigation

- React Navigation 7 only; Expo Router is not used and must not be added.
- Root native stack: `Splash`, `MainTab`, `Auth`, `Welcome`. `MainTab` is a bottom-tab navigator whose tabs (`HomeTab`, `HistoryTab`, `AccountTab`) each own a native stack.
- All route types live in `app/navigators/navigationTypes.ts`. `AppStackScreenProps<"Name">` only covers the root stack; nested stacks define their own `*StackParamList`.
- To add a screen: add its param to the relevant stack's `*ParamList`, then add `Stack.Screen` in that stack file. Only top-level screens go in `AppNavigator.tsx`; its old `IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS` placeholder no longer exists (only the param-list anchor remains). Add a deep-link path in `app/app.tsx` `config.screens` for top-level routes.
- Android back handling on `MainTab` is custom (press twice to exit). Preserve it when changing navigation.

## Screens and modules

- Current modules live under `app/screens/<Domain>/{screens,stack,styles}` (e.g. `Home/screens/HomeScreen.tsx`, `Home/stack/HomeStack.tsx`). `Splash` and `WelcomeScreen` are flat.
- There is **no `app/features/` directory yet**, despite `CLAUDE.md` and `.claude/rules/architecture.md` describing one. Follow the existing `app/screens` structure unless the user explicitly asks to introduce feature folders.

## Data layer

- API singleton: `app/services/api/index.ts`. Domain services inject `api.apisauce`; do not add endpoint methods to the `Api` class.
- `unwrap<T>()` extracts `ApiEnvelope<T>` (`{success, data, message}`) and throws `ApiError` (`kind`, `status`, `serverMessage`, `serverData`).
- `Api` contains 401 refresh/dedup logic, but **`AuthBridge` is never registered** (`setAuthBridge` has no caller) and `app/services/api/Auth/AuthService.ts` is empty. Do not assume auth or refresh works yet.
- `Config.API_URL` is still the Ignite demo `https://api.rss2json.com/v1/` in both dev and prod. There is no real backend wired.
- TanStack Query owns server state. `queryClient` retries only `timeout` / `cannot-connect` / `server` `ApiError`s, max 3 times. Pick stale times from `STALE` in `app/services/queries/constants.ts`.
- `QueryScope` in `app/services/queries/EnumKey.ts` is currently empty; register new key scopes there.
- Zustand and `expo-secure-store` are not installed. Do not put server data in global UI state; do not store tokens in MMKV.

## UI, domain, and conventions

- Theme: use `useAppTheme()` and `themed()` with `ThemedStyle`. Never hardcode colors, spacing, or magic numbers. Add tokens to both light and dark files (`colors.ts`/`colorsDark.ts`, `spacing.ts`/`spacingDark.ts`).
- i18n: English only (`app/i18n/en.ts`). Use the `tx` prop or `translate()`; do not hardcode UI strings.
- Domain source of truth: `app/domain/orderStatus.ts`, `scrapCategory.ts`, `address.ts`. Never compare raw status/category strings; use `getStatusConfig()` which safely falls back for unknown server values.
- Use shared components from `app/components`. ESLint forbids importing `Text`, `Button`, `TextInput`, and `SafeAreaView` from `react-native` — use the wrappers (`SafeAreaView` comes from `react-native-safe-area-context`).
- Order status UI: **no Badge component and no animation/blinking**. Render plain `Text` + the standard icon.
- `max-lines` is 150 except in `app/components/**`. Import order is enforced: react/react-native/expo first, then external, then `@/` imports, then parent/sibling.
- Every main screen handles loading, empty, error, and offline states.
- Use `showToast()` from `app/utils/toastService.ts`; the toast container is already mounted in `app.tsx`.

## Generated files, native projects, config

- `assets/svg/*.tsx` and `assets/svg/index.ts` are generated from `assets/svg_raw/` by `bun run gen:icons`. Never edit `assets/svg/` directly.
- `bun run gen:images` rewrites `assets/icons/index.ts`, `assets/images/index.ts`, and the `iconRegistry` block inside `app/components/Icon.tsx`. Do not hand-edit those generated blocks.
- `android/` and `ios/` are generated and gitignored. Never edit them; change `app.json` / `app.config.ts` (config plugins) and run `bun run prebuild:clean`.
- Only `@/*` (→ `app/*`) and `@assets/*` (→ `assets/*`) are real path aliases. Other aliases left in `tsconfig.json` point at non-existent root folders.
- EAS local builds: `bun run build:<ios|android>:<sim|device|preview|prod>` using profiles in `eas.json`.
- There are no CI workflows; validation is the local `bun run check` gate.

## Security and privacy

- Never read or print `.env*` or commit secrets; never log PII, tokens, or raw API payloads. Sentry traffic is scrubbed in `app/services/sentry/piiScrubber.ts`.
- MMKV is for non-sensitive data only. Tokens require `expo-secure-store` (not installed yet).

## Further context

- Deeper project rules live in `.claude/rules/*.md`; they are Claude Code-oriented and partly stale (notably `app/features/` and the removed screen anchor). The skills `new-screen` and `new-api-service` match this repo's structure.
- Product context: `docs/product/client-app-scope.md`, `order-status.md`, `open-questions.md`, `decisions.md`.
- API/query guides: `docs/api-instance.md`, `docs/tanstack-query-guide.md`.

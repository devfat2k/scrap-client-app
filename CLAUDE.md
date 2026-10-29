# Scrap Client App

Mobile app (React Native) for CUSTOMERS of an Australian scrap-buying company: create a pickup request, track order status, get notifications, view receipts.
Out of scope: in-app payment, price negotiation, maps, chat, web, the Driver/Collaborator app (separate project, later).

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

## Workflow
1. For complex tasks: use brainstorming → writing-plans (Superpowers). Specs and plans saved in `docs/superpowers/`. Wait for user approval before coding.
2. Changes touching more than 3 files: write a short plan first and wait for approval.
3. Small, focused diffs. Add or update tests with the change.
4. Run `bun run check` and report the real result. Never claim success if anything fails.
5. Conventional commits (feat:, fix:, chore:, refactor:, test:, docs:).

## Read on demand (not auto-loaded)
docs/product/client-app-scope.md, order-status.md, open-questions.md, decisions.md

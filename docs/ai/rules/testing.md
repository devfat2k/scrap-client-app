# Testing and Verification Rules

- Run Jest via `bun run test`, never `bun test`. Existing stack is jest-expo and React Native Testing Library; tests are colocated or under `test/`. Maestro is configured via `bun run test:maestro` when its runtime/flows are available.
- Do not create new `.test`/`.spec` files unless the user explicitly asks. This supersedes older instructions demanding new tests for every validation/hook change. Running existing tests remains required for app changes.
- When new tests are authorized, verify observable behavior, use meaningful regression cases, colocate `<subject>.test.ts(x)`, and avoid large snapshots or assertions mirroring the implementation.
- `bun run check` runs compile, lint:check, dependency checks and Jest. `bun run test:ci` collects coverage; do not claim a numeric coverage target that is not configured.
- App code or tooling changes require the combined check plus relevant behavior checks. A green unit suite does not prove a mobile UI flow; report simulator/device/visual checks separately.
- Documentation/setup-only work needs links, consistency, discovery and integrity checks. If compiler/lint configuration changed, run the combined app check too.
- Never weaken assertions or remove failing tests. Report existing/unrelated failures honestly and keep fixes within scope. Do not claim runtime or visual verification from static inspection.

# History Top Tabs Implementation Plan

**Authorization:** User approved spec and explicitly requested implementation on 2026-11-17. Execute inline using executing-plans; no further approval gate for the described work.
**Spec:** [Approved design](../specs/2026-11-17-history-tabs-design.md).
**Phase:** `2026-11-mock-flow-mvp`.

## Constraints

Preserve English/i18n, theme/Inter, native navigation shell. No device/simulator, native flow or screenshots. No new test files, commits or unrelated changes. UI + shared read-only fixtures only; no create/cancel synchronization. Use current checkout, preserving existing user changes. Adapt TDD to existing checks and temporary logic assertions per repository policy.

## Tasks

- [x] Data: extend History order types with optional driver/settlement/cancellation; add four fixture scenarios to the existing two; implement stable grouping/sorting and schedule helpers. Fix unknown status display without inventing NEW semantics. Files: types/order.ts, mocks/historyOrders.ts, mocks/historyScenarios.ts, utils/historyTabs.ts, utils/collectionSchedule.ts, domain/orderStatus.ts, i18n/en/order.ts.
- [x] Tabs: fixed Screen, controlled TabView with stable routes, lazy persistent scenes, FlatList and contextual empty state; scalable tab labels and bottom navigation padding. Files: HistoryScreen.tsx, components/HistoryTabs.tsx, HistoryOrderList.tsx, styles/historyScreenStyles.ts, historyTabsStyles.ts.
- [x] Cards: neutral single surface; progress schedule, settlement breakdown and received AUD, cancellation reason; driver target is separate and demo call disabled. Files: OrderListRow.tsx, OrderCardContent.tsx, OrderSettlement.tsx, OrderDriver.tsx, styles/orderListRowStyles.ts, utils/driverCall.ts. Existing OrderListRow interface stays order/onPress.
- [x] Detail: use effective local status for schedule, preserve historical labels for ended orders; generic unknown status. Files: OrderDetailScreen.tsx, OrderCollectionCard.tsx.
- [x] Verify: compile/lint/dependency/Jest via bun run check; temporary assertions for grouping/schedule/data/call guards; independent read-only review; document native verification limitations.

## Execution ledger

- Started in existing checkout. Pre-existing user modifications: .gitignore, package.json, bun.lock. Spec approved; no simulator.
- Dependency ruling: Expo bundledNativeModules.json pins pager-view 8.0.2 whereas auto-installed peer was 10.0.3. Declared 8.0.2 directly using bun add; native integration not run. Tab-view 4.3.5 supports pager-view >=6.

- Implemented all scoped tasks. Added orderCardAccessibility.ts after independent review found the grouped card label omitted its business content. Focused reviewer re-check found no remaining important issue.
- Layout ruling: driver details/Call sit after the main card's View details cue as a sibling target, rather than inside the main Pressable. This small ordering difference avoids nesting the dial action inside the detail action.
- Verification: `bun run check` attempted, BLOCKED at existing tsconfig baseUrl deprecation TS5101 under TypeScript 6. tsconfig remains unchanged. A diagnostic compile with `bun run compile --ignoreDeprecations 6.0 --types node,jest` PASSED; the flags supply TS6 compatibility and existing test/script ambient types without weakening application type checking.
- `bun run lint:check`: PASS. `bun run deps:check`: 0 errors, 4 existing orphan warnings (queries/types and API Auth modules). `bun run test --runInBand --watchman=false`: 3 suites, 10 tests PASS.
- Temporary executable assertions PASS: grouping all six statuses, unknown/prototype keys, empty groups, stable sorting without input mutation, current cancellation/rescheduling schedule semantics, actual settlement versus quote, demo/invalid phone guards, mocked dialler success/failure, accessible descriptions including zero amount and missing fields. No new test files retained; no real calls made.
- `python3 scripts/check-agent-setup.py` and `git diff --check`: PASS. No device/simulator, native flow, screenshot, commit or push. Native UI/gesture/screen-reader behavior remains for user verification.
- Shared create/cancel synchronization remains outside this approved UI task. Detail does not expose a full settlement receipt.

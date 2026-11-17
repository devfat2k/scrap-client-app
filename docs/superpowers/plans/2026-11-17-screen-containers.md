# Screen Containers Implementation Plan

> Execute inline using executing-plans. User explicitly requested all screens and supplied the style convention.

**Goal:** All screens use View containers following HistoryScreen and style objects accessed through `styles.$name`.
**Phase:** 2026-11-mock-flow-mvp.
**Architecture:** Keep feature structure, theme values and business behavior. Replace Screen with explicit View and native scroll containers; keep keyboard-aware scrolling for the request form. Style modules export one typed styles object; local component styles follow the same convention.
**Tech stack:** Existing React Native, Expo, TypeScript and keyboard-controller packages.
**Specification:** User's supplied styles example and confirmed all-screen scope; no product design or flow changes.

## Constraints and review focus

Preserve existing uncommitted History work, navigation, safe area, themed backgrounds, status bars and tab scroll-to-top. No backend, dependency, test-file or commit additions. Check bottom safe area with padded content, request inputs with keyboard visible, long content, error state and light/dark themes.

## Tasks

- [ ] Convert style declarations and all consumers in app/screens to typed styles objects; split oversized modules by responsibility if required by lint.
- [ ] Replace every Screen usage in app/screens with View containers; explicitly retain scrolling, keyboard and safe area behavior.
- [ ] Run bun run check and static scope checks; request fresh read-only review; fix regressions and record native verification limits.

## Execution record

Baseline screen sources copied to /tmp/scrap-screen-refactor-baseline to distinguish existing user changes. Existing tests only, as required by repository guidance. Implement in current checkout without committing.

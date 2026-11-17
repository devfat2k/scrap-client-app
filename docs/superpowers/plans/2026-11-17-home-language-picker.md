# Home Language Picker Plan

- **Spec:** [Home Language Picker Design](../specs/2026-11-17-home-language-picker-design.md)
- **Phase:** `2026-11-mock-flow-mvp`
- **Status:** proposed; implementation requires approval of spec and plan.

## Tasks

1. Add `app/i18n/vi/home.ts`, `request.ts`, and `order.ts` with Vietnamese values matching English keys; add `app/i18n/vi.ts` with all root keys and compatible inferred typing.
2. Register Vietnamese resources in `app/i18n/index.ts`, retain `en-US` initialization and English fallback. Normalize the resolved locale to `en` or `vi` for selection. Add react-i18next subscriptions where text, navigation labels, and accessibility labels are currently calculated through imperative `translate()` so mounted UI refreshes without navigation or restart; inspect `app/components/Text.tsx`, Home controls, and navigator label definitions first.
3. Add language picker translations to both English and Vietnamese resources.
4. Add a Home language sheet component using existing bottom-sheet patterns, app text/theme primitives, accessible language options, and selected-state styling.
5. Wire an accessible Earth action into `HomeTopBar` and sheet visibility into `HomeScreen`.
6. Verify resource key parity and run `bun run check`; inspect the changed screens and exercise language selection if a simulator is available.

## Verification

- TypeScript and lint catch translation key and component integration issues.
- `bun run check` runs the repository's required compile, lint, dependency and Jest checks.
- Manual UI verification covers opening the sheet, switching both ways, active selection, and preservation of existing header actions.
- Verify English is selected on initial `en-US` startup and mounted text, navigation labels, and accessibility labels update without leaving the screen.

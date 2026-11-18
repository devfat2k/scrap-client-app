# UI Rules

- Use `useAppTheme()` tokens for colors, spacing, typography and timing; preserve light/dark behavior and existing component patterns. No arbitrary replacement palette or magic dimensions.
- Avoid adding `StatusBar` to individual screen `.tsx` files; rely on the existing shared configuration. Most screens do not need their own `StatusBar`. Add a screen-level override only when that screen explicitly requires different status bar behavior.
- English-only product UI at present; use `tx` or `translate()` and keys under `app/i18n/`. Explain work to the user in their language.
- Use custom UI wrappers. Lists that may grow use FlatList with stable keys; do not refactor a small static layout into a list without need.
- Before using or changing the shared `Text`, read `app/components/Text.tsx` and verify its current props and presets. Prefer `text`/`tx` for content and `preset`, `size`, `weight` and any other explicitly supported appearance props instead of duplicating their typography in styles. Reserve `style` for layout or special cases that the component's props do not cover; do not override a prop with a competing style. Currently `Text` has no `color` prop: theme-based colour overrides still use `style`. Never assume an unsupported prop exists or extend the component API without an agreed requirement. Keep this guidance aligned with the actual API.
- At the data-owning screen/flow, cover relevant loading, empty, error and offline states. Static decorative components do not need four fabricated states. Mock flows must still expose meaningful validation and failure behavior where specified.
- Interactive controls need accessible names, roles and states; informative images need descriptions, decorative images should be excluded from accessibility traversal. Avoid duplicate announcements.
- Order status uses plain Text plus a standard Icon. No status Badge, blinking or status animation; do not communicate status by color alone.
- Check keyboard avoidance, safe areas, text scaling and meaningful disabled/submitting states. Apply [design guidelines](../design-guidelines.md) before substantial UI changes.

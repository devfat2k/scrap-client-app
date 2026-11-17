# UI Rules

- Use `useAppTheme()` tokens for colors, spacing, typography and timing; preserve light/dark behavior and existing component patterns. No arbitrary replacement palette or magic dimensions.
- English-only product UI at present; use `tx` or `translate()` and keys under `app/i18n/`. Explain work to the user in their language.
- Use custom UI wrappers. Lists that may grow use FlatList with stable keys; do not refactor a small static layout into a list without need.
- At the data-owning screen/flow, cover relevant loading, empty, error and offline states. Static decorative components do not need four fabricated states. Mock flows must still expose meaningful validation and failure behavior where specified.
- Interactive controls need accessible names, roles and states; informative images need descriptions, decorative images should be excluded from accessibility traversal. Avoid duplicate announcements.
- Order status uses plain Text plus a standard Icon. No status Badge, blinking or status animation; do not communicate status by color alone.
- Check keyboard avoidance, safe areas, text scaling and meaningful disabled/submitting states. Apply [design guidelines](../design-guidelines.md) before substantial UI changes.

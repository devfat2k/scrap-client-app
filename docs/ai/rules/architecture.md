# Architecture and Coding Rules

- Current code uses `app/screens/<Feature>/{screens,components,stack,styles,...}` and shared layers in `app/`. Follow the neighboring module; do not introduce `app/features/` or migrate folders without an approved refactor.
- Keep screens thin: layout and wiring in screens, behavior in hooks/services, validation in focused modules. No direct HTTP calls from components.
- Share reusable domain types/constants through `app/domain`; avoid cycles and cross-feature internals. Enforce architecture in review as well as `bun run deps:check`; the existing config does not guarantee every desired boundary.
- Typed React Navigation, not Expo Router. Aliases: `@/*` → `app/*`, `@assets/*` → `assets/*`.
- Components use PascalCase; hooks `useThing`; utils/services camelCase. Keep files within ESLint's 150 counted lines, split by responsibility. Existing `app/components/` boilerplate has a configured exemption.
- Use TypeScript strict types, `unknown` plus guards instead of `any`; no `console.log` or secret/PII logs. Use development diagnostics consistent with the project.
- Formatting comes from `.prettierrc`: two spaces, double quotes, no semicolons, trailing commas. Use configured ESLint import order: React/RN/Expo, other external, aliases, relatives, index, with group separation.
- Use app wrappers for Text, Button and TextInput. For SafeAreaView follow the actual ESLint restriction and safe-area-context setup.
- `assets/svg_raw/` → `bun run gen:icons` → `assets/svg/`. Use `bun run gen:images` for raster indexes. Inspect scripts before changing asset generation; do not edit generated outputs by hand.
- Native `android/` and `ios/` are generated. Change Expo configuration/plugins and use approved prebuild commands. Never run destructive clean scripts without considering existing user work.

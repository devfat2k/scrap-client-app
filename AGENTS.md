# Repository Guidelines

Scrap Client App is an Expo/React Native application for customers of an Australian scrap-buying company. Driver and Collaborator applications are separate projects.

## Start Here

Before acting, read [shared workflow](docs/ai/workflow.md), [current phase](docs/product/current-phase.md), and [skill routing](docs/ai/skills.md). Load only the rules and source relevant to the task. Do not scan the whole application by default.

`docs/ai/` is the canonical shared guidance for Codex and Claude. `CLAUDE.md` and `.claude/rules/` route to the same guidance; they do not define competing policies. Read referenced Markdown explicitly; do not assume Claude frontmatter is automatically loaded in Codex.

## Project and Commands

- `app/screens/`: feature screens, components, hooks/forms and stacks; `app/navigators/`: typed navigation.
- `app/components/`, `app/domain/`, `app/services/`, `app/theme/`, `app/i18n/`, `app/utils/`: shared layers.
- `assets/svg_raw/` → generated `assets/svg/`; raster assets in `assets/images/` and `assets/icons/`.
- Tests are colocated or under `test/`; Maestro flows are configured under `.maestro/flows`.
- Bun only: `bun install`, `bun run start`, `bun run ios`, `bun run android`.
- `bun run check`: TypeScript, ESLint, dependency-cruiser and existing Jest tests. Use `bun run test`, never `bun test`.
- `python3 scripts/check-agent-setup.py`: verify shared guidance, phase routing and vendored skill integrity.

## Working Agreement

Clarify and challenge meaningful gaps before choosing behavior. Feature/flow/design changes require an approved spec and plan before implementation. A direct instruction to execute an already described plan/setup is authorization; do not ask again. Reading/reporting does not require implementation gates.

Keep temporary scope in the active phase, never as permanent rules here. Announce skills actually used; use the local paths in the skill registry if catalog discovery is missing. Do not silently replace a required missing skill with intuition.

Follow [architecture](docs/ai/rules/architecture.md), [testing](docs/ai/rules/testing.md) and [security](docs/ai/rules/security-privacy.md). Use Conventional Commit subjects if committing is requested; never commit, push or publish automatically. See [design guidance](docs/ai/design-guidelines.md) for UI work.

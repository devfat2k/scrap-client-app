# Codex / Claude Workflow Implementation Plan

> Execution: implement inline with `executing-plans`, adapted by the approved spec: no new app tests, automatic commits, branch changes, or destructive cleanup. Independent whole-change review at the end. User authorized implementation on 2026-11-17.

**Goal:** Share durable rules across Codex and Claude; keep phase scope replaceable; install reproducible repository-local skills.
**Architecture:** Thin entry points → shared workflow/rules → current phase → task-specific approved spec/plan. Codex discovers native SKILL.md folders; Claude retains its existing plugin integration.
**Tech Stack:** Markdown, native skill discovery, Python standard library for verification. No app dependencies.
**Spec:** [Approved design](../specs/2026-11-17-codex-claude-workflow-design.md).
**Phase:** `2026-11-mock-flow-mvp`; durable setup must remain valid after transition.

## Global Constraints

- MVP is the current phase, not permanent project policy.
- Shared rules are canonical; tools do not override each other by name.
- Preserve app code, Claude settings/hooks, global configuration and plugin caches.
- Do not create app test files or commit automatically. Review uncommitted and new files explicitly.
- Existing package/config/source files are evidence for technical facts, not authority to invent product decisions.

## Review Focus

- A new session finds phase and skill entry points without cache paths.
- Both tools resolve the same rules, including test and commit policy.
- New phases supersede old phase restrictions without rewriting durable policy.
- Unresolved business decisions do not get silently filled in by skills.
- Vendored examples/helpers must not enter app TypeScript/lint checks.

### Task 1: Shared rules and entry points

**Files:** modify `AGENTS.md`, `CLAUDE.md`, `.claude/rules/*.md`; create `docs/ai/workflow.md`, `docs/ai/rules/*.md`, `docs/ai/design-guidelines.md`.

- [x] Write canonical rules from existing guides; resolve semicolons against `.prettierrc`, navigation against nested stacks, and generated paths against scripts.
- [x] Resolve test policy: run existing checks, add tests only on explicit request; no weakening assertions.
- [x] Resolve commits: Conventional Commits for future work, no automatic commits; historical short subjects are not a requirement.
- [x] Make entry points thin and `.claude/rules` scoped pointers; update existing Claude skills only where they conflict with shared navigation/state/verification rules.
- [x] Check local links and compare both entry-point read paths.

### Task 2: Phase lifecycle and decision references

**Files:** create `docs/product/current-phase.md`, `docs/product/phases/2026-11-mock-flow-mvp.md`; update `docs/product/client-app-scope.md`, `docs/product/open-questions.md`, `docs/product/decisions.md`.

- [x] Record current mock flow scope, deferred Auth/API and acceptance criteria as phase requirements, not claimed implementation completeness.
- [x] Mark legacy scope priorities as roadmap context; annotate affected open questions without pretending long-term Auth decisions are resolved.
- [x] Record approved shared-document decisions and phase transition procedure.
- [x] Simulate next-phase lookup without modifying the active phase.

### Task 3: Native skills with provenance and adapters

**Files:** create `.agents/skills/*`, `docs/ai/skills.md`, `docs/ai/superpowers.lock.json` and `docs/ai/vendor/SUPERPOWERS-LICENSE`.

- [x] Fetch upstream tag `v7.0.0`, verify resolved commit and MIT license; never execute fetched installers.
- [x] Install seven core skills plus executing-plans and its transitive skill/resource dependencies; preserve complete skill directories and resource permissions.
- [x] Keep name-to-folder mapping, checksums for every resource and exact local adaptations. No global config changes.
- [x] Adapt Codex tool reference to actual available capabilities; retain shared-rule exceptions for TDD, approval, finishing, model routing and read-only tasks.
- [x] Document reinstall/update/removal and new-session discovery checks. Do not claim UI discovery was tested in a new client if only filesystem checks ran.

### Task 4: Reproducibility and verification

**Files:** modify `.gitignore`, `.eslintignore`, `.prettierignore`, `tsconfig.json`; create `scripts/check-agent-setup.py`.

- [x] Allow only the new AI docs, phase docs, current spec/plan and skills into Git; leave unrelated ignored historical docs ignored.
- [x] Exclude vendored skill examples from app compilation/lint/format; tsconfig exclusion is setup isolation, not an app behavior change.
- [x] Add a standard-library check for links, canonical routing, phase selection, skill metadata, file hashes and Git visibility; run it.
- [x] Run `bun run check` because app tooling exclusions changed; report existing failures rather than fixing app code outside scope.
- [x] Ask an independent reviewer to inspect setup and evaluate representative task/phase/conflict scenarios; resolve important findings.
- [x] Mark tasks complete with evidence and report limitations.

## Execution Record

- Authorization: user said “Triển khai” after spec handoff; this approves the described setup, including entry-point edits. No second permission gate is added for the same scope.
- Upstream: v7.0.0 tag object `7f043e5eaf3522dc19178c673b76328de9b0c355`; resolved commit `bb92a77741419a4ab5f06e711a283343f1ada0c3`.
- Adaptation: tooling exclusions are necessary because root TypeScript includes `**/*.ts` and vendored skills contain example TypeScript. Full app verification is required after those exclusions.


## Verification Evidence — 2026-11-17

- Shared guidance and phase routing written; 12 native skills installed with 47 hashed resources. Complete dependency directories retained; no global installer or Claude cache mutation.
- `python3 scripts/check-agent-setup.py`: PASS (12 skills, 47 hashes, 25 guidance files; local links, Git visibility, routing and exactly one active phase).
- Compared copied resources directly with pinned upstream checkout: only the manifest-recorded Codex adapter differs.
- `git diff --check`: PASS. No changes under `app/`, package.json, bun.lock, Claude settings or hooks.
- `bun run check`: FAIL at compile, TS5101 on pre-existing `compilerOptions.baseUrl` with TypeScript 6. Only the vendor exclusion changed in tsconfig; no unrelated migration attempted.
- `bun run lint:check`: PASS.
- `bun run deps:check`: PASS, 4 existing no-orphans warnings; no dependency errors.
- `bun run test --runInBand`: initial sandbox Watchman permission failure; authorized rerun outside sandbox PASS, 3 suites / 10 tests.
- Optional system skill-creator quick_validate could not run because Python PyYAML is not installed. No dependency added; repository standard-library checker validated every installed skill's name/description/frontmatter, resources and integrity instead. This is not a claim of full YAML schema validation.
- Fresh-context read-only reviewer inspected tracked and new setup files and ran the setup check. No important findings. Four tabletop scenarios passed: read/report, unplanned behavior change, explicitly approved execution, and future API phase superseding old deferrals.
- This is static/tabletop verification, not actual new-session Codex catalog discovery, Claude plugin execution or mobile visual verification. Refresh the client/session to observe catalog loading; exact local-file fallback remains documented.
- Ruling: preserve full resource directories for the five execution dependencies instead of installing only seven entry skills; otherwise upstream references/scripts would be incomplete. No execution permission is implied by installation.
- Ruling: use a repository-specific Codex tool reference instead of upstream global config/model recipes, so runtime tool policy remains authoritative.
- No automatic commit, push or branch change. Application checks are not fully green until the existing TypeScript deprecation is addressed in a separate approved task.

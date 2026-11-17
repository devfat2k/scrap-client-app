# Skills Registry and Repository Adaptations

Read [workflow](workflow.md) and [current phase](../product/current-phase.md) before applying an upstream skill. These adaptations are intentional, not a claim that upstream is followed without exceptions.

## Installation and resolution

Repository-native Codex skills live in `.agents/skills/<name>/SKILL.md`. Upstream references such as `superpowers:writing-plans` resolve to that local folder. Use native skill discovery when exposed; otherwise read the exact file explicitly. Load supporting resources only when relevant. Announce the actual skill used. A missing required skill must be reported before the dependent step; do not silently substitute intuition.

Open a new Codex turn/session to check catalog discovery after installation. Filesystem integrity checks cannot prove the client has refreshed its catalog. No global config, marketplace hooks, bootstrap scripts or Claude cache paths are required by this vendored integration.

## Routing

| Task | Skill path from repository root |
|---|---|
| Select relevant workflows | `.agents/skills/using-superpowers/SKILL.md` |
| New behavior/flow/design with consequential choices | `.agents/skills/brainstorming/SKILL.md` |
| Approved requirements to implementation tasks | `.agents/skills/writing-plans/SKILL.md` |
| Diagnose a bug | `.agents/skills/systematic-debugging/SKILL.md` |
| Execute approved plan inline | `.agents/skills/executing-plans/SKILL.md` |
| Verify completion claims | `.agents/skills/verification-before-completion/SKILL.md` |
| Independent review / act on findings | `.agents/skills/requesting-code-review/SKILL.md`, `.agents/skills/receiving-code-review/SKILL.md` |

Installed supporting skills: `subagent-driven-development` (only when implementation delegation is agreed), `test-driven-development` (new tests only when requested), `using-git-worktrees` (when isolation is needed), `finishing-a-development-branch` (authorized finishing actions only). Their complete resource directories are retained because execution/debugging workflows reference them. Installation alone is not permission to invoke every supporting workflow.

For Codex tools read `.agents/skills/using-superpowers/references/codex-tools.md`, the recorded local adapter. Use available tool schemas and runtime model policy, not guessed flags/model names. Claude keeps its existing Superpowers plugin and reads the same shared rules; do not assume it runs this vendored version.

## Required adaptations

1. **Scope:** read phase and approved task scope. No authentication, backend or new UI requirement may be invented by skill text. Read/report tasks do not require a build/spec/plan workflow.
2. **Approval:** explicit execution instructions count for their described scope. Do not ask for approval again, or take an upstream skip/spike suggestion as permission to bypass gates the user retained. Spec/plan authoring is allowed when requested.
3. **Tests:** upstream TDD/new regression-test steps apply only when new tests are explicitly requested. Otherwise run existing checks and meaningful manual/temporary behavior checks; record this adaptation, never claim an unperformed red/green cycle. No numeric coverage requirement is invented.
4. **Git/cleanup:** no automatic commits, branch changes, merges, pushes, destructive cleanup or worktrees. Review working-tree/new files instead of requiring SHA helpers; keep the execution record in the plan when commit-based ledgers do not apply. Never delete user files because a finishing skill suggests cleanup.
5. **Resources:** do not auto-run skill servers/installers or fetch dependencies. Browser/visual tools must be available and authorized. New runtime requirements outside scope must be raised first.
6. **Questions:** no repeated questions about settled decisions. Local OPEN items matter only if they affect this task; unresolved consequential choices go to the user. Do not follow an upstream instruction to settle every ambiguity yourself when it changes agreed behavior.
7. **Review:** follow the shared review authorization; use fresh read-only context when possible and report unavailable tools honestly. Do not silently delegate implementation. No automatic model overrides, global configuration edits or widening sandbox permissions.
8. **Design:** follow [React Native design guidance](design-guidelines.md). Hallmark is not automatically applied to the existing mobile UI; no custom design skill was added by this setup.

## Provenance and verification

- Upstream: [obra/superpowers](https://github.com/obra/superpowers), tag `v7.0.0`, resolved commit `bb92a77741419a4ab5f06e711a283343f1ada0c3`, verified 2026-11-17.
- License: [MIT notice](vendor/SUPERPOWERS-LICENSE).
- [Lock manifest](superpowers.lock.json): exact file hashes, installed names and local adaptations, including the upstream hash of the adapted Codex reference.
- Native SKILL.md folders are vendored directly; this is not the upstream marketplace plugin installation. No claim that plugin runtime hooks were installed.
- Run `python3 scripts/check-agent-setup.py` from the repository root. App checks exclude vendored examples via `tsconfig.json`, `.eslintignore` and `.prettierignore`.

## Reinstall, update and removal

To restore this setup, check out the approved setup files from the repository's own history; no external installer is needed. To reconstruct from upstream, fetch the pinned commit into a temporary directory, copy only the 12 manifest-listed skill directories with resources/permissions intact, retain the MIT notice, and restore the local adapter from repository history. Check all hashes against the lock. Never overwrite an existing local skill without reviewing its modifications.

An update is a separate reviewed change: compare upstream behavior/resources/license, review adapters, update the pin and hashes, run the setup check and behavioral review. Do not refresh hashes just to conceal drift.

To remove, approve a removal task, inspect user modifications, remove only manifest-owned resources and the installed skill routing, then adjust tool exclusions if unused. Keep shared rules/phase history unless explicitly retiring them. Do not delete `.agents/` wholesale, touch Claude's plugin cache/global config, or run upstream finishing cleanup.

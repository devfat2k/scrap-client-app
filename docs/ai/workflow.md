# Shared Agent Workflow

## Authority and phase

This document is the canonical workflow for Codex and Claude. Tool-specific entry points route here; neither tool wins by its name. Runtime/system permissions still apply.

The latest explicit user instruction takes precedence over stale repository text. Preserve decisions already made in the conversation. Read [current phase](../product/current-phase.md) for temporary scope; [product scope](../product/client-app-scope.md) is roadmap context. Task specs record the phase ID they were written against.

Business rules live in [domain](rules/domain.md); technical rules live in the scoped files below. A spec cannot silently waive them: state exceptions and get user agreement. If active documents disagree about behavior, security or approvals, identify the conflicting statements and ask only for the unresolved decision. Do not stop on an OPEN question unrelated to the task. If the user already answered it, use that answer and record it when documentation changes are authorized.

For technical facts inspect the relevant config/source; mark stale documentation rather than inventing a refactor. Changes in phase during work require an impact check, not automatic scope expansion.

## Task routing and approval

- **Read, explain, audit:** targeted exploration and evidence-based report; no mandatory spec/plan, no unsolicited edits.
- **Feature, logic, flow or substantial UI:** brainstorm → agreed direction → written spec → spec approval → written plan → plan approval → implementation → verification/review.
- **Bug:** systematic-debugging first; collect evidence before changing behavior, then apply the same approval gates where a logic change needs them.
- **Small exception:** a typo, one i18n string, or one style/spacing line in one explicitly named file may be fixed directly when requested. This does not cover logic changes.

The user may explicitly authorize a different sequence or execution of a described setup. Do not ask again for permission already given. Preparing specs/plans is allowed when requested; the pre-implementation gate does not prohibit writing the documents being reviewed. Installation, scaffolding and product code belong after the applicable approval.

Specs: `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`. Plans: `docs/superpowers/plans/YYYY-MM-DD-<topic>.md`. Include goals, non-goals, phase ID, behavior/data flow, privacy, affected files, acceptance criteria and meaningful edge cases. Plans map requirements to concrete files, responsibilities, dependencies and verification steps. Label proposals and assumptions; do not attribute them to the user.

Check Git visibility for new specs/plans before handing them over. Historical documents are selectively ignored; add a narrow `.gitignore` exception for an authorized new shared document rather than silently leaving it out or exposing the entire archive.

## Skills and reviewers

Read [skill routing](skills.md) before choosing skills. Announce the workflow actually used. Clarify consequential ambiguity through focused questions; do not repeatedly ask about settled scope. Offer alternatives with trade-offs when they help a decision.

A fresh read-only reviewer should check multi-step specs/plans and substantial completed changes when delegation tools are available. This workflow authorizes that review; implementer delegation is optional and must be agreed for the task. Give reviewers the spec, relevant artifacts and changed/new files, not the whole repository. Review uncommitted files as well as Git diffs; no automatic commits to satisfy a skill's SHA-based review template.

Fix important findings within approved scope, verify reviewer claims, and disclose remaining limits. If no reviewer tool is available, label a self-review honestly. Do not invent an agent run.

## Rules to load on demand

| Task concern | Read |
|---|---|
| Modules, imports, formatting | [Architecture](rules/architecture.md) |
| Request fields, statuses, prices | [Domain](rules/domain.md) |
| Screens, theme, text, accessibility | [UI](rules/ui.md), [design](design-guidelines.md) |
| Routes and screen props | [Navigation](rules/navigation.md) |
| Shared mock state, cache, persistence | [State](rules/state.md) |
| Network services | [API](rules/api.md) |
| Personal data, tokens, uploads | [Security/privacy](rules/security-privacy.md) |
| Validation and completion evidence | [Testing](rules/testing.md) |

## Completion and change control

Application code/tooling changes require `bun run check` plus task-relevant flow/visual verification. Documentation-only changes require valid links, consistent instructions and an appropriate setup check, not an unrelated native build. State which commands ran, their results, and what remains unverified. A blocked or failed check is not a pass; do not fix unrelated app failures without scope agreement.

Use Bun for JS dependencies and scripts. Research compatibility against the installed package versions before proposing dependencies; use the read-only researcher role where available. Do not install unapproved app dependencies.

Do not create new test files unless explicitly requested; run existing tests and document behavior checks. Never delete or weaken tests to get green checks. Do not commit, push, merge, deploy or publish without user authorization; if asked to commit, use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).

Keep changes focused; do not edit generated `android/` or `ios/`, secrets or unrelated user work. Do not auto-create worktrees or change branches just because a skill suggests it; inspect the checkout and use isolation when the task needs it. Runtime permissions cannot be weakened by this guide or skills.

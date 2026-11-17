# Scrap Client App — Claude Entry Point

Read the same canonical guidance as Codex:

1. [Shared workflow](docs/ai/workflow.md).
2. [Current phase](docs/product/current-phase.md).
3. [Skill routing and repository adaptations](docs/ai/skills.md).
4. Relevant rules under `docs/ai/rules/` and documents named by the task.

[AGENTS.md](AGENTS.md) supplies the repository map and commands. It is a peer entry point, not a competing policy. Do not treat phase-scoped deferrals as permanent product exclusions.

## Claude Integration

Scoped files in `.claude/rules/` point to shared rules; read those targets when their scope applies. Existing `.claude/settings.json`, hooks, agents and plugin integration stay in place. They govern Claude's runtime, not Codex's runtime.

Use the installed Claude Superpowers integration with the repository adaptations in `docs/ai/skills.md`. Repository-local native skills under `.agents/skills/` primarily serve Codex; do not install a second Claude plugin or assume the two integrations share a version.

Before creating a screen or API service, read the existing relevant `.claude/skills/` guide and canonical rules. Those guides do not authorize implementation before approval.

Do not scan all app code, read `.env*`, modify generated native projects, install dependencies, or commit merely because an upstream skill suggests it. Apply the shared workflow and actual runtime permissions.

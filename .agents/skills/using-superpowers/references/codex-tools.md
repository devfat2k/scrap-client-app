# Codex Tools — Repository Adaptation

Read `docs/ai/workflow.md` and `docs/ai/skills.md` from the repository root first. They define approval, phase and verification requirements.

## Skill resolution

Native skills are in `.agents/skills/<name>/SKILL.md`. Resolve resources relative to that directory. An upstream `superpowers:<name>` maps to the local `<name>` skill; do not assume a namespace invocation tool exists. If catalog discovery is unavailable, read the exact local file. Loading a skill does not authorize running its installers or scripts.

## Runtime capabilities

Use tools actually available in the session. Inspect callable schemas rather than copying tool names, model names, spawn settings, feature flags or global configuration keys from another client. Preserve the actual runtime's model and reasoning policy.

For authorized independent review use fresh context where supported, pass requirements and relevant files and keep reviewers read-only. The shared workflow authorizes appropriate reviews; implementer delegation follows the task's agreed execution method. A missing named Claude agent does not prevent an equivalent authorized review, but do not claim the named integration was invoked.

If no agent tool exists, disclose the limitation and label any self-review honestly. Never fabricate results or require the user to enable an unverified feature flag.

## Scope and evidence

Use the current checkout unless isolation is needed. No automatic commits, pushes, merges, cleanup or new tests. Runtime sandbox permissions apply regardless of skill text. Record adaptations and verification evidence in the plan. Review uncommitted/new files instead of creating commits solely to satisfy upstream SHA-based helpers.

# Customer Mock-Flow MVP

- **ID:** `2026-11-mock-flow-mvp`
- **Status:** active
- **Effective:** 2026-11-17, based on the user's explicit phase clarification.
- **Scope owner:** user approval; no automatic phase transition.

## Goal and in scope

Prove the customer journey with fake data and realistic, consistent business interactions: Home → create pickup request → success → details of that request → History, with agreed basic operations such as validation, navigation and cancellation.

Fake data is acceptable; disconnected per-screen fixtures are not sufficient for a working end-to-end flow. New requests and approved changes must be reflected consistently wherever that request appears. Include only enough fixture scenarios to validate the accepted behavior.

## Deferred for this phase

- Mandatory sign-in, account activation and production session flow. Login is not required to use this phase's customer journey.
- Official API contracts/mapping, real uploads, backend persistence and live external integrations; BE has not started.
- Do not turn these deferrals into a permanent Auth/API prohibition. Notifications/receipts and other roadmap items require explicit phase/task scope before being counted as blockers.
- Driver/Collaborator apps are separate projects; do not build their screens here.

## Acceptance criteria, not a completion claim

- A submitted mock request has an identity and navigates to its own details; it appears consistently in Home/History where applicable.
- Validation and photo/address/time interactions follow the approved task rules.
- Cancellation asks for confirmation/reason and updates related views consistently, according to a status policy explicitly agreed in that task. NEW-only remains an assumption until resolved.
- Back/reset/success exits are predictable and do not duplicate submission accidentally.
- Relevant empty/error/offline states can be explained and exercised as agreed; no API implementation is needed to demonstrate the flow.
- Scope disputes are evaluated against this phase plus approved task specs, not missing backend integration or deferred Auth.

Persistence across restarts, exact guest-contact interaction, cancellation status permissions and additional scenario sets must be specified when their task is planned; this phase alone does not silently decide them.

## Exit and transition

The user accepts the agreed mock flow and verification evidence, then explicitly approves the next phase. Record the next phase without erasing these decisions. See [transition procedure](../current-phase.md) and [decision log](../decisions.md).

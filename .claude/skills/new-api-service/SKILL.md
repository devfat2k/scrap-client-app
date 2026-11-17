---
name: new-api-service
description: Thêm domain API service và TanStack Query hook khi task đã duyệt có tích hợp API.
---
Read `docs/ai/workflow.md`, the active phase and `docs/ai/rules/api.md`. Do not use this skill to invent endpoints for an approved mock-only flow.

1. Confirm approved spec/plan and backend contract; do not ask again for authorization already given.
2. Inspect an existing domain service and relevant query infrastructure.
3. Inject `api.apisauce`, follow envelope/error conventions and register query keys/invalidation; no direct component HTTP calls.
4. Apply `docs/ai/rules/security-privacy.md` and `docs/ai/rules/state.md`.
5. Verify using `docs/ai/rules/testing.md`; no new tests without request, no automatic commit.

---
name: new-screen
description: Tạo màn hình mới cho Scrap Client App sau khi spec và plan được duyệt.
---
Read `docs/ai/workflow.md`, the active phase and relevant canonical rules before implementation. Preserve the user's approved scope.

1. Confirm spec/plan authorization; do not ask again if explicitly granted.
2. Read one neighboring screen as a pattern; use app primitives, theme tokens and i18n.
3. Register typed params and the screen in its owning stack per `docs/ai/rules/navigation.md`; do not force nested screens into AppStack.
4. Apply relevant flow states and accessibility per `docs/ai/rules/ui.md`. Mock state or real server state follows the phase and `docs/ai/rules/state.md`.
5. Verify using `docs/ai/rules/testing.md`; no new tests without request, no automatic commit.

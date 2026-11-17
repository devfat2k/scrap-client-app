# Request Contact Details Implementation Plan

> **For agentic workers:** Use the executing-plans skill to implement this plan task by task.

**Goal:** Add a transient contact-details confirmation sheet before mock request submission.

**Architecture:** Keep name and phone state in the request screen flow and validate before invoking the existing form submit method. Use the existing `@gorhom/bottom-sheet` pattern, never React Native `Modal`; do not extend persisted or mock request models.

**Tech Stack:** Expo, React Native, TypeScript, existing i18n and component patterns.

**Spec:** [2026-11-17-request-contact-design.md](../specs/2026-11-17-request-contact-design.md)

## Global Constraints

- Phase: `2026-11-mock-flow-mvp`.
- Contact details remain transient and are not persisted, prefetched or logged.
- The contact surface is a Bottom Sheet, never React Native `Modal`.
- Keep current offline, request validation and duplicate-submit behavior.
- Support English and Vietnamese.
- No new tests unless explicitly requested; run existing checks and manual flow verification.

## Review Focus

- Empty name or phone must keep the sheet open and block submission.
- Dismissing the sheet must not submit or lose the request draft.
- Repeated confirmation must not create duplicate submissions.
- Offline state must continue to block submission.
- Contact values must not enter mock request data or logs.

## File Map

- Modify `app/screens/Request/screens/CreateRequestScreen.tsx` to manage the sheet and gate submit.
- Add a focused contact-details sheet component under `app/screens/Request/components/` using existing sheet/input conventions.
- Add English and Vietnamese request strings in `app/i18n/en/request.ts` and `app/i18n/vi/request.ts`.
- Add focused styles under `app/screens/Request/styles/` only if existing styles cannot support the sheet.

## Tasks

### Task 1: Contact details sheet and translations

**Files:**
- Create `app/screens/Request/components/ContactDetailsSheet.tsx`.
- Modify `app/i18n/en/request.ts` and `app/i18n/vi/request.ts`.
- Modify request styles only if needed.

- [ ] Build a Bottom Sheet with required full-name and phone inputs, inline validation, cancel/dismiss and confirm callbacks.
- [ ] Validate trimmed non-empty full name and phone number; keep validation local to the sheet and do not log values.
- [ ] Add matching English and Vietnamese labels, actions and validation messages.
- [ ] Check the component against existing sheet, input, theme and accessibility conventions.

### Task 2: Gate request submission

**Files:**
- Modify `app/screens/Request/screens/CreateRequestScreen.tsx`.

- [ ] Change the existing submit action to validate the request form and then open the contact sheet without submitting.
- [ ] On valid contact confirmation, invoke the existing `submit()` once and preserve existing offline/error/success behavior.
- [ ] On dismissal, close the sheet and retain the request draft without submitting.
- [ ] Verify confirm re-entry is blocked while submission is in progress.

### Task 3: Verification

- [ ] Run `bun run check`.
- [ ] Manually verify request validation → contact sheet → invalid contact feedback → valid confirmation → success.
- [ ] Manually verify dismissal returns to the intact request form and offline submission remains blocked.
- [ ] Inspect the diff to confirm contact details are transient and absent from mock persistence and logs.

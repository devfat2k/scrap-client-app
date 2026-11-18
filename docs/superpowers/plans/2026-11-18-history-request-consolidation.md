# History / Request Consolidation Implementation Plan

> For agentic workers: use the local executing-plans skill for inline execution after approval. No implementer delegation or automatic commits.

**Status:** implementation and static review complete; native runtime acceptance pending.
**Goal:** reduce unnecessary file jumps and repeated Sheet setup while preserving current behavior.
**Architecture:** one controlled AppSheet wraps the existing lifecycle hook; feature Sheets own content and business state. Co-locate private presentation pieces and move shared metadata to its actual owner.
**Tech Stack:** existing Expo, React Native, TypeScript, Gorhom bottom sheet, Bun.
**Spec:** [design](../specs/2026-11-18-history-request-consolidation-design.md).
**Phase:** `2026-11-mock-flow-mvp`.

## Global constraints

- No new dependencies, test files, backend/store changes or automatic commits.
- Preserve current UI/behavior, i18n, accessibility, theme, platform differences and public feature Sheet props.
- Keep module layout and 150 counted-line lint limit. No formatting compression or rule exceptions to force consolidation.
- Run existing checks and manual behavior checks; do not claim TDD or runtime verification from static inspection.
- Re-read only affected files and their direct consumers; stop expansion at unrelated modules.

## Review focus

- First open and reopen during closing animation: no invisible/stuck modal or duplicate close side effects.
- Photo selection: camera/library launches once after dismissal, including rapid taps.
- Contact keyboard/submission: preserve resize/restore, required errors and disabled/loading behavior.
- Platform picker: Android date then time; cancel at either stage; iOS draft confirm/cancel and reopen reset.
- Cancellation and geometry: reason reset, existing NEW-only rendering, exact inset ownership and fixed sizing on short/rotated screens.

## Task 1: Introduce the shell and migrate selection

**Files:** create `app/components/AppSheet.tsx`, `app/components/appSheetStyles.ts`; modify `app/screens/Request/components/SelectSheet.tsx`, `app/screens/Request/styles/selectSheetStyles.ts`. Read `app/utils/useBottomSheetModal.ts` and installed Gorhom declarations; change neither by default.

**Interface:** AppSheet exports props specified in the design (controlled visibility, completed-dismiss onClose, optional AppSheetHandle.dismiss ref, sizing union, content mode, appearance and explicit existing overrides). SelectSheet retains its current generic public API and fixed snap-point calculation.

- [x] Inspect installed modal/scroll prop declarations to type overrides without any; resolve styles so AppSheet fits the existing line limit.
- [x] Implement shell lifecycle with existing hook, backdrop, visible-only Back subscription and scroll/static containers. Preserve default library behavior for omitted overrides. AppSheet must not own domain state. Forward the narrow dismiss handle using forwardRef/useImperativeHandle; it calls the existing modal dismiss without notifying parent early. Base content has horizontal/top padding only; transfer bottom padding/gap per consumer. Native appearance skips standard surface/handle geometry.
- [x] Migrate SelectSheet; retain its selection rendering, optional title and `keyboardBlurBehavior="none"`; remove only shell styles now owned by AppSheet.
- [ ] Verify first open, selected mark, long list scroll, selection close, Back/backdrop/swipe, parent close and rapid reopen on device/simulator. Check light/dark and small viewport.
- [x] Run `bun run check`; record outputs and any unavailable runtime evidence before migrating more consumers.

## Task 2: Migrate remaining business Sheets

**Files:** modify `app/screens/Request/components/{PhotoSourceSheet,ContactDetailsSheet,CollectionTimeSheet}.tsx`, `app/screens/History/components/CancelRequestSheet.tsx`, `app/components/order/DriverContactSheet.tsx`; clean affected `collectionTimeSheetStyles.ts`, `contactDetailsStyles.ts`, `cancelRequestStyles.ts`, `driverContactSheetStyles.ts` and PhotoSourceSheet local styles.

**Interface:** same existing feature props/callbacks; AppSheet receives feature-computed sizing and explicit existing keyboard/style/inset overrides. Native Android picker remains outside AppSheet.

- [x] Migrate PhotoSourceSheet, preserving dynamic height ratio 0.6 and bottomInset. Preserve completed-dismiss callback timing used by PhotoAttachmentField.
- [x] Migrate ContactDetailsSheet, preserving fixed `min(440, height * 0.4)` sizing and interactive/restore/adjustResize settings. Close button invokes the narrow dismiss handle and waits for completed-dismiss onClose to notify parent; submission/validation remains local. Retain no bottom padding. Do not change draft persistence.
- [x] Migrate CancelRequestSheet, preserving fixed `min(spacing.xxxl * 8, height * 0.8)` sizing and reason reset only at completed-dismiss notification. Retain reason type and confirmation semantics. Keep invokes the parent close request; only AppSheet onClose runs the reset-then-notify wrapper.
- [x] Migrate iOS CollectionTimeSheet, preserving static content, content-pan disabled, current bottom margin and keyboard blur setting. Keep native Android date/time state and field key reset. Confirm/cancel must still commit only on confirmation and use dismiss() before parent notification; do not change the field key until completed dismissal.
- [x] Migrate DriverContactSheet preserving static content, bottom margin, handle/background appearance and phone action. Use appearance="native" to avoid adding standard radius/handle geometry; pass existing explicit color styles.
- [x] Remove migrated feature hook/backdrop/BackHandler wiring and duplicated shell declarations. Do not delete styles still consumed by picker/content/buttons.
- [ ] Exercise all five review-focus cases, both platform picker paths, light/dark and safe-area/keyboard geometry. Record callback count/timing, not just successful render.
- [x] Run `bun run check`. Reference-search the six consumers to confirm no remaining direct modal wiring; HomeSheet remains outside scope.

## Task 3: Consolidate local fragments and correct metadata ownership

**Files:** modify `app/screens/History/components/{OrderListRow,OrderItemsCard,CancelRequestSheet}.tsx`, `app/screens/History/screens/OrderDetailScreen.tsx`; remove `OrderDriver.tsx`, `OrderItemRow.tsx`, `CancelReasonList.tsx` from History/components after reference checks. Create `app/screens/Request/components/photoAttachmentFeedback.ts`; remove `photoErrorMessages.ts`, `photoPermissionAlert.ts`; update PhotoAttachmentField imports. Create `app/domain/scrapOptions.ts`; modify Request/form/requestFormOptions.ts and History/utils/orderDetail.ts.

**Interfaces:** preserve OrderItemRow/CancelReasonList prop types as private types beside their functions. Preserve `PHOTO_ERROR_TX`, `showPermissionAlert(source, canAskAgain?)`, and `PhotoSource` exports from the combined feedback module. Shared metadata preserves readonly option values/types and label keys; Request form re-exports its existing option API.

- [x] Replace OrderDriver with DriverContact at both call sites, then remove the forwarding wrapper after checking all references.
- [x] Move OrderItemRow into OrderItemsCard as a private function. Move CancelReasonList into CancelRequestSheet after shell migration. Preserve styles/roles/keys and keep files within lint limits; if a target cannot fit legibly, report the conflict before choosing a new split.
- [x] Combine photo error mapping and permission alert in photoAttachmentFeedback.ts; preserve settings action and no-PII behavior. Change only the direct imports in PhotoAttachmentField.
- [x] Move SelectOption, CATEGORY_OPTIONS and UNIT_OPTIONS to domain/scrapOptions.ts. Keep STATE_OPTIONS and VOLUME_SELECT_OPTIONS in requestFormOptions.ts; re-export shared names there. Update History to import the shared owner directly.
- [x] Check references before removing obsolete files; do not remove other helpers or style files solely to lower file count.
- [ ] Run `bun run check`. Manually check quoted/unquoted items, cancellation reason selection/reset, dispatched driver contact, photo permission-denied/settings and unchanged category/unit labels.

## Task 4: Review and handoff

**Files:** this plan, linked design, shared architecture/UI rules changed during preparation; application diff from Tasks 1–3.

- [x] Confirm shared guidance remains discoverable from workflow; document only lasting principles in rules. Keep this migration file list in the task documents.
- [x] Run `python3 scripts/check-agent-setup.py`, `git diff --check` and final `bun run check` if the application changed since the last full check.
- [x] Obtain fresh read-only review of uncommitted and new files against spec, especially callback timing, stale references, safe-area ownership and 150-line compliance. Fix verified findings within scope.
- [x] Report changed responsibilities, retained boundaries, commands/results and runtime evidence or limitations. Record existing flow issues separately; do not broaden implementation scope.

## Preparation evidence

Targeted inspection confirmed six in-scope repeated modal implementations, 15 History component TSX files and 13 Request component TSX files. These are module inventories, not a per-screen component count. No application files were changed while preparing this plan. Existing test inventory found i18n, Text and storage tests; no direct Sheet lifecycle/flow suite was found in the targeted search. `.maestro/flows` is absent in this checkout, so native verification cannot assume those flows exist.


## Preparation review

A fresh read-only reviewer identified premature parent-close/unmount timing and absent-style inheritance as blocking ambiguities. Both were checked against the current contact/picker close paths, CollectionTimeField key and existing style factories. The revised contract adds only a narrow dismiss handle and a native appearance mode, separates cancellation close-request from completed-dismiss reset, and pins content bottom padding ownership. These corrections affect the proposal only; runtime verification remains an implementation requirement.

## Execution ledger

- User approved spec/plan. Inline implementation in current checkout; no new tests, commits or worktree, per repository adaptations.
- Pre-flight: Tasks 1–2 share AppSheet contract; Task 3 consolidation follows shell extraction. No interface conflicts found.

- Task 1 static implementation complete; full check blocked at existing TS5101 baseUrl configuration. Explicit CLI deprecation override exposes existing missing Node/Jest ambient types. No compiler config changed.
- Task 2 implementation complete; Task 3 consolidation complete. Runtime scenarios remain unverified pending a usable native UI environment.
- Ruling: AppSheet adds optional onDismiss cleanup separate from onClose. Current cancellation resets reason before the lifecycle hook processes queued reopen; forwarding reset only through onClose would skip that cleanup during reopen. Invoke onDismiss first, then the unchanged hook. Cost if incorrect: stale selection on rapid reopen; the split preserves the exact original ordering.


### Verification results

- `bun run check`: blocked at TS5101, existing `tsconfig.json` baseUrl deprecation with installed TS 6. Config not changed.
- `bunx --no-install tsc --noEmit -p . --ignoreDeprecations 6.0 --types node,jest`: PASS. Without explicit ambient types, existing tests/config/scripts report missing Node/Jest names; no code/config workaround committed.
- `bun run lint:check`: PASS across repository, including file line limits.
- `bun run deps:check`: PASS (0 errors; four orphan warnings in existing services outside scope).
- `bun run test --runInBand`: PASS, 3 suites / 10 tests. Sandbox Watchman access initially failed; approved external run succeeded with Watchman recrawl and existing Text/i18next warnings.
- `python3 scripts/check-agent-setup.py`: PASS. `git diff --check`: PASS.
- Scoped reference search: no direct BottomSheetModal/backdrop/BackHandler/lifecycle hook remains in History, Request or DriverContactSheet; Android native date/time stays separate. No references to removed module paths remain.
- `xcrun simctl list devices booted` outside sandbox: no booted devices. iOS/Android gestures, keyboard, first-open/reopen animation and light/dark geometry NOT runtime verified. No Maestro flow directory exists. These manual acceptance items remain unchecked; static checks and existing unrelated Jest tests are not substitutes.

- Final independent read-only review: no important bugs found. Reviewer checked six Sheet migrations against originals, lifecycle/cleanup ordering, native picker/key paths, style/inset ownership, private components and metadata exports. No deferred minor findings.
- Task 4 documentation/static verification complete. Native manual acceptance remains pending, explicitly unchecked above; no claim of full check or runtime success.

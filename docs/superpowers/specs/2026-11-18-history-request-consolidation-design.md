# History / Request: consolidate components and Sheet infrastructure

Status: approved by user; implemented with verification limits recorded in the plan.
Phase: `2026-11-mock-flow-mvp`.

## Intent and constraints

The user identified fragmentation in History/Request and repeated technical setup in Sheets. Optimize for following and changing a responsibility with fewer file jumps. Preserve established module layout, naming, typed props, theme and i18n conventions. Do not optimize toward a fixed file/component count.

Keep existing observable behavior, text, accessibility, navigation and platform differences. No dependencies, backend, shared request store, new validation rules, new test files, automatic commits or configuration relaxation. Current cancellation eligibility and disconnected mock data are existing behavior, not decisions resolved by this refactor.

This audit reads targeted screen composition, relevant components, Sheet styles, lifecycle hook and references. It is not an audit of all source files. Counts are module inventories, not components mounted by one screen: History has 15 component TSX files; Request has 13.

## Evidence and decisions

| Evidence | Decision |
| --- | --- |
| SelectSheet, PhotoSourceSheet, ContactDetailsSheet, CancelRequestSheet, CollectionTimeSheet and DriverContactSheet repeat modal/backdrop/BackHandler setup | One shared AppSheet owns infrastructure; feature Sheets own business state and content |
| useBottomSheetModal already handles present/dismiss/reopen races | Reuse it inside AppSheet; do not introduce another lifecycle state machine |
| SelectSheet documents a first-present measurement problem and uses fixed snap points; ContactDetailsSheet and CancelRequestSheet also use fixed sizing | Preserve fixed sizing calculations; no blanket migration to dynamic sizing |
| CollectionTimeSheet uses native sequential date/time dialogs on Android and a wheel Sheet on iOS | Shared shell applies only to the modal branch; preserve native flow and per-open reset behavior |
| ContactDetailsSheet uses interactive keyboard/restore/adjustResize; other Sheets differ | Explicit keyboard override only where used; preserve actual settings |
| PhotoAttachmentField starts camera/library after the Sheet dismissal callback | Preserve callback timing; never start the picker at close-request time |
| DriverContactSheet has different handle/background treatment; safe-area treatment differs across Sheets | Centralize ownership while preserving the current variants/inset placement; do not normalize appearance silently |
| OrderDriver forwards its only prop directly to DriverContact | Remove wrapper, use DriverContact at its two call sites |
| OrderItemRow is used only by OrderItemsCard; CancelReasonList only by CancelRequestSheet | Co-locate as private functions in their owning files after shell extraction; retain distinct readable function names |
| photoErrorMessages and photoPermissionAlert serve the same photo interaction | Combine into one photoAttachmentFeedback.ts, preserving exports and behavior |
| History/utils/orderDetail imports category/unit options from Request/form | Move shared category/unit presentation metadata to app/domain/scrapOptions.ts; retain state/volume form options locally |
| AddressFields, ScrapItemCard, PhotoAttachmentField, CollectionTimePicker, HistoryTabs and HistoryOrderList own meaningful UI or interaction responsibilities | Keep those boundaries; do not flatten whole screens |
| ESLint limits files to 150 nonblank/noncomment lines | Consolidate without disabling/increasing the limit or creating forwarding helpers merely to pass it |

FormSection and SubmitBar remain: they express a repeated section layout and a safe-area-aware submission area. OrderSettlement remains a distinct paid-state presentation. Separate style files remain where they group a coherent, substantial responsibility; remove only genuinely dead declarations after migration.

## Proposed shared contract

Create `app/components/AppSheet.tsx` and `app/components/appSheetStyles.ts`. AppSheet owns modal ref/lifecycle, backdrop, Android Back subscription, modal content container, shared shell styles and base content spacing. It invokes onClose after completed dismissal, including programmatic close; feature side effects remain outside it.

Proposed props (implementation must check installed Gorhom typings):

- `visible: boolean`, `onClose: () => void`, `children: ReactNode`. onClose is the completed-dismiss notification, never a close-request notification.
- Optional `onDismiss: () => void` cleanup runs before the existing hook processes dismissal, even when it queues a reopen. Cancellation uses this for reason reset; onClose remains the hook notification.
- Optional forwarded ref of type `AppSheetHandle = { dismiss: () => void }`. Implement with forwardRef/useImperativeHandle and delegate dismiss directly to the existing modal ref. No new visibility state machine. ContactDetailsSheet and the iOS CollectionTimeSheet use this narrow handle for their current internal close actions; parent visibility changes only after completed dismissal. This preserves CollectionTimeField key/unmount timing.
- `appearance?: "standard" | "native"` (default standard). Standard uses the repeated Request/Cancel shell surface/handle styling. Native omits those base appearance styles so DriverContactSheet keeps Gorhom defaults plus its existing explicit background/handle colors. This is an observed technical difference, not a business variant.
- `contentMode?: "scroll" | "static"` (default scroll).
- `sizing?: { mode: "dynamic"; maxHeightRatio?: number } | { mode: "fixed"; snapPoints: (string | number)[] }` (default dynamic). The union prevents conflicting sizing switches. Existing fixed calculations stay with their feature.
- `keyboardBehavior`, `keyboardBlurBehavior`, `android_keyboardInputMode`, `enableContentPanningGesture`: narrowly typed optional overrides matching the installed modal API; preserve omitted defaults.
- `contentContainerStyle`, `backgroundStyle`, `handleIndicatorStyle`, `bottomInset`: typed overrides needed by existing consumers. Shell owns their application order. Base styles first, existing consumer overrides last. Base content owns horizontal padding md and top padding xs only; bottom padding/gap are explicit consumer transfers. ContactDetailsSheet retains no bottom padding; the other five keep their existing bottom padding and margin/bottomInset. Native appearance must not inherit standard radius, handle width/height or handle border radius.
- `keyboardShouldPersistTaps?: "always" | "never" | "handled"`: forward only for scroll content, preserving each caller's current behavior.

Do not expose the entire Gorhom props bag, raw modal ref, imperative methods beyond the narrow dismiss handle, a business variant enum, action schema or render-prop framework. Preserve each existing close path: contact Cancel and iOS picker confirm/cancel invoke dismiss(); cancellation Keep invokes the parent close request directly. CancelRequestSheet passes reason reset as AppSheet onDismiss and parent notification as onClose; Keep must not run the reset callback. Photo source actions retain their existing parent-driven close path. Callback consumers must be idempotent and preserve existing state reset timing. Keep base safe-area addition at zero in this migration; transfer each consumer's existing padding/margin/bottomInset explicitly so an inset is never applied twice. A future universal inset policy is a separate behavioral/design decision.

Title, descriptions, option rows, actions, draft values, validation, submit/cancel semantics and camera/phone behavior remain feature content. Repeated titles/action rows alone do not justify another shared abstraction in this scope. Keep the public feature Sheet props unchanged.

AppSheet uses the existing hook unchanged unless verification demonstrates a necessary compatibility fix, which must be described before widening scope. Do not invoke that hook in feature Sheets after migration. Android native date/time branch does not mount AppSheet.

## Structure after consolidation

- Shared infrastructure: AppSheet + styles; existing useBottomSheetModal retained.
- Request: existing business Sheets consume AppSheet; one photoAttachmentFeedback module replaces two feedback helpers. Field/picker/form boundaries remain.
- History: direct DriverContact use; private OrderItemRow inside OrderItemsCard and private CancelReasonList inside CancelRequestSheet. Other substantive sections remain.
- Shared presentation metadata: app/domain/scrapOptions.ts owns SelectOption, CATEGORY_OPTIONS and UNIT_OPTIONS. Request form options imports/re-exports them to preserve current consumers; History imports the shared owner directly. This file may depend on TxKeyPath as a type only; do not move translation runtime into domain or change raw category constants.
- HomeSheet is a known additional consumer discovered by reference search, outside migration scope. It continues using the existing hook; no repository-wide Sheet migration claim.

## Acceptance and verification

1. Six in-scope modal implementations use AppSheet; direct BackHandler/backdrop/modal wiring exists only in the shell for those consumers. Android native picker stays independent.
2. No replacement forwarding wrappers; three redundant History component files and one Request helper file are removed after reference checks.
3. History no longer imports Request form metadata. No new circular dependency.
4. Existing visual variants, size caps/snap points, safe areas, keyboard settings, option roles, disabled/loading states and draft/reset semantics are preserved.
5. Reopen while dismissing, first presentation, Back/backdrop/swipe and parent-driven close behave as before. Photo picker runs once after dismissal; contact confirmation does not double submit; cancellation clears reason at its existing dismissal boundary.
6. `bun run check` passes; existing Jest tests provide only limited coverage of these flows. Manually verify iOS/Android behavior and light/dark variants. Report unavailable runtime checks separately.
7. Shared rules explain cohesion, extraction criteria and Sheet ownership without freezing this temporary file list as permanent architecture.

## Privacy and non-goals

Contact/address/photos remain local mock interactions. Add no logging, persistence or transport of personal data. Do not fix mock request identity, cancellation propagation, Back navigation omissions or other flow issues under a behavior-preserving refactor. Record discoveries separately.

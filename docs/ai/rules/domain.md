# Customer Domain Rules

Read the active phase before deciding what must be implemented now. Roadmap capabilities and deferred questions are not current acceptance criteria unless the phase/spec includes them.

- This repository is the customer app. Do not implement Driver/Collaborator workflows here; customer-facing effects can consume events from those systems in a later approved phase.
- Use `app/domain/` as the code source for order statuses, scrap categories and Australian address constants. Do not duplicate enums or compare raw status strings in screens.
- Store scrap categories in English and display through i18n. Proposed dynamic categories/multiple-type policy must be checked against recorded decisions; existing UI is not proof that open business questions were approved.
- Customers choose visual volume estimates; do not force them to calculate cubic metres. Backend conversion is a separate contract when that phase is active.
- Maximum three request photos per the product rule; if several items make the cap ambiguous, clarify the request-wide/per-item rule before changing behavior. Compress on device; handle permissions and retry/progress where an upload flow applies.
- Split AU addresses into unit/house, street, suburb, state, four-digit postcode and fixed `AUSTRALIA`. Supported state/service-area restrictions remain product decisions, not guesses.
- Preferred collection time is the customer's proposal; confirmed collection time is provided by the company.
- Before final weighing, quoted prices are provisional and need a disclaimer. No in-app payment processing under the current product scope.
- Guest contact, account creation/activation and order ownership follow product decisions. A temporary phase deferral of Auth does not settle future authentication or authorize exposing another customer's orders.
- Unknown statuses must render safely. Keep a fallback distinct from an invented confirmed business state; do not crash or introduce new status semantics without agreement.
- Cancellation permissions, reason retention and state transitions must be explicit in the phase/task spec; historical assumptions such as NEW-only are not silently final.

Consult [order status](../../product/order-status.md), [open questions](../../product/open-questions.md) and [decisions](../../product/decisions.md) only as relevant. Resolve conflicts through the [workflow](../workflow.md).

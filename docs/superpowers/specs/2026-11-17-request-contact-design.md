# Request Contact Details Design

- **Phase:** `2026-11-mock-flow-mvp`
- **Status:** Approved in chat on 2026-11-17.

## Intent

Collect a customer's name and phone number as a confirmation step before submitting a pickup request.

## Scope

After the customer taps the existing submit action and the request form passes validation, show a contact-details Bottom Sheet using `@gorhom/bottom-sheet`, never React Native `Modal`. It has required full name and phone number fields. The customer confirms those details in the sheet; only then does the existing mock submit run and navigate to request success. Empty contact details stay in the sheet with field-level feedback. Dismissing the sheet returns to the request form without submitting.

Contact details are transient UI state for this flow. Do not persist them, prefill future requests, add them to mock request data, or log them. No API/backend contract changes are included.

## Constraints and privacy

- Follow existing Bottom Sheet, form, translation, theme and accessibility patterns; do not use React Native `Modal`.
- Keep contact details in component/form memory only; discard them when the flow ends.
- Do not log names or phone numbers.
- Preserve current request validation, offline behavior and duplicate-submit protection.

## Acceptance criteria

- Valid request form submission opens the contact-details sheet instead of submitting immediately.
- The sheet shows required “Họ và tên” and “Số điện thoại” fields and a confirmation action.
- Empty values show validation feedback and do not submit.
- Confirming valid values submits exactly once and reaches the existing success screen.
- Closing the sheet returns to the request form and does not submit.
- English and Vietnamese translations are provided.

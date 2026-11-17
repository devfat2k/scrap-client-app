# React Native Design Guidance

## Direction before implementation

Read the existing screen, shared components and theme relevant to the task. Ask about consequential gaps in intended user action, reference style and content; retain answers already given. Do not use generic adjectives as a substitute for a concrete direction.

For substantial layout/style changes, present a wireframe/mockup or comparable visual options with trade-offs and get agreement before implementation. A confirmed direction is part of the spec. Routine fixes within an approved design do not need repeated approval.

## Craft checklist

- Clear hierarchy, legible typography, deliberate spacing and density; one clear primary action for the task.
- Reuse theme tokens and app primitives; preserve Inter, current light/dark systems and existing visual language unless a change is approved.
- Review safe areas, keyboard, scrolling, text scaling, touch targets, contrast and accessible control names.
- Specify submitting/disabled states, validation, relevant loading/error/empty/offline behavior and destructive-action confirmation.
- Check small-screen layouts and both themes when affected. Status uses Text + Icon without status Badge or blinking.
- Use real app content or clearly identified fixtures. Do not fabricate testimonials, business metrics, photos of customers or unsupported outcomes.

## Evidence

Capture relevant simulator/device screenshots or a recording when available. Compare against the approved direction and inspect affected interaction states. If no runtime is available, report static inspection only; do not call the design visually verified.

Hallmark's current skill targets websites and restricts changes to existing designs. Do not automatically apply its CSS/HTML rules to this React Native app. No custom design skill is installed by this setup; a later skill task must use skill-creator, approved references and scoped evaluation.

---
name: mobile-design
description: Mobile UX design guidelines for React Native (touch targets, thumb zones, loading/error states, performance). Use when designing mobile UI components or review screens.
allowed-tools: Read, Grep, Glob
---

# Mobile Design Guidelines

## Touch & Layout
- **Touch target:** Minimum 44pt (iOS) / 48dp (Android) for all interactive elements. Minimum 8px spacing between touch targets.
- **Thumb zone:** Place primary actions (CTAs) within natural reach at the bottom third of the screen.
- **Visual hierarchy:** Max 1 primary button per viewport. Destructive actions separated or requiring confirmation.
- **Accessibility:** `accessibilityLabel` required on all touchables and images. Dynamic Type support via responsive text tokens.

## State Completeness
Every screen and component must explicitly handle:
1. **Loading state:** Skeleton or spinner centered, preventing duplicate submissions.
2. **Empty state:** Meaningful icon, helpful message, and clear call-to-action.
3. **Error state:** User-friendly message explaining the issue with a retry button.
4. **Offline state:** Display cached data when available, with clear offline indicator.

## Performance
- Always use `FlatList` with `keyExtractor` and memoized `renderItem` for lists. Never wrap unbounded lists in `ScrollView`.
- Keep render passes minimal: no inline object or function allocations in repeated list items.
- Avoid layout thrashing: specify fixed dimensions or aspect ratios for images before loading.

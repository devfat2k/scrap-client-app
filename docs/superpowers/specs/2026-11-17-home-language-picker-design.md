# Home Language Picker Design

- **Phase:** `2026-11-mock-flow-mvp`
- **Status:** proposed; implementation requires user approval of this spec and its plan.

## Intent

Let customers switch the app between English and Vietnamese from the Home header while retaining English as the initial and fallback language.

## Goals

- Add an accessible Earth icon action to the Home top bar.
- Open a bottom sheet with English and Tiếng Việt options and a clear current selection.
- Change translated UI immediately after selection.
- Add Vietnamese resources under `app/i18n/vi/`, matching the current English keys and module structure.

## Non-goals

- Change the initial locale from `en-US` or infer language from the device.
- Add persistence across app restarts, remote translation, or languages beyond English and Vietnamese.
- Translate user-generated content or server-provided values.

## Behavior and data flow

The Home top bar owns the language action and opens a language sheet, following the existing Home theme/notification sheet pattern. The sheet reads the active i18next language, offers English and Tiếng Việt, calls i18next language change on selection, then dismisses. i18next resources register `en` and `vi`; English remains fallback. Vietnamese resource files mirror the existing English root and feature modules so translation keys remain type-compatible. Locale persistence is out of scope and a restart returns to English.

## Privacy and accessibility

Language selection is local UI state handled by i18next; no personal data or network request is involved. The icon and each option expose accessible names/roles, and the selected language is exposed as selected.

## Acceptance criteria

- Home header displays an Earth icon button that opens the language sheet.
- The sheet shows English and Tiếng Việt and indicates the active language.
- Selecting Vietnamese updates translated app text immediately; selecting English restores English.
- Cold start continues to use English and unsupported/missing keys fall back to English.
- Vietnamese translation modules follow English module organization and key structure.
- Existing theme and notification header actions continue to work.

## Assumptions

- “Header” means the Home screen's `HomeTopBar`, where the theme and notification actions currently live.
- “Sheet” follows the existing bottom-sheet modal components and theme tokens.
- Translate all existing shipped English UI keys into Vietnamese, not only Home strings, to avoid a partially translated app when the locale is switched.

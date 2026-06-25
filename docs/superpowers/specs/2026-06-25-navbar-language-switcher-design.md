# Navbar Language Switcher Design

## Summary

Replace the current navbar locale cycle button with a clearer language selector:

- Desktop uses a compact dropdown trigger that displays the current locale code, such as `EN`.
- Mobile keeps the existing drawer layout, but replaces the single cycle button with three direct locale options.
- Locale changes preserve the current page path and continue to navigate without scrolling to the top.

## Goals

- Make the available languages discoverable at a glance.
- Show the current language state clearly in the desktop header.
- Keep the existing routing model based on the leading locale URL segment.
- Preserve the current desktop/mobile structural split in `components/Navbar.tsx`.

## Non-Goals

- Changing the locale list or locale codes.
- Refactoring the app-wide internationalization architecture.
- Introducing a shared dropdown abstraction for unrelated navigation controls.

## Current Context

The current language switcher in `components/Navbar.tsx` computes the next locale from `APP_LOCALES` and cycles through them on click. This means users only see the next destination locale, not the current locale or the full list of available languages.

The app already has the required routing primitives:

- `APP_LOCALES` in `lib/locale.ts`
- locale-aware routes under `app/[locale]/...`
- `useLocale()`, `usePathname()`, and `useRouter()` in the navbar

## Proposed Interaction

### Desktop

The right side of the navbar keeps the locale control beside the CTA. The trigger displays the current locale in compact form:

- `EN`
- `简中`
- `繁中`

Clicking the trigger opens a small dropdown directly below the trigger. The menu contains:

- `English`
- `简体中文`
- `繁體中文`

The active locale is visually distinguished with stronger emphasis and either a subtle background tint or a checkmark. Selecting a locale closes the dropdown and navigates to the same pathname under the chosen locale.

### Mobile

The mobile drawer does not introduce a nested dropdown. Instead, it renders a simple vertical locale group near the bottom of the drawer where the current language switch action already lives.

Each locale is visible as a direct action:

- `English`
- `简体中文`
- `繁體中文`

The active locale is styled distinctly. Selecting a locale closes the drawer and switches locale in place.

## Behavior

- The desktop dropdown opens on click.
- The desktop dropdown closes on outside click.
- The desktop dropdown closes after selection.
- Locale switching preserves the current route path by replacing only the leading locale segment.
- Locale switching should keep `scroll: false` to match the current navbar behavior.

## Accessibility

- The desktop trigger should expose expanded state.
- The menu should be keyboard reachable.
- The active locale should be communicated both visually and semantically.
- Focus should remain predictable when the menu opens and closes.

## Layout And Visual Constraints

- The desktop dropdown should align with the compact, glassy header aesthetic already used by the navbar.
- The menu must avoid clipping against the navbar container.
- The locale trigger should remain visually lightweight so it does not compete with the CTA.
- Mobile should optimize for fewer taps and clear scannability, not parity with desktop interaction mechanics.

## Implementation Notes

- Reuse the existing locale-aware pathname replacement logic, but generalize it from "next locale" to "selected locale".
- Replace the computed `nextLocale` model with a locale options list that contains both compact trigger labels and full menu labels.
- Keep desktop and mobile render paths separate within `components/Navbar.tsx`, following the existing component structure.

## Edge Cases

- If the pathname is missing or has an invalid first segment, locale switching should fail safely, ideally by reconstructing the route from a known locale root.
- The active locale row should not feel misleadingly interactive.
- The control should behave correctly across all supported locales in `APP_LOCALES`.

## Testing

- Verify desktop dropdown open, close, and selection behavior.
- Verify mobile drawer locale selection behavior.
- Verify locale changes on nested routes such as news, solutions, and case study detail pages.
- Verify switching does not scroll the page to the top.
- Verify dark and light theme appearance remains coherent.

## Open Decisions Resolved

- Desktop uses a dropdown, not a cycle button.
- The desktop trigger shows the current locale code, not a neutral "Language" label.
- Mobile uses always-visible direct locale options inside the drawer, not a second dropdown.

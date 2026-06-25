# Navbar Language Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the navbar's locale cycle button with a desktop dropdown that shows the current locale and a mobile drawer locale list that shows all language choices directly.

**Architecture:** Keep the change local to `components/Navbar.tsx` because the existing navbar already owns locale-aware navigation, desktop/mobile branching, and route replacement behavior. Define a single locale options data structure and a selected-locale navigation helper, then reuse those in both the desktop dropdown and the mobile locale list so the visual behavior changes without refactoring the app-wide i18n setup.

**Tech Stack:** Next.js 16, React 19 client components, `next-intl`, TypeScript, inline styles

---

## File Structure

- Modify: `components/Navbar.tsx`
  - Replace the current `nextLocale` cycle model with a locale options list.
  - Add desktop dropdown open/close state and outside-click behavior.
  - Add selected-locale route replacement helper.
  - Render desktop dropdown UI and mobile direct locale options UI.
- Reference only: `lib/locale.ts`
  - Keep `APP_LOCALES` as the source of supported locales.
- No automated test files
  - This repository currently has no configured test runner or existing spec files. Verification will use `npm run build` and explicit manual browser checks.

### Task 1: Add locale option data and selected-locale navigation

**Files:**
- Modify: `components/Navbar.tsx`
- Test: none, verify with `npm run build`

- [ ] **Step 1: Add a local `localeOptions` mapping and replace the cycle-only locale state**

Replace the existing `localeIndex`, `nextLocale`, and `nextLocaleLabel` block with a locale option list plus a current option lookup.

```tsx
  const localeOptions = [
    { value: "en", triggerLabel: "EN", menuLabel: "English" },
    { value: "zh", triggerLabel: "简中", menuLabel: "简体中文" },
    { value: "zh-tw", triggerLabel: "繁中", menuLabel: "繁體中文" },
  ] as const;

  const currentLocaleOption =
    localeOptions.find((option) => option.value === locale) ?? localeOptions[0];
```

- [ ] **Step 2: Replace `switchLocale()` with a selected-locale helper that preserves the current path**

Delete the current cycle-based function and add this selected-locale version instead.

```tsx
  function switchLocale(nextLocale: (typeof APP_LOCALES)[number]) {
    const segments = pathname.split("/");

    if (segments.length < 2 || !APP_LOCALES.includes(segments[1] as (typeof APP_LOCALES)[number])) {
      router.replace(`/${nextLocale}`, { scroll: false });
      return;
    }

    segments[1] = nextLocale;
    router.replace(segments.join("/") || `/${nextLocale}`, { scroll: false });
  }
```

- [ ] **Step 3: Run the production build to verify the helper compiles**

Run: `npm run build`

Expected: Next.js production build completes successfully with no TypeScript errors from `components/Navbar.tsx`.

- [ ] **Step 4: Commit the locale model refactor**

```bash
git add components/Navbar.tsx
git commit -m "refactor: model navbar locales as explicit options"
```

### Task 2: Implement desktop dropdown state and rendering

**Files:**
- Modify: `components/Navbar.tsx`
- Test: none, verify with `npm run build`

- [ ] **Step 1: Add desktop dropdown state and refs near the existing navbar state**

Extend the React import and component state so the desktop locale menu can open, close, and detect outside clicks.

```tsx
import { useEffect, useRef, useState } from "react";
```

```tsx
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const lastY = useRef(0);
  const localeMenuRef = useRef<HTMLDivElement | null>(null);
```

- [ ] **Step 2: Add an outside-click effect and route-change close behavior for the locale menu**

Keep the existing mobile drawer close-on-pathname-change effect, but extend it to also close the desktop locale dropdown. Then add a document-level pointer handler for outside clicks.

```tsx
  useEffect(() => {
    setMenuOpen(false);
    setLocaleMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!localeMenuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!localeMenuRef.current?.contains(event.target as Node)) {
        setLocaleMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [localeMenuOpen]);
```

- [ ] **Step 3: Replace the desktop locale button with a trigger plus dropdown menu**

Swap the current desktop locale button block for a wrapped trigger/menu structure that renders all locale choices.

```tsx
            <div ref={localeMenuRef} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setLocaleMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={localeMenuOpen}
                className="bw-btn-text bw-mono-label"
                style={{
                  color: "var(--c-text-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "0",
                }}
              >
                {currentLocaleOption.triggerLabel}
              </button>

              {localeMenuOpen && (
                <div
                  role="menu"
                  aria-label="Language selector"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 14px)",
                    right: 0,
                    minWidth: "156px",
                    padding: "8px",
                    borderRadius: "18px",
                    backgroundColor: isDark ? "rgba(18,18,22,0.96)" : "rgba(255,255,255,0.96)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
                    boxShadow: isDark ? "0 16px 40px rgba(0,0,0,0.38)" : "0 16px 40px rgba(0,0,0,0.12)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    zIndex: 220,
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  {localeOptions.map((option) => {
                    const isActive = option.value === currentLocaleOption.value;

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="menuitemradio"
                        aria-checked={isActive}
                        onClick={() => {
                          setLocaleMenuOpen(false);
                          if (!isActive) switchLocale(option.value);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: "12px",
                          width: "100%",
                          padding: "10px 12px",
                          border: "none",
                          borderRadius: "12px",
                          background: isActive
                            ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)")
                            : "transparent",
                          color: "var(--c-text)",
                          cursor: isActive ? "default" : "pointer",
                          fontFamily: "var(--font-sans)",
                          fontWeight: isActive ? 600 : 500,
                          fontSize: "var(--fs-body-sm)",
                          textAlign: "left",
                        }}
                      >
                        <span>{option.menuLabel}</span>
                        <span
                          aria-hidden="true"
                          style={{ opacity: isActive ? 1 : 0, fontSize: "12px" }}
                        >
                          ✓
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
```

- [ ] **Step 4: Run the production build after the desktop dropdown is in place**

Run: `npm run build`

Expected: Build completes successfully, and there are no JSX or type errors related to the dropdown state, refs, or locale option values.

- [ ] **Step 5: Commit the desktop dropdown**

```bash
git add components/Navbar.tsx
git commit -m "feat: add desktop navbar language dropdown"
```

### Task 3: Replace the mobile cycle button with direct locale options

**Files:**
- Modify: `components/Navbar.tsx`
- Test: none, verify with `npm run build`

- [ ] **Step 1: Replace the mobile locale button with a mapped locale option group**

Delete the existing single mobile locale button and render a visible list of locale actions in the drawer footer block.

```tsx
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "stretch",
              }}
            >
              {localeOptions.map((option) => {
                const isActive = option.value === currentLocaleOption.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      if (!isActive) switchLocale(option.value);
                    }}
                    className="bw-btn-text"
                    aria-pressed={isActive}
                    style={{
                      color: "var(--c-text)",
                      background: isActive
                        ? (isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)")
                        : "transparent",
                      border: "none",
                      borderRadius: "14px",
                      cursor: isActive ? "default" : "pointer",
                      padding: "12px 14px",
                      fontSize: "var(--fs-body-sm)",
                      textAlign: "left",
                      fontWeight: isActive ? 600 : 500,
                    }}
                  >
                    {option.menuLabel}
                  </button>
                );
              })}
            </div>
```

- [ ] **Step 2: Run the production build after the mobile locale UI change**

Run: `npm run build`

Expected: Build completes successfully, and there are no type or JSX issues in the mobile drawer branch.

- [ ] **Step 3: Commit the mobile locale list**

```bash
git add components/Navbar.tsx
git commit -m "feat: add mobile navbar language options"
```

### Task 4: Manual verification and finish

**Files:**
- Modify: none
- Test: manual browser verification plus `npm run build`

- [ ] **Step 1: Start the dev server if it is not already running**

Run: `npm run dev`

Expected: Local development server starts and serves the app locally.

- [ ] **Step 2: Verify the desktop dropdown behavior manually**

Check these flows in the browser:

```text
1. Open a desktop-width page such as /en, /en/news, and /en/solutions/basicrouter.
2. Confirm the trigger shows the current locale code: EN, 简中, or 繁中.
3. Click the trigger and confirm the dropdown appears directly below it.
4. Click outside the dropdown and confirm it closes.
5. Reopen the dropdown, choose another locale, and confirm the pathname stays the same except for the locale segment.
6. Confirm the page does not jump back to the top after switching locales.
7. Confirm the active locale row is visibly highlighted.
```

- [ ] **Step 3: Verify the mobile drawer locale behavior manually**

Check these flows in the browser responsive mode:

```text
1. Switch to a viewport narrower than 768px.
2. Open the mobile drawer.
3. Confirm all three locale options are visible without opening a nested menu.
4. Confirm the active locale option is visually distinct.
5. Tap a different locale and confirm the drawer closes.
6. Confirm the route changes only in the leading locale segment.
7. Repeat on a nested route such as /zh/news/[slug] or /zh-tw/success-stories/[id].
```

- [ ] **Step 4: Run one final production build**

Run: `npm run build`

Expected: Final build succeeds after manual verification.

- [ ] **Step 5: Commit the verified finish**

```bash
git add components/Navbar.tsx
git commit -m "feat: improve navbar language selection"
```

## Self-Review

- Spec coverage: the tasks cover the approved desktop dropdown, current-locale trigger, direct mobile locale options, same-path locale switching, outside-click close behavior, and manual dark/light verification.
- Placeholder scan: no `TODO`, `TBD`, or vague "handle this later" instructions remain.
- Type consistency: all tasks use the same `localeOptions`, `currentLocaleOption`, `localeMenuOpen`, and `switchLocale(nextLocale)` names.

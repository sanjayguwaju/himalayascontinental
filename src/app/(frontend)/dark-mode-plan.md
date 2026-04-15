---
description: Comprehensive Dark Mode Implementation and Fix
---

# Dark Mode Integration and Fix Plan

The current dark mode implementation in the project is fragmented across multiple components, leading to conflicting state, Flashes of Unstyled Content (FOUC), and inconsistent behavior.

## Core Issues
1. **Redundant Logic**: `TopBar.tsx` contains its own theme state and uses the `theme` localStorage key, while the `ThemeProvider` uses `payload-theme`.
2. **Missing Initialization Script**: `InitTheme` is defined but not rendered in the `RootLayout`, causing the page to flash in light mode before the client-side theme transitions.
3. **Flicker on Load**: The `html { opacity: 0; }` logic is correct but fails because `InitTheme` is not running to set the `data-theme` attribute early enough.
4. **Hardcoded Colors**: Several components use literal `bg-white` or `text-black` instead of taking advantage of the Tailwind v4 theme variables.

## Steps to Fix

### 1. Refactor `TopBar.tsx` (Theme Integration)
- Remove the redundant `isDarkMode` state and `useEffect` theme initialization.
- Switch from local `localStorage` management (key: `theme`) to the central `ThemeProvider` via the `useTheme` hook.
- Update the theme toggle to use the global `setTheme` function.

### 2. Update `RootLayout` (`src/app/(frontend)/[locale]/layout.tsx`)
- Import and render `<InitTheme />` from `@/providers/Theme/InitTheme` inside the `<html>` or `<body>` tag.
- This ensures `data-theme` is set synchronously before the browser paints the initial HTML.

### 3. Polish `globals.css`
- Ensure smooth transitions for theme changes.
- Verify that `@custom-variant dark` correctly maps the `dark:` prefix to the `data-theme='dark'` state.

### 4. Audit Components for Dark Mode Support
- Review `SuchiDarta` and `Staffs` pages.
- Replace hardcoded background and text colors with Tailwind theme utilities (`bg-background`, `text-foreground`, `bg-card`, etc.).
- Specifically check the `SuchiDarta` tracking page and registration form.

### 5. Validation
- Run `pnpm run dev` and test theme persistence on page refresh.
- Check for FOUC (Flashes of Unstyled Content) during navigation.
- Ensure the theme switcher toggle consistently reflects the actual theme state.

## Implementation Details
- LocalStorage Key: `payload-theme` (System Standard)
- Theme Attribute: `data-theme="dark" | "light"`
- Tailwind Integration: `dark:` variant mapped to `[data-theme="dark"]`.

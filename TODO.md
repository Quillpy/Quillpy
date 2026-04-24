# Hover Animation Update — TODO

## Step 1: Update `src/styles/index.css`
- [x] Add `will-change: transform, box-shadow` to `.ui-hover`
- [x] Replace hardcoded shadow with theme variable `var(--shadow-color)`
- [x] Add subtle border-color transition on hover

## Step 2: Remove `ui-hover` from uninteractive elements
- [x] `src/app/components/tabs/AboutTab.tsx` — `AboutPanel` and interest chips
- [x] `src/app/components/tabs/WelcomeTab.tsx` — `WelcomeCard`
- [x] `src/app/components/tabs/SupportTab.tsx` — support items grid
- [x] `src/app/components/tabs/LogsTab.tsx` — log entry cards
- [x] `src/app/components/tabs/TerminalTab.tsx` — decorative window dots
- [x] `src/app/components/tabs/ProjectsTab.tsx` — stack tags and inner "View project" div
- [x] `src/app/components/tabs/ConnectTab.tsx` — form inputs

## Step 3: Test
- [x] Run dev server and verify interactive elements still hover, uninteractive ones do not


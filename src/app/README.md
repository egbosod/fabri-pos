# Norwegian POS System

A Point of Sale prototype, including the POS logon screens.

## Routes

```
/salg              Sales (default)
/priskontroll      Price check mode
/tidligere-kjop    Previous purchases
/login             Logon: username/password, or PIN via ?mode=pin&user=<name>
/login/two-factor  Two-factor step
/login/pin/change  Change / create PIN
```

The `/login` branch renders outside `RootLayout`, so it has no POS header, modals
or POS keyboard shortcuts. `LanguageProvider` and `SettingsProvider` live in
`App.tsx` and so span both branches; `POSProvider` is scoped to `RootLayout`.

## Login handoff

The login screens can't reach `POSContext` (it mounts inside `RootLayout`), so the
username is handed over through `utils/loginToken.ts`: login calls
`setLoginToken(username)` then navigates to `/salg`, and `POSContext` initialises
`currentUser` from `getLoginToken()`. The token lives in localStorage for 30 minutes.

Prototype credentials: password `1234`, PIN `1234`.

## Key Features

- Multiple switch user flows (A, B, C)
- Customer/project selection
- Product search and cart management
- Payment flow with multiple payment methods
- Design system with CSS variables
- Toggleable debug banner

## Settings & Debug

- Press `.` (period) to open Settings modal
- Press `d` to toggle debug banner
- Press `a` / `b` / `c` to switch user flow, `i` for the flow indicator, `h` to reset
- `Ctrl`+`L` to log out, `Ctrl`+`,` to simulate a card scan
- `utils/environmentNavigation.ts` still exposes `isFigmaMake()` / `getEnvironment()`
  for the debug banner

## Design System

All UI uses CSS variables from `/styles/globals.css`:

```css
/* Colors */
--primary, --secondary, --accent, --destructive
--foreground, --background, --card, --border

/* Typography */
--text-xs (11px), --text-sm (12px), --text-base (14px)
--text-lg (15px), --text-xl (17px), --text-2xl (24px)

/* Font: Montserrat (only) */
--font-weight-normal (400), --font-weight-semibold (600), --font-weight-bold (700)

/* Spacing & Borders */
--radius (5px), --radius-button, --radius-card, --radius-input
```

## Files Structure

```
/App.tsx                          Providers + router
/routes.tsx                       Route table
/components/                      POS components
/components/login/                Logon screens (ported from the Logon prototype)
/components/ui/                   shadcn-style primitives
/contexts/                        Language, Settings, POS
/imports/                         Figma-generated components
/imports/login/                   Figma-generated components for the logon screens
/pages/                           POS pages
/pages/login/                     Logon pages
/utils/loginToken.ts              Username handoff between login and POS
/styles/globals.css               Design system CSS variables
```

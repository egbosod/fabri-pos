# Norwegian POS System

A complete Point of Sale system with environment-aware navigation between prototypes.

## Quick Start

### Navigation System

The app automatically detects if it's running in **Figma Make** (unpublished) or **Published**, and navigates to the correct URLs.

```typescript
import { navigateToPrototype } from './utils/environmentNavigation';

// Automatically uses correct URL based on environment
navigateToPrototype('loginHome');
```

**Debug in browser console:**
```javascript
debugEnvironment()
```

**Debug banner in app:**
Press `d` key to toggle debug info overlay.

### Documentation

- **[NAVIGATION_README.md](./NAVIGATION_README.md)** - How navigation works
- **[NAVIGATION_QUICK_REFERENCE.md](./NAVIGATION_QUICK_REFERENCE.md)** - Quick reference guide
- **[config/README.md](./config/README.md)** - URL configuration

## Key Features

- ✅ Automatic environment detection (Make vs Published)
- ✅ Environment-aware prototype navigation
- ✅ Multiple switch user flows (A, B, C)
- ✅ Customer/project selection
- ✅ Product search and cart management
- ✅ Payment flow with multiple payment methods
- ✅ Design system with CSS variables
- ✅ Toggleable debug banner

## Settings & Debug

- Press `.` (period) to open Settings modal
- Press `d` to toggle debug banner
- `debugEnvironment()` in console for detailed info

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
--radius (5px)
```

## URL Configuration

All prototype URLs are in `/config/links.ts`.

Update URLs there to change navigation targets.

## Files Structure

```
/App.tsx                              Main app component
/components/                          UI components
/contexts/                            React contexts (Language, Settings)
/config/links.ts                      URL configuration
/utils/environmentNavigation.ts       Navigation system (don't edit)
/styles/globals.css                   Design system CSS variables
```

## TODO

- [ ] Update `YOUR_POS_PROJECT_ID` in `/config/links.ts` with actual project ID
- [ ] Test navigation in both Make and Published environments

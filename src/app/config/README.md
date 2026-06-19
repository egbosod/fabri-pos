# Link Configuration

This folder contains URL configuration for navigation between prototypes.

## File: `links.ts`

Defines all URLs for environment-aware navigation.

```typescript
export const PROTOTYPE_LINKS = {
  loginHome: {
    make: "https://www.figma.com/make/PROJECT_ID/...",    // Unpublished
    published: "https://published-url.figma.site"         // Published
  },
  // ... more links
} as const;
```

## Configured Links

### Logon Prototype ✅

| Key | Description |
|-----|-------------|
| `loginHome` | Main login screen |
| `loginTwoFactor` | Two-factor authentication |
| `loginWithPIN` | PIN login mode |

**URLs:**
- Unpublished: `https://www.figma.com/make/Cd1j3SNXtYI6iGAG7g30hW/...`
- Published: `https://text-blend-58151422.figma.site`

### POS Prototype (TODO)

| Key | Description |
|-----|-------------|
| `pos` | Standard POS (Flow A) |
| `posFlowA` | POS with Flow A |
| `posFlowB` | POS with Flow B |
| `posFlowC` | POS with Flow C |

**TODO:** Replace `YOUR_POS_PROJECT_ID` with actual project ID

## Usage

```typescript
import { navigateToPrototype } from '../utils/environmentNavigation';

navigateToPrototype('loginHome');     // Auto-selects correct URL
navigateToPrototype('loginWithPIN');  // Based on environment
```

## Add New Link

1. Edit `links.ts`
2. Add new entry:

```typescript
export const PROTOTYPE_LINKS = {
  // ... existing ...
  
  myNewLink: {
    make: "https://www.figma.com/make/PROJECT_ID/...",
    published: "https://published-url.figma.site",
  },
} as const;
```

3. Use in code:

```typescript
navigateToPrototype('myNewLink'); // TypeScript autocomplete works!
```

## Debug

```javascript
debugEnvironment() // Shows all URLs for current environment
```

## Related

- `/NAVIGATION_README.md` - How the system works
- `/NAVIGATION_QUICK_REFERENCE.md` - Quick reference guide

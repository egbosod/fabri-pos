# Environment-Aware Navigation System

## What It Does

Automatically detects if your prototype is running in **Figma Make** (unpublished) or **Published**, and navigates to the correct URLs.

## How It Works

### Detection Method

**Cross-origin detection** (reliable):
- **Figma Make**: Outer page (figma.com) and iframe (figma.com) = same origin → can read parent URL
- **Published**: Outer page (figma.site) and iframe (figma.com) = cross origin → cannot read parent URL (throws)

```
Try to read window.top.location.href
  ↓
  ├─ Success & contains /make/ → Figma Make (unpublished)
  ├─ Success & contains figma.site → Published  
  └─ Throws DOMException → Published (cross-origin)
```

## Usage

### Navigate Between Prototypes

```typescript
import { navigateToPrototype } from './utils/environmentNavigation';

// Simple - just call it
navigateToPrototype('loginHome');      // Goes to Logon main screen
navigateToPrototype('loginWithPIN');   // Goes to Logon PIN mode
```

The system automatically picks the right URL based on environment.

### Debug

```javascript
// In browser console
debugEnvironment()
```

Shows:
- Current environment (make/published)
- All configured URLs
- What URL will be used for each destination

## Configuration

All URLs are in `/config/links.ts`:

```typescript
export const PROTOTYPE_LINKS = {
  loginHome: {
    make: "https://www.figma.com/make/PROJECT_ID/...",
    published: "https://published-url.figma.site",
  },
  // Add more destinations as needed
};
```

**To update URLs**: Edit this one file, all navigation updates automatically.

## Files

- `/utils/environmentNavigation.ts` - Core detection and navigation logic (don't edit)
- `/config/links.ts` - URL configuration (edit this to add/update URLs)

## Available Destinations

Current configured destinations in POS prototype:

- `loginHome` - Logon main screen
- `loginWithPIN` - Logon with PIN mode  
- `loginTwoFactor` - Logon 2FA screen
- `logon` - Alias for loginHome
- `logonPin` - Alias for loginWithPIN

## Example: User Logout Flow

### In Figma Make
```
1. User clicks "Logg av"
2. navigateToPrototype('loginHome') called
3. System detects: Running in Make (can read parent, has /make/)
4. Uses: PROTOTYPE_LINKS.loginHome.make
5. Navigates to: https://www.figma.com/make/.../Logon
```

### Published
```
1. User clicks "Logg av"  
2. navigateToPrototype('loginHome') called
3. System detects: Published (cross-origin exception)
4. Uses: PROTOTYPE_LINKS.loginHome.published
5. Navigates to: https://text-blend-58151422.figma.site
```

**Same code → Different URLs → Always correct!**

## Benefits

✅ No manual URL switching between environments  
✅ Centralized configuration (one place to update)  
✅ Type-safe (TypeScript autocomplete)  
✅ Works in both Make and Published  
✅ Consistent with design system (CSS variables)

## Testing Checklist

### Figma Make
- [ ] Open prototype in Make
- [ ] Run `debugEnvironment()` → should show "make"
- [ ] Click logout → should go to unpublished Logon
- [ ] URL should contain `/make/`

### Published
- [ ] Open published prototype
- [ ] Run `debugEnvironment()` → should show "published"  
- [ ] Click logout → should go to published Logon
- [ ] URL should be `.figma.site`

## Troubleshooting

**Problem**: Wrong environment detected  
**Solution**: Run `debugEnvironment()` and check:
- Can it read parent window?
- What's the parent URL?
- Does URL contain `/make/`?

**Problem**: Navigation doesn't work  
**Solution**: Check `/config/links.ts` has correct URLs for both make and published

**Problem**: TypeScript error on prototype key  
**Solution**: Make sure the key exists in `/config/links.ts` and file ends with `as const`

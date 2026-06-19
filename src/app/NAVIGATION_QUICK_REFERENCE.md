# Navigation Quick Reference

## Import

```typescript
import { navigateToPrototype } from './utils/environmentNavigation';
```

## Navigate

```typescript
navigateToPrototype('loginHome');      // Logon main
navigateToPrototype('loginWithPIN');   // Logon PIN mode
navigateToPrototype('loginTwoFactor'); // Logon 2FA
```

## Debug (Browser Console)

```javascript
debugEnvironment()
```

Output shows:
- Environment: make or published
- All URLs that will be used
- Can read parent window: yes/no
- Parent URL (if readable)

## Add New Destination

Edit `/config/links.ts`:

```typescript
export const PROTOTYPE_LINKS = {
  // ... existing ...
  
  myNewScreen: {
    make: "https://www.figma.com/make/PROJECT_ID/...",
    published: "https://your-published-url.figma.site",
  },
} as const;
```

Then use it:
```typescript
navigateToPrototype('myNewScreen');
```

## Environment Detection Logic

```
1. Try to read window.top.location.href
2. IF throws DOMException → Published (cross-origin)
3. IF readable and contains "figma.site" → Published
4. IF readable and contains "/make/" → Make
5. ELSE → Published (safe default)
```

## Common Scenarios

### Logout Button
```typescript
<button onClick={() => navigateToPrototype('loginHome')}>
  Logg av
</button>
```

### Switch User with PIN
```typescript
<button onClick={() => navigateToPrototype('loginWithPIN')}>
  PIN
</button>
```

### Conditional Navigation
```typescript
const handleSwitch = (usePin: boolean) => {
  navigateToPrototype(usePin ? 'loginWithPIN' : 'loginHome');
};
```

## Files to Know

- `/config/links.ts` - **Edit this** to add/update URLs
- `/utils/environmentNavigation.ts` - **Don't edit** - core logic
- `/components/EnvDebugBanner.tsx` - **Press 'd'** to toggle debug banner

## Debug Banner

Press `d` key to toggle debug banner showing:
- Current environment
- Active links
- Quick navigation for testing

## That's It!

Three things to remember:
1. Use `navigateToPrototype('key')` for navigation
2. Add URLs to `/config/links.ts`
3. Run `debugEnvironment()` to debug

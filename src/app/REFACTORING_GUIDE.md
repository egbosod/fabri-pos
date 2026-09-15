# CustomerSelectionModal CSS Variables Refactoring Guide

## Overview
This guide documents the systematic refactoring of `CustomerSelectionModal.tsx` to use design system CSS variables instead of hard-coded values, following the guidelines in `/guidelines/Guidelines.md`.

## Design System Alignment

### Input Field States (per Guidelines.md)
- **Normal**: Neutral border color → `border-border`
- **Tab-Focused**: Blue 60 highlighted border → `border-primary` with `border-2`
- **Active**: Filled with Blue 60 → `bg-primary`
- **Disabled**: Gray border and text → `border-muted` / `text-muted-foreground`

## Completed Refactoring

### ✅ Nexstep/Aspect4/IFS Layout - "Generelt" Tab
- Customer Field (input + dropdown)
- Project Field (input)
- Customer Reference Field
- Contact Person & Requisition Number Fields

## CSS Variable Mapping Reference

### Colors

| Hard-coded Value | CSS Variable | Tailwind Class | Usage |
|---|---|---|---|
| `#0d97fc` | `var(--primary)` | `border-primary`, `bg-primary`, `text-primary` | Focus borders, primary buttons |
| `#d5d5d7` | `var(--border)` | `border-border` | Normal input borders |
| `#e6e6e8` | `var(--border)` | `border-border` | Lighter borders (dropdown dividers) |
| `#090914` | `var(--foreground)` | `text-foreground` | Primary text content |
| `#22222c` | `var(--foreground)` | `text-foreground` | Label text |
| `#6b6b72` | `var(--muted-foreground)` | `text-muted-foreground` | Placeholder, muted text |
| `#42424a` | `var(--secondary-foreground)` | `text-secondary-foreground` | Secondary text |
| `white`, `#ffffff` | `var(--card)` | `bg-card` | Input backgrounds, cards |
| `gray-50` | N/A | `bg-secondary/50` | Hover states |

### Typography

| Hard-coded Value | CSS Variable | Tailwind Class |
|---|---|---|
| `text-[14px]` | `var(--text-base)` | `text-[var(--text-base)]` |
| `text-[12px]` | `var(--text-sm)` | `text-[var(--text-sm)]` |
| `text-[15px]` | `var(--text-lg)` | `text-[var(--text-lg)]` |
| `text-[17px]` | `var(--text-xl)` | `text-[var(--text-xl)]` |
| `text-[24px]` | `var(--text-2xl)` | `text-[var(--text-2xl)]` |
| `font-['Montserrat:Regular',sans-serif] font-normal` | (remove) | CSS handles this globally |
| `font-['Montserrat:Bold',sans-serif] font-bold` | (remove extra) | `font-bold` |

### Borders & Radius

| Hard-coded Value | CSS Variable | Tailwind Class |
|---|---|---|
| `rounded-[5px]` | `var(--radius)` | `rounded-[var(--radius)]` |
| `rounded-[3px]` | `var(--radius-sm)` | `rounded-[var(--radius-sm)]` |
| `rounded-[4px]` | `var(--radius-sm)` | `rounded-[var(--radius-sm)]` |

### Shadows

| Hard-coded Value | CSS Variable | Tailwind Class |
|---|---|---|
| `shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)]` | `var(--elevation-sm)` | `shadow-[var(--elevation-sm)]` |

## Bulk Find-and-Replace Patterns

### Pattern 1: Input Backgrounds
```tsx
// OLD:
bg-white

// NEW:
bg-card
```

### Pattern 2: Focus Borders
```tsx
// OLD:
${fieldFocused ? 'border-2 border-[#0d97fc]' : 'border border-[#d5d5d7]'}

// NEW:
${fieldFocused ? 'border-2 border-primary' : 'border border-border'}
```

### Pattern 3: Text Colors - Filled State
```tsx
// OLD:
${hasValue ? 'text-[#090914]' : 'text-[#42424a]'}

// NEW:
${hasValue ? 'text-foreground' : 'text-secondary-foreground'}
```

### Pattern 4: Text Colors - Placeholder/Muted
```tsx
// OLD:
text-[#6b6b72]

// NEW:
text-muted-foreground
```

### Pattern 5: Border Radius
```tsx
// OLD:
rounded-[5px]

// NEW:
rounded-[var(--radius)]

// OLD:
rounded-[3px]
// or
rounded-[4px]

// NEW:
rounded-[var(--radius-sm)]
```

### Pattern 6: Font Size
```tsx
// OLD:
text-[14px]

// NEW:
text-[var(--text-base)]

// OLD:
text-[12px]

// NEW:
text-[var(--text-sm)]
```

### Pattern 7: Font Declaration Removal
```tsx
// OLD:
font-['Montserrat:Regular',sans-serif] font-normal

// NEW:
(remove completely - CSS handles this)

// OLD:
font-['Montserrat:Bold',sans-serif] font-bold

// NEW:
font-bold
```

### Pattern 8: Border Colors
```tsx
// OLD:
border-[#e6e6e8]

// NEW:
border-border
```

### Pattern 9: Dropdown Hover States
```tsx
// OLD:
hover:bg-gray-50

// NEW:
hover:bg-secondary/50
```

### Pattern 10: Shadows
```tsx
// OLD:
shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)]

// NEW:
shadow-[var(--elevation-sm)]
```

## Remaining Sections to Update

### 1. AX Layout (lines ~565-720)
- Customer Field
- Project Field
- Contact Person Field
- Create Contact Person button
- Requisition Number Field

### 2. Trygg2000 Layout (lines ~731-900)
- Customer Field
- Project Field  
- Customer Reference & Requisition fields
- Contact Person Reference & Contact Person fields

### 3. Leveringsadresse Tab
- All delivery address input fields

### 4. OIO Information Tab (Aspect4 DK)
- CVR Number
- EAN Location Number
- EAN Customer Number
- Agreement ID

### 5. Modal Header & Chrome
- Modal title text
- Tab styling
- Border decorations

### 6. SVG Fill Colors
Some SVGs have hard-coded fills that should reference CSS variables:
```tsx
// OLD:
fill="var(--fill-0, #22222C)"

// NEW:
fill="var(--fill-0, var(--foreground))"
```

## Benefits of This Refactoring

1. **Centralized Theming**: Update design system by editing only `/styles/globals.css`
2. **Dark Mode Ready**: CSS variables already defined for `.dark` class
3. **Design System Compliance**: Follows `/guidelines/Guidelines.md` button/input state rules
4. **Maintainability**: No more scattered hard-coded colors
5. **Consistency**: All UI components use same color tokens

## Testing Checklist

After completing refactoring:

- [ ] Verify all input focus states show blue border (`border-primary`)
- [ ] Verify all normal states show gray border (`border-border`)
- [ ] Verify text colors update correctly on input
- [ ] Verify dropdown hover states work
- [ ] Verify placeholder text is muted
- [ ] Verify labels use correct font weight and size
- [ ] Test all three ERP scenarios (Nexstep, AX, Trygg2000)
- [ ] Test both tabs (Generelt, Leveringsadresse)
- [ ] Verify modal remains functional with Esc key
- [ ] Verify Create New Project modal styling

## Next Steps

1. Complete AX layout refactoring
2. Complete Trygg2000 layout refactoring
3. Update tab content (Leveringsadresse, OIO)
4. Update modal header/chrome
5. Update SVG fills where applicable
6. Run full testing checklist

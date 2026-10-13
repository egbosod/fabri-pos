# BrandSync dark mode: WCAG contrast findings

Scope: Settings → Design System → BrandSync + Dark mode. Rules: WCAG 2.2 AA —
text 4.5:1 (1.4.3), UI component boundaries / focus indicators 3:1 (1.4.11).
Only existing BrandSync colour tokens are used; no new scales were invented.
Ratios computed from the token hex values (`brandsync-tokens`, via the BrandSync MCP).
Implementation: `src/styles/brandsync.css`.

## Where BrandSync's own dark mapping fails

| BrandSync token (dark) | Pair | Ratio | Result |
|---|---|---|---|
| `color-primary-default` / `text-action` (brand-400) | text on surface-raised (neutral-900) | 4.32 | Fails 4.5 |
| `text-on-action` stays fine | black on brand-400 | 5.97 | Passes |
| white on brand-400 / error-400 | white text on fill | 3.52 / 3.50 | Fails (hence black on-action text) |
| `color-error-default` (error-400) | text on neutral-900 | ~4.3 | Fails (4.87 on neutral-950 only) |
| `border-default` (neutral-800) | vs neutral-950 / neutral-900 | 1.54 / 1.37 | Fails 3:1 as a control boundary |
| `border-neutral-container` (neutral-700) | vs neutral-950 / neutral-900 | 2.21 / 1.97 | Fails 3:1 as a control boundary |
| `text-muted` (neutral-300) on neutral-800 hover | | 4.51 | Passes, barely |

## What we use instead (all existing tokens)

| App variable | Token | Why |
|---|---|---|
| `--primary` | brand-300 | 6.20 as text on neutral-900; black on it is 8.56 for buttons |
| `--destructive` | error-300 (BrandSync `text-error`) | 6.24 on neutral-900; black on it is 8.62 |
| `--input` (control borders), outline button, checkbox, radio, switch borders | neutral-500 (BrandSync `border-neutral-active`) | 3.68 on neutral-950, 3.28 on neutral-900 |
| Focus ring | brand-400 | 4.85 on neutral-950, 4.32 on neutral-900 (≥3) |
| Text | white on neutral-950/900 | 17.07 / 15.20 |
| Muted text, table headers | neutral-300 | 6.94 / 6.18 on 950 / 900 |

## Known gaps (not fixed)

- **Row/card dividers use `border-default` (neutral-800), 1.4:1.** Treated as decorative
  (not required to identify a control), so exempt from 1.4.11. If a divider must carry
  meaning, BrandSync has no darker-than-neutral-800 step that reaches 3:1 except neutral-500.
- **Disabled text** (`text-on-disabled`, neutral-600 on neutral-900, 2.56) fails, but WCAG
  exempts disabled controls.
- **Neutral-500 border on a neutral-800 hover row is 2.39:1.** Only during hover.
- **Inline hard-coded colours** (imported Figma screens, e.g. header and main menu) don't
  follow the variables, so they are not covered by this pass and may stay light or fail.
- **Light mode** was not audited; one fix made (table header uses neutral-600, not neutral-500).
- Not verified in a browser or with an automated checker (axe/Lighthouse) yet.

## Suggested upstream ask for BrandSync

Adopt brand-300 / error-300 as the dark-mode default for text-bearing primary/error, and
add a dark-mode control-border token that reaches 3:1 on `surface-raised`.

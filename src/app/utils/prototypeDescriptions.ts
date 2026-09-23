import type { CSSProperties } from 'react';

// Shared, English-only description strings for the A/B/C prototype shortcut.
// Used by both the RootLayout keyboard-shortcut toast and the "Prototype
// {letter}" badge's hover tooltip, so the two never drift out of sync.
// Deliberately separate from the 4-locale app i18n and from SettingsModal's
// own NO/EN panel strings — this badge/toast layer has always been
// English-only prototyper-facing text.

export const FLOW_DESCRIPTIONS: Record<'A' | 'B' | 'C', string> = {
  A: 'In-menu PIN / Password',
  B: 'Modal with PIN / Password tabs',
  C: 'In-menu with navigation to login',
};

export const PRICE_CHECK_LOCK_DESCRIPTIONS: Record<'A' | 'B' | 'C', string> = {
  A: 'Price check: no customer lock',
  B: 'Price check: locked, "Legg til varer i salg" shortcut in the modal',
  C: 'Price check: locked (button reads "Lukk")',
};

// ── Two toast families, deliberately kept apart ──────────────────────────────
// Every toast in this prototype belongs to exactly one of two visual families,
// and they must never be confusable at a glance:
//
//   PROTOTYPE (solid pink)  — something about the *prototyping layer* changed:
//     the A/B/C switch, the flow indicator, a full reset, a settings-dependent
//     shortcut, the collaborator share link. Same pink as the "Prototype
//     {letter}" badge in the header.
//   POS (token-based card)  — a real Fabri POS product flow said something:
//     items added to a sale, PIN validation. Follows the app's own theme
//     tokens, so it moves with dark mode / the WCAG overrides.
//
// Any new toast should spread one of the two below. Nothing should fall back to
// sonner's bare default, because the default looks like the POS family.

/** The prototyping layer's one accent colour — also the header badge's pink. */
export const PROTOTYPE_PINK = '#FF00FF';

export const PROTOTYPE_TOAST_STYLE: CSSProperties = {
  background: PROTOTYPE_PINK,
  color: '#ffffff',
  border: 'none',
};

/**
 * Spread this into any prototype-layer `toast(...)` call. The
 * `descriptionClassName` is not optional: sonner renders descriptions in muted
 * grey, which is unreadable on the pink background.
 */
export const PROTOTYPE_TOAST_OPTS = {
  style: PROTOTYPE_TOAST_STYLE,
  descriptionClassName: '!text-white',
} as const;

/**
 * Spread this into any Fabri POS product-flow `toast(...)` call. Built from the
 * app's design tokens rather than literals so it follows the active theme.
 */
export const POS_TOAST_STYLE: CSSProperties = {
  background: 'var(--card)',
  color: 'var(--foreground)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
};

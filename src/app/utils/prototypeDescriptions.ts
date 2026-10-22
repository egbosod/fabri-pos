import type { CSSProperties } from 'react';
import { toast } from 'sonner@2.0.3';

// Shared, English-only description strings for the A/B/C prototype shortcut.
// Used by both the RootLayout keyboard-shortcut toast and the "Prototype
// {letter}" badge's hover tooltip, so the two never drift out of sync.
// Deliberately separate from the 4-locale app i18n and from SettingsModal's
// own NO/EN panel strings — this badge/toast layer has always been
// English-only prototyper-facing text.

export const FLOW_DESCRIPTIONS: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: 'In-menu PIN / Password',
  B: 'Modal with PIN / Password tabs',
  C: 'In-menu with navigation to login',
  D: 'Copy of A (In-menu PIN / Password), "Get customer" variant',
};

export const PRICE_CHECK_LOCK_DESCRIPTIONS: Record<'A' | 'B' | 'C' | 'D', string> = {
  A: 'Price check: no customer lock',
  B: 'Price check: locked, "Legg til varer i salg" shortcut in the modal',
  C: 'Price check: locked (button reads "Lukk")',
  D: 'Price check: no customer lock',
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
// The two families also live in different corners: POS toasts (and the
// hand-built Figma ones) sit bottom-right, pink prototype toasts sit
// bottom-left, so a prototype notification can never cover or queue behind a
// real POS notification.
//
// Any new toast should spread one of the two below. Nothing should fall back to
// sonner's bare default, because the default looks like the POS family.

/** The prototyping layer's one accent colour — also the header badge's pink. */
export const PROTOTYPE_PINK = '#FF00FF';

export const PROTOTYPE_TOAST_STYLE: CSSProperties = {
  background: PROTOTYPE_PINK,
  color: '#ffffff',
  border: 'none',
  // The shared <Toaster> in RootLayout insets every toast with right: 30px for
  // the bottom-right POS corner. Mirror that inset on the left and release the
  // right edge, otherwise a left-side toast would be pinned from both sides.
  left: '30px',
  right: 'auto',
};

/**
 * Base options for a pink toast. Prefer `prototypeToast()` below — this is
 * exported only for the rare call that needs to merge in extra sonner options.
 * The `descriptionClassName` is not optional: sonner renders descriptions in
 * muted grey, which is unreadable on the pink background.
 */
export const PROTOTYPE_TOAST_OPTS = {
  style: PROTOTYPE_TOAST_STYLE,
  descriptionClassName: '!text-white',
  position: 'bottom-left',
} as const;

const PROTOTYPE_TOAST_ID = 'prototype-toast';

/**
 * Fire a pink prototype-layer toast.
 *
 * This is the only way a pink toast should be raised, and it is deliberately
 * the one toast path in the app with **no access to LanguageContext**. Pink
 * toasts are permanently English: they address the prototyper driving the demo,
 * not the shop floor, and they must not shift when the product language or the
 * SettingsModal panel language changes. Because this module imports no i18n and
 * takes its text as plain string literals, there is no wire by which a language
 * change could reach them — that is the point of routing every call through
 * here rather than spreading the style into a bare `toast()`.
 *
 * Pass English literals. Quoting a Norwegian on-screen label inside an English
 * sentence is fine — e.g. 'trigger "Søk kundekort"' — because it names a
 * control the reader is looking at, not prose being translated.
 *
 * Real Fabri POS flows use `posToast` (utils/posToast.tsx), translated via
 * `t(...)` as normal.
 */
export function prototypeToast(
  title: string,
  description?: string,
  options?: { duration?: number },
): void {
  toast(title, {
    // One shared id = one slot: a new pink toast replaces the previous one in
    // place instead of stacking above it. Pressing A/B/C or scanning repeatedly
    // would otherwise grow the stack upward (and sonner expands it on hover)
    // until it covers the customer modal.
    id: PROTOTYPE_TOAST_ID,
    description,
    duration: options?.duration ?? 2500,
    ...PROTOTYPE_TOAST_OPTS,
  });
}

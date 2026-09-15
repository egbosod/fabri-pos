/**
 * Environment-aware navigation utilities
 *
 * HOW ENVIRONMENT IS DETECTED
 * ─────────────────────────────────────────────────────────────────────────────
 * Both the Make editor preview and the published prototype render the React app
 * inside an iframe served from figma.com. This means window.location.hostname
 * always reads "www.figma.com" and cannot be used as a differentiator on its own.
 *
 * The reliable signal is CROSS-ORIGIN ACCESS:
 *
 *   Make (figma.com outer → figma.com iframe)
 *     Same origin → window.top.location.href is readable.
 *     That URL will contain "/make/" → we know we're in Make.
 *
 *   Published (figma.site outer → figma.com iframe)
 *     Cross origin → window.top.location.href THROWS a DOMException.
 *     The catch block → we know we're published.
 *
 * Edge cases also handled:
 *   • If the app IS the top-level window (no iframe wrapping at all):
 *       – figma.site hostname  → published
 *       – /make/ in own URL    → make
 *   • localhost / 127.0.0.1 / 192.168.x → treat as make (local dev)
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { PROTOTYPE_LINKS } from '../config/links';

/**
 * Returns true  → Figma Make editor (unpublished)
 * Returns false → Published figma.site prototype
 */
export function isFigmaMake(): boolean {
  const href     = window.location.href;
  const hostname = window.location.hostname;

  // ── 1. Fast paths when the app itself is the top-level window ──────────────

  // Running directly on figma.site → definitely published
  if (hostname === 'figma.site' || hostname.endsWith('.figma.site')) {
    return false;
  }

  // Local development server → treat as Make
  if (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.')
  ) {
    return true;
  }

  // ── 2. Try to read the parent (top) window URL ─────────────────────────────
  //
  // Make:      outer is figma.com  →  SAME origin  →  readable  →  has /make/
  // Published: outer is figma.site →  CROSS origin →  throws    →  catch = published
  try {
    const topHref = window.top ? window.top.location.href : href;

    // Parent URL is on figma.site → published
    if (topHref.includes('figma.site')) return false;

    // Parent URL (or our own) explicitly contains /make/ → Make editor
    if (topHref.includes('/make/') || href.includes('/make/')) return true;

    // We could read the parent but it matched neither pattern.
    // Fall through to heuristic below.
  } catch {
    // ─────────────────────────────────────────────────────────────────────────
    // Cross-origin exception:
    // The parent window refused to expose its URL, which means the outer page
    // is on a DIFFERENT origin than this iframe.
    //
    // In Make:      figma.com outer + figma.com iframe → same origin → no throw
    // In Published: figma.site outer + figma.com iframe → cross origin → throws HERE
    //
    // Therefore: if we land here, we are in the PUBLISHED environment.
    // ─────────────────────────────────────────────────────────────────────────
    return false; // published
  }

  // ── 3. Fallback heuristic ──────────────────────────────────────────────────
  // We could read the parent but got no decisive signal.
  // Check own URL for /make/ as a last resort.
  if (href.includes('/make/')) return true;

  // Safe default: assume published
  return false;
}

// Get the current environment type
export function getEnvironment(): 'make' | 'published' {
  return isFigmaMake() ? 'make' : 'published';
}

/**
 * Prototype URL configurations – imported from centralized config
 */
const PROTOTYPE_URLS = PROTOTYPE_LINKS;

export type PrototypeKey = keyof typeof PROTOTYPE_URLS;

/**
 * Options for navigating to a prototype
 */
export interface NavigationOptions {
  /** User context to pass to the target prototype */
  userContext?: {
    username: string;
    /** Additional metadata */
    metadata?: Record<string, any>;
  };
  /** Additional query parameters to append */
  queryParams?: Record<string, string>;
}

/**
 * Get environment-aware URL for a specific prototype
 */
export function getPrototypeUrl(prototypeKey: PrototypeKey): string {
  const env = getEnvironment();
  return PROTOTYPE_URLS[prototypeKey][env];
}

/**
 * Navigate to another prototype using environment-aware URL.
 * Always navigates the TOP window so Figma's chrome is replaced, not just the iframe.
 */
export function navigateToPrototype(prototypeKey: PrototypeKey, options?: NavigationOptions): void {
  let url = getPrototypeUrl(prototypeKey);

  // Append user context as query parameters if provided
  if (options?.userContext) {
    const { username, metadata } = options.userContext;
    const userContextQuery = `userContext=${encodeURIComponent(JSON.stringify({ username, metadata }))}`;
    const separator = url.includes('?') ? '&' : '?';
    url += `${separator}${userContextQuery}`;
  }

  // Append additional query parameters if provided
  if (options?.queryParams) {
    const queryParams = new URLSearchParams(options.queryParams);
    const separator = url.includes('?') ? '&' : '?';
    url += `${separator}${queryParams.toString()}`;
  }

  try {
    if (window.top) {
      window.top.location.href = url;
    } else {
      window.location.href = url;
    }
  } catch {
    // Cross-origin top window – open in a new tab as fallback
    window.open(url, '_blank');
  }
}

/**
 * Debug helper – call debugEnvironment() in the browser console to inspect.
 */
export function debugEnvironment(): void {
  const hostname = window.location.hostname;
  const href     = window.location.href;
  let parentHref = '(cross-origin – cannot read)';
  let canReadParent = false;
  try {
    if (window.top) {
      parentHref = window.top.location.href;
      canReadParent = true;
    }
  } catch { /* cross-origin */ }

  console.log('=== Environment Navigation Debug ===');
  console.log('this window hostname :', hostname);
  console.log('this window href     :', href);
  console.log('parent href          :', parentHref);
  console.log('can read parent      :', canReadParent);
  console.log('isFigmaMake()        :', isFigmaMake());
  console.log('getEnvironment()     :', getEnvironment());
  console.log('\nResolved prototype URLs:');
  (Object.keys(PROTOTYPE_URLS) as PrototypeKey[]).forEach(key => {
    console.log(`  ${key} →`, getPrototypeUrl(key));
  });
  console.log('====================================');
}

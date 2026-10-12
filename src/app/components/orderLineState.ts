/**
 * Order-line swipe states, shared by both swipeable row components.
 *
 * Resting:  normal · returned · deleted
 * Armed:    return · regret-return · delete · undo-delete
 *           (a swipe has revealed an action panel; tapping the panel confirms)
 * Flash:    return-success · regret-return-success · delete-success · undo-delete-success
 *           (the confirmed panel, shown briefly before settling)
 */
export type OrderLineState =
  | 'normal'
  | 'return'
  | 'return-success'
  | 'returned'
  | 'regret-return'
  | 'regret-return-success'
  | 'delete'
  | 'delete-success'
  | 'deleted'
  | 'undo-delete'
  | 'undo-delete-success';

/** What the line currently *is* for totals and counts, whatever its panel is doing. */
export type OrderLineBase = 'normal' | 'returned' | 'deleted';

/** How long a confirmed panel stays up before the row settles. */
export const SUCCESS_FLASH_MS = 800;

/** Width of a revealed action panel; the row rests this far across while armed. */
export const PANEL_WIDTH = 258;

export type PanelKind = 'return' | 'regret-return' | 'delete' | 'undo-delete';

const BASE: Record<OrderLineState, OrderLineBase> = {
  normal: 'normal',
  return: 'normal',
  'return-success': 'returned',
  returned: 'returned',
  'regret-return': 'returned',
  'regret-return-success': 'normal',
  delete: 'normal',
  'delete-success': 'deleted',
  deleted: 'deleted',
  'undo-delete': 'deleted',
  'undo-delete-success': 'normal',
};

export const baseState = (state: OrderLineState): OrderLineBase => BASE[state];

/** The panel an armed or flashing state shows, and which side of the row it sits on. */
const PANEL: Partial<Record<OrderLineState, { kind: PanelKind; success: boolean }>> = {
  return: { kind: 'return', success: false },
  'return-success': { kind: 'return', success: true },
  'regret-return': { kind: 'regret-return', success: false },
  'regret-return-success': { kind: 'regret-return', success: true },
  delete: { kind: 'delete', success: false },
  'delete-success': { kind: 'delete', success: true },
  'undo-delete': { kind: 'undo-delete', success: false },
  'undo-delete-success': { kind: 'undo-delete', success: true },
};

export const panelFor = (state: OrderLineState) => PANEL[state] ?? null;

export const panelSide = (kind: PanelKind): 'left' | 'right' =>
  kind === 'return' || kind === 'regret-return' ? 'left' : 'right';

/** Where the row rests: shifted across by one panel while armed or flashing. */
export const restOffset = (state: OrderLineState): number => {
  const panel = panelFor(state);
  if (!panel) return 0;
  return panelSide(panel.kind) === 'left' ? PANEL_WIDTH : -PANEL_WIDTH;
};

export const isArmed = (state: OrderLineState) => panelFor(state) !== null && !panelFor(state)!.success;
export const isFlashing = (state: OrderLineState) => panelFor(state)?.success === true;

/** Row content is struck through while a delete is pending, confirmed or settled. */
export const isStruck = (state: OrderLineState) =>
  state === 'delete' || state === 'delete-success' || state === 'deleted';

/** Tapping an armed panel confirms it. */
export const CONFIRMS_TO: Partial<Record<OrderLineState, OrderLineState>> = {
  return: 'return-success',
  'regret-return': 'regret-return-success',
  delete: 'delete-success',
  'undo-delete': 'undo-delete-success',
};

/** Tapping the row or swiping back closes an armed panel without confirming. */
export const CANCELS_TO: Partial<Record<OrderLineState, OrderLineState>> = {
  return: 'normal',
  'regret-return': 'returned',
  delete: 'normal',
  'undo-delete': 'deleted',
};

/** Where a confirmed panel settles once the flash is over. */
export const SETTLES_TO: Partial<Record<OrderLineState, OrderLineState>> = {
  'return-success': 'returned',
  'regret-return-success': 'normal',
  'delete-success': 'deleted',
  'undo-delete-success': 'normal',
};

/** The panel a swipe in the given direction would arm, or null if it does nothing here. */
export const armedBySwipe = (state: OrderLineState, direction: 'right' | 'left'): OrderLineState | null => {
  if (direction === 'right') return state === 'normal' ? 'return' : state === 'returned' ? 'regret-return' : null;
  return state === 'normal' ? 'delete' : state === 'deleted' ? 'undo-delete' : null;
};

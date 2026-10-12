import { Check, Redo2, Trash2, Undo2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  PANEL_WIDTH,
  baseState,
  isArmed,
  panelFor,
  panelSide,
  type OrderLineState,
  type PanelKind,
} from './orderLineState';

const GREEN = '#2e9e5b';
const ORANGE = '#ff8c21';
const RED = '#f24c35';

const PANEL_COLOR: Record<PanelKind, string> = {
  return: GREEN,
  'regret-return': ORANGE,
  delete: RED,
  'undo-delete': GREEN,
};

const PANEL_ICON: Record<PanelKind, typeof Undo2> = {
  return: Undo2,
  'regret-return': Redo2,
  delete: Trash2,
  'undo-delete': Undo2,
};

const PANEL_LABEL: Record<PanelKind, { idle: string; success: string }> = {
  return: { idle: 'return', success: 'returnSuccess' },
  'regret-return': { idle: 'regretReturn', success: 'regretReturnSuccess' },
  delete: { idle: 'delete', success: 'deleteSuccess' },
  'undo-delete': { idle: 'undoDelete', success: 'undoDeleteSuccess' },
};

interface SwipeActionPanelsProps {
  state: OrderLineState;
  /** Tapping an armed panel confirms it. */
  onConfirm: () => void;
}

/**
 * The two action panels that sit behind a swipeable row, one per side. Each
 * side shows the panel its swipe would arm for the line's current base state
 * (a returned line offers "Regret return", a deleted one "Undo delete"), or
 * the armed / confirmed panel when the state itself is showing one.
 */
export function SwipeActionPanels({ state, onConfirm }: SwipeActionPanelsProps) {
  const { t } = useLanguage();
  const base = baseState(state);
  const active = panelFor(state);

  const sides: Record<'left' | 'right', { kind: PanelKind; success: boolean }> = {
    left: { kind: base === 'returned' ? 'regret-return' : 'return', success: false },
    right: { kind: base === 'deleted' ? 'undo-delete' : 'delete', success: false },
  };
  if (active) sides[panelSide(active.kind)] = active;

  return (
    <div className="absolute inset-0" data-name="background">
      {(['left', 'right'] as const).map((side) => {
        const { kind, success } = sides[side];
        const Icon = success ? Check : PANEL_ICON[kind];
        const label = t(PANEL_LABEL[kind][success ? 'success' : 'idle'] as any);
        const armed = !!active && panelSide(active.kind) === side && isArmed(state);
        return (
          <div
            key={side}
            className={`absolute top-0 h-full ${side === 'left' ? 'left-0' : 'right-0'}`}
            style={{
              width: PANEL_WIDTH + 72,
              backgroundColor: PANEL_COLOR[kind],
              borderRadius: 'var(--radius)',
              cursor: armed ? 'pointer' : 'default',
            }}
            data-name={`panel-${side}`}
            onClick={armed ? onConfirm : undefined}
          >
            <div
              className={`flex h-full items-center gap-[14px] px-[22px] ${side === 'left' ? '' : 'ml-auto flex-row-reverse justify-start'}`}
              style={{ width: PANEL_WIDTH }}
            >
              <Icon className="size-6 shrink-0 text-white" strokeWidth={2} aria-hidden />
              <span className="font-['Montserrat',sans-serif] text-[14px] text-nowrap text-white" style={{ fontWeight: 'var(--font-weight-medium)' }}>
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

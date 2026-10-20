import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ParkingSquare, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Switch } from './ui/switch';
import type { ParkedSale } from '../contexts/POSContext';

interface ParkedSalesPanelProps {
  sales: ParkedSale[];
  currentUser: string;
  onRestore: (id: string) => void;
  onClose: () => void;
  /** 'dropdown' hangs under the header toolbar; 'modal' is centred with a title (Prototype B). */
  variant?: 'dropdown' | 'modal';
}

const money = (n: number) =>
  n.toLocaleString('no-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(/−/g, '-');

const stamp = (ms: number) => {
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)} @ ${p(d.getHours())}:${p(d.getMinutes())}`;
};

const COLS = '48px 1.3fr 1.5fr 0.8fr 1fr 0.9fr 48px';

/**
 * Dropdown under the toolbar's park button: every parked sale, pick one and
 * restore it. Mirrors the Fabri list — select with the radio, chevron expands lines.
 */
export function ParkedSalesPanel({ sales, currentUser, onRestore, onClose, variant = 'dropdown' }: ParkedSalesPanelProps) {
  const isModal = variant === 'modal';
  const { t } = useLanguage();
  const [onlyMine, setOnlyMine] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const rows = useMemo(
    () =>
      [...sales]
        .filter((s) => !onlyMine || s.parkedBy === currentUser)
        .sort((a, b) => b.parkedAt - a.parkedAt),
    [sales, onlyMine, currentUser],
  );

  const linesOf = (s: ParkedSale) => [
    ...s.addedItems.map((i, idx) => ({ key: `a-${idx}`, name: i.name, sku: i.sku, quantity: i.quantity, unit: i.unit, price: i.price, discount: i.discount, total: i.total })),
    ...s.orderGroups.flatMap((g) =>
      g.items.filter((i) => !i.isDeleted).map((i, idx) => ({ key: `${g.id}-${idx}`, name: i.name, sku: i.sku, quantity: i.quantity, unit: i.unit, price: i.price, discount: i.discount ?? 0, total: i.total })),
    ),
  ];

  const cell = { fontSize: 'var(--text-base)', color: 'var(--foreground)' } as const;
  const head = { fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' } as const;

  return (
    <>
      <div className={`fixed inset-0 z-40${isModal ? ' bg-black/50' : ''}`} onClick={onClose} />
      <div
        role="dialog"
        aria-label={isModal ? t('parkedSales') : t('parkSale')}
        className={
          isModal
            ? 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex flex-col bg-card shadow-lg rounded-[var(--radius)] w-[min(784px,calc(100vw-40px))] h-[min(600px,calc(100vh-80px))]'
            : 'fixed right-[10px] top-[104px] z-50 flex flex-col bg-card shadow-lg rounded-[3px] w-[min(784px,calc(100vw-20px))] h-[min(520px,calc(100vh-124px))]'
        }
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {isModal && (
          <div className="flex items-center gap-[12px] px-[20px] h-[64px] shrink-0 border-b border-border">
            <ParkingSquare size={22} className="text-foreground" />
            <h2 className="grow font-semibold text-foreground" style={{ fontSize: 'var(--text-lg)' }}>{t('parkedSales')}</h2>
            <button onClick={onClose} aria-label={t('cancel')} className="size-[40px] flex items-center justify-center cursor-pointer rounded-[var(--radius)] hover:bg-secondary">
              <X size={20} />
            </button>
          </div>
        )}
        <label className="flex items-center gap-[10px] px-[20px] py-[14px] border-b border-border cursor-pointer" style={cell}>
          <Switch checked={onlyMine} onCheckedChange={setOnlyMine} />
          {t('showOnlyMySales')}
        </label>

        <div className="grid items-center px-[10px] pt-[14px] pb-[8px]" style={{ gridTemplateColumns: COLS, ...head }}>
          <span />
          <span>{t('parkedByLabel')}</span>
          <span>{t('parkedCustomerLabel')}</span>
          <span>{t('parkedBongLabel')}</span>
          <span>{t('parkedCreatedByLabel')}</span>
          <span className="text-right">{t('parkedSumLabel')}</span>
          <span />
        </div>

        <div className="flex flex-col gap-[10px] overflow-auto grow min-h-0 px-[10px] pb-[10px]">
          {rows.length === 0 && <p className="py-[24px] text-center" style={head}>{t('noParkedSales')}</p>}
          {rows.map((s) => {
            const selected = selectedId === s.id;
            const expanded = expandedId === s.id;
            return (
              <div key={s.id}>
                <div
                  className="grid items-center py-[14px] cursor-pointer rounded-[3px] border bg-card"
                  style={{ gridTemplateColumns: COLS, borderColor: selected ? 'var(--primary)' : 'var(--border)' }}
                  onClick={() => setSelectedId(s.id)}
                >
                  <span className="flex justify-center">
                    <span
                      className="size-[24px] rounded-full border flex items-center justify-center"
                      style={{ borderColor: selected ? 'var(--primary)' : 'var(--border)' }}
                    >
                      {selected && <span className="size-[12px] rounded-full" style={{ background: 'var(--primary)' }} />}
                    </span>
                  </span>
                  <span className="flex flex-col">
                    <span style={cell}>{s.parkedBy === currentUser ? t('parkedYou') : s.parkedBy}</span>
                    <span style={head}>{stamp(s.parkedAt)}</span>
                  </span>
                  <span style={cell}>{s.customerName}</span>
                  <span style={cell}>{s.bong}</span>
                  <span style={cell}>{s.createdBy}</span>
                  <span className="text-right" style={cell}>{money(s.total)}</span>
                  <button
                    aria-expanded={expanded}
                    onClick={(e) => { e.stopPropagation(); setExpandedId(expanded ? null : s.id); }}
                    className="flex justify-center cursor-pointer"
                  >
                    <ChevronDown size={20} className="transition-transform" style={{ transform: expanded ? 'rotate(180deg)' : undefined }} />
                  </button>
                </div>
                {/* Expanded lines sit directly under the row on a grey ground,
                    each figure right-aligned to the list column above it. */}
                {expanded && (
                  <div className="border border-t-0 border-border" style={{ background: 'var(--background)' }}>
                    <div className="grid px-0 pt-[14px] pb-[10px]" style={{ gridTemplateColumns: COLS, ...head }}>
                      <span className="col-span-2 pl-[22px]">{t('parkedItemName')}</span>
                      <span className="text-right">{t('parkedQuantity')}</span>
                      <span className="text-right">{t('parkedPerUnit')}</span>
                      <span className="text-right">{t('parkedDiscount')}</span>
                      <span className="text-right">{t('parkedTotal')}</span>
                      <span />
                    </div>
                    {linesOf(s).map((l) => (
                      <div key={l.key} className="grid items-center py-[12px]" style={{ gridTemplateColumns: COLS, ...cell }}>
                        <span className="col-span-2 flex flex-col pl-[22px] pr-[20px]">
                          <span>{l.name}</span>
                          <span style={head}>{l.sku}</span>
                        </span>
                        <span className="text-right">{money(l.quantity)} {l.unit}</span>
                        <span className="text-right">{money(l.price)}</span>
                        <span className="text-right">{money(l.discount)}</span>
                        <span className="text-right">{money(l.total)}</span>
                        <span />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex gap-[20px] p-[20px] border-t border-border">
          <button
            disabled={!selectedId}
            onClick={() => selectedId && onRestore(selectedId)}
            className="h-[48px] rounded-[var(--radius)] px-[30px] font-semibold disabled:cursor-not-allowed"
            style={
              selectedId
                ? { backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }
                : { backgroundColor: 'var(--secondary)', color: 'var(--muted-foreground)' }
            }
          >
            {t('restoreSale')}
          </button>
          <button onClick={onClose} className="h-[48px] rounded-[var(--radius)] px-[30px] font-semibold border border-border">
            {t('cancel')}
          </button>
        </div>
      </div>
    </>
  );
}

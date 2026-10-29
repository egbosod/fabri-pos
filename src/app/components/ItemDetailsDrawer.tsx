import { useEffect, useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { useLanguage } from '../contexts/LanguageContext';
import { getWarehouseStock, warehouseName } from '../utils/warehouseStock';
import productImage from '../../assets/item-drawer-product.png';

export interface ItemDetailsDrawerItem {
  name: string;
  sku: string;
  price: number;
  discount?: number;
}

interface ItemDetailsDrawerProps {
  item: ItemDetailsDrawerItem | null;
  onClose: () => void;
  onDelete?: () => void;
}

// Sample data from the Figma frame; the prototype has no stock or cost feed.
const STOCK_ROWS = [
  { warehouse: '10 - Utsalgssted', inStock: 11, inOrder: 5, inPurchase: 1, available: 7 },
  ...Array.from({ length: 11 }, () => ({
    warehouse: '20 - Lager EG Gjøvik',
    inStock: 14,
    inOrder: 1,
    inPurchase: 0,
    available: 13,
  })),
];
// "På lager" is the warehouse balance from the product search result (the first row is the
// same number as Inventory there). The other columns are sample values derived from it.
const stockRowsFor = (sku: string) =>
  getWarehouseStock(sku)?.map(({ lager, qty }) => {
    const inOrder = Math.round(Math.abs(qty) / 4);
    return { warehouse: warehouseName(lager), inStock: qty, inOrder, inPurchase: 0, available: qty - inOrder };
  });
const STOCK_COLUMNS = [141, 75, 63, 58, 59];

const fmt = (n: number) => n.toFixed(2).replace('.', ',');

const cellBase = {
  padding: '8px 10px',
  fontSize: 'var(--text-sm)',
  lineHeight: 1.4,
  color: 'var(--foreground)',
  whiteSpace: 'nowrap' as const,
  overflow: 'hidden',
};

function DetailCard({ rows }: { rows: { label: string; value: React.ReactNode }[] }) {
  return (
    <div
      className="w-full overflow-clip"
      style={{ background: 'var(--card)', border: '1px solid #e6e6e8', borderRadius: 3 }}
    >
      {rows.map((row, i) => (
        <div
          key={row.label}
          className="flex items-center gap-[10px]"
          style={{
            padding: 10,
            fontSize: 'var(--text-xs)',
            lineHeight: 1.4,
            color: 'var(--foreground)',
            borderBottom: i < rows.length - 1 ? '1px solid #e6e6e8' : undefined,
          }}
        >
          <span className="flex-1 min-w-0 font-bold">{row.label}</span>
          <span className="flex-1 min-w-0">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function StockTable({ expanded, onToggle, stockRows = STOCK_ROWS }: { expanded: boolean; onToggle: () => void; stockRows?: typeof STOCK_ROWS }) {
  const { t } = useLanguage();
  const headers = [t('warehouse'), t('stockInStock'), t('stockInOrder'), t('stockInPurchase'), t('stockAvailable')];
  const rows = expanded ? stockRows : stockRows.slice(0, 1);
  return (
    <div className="flex flex-col items-start">
      <div
        className="flex flex-col overflow-clip"
        style={{ gap: 1, background: '#e6e6e8', border: '1px solid #e6e6e8', borderRadius: 3 }}
      >
        <div className="flex" style={{ gap: 1 }}>
          {headers.map((h, i) => (
            <div key={h} style={{ ...cellBase, width: STOCK_COLUMNS[i], background: '#f5f5f6', fontWeight: 700 }}>
              {h}
            </div>
          ))}
        </div>
        {rows.map((r, ri) => (
          <div key={ri} className="flex" style={{ gap: 1 }}>
            {[r.warehouse, r.inStock, r.inOrder, r.inPurchase, r.available].map((v, i) => (
              <div key={i} style={{ ...cellBase, width: STOCK_COLUMNS[i], background: 'var(--card)' }}>
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>
      {stockRows.length > 1 && <button
        type="button"
        onClick={onToggle}
        className="cursor-pointer uppercase"
        style={{
          height: 40,
          paddingRight: 10,
          background: 'none',
          border: 'none',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'],
          fontSize: 'var(--text-sm)',
          lineHeight: 1.75,
          color: 'var(--primary)',
        }}
      >
        {expanded ? t('showFewerWarehouses') : t('showMoreWarehouses')}
      </button>}
    </div>
  );
}

// Same field styling as the Select customer modal (InputBox + FieldLabel).
function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [focused, setFocused] = useState(false);
  return (
    <label className="block">
      <div
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: 'var(--text-base)',
          color: 'var(--card-foreground)',
          lineHeight: 1.75,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          background: 'var(--card)',
          border: focused ? '2px solid var(--primary)' : '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          height: 48,
          display: 'flex',
          alignItems: 'center',
          padding: focused ? '0 13px' : '0 14px',
          cursor: 'text',
          transition: 'border 0.1s',
        }}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'var(--text-base)',
            background: 'transparent',
            lineHeight: 1.75,
            color: value ? 'var(--foreground)' : 'var(--muted-foreground)',
          }}
        />
      </div>
    </label>
  );
}

const footerButton: React.CSSProperties = {
  height: 48,
  minWidth: 100,
  padding: '6px 20px',
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 10,
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'],
  fontSize: 'var(--text-lg)',
  lineHeight: 1.75,
  whiteSpace: 'nowrap',
};

export function ItemDetailsDrawer({ item, onClose, onDelete }: ItemDetailsDrawerProps) {
  const { t } = useLanguage();
  const syncedStock = item ? stockRowsFor(item.sku) : undefined;
  const [stockExpanded, setStockExpanded] = useState(false);
  const [comment, setComment] = useState('');
  const [serial, setSerial] = useState('');

  // Each opened item starts collapsed and clean.
  useEffect(() => {
    setStockExpanded(false);
    setComment('');
    setSerial('');
  }, [item?.sku]);

  // Save unlocks once there is something to save.
  const canSave = comment.trim() !== '' || serial.trim() !== '';

  const price = item?.price ?? 0;
  const exVat = price / 1.25;

  return (
    <Sheet open={!!item} onOpenChange={(open) => { if (!open) onClose(); }}>
      <SheetContent
        side="right"
        showClose={false}
        className="gap-0 p-0 w-[441px] max-w-full sm:max-w-[441px]"
        style={{ background: 'var(--background)' }}
      >
        {/* Header */}
        <div
          className="flex items-center shrink-0"
          style={{
            gap: 10,
            padding: '15px 16px',
            background: 'var(--card)',
            borderBottom: '1px solid #e6e6e8',
            boxShadow: '0px 3px 3px rgba(107,107,114,0.06)',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="flex items-center justify-center shrink-0 cursor-pointer"
            style={{ width: 27, height: 27, borderRadius: '50%', background: 'var(--secondary)', border: 'none' }}
          >
            <X size={14} strokeWidth={2} style={{ color: 'var(--secondary-foreground)' }} />
          </button>
          <SheetTitle
            className="min-w-0 truncate"
            style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 1.2 }}
          >
            {item?.name}
          </SheetTitle>
          <SheetDescription className="sr-only">{item?.sku}</SheetDescription>
        </div>

        {/* Body — scrolls when content demands it */}
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto overflow-x-clip" style={{ gap: 20, padding: 20 }}>
          <div
            className="flex items-center justify-center shrink-0"
            style={{ background: 'var(--card)', border: '1px solid #e6e6e8', borderRadius: 3, padding: '10px 0' }}
          >
            <img src={productImage} alt="" style={{ width: 343, height: 143, objectFit: 'cover' }} />
          </div>

          <div className="flex flex-col shrink-0" style={{ gap: 10 }}>
            <DetailCard
              rows={[
                { label: 'Varenummer', value: item?.sku },
                {
                  label: 'Nobbnr.',
                  value: (
                    <span className="flex items-center justify-between">
                      <span>45275016</span>
                      <span
                        className="flex items-center uppercase"
                        style={{
                          gap: 5,
                          color: 'var(--primary)',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          lineHeight: 1.75,
                        }}
                      >
                        Vis vareinfo
                        <ExternalLink size={14} strokeWidth={1.75} />
                      </span>
                    </span>
                  ),
                },
                { label: 'Leveringstype', value: 'Lagervare' },
              ]}
            />
            <DetailCard
              rows={[
                { label: 'Veiledende pris inkl. mva.', value: fmt(price) },
                { label: 'Veiledende pris ekskl. mva.', value: fmt(exVat) },
                { label: 'Kostpris ekskl. mva.', value: fmt(exVat * 0.625) },
                { label: 'DG', value: '50%' },
                { label: 'Mva.', value: '25%' },
              ]}
            />
            <StockTable expanded={stockExpanded} onToggle={() => setStockExpanded((v) => !v)} stockRows={syncedStock ?? STOCK_ROWS} />
          </div>

          <div className="flex flex-col shrink-0" style={{ gap: 20 }}>
            <TextField label="Kommentar" value={comment} onChange={setComment} />
            <TextField label="Serienummer" value={serial} onChange={setSerial} />
          </div>
        </div>

        {/* Footer CTAs stay pinned to the bottom of the viewport */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{
            padding: '15px 16px',
            background: 'var(--card)',
            borderTop: '1px solid #e6e6e8',
            boxShadow: '0px -3px 3px rgba(107,107,114,0.06)',
          }}
        >
          <div className="flex" style={{ gap: 15 }}>
            <button
              type="button"
              disabled={!canSave}
              onClick={onClose}
              style={
                canSave
                  ? { ...footerButton, background: 'var(--primary)', border: 'none', color: 'var(--primary-foreground)' }
                  : {
                      ...footerButton,
                      background: 'var(--secondary)',
                      border: 'none',
                      color: 'var(--secondary-foreground)',
                      opacity: 0.6,
                      cursor: 'not-allowed',
                    }
              }
            >
              {t('save')}
            </button>
            <button type="button" onClick={onClose} style={{ ...footerButton, color: 'var(--foreground)' }}>
              {t('close')}
            </button>
          </div>
          <button
            type="button"
            onClick={() => { onDelete?.(); onClose(); }}
            style={{ ...footerButton, color: '#cc2a14' }}
          >
            Slett varelinjen
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

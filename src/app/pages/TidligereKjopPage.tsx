import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import svgPaths from '../imports/svg-akf49gajiv';
import imgImage38 from 'figma:asset/2a8189f6f2eaf0882cfe0cd637b5bb36e06db9f0.png';
import { usePOS } from '../contexts/POSContext';

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface LineItem {
  id: string;
  image: string;
  name: string;
  quantity: number;
  unit: string;
  perUnit: number;
  discountPct: number;
  total: number;
  originalTotal: number;
  checked: boolean;
}

interface SaleReceipt {
  id: string;
  bongNumber: string;
  receiptNumber: string;
  date: string;
  cashier: string;
  customerName: string;
  projectName?: string;
  totalAmount: number;
  expanded: boolean;
  items: LineItem[];
}

/* ─── Mock data ──────────────────────────────────────────────────────────── */

const MOCK_RECEIPTS: SaleReceipt[] = [
  {
    id: 'r1',
    bongNumber: '110-3',
    receiptNumber: 'SE1-3659',
    date: '12. juni 2023, 15:32',
    cashier: 'Nama Namason',
    customerName: 'Builder Snorre Rogne',
    projectName: 'Brennerigata 43A, bygg B',
    totalAmount: 483.3,
    expanded: false,
    items: [
      { id: 'i1', image: imgImage38, name: 'Screw 5.0x40 CS A-250 Corrseal 23083603', quantity: 2, unit: 'STK', perUnit: 179.0, discountPct: 10, total: 483.3, originalTotal: 537.0, checked: false },
    ],
  },
  {
    id: 'r2',
    bongNumber: '110-7',
    receiptNumber: 'SE1-3821',
    date: '3. mars 2024, 09:15',
    cashier: 'Kari Nordmann',
    customerName: 'Builder Snorre Rogne',
    projectName: 'Storgata 12, leilighet 3',
    totalAmount: 12450.0,
    expanded: false,
    items: [
      { id: 'i4', image: imgImage38, name: 'Gipsplater standard 2400x1200mm', quantity: 20, unit: 'STK', perUnit: 180.0, discountPct: 0, total: 3600.0, originalTotal: 3600.0, checked: false },
      { id: 'i5', image: imgImage38, name: 'Skruer 4.2x100mm A4 (200 stk)', quantity: 5, unit: 'PKT', perUnit: 129.0, discountPct: 5, total: 612.75, originalTotal: 645.0, checked: false },
    ],
  },
];

/* ─── Shared styles ──────────────────────────────────────────────────────── */

const FONT_BASE: React.CSSProperties = { fontFamily: "'Montserrat', sans-serif" };
const LABEL_COL: React.CSSProperties = { ...FONT_BASE, fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--muted-foreground)', whiteSpace: 'nowrap' };
const CELL_PRIMARY: React.CSSProperties = { ...FONT_BASE, fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--foreground)', lineHeight: 1.4 };
const CELL_SUB: React.CSSProperties = { ...FONT_BASE, fontSize: 'var(--text-xs)', fontWeight: 400, color: 'var(--secondary-foreground)', lineHeight: 1.4 };

/* ─── Icons ──────────────────────────────────────────────────────────────── */

function HistoryIconSvg() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d={svgPaths.p3613d600} stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M6.25 14L3.75 11L1.25 14" stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M13.25 7.5V12.5H16.75" stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function SearchIconSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 13.7132" fill="none">
      <path clipRule="evenodd" d={svgPaths.p2d8c2380} fill="currentColor" fillRule="evenodd" />
      <path clipRule="evenodd" d={svgPaths.p383aa00} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

function ChevronSvg({ open }: { open: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.15s ease-in-out', flexShrink: 0 }}>
      <path d="M3 5L7 9L11 5" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Checkbox ───────────────────────────────────────────────────────────── */

function ItemCheckbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(); }}
      style={{
        width: 24, height: 24, flexShrink: 0,
        background: checked ? 'var(--primary)' : 'var(--card)',
        border: checked ? 'none' : '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: checked ? 'var(--elevation-sm)' : 'none',
        transition: 'background 0.12s, border-color 0.12s',
        padding: 0,
      }}
    >
      {checked && (
        <svg width="11" height="8" viewBox="0 0 15.7143 11.4286" fill="none">
          <path d={svgPaths.p2e04c780} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
      )}
    </button>
  );
}

/* ─── Quantity stepper ───────────────────────────────────────────────────── */

function QtyStepper({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', height: 40, flexShrink: 0 }}>
      <button onClick={(e) => { e.stopPropagation(); onChange(Math.max(1, value - 1)); }} style={{ width: 40, height: 40, flexShrink: 0, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius) 0 0 var(--radius)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="11" height="2" viewBox="0 0 10.8333 1.625" fill="none">
          <path clipRule="evenodd" d={svgPaths.p10373480} fill="var(--secondary-foreground)" fillRule="evenodd" />
        </svg>
      </button>
      <div style={{ width: 40, height: 40, flexShrink: 0, background: 'var(--card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', ...FONT_BASE, fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--foreground)' }}>
        {value}
      </div>
      <button onClick={(e) => { e.stopPropagation(); onChange(value + 1); }} style={{ width: 40, height: 40, flexShrink: 0, background: 'var(--secondary)', border: '1px solid var(--border)', borderRadius: '0 var(--radius) var(--radius) 0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -1 }}>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <path clipRule="evenodd" d={svgPaths.p2117c00} fill="var(--muted-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p20dca340} fill="var(--muted-foreground)" fillRule="evenodd" />
        </svg>
      </button>
    </div>
  );
}

/* ─── Footer button ──────────────────────────────────────────────────────── */

type FooterBtnVariant = 'primary' | 'muted' | 'outlined';

function FooterBtn({ children, variant, onClick }: { children: React.ReactNode; variant: FooterBtnVariant; onClick?: () => void }) {
  const base: React.CSSProperties = { height: 48, padding: '6px 20px', borderRadius: 'var(--radius)', cursor: variant === 'muted' ? 'not-allowed' : 'pointer', ...FONT_BASE, fontSize: 'var(--text-lg)', fontWeight: 'var(--font-weight-semibold)', lineHeight: 1.75, whiteSpace: 'nowrap', transition: 'background 0.15s, color 0.15s, border-color 0.15s', flexShrink: 0 };

  if (variant === 'primary') {
    return (
      <button onClick={onClick} style={{ ...base, background: 'var(--primary)', border: 'none', color: 'var(--primary-foreground)' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'color-mix(in srgb, var(--primary) 90%, black)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--primary)'; }}
      >{children}</button>
    );
  }
  if (variant === 'muted') {
    return (<button disabled style={{ ...base, background: 'var(--secondary)', border: 'none', color: 'var(--secondary-foreground)', opacity: 0.6, cursor: 'not-allowed' }}>{children}</button>);
  }
  return (
    <button onClick={onClick} style={{ ...base, background: 'var(--card)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'color-mix(in srgb, var(--primary) 5%, var(--card))'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--card)'; }}
    >{children}</button>
  );
}

/* ─── Receipt row ────────────────────────────────────────────────────────── */

function ReceiptRow({ receipt, onToggleExpand, onToggleCheck, onChangeQty }: { receipt: SaleReceipt; onToggleExpand: () => void; onToggleCheck: (id: string) => void; onChangeQty: (id: string, qty: number) => void }) {
  const fmt = (n: number) => n.toLocaleString('nb-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
      <button onClick={onToggleExpand} style={{ width: '100%', height: 62, background: 'var(--background)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', textAlign: 'left', padding: 0 }}>
        <div style={{ width: 44, flexShrink: 0 }} />
        <div style={{ width: 160, flexShrink: 0, padding: '5px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          <span style={CELL_PRIMARY}>{receipt.receiptNumber}</span>
          <span style={CELL_SUB}>{receipt.date}</span>
          <span style={CELL_SUB}>{receipt.cashier}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0, padding: '5px 10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
          <span style={CELL_PRIMARY}>{receipt.customerName}</span>
          {receipt.projectName && <span style={CELL_SUB}>Prosjekt: {receipt.projectName}</span>}
        </div>
        <div style={{ width: 100, flexShrink: 0, padding: '5px 10px', textAlign: 'right', ...CELL_PRIMARY }}>{fmt(receipt.totalAmount)}</div>
        <div style={{ width: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ChevronSvg open={receipt.expanded} /></div>
      </button>

      {receipt.expanded && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: 30, borderBottom: '1px solid var(--border)', paddingBottom: 5 }}>
            <div style={{ width: 44, flexShrink: 0 }} />
            <div style={{ width: 56, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0, padding: '0 10px' }}><span style={LABEL_COL}>Varenavn</span></div>
            <div style={{ width: 195, flexShrink: 0, padding: '0 10px 0 61px' }}><span style={LABEL_COL}>Antall</span></div>
            <div style={{ width: 90, flexShrink: 0, padding: '0 10px', display: 'flex', justifyContent: 'flex-end' }}><span style={LABEL_COL}>Per enhet</span></div>
            <div style={{ width: 68, flexShrink: 0, padding: '0 10px' }}><span style={LABEL_COL}>Rabatt</span></div>
            <div style={{ width: 93, flexShrink: 0, padding: '0 32px 0 10px', display: 'flex', justifyContent: 'flex-end' }}><span style={LABEL_COL}>Total</span></div>
          </div>

          {receipt.items.map((item, idx) => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', minHeight: 67, background: 'var(--card)', borderBottom: idx < receipt.items.length - 1 ? '1px solid var(--border)' : 'none', position: 'relative' }}>
              <div style={{ width: 44, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 10px' }}>
                <ItemCheckbox checked={item.checked} onChange={() => onToggleCheck(item.id)} />
              </div>
              <div style={{ width: 56, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px 10px' }}>
                <img src={item.image} alt="" style={{ width: 36, height: 36, borderRadius: 'var(--radius)', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0, padding: '5px 10px' }}>
                <span style={{ ...FONT_BASE, fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--foreground)', lineHeight: 1.4 }}>{item.name}</span>
              </div>
              <div style={{ width: 195, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '5px 10px' }}>
                <QtyStepper value={item.quantity} onChange={(qty) => onChangeQty(item.id, qty)} />
                <span style={{ ...FONT_BASE, fontSize: 'var(--text-base)', fontWeight: 400, color: 'var(--foreground)' }}>{item.unit}</span>
              </div>
              <div style={{ width: 90, flexShrink: 0, padding: '5px 10px', textAlign: 'right' }}>
                <span style={{ ...FONT_BASE, fontSize: 'var(--text-base)', fontWeight: 400, color: 'var(--foreground)' }}>{fmt(item.perUnit)}</span>
              </div>
              <div style={{ width: 68, flexShrink: 0, padding: '5px 10px' }}>
                <span style={{ ...FONT_BASE, fontSize: 'var(--text-base)', fontWeight: 400, color: 'var(--foreground)' }}>{item.discountPct > 0 ? `${item.discountPct} %` : '—'}</span>
              </div>
              <div style={{ width: 93, flexShrink: 0, padding: '5px 32px 5px 10px', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                <span style={{ ...FONT_BASE, fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--foreground)' }}>{fmt(item.total)}</span>
                {item.discountPct > 0 && <span style={{ ...FONT_BASE, fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--secondary-foreground)' }}>{fmt(item.originalTotal)}</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Tidligere Kjøp Page
   ═══════════════════════════════════════════════════════════════════════════ */

export default function TidligereKjopPage() {
  const navigate = useNavigate();
  const { handleAddToSale, selectedCustomer } = usePOS();

  const [bongNumber, setBongNumber] = useState('');
  const [receipts, setReceipts] = useState<SaleReceipt[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [kundeUtenKonto, setKundeUtenKonto] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') navigate('/salg'); };
    document.addEventListener('keydown', onKey);
    setTimeout(() => inputRef.current?.focus(), 60);
    return () => document.removeEventListener('keydown', onKey);
  }, [navigate]);

  const handleSearch = () => {
    if (!bongNumber.trim()) return;
    setHasSearched(true);
    const term = bongNumber.trim().toLowerCase();
    const bongRangeMatch = /^110-([3-7])$/.test(term);
    if (bongRangeMatch) {
      const picked = MOCK_RECEIPTS[Math.floor(Math.random() * MOCK_RECEIPTS.length)];
      setReceipts([{ ...picked, expanded: true, items: picked.items.map((i) => ({ ...i, checked: false })) }]);
      return;
    }
    const matched = MOCK_RECEIPTS.filter((r) => r.bongNumber.toLowerCase() === term || r.receiptNumber.toLowerCase() === term);
    setReceipts(matched.map((r) => ({ ...r, expanded: true, items: r.items.map((i) => ({ ...i, checked: false })) })));
  };

  const toggleExpand = (id: string) => setReceipts((prev) => prev.map((r) => (r.id === id ? { ...r, expanded: !r.expanded } : r)));
  const toggleCheck = (receiptId: string, itemId: string) => setReceipts((prev) => prev.map((r) => (r.id !== receiptId ? r : { ...r, items: r.items.map((i) => (i.id === itemId ? { ...i, checked: !i.checked } : i)) })));
  const changeQty = (receiptId: string, itemId: string, newQty: number) => setReceipts((prev) => prev.map((r) => (r.id !== receiptId ? r : { ...r, items: r.items.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i)) })));

  const anyChecked = receipts.some((r) => r.items.some((i) => i.checked));
  const hasResults = hasSearched && receipts.length > 0;

  const getCheckedItems = () =>
    receipts.flatMap((r) =>
      r.items.filter((i) => i.checked).map((i) => ({ name: i.name, quantity: i.quantity, unit: i.unit, price: i.perUnit, discount: i.discountPct, total: i.total })),
    );

  const handleAddAsReturn = () => {
    if (!anyChecked) return;
    getCheckedItems().forEach((item) => {
      handleAddToSale({ name: item.name, sku: '', price: item.price, quantity: item.quantity, unit: item.unit, discount: item.discount, total: item.total, state: 'return' as any });
    });
    navigate('/salg');
  };

  const handleAddAsNormalSale = () => {
    if (!anyChecked) return;
    getCheckedItems().forEach((item) => {
      handleAddToSale({ name: item.name, sku: '', price: item.price, quantity: item.quantity, unit: item.unit, discount: item.discount, total: item.total });
    });
    navigate('/salg');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, background: 'var(--background)', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Module header */}
      <div style={{ background: 'var(--card)', borderBottom: '1.5px solid var(--border)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px' }}>
          <HistoryIconSvg />
          <span style={{ ...FONT_BASE, fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.3 }}>Finn tidligere salg</span>
          {selectedCustomer && (
            <span style={{ ...FONT_BASE, fontSize: 'var(--text-sm)', fontWeight: 400, color: 'var(--muted-foreground)', marginLeft: 8 }}>— {selectedCustomer.name}</span>
          )}
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: 'var(--card)', height: 45, flexShrink: 0, boxShadow: '0 3px 3px rgba(107,107,114,0.06)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', padding: '0 20px', gap: 30 }}>
          <button style={{ ...FONT_BASE, fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--foreground)', background: 'none', border: 'none', borderBottom: '2px solid var(--primary)', padding: '0 0 5px 0', cursor: 'pointer', whiteSpace: 'nowrap', lineHeight: 1.75 }}>
            Alle salg
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 15, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 15, flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Search */}
          <div style={{ marginBottom: 0 }}>
            <label style={{ ...FONT_BASE, display: 'block', fontSize: 'var(--text-base)', fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.75, marginBottom: 4 }}>Bongnummer</label>
            <div style={{ position: 'relative', width: 320 }}>
              <input
                ref={inputRef}
                value={bongNumber}
                onChange={(e) => setBongNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Bongnummer scan eller søk"
                style={{
                  width: '100%', height: 48, background: 'var(--input-background)', border: bongNumber ? '2px solid var(--primary)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius)', padding: '0 40px 0 14px', fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', fontWeight: 400,
                  color: 'var(--foreground)', outline: 'none', boxSizing: 'border-box', boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.06)', transition: 'border-color 0.12s',
                }}
                onFocus={(e) => { e.currentTarget.style.border = '2px solid var(--primary)'; }}
                onBlur={(e) => { e.currentTarget.style.border = bongNumber ? '2px solid var(--primary)' : '1px solid var(--border)'; }}
              />
              <button onClick={handleSearch} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4, color: 'var(--foreground)', opacity: 0.5 }}>
                <SearchIconSvg />
              </button>
            </div>
          </div>

          {/* Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 48 }}>
            <ItemCheckbox checked={kundeUtenKonto} onChange={() => setKundeUtenKonto((v) => !v)} />
            <span style={{ ...FONT_BASE, fontSize: 'var(--text-sm)', fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.4 }}>Kunde uten konto</span>
          </div>

          {/* Column headers */}
          {hasResults && (
            <div style={{ display: 'flex', alignItems: 'flex-end', height: 28, marginBottom: 12 }}>
              <div style={{ width: 44, flexShrink: 0 }} />
              <div style={{ width: 160, flexShrink: 0, padding: '0 10px' }}><span style={LABEL_COL}>Kvitteringsdetaljer</span></div>
              <div style={{ flex: 1, minWidth: 0, padding: '0 10px' }}><span style={LABEL_COL}>Kunde, prosjekt</span></div>
              <div style={{ width: 100, flexShrink: 0, padding: '0 10px', display: 'flex', justifyContent: 'flex-end' }}><span style={LABEL_COL}>Totalbeløp</span></div>
              <div style={{ width: 36, flexShrink: 0 }} />
            </div>
          )}

          {/* Receipt rows */}
          {hasResults && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
              {receipts.map((receipt) => (
                <ReceiptRow key={receipt.id} receipt={receipt} onToggleExpand={() => toggleExpand(receipt.id)} onToggleCheck={(itemId) => toggleCheck(receipt.id, itemId)} onChangeQty={(itemId, qty) => changeQty(receipt.id, itemId, qty)} />
              ))}
            </div>
          )}

          {/* No results */}
          {hasSearched && receipts.length === 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, minHeight: 200, ...FONT_BASE, fontSize: 'var(--text-base)', color: 'var(--muted-foreground)' }}>
              Ingen resultater funnet for «{bongNumber}»
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', boxShadow: '0 -4px 4px rgba(0,0,0,0.03)', padding: '15px 20px', display: 'flex', gap: 20, alignItems: 'center', flexShrink: 0 }}>
        <FooterBtn variant={anyChecked ? 'primary' : 'muted'} onClick={handleAddAsReturn}>Legg til som retur</FooterBtn>
        <FooterBtn variant={anyChecked ? 'outlined' : 'muted'} onClick={handleAddAsNormalSale}>Legg til som normalt salg</FooterBtn>
        <FooterBtn variant={anyChecked ? 'outlined' : 'muted'}>Skriv ut byttelapp</FooterBtn>
        <FooterBtn variant="outlined" onClick={() => navigate('/salg')}>Avbryt</FooterBtn>
      </div>
    </div>
  );
}
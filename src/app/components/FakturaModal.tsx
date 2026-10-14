import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '../contexts/LanguageContext';
import { ModalCTAFooter } from './ModalCTAFooter';
import type { Customer, InvoiceForPayment } from '../types/pos';

interface FakturaModalProps {
  onClose: () => void;
  customer?: Customer | null;
  /** Fires on "Pickup for payment" with the ticked invoices. */
  onPickup?: (invoices: InvoiceForPayment[]) => void;
  /** Prototype A: adds the "Create account payment" tab, with credit info. */
  accountPaymentTab?: boolean;
  /** Fires with the typed amount; it is placed on the sales order as one line. */
  onAddAccountPayment?: (amount: number) => void;
}

const DUE_DATES = ['29.03.24', '12.04.24', '30.04.24', '15.05.24', '02.06.24'];
const TOTALS = [738, 1250.5, 4920, 319.9, 15600];
const PREPAID = [0, 250, 0, 100, 5000];
// How many open invoices a Proff customer gets, cycled by customer id.
// The 0 gives a Proff customer with nothing to pick up.
const INVOICE_COUNTS = [3, 5, 0, 2, 4];

/**
 * Mock-only: invoices are derived from the customer so every customer shows
 * something stable. Privat customers pay at the till and have none.
 */
function mockInvoicesFor(customer?: Customer | null): InvoiceForPayment[] {
  if (!customer || customer.type === 'Privat') return [];
  const seed = parseInt(customer.id, 10) || 0;
  const count = INVOICE_COUNTS[seed % INVOICE_COUNTS.length];
  return Array.from({ length: count }, (_, i) => {
    const k = (seed + i) % TOTALS.length;
    return {
      id: `${customer.id}-${i}`,
      number: String(813102 + seed * 37 + i * 11),
      dueDate: DUE_DATES[k],
      customerRef: String(301659 + seed * 13 + i),
      total: TOTALS[k],
      prepaid: PREPAID[k],
    };
  });
}

const formatAmount = (n: number) =>
  n.toLocaleString('nb-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const COLUMNS = '56px minmax(0, 1fr) 120px 150px';

const parseKr = (v?: string) => parseFloat((v ?? '0').replace(/\s/g, '').replace(',', '.')) || 0;

export function FakturaModal({ onClose, customer, onPickup, accountPaymentTab = false, onAddAccountPayment }: FakturaModalProps) {
  const { t } = useLanguage();
  const invoices = useMemo(() => mockInvoicesFor(customer), [customer]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<'pickup' | 'account'>('pickup');
  const [amountText, setAmountText] = useState('');
  const amount = parseFloat(amountText.replace(/\s/g, '').replace(',', '.')) || 0;
  const isAccountTab = accountPaymentTab && tab === 'account';

  const invoiced = parseKr(customer?.invoicedBalance);
  const total = parseKr(customer?.totalBalance);
  const balanceRows: Array<[string, number]> = [
    [t('dueBalance'), parseKr(customer?.dueBalance)],
    [t('invoicedBalance'), invoiced],
    [t('orderBalance'), Math.max(total - invoiced, 0)],
    [t('totalBalance'), total],
  ];

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const toggle = (set: Set<string>, id: string) => {
    const next = new Set(set);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  };

  const headerCell: React.CSSProperties = {
    fontSize: 'var(--text-sm)',
    color: 'var(--muted-foreground)',
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999, background: 'rgba(9,9,20,0.45)' }}>
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative flex flex-col bg-card rounded-[var(--radius)] shadow-lg overflow-hidden w-full"
        style={{ maxWidth: 640, maxHeight: 'calc(100vh - 48px)', margin: '0 16px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-[10px] p-[20px] shrink-0">
          <FileText className="text-foreground" size={24} />
          <p className="text-foreground font-semibold" style={{ fontSize: 'var(--text-lg)' }}>
            {accountPaymentTab ? t('invoiceForPayment') : t('pickupInvoiceForPayment')}
          </p>
        </div>

        {accountPaymentTab && (
          <div className="flex gap-[24px] px-[20px] shrink-0 border-b border-border" role="tablist">
            {([['pickup', t('pickupInvoiceTab')], ['account', t('createAccountPaymentTab')]] as const).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className="cursor-pointer"
                style={{
                  padding: '10px 0',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'],
                  color: tab === id ? 'var(--primary)' : 'var(--muted-foreground)',
                  borderBottom: `2px solid ${tab === id ? 'var(--primary)' : 'transparent'}`,
                  marginBottom: -1,
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Body */}
        <div className="flex flex-col flex-1 min-h-0 px-[20px] pb-[20px]" style={accountPaymentTab ? { paddingTop: 20 } : undefined}>
          {isAccountTab ? (
            <div className="flex flex-col gap-[20px] rounded-[var(--radius)] border border-border" style={{ padding: 20 }}>
              <div className="flex flex-col gap-[8px]">
                <p className="text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  {customer ? `${customer.customerNumber} ${customer.name}` : ''}
                </p>
                {balanceRows.map(([label, value]) => (
                  <div key={label} className="flex justify-between text-foreground" style={{ fontSize: 'var(--text-base)', maxWidth: 360 }}>
                    <span>{label}</span>
                    <span>kr {formatAmount(value)}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-[8px]">
                <label htmlFor="account-payment-amount" className="text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  {t('accountPayment')}
                </label>
                <input
                  id="account-payment-amount"
                  inputMode="decimal"
                  placeholder="0,00"
                  value={amountText}
                  onChange={(e) => setAmountText(e.target.value)}
                  className="bg-card border border-border h-[48px] rounded-[var(--radius)] px-[14px] text-foreground w-full"
                  style={{ fontSize: 'var(--text-base)' }}
                />
              </div>
            </div>
          ) : invoices.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-[12px] rounded-[var(--radius)] border border-border" style={{ padding: '48px 32px' }}>
              <FileText size={24} className="text-muted-foreground" />
              <span className="text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                {t('noInvoicesForPayment')}
              </span>
            </div>
          ) : (
            <div className="flex flex-col flex-1 min-h-0 rounded-[var(--radius)] border border-border overflow-y-auto" style={{ padding: '15px 15px 20px' }}>
              <div className="grid items-center" style={{ gridTemplateColumns: COLUMNS, padding: '0 0 10px' }}>
                <span />
                <span style={headerCell}>{t('invoiceNumberDueDate')}</span>
                <span style={headerCell}>{t('customerRefShort')}</span>
                <span style={{ ...headerCell, textAlign: 'right', paddingRight: 28 }}>{t('remainingAmount')}</span>
              </div>

              <div className="flex flex-col gap-[10px]">
                {invoices.map((inv) => {
                  const isSelected = selected.has(inv.id);
                  const isExpanded = expanded.has(inv.id);
                  const remaining = inv.total - inv.prepaid;
                  const Chevron = isExpanded ? ChevronUp : ChevronDown;
                  return (
                    <div key={inv.id} className="rounded-[var(--radius)] border border-border overflow-hidden">
                      <div
                        className="grid items-center cursor-pointer"
                        style={{
                          gridTemplateColumns: COLUMNS,
                          padding: '12px 0',
                          background: isSelected ? 'color-mix(in srgb, var(--primary) 6%, var(--card))' : 'var(--card)',
                        }}
                        onClick={() => setSelected((s) => toggle(s, inv.id))}
                      >
                        <span className="flex justify-center">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => setSelected((s) => toggle(s, inv.id))}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${t('invoice')} ${inv.number}`}
                            className="size-[24px] rounded-[var(--radius-sm)]"
                          />
                        </span>
                        <span className="flex flex-col text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                          <span>{t('invoice')} {inv.number}</span>
                          <span>{inv.dueDate}</span>
                        </span>
                        <span className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>{inv.customerRef}</span>
                        <button
                          type="button"
                          className="flex items-center justify-end gap-[4px] text-foreground cursor-pointer"
                          style={{ fontSize: 'var(--text-base)', paddingRight: 12 }}
                          aria-expanded={isExpanded}
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpanded((s) => toggle(s, inv.id));
                          }}
                        >
                          {formatAmount(remaining)}
                          <Chevron size={20} className="text-muted-foreground" />
                        </button>
                      </div>

                      {isExpanded && (
                        <div
                          className="flex flex-col gap-[16px] items-end text-foreground"
                          style={{ padding: '20px 24px', fontSize: 'var(--text-base)', borderTop: '1px solid var(--border)' }}
                        >
                          {([
                            [t('total'), formatAmount(inv.total)],
                            [t('prepaid'), `-${formatAmount(inv.prepaid)}`],
                            [t('remaining'), formatAmount(remaining)],
                          ] as const).map(([label, value]) => (
                            <div key={label} className="flex justify-between" style={{ width: 260 }}>
                              <span>{label}</span>
                              <span>{value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <ModalCTAFooter
          onCancel={onClose}
          onConfirm={() => (isAccountTab ? onAddAccountPayment?.(amount) : onPickup?.(invoices.filter((inv) => selected.has(inv.id))))}
          cancelText={t('cancel')}
          confirmText={isAccountTab ? t('addToSale') : t('pickupForPayment')}
          confirmDisabled={isAccountTab ? amount <= 0 : selected.size === 0}
        />
      </div>
    </div>
  );
}

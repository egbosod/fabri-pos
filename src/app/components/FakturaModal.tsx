import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, FileText, Search } from 'lucide-react';
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
  /** Prototype A: the tab reads "Choose invoice" and the CTA "Add to payment". */
  choosePaymentWording?: boolean;
  /** Prototype C: a modal for the account payment alone (credit info + amount), no invoices. */
  accountPaymentOnly?: boolean;
  /** Prototype C: the invoice pickup modal on its own, titled "Invoice for payment". */
  renamedTitle?: boolean;
  /** Prototype B: invoices and the account payment panel share the modal, no tabs. */
  accountPaymentSideBySide?: boolean;
  /** Fires with the typed amount; it is placed on the sales order as one line. */
  onAddAccountPayment?: (amount: number) => void;
}

const DUE_DATES = ['29.03.24', '12.04.24', '30.04.24', '15.05.24', '02.06.24'];
const TOTALS = [738, 1250.5, 4920, 319.9, 15600];
const PREPAID = [0, 250, 0, 100, 5000];
// How many open invoices a Proff customer gets, cycled by customer id.
// The 0 gives a Proff customer with nothing to pick up.
const INVOICE_COUNTS = [3, 5, 0, 2, 4];

/** Mock-only: hand-written data for customers who need a longer, more realistic list. */
const inv = (cid: string, number: string, dueDate: string, customerRef: string, total: number, prepaid = 0, kind?: 'creditNote'): InvoiceForPayment =>
  ({ id: `${cid}-${number}`, number, dueDate, customerRef, total, prepaid, kind });

const MOCK_BY_CUSTOMER_NUMBER: Record<string, { invoices: InvoiceForPayment[]; balances: { due: number; invoiced: number; order: number; total: number } }> = {
  // Shagrath Dødsbann — a long list (19 rows) to force scrolling or searching; remaining sums to the invoiced balance.
  '400006': {
    invoices: [
      inv('8', '814200', '08.01.24', '302100', 450, 0),
      inv('8', '814207', '19.01.24', '302103', 1250, 0),
      inv('8', '814214', '02.02.24', '302106', 320.5, 0),
      inv('8', '814221', '14.02.24', '302109', 780, 0),
      inv('8', '814228', '26.02.24', '302112', 215, 0),
      inv('8', '814235', '11.03.24', '302115', 940, 0),
      inv('8', '814242', '22.03.24', '302118', 2100, 500),
      inv('8', '814249', '04.04.24', '302121', 275, 0),
      inv('8', '814256', '17.04.24', '302124', 390, 0),
      inv('8', '814263', '29.04.24', '302127', 860, 0),
      inv('8', '814270', '10.05.24', '302130', 125, 0),
      inv('8', '814277', '23.05.24', '302133', 1480, 0),
      inv('8', '814284', '05.06.24', '302136', 560, 0),
      inv('8', '814291', '18.06.24', '302139', 695, 0),
      inv('8', '814298', '28.06.24', '302142', 330, 0),
      inv('8', '814305', '09.07.24', '302145', 410, 0),
      inv('8', '814312', '19.07.24', '302148', 720, 0),
      inv('8', '70003117', '30.07.24', '302151', -150, 0, 'creditNote'),
      inv('8', '814326', '12.08.24', '302154', 1549.5, 0),
    ],
    balances: { due: 3700, invoiced: 12800, order: 3700, total: 16500 },
  },
  // Snorre Vik Tømrer — enough invoices to scroll, two credit notes, balances that add up.
  '400021': {
    invoices: [
      inv('23', '813953', '15.05.24', '301958', 219.9),
      inv('23', '813964', '02.06.24', '301959', 10600),
      inv('23', '813871', '28.03.24', '301912', 4280.5, 1000),
      inv('23', '813702', '14.02.24', '301877', 18750),
      inv('23', '813990', '20.06.24', '301971', 1495),
      inv('23', '70002722', '03.05.24', '301940', -2350, 0, 'creditNote'),
      inv('23', '814012', '01.07.24', '301985', 6920, 2000),
      inv('23', '70002801', '12.06.24', '301966', -690, 0, 'creditNote'),
      inv('23', '814047', '18.07.24', '301993', 12480),
      inv('23', '813655', '09.02.24', '301860', 865),
    ],
    // Invoiced = sum of the remaining amounts above; due excludes the two not yet due.
    balances: { due: 32170.4, invoiced: 49570.4, order: 23840, total: 73410.4 },
  },
};

/**
 * Mock-only: invoices are derived from the customer so every customer shows
 * something stable. Privat customers pay at the till and have none.
 */
function mockInvoicesFor(customer?: Customer | null): InvoiceForPayment[] {
  const handwritten = customer && MOCK_BY_CUSTOMER_NUMBER[customer.customerNumber];
  if (handwritten) return handwritten.invoices;
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
  n.toLocaleString('nb-NO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('\u2212', '-');

const COLUMNS = '56px minmax(0, 1fr) 120px 150px';

const parseKr = (v?: string) => parseFloat((v ?? '0').replace(/\s/g, '').replace(',', '.')) || 0;

export function FakturaModal({ onClose, customer, onPickup, accountPaymentTab = false, accountPaymentSideBySide = false, accountPaymentOnly = false, renamedTitle = false, choosePaymentWording = false, onAddAccountPayment }: FakturaModalProps) {
  const { t } = useLanguage();
  const allInvoices = useMemo(() => mockInvoicesFor(customer), [customer]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<'pickup' | 'account'>('pickup');
  const [amountText, setAmountText] = useState('');
  const [amountError, setAmountError] = useState(false);
  const [query, setQuery] = useState('');
  const needle = query.trim().toLowerCase();
  const invoices = needle
    ? allInvoices.filter((inv) =>
        [inv.number, inv.customerRef, inv.dueDate, formatAmount(inv.total - inv.prepaid)].some((v) => v.toLowerCase().includes(needle)))
    : allInvoices;
  const showSearch = accountPaymentTab && !accountPaymentSideBySide && tab === 'pickup';
  const amount = parseFloat(amountText.replace(/\s/g, '').replace(',', '.')) || 0;
  const sideBySide = accountPaymentSideBySide;
  const isAccountTab = accountPaymentOnly || (accountPaymentTab && !sideBySide && tab === 'account');

  const hand = customer && MOCK_BY_CUSTOMER_NUMBER[customer.customerNumber]?.balances;
  const invoiced = hand ? hand.invoiced : parseKr(customer?.invoicedBalance);
  const total = hand ? hand.total : parseKr(customer?.totalBalance);
  const balanceRows: Array<[string, number]> = [
    [t('dueBalance'), hand ? hand.due : parseKr(customer?.dueBalance)],
    [t('invoicedBalance'), invoiced],
    [t('orderBalance'), hand ? hand.order : Math.max(total - invoiced, 0)],
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

  const accountPanel = (
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
                  onChange={(e) => {
                    const value = e.target.value;
                    // Digits plus one decimal separator; anything else is rejected with an error.
                    if (/^\d*[.,]?\d*$/.test(value)) {
                      setAmountText(value);
                      setAmountError(false);
                    } else {
                      setAmountError(true);
                    }
                  }}
                  aria-invalid={amountError}
                  aria-describedby={amountError ? 'account-payment-error' : undefined}
                  className="bg-card border h-[48px] rounded-[var(--radius)] px-[14px] text-foreground w-full"
                  style={{ fontSize: 'var(--text-base)', borderColor: amountError ? 'var(--destructive)' : 'var(--border)' }}
                />
                {amountError && (
                  <p id="account-payment-error" role="alert" style={{ fontSize: 'var(--text-sm)', color: 'var(--destructive)', textAlign: 'left', margin: 0 }}>
                    {t('digitsOnlyError')}
                  </p>
                )}
              </div>
            </div>
  );

  const invoicePanel = invoices.length === 0 ? (

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
                            aria-label={`${inv.kind === 'creditNote' ? t('creditNote') : t('invoice')} ${inv.number}`}
                            className="size-[24px] rounded-[var(--radius-sm)]"
                          />
                        </span>
                        <span className="flex flex-col text-foreground" style={{ fontSize: 'var(--text-base)' }}>
                          <span>{inv.kind === 'creditNote' ? t('creditNote') : t('invoice')} {inv.number}</span>
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
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999, background: 'rgba(9,9,20,0.45)' }}>
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className="relative flex flex-col bg-card rounded-[var(--radius)] shadow-lg overflow-hidden w-full"
        style={{ maxWidth: sideBySide ? 1040 : 640, maxHeight: 'calc(100vh - 48px)', margin: '0 16px' }}
      >
        {/* Header */}
        <div className="flex items-center gap-[10px] p-[20px] shrink-0">
          <FileText className="text-foreground" size={24} />
          <p className="text-foreground font-semibold" style={{ fontSize: 'var(--text-lg)' }}>
            {accountPaymentOnly ? t('createAccountPaymentTab') : accountPaymentTab || sideBySide || renamedTitle ? t('invoiceForPayment') : t('pickupInvoiceForPayment')}
          </p>
        </div>

        {accountPaymentTab && !sideBySide && (
          <div className="flex gap-[24px] px-[20px] shrink-0 border-b border-border" role="tablist">
            {([['pickup', t(choosePaymentWording ? 'chooseInvoiceTab' : 'pickupInvoiceTab')], ['account', t('accountPayment')]] as const).map(([id, label]) => (
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
        <div className="flex flex-col flex-1 min-h-0 px-[20px] pb-[20px]" style={accountPaymentTab && !sideBySide ? { paddingTop: 20 } : undefined}>
          {sideBySide ? (
            <div className="flex flex-1 min-h-0 gap-[20px] items-start">
              <div className="flex flex-col flex-1 min-w-0 min-h-0 self-stretch">{invoicePanel}</div>
              <div className="flex flex-col gap-[15px]" style={{ width: 340, flexShrink: 0 }}>
                {accountPanel}
                <button
                  onClick={() => onAddAccountPayment?.(amount)}
                  disabled={amount <= 0}
                  className="h-[48px] rounded-[var(--radius)] px-[20px] cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    background: amount <= 0 ? 'var(--secondary)' : 'var(--primary)',
                    color: amount <= 0 ? 'var(--secondary-foreground)' : 'var(--primary-foreground)',
                    opacity: amount <= 0 ? 0.6 : 1,
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'],
                  }}
                >
                  {t('addToSale')}
                </button>
              </div>
            </div>
          ) : isAccountTab ? accountPanel : showSearch ? (
            <div className="flex flex-col flex-1 min-h-0 gap-[15px]">
              <div className="flex flex-col gap-[8px] shrink-0">
                <label htmlFor="invoice-search" className="text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  {t('searchForInvoices')}
                </label>
                <div className="relative">
                  <input
                    id="invoice-search"
                    type="text"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('searchInvoicesPlaceholder')}
                    className="bg-card border border-border h-[48px] rounded-[var(--radius)] pl-[14px] pr-[44px] text-foreground w-full focus:outline-none focus:border-primary"
                    style={{ fontSize: 'var(--text-base)' }}
                  />
                  <Search size={18} className="absolute text-muted-foreground pointer-events-none" style={{ right: 14, top: 15 }} aria-hidden />
                </div>
              </div>
              {invoicePanel}
            </div>
          ) : invoicePanel}
        </div>

        <ModalCTAFooter
          onCancel={onClose}
          onConfirm={() => (isAccountTab ? onAddAccountPayment?.(amount) : onPickup?.(allInvoices.filter((inv) => selected.has(inv.id))))}
          cancelText={t('cancel')}
          confirmText={isAccountTab ? t('addToSale') : t(choosePaymentWording ? 'addToPayment' : 'pickupForPayment')}
          confirmDisabled={isAccountTab ? amount <= 0 : selected.size === 0}
        />
      </div>
    </div>
  );
}

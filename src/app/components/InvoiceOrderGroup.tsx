import { useState } from 'react';
import { X } from 'lucide-react';
import { GroupCell, GroupHeader } from './GroupHeader';
import { useLanguage } from '../contexts/LanguageContext';
import type { InvoiceForPayment } from '../types/pos';

interface InvoiceOrderGroupProps {
  invoice: InvoiceForPayment;
  onRemove: () => void;
}

/**
 * An invoice picked up for payment, shown in the sale as a single collapsible
 * row. Collapsed it reads like an order group; expanded it shows the amounts
 * and the "Remove from sale" action.
 */
export function InvoiceOrderGroup({ invoice, onRemove }: InvoiceOrderGroupProps) {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const remaining = invoice.total - invoice.prepaid;
  const isAccount = invoice.kind === 'account';

  const summary: Array<[string, string]> = [
    [t('total'), invoice.total.toFixed(2)],
    [t('prepaid'), `-${invoice.prepaid.toFixed(2)}`],
    [t('remaining'), remaining.toFixed(2)],
  ];

  return (
    <div className="relative rounded-[5px] overflow-hidden shrink-0 w-full" style={{ backgroundColor: 'var(--card)' }}>
      <div aria-hidden="true" className="absolute inset-0 z-10 rounded-[5px] border border-solid pointer-events-none" style={{ borderColor: 'var(--border)' }} />

      <GroupHeader
        first={<GroupCell title={isAccount ? t('accountPayment') : `${invoice.kind === 'creditNote' ? t('creditNote') : t('invoice')} ${invoice.number}`} subtitle={isAccount ? undefined : invoice.dueDate} />}
        second={isAccount ? null : <GroupCell title={invoice.customerRef} />}
        total={remaining}
        lineCount={1}
        hideLineCount
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />

      {isExpanded && (
        <div className="flex items-end justify-between gap-[20px] p-[10px]" style={{ borderTop: '1px solid var(--border)' }}>
          <button
            onClick={onRemove}
            className="relative box-border flex h-[48px] items-center justify-center gap-[8px] rounded-[5px] px-[13px] py-[6px] hover:bg-[#f2f6f9] transition-colors"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <span aria-hidden="true" className="absolute inset-0 rounded-[5px] border border-solid pointer-events-none" style={{ borderColor: 'var(--border)' }} />
            <X size={14} strokeWidth={1.5} aria-hidden />
            <span className="text-nowrap" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
              {t('removeFromSale')}
            </span>
          </button>

          {!isAccount && <div className="flex flex-col gap-[8px] min-w-[200px] pr-[10px]">
            {summary.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-[16px]" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                <span style={{ fontWeight: 'var(--font-weight-semibold)' }}>{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>}
        </div>
      )}
    </div>
  );
}

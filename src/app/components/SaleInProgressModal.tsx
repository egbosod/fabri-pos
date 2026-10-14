import { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface SaleInProgressModalProps {
  onPark: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

/**
 * Shown when the cashier starts a new sale while one is still open.
 * Park keeps the old sale aside, Delete discards it, Cancel changes nothing.
 */
export function SaleInProgressModal({ onPark, onDelete, onCancel }: SaleInProgressModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onCancel]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onCancel} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sale-in-progress-title"
        className="pointer-events-auto bg-card rounded-[3px] shadow-lg flex flex-col gap-[20px] p-[20px] max-w-[460px] w-full"
      >
        <p id="sale-in-progress-title" className="text-foreground font-semibold" style={{ fontSize: 'var(--text-lg)' }}>
          {t('saleInProgressTitle')}
        </p>
        <p className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
          {t('saleInProgressBody')}
        </p>
        <div className="flex gap-[10px]">
          <button
            onClick={onPark}
            autoFocus
            className="h-[48px] rounded-[var(--radius)] px-[20px] font-semibold"
            style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
          >
            {t('parkSale')}
          </button>
          <button
            onClick={onDelete}
            className="h-[48px] rounded-[var(--radius)] px-[20px] font-semibold"
            style={{ backgroundColor: 'var(--destructive)', color: 'var(--destructive-foreground, #fff)' }}
          >
            {t('deleteSale')}
          </button>
          <button onClick={onCancel} className="h-[48px] rounded-[var(--radius)] px-[20px] font-semibold border border-border">
            {t('cancel')}
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

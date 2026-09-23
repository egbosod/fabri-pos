import { useEffect, useState } from 'react';
import { Printer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

type ReceiptChoice = 'regular' | 'a4' | 'none';

interface DeliveryNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Fires on Confirm — completes the sale as a packing slip. */
  onConfirm: () => void;
}

const SALESPEOPLE = ['612', '118', '204'];

/**
 * Step 2 of the packing slip flow: receipt handling and the salesperson on the
 * sale, confirmed to issue the packing slip.
 */
export function DeliveryNoteModal({ isOpen, onClose, onConfirm }: DeliveryNoteModalProps) {
  const { t } = useLanguage();
  const [receipt, setReceipt] = useState<ReceiptChoice>('none');
  const [sendEmail, setSendEmail] = useState(false);
  const [salesperson, setSalesperson] = useState(SALESPEOPLE[0]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Fresh choices each time the step is entered.
  useEffect(() => {
    if (!isOpen) return;
    setReceipt('none');
    setSendEmail(false);
    setSalesperson(SALESPEOPLE[0]);
  }, [isOpen]);

  if (!isOpen) return null;

  const receiptOptions: Array<{ value: ReceiptChoice; label: string }> = [
    { value: 'regular', label: t('regularReceipt') },
    { value: 'a4', label: t('a4Receipt') },
    { value: 'none', label: t('noReceipt') },
  ];

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto bg-card rounded-[var(--radius)] shadow-lg max-w-[580px] w-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-[10px] p-[20px] border-b border-border">
            <Printer className="text-foreground" size={24} />
            <p className="text-foreground font-semibold" style={{ fontSize: 'var(--text-lg)' }}>
              {t('deliveryNote')}
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-[15px] p-[20px]">
            <div className="grid grid-cols-2 gap-[20px] rounded-[var(--radius)] border border-border p-[20px]">
              <fieldset className="flex flex-col gap-[12px]">
                <legend className="text-foreground font-semibold mb-[12px]" style={{ fontSize: 'var(--text-base)' }}>
                  {t('printReceipt')}
                </legend>
                {receiptOptions.map((option) => (
                  <label key={option.value} className="flex items-center gap-[10px] cursor-pointer">
                    <input
                      type="radio"
                      name="delivery-note-receipt"
                      className="size-[18px] accent-[var(--primary)] cursor-pointer"
                      checked={receipt === option.value}
                      onChange={() => setReceipt(option.value)}
                    />
                    <span className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>{option.label}</span>
                  </label>
                ))}
              </fieldset>

              <div className="flex flex-col gap-[12px]">
                <p className="text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                  {t('digitalReceipt')}
                </p>
                <button
                  onClick={() => setSendEmail(!sendEmail)}
                  className="flex items-center gap-[12px] cursor-pointer"
                  role="switch"
                  aria-checked={sendEmail}
                >
                  <span className="h-[26px] w-[48px] relative shrink-0">
                    <span
                      className="absolute inset-[15%_0_15%_2.7%] rounded-[125px] transition-colors block"
                      style={{ backgroundColor: sendEmail ? '#86cbfd' : '#989899' }}
                    />
                    <span
                      className="absolute top-0 rounded-[125px] border-[1.5px] border-solid shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)] transition-all size-[26px] block"
                      style={{
                        backgroundColor: sendEmail ? 'var(--primary)' : 'white',
                        borderColor: sendEmail ? 'var(--primary)' : '#d5d5d7',
                        left: sendEmail ? '22px' : '0',
                      }}
                    />
                  </span>
                  <span className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>{t('sendEmail')}</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-[8px] rounded-[var(--radius)] border border-border p-[20px]">
              <label htmlFor="delivery-note-salesperson" className="text-foreground font-semibold" style={{ fontSize: 'var(--text-base)' }}>
                {t('salesperson')} <span className="text-destructive">*</span>
              </label>
              <select
                id="delivery-note-salesperson"
                value={salesperson}
                onChange={(e) => setSalesperson(e.target.value)}
                className="bg-card border border-border h-[48px] rounded-[var(--radius)] px-[14px] text-foreground cursor-pointer w-full"
                style={{ fontSize: 'var(--text-base)' }}
              >
                {SALESPEOPLE.map((seller) => (
                  <option key={seller} value={seller}>{seller}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-[10px] p-[20px] border-t border-border">
            <button
              onClick={onConfirm}
              className="h-[48px] rounded-[var(--radius)] px-[20px] bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 transition-colors"
            >
              {t('confirm')}
            </button>
            <button
              onClick={onClose}
              className="h-[48px] rounded-[var(--radius)] px-[20px] border border-border cursor-pointer hover:bg-muted/50 transition-colors"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import { CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ModalCTAFooter } from './ModalCTAFooter';
import type { ProCardData } from '../types/pos';
import { EgList } from './EgList';

/**
 * PRO card (XL-BYG/Aspect4 / Prototype B). A detached modal, deliberately not
 * a tab inside CustomerSelectionModal — keeps this flow independent from the
 * existing VIP card flow (Prototype C / Aspect4 DK).
 */

// ─── Mocked Aspect4 lookup (no real webservice exists yet — spec open item #6) ───

const MOCK_PRO_CARDS: Record<string, ProCardData> = {
  '9001': {
    cardNumber: '9001',
    customerNumber: 'XLB-1042',
    customerName: 'Nordbygg Entreprenør AS',
    address: { line1: 'Industrivegen 12', postalCode: '3050', city: 'Mjøndalen' },
    creditLimit: 75000,
    status: 'open',
    projectRequired: true,
    requisitionRequired: true,
  },
  '9002': {
    cardNumber: '9002',
    customerNumber: 'XLB-2087',
    customerName: 'Vestlandshus Bygg AS',
    address: { line1: 'Kaigata 4', postalCode: '5020', city: 'Bergen' },
    creditLimit: 40000,
    status: 'open',
    projectRequired: false,
    requisitionRequired: true,
  },
  '9003': {
    cardNumber: '9003',
    customerNumber: 'XLB-3311',
    customerName: 'Fjordtre Snekkerverksted',
    address: { line1: 'Skogveien 8', postalCode: '6100', city: 'Volda' },
    creditLimit: 20000,
    status: 'blocked',
    projectRequired: false,
    requisitionRequired: false,
  },
};

export function lookupProCard(cardNumber: string): ProCardData | null {
  return MOCK_PRO_CARDS[cardNumber.trim()] ?? null;
}

export function generateFakeProScan(): ProCardData {
  const pool = Object.values(MOCK_PRO_CARDS);
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─── Shared field primitives (kept local — not shared with CustomerSelectionModal) ───

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: 'block', marginBottom: 4, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--card-foreground)', lineHeight: 1.75 }}>
      {children}
    </span>
  );
}

function InputBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', height: 48, display: 'flex', alignItems: 'center', padding: '0 14px' }}>
      {children}
    </div>
  );
}

const baseInputStyle: React.CSSProperties = {
  flex: 1,
  border: 'none',
  outline: 'none',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 'var(--text-base)',
  background: 'transparent',
  lineHeight: 1.75,
  color: 'var(--foreground)',
};

interface ProCardModalProps {
  /** Sale vs. price check — price check never shows mandatory-field capture (those only matter once a sale starts). */
  context: 'sale' | 'priceCheck';
  proCard: ProCardData | null;
  setProCard: (card: ProCardData | null) => void;
  mandatoryFields: { requisitionNumber: string; projectNumber: string; projectName: string };
  setMandatoryFields: (fields: { requisitionNumber: string; projectNumber: string; projectName: string }) => void;
  saleTotal?: number;
  /** Simulated offline toggle (Settings) — no real network detection exists in this prototype. */
  simulateOffline?: boolean;
  onClose: () => void;
}

export function ProCardModal({
  context,
  proCard,
  setProCard,
  mandatoryFields,
  setMandatoryFields,
  saleTotal = 0,
  simulateOffline = false,
  onClose,
}: ProCardModalProps) {
  const { t } = useLanguage();
  const [cardNumberInput, setCardNumberInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleScanOrSubmit = () => {
    if (simulateOffline) {
      setError(t('proCardOfflineError'));
      return;
    }
    const card = lookupProCard(cardNumberInput);
    if (!card) {
      setError(t('proCardNotFound'));
      return;
    }
    setError(null);
    setProCard(card);
  };

  const handleRemove = () => {
    setProCard(null);
    setMandatoryFields({ requisitionNumber: '', projectNumber: '', projectName: '' });
    setCardNumberInput('');
    setError(null);
  };

  const creditRemaining = proCard ? proCard.creditLimit - saleTotal : 0;
  const overLimit = proCard ? creditRemaining < 0 : false;

  const canConfirm =
    !!proCard &&
    proCard.status === 'open' &&
    (context === 'priceCheck' ||
      ((!proCard.requisitionRequired || mandatoryFields.requisitionNumber.trim() !== '') &&
        (!proCard.projectRequired || mandatoryFields.projectNumber.trim() !== '')));

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto bg-card rounded-[3px] shadow-lg max-w-[520px] w-full flex flex-col max-h-[85vh]">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: 20, borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <CreditCard className="text-primary" size={24} />
              <p style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 'var(--text-lg)', color: 'var(--foreground)', margin: 0 }}>
                {t('proCardModalTitle')}
              </p>
              {proCard && (
                <>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--card-foreground)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    – {proCard.customerName} – {t('proCardRegistered')} –
                  </span>
                  <span style={{
                    flexShrink: 0,
                    padding: '3px 10px',
                    borderRadius: 'var(--radius)',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: 'var(--text-sm)',
                    whiteSpace: 'nowrap',
                    color: proCard.status === 'open' ? 'var(--chart-2)' : 'var(--destructive)',
                    background: proCard.status === 'open'
                      ? 'color-mix(in srgb, var(--chart-2) 14%, var(--card))'
                      : 'color-mix(in srgb, var(--destructive) 14%, var(--card))',
                    border: `1px solid color-mix(in srgb, ${proCard.status === 'open' ? 'var(--chart-2)' : 'var(--destructive)'} 35%, transparent)`,
                  }}>
                    {proCard.status === 'open' ? t('proCardStatusOpen') : t('proCardStatusBlocked')}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="overflow-y-auto" style={{ display: 'flex', flexDirection: 'column', gap: 15, padding: 20 }}>
            {!proCard && (
              <div>
                <FieldLabel>{t('proCardNumberLabel')}</FieldLabel>
                <InputBox>
                  <input
                    autoFocus
                    style={baseInputStyle}
                    value={cardNumberInput}
                    placeholder={t('proCardNumberPlaceholder')}
                    onChange={e => setCardNumberInput(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') handleScanOrSubmit(); }}
                  />
                </InputBox>
              </div>
            )}

            {error && (
              <div style={{ background: 'color-mix(in srgb, var(--destructive) 15%, var(--card))', borderRadius: 'var(--radius-sm)', padding: 15 }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', color: 'var(--foreground)', lineHeight: 1.75, margin: 0 }}>
                  {error}
                </p>
              </div>
            )}

            {proCard && proCard.status === 'blocked' && (
              <div style={{ background: 'color-mix(in srgb, var(--destructive) 15%, var(--card))', borderRadius: 'var(--radius-sm)', padding: 15 }}>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', color: 'var(--foreground)', lineHeight: 1.75, margin: 0 }}>
                  {t('proCardBlockedError')}
                </p>
              </div>
            )}

            {proCard && (
              <>
                {/* Overridden customer data — read-only, sourced from the card */}
                <div>
                  <FieldLabel>{t('name')}</FieldLabel>
                  <InputBox>
                    <span style={{ ...baseInputStyle, color: 'var(--muted-foreground)' }}>{proCard.customerName}</span>
                  </InputBox>
                </div>
                {proCard.address && (
                  <div>
                    <FieldLabel>{t('address1')}</FieldLabel>
                    <InputBox>
                      <span style={{ ...baseInputStyle, color: 'var(--muted-foreground)' }}>
                        {proCard.address.line1}, {proCard.address.postalCode} {proCard.address.city}
                      </span>
                    </InputBox>
                  </div>
                )}

                {/* Credit panel — warning-only over limit, matches Prototype C's non-blocking pattern */}
                <EgList
                  title={t('proCardCreditTitle')}
                  tone={overLimit ? 'danger' : 'default'}
                  rows={[
                    { label: t('proCardCreditUsed'), value: saleTotal.toLocaleString() },
                    {
                      label: t('proCardCreditRemaining'),
                      value: creditRemaining.toLocaleString(),
                      emphasise: true,
                      valueColor: overLimit ? 'var(--destructive)' : undefined,
                    },
                  ]}
                  footer={overLimit && (
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 'var(--text-xs)', color: 'var(--destructive)', lineHeight: 1.5 }}>
                      {t('overCreditLimit')}
                    </span>
                  )}
                />

                {/* Mandatory fields — sale context only; not shown for price check */}
                {context === 'sale' && (
                  <>
                    <div>
                      <FieldLabel>{proCard.requisitionRequired ? `${t('proCardRequisitionLabel')} *` : t('proCardRequisitionLabel')}</FieldLabel>
                      <InputBox>
                        <input
                          style={baseInputStyle}
                          value={mandatoryFields.requisitionNumber}
                          onChange={e => setMandatoryFields({ ...mandatoryFields, requisitionNumber: e.target.value })}
                        />
                      </InputBox>
                    </div>
                    {proCard.projectRequired && (
                      <div style={{ display: 'flex', gap: 15 }}>
                        <div style={{ flex: 1 }}>
                          <FieldLabel>{`${t('proCardProjectNumberLabel')} *`}</FieldLabel>
                          <InputBox>
                            <input
                              style={baseInputStyle}
                              value={mandatoryFields.projectNumber}
                              onChange={e => setMandatoryFields({ ...mandatoryFields, projectNumber: e.target.value })}
                            />
                          </InputBox>
                        </div>
                        <div style={{ flex: 1 }}>
                          <FieldLabel>{t('proCardProjectNameLabel')}</FieldLabel>
                          <InputBox>
                            <input
                              style={baseInputStyle}
                              value={mandatoryFields.projectName}
                              onChange={e => setMandatoryFields({ ...mandatoryFields, projectName: e.target.value })}
                            />
                          </InputBox>
                        </div>
                      </div>
                    )}
                    <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 0 }}>
                      {t('proCardDeliveryNoteOnly')}
                    </p>
                  </>
                )}
                {context === 'priceCheck' && (
                  <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', margin: 0 }}>
                    {t('proCardPricingContext')}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <ModalCTAFooter
            onCancel={onClose}
            onConfirm={proCard ? onClose : handleScanOrSubmit}
            cancelText={t('cancel')}
            confirmText={proCard ? t('confirm') : t('proCardScanAction')}
            confirmDisabled={proCard ? !canConfirm : cardNumberInput.trim() === ''}
            extraAction={proCard ? { label: t('removeProCard'), onClick: handleRemove } : undefined}
          />
        </div>
      </div>
    </>
  );
}

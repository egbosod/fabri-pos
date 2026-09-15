import { useEffect } from 'react';

interface FakturaModalProps {
  onClose: () => void;
  customerName?: string;
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function InvoiceIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="var(--muted-foreground)" strokeWidth="1.5" fill="none" />
      <path d="M8 7H16M8 11H16M8 15H12" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function FakturaModal({ onClose, customerName }: FakturaModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999, background: 'rgba(9,9,20,0.45)' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal card */}
      <div
        className="relative flex flex-col rounded-[var(--radius)] overflow-hidden"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          boxShadow: '0 8px 32px 0 rgba(9,9,20,0.16)',
          width: 480,
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between shrink-0"
          style={{ padding: '15px 20px', borderBottom: '1px solid var(--border)' }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--foreground)',
            }}
          >
            Faktura til betaling
            {customerName && (
              <span
                style={{
                  fontWeight: 400,
                  color: 'var(--muted-foreground)',
                  marginLeft: 8,
                }}
              >
                — {customerName}
              </span>
            )}
          </span>

          {/* Tertiary close button — text-only, no border */}
          <button
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: 'var(--radius)',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--muted-foreground)',
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--foreground)';
              e.currentTarget.style.background = 'var(--muted)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted-foreground)';
              e.currentTarget.style.background = 'transparent';
            }}
            aria-label="Lukk"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div
          className="flex flex-col items-center justify-center gap-[12px]"
          style={{ padding: '48px 32px', minHeight: 220 }}
        >
          <InvoiceIcon />
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'var(--text-base)',
              fontWeight: 600,
              color: 'var(--foreground)',
              textAlign: 'center',
            }}
          >
            Ingen fakturaer til betaling
          </span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              textAlign: 'center',
              maxWidth: 320,
            }}
          >
            Fakturaer til betaling for denne kunden vil vises her. Funksjonaliteten er under utvikling.
          </span>
        </div>

        {/* Footer — secondary close button */}
        <div
          className="flex items-center justify-end shrink-0"
          style={{ padding: '12px 20px', borderTop: '1px solid var(--border)' }}
        >
          <button
            onClick={onClose}
            style={{
              height: 40,
              padding: '0 20px',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--foreground)',
              transition: 'border-color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.background = 'color-mix(in srgb, var(--primary) 6%, transparent)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Lukk
          </button>
        </div>
      </div>
    </div>
  );
}

interface ModalCTAFooterProps {
  onCancel: () => void;
  onConfirm: () => void;
  cancelText: string;
  confirmText: string;
  confirmDisabled?: boolean;
}

export function ModalCTAFooter({
  onCancel,
  onConfirm,
  cancelText,
  confirmText,
  confirmDisabled = false,
}: ModalCTAFooterProps) {
  return (
    <div
      style={{
        background: 'var(--card)',
        borderTop: '1px solid var(--border)',
        boxShadow: '0px -2px 6px rgba(0,0,0,0.04)',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20,
        padding: '15px 20px',
        width: '100%',
        boxSizing: 'border-box',
        flexShrink: 0,
      }}
    >
      {/* Confirm — filled primary (FIRST) */}
      <button
        onClick={onConfirm}
        disabled={confirmDisabled}
        style={{
          height: 48,
          minWidth: 100,
          padding: '6px 20px',
          background: confirmDisabled ? 'var(--secondary)' : 'var(--primary)',
          border: 'none',
          borderRadius: 'var(--radius)',
          cursor: confirmDisabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          transition: 'background 0.12s',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'],
          fontSize: 'var(--text-lg)',
          lineHeight: 1.75,
          color: confirmDisabled ? 'var(--secondary-foreground)' : 'var(--primary-foreground)',
          opacity: confirmDisabled ? 0.6 : 1,
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { if (!confirmDisabled) e.currentTarget.style.background = 'color-mix(in srgb, var(--primary) 88%, black)'; }}
        onMouseLeave={e => { if (!confirmDisabled) e.currentTarget.style.background = 'var(--primary)'; }}
      >
        {confirmText}
      </button>

      {/* Cancel — secondary (SECOND) */}
      <button
        onClick={onCancel}
        style={{
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
          gap: 8,
          transition: 'background 0.12s',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'],
          fontSize: 'var(--text-sm)',
          lineHeight: 1.75,
          color: 'var(--foreground)',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--border) 20%, var(--card))')}
        onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
      >
        {cancelText}
      </button>
    </div>
  );
}
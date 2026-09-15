import svgPaths from "../imports/svg-5q11sxhjpw";
import { useLanguage } from '../contexts/LanguageContext';

interface CustomerMenuProps {
  mode: 'sales' | 'pricecheck';
  onEdit: () => void;
  onRemove: () => void;
  onGiftCard?: () => void;
  onBankTerminal?: () => void;
  onExchangeSlip?: () => void;
  onPreviousPurchases?: () => void;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function AccountingDocumentIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Accounting Document">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_26_236)" id="Accounting Document">
          <path d={svgPaths.p385f9150} id="Vector" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d={svgPaths.p2f526c0} id="Vector_2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d={svgPaths.p2dcb5b00} id="Vector_3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d="M4.03101 6.23438V6.74988" id="Vector_4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d="M4.031 2.625V3.1405" id="Vector_5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d="M6 7.5H9" id="Vector_6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d="M3.375 9.75H9" id="Vector_7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
        <defs>
          <clipPath id="clip0_26_236">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function HistoryIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="History">
      <svg className="block size-full" fill="none" viewBox="0 0 12 12">
        {/* Circular arc ~300°, leaving gap at top-right for arrow */}
        <path
          d="M6 2C3.79 2 2 3.79 2 6s1.79 4 4 4 4-1.79 4-4"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arrow head pointing clockwise (at ~1 o'clock position) */}
        <path
          d="M10 2L10 4.5L7.5 3.5"
          stroke="currentColor"
          strokeWidth="0.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Clock hands */}
        <path
          d="M6 4.5V6L7.2 7.2"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function PencilIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_26_221)" id="Pencil">
          <path d={svgPaths.pe38ce80} id="Vector" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d="M8.303 1.13L10.87 3.697" id="Vector_2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d="M1.2605 8.17188L3.83 10.7369" id="Vector_3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
        <defs>
          <clipPath id="clip0_26_221">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function TrashIcon() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Trash">
      <svg className="block size-full" fill="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_trash)">
          <path d="M1.5 3H2.5H10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          <path d="M9.5 3V10C9.5 10.2652 9.39464 10.5196 9.20711 10.7071C9.01957 10.8946 8.76522 11 8.5 11H3.5C3.23478 11 2.98043 10.8946 2.79289 10.7071C2.60536 10.5196 2.5 10.2652 2.5 10V3M4 3V2C4 1.73478 4.10536 1.48043 4.29289 1.29289C4.48043 1.10536 4.73478 1 5 1H7C7.26522 1 7.51957 1.10536 7.70711 1.29289C7.89464 1.48043 8 1.73478 8 2V3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
        </g>
        <defs>
          <clipPath id="clip0_trash">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

// ─── Menu item subcomponent ───────────────────────────────────────────────────

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'highlighted';
}

function MenuItem({ icon, label, onClick, variant = 'default' }: MenuItemProps) {
  const isDestructive = variant === 'destructive';
  const isHighlighted = variant === 'highlighted';

  return (
    <button
      onClick={onClick}
      data-name="Select option"
      style={{
        height: 48,
        width: '100%',
        background: isHighlighted
          ? 'var(--muted)'
          : 'var(--card)',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 15px',
        flexShrink: 0,
        transition: 'background 0.12s',
        outline: 'none',
        textAlign: 'left',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = isDestructive
          ? 'color-mix(in srgb, var(--destructive) 8%, var(--card))'
          : 'color-mix(in srgb, var(--primary) 6%, var(--card))';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = isHighlighted
          ? 'var(--muted)'
          : 'var(--card)';
      }}
      onFocus={e => {
        e.currentTarget.style.outline = '2px solid var(--ring)';
        e.currentTarget.style.outlineOffset = '-2px';
      }}
      onBlur={e => {
        e.currentTarget.style.outline = 'none';
      }}
    >
      <span style={{ color: isDestructive ? 'var(--destructive)' : 'var(--foreground)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
        {icon}
      </span>
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-weight-medium)' as React.CSSProperties['fontWeight'],
          color: isDestructive ? 'var(--destructive)' : 'var(--foreground)',
          lineHeight: 1.75,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

function MenuDivider() {
  return (
    <div
      style={{
        width: '100%',
        height: 1,
        background: 'var(--border)',
        flexShrink: 0,
      }}
    />
  );
}

// ─── CustomerMenu ────────────────────────────────────────────────��────────────

export function CustomerMenu({
  mode,
  onEdit,
  onRemove,
  onGiftCard,
  onBankTerminal,
  onExchangeSlip,
  onPreviousPurchases,
}: CustomerMenuProps) {
  const { t } = useLanguage();

  return (
    <div
      className="relative rounded-[var(--radius)]"
      style={{ background: 'var(--border)' }}
      data-name="Customer menu"
    >
      {/* Item list — gap-px between items via border background */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          overflow: 'hidden',
          borderRadius: 'var(--radius)',
        }}
      >
        {/* 1 · Invoice for payment — always shown, highlighted as first action */}
        <MenuItem
          icon={<AccountingDocumentIcon />}
          label="Faktura til betaling"
          onClick={onExchangeSlip ?? (() => {})}
          variant="highlighted"
        />

        {/* 2 · Previous purchases — always shown */}
        <MenuItem
          icon={<HistoryIcon />}
          label={t('previousPurchases')}
          onClick={onPreviousPurchases ?? (() => {})}
        />

        {/* 3 · Edit — always shown */}
        <MenuItem
          icon={<PencilIcon />}
          label="Rediger"
          onClick={onEdit}
        />

        {/* Divider before destructive action */}
        <MenuDivider />

        {/* 4 · Remove customer — destructive */}
        <MenuItem
          icon={<TrashIcon />}
          label="Fjern kunden"
          onClick={onRemove}
          variant="destructive"
        />
      </div>

      {/* Decorative border + shadow overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          boxShadow: '0 2px 8px 0 rgba(107,107,114,0.10), 0 8px 28px 0 rgba(107,107,114,0.18)',
        }}
      />
    </div>
  );
}

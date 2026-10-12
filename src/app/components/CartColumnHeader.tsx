import { useLanguage } from '../contexts/LanguageContext';
import { CART_COLUMNS, CART_TRAILING_PADDING, CART_TRAILING_WIDTH, NAME_COLUMN_STYLE } from './cartColumnWidths';

interface CartColumnHeaderProps {
  /** Shown in the trailing slot, e.g. the line count. */
  trailing?: React.ReactNode;
  className?: string;
}

/**
 * The cart's column labels. Used for the cart itself and inside every expanded
 * group, so a group's lines read against the same columns as the cart above it.
 */
export function CartColumnHeader({ trailing, className = '' }: CartColumnHeaderProps) {
  const { t } = useLanguage();
  const columns = [
    { label: t('itemName'), width: undefined, align: 'items-start' },
    { label: t('quantity'), width: CART_COLUMNS.ANTALL, align: 'items-end' },
    { label: t('perUnit'), width: CART_COLUMNS.PER_ENHET, align: 'items-end' },
    { label: t('discount'), width: CART_COLUMNS.RABATT, align: 'items-end' },
    { label: t('total'), width: CART_COLUMNS.TOTALT, align: 'items-end' },
  ];

  return (
    <div className={`box-border flex items-start overflow-clip pb-[10px] pt-0 px-0 w-full ${className}`}>
      {columns.map((col) => (
        <div
          key={col.label}
          className={`box-border flex flex-col h-[28px] ${col.align} justify-end overflow-clip px-[10px] shrink-0`}
          style={{ ...(col.width ? { width: `${col.width}px` } : NAME_COLUMN_STYLE), fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', color: 'var(--muted-foreground)' }}
        >
          <p className="leading-[normal] whitespace-pre text-nowrap">{col.label}</p>
        </div>
      ))}
      <div className="shrink-0 flex items-end justify-end h-[28px]" style={{ width: `${CART_TRAILING_WIDTH}px`, paddingRight: `${CART_TRAILING_PADDING}px` }}>
        {trailing}
      </div>
    </div>
  );
}

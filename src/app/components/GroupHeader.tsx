import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  CART_COLUMNS,
  CART_PRE_TOTAL_WIDTH,
  CART_TRAILING_PADDING,
  CART_TRAILING_WIDTH,
  GROUP_HEADER_FIRST_CELL_WIDTH,
} from './cartColumnWidths';

interface GroupCellProps {
  title?: string;
  subtitle?: string;
  struck?: boolean;
}

/** One header cell: a medium title over a muted subtitle. */
export function GroupCell({ title, subtitle, struck }: GroupCellProps) {
  const strike = struck ? 'line-through' : '';
  return (
    <div className="flex min-w-0 flex-col gap-[2px]">
      {title && (
        <div className={`truncate ${strike}`} style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
          {title}
        </div>
      )}
      {subtitle && (
        <div className={`truncate ${strike}`} style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

interface GroupHeaderProps {
  first: React.ReactNode;
  second?: React.ReactNode;
  total?: number;
  lineCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  struck?: boolean;
  /** Status pill shown just left of the group total. */
  badge?: React.ReactNode;
  /** Hide the "n lines" count, e.g. for a single-line invoice. */
  hideLineCount?: boolean;
}

/**
 * The collapsed row of a grouped order. The total sits on the cart's Totalt
 * column; the line count and chevron end on a fixed right edge, so every
 * group's chevron lines up whatever else its header carries.
 */
export function GroupHeader({ first, second, total, lineCount, isExpanded, onToggle, struck, badge, hideLineCount }: GroupHeaderProps) {
  const { t } = useLanguage();
  const strike = struck ? 'line-through' : '';

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={isExpanded}
      className="flex items-center min-h-[56px] py-[8px] cursor-pointer hover:bg-[rgba(13,151,252,0.05)] transition-colors"
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div className="shrink-0 px-[10px]" style={{ width: `${GROUP_HEADER_FIRST_CELL_WIDTH}px` }}>
        {first}
      </div>
      <div className="min-w-0 flex-1 px-[10px]">
        {second}
      </div>
      {/* Over the Antall / Per enhet / Rabatt columns, which a group header leaves empty */}
      <div className="flex shrink-0 items-center justify-end px-[10px]" style={{ width: `${CART_PRE_TOTAL_WIDTH}px` }}>
        {badge}
      </div>
      <div
        className={`shrink-0 px-[10px] text-right ${strike}`}
        style={{ width: `${CART_COLUMNS.TOTALT}px`, fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}
      >
        {total !== undefined && total.toFixed(2)}
      </div>
      <div className="flex shrink-0 items-center justify-end gap-[12px]" style={{ width: `${CART_TRAILING_WIDTH}px`, paddingRight: `${CART_TRAILING_PADDING}px` }}>
        {!hideLineCount && (
          <span className={`text-nowrap ${strike}`} style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
            {lineCount} {t('orderLines')}
          </span>
        )}
        <ChevronDown
          className={`shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          style={{ color: 'var(--muted-foreground)' }}
          size={20}
          strokeWidth={2.25}
          aria-hidden
        />
      </div>
    </div>
  );
}

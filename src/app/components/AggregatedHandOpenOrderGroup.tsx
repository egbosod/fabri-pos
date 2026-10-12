import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { CART_COLUMNS, CART_TRAILING_WIDTH, NAME_COLUMN_STYLE } from './cartColumnWidths';
import { CartColumnHeader } from './CartColumnHeader';
import { GroupCell, GroupHeader } from './GroupHeader';

interface OrderLine {
  id: string;
  productName: string;
  productCode: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  discount: number;
  total: number;
  originalTotal?: number;
}

interface AggregatedHandOpenOrderGroupProps {
  orderNumber: string;
  source: string;
  dateTime: string;
  totalAmount: number;
  prepaidAmount?: number;
  remainingAmount?: number;
  lines: OrderLine[];
  badge?: string;
  onRemoveAll?: () => void;
}

export function AggregatedHandOpenOrderGroup({
  orderNumber,
  source = "Håndterminal",
  dateTime,
  totalAmount,
  prepaidAmount,
  remainingAmount,
  lines,
  badge,
  onRemoveAll
}: AggregatedHandOpenOrderGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDeleted) {
      setIsDeleted(true);
    } else {
      setIsDeleted(false);
    }
  };

  return (
    <div
      className="relative w-full rounded-[5px] overflow-hidden transition-colors duration-200"
      style={{ backgroundColor: isDeleted ? 'var(--muted)' : 'var(--card)' }}
    >
      <div aria-hidden="true" className="absolute inset-0 z-10 rounded-[5px] border border-solid pointer-events-none" style={{ borderColor: 'var(--border)' }} />
      <GroupHeader
        first={<GroupCell title={source} subtitle={dateTime} struck={isDeleted} />}
        second={<GroupCell title={orderNumber} struck={isDeleted} />}
        total={totalAmount}
        lineCount={lines.length}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        struck={isDeleted}
        badge={badge && (
          <div
            className={`px-[12px] py-[6px] rounded-[4px] font-medium ${isDeleted ? 'line-through' : ''}`}
            style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)', fontSize: 'var(--text-sm)' }}
          >
            {badge}
          </div>
        )}
      />

      {/* Expanded Content */}
      {isExpanded && (
        <div className="py-[16px]" style={{ borderTop: '1px solid var(--border)' }}>
          <CartColumnHeader />

          {/* Order Lines */}
          <div className="flex flex-col gap-[8px]">
            {lines.map((line) => (
              <div 
                key={line.id} 
                className={`flex items-center py-[12px] rounded-[3px] ${isDeleted ? 'line-through' : ''}`}
                style={{ backgroundColor: 'var(--secondary)' }}
              >
                {/* Product name and code */}
                <div className="px-[10px]" style={{ ...NAME_COLUMN_STYLE }}>
                  <div className="font-medium" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                    {line.productName}
                  </div>
                  <div className="font-normal" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                    {line.productCode}
                  </div>
                </div>

                {/* Quantity */}
                <div className="px-[10px] text-right" style={{ width: `${CART_COLUMNS.ANTALL}px` }}>
                  <div className="flex items-baseline justify-end gap-[4px]">
                    <span className="font-normal" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                      {line.quantity.toFixed(2)}
                    </span>
                    <span className="font-normal" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                      {line.unit}
                    </span>
                  </div>
                  <div className="h-[2px] mt-[4px]" style={{ backgroundColor: 'var(--muted-foreground)' }} />
                </div>

                {/* Price per unit */}
                <div className="px-[10px] text-right" style={{ width: `${CART_COLUMNS.PER_ENHET}px` }}>
                  <div className="font-normal" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                    {line.pricePerUnit.toFixed(2)}
                  </div>
                  <div className="h-[2px] mt-[4px]" style={{ backgroundColor: 'var(--muted-foreground)' }} />
                </div>

                {/* Discount */}
                <div className="px-[10px] text-right" style={{ width: `${CART_COLUMNS.RABATT}px` }}>
                  <div className="flex items-baseline justify-end gap-[2px]">
                    <span className="font-normal" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                      {line.discount}
                    </span>
                    <span className="font-semibold" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      %
                    </span>
                  </div>
                  <div className="h-[2px] mt-[4px]" style={{ backgroundColor: 'var(--muted-foreground)' }} />
                </div>

                {/* Total */}
                <div className="px-[10px] text-right" style={{ width: `${CART_COLUMNS.TOTALT}px` }}>
                  <div className="font-medium" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                    {line.total.toFixed(2)}
                  </div>
                  {line.originalTotal && line.originalTotal > line.total && (
                    <div className="font-normal line-through" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                      {line.originalTotal.toFixed(2)}
                    </div>
                  )}
                </div>
                
                <div className="shrink-0" style={{ width: `${CART_TRAILING_WIDTH}px` }} />
              </div>
            ))}
          </div>

          {/* Summary and Actions */}
          <div className="flex items-end justify-between mt-[24px] pt-[16px] px-[10px]" style={{ borderTop: '1px solid var(--border)' }}>
            {/* Remove All / Undo Button */}
            <button
              onClick={handleDeleteToggle}
              className={`flex items-center gap-[8px] px-[16px] py-[10px] rounded-[4px] transition-colors ${
                isDeleted 
                  ? 'hover:bg-[rgba(13,151,252,0.1)]' 
                  : 'hover:bg-[rgba(242,76,53,0.1)]'
              }`}
              style={{
                border: isDeleted ? '1px solid var(--primary)' : '1px solid var(--destructive)',
                color: isDeleted ? 'var(--primary)' : 'var(--destructive)'
              }}
            >
              {isDeleted ? (
                <>
                  <RotateCcw size={16} />
                  <span className="font-medium" style={{ fontSize: 'var(--text-base)' }}>
                    Undo
                  </span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5.33398 4.00033V2.66699C5.33398 2.00033 6.00065 1.33366 6.66732 1.33366H9.33398C10.0007 1.33366 10.6673 2.00033 10.6673 2.66699V4.00033" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-medium" style={{ fontSize: 'var(--text-base)' }}>
                    Remove all items from sale
                  </span>
                </>
              )}
            </button>

            {/* Summary */}
            <div className="flex flex-col gap-[8px] min-w-[200px]">
              <div className="flex items-center justify-between">
                <span className="font-medium" style={{ fontSize: 'var(--text-base)', color: 'var(--muted-foreground)' }}>
                  Total
                </span>
                <span className="font-medium" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                  {totalAmount.toFixed(2)}
                </span>
              </div>
              {prepaidAmount !== undefined && prepaidAmount !== 0 && (
                <div className="flex items-center justify-between">
                  <span className="font-medium" style={{ fontSize: 'var(--text-base)', color: 'var(--muted-foreground)' }}>
                    Prepaid
                  </span>
                  <span className="font-medium" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                    {prepaidAmount.toFixed(2)}
                  </span>
                </div>
              )}
              {remainingAmount !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="font-medium" style={{ fontSize: 'var(--text-base)', color: 'var(--muted-foreground)' }}>
                    Remaining
                  </span>
                  <span className="font-medium" style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                    {remainingAmount.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

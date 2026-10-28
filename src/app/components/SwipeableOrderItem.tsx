import { CART_COLUMNS, CART_TRAILING_WIDTH, NAME_COLUMN_STYLE } from './cartColumnWidths';
import { SwipeActionPanels } from './SwipeActionPanels';
import { baseState, isStruck, type OrderLineState } from './orderLineState';
import { useOrderLineSwipe } from './useOrderLineSwipe';
import { useLanguage } from '../contexts/LanguageContext';

export type { OrderLineState };

interface SwipeableOrderItemProps {
  productName: string;
  productCode: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  discount: number;
  total: number;
  originalTotal?: number;
  label?: {
    text: string;
    color: string;
    bgColor: string;
  };
  state?: OrderLineState;
  locked?: boolean;
  commitOnRelease?: boolean;
  onStateChange?: (newState: OrderLineState) => void;
  /** Tapping the product name opens the item details drawer. */
  onOpenDetails?: () => void;
  /** The line whose details drawer is open. */
  active?: boolean;
  onQuantityChange?: (value: number) => void;
  onPriceChange?: (value: number) => void;
  onDiscountChange?: (value: number) => void;
}

export function SwipeableOrderItem({
  productName,
  productCode,
  quantity,
  unit,
  pricePerUnit,
  discount,
  total,
  originalTotal,
  label,
  state = 'normal',
  locked,
  commitOnRelease,
  onStateChange,
  onOpenDetails,
  active,
  onQuantityChange,
  onPriceChange,
  onDiscountChange
}: SwipeableOrderItemProps) {
  const { tLabel } = useLanguage();
  const { confirm, wasDragged, rowStyle, rowHandlers } = useOrderLineSwipe(state, onStateChange, { locked, commitOnRelease });

  const base = baseState(state);
  // Content is struck through from the moment a delete is armed until it is undone.
  const isDeleted = isStruck(state);
  const editable = state === 'normal';
  const showUnderline = state !== 'deleted';
  // A returned line reads as a negative quantity.
  const displayQuantity = base === 'returned' && quantity > 0 ? -quantity : quantity;

  const getBackgroundColor = () => (isDeleted ? 'var(--muted)' : active ? 'var(--row-active)' : 'var(--secondary)');

  return (
    <div 
      className="relative overflow-hidden h-[62px] w-full"
      style={{ 
        borderRadius: 'var(--radius)',
        touchAction: 'pan-y'
      }}
    >
      <SwipeActionPanels state={state} onConfirm={confirm} />

      {/* Main row content - swipeable */}
      <div 
        className="absolute content-stretch flex items-start left-0 overflow-visible top-0 w-full cursor-grab active:cursor-grabbing"
        style={{
          backgroundColor: getBackgroundColor(),
          borderRadius: 'var(--radius)',
          paddingRight: `${CART_TRAILING_WIDTH}px`,
          ...rowStyle
        }}
        data-name="Table/Row"
        {...rowHandlers}
      >
        {/* Product name and code */}
        <div
          className="box-border content-stretch flex flex-col h-[62px] items-start justify-center px-[10px] py-[5px] relative shrink-0"
          style={{ ...NAME_COLUMN_STYLE }}
          onClick={() => { if (state === 'normal' && !wasDragged()) onOpenDetails?.(); }}
        >
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
            <div className="flex flex-col font-['Montserrat',sans-serif] justify-center leading-[0] relative shrink-0 text-[0px] text-nowrap">
              <p className="leading-[19px] whitespace-pre">
                <span 
                  className={`font-['Montserrat',sans-serif] text-[14px] ${isDeleted ? 'line-through' : ''}`}
                  style={{ 
                    fontWeight: 'var(--font-weight-medium)',
                    color: 'var(--foreground)'
                  }}
                >
                  {productName}
                </span>
                <span className="text-[14px]">
                  <br aria-hidden="true" />
                </span>
                <span 
                  className={`text-[12px] ${isDeleted ? 'line-through' : ''}`}
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {productCode}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Quantity */}
        <div className="box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.ANTALL}px` }}>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
            <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
              <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0">
                <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                  <input
                    type="text"
                    value={displayQuantity.toFixed(2)}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && onQuantityChange) onQuantityChange(val);
                    }}
                    disabled={!editable}
                    className={`font-['Montserrat',sans-serif] bg-transparent border-none outline-none text-right w-[40px] ${isDeleted ? 'line-through' : ''}`}
                    style={{ 
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-normal)',
                      color: displayQuantity < 0 ? 'var(--destructive)' : 'var(--foreground)',
                      lineHeight: '1.38'
                    }}
                  />
                </div>
              </div>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className={`font-['Montserrat',sans-serif] ${isDeleted ? 'line-through' : ''}`} style={{ fontSize: '14px', color: 'var(--foreground)' }}>
                  <p className="leading-[normal] whitespace-pre">{unit}</p>
                </div>
              </div>
              {showUnderline && (
                <div className="absolute h-0 left-0 top-[21.5px] w-[65px]">
                  <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 2">
                      <line stroke="var(--muted-foreground)" strokeWidth="2" x2="65" y1="1" y2="1" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Price per unit */}
        <div className="box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.PER_ENHET}px` }}>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
            <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0">
              <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                <input
                  type="text"
                  value={pricePerUnit.toFixed(2)}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val) && onPriceChange) onPriceChange(val);
                  }}
                  disabled={!editable}
                  className={`font-['Montserrat',sans-serif] bg-transparent border-none outline-none text-right w-full ${isDeleted ? 'line-through' : ''}`}
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-normal)',
                    color: 'var(--foreground)',
                    lineHeight: '1.38'
                  }}
                />
              </div>
              {showUnderline && (
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 2">
                      <line stroke="var(--muted-foreground)" strokeWidth="2" x2="44" y1="1" y2="1" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Discount */}
        <div className="box-border content-stretch flex flex-col h-[62px] items-end justify-center pl-[10px] pr-[4px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.RABATT}px` }}>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
            <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0">
              <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-nowrap">
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    if (!isNaN(val) && onDiscountChange) onDiscountChange(val);
                  }}
                  disabled={!editable}
                  className={`font-['Montserrat',sans-serif] bg-transparent border-none outline-none text-right w-[20px] ${isDeleted ? 'line-through' : ''}`}
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-normal)',
                    color: 'var(--foreground)',
                    lineHeight: '1.38'
                  }}
                />
                <div className={`font-['Montserrat',sans-serif] flex flex-col justify-center relative shrink-0 text-[12px] ${isDeleted ? 'line-through' : ''}`} style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--secondary-foreground)' }}>
                  <p className="leading-[1.38] text-nowrap whitespace-pre">%</p>
                </div>
              </div>
              {showUnderline && (
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 2">
                      <line stroke="var(--muted-foreground)" strokeWidth="2" x2="29" y1="1" y2="1" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.TOTALT}px` }}>
          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
            <div className="flex flex-col font-['Montserrat',sans-serif] justify-center leading-[19px] relative shrink-0 text-[0px] text-nowrap text-right whitespace-pre">
              <p className={`mb-0 text-[14px] ${isDeleted ? 'line-through' : ''}`} style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--foreground)' }}>
                {total.toFixed(2)}
              </p>
              {originalTotal && originalTotal > total && (
                <p 
                  className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Montserrat',sans-serif] line-through text-[12px]"
                  style={{ 
                    fontWeight: 'var(--font-weight-normal)',
                    color: 'var(--muted-foreground)'
                  }}
                >
                  {originalTotal.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Label overlay */}
      {label && (
        <div className="absolute content-stretch flex items-start left-[76px] top-[33px]" style={rowStyle}>
          <div 
            className="box-border content-stretch flex gap-[10px] h-[17px] items-center justify-center px-[4px] py-[2px]"
            style={{ 
              backgroundColor: base === 'deleted' ? 'var(--muted)' : label.bgColor,
              borderRadius: '3px'
            }}
          >
            <p 
              className="font-['Montserrat',sans-serif] leading-[1.75] relative shrink-0 text-[11px] text-nowrap whitespace-pre"
              style={{ 
                fontWeight: 'var(--font-weight-normal)',
                color: base === 'deleted' ? 'var(--muted-foreground)' : label.color
              }}
            >
              {tLabel(label.text)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

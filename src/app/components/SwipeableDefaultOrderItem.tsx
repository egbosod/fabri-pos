import { useState, useRef } from 'react';
import { CART_COLUMNS, CART_TRAILING_WIDTH, NAME_COLUMN_STYLE } from './cartColumnWidths';
import { UnitCodeConvertModal } from './UnitCodeConvertModal';
import { SwipeActionPanels } from './SwipeActionPanels';
import { baseState, isStruck, type OrderLineState } from './orderLineState';
import { useOrderLineSwipe } from './useOrderLineSwipe';
import { useLanguage } from '../contexts/LanguageContext';

export type { OrderLineState };

interface SwipeableDefaultOrderItemProps {
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
  onStateChange?: (newState: OrderLineState) => void;
  onQuantityChange?: (newQuantity: number, newUnit: string) => void;
}

export function SwipeableDefaultOrderItem({
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
  onStateChange,
  onQuantityChange
}: SwipeableDefaultOrderItemProps) {
  const { tLabel } = useLanguage();
  const { confirm, rowStyle, rowHandlers } = useOrderLineSwipe(state, onStateChange);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quantityRef = useRef<HTMLDivElement>(null);
  const [previewQuantity, setPreviewQuantity] = useState<string | null>(null);
  const [previewUnit, setPreviewUnit] = useState<string | null>(null);

  const base = baseState(state);
  // Content is struck through from the moment a delete is armed until it is undone.
  const isDeleted = isStruck(state);
  const editable = state === 'normal';
  const showUnderline = state !== 'deleted';
  // A returned line reads as a negative quantity.
  const signedQuantity = base === 'returned' && quantity > 0 ? -quantity : quantity;

  const getBackgroundColor = () => (isDeleted ? 'var(--muted)' : 'var(--secondary)');

  const handleQuantityClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editable) {
      setIsModalOpen(true);
    }
  };

  const handleSaveQuantity = (newQuantity: number, newUnit: string) => {
    if (onQuantityChange) {
      onQuantityChange(newQuantity, newUnit);
    }
  };

  const handleChangeToReturn = () => {
    if (onStateChange) {
      onStateChange('return');
    }
  };

  const handleSplitLine = () => {
    // TODO: Implement split line functionality
    console.log('Split line clicked');
  };

  const handleInputChange = (value: string, newUnit: string) => {
    setPreviewQuantity(value);
    setPreviewUnit(newUnit);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewQuantity(null);
    setPreviewUnit(null);
  };

  // Determine what quantity to display - preview or actual
  const displayQuantity = previewQuantity !== null ? previewQuantity : signedQuantity.toFixed(2).replace('.', ',');
  const displayUnit = previewUnit !== null ? previewUnit : unit;

  return (
    <>
      <UnitCodeConvertModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currentQuantity={quantity}
        currentUnit={unit}
        pricePerUnit={pricePerUnit}
        onSave={handleSaveQuantity}
        onChangeToReturn={handleChangeToReturn}
        onSplitLine={handleSplitLine}
        onInputChange={handleInputChange}
        anchorElement={quantityRef.current}
      />
      
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
          className="absolute content-stretch flex items-center left-0 overflow-visible top-0 w-full h-[62px] cursor-grab active:cursor-grabbing"
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
          <div className="flex items-center px-[10px] py-[5px] h-full" style={{ ...NAME_COLUMN_STYLE }}>
            <div className="flex flex-col">
              <span 
                className={`font-['Montserrat',sans-serif] ${isDeleted ? 'line-through' : ''}`}
                style={{ 
                  fontSize: 'var(--text-base)', 
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--foreground)',
                  lineHeight: '19px'
                }}
              >
                {productName}
              </span>
              <span 
                className={`font-['Montserrat',sans-serif] ${isDeleted ? 'line-through' : ''}`}
                style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-weight-normal)',
                  color: 'var(--muted-foreground)',
                  lineHeight: '19px'
                }}
              >
                {productCode}
              </span>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center justify-end px-[10px] py-[5px] h-full relative" style={{ width: `${CART_COLUMNS.ANTALL}px` }}>
            {/* Minus button - shown when modal is open, layered on left */}
            {isModalOpen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const value = quantity - 1;
                  if (value > 0 && onQuantityChange) {
                    onQuantityChange(value, unit);
                  }
                }}
                className="absolute box-border content-stretch flex gap-[13.333px] items-center justify-center px-[13.333px] py-[8px] size-[48px] cursor-pointer z-10"
                style={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--elevation-sm)',
                  right: 'calc(100% + 10px)',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <div className="overflow-clip relative shrink-0 size-[13px]">
                  <div className="absolute inset-[43.75%_8.33%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 2">
                      <g>
                        <path clipRule="evenodd" d="M0 0.8125C0 0.363769 0.285309 0 0.637255 0H10.1961C10.548 0 10.8333 0.363769 10.8333 0.8125C10.8333 1.26123 10.548 1.625 10.1961 1.625H0.637255C0.285309 1.625 0 1.26123 0 0.8125Z" fill="var(--foreground)" fillRule="evenodd" />
                      </g>
                    </svg>
                  </div>
                </div>
              </button>
            )}
            
            <div 
              className="flex items-center gap-[5px] relative" 
              ref={quantityRef} 
              onClick={handleQuantityClick}
              style={{ 
                cursor: editable ? 'pointer' : 'default',
                backgroundColor: isModalOpen ? '#cfeafe' : 'transparent',
                padding: isModalOpen ? '8px 12px' : '0',
                borderRadius: isModalOpen ? 'var(--radius)' : '0'
              }}
            >
              <span 
                className={`font-['Montserrat',sans-serif] ${isDeleted ? 'line-through' : ''}`}
                style={{ 
                  fontSize: 'var(--text-base)', 
                  fontWeight: 'var(--font-weight-normal)',
                  color: signedQuantity < 0 ? 'var(--destructive)' : 'var(--foreground)',
                  lineHeight: '1.38'
                }}
              >
                {displayQuantity}
              </span>
              <span 
                className={`font-['Montserrat',sans-serif] ${isDeleted ? 'line-through' : ''}`}
                style={{ 
                  fontSize: 'var(--text-base)', 
                  fontWeight: 'var(--font-weight-normal)',
                  color: signedQuantity < 0 ? 'var(--destructive)' : 'var(--foreground)'
                }}
              >
                {displayUnit}
              </span>
              {showUnderline && !isModalOpen && (
                <div className="absolute left-0 bottom-[-2px] h-[2px] w-[65px]">
                  <svg width="65" height="2" viewBox="0 0 65 2" fill="none">
                    <line x1="0" y1="1" x2="65" y2="1" stroke="var(--muted-foreground)" strokeWidth="2" />
                  </svg>
                </div>
              )}
              {isModalOpen && (
                <div className="absolute left-0 bottom-[11.5px] h-0 right-0">
                  <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 94 2">
                      <line stroke="var(--primary)" strokeWidth="2" x2="94" y1="1" y2="1" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Plus button - shown when modal is open, layered on right */}
            {isModalOpen && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const value = quantity + 1;
                  if (onQuantityChange) {
                    onQuantityChange(value, unit);
                  }
                }}
                className="absolute box-border content-stretch flex gap-[13.333px] items-center justify-center px-[13.333px] py-[8px] size-[48px] cursor-pointer z-10"
                style={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--elevation-sm)',
                  left: 'calc(100% + 10px)',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <div className="overflow-clip relative shrink-0 size-[13px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                    <g>
                      <path clipRule="evenodd" d="M0 6.49908C0 6.07675 0.34237 5.73438 0.764706 5.73438H12.2353C12.6576 5.73438 13 6.07675 13 6.49908C13 6.92142 12.6576 7.26379 12.2353 7.26379H0.764706C0.34237 7.26379 0 6.92142 0 6.49908Z" fill="var(--foreground)" fillRule="evenodd" />
                      <path clipRule="evenodd" d="M6.50005 0C6.92239 0 7.26476 0.34237 7.26476 0.764706V12.2353C7.26476 12.6576 6.92239 13 6.50005 13C6.07772 13 5.73535 12.6576 5.73535 12.2353V0.764706C5.73535 0.34237 6.07772 0 6.50005 0Z" fill="var(--foreground)" fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
              </button>
            )}
          </div>

          {/* Price per unit */}
          <div className="flex flex-col items-end justify-center px-[10px] py-[5px] h-full" style={{ width: `${CART_COLUMNS.PER_ENHET}px` }}>
            <span 
              className={`font-['Montserrat',sans-serif] ${isDeleted ? 'line-through' : ''}`}
              style={{ 
                fontSize: 'var(--text-base)', 
                fontWeight: 'var(--font-weight-normal)',
                color: 'var(--foreground)',
                lineHeight: '1.38'
              }}
            >
              {pricePerUnit.toFixed(2)}
            </span>
            {showUnderline && (
              <div className="h-[2px] w-full mt-[4px]">
                <svg width="44" height="2" viewBox="0 0 44 2" fill="none" className="ml-auto">
                  <line x1="0" y1="1" x2="44" y2="1" stroke="var(--muted-foreground)" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>

          {/* Discount */}
          <div className="flex flex-col items-end justify-center px-[10px] py-[5px] h-full" style={{ width: `${CART_COLUMNS.RABATT}px` }}>
            <div className="flex items-center gap-[3px]">
              <span 
                className={`font-['Montserrat',sans-serif] ${isDeleted ? 'line-through' : ''}`}
                style={{ 
                  fontSize: 'var(--text-base)', 
                  fontWeight: 'var(--font-weight-normal)',
                  color: 'var(--foreground)',
                  lineHeight: '1.38'
                }}
              >
                {discount}
              </span>
              <span 
                className={`font-['Montserrat',sans-serif] ${isDeleted ? 'line-through' : ''}`}
                style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--secondary-foreground)',
                  lineHeight: '1.38'
                }}
              >
                %
              </span>
            </div>
            {showUnderline && (
              <div className="h-[2px] w-full mt-[4px]">
                <svg width="29" height="2" viewBox="0 0 29 2" fill="none" className="ml-auto">
                  <line x1="0" y1="1" x2="29" y2="1" stroke="var(--muted-foreground)" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex flex-col items-end justify-center px-[10px] py-[5px] h-full" style={{ width: `${CART_COLUMNS.TOTALT}px` }}>
            <span 
              className={`font-['Montserrat',sans-serif] ${isDeleted ? 'line-through' : ''}`}
              style={{ 
                fontSize: 'var(--text-base)', 
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--foreground)',
                lineHeight: '19px'
              }}
            >
              {total.toFixed(2)}
            </span>
            {originalTotal && originalTotal > total && (
              <span 
                className={`font-['Montserrat',sans-serif] line-through ${isDeleted ? 'line-through' : ''}`}
                style={{ 
                  fontSize: 'var(--text-sm)', 
                  fontWeight: 'var(--font-weight-normal)',
                  color: 'var(--muted-foreground)',
                  lineHeight: '19px'
                }}
              >
                {originalTotal.toFixed(2)}
              </span>
            )}
          </div>

          {/* Label overlay */}
          {label && (
            <div className="absolute left-[76px] top-[33px]">
              <div 
                className="flex items-center justify-center px-[4px] py-[2px] h-[17px]"
                style={{ 
                  backgroundColor: base === 'deleted' ? 'var(--muted)' : label.bgColor,
                  borderRadius: '3px'
                }}
              >
                <span 
                  className="font-['Montserrat',sans-serif]"
                  style={{ 
                    fontSize: 'var(--text-xs)', 
                    fontWeight: 'var(--font-weight-normal)',
                    color: base === 'deleted' ? 'var(--muted-foreground)' : label.color,
                    lineHeight: '1.75'
                  }}
                >
                  {tLabel(label.text)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
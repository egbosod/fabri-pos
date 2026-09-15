import { useState, useRef, useEffect } from 'react';
import svgPaths from "../imports/svg-5et5s4h24b";
import { CART_COLUMNS } from './cartColumnWidths';
import { UnitCodeConvertModal } from './UnitCodeConvertModal';

export type OrderLineState = 'normal' | 'return' | 'returned' | 'delete' | 'deleted';

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

function CheckIcon({ visible }: { visible: boolean }) {
  return (
    <div className="relative size-[20px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="check" opacity={visible ? "1" : "0"}>
          <path d={svgPaths.p20b4f190} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function DeleteIcon() {
  return (
    <div className="relative size-[24px]" data-name="Icon / Delete">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g clipPath="url(#clip0_199_6841)" id="Icon / Delete">
          <path clipRule="evenodd" d={svgPaths.p32297a00} fill="var(--foreground)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_199_6841">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
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
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quantityRef = useRef<HTMLDivElement>(null);
  const [previewQuantity, setPreviewQuantity] = useState<string | null>(null);
  const [previewUnit, setPreviewUnit] = useState<string | null>(null);

  // Calculate visual properties based on state
  const isDeleted = state === 'deleted';
  const isReturned = state === 'returned';
  const showDeleteInfo = swipeOffset < -150 || state === 'delete';
  
  // Background color based on state
  const getBackgroundColor = () => {
    if (isDeleted) return 'rgba(242, 76, 53, 0.1)';
    if (isReturned) return 'rgba(255, 140, 33, 0.1)';
    return 'var(--secondary)';
  };

  // Handle touch/mouse events for swipe
  const handleStart = (clientX: number) => {
    if (isDeleted || isReturned) return; // Don't allow swiping on completed states
    setIsDragging(true);
    startXRef.current = clientX;
    currentXRef.current = swipeOffset;
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startXRef.current;
    const newOffset = currentXRef.current + diff;
    // Limit swipe range: right swipe 0 to +200, left swipe 0 to -300
    const limitedOffset = Math.max(-300, Math.min(200, newOffset));
    setSwipeOffset(limitedOffset);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Determine action based on swipe distance
    if (swipeOffset > 100) {
      // Swiped right - trigger return
      if (state === 'normal' && onStateChange) {
        onStateChange('return');
      }
      setSwipeOffset(0);
    } else if (swipeOffset < -150) {
      // Swiped left - trigger delete
      if (state === 'normal' && onStateChange) {
        onStateChange('delete');
      }
      setSwipeOffset(0);
    } else {
      // Not far enough - reset
      setSwipeOffset(0);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Add global mouse listeners when dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, swipeOffset]);

  // Handle click on delete action button
  const handleDeleteClick = () => {
    if (state === 'delete' && onStateChange) {
      onStateChange('deleted');
    }
  };

  const handleReturnClick = () => {
    if (state === 'return' && onStateChange) {
      onStateChange('returned');
    }
  };

  const handleQuantityClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDeleted && !isReturned) {
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
  const displayQuantity = previewQuantity !== null ? previewQuantity : quantity.toFixed(2).replace('.', ',');
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
        ref={containerRef}
        className="relative overflow-hidden h-[62px] w-full"
        style={{ 
          borderRadius: 'var(--radius)',
          touchAction: 'pan-y'
        }}
      >
        {/* Background layer - Return (orange) and Delete (red) zones */}
        <div className="absolute inset-0 flex" data-name="background">
          <div 
            className="absolute h-full left-0 top-0 cursor-pointer"
            style={{ 
              backgroundColor: '#ff8c21',
              borderRadius: 'var(--radius)',
              width: '394px'
            }}
            onClick={handleReturnClick}
          />
          <div 
            className="absolute h-full right-0 top-0 cursor-pointer"
            style={{ 
              backgroundColor: '#f24c35',
              borderRadius: 'var(--radius)',
              width: '373px'
            }}
            onClick={handleDeleteClick}
          />
        </div>

        {/* Delete info - appears on right when swiping left */}
        <div 
          className="absolute content-stretch flex gap-[11px] items-center right-[20px] top-[19px] transition-opacity cursor-pointer"
          style={{ opacity: showDeleteInfo ? 1 : 0 }}
          data-name="slettinfo"
          onClick={handleDeleteClick}
        >
          <p className="font-['Montserrat',sans-serif] leading-[1.75] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">
            Slett
          </p>
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] ml-[3px] mt-px relative">
              <CheckIcon visible={false} />
            </div>
            <div className="[grid-area:1_/_1] ml-0 mt-0 relative">
              <DeleteIcon />
            </div>
          </div>
        </div>

        {/* Main row content - swipeable */}
        <div 
          className="absolute content-stretch flex items-center left-0 overflow-visible top-0 w-full h-[62px] cursor-grab active:cursor-grabbing"
          style={{ 
            backgroundColor: getBackgroundColor(),
            borderRadius: 'var(--radius)',
            transform: `translateX(${swipeOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
          data-name="Table/Row"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Product name and code */}
          <div className="flex items-center px-[10px] py-[5px] h-full" style={{ width: `${CART_COLUMNS.VARENAVN}px` }}>
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
                cursor: !isDeleted && !isReturned ? 'pointer' : 'default',
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
                  color: quantity < 0 ? 'var(--destructive)' : 'var(--foreground)',
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
                  color: quantity < 0 ? 'var(--destructive)' : 'var(--foreground)'
                }}
              >
                {displayUnit}
              </span>
              {!isDeleted && !isModalOpen && (
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
            {!isDeleted && (
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
            {!isDeleted && (
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
          {label && !isDeleted && (
            <div className="absolute left-[76px] top-[33px]">
              <div 
                className="flex items-center justify-center px-[4px] py-[2px] h-[17px]"
                style={{ 
                  backgroundColor: label.bgColor,
                  borderRadius: '3px'
                }}
              >
                <span 
                  className="font-['Montserrat',sans-serif]"
                  style={{ 
                    fontSize: 'var(--text-xs)', 
                    fontWeight: 'var(--font-weight-normal)',
                    color: label.color,
                    lineHeight: '1.75'
                  }}
                >
                  {label.text}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
import { useState, useRef, useEffect } from 'react';
import svgPaths from "../imports/svg-5et5s4h24b";
import { CART_COLUMNS } from './cartColumnWidths';

export type OrderLineState = 'normal' | 'return' | 'returned' | 'delete' | 'deleted';

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
  onStateChange?: (newState: OrderLineState) => void;
  onQuantityChange?: (value: number) => void;
  onPriceChange?: (value: number) => void;
  onDiscountChange?: (value: number) => void;
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
  onStateChange,
  onQuantityChange,
  onPriceChange,
  onDiscountChange
}: SwipeableOrderItemProps) {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate visual properties based on state
  const isDeleted = state === 'deleted';
  const isReturned = state === 'returned';
  const showCheck = isReturned;
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

  return (
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
        className="absolute content-stretch flex items-start left-0 overflow-visible top-0 w-full cursor-grab active:cursor-grabbing"
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
        <div className="box-border content-stretch flex flex-col h-[62px] items-start justify-center px-[10px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.VARENAVN}px` }}>
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
                    value={quantity.toFixed(2)}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val) && onQuantityChange) onQuantityChange(val);
                    }}
                    disabled={isDeleted || isReturned}
                    className={`font-['Montserrat',sans-serif] bg-transparent border-none outline-none text-right w-[40px] ${isDeleted ? 'line-through' : ''}`}
                    style={{ 
                      fontSize: '14px',
                      fontWeight: 'var(--font-weight-normal)',
                      color: quantity < 0 ? 'var(--destructive)' : 'var(--foreground)',
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
              {!isDeleted && !isReturned && (
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
                  disabled={isDeleted || isReturned}
                  className={`font-['Montserrat',sans-serif] bg-transparent border-none outline-none text-right w-full ${isDeleted ? 'line-through' : ''}`}
                  style={{ 
                    fontSize: '14px',
                    fontWeight: 'var(--font-weight-normal)',
                    color: 'var(--foreground)',
                    lineHeight: '1.38'
                  }}
                />
              </div>
              {!isDeleted && !isReturned && (
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
                  disabled={isDeleted || isReturned}
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
              {!isDeleted && !isReturned && (
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

        {/* Check icon - shown for returned items */}
        {showCheck && (
          <div className="absolute left-[10px] top-[21px]">
            <CheckIcon visible={true} />
          </div>
        )}
      </div>

      {/* Label overlay */}
      {label && !isDeleted && (
        <div className="absolute content-stretch flex items-start left-[76px] top-[33px]">
          <div 
            className="box-border content-stretch flex gap-[10px] h-[17px] items-center justify-center px-[4px] py-[2px]"
            style={{ 
              backgroundColor: label.bgColor,
              borderRadius: '3px'
            }}
          >
            <p 
              className="font-['Montserrat',sans-serif] leading-[1.75] relative shrink-0 text-[11px] text-nowrap whitespace-pre"
              style={{ 
                fontWeight: 'var(--font-weight-normal)',
                color: label.color
              }}
            >
              {label.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

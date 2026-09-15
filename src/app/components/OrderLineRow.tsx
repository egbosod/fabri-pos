import { useState, useRef, useEffect } from 'react';
import svgPaths from "../imports/svg-vpcqh9x9io";
import { CheckIcon, RotateCcwIcon, UndoIcon } from 'lucide-react';
import { CART_COLUMNS } from './cartColumnWidths';

export type OrderLineState = 
  | 'normal' 
  | 'return' 
  | 'return-success' 
  | 'returned'
  | 'regret-return'
  | 'regret-return-success'
  | 'delete' 
  | 'delete-success' 
  | 'deleted'
  | 'undo-delete'
  | 'undo-delete-success';

interface OrderLineRowProps {
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
  onDelete?: () => void;
  onReturn?: () => void;
  onUndoDelete?: () => void;
}

export function OrderLineRow({
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
  onDelete,
  onReturn,
  onUndoDelete
}: OrderLineRowProps) {
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const rowRef = useRef<HTMLDivElement>(null);

  // Reset swipe when state changes
  useEffect(() => {
    setSwipeX(0);
  }, [state]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (['delete-success', 'return-success', 'regret-return-success', 'undo-delete-success'].includes(state)) {
      return; // Don't allow swiping in success states
    }
    setIsDragging(true);
    setStartX(e.touches[0].clientX - swipeX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX - startX;
    
    // Allow left swipe only for delete action
    const limitedX = Math.max(-200, Math.min(0, currentX));
    setSwipeX(limitedX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Full swipe triggers action
    if (swipeX < -150) {
      triggerDeleteAction();
    } else if (swipeX < -50) {
      // Partial reveal - snap to partial position
      setSwipeX(-100);
    } else {
      // Snap back
      setSwipeX(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (['delete-success', 'return-success', 'regret-return-success', 'undo-delete-success'].includes(state)) {
      return;
    }
    setIsDragging(true);
    setStartX(e.clientX - swipeX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX - startX;
    const limitedX = Math.max(-200, Math.min(0, currentX));
    setSwipeX(limitedX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (swipeX < -150) {
      triggerDeleteAction();
    } else if (swipeX < -50) {
      setSwipeX(-100);
    } else {
      setSwipeX(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, swipeX, startX]);

  const triggerDeleteAction = () => {
    setSwipeX(0);
    if (state === 'deleted' || state === 'undo-delete') {
      // Undo delete
      onStateChange?.('undo-delete-success');
      onUndoDelete?.();
      setTimeout(() => {
        onStateChange?.('normal');
      }, 1500);
    } else {
      // Delete
      onStateChange?.('delete-success');
      onDelete?.();
      setTimeout(() => {
        onStateChange?.('deleted');
      }, 1500);
    }
  };

  const handleDeleteClick = () => {
    triggerDeleteAction();
  };

  // Get state badge configuration
  const getStateBadge = () => {
    switch (state) {
      case 'return-success':
        return {
          bgColor: 'bg-[#48b76e]',
          icon: <CheckIcon className="size-4 text-white" />,
          text: 'Return success',
          textColor: 'text-white'
        };
      case 'return':
      case 'returned':
        return {
          bgColor: 'bg-[#48b76e]',
          icon: (
            <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          ),
          text: 'Return',
          textColor: 'text-white'
        };
      case 'regret-return-success':
        return {
          bgColor: 'bg-[#ff8c21]',
          icon: <CheckIcon className="size-4 text-white" />,
          text: 'Regret return success',
          textColor: 'text-white'
        };
      case 'regret-return':
        return {
          bgColor: 'bg-[#ff8c21]',
          icon: (
            <svg className="size-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          ),
          text: 'Regret Return',
          textColor: 'text-white'
        };
      case 'delete-success':
        return {
          bgColor: 'bg-destructive',
          icon: <CheckIcon className="size-4 text-white" />,
          text: 'Delete success',
          textColor: 'text-white'
        };
      case 'undo-delete':
        return {
          bgColor: 'bg-[#48b76e]',
          icon: <RotateCcwIcon className="size-4 text-white" />,
          text: 'Undo delete',
          textColor: 'text-white'
        };
      case 'undo-delete-success':
        return {
          bgColor: 'bg-[#48b76e]',
          icon: <CheckIcon className="size-4 text-white" />,
          text: 'Undo delete success',
          textColor: 'text-white'
        };
      default:
        return null;
    }
  };

  const stateBadge = getStateBadge();

  // Check if row should be shown with state badge overlay
  const hasStateBadge = ['return', 'return-success', 'returned', 'regret-return', 'regret-return-success', 'delete-success', 'undo-delete', 'undo-delete-success'].includes(state);

  // Check if row is in deleted state (grayed out)
  const isDeleted = state === 'deleted';

  return (
    <div className="h-[72px] overflow-clip relative rounded-[var(--radius)] shrink-0 w-full">
      {/* Delete background (revealed on swipe left) */}
      {!hasStateBadge && (
        <div 
          className="absolute bg-destructive h-[62px] right-0 rounded-[var(--radius)] top-0 transition-opacity duration-200"
          style={{ 
            width: '200px',
            opacity: swipeX < -20 ? 1 : 0 
          }}
        >
          <div 
            className="absolute content-stretch flex gap-[11px] items-center justify-center right-[20px] top-[19px] transition-opacity duration-200"
            style={{ opacity: swipeX < -50 ? 1 : 0 }}
          >
            <button
              onClick={handleDeleteClick}
              className="content-stretch flex gap-[8px] items-center"
            >
              <p className="font-semibold leading-[1.75] text-[14px] text-white">
                {isDeleted ? 'Undo delete' : 'Delete'}
              </p>
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start shrink-0">
                <div className="[grid-area:1_/_1] overflow-clip relative size-[24px]">
                  {isDeleted ? (
                    <RotateCcwIcon className="size-full text-white p-1" />
                  ) : (
                    <div className="absolute inset-[7.031%]">
                      <div className="absolute inset-[-3.636%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
                          <g>
                            <path d="M0.75 4.5H21.375" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            <path d={svgPaths.p3c85fbf0} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            <path d="M8.95312 16.4531V9.42188" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            <path d="M13.1719 16.4531V9.42188" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                            <path d={svgPaths.p1a0a1d00} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Main row content (swipeable) */}
      <div
        ref={rowRef}
        className={`absolute content-stretch flex items-start left-0 overflow-clip rounded-[var(--radius)] top-0 w-[747px] transition-transform duration-200 ease-in-out ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } ${isDeleted ? 'opacity-60' : ''}`}
        style={{ 
          transform: `translateX(${swipeX}px)`,
          touchAction: 'pan-y',
          backgroundColor: hasStateBadge && stateBadge ? '' : '#f2f6f9'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
      >
        {/* State badge background (full width) */}
        {hasStateBadge && stateBadge && (
          <div className={`absolute inset-0 ${stateBadge.bgColor} rounded-[var(--radius)] flex items-center px-[10px] gap-[8px]`}>
            {stateBadge.icon}
            <p className={`font-semibold text-[14px] ${stateBadge.textColor}`}>
              {stateBadge.text}
            </p>
          </div>
        )}

        {/* Row content - always rendered for normal states */}
        {!hasStateBadge && (
          <div className="flex items-start w-full h-[62px]">
            {/* Product name cell */}
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.VARENAVN}px` }}>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className={`flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[0px] text-nowrap ${isDeleted ? 'line-through' : ''}`}>
                  <p className="leading-[19px] whitespace-pre">
                    <span className="font-medium text-[14px]">{productName}</span>
                    <span className="text-[14px]">
                      <br aria-hidden="true" />
                    </span>
                    <span className="text-[#6b6b72] text-[12px]">{productCode}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity cell */}
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.ANTALL}px` }}>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                  <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0">
                    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                      <div className={`flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap ${isDeleted ? 'line-through' : ''}`} style={{ color: quantity < 0 ? 'var(--destructive)' : '#090914' }}>
                        <p className="leading-[1.38] whitespace-pre">{quantity.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                    <div className={`flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap ${isDeleted ? 'line-through' : ''}`} style={{ color: quantity < 0 ? 'var(--destructive)' : '#22222c' }}>
                      <p className="leading-[normal] whitespace-pre">{unit}</p>
                    </div>
                  </div>
                  {!isDeleted && (
                    <div className="absolute h-0 left-0 top-[21.5px] w-[65px]">
                      <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 2">
                          <line stroke={quantity < 0 ? 'var(--destructive)' : '#6B6B72'} strokeWidth="2" x2="65" y1="1" y2="1" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price per unit cell */}
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.PER_ENHET}px` }}>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0">
                  <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                    <div className={`flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#090914] text-[14px] text-nowrap ${isDeleted ? 'line-through' : ''}`}>
                      <p className="leading-[1.38] whitespace-pre">{pricePerUnit.toFixed(2)}</p>
                    </div>
                  </div>
                  {!isDeleted && (
                    <div className="h-0 relative shrink-0 w-full">
                      <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 2">
                          <line stroke="#6B6B72" strokeWidth="2" x2="44" y1="1" y2="1" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Discount cell */}
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip pl-[10px] pr-[4px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.RABATT}px` }}>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0">
                  <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-nowrap">
                    <div className={`flex flex-col font-normal justify-center relative shrink-0 text-[#090914] text-[14px] ${isDeleted ? 'line-through' : ''}`}>
                      <p className="leading-[1.38] text-nowrap whitespace-pre">{discount}</p>
                    </div>
                    <div className={`flex flex-col font-semibold justify-center relative shrink-0 text-[#42424a] text-[12px] ${isDeleted ? 'line-through' : ''}`}>
                      <p className="leading-[1.38] text-nowrap whitespace-pre">%</p>
                    </div>
                  </div>
                  {!isDeleted && (
                    <div className="h-0 relative shrink-0 w-full">
                      <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 2">
                          <line stroke="#6B6B72" strokeWidth="2" x2="29" y1="1" y2="1" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Total cell */}
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.TOTALT}px` }}>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className={`flex flex-col font-medium justify-center leading-[19px] relative shrink-0 text-[#22222c] text-[0px] text-nowrap text-right whitespace-pre ${isDeleted ? 'line-through' : ''}`}>
                  <p className="mb-0 text-[14px]">{total.toFixed(2)}</p>
                  {originalTotal && (
                    <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-normal line-through text-[#6b6b72] text-[12px]">
                      {originalTotal.toFixed(2)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Label overlay */}
      {label && !hasStateBadge && (
        <div className="absolute content-stretch flex items-start left-[76px] top-[33px]">
          <div className={`box-border content-stretch flex gap-[10px] h-[17px] items-center justify-center px-[4px] py-[2px] rounded-[3px]`} style={{ backgroundColor: label.bgColor }}>
            <p className="font-normal leading-[1.75] relative shrink-0 text-[#090914] text-[11px] text-nowrap whitespace-pre">{label.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}
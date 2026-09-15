import { useState, useRef, useEffect } from 'react';
import svgPaths from "../imports/svg-vpcqh9x9io";
import { CheckIcon, RotateCcwIcon } from 'lucide-react';
import { OrderLineState } from './OrderLineRow';
import { CART_COLUMNS } from './cartColumnWidths';

interface EditableOrderLineRowProps {
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
  onUpdateQuantity?: (newQuantity: number) => void;
  onUpdatePrice?: (newPrice: number) => void;
  onUpdateDiscount?: (newDiscount: number) => void;
}

export function EditableOrderLineRow({
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
  onUndoDelete,
  onUpdateQuantity,
  onUpdatePrice,
  onUpdateDiscount
}: EditableOrderLineRowProps) {
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [editingField, setEditingField] = useState<'quantity' | 'price' | 'discount' | null>(null);
  const [editValue, setEditValue] = useState('');
  const rowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset swipe when state changes
  useEffect(() => {
    setSwipeX(0);
  }, [state]);

  // Focus input when editing starts
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editingField]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (['delete-success', 'return-success', 'regret-return-success', 'undo-delete-success'].includes(state) || editingField) {
      return;
    }
    setIsDragging(true);
    setStartX(e.touches[0].clientX - swipeX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX - startX;
    const limitedX = Math.max(-200, Math.min(0, currentX));
    setSwipeX(limitedX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    if (swipeX < -150) {
      triggerDeleteAction();
    } else if (swipeX < -50) {
      setSwipeX(-100);
    } else {
      setSwipeX(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (['delete-success', 'return-success', 'regret-return-success', 'undo-delete-success'].includes(state) || editingField) {
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
      onStateChange?.('undo-delete-success');
      onUndoDelete?.();
      setTimeout(() => {
        onStateChange?.('normal');
      }, 1500);
    } else {
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

  const startEditing = (field: 'quantity' | 'price' | 'discount', currentValue: number) => {
    if (state !== 'normal' && state !== 'deleted') return;
    setEditingField(field);
    setEditValue(currentValue.toString());
  };

  const finishEditing = () => {
    if (!editingField) return;

    const numValue = parseFloat(editValue.replace(',', '.'));
    
    if (!isNaN(numValue) && numValue >= 0) {
      switch (editingField) {
        case 'quantity':
          if (numValue > 0) {
            onUpdateQuantity?.(numValue);
          }
          break;
        case 'price':
          onUpdatePrice?.(numValue);
          break;
        case 'discount':
          if (numValue <= 100) {
            onUpdateDiscount?.(numValue);
          }
          break;
      }
    }

    setEditingField(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      finishEditing();
    } else if (e.key === 'Escape') {
      setEditingField(null);
      setEditValue('');
    }
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
  const hasStateBadge = ['return', 'return-success', 'returned', 'regret-return', 'regret-return-success', 'delete-success', 'undo-delete', 'undo-delete-success'].includes(state);
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
              <p className="font-semibold leading-[1.75]" style={{ fontSize: 'var(--text-base)', color: 'white' }}>
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
            <p className={`font-semibold ${stateBadge.textColor}`} style={{ fontSize: 'var(--text-base)' }}>
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
                <div className={`flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[0px] text-nowrap ${isDeleted ? 'line-through' : ''}`} style={{ color: 'var(--foreground)' }}>
                  <p className="leading-[19px] whitespace-pre">
                    <span className="font-medium" style={{ fontSize: 'var(--text-base)' }}>{productName}</span>
                    <span style={{ fontSize: 'var(--text-base)' }}>
                      <br aria-hidden="true" />
                    </span>
                    <span style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>{productCode}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity cell - editable */}
            <div 
              className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0 cursor-pointer hover:bg-[rgba(13,151,252,0.05)] transition-colors"
              style={{ width: `${CART_COLUMNS.ANTALL}px` }}
              onClick={() => !editingField && startEditing('quantity', quantity)}
            >
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                  <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0">
                    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                      {editingField === 'quantity' ? (
                        <input
                          ref={inputRef}
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={finishEditing}
                          onKeyDown={handleKeyDown}
                          className="font-normal border border-primary rounded px-1 outline-none text-right"
                          style={{ 
                            fontSize: 'var(--text-base)', 
                            width: '50px',
                            color: 'var(--foreground)',
                            backgroundColor: 'var(--input-background)'
                          }}
                        />
                      ) : (
                        <div className={`flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-nowrap ${isDeleted ? 'line-through' : ''}`} style={{ fontSize: 'var(--text-base)', color: quantity < 0 ? 'var(--destructive)' : 'var(--foreground)' }}>
                          <p className="leading-[1.38] whitespace-pre">{quantity.toFixed(2)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                    <div className={`flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-nowrap ${isDeleted ? 'line-through' : ''}`} style={{ fontSize: 'var(--text-base)', color: quantity < 0 ? 'var(--destructive)' : 'var(--foreground)' }}>
                      <p className="leading-[normal] whitespace-pre">{unit}</p>
                    </div>
                  </div>
                  {!isDeleted && editingField !== 'quantity' && (
                    <div className="absolute h-0 left-0 top-[21.5px] w-[65px]">
                      <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 2">
                          <line stroke={quantity < 0 ? 'var(--destructive)' : 'var(--muted-foreground)'} strokeWidth="2" x2="65" y1="1" y2="1" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price per unit cell - editable */}
            <div 
              className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0 cursor-pointer hover:bg-[rgba(13,151,252,0.05)] transition-colors"
              style={{ width: `${CART_COLUMNS.PER_ENHET}px` }}
              onClick={() => !editingField && startEditing('price', pricePerUnit)}
            >
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0">
                  <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                    {editingField === 'price' ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={finishEditing}
                        onKeyDown={handleKeyDown}
                        className="font-normal border border-primary rounded px-1 outline-none text-right"
                        style={{ 
                          fontSize: 'var(--text-base)', 
                          width: '60px',
                          color: 'var(--foreground)',
                          backgroundColor: 'var(--input-background)'
                        }}
                      />
                    ) : (
                      <div className={`flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-nowrap ${isDeleted ? 'line-through' : ''}`} style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                        <p className="leading-[1.38] whitespace-pre">{pricePerUnit.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                  {!isDeleted && editingField !== 'price' && (
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

            {/* Discount cell - editable */}
            <div 
              className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip pl-[10px] pr-[4px] py-[5px] relative shrink-0 cursor-pointer hover:bg-[rgba(13,151,252,0.05)] transition-colors"
              style={{ width: `${CART_COLUMNS.RABATT}px` }}
              onClick={() => !editingField && startEditing('discount', discount)}
            >
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0">
                  <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-nowrap">
                    {editingField === 'discount' ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={finishEditing}
                        onKeyDown={handleKeyDown}
                        className="font-normal border border-primary rounded px-1 outline-none text-right"
                        style={{ 
                          fontSize: 'var(--text-base)', 
                          width: '35px',
                          color: 'var(--foreground)',
                          backgroundColor: 'var(--input-background)'
                        }}
                      />
                    ) : (
                      <>
                        <div className={`flex flex-col font-normal justify-center relative shrink-0 ${isDeleted ? 'line-through' : ''}`} style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)' }}>
                          <p className="leading-[1.38] text-nowrap whitespace-pre">{discount}</p>
                        </div>
                        <div className={`flex flex-col font-semibold justify-center relative shrink-0 ${isDeleted ? 'line-through' : ''}`} style={{ fontSize: 'var(--text-sm)', color: 'var(--secondary-foreground)' }}>
                          <p className="leading-[1.38] text-nowrap whitespace-pre">%</p>
                        </div>
                      </>
                    )}
                  </div>
                  {!isDeleted && editingField !== 'discount' && (
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

            {/* Total cell */}
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" style={{ width: `${CART_COLUMNS.TOTALT}px` }}>
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className={`flex flex-col font-medium justify-center leading-[19px] relative shrink-0 text-[0px] text-nowrap text-right whitespace-pre ${isDeleted ? 'line-through' : ''}`} style={{ color: 'var(--foreground)' }}>
                  <p className="mb-0" style={{ fontSize: 'var(--text-base)' }}>{total.toFixed(2)}</p>
                  {originalTotal && (
                    <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-normal line-through" style={{ color: 'var(--muted-foreground)', fontSize: 'var(--text-sm)' }}>
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
          <div className={`box-border content-stretch flex gap-[10px] h-[17px] items-center justify-center px-[4px] py-[2px]`} style={{ backgroundColor: label.bgColor, borderRadius: '3px' }}>
            <p className="font-normal leading-[1.75] relative shrink-0 text-nowrap whitespace-pre" style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground)' }}>{label.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}

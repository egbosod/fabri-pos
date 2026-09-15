import { useState, useEffect, useRef } from 'react';
import svgPaths from "../imports/svg-y2vkp7czmw";
import { useLanguage } from '../contexts/LanguageContext';

interface UnitConversion {
  unit: string;
  conversionFactor: number; // How many of this unit equals 1 base unit
  price: number; // Price for this unit
}

interface UnitCodeConvertModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuantity: number;
  currentUnit: string;
  pricePerUnit: number;
  onSave: (newQuantity: number, newUnit: string) => void;
  onChangeToReturn?: () => void;
  onSplitLine?: () => void;
  anchorElement: HTMLElement | null;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onInputChange?: (value: string, unit: string) => void;
}

export function UnitCodeConvertModal({
  isOpen,
  onClose,
  currentQuantity,
  currentUnit,
  pricePerUnit,
  onSave,
  onChangeToReturn,
  onSplitLine,
  anchorElement,
  onIncrement,
  onDecrement,
  onInputChange
}: UnitCodeConvertModalProps) {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState(currentQuantity.toFixed(2).replace('.', ','));
  const [selectedUnit, setSelectedUnit] = useState(currentUnit);
  const modalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  // Mock unit conversions - in a real app, this would come from product data
  const unitConversions: UnitConversion[] = [
    { unit: 'STK', conversionFactor: 1, price: pricePerUnit },
    { unit: 'PAL', conversionFactor: 100, price: pricePerUnit * 100 },
    { unit: 'M2', conversionFactor: 0.5, price: pricePerUnit * 0.5 },
  ];

  // Calculate position based on anchor element
  useEffect(() => {
    if (isOpen && anchorElement) {
      const rect = anchorElement.getBoundingClientRect();
      const modalWidth = 546; // Approximate width of modal (188 + 182 + 182)
      const modalHeight = 248; // Approximate height of modal
      
      // Center the modal horizontally on the anchor element's center
      const anchorCenterX = rect.left + (rect.width / 2);
      const left = anchorCenterX - (modalWidth / 2);
      
      setPosition({
        top: rect.top - modalHeight - 4, // Position 4px above the anchor
        left: left
      });
    }
  }, [isOpen, anchorElement]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNumberClick = (num: string) => {
    let newValue = inputValue;
    
    if (num === ',') {
      if (!inputValue.includes(',')) {
        newValue = inputValue + ',';
      }
    } else if (num === 'backspace') {
      newValue = inputValue.slice(0, -1) || '0';
    } else {
      if (inputValue === '0') {
        newValue = num;
      } else {
        newValue = inputValue + num;
      }
    }
    
    setInputValue(newValue);
    if (onInputChange) {
      onInputChange(newValue, selectedUnit);
    }
  };

  const handleIncrement = () => {
    const value = parseFloat(inputValue.replace(',', '.'));
    setInputValue((value + 1).toFixed(2).replace('.', ','));
    if (onIncrement) onIncrement();
  };

  const handleDecrement = () => {
    const value = parseFloat(inputValue.replace(',', '.'));
    if (value > 0) {
      setInputValue(Math.max(0, value - 1).toFixed(2).replace('.', ','));
      if (onDecrement) onDecrement();
    }
  };

  const handleSave = () => {
    const newQuantity = parseFloat(inputValue.replace(',', '.'));
    onSave(newQuantity, selectedUnit);
    onClose();
  };

  const currentValue = parseFloat(inputValue.replace(',', '.')) || 0;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed z-50"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="content-stretch flex items-start relative" style={{ borderRadius: 'var(--radius)' }}>
          {/* Body */}
          <div 
            className="content-stretch flex h-full items-start relative shrink-0"
            style={{ 
              backgroundColor: 'var(--card)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--elevation-sm)'
            }}
          >
            {/* Numpad */}
            <div className="box-border content-stretch flex flex-col gap-[12px] items-start p-[20px] relative shrink-0">
              {/* Display field showing current input */}
              <div 
                className="box-border content-stretch flex gap-[8px] items-center justify-end px-[12px] py-[6px] relative shrink-0 w-[156px] h-[48px]"
                style={{ 
                  backgroundColor: 'var(--input-background)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)'
                }}
              >
                <p 
                  className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre text-right"
                  style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    lineHeight: '1.5'
                  }}
                >
                  {inputValue} {selectedUnit}
                </p>
              </div>

              {/* Row 1 */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
                {[1, 2, 3].map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[6px] relative shrink-0 size-[48px] cursor-pointer"
                    style={{ 
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)'
                    }}
                  >
                    <p 
                      className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre"
                      style={{ 
                        fontSize: '18px',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                        lineHeight: '1.75'
                      }}
                    >
                      {num}
                    </p>
                  </button>
                ))}
              </div>

              {/* Row 2 */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
                {[4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[6px] relative shrink-0 size-[48px] cursor-pointer"
                    style={{ 
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)'
                    }}
                  >
                    <p 
                      className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre"
                      style={{ 
                        fontSize: '18px',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                        lineHeight: '1.75'
                      }}
                    >
                      {num}
                    </p>
                  </button>
                ))}
              </div>

              {/* Row 3 */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
                {[7, 8, 9].map(num => (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[6px] relative shrink-0 size-[48px] cursor-pointer"
                    style={{ 
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)'
                    }}
                  >
                    <p 
                      className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre"
                      style={{ 
                        fontSize: '18px',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: 'var(--foreground)',
                        lineHeight: '1.75'
                      }}
                    >
                      {num}
                    </p>
                  </button>
                ))}
              </div>

              {/* Row 4 */}
              <div className="content-stretch flex gap-[12px] items-start relative shrink-0">
                {/* Comma button */}
                <button
                  onClick={() => handleNumberClick(',')}
                  className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[6px] relative shrink-0 size-[48px] cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <p 
                    className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre"
                    style={{ 
                      fontSize: '18px',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                      lineHeight: '1.75'
                    }}
                  >
                    ,
                  </p>
                </button>

                {/* 0 button */}
                <button
                  onClick={() => handleNumberClick('0')}
                  className="box-border content-stretch flex gap-[8px] items-center justify-center px-[20px] py-[6px] relative shrink-0 size-[48px] cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <p 
                    className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre"
                    style={{ 
                      fontSize: '18px',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                      lineHeight: '1.75'
                    }}
                  >
                    0
                  </p>
                </button>

                {/* Backspace button */}
                <button
                  onClick={() => handleNumberClick('backspace')}
                  className="box-border content-stretch flex gap-[8px] items-center justify-center px-[13px] py-[6px] relative shrink-0 size-[48px] cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <div className="h-[14.4px] relative shrink-0 w-[18px]">
                    <div className="absolute inset-[-3.79%_-3.03%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 16">
                        <g>
                          <path d={svgPaths.p36765300} stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
                          <path d={svgPaths.p3374740} stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
                          <path d={svgPaths.p17633100} stroke="var(--foreground)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Conversion section */}
            <div 
              className="box-border content-stretch flex flex-col gap-[12px] h-full items-start justify-between px-[20px] py-[21px] relative shrink-0 w-[182px]"
              style={{ 
                backgroundColor: 'var(--secondary)',
                border: '0px 0px 0px 1px solid var(--border)',
                borderLeft: '1px solid var(--border)',
                borderRadius: '0 var(--radius) var(--radius) 0'
              }}
            >
              {/* Unit Code Dropdown Section */}
              <div className="flex flex-col gap-[6px] w-[142px]">
                <label 
                  className="font-['Montserrat',sans-serif]"
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--foreground)',
                    lineHeight: '1.75'
                  }}
                >
                  {t('changeUnitCode')}
                </label>
                <select
                  value={selectedUnit}
                  onChange={(e) => setSelectedUnit(e.target.value)}
                  className="box-border w-full h-[48px] px-[12px] cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--input-background)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-normal)',
                    color: 'var(--foreground)',
                    fontFamily: "'Montserrat', sans-serif"
                  }}
                >
                  {unitConversions.map((conversion) => (
                    <option key={conversion.unit} value={conversion.unit}>
                      {conversion.unit}
                    </option>
                  ))}
                </select>
              </div>

              <div className="h-[120px] relative shrink-0 w-[142px]">
                {/* Label */}
                <div className="absolute content-stretch flex gap-[5px] items-center justify-center left-0 top-0 w-[142px]">
                  <p 
                    className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre"
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-bold)',
                      color: 'var(--foreground)',
                      lineHeight: '1.75'
                    }}
                  >
                    {t('conversion')}
                  </p>
                </div>

                {/* Unit conversions */}
                {unitConversions.map((conversion, index) => (
                  <button
                    key={conversion.unit}
                    onClick={() => setSelectedUnit(conversion.unit)}
                    className="absolute font-['Montserrat',sans-serif] h-[21px] left-0 text-nowrap w-[142px] whitespace-pre cursor-pointer text-left"
                    style={{ 
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-normal)',
                      color: selectedUnit === conversion.unit ? 'var(--primary)' : 'var(--foreground)',
                      lineHeight: '1.75',
                      top: `${26 + index * 33}px`,
                      backgroundColor: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--border)',
                      padding: 0
                    }}
                  >
                    <span className="absolute left-0 top-0">{conversion.unit}</span>
                    <span className="absolute left-[142px] text-right top-0 translate-x-[-100%]">
                      {(currentValue * conversion.conversionFactor * pricePerUnit).toFixed(2).replace('.', ',')}
                    </span>
                  </button>
                ))}
              </div>

              <button 
                onClick={handleSave}
                className="box-border content-stretch cursor-pointer flex gap-[8px] h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative shrink-0 w-[142px]"
                style={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)'
                }}
              >
                <p 
                  className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre"
                  style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    color: 'var(--foreground)',
                    lineHeight: '1.75'
                  }}
                >
                  {t('saveChanges')}
                </p>
              </button>
            </div>

            {/* Actions section */}
            <div 
              className="box-border content-stretch flex flex-col gap-[12px] h-full items-start pb-[21px] pt-[19px] px-[20px] relative shrink-0 w-[182px]"
              style={{ 
                backgroundColor: 'var(--card)',
                border: '0px 0px 0px 1px solid var(--border)',
                borderLeft: '1px solid var(--border)',
                borderRadius: '0 var(--radius) var(--radius) 0'
              }}
            >
              {onChangeToReturn && (
                <button 
                  onClick={() => {
                    onChangeToReturn();
                    onClose();
                  }}
                  className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative shrink-0 w-[142px] cursor-pointer"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <p 
                    className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre"
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                      lineHeight: '1.75'
                    }}
                  >
                    {t('changeToReturn')}
                  </p>
                </button>
              )}

              {onSplitLine && (
                <button 
                  onClick={() => {
                    onSplitLine();
                    onClose();
                  }}
                  className="box-border content-stretch cursor-pointer flex gap-[8px] h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative shrink-0 w-[142px]"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <p 
                    className="font-['Montserrat',sans-serif] relative shrink-0 text-nowrap whitespace-pre"
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: 'var(--foreground)',
                      lineHeight: '1.75'
                    }}
                  >
                    {t('splitOrderLine')}
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* Arrow pointing down */}
          <div className="absolute bottom-[-13.5px] h-[13.5px] left-[50%] translate-x-[-50%] w-[22px]">
            <div className="absolute inset-[-2.34%_-15.4%_-50.31%_-15.4%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 21">
                <g>
                  <g filter="url(#filter0_d_222_664)">
                    <path d={svgPaths.p1ac37900} fill="var(--card)" />
                  </g>
                  <g filter="url(#filter1_d_222_664)">
                    <path d={svgPaths.p234038c0} stroke="var(--border)" />
                  </g>
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="19.5" id="filter0_d_222_664" width="28" x="0.387618" y="0.315836">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.419608 0 0 0 0 0.419608 0 0 0 0 0.447059 0 0 0 0.06 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_222_664" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_222_664" mode="normal" result="shape" />
                  </filter>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="20.6074" id="filter1_d_222_664" width="28.7752" x="8.9407e-08" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.419608 0 0 0 0 0.419608 0 0 0 0 0.447059 0 0 0 0.06 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_222_664" />
                    <feBlend in="SourceGraphic" in2="effect1_dropShadow_222_664" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
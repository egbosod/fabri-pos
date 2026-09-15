import { useState } from 'react';
import svgPaths from "../imports/svg-vpcqh9x9io";
import { OrderItem } from "./OrderItem";

interface OrderGroupProps {
  orderNumber?: string;
  orderDate?: string;
  customerName?: string;
  projectName?: string;
  phoneNumber?: string;
  total: number;
  itemCount: number;
  label?: {
    text: string;
    borderColor: string;
  };
  children?: React.ReactNode;
  onRemove?: () => void;
  showRemoveButton?: boolean;
}

export function OrderGroup({
  orderNumber,
  orderDate,
  customerName,
  projectName,
  phoneNumber,
  total,
  itemCount,
  label,
  children,
  onRemove,
  showRemoveButton = false
}: OrderGroupProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white relative rounded-[5px] shrink-0 w-full">
      <div className="box-border content-stretch flex flex-col items-start justify-center overflow-clip px-0 py-[12px] relative rounded-[inherit] w-full">
        {/* Header row */}
        <div 
          className="box-border content-stretch flex gap-[5px] items-center overflow-clip px-[10px] py-0 relative shrink-0 w-[747px] cursor-pointer hover:bg-[#f2f6f9] transition-colors rounded-[5px]"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Left section: Order info and Customer info */}
          <div className="content-stretch flex gap-[43px] items-start relative shrink-0 w-[430px]">
            {/* Order number and date */}
            {orderNumber && (
              <div className="h-[34px] leading-[0] relative shrink-0 text-nowrap w-[92px]">
                <div className="absolute flex flex-col font-normal justify-center left-0 text-[#42424a] text-[12px] top-[26.5px] translate-y-[-50%]">
                  <p className="leading-[normal] text-nowrap whitespace-pre">{orderDate}</p>
                </div>
                <div className="absolute flex flex-col font-medium justify-center left-0 text-[#22222c] text-[14px] top-[calc(50%-8.5px)] translate-y-[-50%]">
                  <p className="leading-[normal] text-nowrap whitespace-pre">{orderNumber}</p>
                </div>
              </div>
            )}

            {/* Håndterminal label */}
            {!orderNumber && phoneNumber && (
              <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
                  <div className="[grid-area:1_/_1] flex flex-col font-normal justify-center ml-[4px] mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
                    <p className="leading-[normal] text-nowrap whitespace-pre">{orderDate}</p>
                  </div>
                  <div className="[grid-area:1_/_1] flex flex-col font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
                    <p className="leading-[normal] text-nowrap whitespace-pre">Håndterminal</p>
                  </div>
                </div>
              </div>
            )}

            {/* Customer and project */}
            <div className="content-stretch flex flex-col gap-[2px] items-start justify-center leading-[0] relative shrink-0 text-nowrap">
              <div className="flex flex-col font-medium justify-center relative shrink-0 text-[#22222c] text-[14px]">
                <p className="leading-[normal] text-nowrap whitespace-pre">{customerName || phoneNumber}</p>
              </div>
              {projectName && (
                <div className="flex flex-col font-normal justify-center relative shrink-0 text-[#42424a] text-[12px]">
                  <p className="leading-[normal] text-nowrap whitespace-pre">{projectName}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right section: Total, label, and expand icon */}
          <div className="box-border content-stretch flex gap-[27px] items-center justify-end pl-[10px] pr-[25px] py-0 relative shrink-0 w-[293px]">
            {/* Total */}
            <div className="box-border content-stretch flex gap-[10px] items-center justify-end px-[10px] py-0 relative shrink-0 w-[165px]">
              <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
                <p className="leading-[19px] whitespace-pre">{total.toFixed(2)}</p>
              </div>
            </div>

            {/* Label and counter */}
            <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0 w-[76px]">
              {label && (
                <div className="bg-white box-border content-stretch flex gap-[10px] h-[20px] items-center justify-center px-[6px] py-[2px] relative rounded-[3px] shrink-0">
                  <div 
                    aria-hidden="true" 
                    className="absolute border border-solid inset-0 pointer-events-none rounded-[3px]"
                    style={{ borderColor: label.borderColor }}
                  />
                  <p className="font-normal leading-[1.75] relative shrink-0 text-[#101115] text-[11px] text-nowrap whitespace-pre">{label.text}</p>
                </div>
              )}
              <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
                <p className="leading-[normal] whitespace-pre">{itemCount} varelinjer</p>
              </div>
            </div>

            {/* Expand/collapse icon */}
            <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-0 top-[calc(50%+4.5px)] translate-y-[-50%]">
              <div 
                className="overflow-clip relative shrink-0 size-[14px] transition-transform duration-200 ease-in-out"
                style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
                    <path d={svgPaths.p1bf14e00} fill="#6B6B72" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Remove button (shown when expanded for certain groups) */}
        {showRemoveButton && isExpanded && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
            className="absolute bg-white box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center left-0 px-[13px] py-[6px] rounded-[5px] top-[84px] hover:bg-[#f2f6f9] transition-colors"
          >
            <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
            <div className="overflow-clip relative shrink-0 size-[12px]">
              <div className="absolute inset-[6.05%_6.05%_6.06%_6.05%]">
                <div className="absolute inset-[-3.556%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                    <g>
                      <path d="M0.375 10.9219L10.9219 0.375" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                      <path d="M10.9219 10.9219L0.375 0.375" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
            <p className="font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-nowrap whitespace-pre">Fjern fra salget</p>
          </button>
        )}

        {/* Expanded content */}
        {isExpanded && (
          <div className="content-stretch flex flex-col gap-[10px] items-start mt-[10px] px-[10px] relative w-full">
            {children || <OrderItem />}
          </div>
        )}
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

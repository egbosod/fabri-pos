import { useState } from 'react';
import { X } from 'lucide-react';
import { OrderItem } from "./OrderItem";
import { CartColumnHeader } from './CartColumnHeader';
import { GroupCell, GroupHeader } from './GroupHeader';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { tLabel } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  // A group without an order number but with a phone number is a hand terminal.
  const isHandTerminal = !orderNumber && !!phoneNumber;

  return (
    <div className="relative rounded-[5px] overflow-hidden shrink-0 w-full" style={{ backgroundColor: 'var(--card)' }}>
      <div aria-hidden="true" className="absolute inset-0 z-10 rounded-[5px] border border-solid pointer-events-none" style={{ borderColor: 'var(--border)' }} />

      <GroupHeader
        first={
          orderNumber ? <GroupCell title={orderNumber} subtitle={orderDate} />
          : isHandTerminal ? <GroupCell title="Håndterminal" subtitle={orderDate} />
          : null
        }
        second={<GroupCell title={customerName || phoneNumber} subtitle={projectName} />}
        total={total}
        lineCount={itemCount}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        badge={label && (
          <div
            className="box-border flex h-[20px] items-center justify-center rounded-[3px] px-[6px] py-[2px] text-nowrap"
            style={{ border: `1px solid ${label.borderColor}`, backgroundColor: 'var(--card)', color: 'var(--foreground)', fontSize: 'var(--text-xs)' }}
          >
            {tLabel(label.text)}
          </div>
        )}
      />

      {/* Expanded content: the lines read against the same columns as the cart */}
      {isExpanded && (
        <div className="pt-[10px]" style={{ borderTop: '1px solid var(--border)' }}>
          <CartColumnHeader />
          <div className="flex flex-col gap-[8px] pb-[10px]">
            {children || <OrderItem />}
          </div>

          {showRemoveButton && (
            <div className="px-[10px] py-[10px]" style={{ borderTop: '1px solid var(--border)' }}>
              <button
                onClick={onRemove}
                className="relative box-border flex h-[48px] items-center justify-center gap-[8px] rounded-[5px] px-[13px] py-[6px] hover:bg-[#f2f6f9] transition-colors"
                style={{ backgroundColor: 'var(--card)' }}
              >
                <span aria-hidden="true" className="absolute inset-0 rounded-[5px] border border-solid pointer-events-none" style={{ borderColor: 'var(--border)' }} />
                <X size={14} strokeWidth={1.5} aria-hidden />
                <span className="text-nowrap" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--foreground)' }}>
                  Fjern fra salget
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

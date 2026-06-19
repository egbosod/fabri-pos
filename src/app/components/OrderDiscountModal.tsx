import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface OrderDiscountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (newAmount: number) => void;
  currentAmount: number;
  paymentId: string;
}

export function OrderDiscountModal({ isOpen, onClose, onApply, currentAmount }: OrderDiscountModalProps) {
  const { t } = useLanguage();
  const [totalToPay, setTotalToPay] = useState(currentAmount.toString());
  const [sumDiscount, setSumDiscount] = useState('0');
  const [discountPercent, setDiscountPercent] = useState('0');

  useEffect(() => {
    if (isOpen) {
      setTotalToPay(currentAmount.toString());
      setSumDiscount('0');
      setDiscountPercent('0');
    }
  }, [isOpen, currentAmount]);

  if (!isOpen) return null;

  const calculateFromPercent = (percent: string) => {
    const percentValue = parseFloat(percent) || 0;
    const discountAmount = (currentAmount * percentValue) / 100;
    setSumDiscount(Math.round(discountAmount).toString());
    setTotalToPay(Math.round(currentAmount - discountAmount).toString());
  };

  const calculateFromSum = (sum: string) => {
    const sumValue = parseFloat(sum) || 0;
    const percentValue = (sumValue / currentAmount) * 100;
    setDiscountPercent(percentValue.toFixed(2));
    setTotalToPay(Math.round(currentAmount - sumValue).toString());
  };

  const handleTotalChange = (value: string) => {
    const newTotal = parseFloat(value) || 0;
    const discountAmount = currentAmount - newTotal;
    setSumDiscount(Math.round(discountAmount).toString());
    const percentValue = (discountAmount / currentAmount) * 100;
    setDiscountPercent(percentValue.toFixed(2));
    setTotalToPay(value);
  };

  const handleApply = () => {
    const newAmount = parseFloat(totalToPay) || currentAmount;
    onApply(newAmount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div 
        className="bg-card flex flex-col px-[32px] py-[32px] rounded-[var(--radius)] w-full max-w-[450px]"
        style={{ boxShadow: 'var(--elevation-md)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-[24px]">
          <h2 style={{ 
            fontSize: '20px',
            fontWeight: 'var(--font-weight-bold)',
            lineHeight: '1.3',
            color: 'var(--color-secondary-foreground)'
          }}>
            {t('orderDiscount')}
          </h2>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-[20px] mb-[32px]">
          {/* Total to pay */}
          <div className="flex flex-col gap-[8px]">
            <label style={{ 
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-secondary-foreground)'
            }}>
              {t('totalToPay')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={totalToPay}
                onChange={(e) => handleTotalChange(e.target.value)}
                className="w-full h-[48px] px-[14px] py-[8px] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-secondary-foreground)'
                }}
              />
              <span 
                className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-muted-foreground)'
                }}
              >
                kr
              </span>
            </div>
          </div>

          {/* Sum discount */}
          <div className="flex flex-col gap-[8px]">
            <label style={{ 
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-secondary-foreground)'
            }}>
              {t('sumDiscount')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={sumDiscount}
                onChange={(e) => {
                  setSumDiscount(e.target.value);
                  calculateFromSum(e.target.value);
                }}
                className="w-full h-[48px] px-[14px] py-[8px] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-secondary-foreground)'
                }}
              />
              <span 
                className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-muted-foreground)'
                }}
              >
                kr
              </span>
            </div>
          </div>

          {/* Discount percent */}
          <div className="flex flex-col gap-[8px]">
            <label style={{ 
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--color-secondary-foreground)'
            }}>
              {t('discountPercent')}
            </label>
            <div className="relative">
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => {
                  setDiscountPercent(e.target.value);
                  calculateFromPercent(e.target.value);
                }}
                onKeyDown={(e) => e.stopPropagation()}
                onKeyUp={(e) => e.stopPropagation()}
                onKeyPress={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                step="0.01"
                className="w-full h-[48px] px-[14px] py-[8px] rounded-[var(--radius)] focus:outline-none focus:ring-2 focus:ring-primary/20"
                style={{ 
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-secondary-foreground)'
                }}
              />
              <span 
                className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ 
                  fontSize: 'var(--text-base)',
                  color: 'var(--color-muted-foreground)'
                }}
              >
                %
              </span>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-[1px] w-full mb-[24px]" style={{ backgroundColor: 'var(--color-border)' }} />

        {/* Action Buttons */}
        <div className="flex gap-[12px]">
          <button
            onClick={onClose}
            className="flex-1 h-[48px] px-[20px] rounded-[var(--radius)] hover:opacity-80 transition-opacity"
            style={{ 
              backgroundColor: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-base)',
              color: 'var(--color-secondary-foreground)'
            }}
          >
            {t('close')}
          </button>
          <button
            onClick={handleApply}
            className="flex-1 bg-primary text-primary-foreground h-[48px] px-[20px] rounded-[var(--radius)] hover:opacity-90 transition-opacity"
            style={{ 
              fontWeight: 'var(--font-weight-semibold)',
              fontSize: 'var(--text-base)'
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
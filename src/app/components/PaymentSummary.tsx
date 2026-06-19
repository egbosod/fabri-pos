import { useLanguage } from '../contexts/LanguageContext';

interface PaymentSummaryProps {
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
  customerDiscount?: number;
  customerDiscountRate?: number;
  returnAmount?: number;
}

export function PaymentSummary({ 
  subtotal, 
  discount, 
  total, 
  itemCount,
  customerDiscount = 0,
  customerDiscountRate = 0,
  returnAmount = 0
}: PaymentSummaryProps) {
  const { t } = useLanguage();
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('no-NO', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    });
  };

  const totalDiscount = discount + customerDiscount;

  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
        {/* Sum før rabatt */}
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
          <p className="font-normal leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">{t('total')}</p>
          <p className="font-normal leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">{formatCurrency(subtotal)}</p>
        </div>
        
        {/* Item-level Rabatt */}
        {discount > 0 && (
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="font-normal leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">{t('discount')}</p>
            <p className="font-normal leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">-{formatCurrency(discount)}</p>
          </div>
        )}
        
        {/* Customer-level Rabatt */}
        {customerDiscount > 0 && (
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="font-normal leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">{t('discount')} ({customerDiscountRate}%)</p>
            <p className="font-normal leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">-{formatCurrency(customerDiscount)}</p>
          </div>
        )}
        
        {/* Return Amount */}
        {returnAmount > 0 && (
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="font-normal leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">{t('return')}</p>
            <p className="font-normal leading-[1.75] relative shrink-0 text-[var(--destructive)] text-[14px]">-{formatCurrency(returnAmount)}</p>
          </div>
        )}
        
        {/* Total Rabatt (if there are multiple discount types) */}
        {totalDiscount > 0 && discount > 0 && customerDiscount > 0 && (
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
            <p className="font-medium leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">{t('total')} {t('discount')}</p>
            <p className="font-medium leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">-{formatCurrency(totalDiscount)}</p>
          </div>
        )}
        
        {/* Å betale */}
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full pt-[5px]" style={{ borderTop: '1px solid #e6e6e8' }}>
          <p className="font-bold leading-[1.75] relative shrink-0 text-[#090914] text-[15px]">{t('toPay')}</p>
          <p className="font-bold leading-[1.75] relative shrink-0 text-[#090914] text-[15px]">{formatCurrency(total)}</p>
        </div>
      </div>
    </div>
  );
}

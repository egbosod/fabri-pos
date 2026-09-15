import { CART_COLUMNS } from './cartColumnWidths';

interface DefaultOrderItemProps {
  productName: string;
  productCode: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  discount: number;
  total: number;
  originalTotal?: number;
  isDeleted?: boolean;
  label?: {
    text: string;
    color: string;
    bgColor: string;
  };
}

export function DefaultOrderItem({
  productName,
  productCode,
  quantity,
  unit,
  pricePerUnit,
  discount,
  total,
  originalTotal,
  isDeleted = false,
  label
}: DefaultOrderItemProps) {
  return (
    <div 
      className="relative overflow-hidden h-[62px] w-full"
      style={{ 
        borderRadius: 'var(--radius)',
        backgroundColor: isDeleted ? 'rgba(242, 76, 53, 0.1)' : 'var(--secondary)'
      }}
    >
      {/* Main content */}
      <div className="flex items-center h-full">
        {/* Product name and code */}
        <div className="flex items-center px-[10px] py-[5px] h-full" style={{ width: `${CART_COLUMNS.VARENAVN}px` }}>
          <div className="flex flex-col">
            <span 
              className={isDeleted ? 'line-through' : ''}
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
              className={isDeleted ? 'line-through' : ''}
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
        <div className="flex items-center justify-end px-[10px] py-[5px] h-full" style={{ width: `${CART_COLUMNS.ANTALL}px` }}>
          <div className="flex items-center gap-[5px] relative">
            <span 
              className={isDeleted ? 'line-through' : ''}
              style={{ 
                fontSize: 'var(--text-base)', 
                fontWeight: 'var(--font-weight-normal)',
                color: quantity < 0 ? 'var(--destructive)' : 'var(--foreground)',
                lineHeight: '1.38'
              }}
            >
              {quantity.toFixed(2)}
            </span>
            <span 
              className={isDeleted ? 'line-through' : ''}
              style={{ 
                fontSize: 'var(--text-base)', 
                fontWeight: 'var(--font-weight-normal)',
                color: quantity < 0 ? 'var(--destructive)' : 'var(--foreground)'
              }}
            >
              {unit}
            </span>
            {!isDeleted && (
              <div className="absolute left-0 bottom-[-2px] h-[2px] w-[65px]">
                <svg width="65" height="2" viewBox="0 0 65 2" fill="none">
                  <line x1="0" y1="1" x2="65" y2="1" stroke="var(--muted-foreground)" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Price per unit */}
        <div className="flex flex-col items-end justify-center px-[10px] py-[5px] h-full" style={{ width: `${CART_COLUMNS.PER_ENHET}px` }}>
          <span 
            className={isDeleted ? 'line-through' : ''}
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
              className={isDeleted ? 'line-through' : ''}
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
              className={isDeleted ? 'line-through' : ''}
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
            className={isDeleted ? 'line-through' : ''}
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
              className="line-through"
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
  );
}

import React from 'react';
import { User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

/* Right-hand panel shared by the sales view and price check, so both look identical. */
export function CartSidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background box-border content-stretch flex flex-col gap-[30px] h-full items-start justify-end p-[20px] relative shrink-0 w-[302px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-border border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      {children}
    </div>
  );
}

export function SelectCustomerButton({ onClick }: { onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border h-[48px] min-w-[100px] relative rounded-[var(--radius)] shrink-0 w-full cursor-pointer hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors"
    >
      <div className="flex flex-row items-center justify-center min-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center min-w-inherit px-[15px] py-[6px] relative w-full">
          <div className="flex items-center justify-center shrink-0 text-foreground">
            <User size={12} className="text-foreground" />
          </div>
          <span className="text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t('selectCustomerButton')}</span>
        </div>
      </div>
    </button>
  );
}

export function SidebarButton({
  variant,
  disabled,
  onClick,
  title,
  children,
}: {
  variant: 'primary' | 'outline';
  disabled?: boolean;
  onClick: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  const style =
    variant === 'primary'
      ? disabled
        ? 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
        : 'bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring'
      : disabled
        ? 'bg-transparent border border-border text-muted-foreground cursor-not-allowed'
        : 'bg-transparent border border-primary text-primary cursor-pointer hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`h-[48px] min-w-[100px] relative rounded-[var(--radius)] shrink-0 w-full transition-colors ${style}`}
    >
      <div className="flex flex-row items-center justify-center min-w-inherit size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-inherit px-[20px] py-[6px] relative w-full">
          <span style={{ fontFamily: "'Montserrat', sans-serif" }}>{children}</span>
        </div>
      </div>
    </button>
  );
}

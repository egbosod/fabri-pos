import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import svgPaths from "../imports/svg-lp8f0fd0qm";
import { CustomerMenu } from './CustomerMenu';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import type { VipCardData } from '../types/pos';

interface Customer {
  id: string;
  name: string;
  customerNumber: string;
  type: 'Proff' | 'Privat';
  discountRate?: number;
  category?: string;
}

interface Project {
  id: string;
  nr: string;
  ekstNr: string;
  navn: string;
  adresse: string;
  postnr: string;
  utlopsdato: string;
}

interface CustomerBadgeProps {
  customer: Customer;
  project?: Project | null;
  mode: 'sales' | 'pricecheck';
  onEdit: () => void;
  onRemove: () => void;
  onGiftCard?: () => void;
  onBankTerminal?: () => void;
  onExchangeSlip?: () => void;
  onPreviousPurchases?: () => void;
  /** VIP card (Aspect4 DK / Prototypes B & C) — persistent indicator on the sale */
  vipCard?: VipCardData | null;
  /** Aspect4 DK Proto A: remove a blocked VIP card from the sale */
  onRemoveVipCard?: () => void;
}

function VerticalDotsIcon() {
  return (
    <div className="relative shrink-0 size-[25px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g>
          <path d="M10.8594 7.21875C10.8594 7.65387 11.0322 8.07117 11.3399 8.37885C11.6476 8.68652 12.0649 8.85938 12.5 8.85938C12.9351 8.85938 13.3524 8.68652 13.6601 8.37885C13.9678 8.07117 14.1406 7.65387 14.1406 7.21875C14.1406 6.78363 13.9678 6.36633 13.6601 6.05865C13.3524 5.75098 12.9351 5.57812 12.5 5.57812C12.0649 5.57812 11.6476 5.75098 11.3399 6.05865C11.0322 6.36633 10.8594 6.78363 10.8594 7.21875Z" fill="var(--foreground)" />
          <path d="M10.8594 12.5C10.8594 12.9351 11.0322 13.3524 11.3399 13.6601C11.6476 13.9678 12.0649 14.1406 12.5 14.1406C12.9351 14.1406 13.3524 13.9678 13.6601 13.6601C13.9678 13.3524 14.1406 12.9351 14.1406 12.5C14.1406 12.0649 13.9678 11.6476 13.6601 11.3399C13.3524 11.0322 12.9351 10.8594 12.5 10.8594C12.0649 10.8594 11.6476 11.0322 11.3399 11.3399C11.0322 11.6476 10.8594 12.0649 10.8594 12.5Z" fill="var(--foreground)" />
          <path d="M10.8594 17.7812C10.8594 18.2164 11.0322 18.6337 11.3399 18.9413C11.6476 19.249 12.0649 19.4219 12.5 19.4219C12.9351 19.4219 13.3524 19.249 13.6601 18.9413C13.9678 18.6337 14.1406 18.2164 14.1406 17.7812C14.1406 17.3461 13.9678 16.9288 13.6601 16.6212C13.3524 16.3135 12.9351 16.1406 12.5 16.1406C12.0649 16.1406 11.6476 16.3135 11.3399 16.6212C11.0322 16.9288 10.8594 17.3461 10.8594 17.7812Z" fill="var(--foreground)" />
        </g>
      </svg>
    </div>
  );
}

const MENU_HEIGHT = 258;
const MENU_WIDTH = 223;
const MENU_GAP = 4;

export function CustomerBadge({ 
  customer, 
  project, 
  mode,
  onEdit, 
  onRemove,
  onGiftCard,
  onBankTerminal,
  onExchangeSlip,
  onPreviousPurchases,
  vipCard,
  onRemoveVipCard
}: CustomerBadgeProps) {
  const { t } = useLanguage();
  const { switchUserFlow } = useSettings();
  const [showMenu, setShowMenu] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  const openMenu = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP;
      const rightOffset = window.innerWidth - rect.right;
      const base: React.CSSProperties = {
        position: 'fixed',
        right: rightOffset,
        width: MENU_WIDTH,
        zIndex: 9999,
      };
      setMenuStyle(
        spaceBelow >= MENU_HEIGHT
          ? { ...base, top: rect.bottom + MENU_GAP }
          : { ...base, bottom: window.innerHeight - rect.top + MENU_GAP }
      );
    }
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  // Handle Escape key to close menu
  useEffect(() => {
    if (!showMenu) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showMenu]);

  const canRemoveVip =
    switchUserFlow === 'A' && vipCard?.status === 'blocked' && !!onRemoveVipCard;

  const menuPortal = showMenu
    ? createPortal(
        <>
          {/* Backdrop — click outside to close */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
            onClick={closeMenu}
          />
          {/* Menu — rendered above backdrop */}
          <div style={menuStyle}>
            <CustomerMenu
              mode={mode}
              onEdit={() => { closeMenu(); onEdit(); }}
              onRemove={() => { closeMenu(); onRemove(); }}
              onGiftCard={onGiftCard ? () => { closeMenu(); onGiftCard!(); } : undefined}
              onBankTerminal={onBankTerminal ? () => { closeMenu(); onBankTerminal!(); } : undefined}
              onExchangeSlip={onExchangeSlip ? () => { closeMenu(); onExchangeSlip!(); } : undefined}
              onRemoveVipCard={canRemoveVip ? () => { closeMenu(); onRemoveVipCard!(); } : undefined}
              onPreviousPurchases={onPreviousPurchases ? () => { closeMenu(); onPreviousPurchases!(); } : undefined}
            />
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <div className="relative shrink-0 w-full">
      {switchUserFlow === 'A' && vipCard?.status === 'blocked' && (
        <div
          role="alert"
          className="box-border flex flex-col gap-[5px] items-center p-[13px] relative rounded-[3px] shrink-0 w-full mb-[15px]"
          style={{
            background: 'var(--Orange-Orange-98, #FFF8F3)',
            border: '1px solid var(--Orange-Orange-60, #E66F04)',
          }}
        >
          <p className="font-bold leading-[1.5] w-full" style={{ color: 'var(--Orange-Orange-60, #E66F04)' }}>{t('vipCardBlockedTitle')}</p>
          <p className="leading-[1.5] text-foreground w-full">{t('vipCardBlockedBody')}</p>
          {onRemoveVipCard && (
            <button
              type="button"
              onClick={onRemoveVipCard}
              className="mt-[4px] h-[40px] w-full px-[16px] rounded-[var(--radius)] font-bold cursor-pointer bg-card text-foreground border border-border hover:border-primary hover:bg-primary/5 transition-colors"
            >
              {t('removeVipCard')}
            </button>
          )}
        </div>
      )}

      {/* The whole card stays a "select customer" target after a customer is
          picked — same as live product. The kebab sits inside it, so that
          button stops propagation to keep its own menu. */}
      <div
        role="button"
        tabIndex={0}
        onClick={onEdit}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onEdit();
          }
        }}
        aria-label={t('selectCustomerButton')}
        className="bg-card border border-border relative rounded-[var(--radius-sm)] shrink-0 w-full cursor-pointer hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors"
        data-name="Customer card"
      >
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[15px] items-start p-[15px] relative w-full">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <div className="basis-0 grow flex flex-col items-start gap-[4px] min-h-px min-w-px relative shrink-0">
                <p className="font-bold leading-[1.75] text-foreground">
                  {customer.name}
                </p>
                {vipCard && switchUserFlow !== 'A' && (
                  <span style={{
                    alignSelf: 'flex-start',
                    flexShrink: 0,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius)',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: 'var(--text-sm)',
                    whiteSpace: 'nowrap',
                    color: vipCard.status === 'open' ? 'var(--chart-2)' : 'var(--destructive)',
                    background: vipCard.status === 'open'
                      ? 'color-mix(in srgb, var(--chart-2) 14%, var(--card))'
                      : 'color-mix(in srgb, var(--destructive) 14%, var(--card))',
                    border: `1px solid color-mix(in srgb, ${vipCard.status === 'open' ? 'var(--chart-2)' : 'var(--destructive)'} 35%, transparent)`,
                  }}>
                    {switchUserFlow === 'B'
                      ? (vipCard.status === 'open' ? t('vipBadgeOpen') : t('vipBadgeBlocked'))
                      : 'VIP'}
                  </span>
                )}
              </div>
              <div className="relative shrink-0">
                <button
                  ref={triggerRef}
                  className="bg-card border border-border box-border content-stretch flex gap-[8px] items-center justify-center px-[15px] py-[6px] relative rounded-[var(--radius)] shrink-0 size-[48px] hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors"
                  onClick={(e) => { e.stopPropagation(); showMenu ? closeMenu() : openMenu(); }}
                  onKeyDown={(e) => e.stopPropagation()}
                  aria-expanded={showMenu}
                  aria-haspopup="menu"
                >
                  <VerticalDotsIcon />
                </button>
              </div>
            </div>
            {project && (
              <p className="font-normal leading-[1.75] relative shrink-0 text-foreground">
                {project.navn}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Portal — rendered directly in document.body, escaping all stacking contexts */}
      {menuPortal}
    </div>
  );
}
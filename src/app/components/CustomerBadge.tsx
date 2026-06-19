import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import svgPaths from "../imports/svg-lp8f0fd0qm";
import { CustomerMenu } from './CustomerMenu';
import { useLanguage } from '../contexts/LanguageContext';

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

const MENU_HEIGHT = 210;
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
  onPreviousPurchases
}: CustomerBadgeProps) {
  const { t } = useLanguage();
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
              onPreviousPurchases={onPreviousPurchases ? () => { closeMenu(); onPreviousPurchases!(); } : undefined}
            />
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-card relative rounded-[var(--radius-sm)] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] shrink-0 w-full" data-name="Customer card">
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[15px] items-start p-[15px] relative w-full">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <p className="basis-0 grow leading-[1.75] min-h-px min-w-px relative shrink-0 text-foreground">
                {customer.name}
              </p>
              <div className="relative shrink-0">
                <button
                  ref={triggerRef}
                  className="bg-card border border-border box-border content-stretch flex gap-[8px] items-center justify-center px-[15px] py-[6px] relative rounded-[var(--radius)] shrink-0 size-[48px] hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors"
                  onClick={() => showMenu ? closeMenu() : openMenu()}
                  aria-expanded={showMenu}
                  aria-haspopup="menu"
                >
                  <VerticalDotsIcon />
                </button>
              </div>
            </div>
            {project && (
              <p className="leading-[1.75] relative shrink-0 text-foreground">
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
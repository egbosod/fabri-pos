import React, { useState, useEffect, useRef } from 'react';
import Header from '../imports/Header-61-13721';
import ProfileBadge from './ProfileBadge';
import MainMenu from '../imports/MainMenu';
import CustomerRelatedActions from '../imports/CustomerRelatedActions';
import { Sums } from './Sums';
import { PaymentSummary } from './PaymentSummary';
import { OrderGroup } from './OrderGroup';
import { DefaultOrderItem } from './DefaultOrderItem';
import svgPaths from "../imports/svg-bzympghppx";

function Graphic() {
  return (
    <div className="absolute h-[92px] left-[15px] top-[11px] w-[84px]" data-name="graphic">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 92">
        <g id="graphic">
          <path d="M21 32.875V64.375" id="Vector" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M31.5 32.875V48.625" id="Vector_2" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M63 32.875V64.375" id="Vector_3" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M52.5 32.875V48.625" id="Vector_4" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M42 32.875V48.625" id="Vector_5" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M31.5 59.125H52.5" id="Vector_6" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M5.25 17.125V6.625H15.75" id="Vector_7" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M78.75 17.125V6.625H68.25" id="Vector_8" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M5.25 74.875V85.375H15.75" id="Vector_9" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M78.75 74.875V85.375H68.25" id="Vector_10" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
        </g>
      </svg>
    </div>
  );
}

function Group161() {
  return (
    <div className="absolute left-1/2 top-[160px] translate-x-[-50%]">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal h-[34px] leading-[1.38] left-[calc(50%-9.5px)] text-[13px] text-black text-center top-[320px] translate-x-[-50%] w-[322px]">
        Velg kunde/prosjekt for å sjekke pris. Scan eller søk etter varer for å se priser.
      </p>
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] left-1/2 text-[#42424a] text-[15px] text-center top-[283px] translate-x-[-50%] w-[359px]">
        Ingen kunde valgt
      </p>
      <div className="absolute left-[calc(50%+0.5px)] overflow-clip size-[114px] top-[160px] translate-x-[-50%]" data-name="Barcode Scan">
        <Graphic />
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute bottom-[2.05%] left-0 right-0 top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group 3">
          <path clipRule="evenodd" d="M13.7109 13.043C13.8047 13.1367 13.8047 13.293 13.7109 13.3867C13.6172 13.4805 13.4609 13.4805 13.3672 13.3867L9.41406 9.43359C8.42969 10.2031 7.19531 10.6641 5.83203 10.6641C2.60156 10.6641 0 8.0625 0 4.83203C0 1.60156 2.60156 0 5.83203 0C9.0625 0 11.6641 1.60156 11.6641 4.83203C11.6641 6.19531 11.2031 7.42969 10.4336 8.41406L13.7109 13.043ZM5.83203 9.91406C8.64844 9.91406 10.9141 7.64844 10.9141 4.83203C10.9141 2.01562 8.64844 0 5.83203 0C3.01562 0 0.75 2.01562 0.75 4.83203C0.75 7.64844 3.01562 9.91406 5.83203 9.91406Z" fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)" />
          <path clipRule="evenodd" d="M5.83203 1.5C5.83203 1.29297 5.66406 1.125 5.45703 1.125C3.44531 1.125 1.875 2.73047 1.875 4.70703C1.875 4.91406 2.04297 5.08203 2.25 5.08203C2.45703 5.08203 2.625 4.91406 2.625 4.70703C2.625 3.13672 3.85938 1.875 5.45703 1.875C5.66406 1.875 5.83203 1.70703 5.83203 1.5Z" fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function NavigationMenuVertical() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Navigation Menu Vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Navigation Menu Vertical">
          <path d="M10.8594 7.21875C10.8594 7.65387 11.0322 8.07117 11.3399 8.37885C11.6476 8.68652 12.0649 8.85938 12.5 8.85938C12.9351 8.85938 13.3524 8.68652 13.6601 8.37885C13.9678 8.07117 14.1406 7.65387 14.1406 7.21875C14.1406 6.78363 13.9678 6.36633 13.6601 6.05865C13.3524 5.75098 12.9351 5.57812 12.5 5.57812C12.0649 5.57812 11.6476 5.75098 11.3399 6.05865C11.0322 6.36633 10.8594 6.78363 10.8594 7.21875Z" fill="var(--fill-0, #22222C)" id="Vector" />
          <path d="M10.8594 12.5C10.8594 12.9351 11.0322 13.3524 11.3399 13.6601C11.6476 13.9678 12.0649 14.1406 12.5 14.1406C12.9351 14.1406 13.3524 13.9678 13.6601 13.6601C13.9678 13.3524 14.1406 12.9351 14.1406 12.5C14.1406 12.0649 13.9678 11.6476 13.6601 11.3399C13.3524 11.0322 12.9351 10.8594 12.5 10.8594C12.0649 10.8594 11.6476 11.0322 11.3399 11.3399C11.0322 11.6476 10.8594 12.0649 10.8594 12.5Z" fill="var(--fill-0, #22222C)" id="Vector_2" />
          <path d="M10.8594 17.7812C10.8594 18.2164 11.0322 18.6337 11.3399 18.9413C11.6476 19.249 12.0649 19.4219 12.5 19.4219C12.9351 19.4219 13.3524 19.249 13.6601 18.9413C13.9678 18.6337 14.1406 18.2164 14.1406 17.7812C14.1406 17.3461 13.9678 16.9288 13.6601 16.6212C13.3524 16.3135 12.9351 16.1406 12.5 16.1406C12.0649 16.1406 11.6476 16.3135 11.3399 16.6212C11.0322 16.9288 10.8594 17.3461 10.8594 17.7812Z" fill="var(--fill-0, #22222C)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function OrderItems({ orderGroups }: { orderGroups?: OrderGroupData[] }) {
  // Calculate total item count from all groups
  const totalItemCount = React.useMemo(() => {
    let count = 0;
    
    if (orderGroups) {
      orderGroups.forEach(group => {
        group.items.forEach(item => {
          // Skip deleted items
          if (!item.isDeleted) {
            count++;
          }
        });
      });
    }
    
    return count;
  }, [orderGroups]);

  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-end min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="Order items">
      <div className="content-stretch flex flex-col items-start justify-end relative size-full">
        {/* Table Header */}
        <div className="content-stretch flex flex-col items-start justify-center relative rounded-[5px] shrink-0 w-full">
          <div className="box-border content-stretch flex items-start overflow-clip pb-[10px] pt-0 px-0 relative rounded-[5px] shrink-0 w-full">
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[310px]">
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Varenavn</p>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[85px]">
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Antall</p>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[82px]">
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Per enhet</p>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[54px]">
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Rabatt</p>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[79px]">
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Totalt</p>
                </div>
              </div>
            </div>
            
            {/* Item Count in Upper Right Corner */}
            <div className="flex-1 flex items-end justify-end px-[20px] h-[28px]">
              {totalItemCount > 0 && (
                <div className="font-['Montserrat',sans-serif] font-normal text-[#6b6b72] text-[12px]">
                  {totalItemCount} varelinjer
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Groups */}
        <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-full">
          {orderGroups && orderGroups.map((group) => (
            <OrderGroup
              key={group.id}
              orderNumber={group.orderNumber}
              orderDate={group.orderDate}
              customerName={group.customerName}
              projectName={group.projectName}
              phoneNumber={group.phoneNumber}
              total={group.total}
              itemCount={group.itemCount}
              label={group.label}
              showRemoveButton={group.showRemoveButton}
              onRemove={() => console.log('Remove order group', group.id)}
            >
              {group.items.map((item, index) => (
                <DefaultOrderItem
                  key={index}
                  productName={item.productName || item.name || ''}
                  productCode={item.productCode || item.sku || ''}
                  quantity={item.quantity}
                  unit={item.unit}
                  pricePerUnit={item.pricePerUnit || item.price || 0}
                  discount={item.discount || 0}
                  total={item.total}
                  originalTotal={item.originalTotal}
                  isDeleted={item.isDeleted}
                  label={item.label}
                />
              ))}
            </OrderGroup>
          ))}
        </div>
      </div>
    </div>
  );
}

interface OrderGroupData {
  id: string;
  type: 'handterminal' | 'order';
  orderNumber?: string;
  orderDate: string;
  customerName?: string;
  projectName?: string;
  phoneNumber?: string;
  total: number;
  itemCount: number;
  label?: { text: string; borderColor: string };
  showRemoveButton?: boolean;
  items: {
    productName?: string;
    name?: string;
    productCode?: string;
    sku?: string;
    quantity: number;
    unit: string;
    pricePerUnit?: number;
    price?: number;
    discount?: number;
    total: number;
    originalTotal?: number;
    isDeleted?: boolean;
    label?: { text: string; color: string; bgColor: string };
  }[];
}

interface PriceCheckModeWithoutCustomerProps {
  onClose: () => void;
  currentUser?: string;
  onUserChange?: (username: string) => void;
  selectedCustomer?: { name: string; id: string; discountRate?: number; category?: string } | null;
  selectedProject?: { navn: string; id: string } | null;
  onCustomerClick?: () => void;
  onRemoveCustomer?: () => void;
  orderGroups?: OrderGroupData[];
  addedItems?: any[];
}

export function PriceCheckModeWithoutCustomer({ 
  onClose, 
  currentUser = 'Erik Wheeler', 
  onUserChange,
  selectedCustomer,
  selectedProject,
  onCustomerClick,
  onRemoveCustomer,
  orderGroups,
  addedItems
}: PriceCheckModeWithoutCustomerProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showCustomerMenu, setShowCustomerMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const customerMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const [customerMenuStyle, setCustomerMenuStyle] = useState<React.CSSProperties>({});

  const MENU_HEIGHT = 210;
  const MENU_WIDTH = 223;
  const MENU_GAP = 4;

  useEffect(() => {
    if (showCustomerMenu && customerMenuTriggerRef.current) {
      const rect = customerMenuTriggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom - MENU_GAP;
      const rightOffset = window.innerWidth - rect.right;

      if (spaceBelow >= MENU_HEIGHT) {
        setCustomerMenuStyle({
          position: 'fixed',
          top: rect.bottom + MENU_GAP,
          right: rightOffset,
          width: MENU_WIDTH,
          zIndex: 50,
        });
      } else {
        setCustomerMenuStyle({
          position: 'fixed',
          bottom: window.innerHeight - rect.top + MENU_GAP,
          right: rightOffset,
          width: MENU_WIDTH,
          zIndex: 50,
        });
      }
    }
  }, [showCustomerMenu]);

  // Calculate payment totals from order groups
  const calculatePaymentTotals = () => {
    let subtotal = 0;
    let itemDiscount = 0;
    let itemCount = 0;
    
    if (orderGroups) {
      orderGroups.forEach(group => {
        group.items.forEach(item => {
          // Skip deleted items
          if (item.isDeleted) {
            return;
          }
          
          itemCount += 1;
          const price = item.pricePerUnit || item.price || 0;
          const quantity = item.quantity || 0;
          const lineTotal = price * quantity;
          subtotal += lineTotal;
          
          if (item.discount) {
            const discountAmount = lineTotal * (item.discount / 100);
            itemDiscount += discountAmount;
          }
        });
      });
    }
    
    // Apply customer discount on the subtotal after item discounts (if customer is selected)
    const subtotalAfterItemDiscount = subtotal - itemDiscount;
    const customerDiscountRate = selectedCustomer?.discountRate || 0;
    const customerDiscount = subtotalAfterItemDiscount * (customerDiscountRate / 100);
    const total = subtotalAfterItemDiscount - customerDiscount;
    
    return { 
      subtotal, 
      discount: itemDiscount, 
      customerDiscount,
      customerDiscountRate,
      total, 
      itemCount 
    };
  };
  
  const paymentTotals = calculatePaymentTotals();
  const hasOrderItems = paymentTotals.itemCount > 0;

  // Close menus on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showProfileMenu) {
          setShowProfileMenu(false);
        } else if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showProfileMenu, isMenuOpen]);

  return (
    <div className="bg-zinc-200 flex flex-col h-screen isolate items-start relative w-full">
      <Header 
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
        onProfileClick={() => setShowProfileMenu(!showProfileMenu)}
        isProfileOpen={showProfileMenu}
        isPriceCheckMode={true}
        onPriceCheckClose={onClose}
        currentUser={currentUser}
      />
      
      {/* Main Menu Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed bottom-0 left-0 right-0 top-[68px] z-40"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="fixed left-[10px] top-[78px] z-50">
            <MainMenu />
          </div>
        </>
      )}
      
      {/* Profile Menu Overlay */}
      {showProfileMenu && (
        <>
          <div 
            className="fixed bottom-0 left-0 right-0 top-[68px] z-40"
            onClick={() => setShowProfileMenu(false)}
          />
          <div className="fixed right-[10px] top-[78px] z-50">
            <ProfileBadge 
              currentUser={currentUser}
              onUserChange={(username) => {
                if (onUserChange) {
                  onUserChange(username);
                }
                setShowProfileMenu(false);
              }}
            />
          </div>
        </>
      )}
      <div className="flex flex-1 items-end relative w-full z-[1] min-h-0" data-name="Body">
        <div className="basis-0 bg-white grow h-full min-h-0 min-w-px relative shrink-0">
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
              {hasOrderItems ? (
                <OrderItems orderGroups={orderGroups} />
              ) : (
                <div className="basis-0 content-stretch flex flex-col grow items-start justify-end min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="Order items">
                  <Group161 />
                </div>
              )}
              <div className="content-stretch flex gap-[10px] items-center relative rounded-bl-[3px] rounded-br-[3px] shrink-0 w-full" data-name="Search and actions">
                <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative rounded-[5px] shrink-0" data-name="Textfield/Normal">
                  <div 
                    aria-hidden="true" 
                    className="absolute border-solid inset-0 pointer-events-none rounded-[5px]"
                    style={{
                      borderWidth: '1px',
                      borderColor: 'rgb(213, 213, 215)'
                    }}
                  />
                  <div className="flex flex-row items-center size-full">
                    <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] relative w-full">
                      <input
                        type="text"
                        placeholder="Søk etter varer"
                        className="basis-0 font-['Montserrat:Regular',sans-serif] font-normal grow leading-[1.75] min-h-px min-w-px relative shrink-0 text-[#42424a] text-[14px] bg-transparent border-none outline-none placeholder:text-[#6b6b72] placeholder:opacity-60"
                      />
                      <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
                        <div className="absolute left-0 size-[57.6px] top-0" data-name="Icon Plate" />
                        <Group3 />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-neutral-50 box-border content-stretch flex flex-col gap-[30px] h-full items-start justify-end p-[20px] relative shrink-0 w-[263px]" data-name="Sidebar">
          <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
          
          {!selectedCustomer ? (
            <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Customer select">
              <button 
                onClick={onCustomerClick}
                className="bg-card h-[48px] min-w-[100px] relative rounded-[var(--radius)] shrink-0 w-full cursor-pointer border border-border hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors" 
                data-name="Button"
              >
                <div className="flex flex-row items-center justify-center min-w-inherit size-full">
                  <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center min-w-inherit px-[15px] py-[6px] relative w-full">
                    <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Icon / User">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                        <g clipPath="url(#clip0_26_5)">
                          <path d="M10 10.5V9.5C10 8.96957 9.78929 8.46086 9.41421 8.08579C9.03914 7.71071 8.53043 7.5 8 7.5H4C3.46957 7.5 2.96086 7.71071 2.58579 8.08579C2.21071 8.46086 2 8.96957 2 9.5V10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                          <path d="M6 5.5C7.10457 5.5 8 4.60457 8 3.5C8 2.39543 7.10457 1.5 6 1.5C4.89543 1.5 4 2.39543 4 3.5C4 4.60457 4.89543 5.5 6 5.5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                        </g>
                      </svg>
                    </div>
                    <span className="text-foreground">Velg kunde</span>
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="relative shrink-0 w-full">
              <div className="bg-card relative rounded-[3px] shadow-[var(--elevation-sm)] shrink-0 w-full" data-name="Customer card">
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col gap-[15px] items-start p-[15px] relative w-full">
                    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                      <h4 className="basis-0 grow min-h-px min-w-px relative shrink-0">{selectedCustomer.name}</h4>
                      <button 
                        ref={customerMenuTriggerRef}
                        className="bg-card box-border content-stretch flex gap-[8px] items-center justify-center px-[15px] py-[6px] relative rounded-[var(--radius)] shrink-0 size-[48px] border border-border hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors" 
                        onClick={() => setShowCustomerMenu(!showCustomerMenu)}
                      >
                        <NavigationMenuVertical />
                      </button>
                    </div>
                    {selectedProject && (
                      <p className="text-foreground w-[179px]">{selectedProject.navn}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Customer Menu */}
              {showCustomerMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setShowCustomerMenu(false)}
                  />
                  <div style={customerMenuStyle}>
                    <CustomerRelatedActions />
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Payment Summary or Sums component */}
          {hasOrderItems ? (
            <PaymentSummary 
              subtotal={paymentTotals.subtotal}
              discount={paymentTotals.discount}
              total={paymentTotals.total}
              itemCount={paymentTotals.itemCount}
              customerDiscount={paymentTotals.customerDiscount}
              customerDiscountRate={paymentTotals.customerDiscountRate}
            />
          ) : (
            <Sums />
          )}
          
          {/* Action Buttons */}
          <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-full" data-name="Buttons">
            {hasOrderItems && (
              <button className="bg-white h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full cursor-pointer hover:bg-gray-50" data-name="Button">
                <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                <div className="flex flex-row items-center justify-center min-w-inherit size-full">
                  <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-inherit px-[20px] py-[6px] relative w-full">
                    <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[15px] text-nowrap whitespace-pre">Opprett pakkseddel</p>
                  </div>
                </div>
              </button>
            )}
            <button 
              className="h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full cursor-pointer"
              style={{
                backgroundColor: hasOrderItems ? '#0d97fc' : '#efeff0',
                opacity: hasOrderItems ? 1 : 0.6
              }}
              disabled={!hasOrderItems}
              data-name="Button - betal nå"
            >
              <div className="flex flex-row items-center justify-center min-w-inherit size-full">
                <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-inherit px-[20px] py-[6px] relative w-full">
                  <p 
                    className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[15px] text-nowrap whitespace-pre"
                    style={{
                      color: hasOrderItems ? 'white' : '#42424a'
                    }}
                  >
                    {hasOrderItems ? 'Betal nå' : 'Legg til varer'}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
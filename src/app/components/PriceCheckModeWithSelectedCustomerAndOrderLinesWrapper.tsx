import { useState, useEffect, useRef } from 'react';
import { CustomerBadge } from './CustomerBadge';
import { OrderGroup } from './OrderGroup';
import { OrderLineRow, OrderLineState } from './OrderLineRow';
import { DefaultOrderItem } from './DefaultOrderItem';
import { PaymentSummary } from './PaymentSummary';
import ProfileBadge from './ProfileBadge';
import svgPaths from "../imports/svg-v4b5vuykpy";

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
    state?: OrderLineState;
  }[];
}

interface PriceCheckModeWithSelectedCustomerAndOrderLinesWrapperProps {
  onClose?: () => void;
  selectedCustomer: Customer;
  selectedProject?: Project | null;
  onEditCustomer?: () => void;
  onRemoveCustomer?: () => void;
  orderGroups?: OrderGroupData[];
  addedItems?: any[];
  currentUser?: string;
  onUserChange?: (username: string) => void;
  onUserLogout?: (username: string) => void;
}

function Group1() {
  return (
    <div className="absolute inset-[8.41%_1.88%_8.94%_1.41%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 96 16">
        <g id="Group">
          <path d={svgPaths.p276e6380} fill="var(--fill-0, #44706A)" id="Vector" />
          <path d={svgPaths.p393724f0} fill="var(--fill-0, #44706A)" id="Vector_2" />
          <path d={svgPaths.p22e71880} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p2b004e00} fill="var(--fill-0, white)" id="Vector_4" />
          <g id="Group_2">
            <path d={svgPaths.p57a4000} fill="var(--fill-0, white)" id="Vector_5" />
            <path d={svgPaths.p2f43ff80} fill="var(--fill-0, white)" id="Vector_6" />
            <path d={svgPaths.p37c0f980} fill="var(--fill-0, white)" id="Vector_7" />
            <path d={svgPaths.p2a743800} fill="var(--fill-0, white)" id="Vector_8" />
            <path d={svgPaths.p20a5df00} fill="var(--fill-0, white)" id="Vector_9" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function EgFabriLogoWhite1() {
  return (
    <div className="h-[18.54px] overflow-clip relative shrink-0 w-[99px]" data-name="EG-Fabri-logo-white 1">
      <Group1 />
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="h-[11.667px] relative shrink-0 w-[12.3px]" data-name="Chevron Down 2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 12">
        <g clipPath="url(#clip0_55_25537)" id="Chevron Down 2">
          <path d={svgPaths.p507f400} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_55_25537">
            <rect fill="white" height="11.6667" width="12.3005" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex gap-[6.477px] items-center relative shrink-0">
      <p className="font-semibold leading-[1.75] relative shrink-0 text-[14.805px] text-nowrap text-white whitespace-pre">MENY</p>
      <ChevronDown2 />
    </div>
  );
}

function Frame632() {
  return (
    <div className="content-stretch flex gap-[30px] items-start opacity-50 relative shrink-0">
      <Frame32 />
    </div>
  );
}

function Frame633() {
  return (
    <div className="content-stretch flex font-normal gap-[30px] items-start leading-[1.75] relative shrink-0 text-[15px] text-center text-nowrap text-white whitespace-pre">
      <p className="opacity-50 relative shrink-0">Nytt salg</p>
      <p className="opacity-50 relative shrink-0">Tidligere kjøp</p>
      <p className="opacity-50 relative shrink-0">Kasseoppgjør</p>
    </div>
  );
}

function Frame138() {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
      <EgFabriLogoWhite1 />
      <Frame632 />
      <Frame633 />
    </div>
  );
}

function UserIcon() {
  return (
    <div className="absolute h-[16.689px] left-[13.01px] top-[calc(50%-0.101px)] translate-y-[-50%] w-[13.563px]" data-name="user icon">
      <div className="absolute inset-[-4.49%_-5.53%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 19">
          <g id="user icon">
            <ellipse cx="7.50237" cy="4.64541" id="Ellipse 2" rx="3.66853" ry="3.89541" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <path d={svgPaths.pbb1cae0} id="Ellipse 3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame137({ currentUser = 'Erik Wheeler', onProfileClick }: { currentUser?: string; onProfileClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <button onClick={onProfileClick} className="cursor-pointer h-[48px] relative shrink-0 w-[163px]" data-name="User menu button">
        <div className="absolute bg-[#22222c] box-border content-stretch flex gap-[10px] inset-0 items-center px-[10px] py-[6px] rounded-[5px]" data-name="Iconbutton" />
        <div className="absolute flex items-center justify-center right-[12px] size-[12px] top-[calc(50%+0.771px)] translate-y-[-50%]">
          <div className="flex-none rotate-[180deg]">
            <div className="opacity-90 overflow-clip relative size-[12px]" data-name="Icon / Up">
              <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
              <div className="absolute bottom-[19.5%] flex items-center justify-center left-0 right-0 top-[18.75%]">
                <div className="flex-none h-[8.645px] rotate-[180deg] w-[14px]">
                  <div className="relative size-full" data-name="Vector">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                      <path d={svgPaths.p3a351d00} fill="var(--fill-0, white)" id="Vector" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute font-normal h-[14.767px] leading-[1.75] left-[37px] text-[12px] text-white top-[calc(50%-10px)] w-[97.5px]">{currentUser}</p>
        <UserIcon />
      </button>
    </div>
  );
}

function MainHeader({ currentUser, onProfileClick }: { currentUser?: string; onProfileClick?: () => void }) {
  return (
    <div className="bg-[#42424a] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[10px] py-[6px] relative w-full">
          <Frame138 />
          <Frame137 currentUser={currentUser} onProfileClick={onProfileClick} />
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[6.05%_6.05%_6.06%_6.05%]" data-name="Group">
      <div className="absolute inset-[-3.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
          <g id="Group">
            <path d={svgPaths.p68b6a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.675" />
            <path d={svgPaths.p1c344f00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.675" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function X() {
  return (
    <div className="overflow-clip relative shrink-0 size-[14px]" data-name="X">
      <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
      <Group2 />
    </div>
  );
}

function Frame681({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="bg-[#22222c] box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center px-[15px] py-[6px] relative rounded-[5px] shrink-0 cursor-pointer">
      <div aria-hidden="true" className="absolute border border-[#2d2d39] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <X />
    </button>
  );
}

function TextButton() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[9px] py-[6px] relative rounded-[5px] shrink-0" data-name="Text button">
      <p className="font-semibold leading-[1.2] relative shrink-0 text-[17px] text-nowrap text-white whitespace-pre">Prisjekkmodus</p>
    </div>
  );
}

function Frame427319064({ onClose }: { onClose?: () => void }) {
  return (
    <div className="absolute content-stretch flex items-start left-[12px] top-[10px]">
      <Frame681 onClick={onClose} />
      <TextButton />
    </div>
  );
}

function TopMenu({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-[#282832] h-[68px] overflow-clip relative shadow-[2px_2px_4px_0px_rgba(126,126,126,0.06),3px_10px_15px_0px_rgba(126,126,126,0.06)] shrink-0 w-full" data-name="Top menu">
      <Frame427319064 onClose={onClose} />
    </div>
  );
}

function Header1({ onClose }: { onClose?: () => void }) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full z-[2]" data-name="Header">
      <TopMenu onClose={onClose} />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute bottom-[2.05%] left-0 right-0 top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group 3">
          <path clipRule="evenodd" d={svgPaths.p2d8c2380} fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p3d995300} fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function OrderItems({ orderGroups }: { orderGroups?: OrderGroupData[] }) {
  const [orderLineStates, setOrderLineStates] = useState<Record<string, OrderLineState>>({});

  const handleStateChange = (groupId: string, itemIndex: number, newState: OrderLineState) => {
    const key = `${groupId}-${itemIndex}`;
    setOrderLineStates(prev => ({
      ...prev,
      [key]: newState
    }));
  };

  // Calculate total item count from all groups
  const totalItemCount = React.useMemo(() => {
    let count = 0;
    
    if (orderGroups) {
      orderGroups.forEach(group => {
        group.items.forEach(item => {
          // Skip deleted items
          if (!(item as any).isDeleted) {
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
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Varenavn</p>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[85px]">
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Antall</p>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[82px]">
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Per enhet</p>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[54px]">
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Rabatt</p>
                </div>
              </div>
            </div>
            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[79px]">
              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="leading-[normal] whitespace-pre">Totalt</p>
                </div>
              </div>
            </div>
            
            {/* Item Count in Upper Right Corner */}
            <div className="flex-1 flex items-end justify-end px-[20px] h-[28px]">
              {totalItemCount > 0 && (
                <div className="font-normal text-[#6b6b72] text-[12px]">
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
                  isDeleted={(item as any).isDeleted}
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

function Frame238({ orderGroups }: { orderGroups?: OrderGroupData[] }) {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
          <OrderItems orderGroups={orderGroups} />
          <div className="content-stretch flex gap-[10px] items-center relative rounded-bl-[3px] rounded-br-[3px] shrink-0 w-full" data-name="Search and actions">
            <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative rounded-[5px] shrink-0" data-name="Textfield/Normal">
              <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] relative w-full">
                  <p className="basis-0 font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-[#6b6b72] text-[14px]">Søk etter varer</p>
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
  );
}



function Body({ 
  selectedCustomer, 
  selectedProject, 
  onEditCustomer, 
  onRemoveCustomer,
  orderGroups 
}: {
  selectedCustomer: Customer;
  selectedProject?: Project | null;
  onEditCustomer?: () => void;
  onRemoveCustomer?: () => void;
  orderGroups?: OrderGroupData[];
}) {
  // Calculate payment totals from order groups
  const calculatePaymentTotals = () => {
    let subtotal = 0;
    let itemDiscount = 0;
    let itemCount = 0;
    
    if (orderGroups) {
      orderGroups.forEach(group => {
        group.items.forEach(item => {
          // Skip deleted items
          if ((item as any).isDeleted) {
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
    
    // Apply customer discount on the subtotal after item discounts
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
  
  return (
    <div className="flex flex-1 items-end relative w-full z-[1] min-h-0" data-name="Body">
      <Frame238 orderGroups={orderGroups} />
      <div className="bg-neutral-50 box-border content-stretch flex flex-col gap-[30px] h-full items-start justify-end p-[20px] relative shrink-0 w-[263px]" data-name="Sidebar">
        <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
        <CustomerBadge 
          customer={selectedCustomer}
          project={selectedProject}
          mode="pricecheck"
          onEdit={onEditCustomer || (() => {})}
          onRemove={onRemoveCustomer || (() => {})}
        />
        
        {/* Payment Summary - only show when there are order items */}
        {hasOrderItems && (
          <PaymentSummary 
            subtotal={paymentTotals.subtotal}
            discount={paymentTotals.discount}
            total={paymentTotals.total}
            itemCount={paymentTotals.itemCount}
            customerDiscount={paymentTotals.customerDiscount}
            customerDiscountRate={paymentTotals.customerDiscountRate}
          />
        )}
        
        {/* Action Buttons */}
        <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-full" data-name="Buttons">
          {hasOrderItems && (
            <button className="bg-white h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full cursor-pointer hover:bg-gray-50" data-name="Button">
              <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="flex flex-row items-center justify-center min-w-inherit size-full">
                <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-inherit px-[20px] py-[6px] relative w-full">
                  <p className="font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[15px] text-nowrap whitespace-pre">Opprett pakkseddel</p>
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
                  className="font-semibold leading-[1.75] relative shrink-0 text-[15px] text-nowrap whitespace-pre"
                  style={{
                    color: hasOrderItems ? 'white' : '#42424a'
                  }}
                >
                  Betal nå
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PriceCheckModeWithSelectedCustomerAndOrderLinesWrapper({ 
  onClose, 
  selectedCustomer, 
  selectedProject, 
  onEditCustomer, 
  onRemoveCustomer,
  orderGroups,
  addedItems,
  currentUser = 'Erik Wheeler',
  onUserChange,
  onUserLogout
}: PriceCheckModeWithSelectedCustomerAndOrderLinesWrapperProps) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <>
      <div className="bg-zinc-200 flex flex-col h-screen isolate items-start relative w-full">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]" data-name="Header">
          <MainHeader currentUser={currentUser} onProfileClick={() => setShowProfileMenu(!showProfileMenu)} />
        </div>
        <Header1 onClose={onClose} />
        <Body 
          selectedCustomer={selectedCustomer}
          selectedProject={selectedProject}
          onEditCustomer={onEditCustomer}
          onRemoveCustomer={onRemoveCustomer}
          orderGroups={orderGroups}
        />
        
        {/* Profile Menu Overlay */}
        {showProfileMenu && (
          <>
            <div 
              className="fixed bottom-0 left-0 right-0 top-[60px] z-40"
              onClick={() => setShowProfileMenu(false)}
            />
            <div className="fixed right-[10px] top-[70px] z-50">
              <ProfileBadge 
                currentUser={currentUser}
                onUserChange={(username) => {
                  if (onUserChange) {
                    onUserChange(username);
                  }
                  setShowProfileMenu(false);
                }}
                onUserLogout={(username) => {
                  if (onUserLogout) {
                    onUserLogout(username);
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
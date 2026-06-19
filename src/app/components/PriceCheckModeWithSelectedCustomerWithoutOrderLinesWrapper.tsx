import { useState } from 'react';
import svgPaths from "../imports/svg-v4b5vuykpy";
import { CustomerBadge } from "./CustomerBadge";
import { InventorySearchModal } from "./InventorySearchModal";
import { Sums } from "./Sums";
import ProfileBadge from "./ProfileBadge";

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

interface PriceCheckModeWithSelectedCustomerWithoutOrderLinesWrapperProps {
  onClose?: () => void;
  selectedCustomer: Customer;
  selectedProject?: Project | null;
  onEditCustomer?: () => void;
  onRemoveCustomer?: () => void;
  currentUser?: string;
  onUserChange?: (username: string) => void;
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
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[14.805px] text-nowrap text-white whitespace-pre">MENY</p>
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
    <div className="content-stretch flex font-['Montserrat:Regular',sans-serif] font-normal gap-[30px] items-start leading-[1.75] relative shrink-0 text-[15px] text-center text-nowrap text-white whitespace-pre">
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
        <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal h-[14.767px] leading-[1.75] left-[37px] text-[12px] text-white top-[calc(50%-10px)] w-[97.5px]">{currentUser}</p>
        <UserIcon />
      </button>
    </div>
  );
}

function Header({ currentUser, onProfileClick }: { currentUser?: string; onProfileClick?: () => void }) {
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

function Frame681({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center overflow-visible p-[8px] relative shrink-0 size-[48px]">
      <div className="relative shrink-0 size-[27px]" data-name="Close">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
            <circle cx="13.5" cy="13.5" fill="var(--fill-0, #42424A)" id="Ellipse 1" r="13.5" />
          </svg>
        </div>
        <div className="absolute inset-[31.48%_30.37%_28.52%_29.63%] overflow-clip" data-name="Icon / Close">
          <div className="absolute left-0 size-[10.8px] top-0" data-name="Icon Plate" />
          <Group2 />
        </div>
      </div>
    </button>
  );
}

function TextButton() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[9px] py-[6px] relative rounded-[5px] shrink-0" data-name="Text button">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[17px] text-nowrap text-white whitespace-pre">Prisjekkmodus</p>
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
    <button className="absolute contents cursor-pointer left-1/2 top-[160px] translate-x-[-50%]">
      <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal h-[34px] leading-[1.38] left-[calc(50%-9.5px)] text-[13px] text-black text-center top-[320px] translate-x-[-50%] w-[322px] hidden">Scan/søk varer for å sjekke pris tilhørende kunde/prosjekt. Legg deretter til varene på salget dersom kunden ønsker varene.</p>
      <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] left-1/2 text-[#42424a] text-[15px] text-center top-[283px] translate-x-[-50%] w-[359px] hidden">Sjekk pris for valgt kunde/prosjekt</p>
      <div className="absolute left-[calc(50%+0.5px)] overflow-clip size-[114px] top-[160px] translate-x-[-50%] hidden" data-name="Barcode Scan">
        <Graphic />
      </div>
    </button>
  );
}

function OrderItems() {
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
          </div>
        </div>

        {/* Empty State */}
        <Group161 />
      </div>
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

function Frame238({ onSearchClick }: { onSearchClick: () => void }) {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
          <OrderItems />
          <div className="content-stretch flex gap-[10px] items-center relative rounded-bl-[3px] rounded-br-[3px] shrink-0 w-full" data-name="Search and actions">
            <button
              onClick={onSearchClick}
              className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative rounded-[5px] shrink-0 cursor-pointer text-left"
              data-name="Textfield/Normal"
            >
              <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] relative w-full">
                  <p className="basis-0 font-['Montserrat:Regular',sans-serif] font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-[#6b6b72] text-[14px]">Søk etter varer</p>
                  <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
                    <div className="absolute left-0 size-[57.6px] top-0" data-name="Icon Plate" />
                    <Group3 />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-full" data-name="Buttons">
      <a className="bg-[#efeff0] cursor-pointer h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full" data-name="Button - betal nå" href="https://www.figma.com/proto/8GpkqyjqWNpGX9SWbDDLf4/Point-Of-Sale-(POS)?page-id=0%3A903&type=design&node-id=914-42293&t=ztYIclHKje6ohAaS-0&scaling=min-zoom&starting-point-node-id=914%3A42293">
        <div className="flex flex-row items-center justify-center min-w-inherit size-full">
          <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-inherit px-[20px] py-[6px] relative w-full">
            <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#42424a] text-[15px] text-nowrap whitespace-pre">Legg til varer</p>
          </div>
        </div>
      </a>
    </div>
  );
}

function Body({ 
  selectedCustomer, 
  selectedProject, 
  onEditCustomer, 
  onRemoveCustomer,
  onSearchClick
}: {
  selectedCustomer: Customer;
  selectedProject?: Project | null;
  onEditCustomer?: () => void;
  onRemoveCustomer?: () => void;
  onSearchClick: () => void;
}) {
  return (
    <div className="flex flex-1 items-end relative w-full z-[1] min-h-0" data-name="Body">
      <Frame238 onSearchClick={onSearchClick} />
      <div className="bg-neutral-50 box-border content-stretch flex flex-col gap-[30px] h-full items-start justify-end p-[20px] relative shrink-0 w-[263px]" data-name="Sidebar">
        <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
        <CustomerBadge 
          customer={selectedCustomer}
          project={selectedProject}
          mode="pricecheck"
          onEdit={onEditCustomer || (() => {})}
          onRemove={onRemoveCustomer || (() => {})}
        />
        <Sums />
        <Buttons />
      </div>
    </div>
  );
}

export default function PriceCheckModeWithSelectedCustomerWithoutOrderLinesWrapper({ 
  onClose, 
  selectedCustomer, 
  selectedProject, 
  onEditCustomer, 
  onRemoveCustomer,
  currentUser = 'Erik Wheeler',
  onUserChange
}: PriceCheckModeWithSelectedCustomerWithoutOrderLinesWrapperProps) {
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleAddItems = (items: any[]) => {
    console.log('Adding items from inventory in price check mode:', items);
    // TODO: Handle adding items to price check mode
    setShowInventoryModal(false);
  };

  return (
    <>
      <div className="bg-zinc-200 flex flex-col h-screen isolate items-start relative w-full" data-name="Price check mode - With selected customer WITHOUT order lines">
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]" data-name="Header">
          <Header currentUser={currentUser} onProfileClick={() => setShowProfileMenu(!showProfileMenu)} />
        </div>
        <Header1 onClose={onClose} />
        <Body 
          selectedCustomer={selectedCustomer}
          selectedProject={selectedProject}
          onEditCustomer={onEditCustomer}
          onRemoveCustomer={onRemoveCustomer}
          onSearchClick={() => setShowInventoryModal(true)}
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
              />
            </div>
          </>
        )}
      </div>

      {/* Inventory Search Modal */}
      {showInventoryModal && (
        <InventorySearchModal 
          onClose={() => setShowInventoryModal(false)}
          onAddItems={handleAddItems}
        />
      )}
    </>
  );
}
import React, { useState } from 'react';
import svgPaths from "./svg-xmty2pj7q1";
import { useSettings } from '../contexts/SettingsContext';

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

function ChevronDown2({ isOpen }: { isOpen?: boolean }) {
  return (
    <div 
      className="h-[11.667px] relative shrink-0 w-[12.3px] transition-transform duration-200 ease-in-out" 
      data-name="Chevron Down 2"
      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 12">
        <g clipPath="url(#clip0_61_13745)" id="Chevron Down 2">
          <path d={svgPaths.p507f400} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_61_13745">
            <rect fill="white" height="11.6667" width="12.3005" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame32({ onClick, isOpen }: { onClick: () => void; isOpen?: boolean }) {
  return (
    <button onClick={onClick} className="content-stretch flex gap-[6.477px] items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[14.805px] text-nowrap text-white whitespace-pre">MENY</p>
      <ChevronDown2 isOpen={isOpen} />
    </button>
  );
}

function Frame632({ onMenuClick, isMenuOpen, isDisabled }: { onMenuClick: () => void; isMenuOpen?: boolean; isDisabled?: boolean }) {
  return (
    <div className={`content-stretch flex gap-[30px] items-start relative shrink-0 transition-opacity ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <Frame32 onClick={onMenuClick} isOpen={isMenuOpen} />
    </div>
  );
}

function Frame633({ isDisabled, onPreviousPurchasesClick }: { isDisabled?: boolean; onPreviousPurchasesClick?: () => void }) {
  return (
    <div className={`content-stretch flex font-['Montserrat:Regular',sans-serif] font-normal gap-[30px] items-start leading-[1.75] relative shrink-0 text-[15px] text-center text-nowrap text-white whitespace-pre transition-opacity ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <p className="relative shrink-0">Nytt salg</p>
      <button
        onClick={onPreviousPurchasesClick}
        className="relative shrink-0 bg-transparent border-none cursor-pointer p-0 text-white font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] text-[15px] text-center text-nowrap whitespace-pre hover:opacity-70 transition-opacity"
      >Tidligere kjøp</button>
      <p className="relative shrink-0">Kasseoppgjør</p>
    </div>
  );
}

function Frame138({ onMenuClick, isMenuOpen, isPriceCheckMode, onPreviousPurchasesClick }: { onMenuClick: () => void; isMenuOpen?: boolean; isPriceCheckMode?: boolean; onPreviousPurchasesClick?: () => void }) {
  return (
    <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
      <EgFabriLogoWhite1 />
      <Frame632 onMenuClick={onMenuClick} isMenuOpen={isMenuOpen} isDisabled={isPriceCheckMode} />
      <Frame633 isDisabled={isPriceCheckMode} onPreviousPurchasesClick={onPreviousPurchasesClick} />
    </div>
  );
}

function UserIcon() {
  return (
    <div className="relative h-[16.689px] w-[13.563px] shrink-0" data-name="user icon">
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

function Frame137({ onClick, isProfileOpen, currentUser }: { onClick: () => void; isProfileOpen?: boolean; currentUser?: string }) {
  const { switchUserFlow, showFlowIndicator, erpScenario } = useSettings();
  
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      {showFlowIndicator && (
        <div className="flex items-center gap-2">
          <span className="font-['Montserrat'] font-medium text-[#FF00FF] text-[14px]">Prototype</span>
          <div className="w-[24px] h-[24px] rounded-full bg-[#FF00FF] flex items-center justify-center text-white font-['Montserrat'] font-bold text-[12px] shadow-sm border border-white">
            {switchUserFlow}
          </div>
          <div className="bg-pink-500 text-white text-[11px] font-semibold font-['Montserrat'] px-2 py-0.5 rounded-full">
            {erpScenario}
          </div>
        </div>
      )}
      <button 
        onClick={onClick}
        className="h-[48px] bg-[#22222c] rounded-[5px] flex items-center px-[13px] gap-[10px] min-w-[163px] cursor-pointer hover:opacity-80 transition-opacity" 
        data-name="User menu button"
      >
        <UserIcon />
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] text-[12px] text-white whitespace-nowrap">
          {currentUser || 'Erik Wheeler'}
        </p>
        <div className="flex items-center justify-center size-[12px] ml-1">
          <div 
            className="flex-none transition-transform duration-200 ease-in-out"
            style={{ transform: isProfileOpen ? 'rotate(0deg)' : 'rotate(180deg)' }}
          >
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
      </button>
    </div>
  );
}

function Header({ onMenuClick, isMenuOpen, isPriceCheckMode, onProfileClick, isProfileOpen, currentUser, onPreviousPurchasesClick }: { onMenuClick: () => void; isMenuOpen?: boolean; isPriceCheckMode?: boolean; onProfileClick: () => void; isProfileOpen?: boolean; currentUser?: string; onPreviousPurchasesClick?: () => void }) {
  return (
    <div className="bg-[#42424a] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[10px] py-[6px] relative w-full">
          <Frame138 onMenuClick={onMenuClick} isMenuOpen={isMenuOpen} isPriceCheckMode={isPriceCheckMode} onPreviousPurchasesClick={onPreviousPurchasesClick} />
          <Frame137 onClick={onProfileClick} isProfileOpen={isProfileOpen} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}

function TextButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="box-border content-stretch cursor-pointer flex gap-[8px] h-[48px] items-center px-[9px] py-[6px] relative rounded-[5px] shrink-0 hover:bg-gray-50 transition-colors" data-name="Text button">
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Icon / Search">
        <div className="absolute inset-[2.92%_2.94%_2.94%_2.92%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path clipRule="evenodd" d={svgPaths.p1974d180} fill="var(--fill-0, #1A1B1F)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#22222c] text-[12px] text-nowrap uppercase whitespace-pre">Sjekk pris</p>
    </button>
  );
}

function Button() {
  return (
    <button className="bg-white box-border content-stretch cursor-pointer flex gap-[8px] h-[40px] items-center overflow-visible px-[13px] py-[6px] relative rounded-bl-[5px] rounded-tl-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-bl-[5px] rounded-tl-[5px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-nowrap whitespace-pre">Parker salg</p>
    </button>
  );
}

function Frame145() {
  return (
    <div className="bg-[#d5d5d7] box-border content-stretch flex items-center justify-center overflow-clip px-[7px] py-0 relative rounded-[100px] shrink-0 w-[22px]">
      <div className="flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-center text-nowrap text-white">
        <p className="leading-[1.75] whitespace-pre">0</p>
      </div>
    </div>
  );
}

function IconDown() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_21_3255)" id="Icon / Down" opacity="0.4">
          <g id="Icon Plate"></g>
          <path d={svgPaths.p396e8f80} fill="var(--fill-0, black)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_21_3255">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#eae9e9] box-border content-stretch flex gap-[8px] h-[40px] items-center px-[10px] py-[6px] relative rounded-br-[5px] rounded-tr-[5px] shrink-0 w-[62px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-br-[5px] rounded-tr-[5px]" />
      <Frame145 />
      <IconDown />
    </div>
  );
}

function TopMenu({ onPriceCheckClick }: { onPriceCheckClick: () => void }) {
  return (
    <div className="bg-white h-[60px] relative shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] shrink-0 w-full" data-name="Top menu">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[60px] items-center justify-between px-[20px] py-[8px] relative w-full [[data-previous-purchases-open]_&]:hidden">
          <TextButton onClick={onPriceCheckClick} />
          <div className="content-stretch flex gap-[2px] items-center relative shrink-0" data-name="Parker salg knapp">
            <Button />
            <Button1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center overflow-visible p-[8px] relative shrink-0 size-[48px] hover:opacity-80 transition-opacity" data-name="Close button">
      <div className="bg-[#e3e2e4] box-border content-stretch flex gap-[10px] items-center justify-center p-[8px] relative rounded-[13.5px] shrink-0 size-[27px]" data-name="Close">
        <div className="overflow-clip relative shrink-0 size-[10.8px]" data-name="Icon / Close">
          <div className="absolute inset-[2.94%_2.93%_2.95%_2.93%]" data-name="Vector">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
              <path clipRule="evenodd" d={svgPaths.p33b52100} fill="var(--fill-0, #1A1B1F)" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}

function Text({ paymentTitle }: { paymentTitle?: string }) {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[9px] py-[6px] relative rounded-[5px] shrink-0" data-name="Text">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[17px] text-nowrap text-white whitespace-pre">{paymentTitle || 'Prisjekkmodus'}</p>
    </div>
  );
}

function CloseButtonAndText({ onClose, paymentTitle }: { onClose: () => void; paymentTitle?: string }) {
  return (
    <div className="absolute content-stretch flex items-start left-[12px] top-[10px]" data-name="Close button and Text">
      <CloseButton onClick={onClose} />
      <Text paymentTitle={paymentTitle} />
    </div>
  );
}

function Frame({ onClose, paymentTitle }: { onClose: () => void; paymentTitle?: string }) {
  return (
    <div className="bg-[#282832] h-[68px] overflow-clip relative shadow-[2px_2px_4px_0px_rgba(126,126,126,0.06),3px_10px_15px_0px_rgba(126,126,126,0.06)] shrink-0 w-full" data-name="Frame">
      <CloseButtonAndText onClose={onClose} paymentTitle={paymentTitle} />
    </div>
  );
}

export default function Header1({ onMenuClick, isMenuOpen, onProfileClick, isProfileOpen, isPriceCheckMode, onPriceCheckClick, onPriceCheckClose, currentUser, isPaymentMode, paymentTitle, onPaymentClose, onPreviousPurchasesClick }: { onMenuClick?: () => void; isMenuOpen?: boolean; onProfileClick?: () => void; isProfileOpen?: boolean; isPriceCheckMode?: boolean; onPriceCheckClick?: () => void; onPriceCheckClose?: () => void; currentUser?: string; isPaymentMode?: boolean; paymentTitle?: string; onPaymentClose?: () => void; onPreviousPurchasesClick?: () => void }) {
  return (
    <div className="content-stretch flex flex-col items-start relative w-full" data-name="Header">
      <Header 
        onMenuClick={() => onMenuClick?.()} 
        isMenuOpen={isMenuOpen}
        isPriceCheckMode={isPriceCheckMode || isPaymentMode}
        onProfileClick={() => onProfileClick?.()}
        isProfileOpen={isProfileOpen}
        currentUser={currentUser}
        onPreviousPurchasesClick={onPreviousPurchasesClick}
      />
      {!isPriceCheckMode && !isPaymentMode && <TopMenu onPriceCheckClick={() => onPriceCheckClick?.()} />}
      {isPriceCheckMode && (
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Price check mode">
          <Frame onClose={() => onPriceCheckClose?.()} />
        </div>
      )}
      {isPaymentMode && (
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Payment mode">
          <Frame onClose={() => onPaymentClose?.()} paymentTitle={paymentTitle} />
        </div>
      )}
    </div>
  );
}
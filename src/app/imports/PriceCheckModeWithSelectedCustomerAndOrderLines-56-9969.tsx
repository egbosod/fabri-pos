import svgPaths from "./svg-kymiuaivmo";

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
        <g clipPath="url(#clip0_56_11745)" id="Chevron Down 2">
          <path d={svgPaths.p507f400} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_56_11745">
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

function Frame137() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
      <div className="h-[48px] relative shrink-0 w-[163px]" data-name="User menu button">
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
        <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal h-[14.767px] leading-[1.75] left-[37px] text-[12px] text-white top-[calc(50%-10px)] w-[97.5px]">Ola Nordmann</p>
        <UserIcon />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#42424a] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex items-center justify-between px-[10px] py-[6px] relative w-full">
          <Frame138 />
          <Frame137 />
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
    <div className="bg-[#282832] h-[68px] overflow-clip relative shadow-[2px_2px_4px_0px_rgba(126,126,126,0.06),3px_10px_15px_0px_rgba(126,126,126,0.06)] shrink-0 w-[1024px]" data-name="Top menu">
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

function Content18() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Varenavn</p>
      </div>
    </div>
  );
}

function TableCell18() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[310px]" data-name="Table/Cell">
      <Content18 />
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Antall</p>
      </div>
    </div>
  );
}

function TableCell19() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Content19 />
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Per enhet</p>
      </div>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[82px]" data-name="Table/Cell">
      <Content20 />
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Rabatt</p>
      </div>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[54px]" data-name="Table/Cell">
      <Content21 />
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Totalt</p>
      </div>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[79px]" data-name="Table/Cell">
      <Content22 />
    </div>
  );
}

function Return() {
  return <div className="absolute bg-[#ff8c21] h-[62px] left-0 rounded-[5px] top-0 w-[393.729px]" data-name="return" />;
}

function Delete() {
  return <div className="absolute bg-[#f24c35] h-[62px] left-[373.99px] rounded-[5px] top-0 w-[373.007px]" data-name="delete" />;
}

function Background() {
  return (
    <div className="absolute contents left-0 top-0" data-name="background">
      <Return />
      <Delete />
    </div>
  );
}

function Check() {
  return (
    <div className="[grid-area:1_/_1] ml-[3px] mt-px relative size-[20px]" data-name="check">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="check" opacity="0">
          <path d={svgPaths.p20b4f190} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.25" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[7.031%]" data-name="Group">
      <div className="absolute inset-[-3.636%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <g id="Group">
            <path d="M0.75 4.5H21.375" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3c85fbf0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M8.95312 16.4531V9.42188" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M13.1719 16.4531V9.42188" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p1a0a1d00} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Ikoner() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Ikoner">
      <Check />
      <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[24px]" data-name="Icon / Delete">
        <div className="absolute left-0 size-[24px] top-0" data-name="Icon Plate" />
        <Group5 />
      </div>
    </div>
  );
}

function Slettinfo() {
  return (
    <div className="absolute content-stretch flex gap-[11px] items-start left-[652px] opacity-0 top-[19px]" data-name="slettinfo">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[14px] text-nowrap text-white whitespace-pre">Slett</p>
      <Ikoner />
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[0px] text-nowrap">
        <p className="leading-[19px] whitespace-pre">
          <span className="font-['Montserrat:Medium',sans-serif] font-medium text-[14px]">Beslagsskrue 5,0x40 CS A-250 Corrseal</span>
          <span className="text-[14px]">
            <br aria-hidden="true" />
          </span>
          <span className="text-[#6b6b72] text-[12px]">23083603</span>
        </p>
      </div>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[310px]" data-name="Table/Cell">
      <Content23 />
    </div>
  );
}

function Frame655() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#090914] text-[14px] text-nowrap">
        <p className="leading-[1.38] whitespace-pre">3,00</p>
      </div>
    </div>
  );
}

function Textfield() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0" data-name="Textfield">
      <Frame655 />
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">PAK</p>
      </div>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="Content">
      <Textfield />
      <Content24 />
      <div className="absolute h-0 left-0 top-[21.5px] w-[65px]">
        <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 2">
            <line id="Line 2" stroke="var(--stroke-0, #6B6B72)" strokeWidth="2" x2="65" y1="1" y2="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Numpad() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="numpad">
      <Content25 />
    </div>
  );
}

function Frame656() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#090914] text-[14px] text-nowrap">
        <p className="leading-[1.38] whitespace-pre">179,00</p>
      </div>
    </div>
  );
}

function Textfield1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0" data-name="Textfield">
      <Frame656 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 2">
            <line id="Line 2" stroke="var(--stroke-0, #6B6B72)" strokeWidth="2" x2="44" y1="1" y2="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content26() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Textfield1 />
    </div>
  );
}

function Numpad1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0 w-[82px]" data-name="numpad">
      <Content26 />
    </div>
  );
}

function Frame657() {
  return (
    <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-nowrap">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#090914] text-[14px]">
        <p className="leading-[1.38] text-nowrap whitespace-pre">10</p>
      </div>
      <div className="flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center relative shrink-0 text-[#42424a] text-[12px]">
        <p className="leading-[1.38] text-nowrap whitespace-pre">%</p>
      </div>
    </div>
  );
}

function Textfield2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0" data-name="Textfield">
      <Frame657 />
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute bottom-0 left-0 right-0 top-[-2px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29 2">
            <line id="Line 2" stroke="var(--stroke-0, #6B6B72)" strokeWidth="2" x2="29" y1="1" y2="1" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Textfield2 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip pl-[10px] pr-[4px] py-[5px] relative shrink-0 w-[54px]" data-name="Table/Cell">
      <Content27 />
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[19px] relative shrink-0 text-[#22222c] text-[0px] text-nowrap text-right whitespace-pre">
        <p className="mb-0 text-[14px]">483,30</p>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Montserrat:Regular',sans-serif] font-normal line-through text-[#6b6b72] text-[12px]">537,00</p>
      </div>
    </div>
  );
}

function TableCell25() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[79px]" data-name="Table/Cell">
      <Content28 />
    </div>
  );
}

function TableRow3() {
  return (
    <div className="absolute bg-[#f2f6f9] content-stretch flex items-start left-0 overflow-clip rounded-[5px] top-0 w-[747px]" data-name="Table/Row">
      <TableCell23 />
      <Numpad />
      <Numpad1 />
      <TableCell24 />
      <TableCell25 />
    </div>
  );
}

function Table1() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center relative rounded-[5px] shrink-0 w-full" data-name="Table">
      <div className="box-border content-stretch flex items-start overflow-clip pb-[10px] pt-0 px-0 relative rounded-[5px] shrink-0 w-full" data-name="Table/Row">
        <TableCell18 />
        <TableCell19 />
        <TableCell20 />
        <TableCell21 />
        <TableCell22 />
      </div>
      <div className="h-[72px] overflow-clip relative rounded-[5px] shrink-0 w-[747px]" data-name="Row">
        <Background />
        <Slettinfo />
        <TableRow3 />
        <div className="absolute content-stretch flex items-start left-[76px] top-[33px] w-[44px]" data-name="Varelabel/Farlig_gods">
          <div className="absolute bg-[#ffe4b7] box-border content-stretch flex gap-[10px] h-[17px] items-center justify-center left-0 px-[4px] py-[2px] rounded-[3px] top-0" data-name="Label">
            <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] relative shrink-0 text-[#090914] text-[11px] text-nowrap whitespace-pre">Farlig gods</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame427319122() {
  return (
    <div className="h-[34px] leading-[0] relative shrink-0 text-nowrap w-[92px]">
      <div className="absolute flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center left-0 text-[#42424a] text-[12px] top-[26.5px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">12. juni 2023</p>
      </div>
      <div className="absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center left-0 text-[#22222c] text-[14px] top-[calc(50%-8.5px)] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Ordre 520591</p>
      </div>
    </div>
  );
}

function Frame427319078() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start leading-[0] relative shrink-0 text-nowrap">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#22222c] text-[14px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">LS Bygg og Service AS</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#42424a] text-[12px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt: Brennerigata 43A, bygg B</p>
      </div>
    </div>
  );
}

function Frame427319101() {
  return (
    <div className="content-stretch flex gap-[43px] items-start relative shrink-0 w-[430px]">
      <Frame427319122 />
      <Frame427319078 />
    </div>
  );
}

function Sum1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-end px-[10px] py-0 relative shrink-0 w-[165px]" data-name="sum">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
        <p className="leading-[19px] whitespace-pre">483,30</p>
      </div>
    </div>
  );
}

function LabelAndCounter1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0 w-[76px]" data-name="Label and counter">
      <div className="bg-white box-border content-stretch flex gap-[10px] h-[20px] items-center justify-center px-[6px] py-[2px] relative rounded-[3px] shrink-0" data-name="Label">
        <div aria-hidden="true" className="absolute border border-[#ff8c21] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.38] relative shrink-0 text-[#101115] text-[11px] text-nowrap whitespace-pre">Delvis betalt</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">3 varelinjer</p>
      </div>
    </div>
  );
}

function Frame427319109() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-0 top-[calc(50%+4.5px)] translate-y-[-50%]">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Sum2() {
  return (
    <div className="box-border content-stretch flex gap-[27px] items-center justify-end pl-[10px] pr-[25px] py-0 relative shrink-0 w-[293px]" data-name="sum">
      <Sum1 />
      <LabelAndCounter1 />
      <Frame427319109 />
    </div>
  );
}

function Frame637() {
  return (
    <div className="box-border content-stretch flex gap-[5px] items-center overflow-clip px-[10px] py-0 relative shrink-0 w-[747px]">
      <Frame427319101 />
      <Sum2 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute inset-[6.05%_6.05%_6.06%_6.05%]" data-name="Group">
      <div className="absolute inset-[-3.556%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <g id="Group">
            <path d="M0.375 10.9219L10.9219 0.375" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            <path d="M10.9219 10.9219L0.375 0.375" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center left-0 px-[13px] py-[6px] rounded-[5px] top-[84px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Icon / Close">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <Group7 />
      </div>
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-nowrap whitespace-pre">Fjern fra salget</p>
    </div>
  );
}

function Orderrows1() {
  return (
    <div className="bg-white h-[61px] relative rounded-[5px] shrink-0 w-full" data-name="Orderrows">
      <div className="box-border content-stretch flex flex-col h-[61px] items-start justify-center overflow-clip px-0 py-[12px] relative rounded-[inherit] w-full">
        <Frame637 />
        <Button1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Group427319078() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-[4px] mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <ol className="list-decimal" start="12">
          <li className="ms-[18px]">
            <span className="leading-[normal]">juni 2023</span>
          </li>
        </ol>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Håndterminal</p>
      </div>
    </div>
  );
}

function Frame427319108() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Group427319078 />
    </div>
  );
}

function Frame427319080() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center leading-[0] relative shrink-0 text-nowrap">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#22222c] text-[14px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">08613290</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#42424a] text-[12px]">
        <p className="leading-[normal] text-nowrap whitespace-pre"> </p>
      </div>
    </div>
  );
}

function Frame427319100() {
  return (
    <div className="content-stretch flex gap-[33px] items-center relative shrink-0 w-[430px]">
      <Frame427319108 />
      <Frame427319080 />
    </div>
  );
}

function Sum5() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-end px-[10px] py-0 relative shrink-0 w-[165px]" data-name="sum">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
        <p className="leading-[19px] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function LabelAndCounter3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0 w-[76px]" data-name="Label and counter">
      <div className="bg-white box-border content-stretch flex gap-[10px] h-[20px] items-center justify-center px-[6px] py-[2px] relative rounded-[3px] shrink-0" data-name="Label">
        <div aria-hidden="true" className="absolute border border-[#9650ee] border-solid inset-0 pointer-events-none rounded-[3px]" />
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] relative shrink-0 text-[#101115] text-[11px] text-nowrap whitespace-pre">Håndterminal</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">3 varelinjer</p>
      </div>
    </div>
  );
}

function Frame427319111() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-0 top-[calc(50%+5px)] translate-y-[-50%]">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Sum6() {
  return (
    <div className="box-border content-stretch flex gap-[27px] items-center justify-end pl-[10px] pr-[25px] py-0 relative shrink-0 w-[293px]" data-name="sum">
      <Sum5 />
      <LabelAndCounter3 />
      <Frame427319111 />
    </div>
  );
}

function Frame639() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[5px] items-center px-[10px] py-0 relative w-full">
          <Frame427319100 />
          <Sum6 />
        </div>
      </div>
    </div>
  );
}

function Orderrows3() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[62px] items-start justify-center px-0 py-[12px] relative rounded-[5px] shrink-0 w-full" data-name="Orderrows">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame639 />
    </div>
  );
}

function FromHandTerminal() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-full" data-name="From hand terminal">
      {[...Array(2).keys()].map((_, i) => (
        <Orderrows1 key={i} />
      ))}
      <Orderrows3 />
    </div>
  );
}

function OrderItems() {
  return (
    <div className="content-stretch flex flex-col h-[540px] items-start justify-end overflow-x-clip overflow-y-auto relative shrink-0 w-[747px]" data-name="Order items">
      <Table1 />
      <FromHandTerminal />
    </div>
  );
}

function OrderItems1() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-end min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="Order items">
      <OrderItems />
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

function Frame238() {
  return (
    <div className="basis-0 bg-white grow h-full min-h-px min-w-px relative shrink-0">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
          <OrderItems1 />
          <div className="content-stretch flex gap-[10px] items-center relative rounded-bl-[3px] rounded-br-[3px] shrink-0 w-full" data-name="Search and actions">
            <div className="basis-0 bg-white grow h-[48px] min-h-px min-w-px relative rounded-[5px] shrink-0" data-name="Textfield/Normal">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame172() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="basis-0 font-['Montserrat:Bold',sans-serif] font-bold grow leading-[1.75] min-h-px min-w-px relative shrink-0 text-[#090914] text-[14px]">
        {`Byggmester `}
        <br aria-hidden="true" />
        Snorre Rogne
      </p>
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

function Body() {
  return (
    <div className="content-stretch flex h-[640px] items-end relative shrink-0 w-full z-[1]" data-name="Body">
      <Frame238 />
      <div className="bg-neutral-50 box-border content-stretch flex flex-col gap-[30px] h-full items-start justify-end p-[20px] relative shrink-0 w-[263px]" data-name="Sidebar">
        <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
        <div className="bg-white relative rounded-[3px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] shrink-0 w-full" data-name="Customer card sans edit">
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[15px] items-start p-[15px] relative w-full">
              <Frame172 />
              <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[1.75] relative shrink-0 text-[#090914] text-[14px] w-[179px]">Leilighetskompleks Parkgata</p>
            </div>
          </div>
        </div>
        <Buttons />
      </div>
    </div>
  );
}

export default function PriceCheckModeWithSelectedCustomerAndOrderLines({ onClose }: { onClose?: () => void }) {
  return (
    <div className="bg-zinc-200 content-stretch flex flex-col isolate items-start relative size-full" data-name="Price check mode - With selected customer AND order lines">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]" data-name="Header">
        <Header />
      </div>
      <Header1 onClose={onClose} />
      <Body />
    </div>
  );
}
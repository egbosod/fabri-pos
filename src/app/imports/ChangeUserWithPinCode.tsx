import svgPaths from "./svg-pi7ybb4q4f";

function IconClient() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon / Client">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon / Client">
          <path clipRule="evenodd" d={svgPaths.p36364e40} fill="var(--fill-0, #1A1B1F)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[11px] items-center relative shrink-0">
      <IconClient />
      <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[#1a1b1f] text-[15px]">Select method to change user</p>
    </div>
  );
}

function ModuleHeader() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Module header">
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-b-[1.461px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start px-[21px] py-[22px] relative w-full">
        <Frame />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[48px] items-center justify-end relative shrink-0">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">PIN-code</p>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-3px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 67 3">
            <line id="Line 57" stroke="var(--stroke-0, black)" strokeWidth="3" x2="67" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex h-[48px] items-end pb-[6px] relative shrink-0">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#0d97fc] text-[14px]">Password</p>
    </div>
  );
}

function Frame9() {
  return <div className="content-stretch flex h-[48px] items-end pb-[6px] shrink-0" />;
}

function TabsHeaderWithUnderline() {
  return (
    <div className="bg-white h-[58px] relative shadow-[0px_3px_3px_0px_rgba(107,107,114,0.06)] shrink-0 w-full" data-name="Tabs header with underline">
      <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[30px] items-end pt-[10px] px-[20px] relative size-full">
          <Frame7 />
          <Frame8 />
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full z-[3]" data-name="Header">
      <ModuleHeader />
      <TabsHeaderWithUnderline />
    </div>
  );
}

function IconDown() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon / Down">
          <path clipRule="evenodd" d={svgPaths.pc2f4900} fill="var(--fill-0, #1A1B1F)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Textfield() {
  return (
    <div className="bg-white col-1 content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] row-1 w-[535px]" data-name="Textfield">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px opacity-60 relative text-[#5d5e63] text-[13px] whitespace-pre-wrap">Select or search for user</p>
      <IconDown />
    </div>
  );
}

function InputAndLabel() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full" data-name="Input and label">
      <Textfield />
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#1a1b1f] text-[14px] w-[535px] whitespace-pre-wrap">User</p>
    </div>
  );
}

function Textfield1() {
  return (
    <div className="bg-white col-1 content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] row-1 w-[535px]" data-name="Textfield">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px opacity-60 relative text-[#5d5e63] text-[13px] whitespace-pre-wrap">{`Søk på navn, prosjektnr eller adresse `}</p>
    </div>
  );
}

function InputAndLabel1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full" data-name="Input and label">
      <Textfield1 />
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#1a1b1f] text-[14px] w-[535px] whitespace-pre-wrap">PIN-code</p>
    </div>
  );
}

function TextButton() {
  return (
    <div className="col-1 content-stretch flex gap-[8px] h-[48px] items-center ml-0 mt-0 px-[8px] py-[6px] relative rounded-[5px] row-1" data-name="Text button">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#0094f9] text-[12px] uppercase">{`Change  pin-code`}</p>
    </div>
  );
}

function InputAndLabel2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Input and label">
      <TextButton />
    </div>
  );
}

function ModuleContent() {
  return (
    <div className="bg-white relative rounded-[4.383px] shrink-0 w-full" data-name="Module content">
      <div aria-hidden="true" className="absolute border border-[#e6e6e8] border-solid inset-0 pointer-events-none rounded-[4.383px]" />
      <div className="content-stretch flex flex-col gap-[10px] items-start leading-[0] p-[20px] relative w-full">
        <InputAndLabel />
        <InputAndLabel1 />
        <InputAndLabel2 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="flex-[1_0_0] h-[401px] min-h-px min-w-px relative">
      <div className="content-stretch flex flex-col items-start p-[20px] relative size-full">
        <ModuleContent />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">1</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">2</p>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">3</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">4</p>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">5</p>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">6</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">7</p>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">8</p>
        </div>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">9</p>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">C</p>
        </div>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-[100px] relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[30px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[14px]">0</p>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[14.4px] relative shrink-0 w-[18px]" data-name="Icon">
      <div className="absolute inset-[-3.79%_-3.03%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.0909 15.4911">
          <g id="Icon">
            <path d={svgPaths.p36765300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
            <path d={svgPaths.p3374740} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
            <path d={svgPaths.p17633100} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white flex-[1_0_0] h-[48px] min-h-px min-w-px relative rounded-[5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[30px] py-[6px] relative size-full">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0 w-full">
      <Button9 />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Numbpad() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[328px]" data-name="Numbpad">
      <Frame1 />
      <Frame2 />
      <Frame3 />
      <Frame4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="bg-[#fbf9fc] h-[401px] relative shrink-0 w-[376px]">
      <div className="content-stretch flex flex-col gap-[20px] items-start overflow-x-clip overflow-y-auto p-[20px] relative size-full">
        <Numbpad />
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-l border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Body() {
  return (
    <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full z-[2]" data-name="Body">
      <Frame6 />
      <Frame5 />
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-[#f1f0f1] content-stretch flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#46464b] text-[15px]">Confirm</p>
    </div>
  );
}

function Button13() {
  return (
    <button className="bg-white content-stretch cursor-pointer flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[13px] text-left">Cancel</p>
    </button>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative" data-name="Buttons">
      <Button12 />
      <Button13 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white relative w-full" data-name="Footer">
      <div className="flex flex-row justify-end overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex isolate items-start justify-end px-[20px] py-[15px] relative w-full">
          <div className="flex items-center justify-center relative shrink-0 z-[1]">
            <div className="flex-none rotate-180">
              <Buttons />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-b border-solid inset-0 pointer-events-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)]" />
    </div>
  );
}

export default function ChangeUserWithPinCode() {
  return (
    <div className="bg-[#fbf9fc] content-stretch flex flex-col isolate items-start overflow-clip relative rounded-[3px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] size-full" data-name="Change user- with PIN code">
      <Header />
      <Body />
      <div className="flex items-center justify-center relative shrink-0 w-full z-[1]">
        <div className="flex-none rotate-180 w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
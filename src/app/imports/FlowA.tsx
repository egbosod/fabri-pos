import svgPaths from "./svg-oupl1kqc5l";

function SelectOption() {
  return (
    <div className="bg-white h-[53px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] relative shrink-0 text-[#6b6b72] text-[14px] tracking-[0.5px] uppercase">Bytt bruker</p>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[10.42%_0_8.83%_0]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9999 11.4853">
        <g id="Group">
          <path d={svgPaths.p8941680} fill="var(--fill-0, #676767)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconCheck() {
  return (
    <div className="h-[14.222px] overflow-clip relative shrink-0 w-[16px]" data-name="Icon / Check">
      <div className="absolute left-0 size-[64px] top-0" data-name="Icon Plate" />
      <Group />
    </div>
  );
}

function SelectOption1() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">{`Lise Arntsen `}</p>
          <IconCheck />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0d97fc] h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[15px] text-white">PIN</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[13px]">Passord</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start pt-[10px] relative shrink-0 w-full">
      <Button />
      <Button1 />
    </div>
  );
}

function SelectOption2() {
  return (
    <div className="bg-[#f0f9ff] relative shrink-0 w-full" data-name="Select option">
      <div className="content-stretch flex flex-col gap-[10px] items-start px-[15px] py-[14px] relative w-full">
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">Per Gunnersen</p>
        <Frame />
      </div>
    </div>
  );
}

function SelectOption3() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">Ole Gunnar Damstuen</p>
        </div>
      </div>
    </div>
  );
}

function SelectOption4() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">Mari Kristine Gullerud</p>
        </div>
      </div>
    </div>
  );
}

function IconDown() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_316_1035)" id="Icon / Down">
          <g id="Icon Plate" />
          <path d={svgPaths.p220f3900} fill="var(--fill-0, #828282)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_316_1035">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[15px] relative size-full">
          <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] relative shrink-0 text-[#6b6b72] text-[14px] tracking-[0.5px] uppercase">bytt språk</p>
          <IconDown />
        </div>
      </div>
    </div>
  );
}

function SelectOption5() {
  return (
    <div className="bg-white content-stretch flex h-[88px] items-end pt-[8px] relative shrink-0 w-full" data-name="Select option">
      <Frame3 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px]">Logg ut</p>
    </div>
  );
}

function SelectOption6() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end pb-[15px] pt-[25px] px-[15px] relative w-full">
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function ProfileMenu() {
  return (
    <div className="bg-[#d5d5d7] relative rounded-[5px] shrink-0 w-[231px]" data-name="Profile menu">
      <div className="content-stretch flex flex-col gap-px items-start overflow-clip relative rounded-[inherit] w-full">
        <SelectOption />
        <SelectOption1 />
        <SelectOption2 />
        <SelectOption3 />
        <SelectOption4 />
        <SelectOption5 />
        <SelectOption6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)]" />
    </div>
  );
}

function InMenuSwitchUserExpanded() {
  return (
    <div className="absolute content-stretch flex items-start left-[188px] top-[102px]" data-name="In menu - Switch user - Expanded">
      <ProfileMenu />
    </div>
  );
}

function SelectOption7() {
  return (
    <div className="bg-white h-[53px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] relative shrink-0 text-[#6b6b72] text-[14px] tracking-[0.5px] uppercase">Bytt bruker</p>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[10.42%_0_8.83%_0]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9999 11.4853">
        <g id="Group">
          <path d={svgPaths.p8941680} fill="var(--fill-0, #676767)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconCheck1() {
  return (
    <div className="h-[14.222px] overflow-clip relative shrink-0 w-[16px]" data-name="Icon / Check">
      <div className="absolute left-0 size-[64px] top-0" data-name="Icon Plate" />
      <Group1 />
    </div>
  );
}

function SelectOption8() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">{`Lise Arntsen `}</p>
          <IconCheck1 />
        </div>
      </div>
    </div>
  );
}

function Textfield() {
  return (
    <div className="bg-white h-[40px] relative rounded-[5px] shrink-0 w-full" data-name="Textfield">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal h-[24px] leading-[1.75] min-h-px min-w-px relative text-[#46464b] text-[13px] whitespace-pre-wrap">Your PIN-code</p>
        </div>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#0094f9] h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[15px] text-white">Confirm</p>
        </div>
      </div>
    </div>
  );
}

function TextButton() {
  return (
    <div className="h-[48px] relative rounded-[5px] shrink-0 w-full" data-name="Text button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#0094f9] text-[12px] uppercase">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start pt-[10px] relative shrink-0 w-full">
      <Textfield />
      <Button3 />
      <TextButton />
    </div>
  );
}

function SelectOption9() {
  return (
    <div className="bg-[#f0f9ff] relative shrink-0 w-full" data-name="Select option">
      <div className="content-stretch flex flex-col gap-[10px] items-start px-[15px] py-[14px] relative w-full">
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">Per Gunnersen</p>
        <Frame1 />
      </div>
    </div>
  );
}

function SelectOption10() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">Ole Gunnar Damstuen</p>
        </div>
      </div>
    </div>
  );
}

function SelectOption11() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">Mari Kristine Gullerud</p>
        </div>
      </div>
    </div>
  );
}

function IconDown1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_316_1035)" id="Icon / Down">
          <g id="Icon Plate" />
          <path d={svgPaths.p220f3900} fill="var(--fill-0, #828282)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_316_1035">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame4() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[15px] relative size-full">
          <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] relative shrink-0 text-[#6b6b72] text-[14px] tracking-[0.5px] uppercase">bytt språk</p>
          <IconDown1 />
        </div>
      </div>
    </div>
  );
}

function SelectOption12() {
  return (
    <div className="bg-white content-stretch flex h-[88px] items-end pt-[8px] relative shrink-0 w-full" data-name="Select option">
      <Frame4 />
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px]">Logg ut</p>
    </div>
  );
}

function SelectOption13() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end pb-[15px] pt-[25px] px-[15px] relative w-full">
          <Button4 />
        </div>
      </div>
    </div>
  );
}

function ProfileMenu1() {
  return (
    <div className="bg-[#d5d5d7] relative rounded-[5px] shrink-0 w-[231px]" data-name="Profile menu">
      <div className="content-stretch flex flex-col gap-px items-start overflow-clip relative rounded-[inherit] w-full">
        <SelectOption7 />
        <SelectOption8 />
        <SelectOption9 />
        <SelectOption10 />
        <SelectOption11 />
        <SelectOption12 />
        <SelectOption13 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)]" />
    </div>
  );
}

function InMenuSwitchUserPin() {
  return (
    <div className="absolute content-stretch flex items-start left-[495px] top-[102px]" data-name="In menu - Switch user - PIN">
      <ProfileMenu1 />
    </div>
  );
}

function SelectOption14() {
  return (
    <div className="bg-white h-[53px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] relative shrink-0 text-[#6b6b72] text-[14px] tracking-[0.5px] uppercase">Bytt bruker</p>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[10.42%_0_8.83%_0]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9999 11.4853">
        <g id="Group">
          <path d={svgPaths.p8941680} fill="var(--fill-0, #676767)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconCheck2() {
  return (
    <div className="h-[14.222px] overflow-clip relative shrink-0 w-[16px]" data-name="Icon / Check">
      <div className="absolute left-0 size-[64px] top-0" data-name="Icon Plate" />
      <Group2 />
    </div>
  );
}

function SelectOption15() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">{`Lise Arntsen `}</p>
          <IconCheck2 />
        </div>
      </div>
    </div>
  );
}

function Textfield1() {
  return (
    <div className="bg-white h-[40px] relative rounded-[5px] shrink-0 w-full" data-name="Textfield">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[10px] items-center px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal h-[24px] leading-[1.75] min-h-px min-w-px relative text-[#46464b] text-[13px] whitespace-pre-wrap">Your password</p>
        </div>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#0094f9] h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[15px] text-white">Confirm</p>
        </div>
      </div>
    </div>
  );
}

function TextButton1() {
  return (
    <div className="h-[48px] relative rounded-[5px] shrink-0 w-full" data-name="Text button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[8px] items-center justify-center px-[8px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#0094f9] text-[12px] uppercase">Cancel</p>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[15px] items-start pt-[10px] relative shrink-0 w-full">
      <Textfield1 />
      <Button5 />
      <TextButton1 />
    </div>
  );
}

function SelectOption16() {
  return (
    <div className="bg-[#f0f9ff] relative shrink-0 w-full" data-name="Select option">
      <div className="content-stretch flex flex-col gap-[10px] items-start px-[15px] py-[14px] relative w-full">
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">Per Gunnersen</p>
        <Frame2 />
      </div>
    </div>
  );
}

function SelectOption17() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">Ole Gunnar Damstuen</p>
        </div>
      </div>
    </div>
  );
}

function SelectOption18() {
  return (
    <div className="bg-white h-[48px] relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[15px] py-[8px] relative size-full">
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#22222c] text-[14px]">Mari Kristine Gullerud</p>
        </div>
      </div>
    </div>
  );
}

function IconDown2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_316_1035)" id="Icon / Down">
          <g id="Icon Plate" />
          <path d={svgPaths.p220f3900} fill="var(--fill-0, #828282)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_316_1035">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] h-[48px] min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center px-[15px] relative size-full">
          <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] relative shrink-0 text-[#6b6b72] text-[14px] tracking-[0.5px] uppercase">bytt språk</p>
          <IconDown2 />
        </div>
      </div>
    </div>
  );
}

function SelectOption19() {
  return (
    <div className="bg-white content-stretch flex h-[88px] items-end pt-[8px] relative shrink-0 w-full" data-name="Select option">
      <Frame5 />
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px]">Logg ut</p>
    </div>
  );
}

function SelectOption20() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Select option">
      <div className="flex flex-row items-end size-full">
        <div className="content-stretch flex items-end pb-[15px] pt-[25px] px-[15px] relative w-full">
          <Button6 />
        </div>
      </div>
    </div>
  );
}

function ProfileMenu2() {
  return (
    <div className="bg-[#d5d5d7] relative rounded-[5px] shrink-0 w-[231px]" data-name="Profile menu">
      <div className="content-stretch flex flex-col gap-px items-start overflow-clip relative rounded-[inherit] w-full">
        <SelectOption14 />
        <SelectOption15 />
        <SelectOption16 />
        <SelectOption17 />
        <SelectOption18 />
        <SelectOption19 />
        <SelectOption20 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)]" />
    </div>
  );
}

function InMenuSwitchUserPassword() {
  return (
    <div className="absolute content-stretch flex items-start left-[812px] top-[102px]" data-name="In menu - Switch user - Password">
      <ProfileMenu2 />
    </div>
  );
}

export default function FlowA() {
  return (
    <div className="bg-white border border-[rgba(0,0,0,0.1)] border-solid overflow-clip relative rounded-[2px] size-full" data-name="FlowA">
      <InMenuSwitchUserExpanded />
      <InMenuSwitchUserPin />
      <InMenuSwitchUserPassword />
    </div>
  );
}
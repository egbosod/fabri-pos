import svgPaths from "./svg-7pnc05owzj";

function LogoFabriVersion() {
  return (
    <div className="h-[53px] relative shrink-0 w-[186px]" data-name="Logo_Fabri_Version_2">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 186 53">
        <g id="Logo_Fabri_Version_2">
          <path d={svgPaths.p315ae880} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p1a3d0100} fill="var(--fill-0, #E9EAED)" id="Vector_2" />
          <path d={svgPaths.p2f059b80} fill="var(--fill-0, #47A4F1)" id="Vector_3" />
          <path d={svgPaths.p2d1e0d80} fill="var(--fill-0, #0075E7)" id="Vector_4" />
          <path d={svgPaths.p1a3e3f00} fill="var(--fill-0, #93CCFF)" id="Vector_5" />
          <path d={svgPaths.p1ec444c0} fill="var(--fill-0, #424D60)" id="Vector_6" />
          <path clipRule="evenodd" d={svgPaths.p106a2b80} fill="var(--fill-0, #424D60)" fillRule="evenodd" id="Vector_7" />
          <path clipRule="evenodd" d={svgPaths.p399e700} fill="var(--fill-0, #424D60)" fillRule="evenodd" id="Vector_8" />
          <path d={svgPaths.p2f37f340} fill="var(--fill-0, #424D60)" id="Vector_9" />
          <path d={svgPaths.p16dc3600} fill="var(--fill-0, #424D60)" id="Vector_10" />
          <path d={svgPaths.p363d6000} fill="var(--fill-0, #424D60)" id="Vector_11" />
          <path d={svgPaths.p2b12ed80} fill="var(--fill-0, #424D60)" id="Vector_12" />
          <path d={svgPaths.pf3d0b00} fill="var(--fill-0, #424D60)" id="Vector_13" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[40px] relative shrink-0 w-[213px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[20.4px] relative shrink-0 text-[#1a1b1f] text-[17px]">Change PIN-code</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[197.484px]" data-name="Label">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#1a1b1f] text-[12px] top-0">User</p>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="h-[17.141px] relative shrink-0 w-[143.484px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[17.143px] relative shrink-0 text-[#46464b] text-[12px] text-center">Select or search for user</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #46464B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="absolute bg-white content-stretch flex h-[48px] items-center justify-between left-0 px-[15px] py-px rounded-[5px] top-[25.8px] w-[321px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <PrimitiveSpan />
      <Icon />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[74px] relative shrink-0 w-[321px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Label />
        <PrimitiveButton />
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[174px]" data-name="Label">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#1a1b1f] text-[12px] top-0">Password</p>
    </div>
  );
}

function PasswordInput() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center left-[14px] overflow-clip rounded-[5px] top-[8px] w-[289px]" data-name="Password Input">
      <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#46464b] text-[13px]">Enter current password</p>
    </div>
  );
}

function Container5() {
  return <div className="absolute border border-[#c7c7c8] border-solid h-[48px] left-0 rounded-[5px] top-[-0.2px] w-[321px]" data-name="Container" />;
}

function Container4() {
  return (
    <div className="absolute bg-white h-[48px] left-0 rounded-[5px] top-[26.2px] w-[321px]" data-name="Container">
      <PasswordInput />
      <Container5 />
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[74px] relative shrink-0 w-[321px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Label1 />
        <Container4 />
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[174px]" data-name="Label">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#1a1b1f] text-[12px] top-0">PIN-code</p>
    </div>
  );
}

function PasswordInput1() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center left-[14px] overflow-clip rounded-[5px] top-[8.2px] w-[281px]" data-name="Password Input">
      <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#46464b] text-[13px] text-center">Enter new PIN-code</p>
    </div>
  );
}

function Container8() {
  return <div className="absolute border border-[#c7c7c8] border-solid h-[48px] left-0 rounded-[5px] top-[-0.2px] w-[321px]" data-name="Container" />;
}

function Container7() {
  return (
    <div className="absolute bg-white h-[48px] left-0 rounded-[5px] top-[26px] w-[174px]" data-name="Container">
      <PasswordInput1 />
      <Container8 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[74px] relative shrink-0 w-[321px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Label2 />
        <Container7 />
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="absolute h-[21px] left-0 top-0 w-[174px]" data-name="Label">
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#1a1b1f] text-[12px] top-0">PIN-code again</p>
    </div>
  );
}

function PasswordInput2() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-center left-[14px] overflow-clip rounded-[5px] top-[8.39px] w-[302px]" data-name="Password Input">
      <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#46464b] text-[13px] text-center">Enter new PIN-code again</p>
    </div>
  );
}

function Container11() {
  return <div className="absolute border border-[#c7c7c8] border-solid h-[48px] left-0 rounded-[5px] top-0 w-[321px]" data-name="Container" />;
}

function Container10() {
  return (
    <div className="absolute bg-white h-[48px] left-0 rounded-[5px] top-[25.8px] w-[321px]" data-name="Container">
      <PasswordInput2 />
      <Container11 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[74px] relative shrink-0 w-[321px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Label3 />
        <Container10 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[321px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10px] items-start relative size-full">
        <LogoFabriVersion />
        <Paragraph />
        <Container2 />
        <Container3 />
        <Container6 />
        <Container9 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f1f0f1] flex-[1_0_0] h-[48px] min-h-px min-w-px opacity-60 relative rounded-[5px]" data-name="Button">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[20px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[26.25px] relative shrink-0 text-[#46464b] text-[15px] text-center">Confirm new PIN-code</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[48px] relative rounded-[5px] shrink-0 w-[87.391px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[21px] py-[7px] relative size-full">
        <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[22.75px] relative shrink-0 text-[#101115] text-[13px] text-center">Cancel</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[48px] relative shrink-0 w-[321px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[20px] items-center pr-[-1.766px] relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-center overflow-clip py-[20px] relative rounded-[10px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.27)] size-full" data-name="Container">
      <Container1 />
      <Container12 />
    </div>
  );
}
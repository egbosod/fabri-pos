import svgPaths from "./svg-bu0bz8fog";

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

function Group() {
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
        <Group />
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

function Content() {
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

function TableCell() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[310px]" data-name="Table/Cell">
      <Content />
    </div>
  );
}

function Frame() {
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
      <Frame />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">PAK</p>
      </div>
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0" data-name="Content">
      <Textfield />
      <Content1 />
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
      <Content2 />
    </div>
  );
}

function Frame1() {
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
      <Frame1 />
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

function Content3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Textfield1 />
    </div>
  );
}

function Numpad1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center px-[10px] py-[5px] relative shrink-0 w-[82px]" data-name="numpad">
      <Content3 />
    </div>
  );
}

function Frame2() {
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
      <Frame2 />
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

function Content4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Textfield2 />
    </div>
  );
}

function TableCell1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip pl-[10px] pr-[4px] py-[5px] relative shrink-0 w-[54px]" data-name="Table/Cell">
      <Content4 />
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[19px] relative shrink-0 text-[#22222c] text-[0px] text-nowrap text-right whitespace-pre">
        <p className="mb-0 text-[14px]">483,30</p>
        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-['Montserrat:Regular',sans-serif] font-normal line-through text-[#6b6b72] text-[12px]">537,00</p>
      </div>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[79px]" data-name="Table/Cell">
      <Content5 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="absolute bg-[#f2f6f9] content-stretch flex items-start left-0 overflow-clip rounded-[5px] top-0 w-[747px]" data-name="Table/Row">
      <TableCell />
      <Numpad />
      <Numpad1 />
      <TableCell1 />
      <TableCell2 />
    </div>
  );
}

export default function Row() {
  return (
    <div className="overflow-clip relative rounded-[5px] size-full" data-name="Row">
      <Background />
      <Slettinfo />
      <TableRow />
      <div className="absolute content-stretch flex items-start left-[76px] top-[33px]" data-name="Varelabel/Ingen" />
    </div>
  );
}
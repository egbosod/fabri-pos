import svgPaths from "./svg-0v6sc5an1s";

function NavigationMenuVertical() {
  return (
    <div className="relative shrink-0 size-[25px]" data-name="Navigation Menu Vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25 25">
        <g id="Navigation Menu Vertical">
          <path d={svgPaths.p16228b80} fill="var(--fill-0, #22222C)" id="Vector" />
          <path d={svgPaths.p2b75d980} fill="var(--fill-0, #22222C)" id="Vector_2" />
          <path d={svgPaths.p25dc2480} fill="var(--fill-0, #22222C)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[8px] items-center justify-center px-[15px] py-[6px] relative rounded-[5px] shrink-0 size-[48px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <NavigationMenuVertical />
    </div>
  );
}

function Frame172() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="basis-0 font-['Montserrat:Bold',sans-serif] font-bold grow leading-[1.75] min-h-px min-w-px relative shrink-0 text-[#090914] text-[14px]">Byggmester Snorre Rogne</p>
      <Button />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-full" data-name="Buttons">
      <a className="bg-[#efeff0] cursor-pointer h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full" data-name="Button - betal nå" href="https://www.figma.com/proto/8GpkqyjqWNpGX9SWbDDLf4/Point-Of-Sale-(POS)?page-id=0%3A903&type=design&node-id=914-42293&t=ztYIclHKje6ohAaS-0&scaling=min-zoom&starting-point-node-id=914%3A42293">
        <div className="flex flex-row items-center justify-center min-w-inherit size-full">
          <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-inherit px-[20px] py-[6px] relative w-full">
            <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#42424a] text-[15px] text-nowrap whitespace-pre">Betal nå</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="bg-neutral-50 relative size-full" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-end size-full">
        <div className="box-border content-stretch flex flex-col gap-[30px] items-start justify-end p-[20px] relative size-full">
          <div className="bg-white relative rounded-[3px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] shrink-0 w-full" data-name="Customer card">
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
    </div>
  );
}
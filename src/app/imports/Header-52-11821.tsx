import svgPaths from "./svg-6kz7vyrghj";

function Group() {
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

function Frame681() {
  return (
    <button className="box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center overflow-visible p-[8px] relative shrink-0 size-[48px]">
      <div className="relative shrink-0 size-[27px]" data-name="Close">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
            <circle cx="13.5" cy="13.5" fill="var(--fill-0, #42424A)" id="Ellipse 1" r="13.5" />
          </svg>
        </div>
        <div className="absolute inset-[31.48%_30.37%_28.52%_29.63%] overflow-clip" data-name="Icon / Close">
          <div className="absolute left-0 size-[10.8px] top-0" data-name="Icon Plate" />
          <Group />
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

function Frame427319064() {
  return (
    <div className="absolute content-stretch flex items-start left-[12px] top-[10px]">
      <Frame681 />
      <TextButton />
    </div>
  );
}

function TopMenu() {
  return (
    <div className="bg-[#282832] h-[68px] overflow-clip relative shadow-[2px_2px_4px_0px_rgba(126,126,126,0.06),3px_10px_15px_0px_rgba(126,126,126,0.06)] shrink-0 w-[1024px]" data-name="Top menu">
      <Frame427319064 />
    </div>
  );
}

export default function Header() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative size-full" data-name="Header">
      <TopMenu />
    </div>
  );
}
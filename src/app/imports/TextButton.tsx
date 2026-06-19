import svgPaths from "./svg-ur4srfrp50";

function Group3() {
  return (
    <div className="absolute bottom-[2.05%] left-0 right-0 top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Group 3">
          <path clipRule="evenodd" d={svgPaths.p3e721a00} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p32d8c800} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

export default function TextButton() {
  return (
    <div className="relative rounded-[5px] size-full" data-name="Text button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center px-[9px] py-[6px] relative size-full">
          <div className="overflow-clip relative shrink-0 size-[12px]" data-name="Icon / Search">
            <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
            <Group3 />
          </div>
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#22222c] text-[12px] text-nowrap uppercase whitespace-pre">Sjekk pris</p>
        </div>
      </div>
    </div>
  );
}
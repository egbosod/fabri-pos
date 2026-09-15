import svgPaths from "./svg-1kwhsyzoip";

export default function InputAndLabel() {
  return (
    <div className="relative size-full" data-name="Input and label">
      <div className="absolute bg-white h-[48px] left-0 rounded-[5px] top-[25.5px] w-[575px]" data-name="Textfield/Normal">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex gap-[10px] items-center px-[14px] py-[8px] relative size-full">
            <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px relative text-[#6b6b72] text-[14px] whitespace-pre-wrap">Search for name, project number or address</p>
            <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
              <div className="absolute left-0 size-[57.6px] top-0" data-name="Icon Plate" />
              <div className="absolute inset-[0_0_2.05%_0]">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 13.7132">
                  <g id="Group 3">
                    <path clipRule="evenodd" d={svgPaths.p2d8c2380} fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)" />
                    <path clipRule="evenodd" d={svgPaths.p383aa00} fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)_2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] left-0 text-[#22222c] text-[14px] top-0 w-[575px] whitespace-pre-wrap">Project</p>
    </div>
  );
}
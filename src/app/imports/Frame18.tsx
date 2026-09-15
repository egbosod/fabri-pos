import svgPaths from "./svg-y6on3gm583";
import imgBlinkingCaret1 from "figma:asset/dc3aad517ab9f61fffb0eba3fbe67e248d89a489.png";

export default function Frame() {
  return (
    <div className="content-stretch flex gap-[21.914px] items-end leading-[0] relative size-full">
      <div className="flex-[1_0_0] grid-cols-[max-content] grid-rows-[max-content] inline-grid min-h-px min-w-px place-items-start relative" data-name="Input and label">
        <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#22222c] text-[14px] w-[443.673px]">Prosjekt</p>
        <div className="bg-white col-1 h-[48px] ml-0 mt-[26px] relative rounded-[5px] row-1 w-[505.086px]" data-name="Textfield/Normal">
          <div aria-hidden="true" className="absolute border-2 border-[#0d97fc] border-solid inset-0 pointer-events-none rounded-[5px]" />
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex gap-[6px] items-center px-[14px] py-[8px] relative size-full">
              <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px opacity-60 relative text-[#6b6b72] text-[14px]">{`Søk på navn, prosjektnr eller adresse `}</p>
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
              <div className="-translate-y-1/2 absolute h-[15px] left-[13px] top-1/2 w-px" data-name="blinking-caret 1">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgBlinkingCaret1} />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_2px_2px_3px_0px_rgba(0,0,0,0.1)]" />
        </div>
      </div>
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Input and label">
        <div className="bg-white col-1 ml-0 mt-0 relative rounded-[5px] row-1 size-[48px]" data-name="Iconbutton">
          <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
          <div className="flex flex-row items-center justify-end size-full">
            <div className="content-stretch flex items-center justify-end px-[10px] py-[6px] relative size-full">
              <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Plus">
                <div className="absolute inset-[4.17%_6.25%_6.25%_4.17%]" data-name="Vector">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5 21.5">
                    <g id="Vector">
                      <path clipRule="evenodd" d={svgPaths.p318606f0} fill="var(--fill-0, #1A1B1F)" fillRule="evenodd" />
                      <path clipRule="evenodd" d={svgPaths.pe142d80} fill="var(--fill-0, #1A1B1F)" fillRule="evenodd" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
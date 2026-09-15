import svgPaths from "./svg-wzc97443n2";
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="content-stretch flex items-center pl-0 pr-[15px] py-0 relative shrink-0">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  );
}

export default function KvitteringsvalgToggleBig() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[20px] items-center overflow-clip px-[32px] py-[26px] relative rounded-[3px] size-full" data-name="Kvitteringsvalg toggle big">
      <div className="content-stretch flex flex-col gap-[12px] items-center justify-center relative shrink-0">
        <div className="relative shrink-0 size-[75px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 75">
            <g id="Group 80">
              <circle cx="37.5" cy="37.5" fill="var(--fill-0, white)" id="Ellipse 3" r="35.7143" stroke="var(--stroke-0, #268647)" strokeWidth="3.57143" />
              <g id="Fading checkmark">
                <path d={svgPaths.p11355ce8} id="Vector 5" stroke="var(--stroke-0, #268647)" strokeLinecap="round" strokeWidth="5.60516" />
              </g>
            </g>
          </svg>
        </div>
        <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
          <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
            <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[#090914] text-[15px] text-center text-nowrap">Betaling fullført!</p>
          </div>
        </div>
      </div>
      <div className="h-0 relative shrink-0 w-[365px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 365 1">
            <line id="Line 58" stroke="var(--stroke-0, #E6E6E8)" x2="365" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="content-center flex flex-wrap gap-[28px] items-center relative shrink-0">
        <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0">
          <div className="content-stretch flex gap-[30px] items-center leading-[0] relative shrink-0">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <p className="[grid-area:1_/_1] font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-[66.5px] mt-0 relative text-[#22222c] text-[14px] text-center text-nowrap translate-x-[-50%]">Skriv ut kvittering</p>
              <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[12px] items-start ml-0 mt-[30.42px] relative">
                <div className="bg-[#f0f9ff] content-stretch flex flex-col items-start justify-center px-0 py-[10px] relative rounded-[5px] shrink-0 w-[138px]" data-name="Toggle big">
                  <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <div className="content-stretch flex items-center relative shrink-0" data-name="Columns">
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start justify-center overflow-clip px-[15px] py-[3px] relative shrink-0" data-name="Table/Cell">
                      <div className="content-stretch flex gap-[11.25px] items-center relative shrink-0" data-name="Toggle">
                        <div className="h-[25px] relative shrink-0 w-[46.25px]" data-name="Control">
                          <div className="absolute bg-[#86cbfd] inset-[15%_0_15%_2.7%] rounded-[125px]" data-name="Track" />
                          <div className="absolute bg-[#0d97fc] border-[#0d97fc] border-[1.25px] border-solid inset-[0_-2.7%_0_48.65%] rounded-[125px] shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)]" data-name="Button" />
                        </div>
                      </div>
                    </div>
                    <Text text="Vanlig" />
                  </div>
                </div>
                <div className="bg-white content-stretch flex flex-col items-start justify-center px-0 py-[10px] relative rounded-[5px] shrink-0" data-name="Toggle big">
                  <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <div className="content-stretch flex items-center relative shrink-0" data-name="Columns">
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start justify-center overflow-clip px-[15px] py-[3px] relative shrink-0" data-name="Table/Cell">
                      <div className="content-stretch flex gap-[11.25px] items-center relative shrink-0" data-name="Toggle">
                        <div className="h-[25px] relative shrink-0 w-[46.25px]" data-name="Control">
                          <div className="absolute bg-[#989899] inset-[15%_0_15%_2.7%] rounded-[125px]" data-name="Track" />
                          <div className="absolute bg-white border-[#d5d5d7] border-[1.25px] border-solid inset-[0_45.95%_0_0] rounded-[125px] shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)]" data-name="Button" />
                        </div>
                      </div>
                    </div>
                    <Text text="A4-ark" />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0">
              <p className="[grid-area:1_/_1] font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-[62.5px] mt-0 relative text-[#22222c] text-[14px] text-center text-nowrap translate-x-[-50%]">Digital kvittering</p>
              <div className="[grid-area:1_/_1] content-stretch flex flex-col gap-[12px] items-start ml-[0.25px] mt-[30px] relative">
                <div className="bg-white content-stretch flex flex-col items-start justify-center px-0 py-[10px] relative rounded-[5px] shrink-0" data-name="Toggle big">
                  <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <div className="content-stretch flex items-center relative shrink-0" data-name="Columns">
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start justify-center overflow-clip px-[15px] py-[3px] relative shrink-0" data-name="Table/Cell">
                      <div className="content-stretch flex gap-[11.25px] items-center relative shrink-0" data-name="Toggle">
                        <div className="h-[25px] relative shrink-0 w-[46.25px]" data-name="Control">
                          <div className="absolute bg-[#989899] inset-[15%_0_15%_2.7%] rounded-[125px]" data-name="Track" />
                          <div className="absolute bg-white border-[#d5d5d7] border-[1.25px] border-solid inset-[0_45.95%_0_0] rounded-[125px] shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)]" data-name="Button" />
                        </div>
                      </div>
                    </div>
                    <Text text="E-post" />
                  </div>
                </div>
                <div className="bg-white content-stretch flex flex-col items-start justify-center px-0 py-[10px] relative rounded-[5px] shrink-0 w-[137px]" data-name="Toggle big">
                  <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                  <div className="content-stretch flex items-center relative shrink-0" data-name="Columns">
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-start justify-center overflow-clip px-[15px] py-[3px] relative shrink-0" data-name="Table/Cell">
                      <div className="content-stretch flex gap-[11.25px] items-center relative shrink-0" data-name="Toggle">
                        <div className="h-[25px] relative shrink-0 w-[46.25px]" data-name="Control">
                          <div className="absolute bg-[#989899] inset-[15%_0_15%_2.7%] rounded-[125px]" data-name="Track" />
                          <div className="absolute bg-white border-[#d5d5d7] border-[1.25px] border-solid inset-[0_45.95%_0_0] rounded-[125px] shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)]" data-name="Button" />
                        </div>
                      </div>
                    </div>
                    <Text text="SMS" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[28px] items-start relative shrink-0">
            <div className="content-stretch flex flex-col gap-[5px] items-start relative shrink-0">
              <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] relative shrink-0 text-[#22222c] text-[14px] text-center w-[124px]">Selger på salget</p>
              <div className="bg-white content-stretch flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] relative rounded-[5px] shrink-0 w-[365px]" data-name="Textfield/Normal">
                <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                <p className="basis-0 font-['Montserrat:Regular',sans-serif] font-normal grow leading-[1.75] min-h-px min-w-px relative shrink-0 text-[#42424a] text-[14px]">9988: Ola Nordmann</p>
                <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
                  <div className="absolute left-0 size-[57.6px] top-0" data-name="Icon Plate" />
                  <div className="absolute inset-[0_0_2.05%_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 13.7132">
                      <g id="Group 3">
                        <path clipRule="evenodd" d={svgPaths.p2d8c2380} fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)" />
                        <path clipRule="evenodd" d={svgPaths.p3d995300} fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)_2" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#0d97fc] content-stretch flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0 w-[365px]" data-name="Button">
              <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[15px] text-center text-nowrap text-white">Bekreft</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
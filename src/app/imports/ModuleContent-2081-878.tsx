import svgPaths from "./svg-ng83x29hyo";
import imgImage38 from "figma:asset/2a8189f6f2eaf0882cfe0cd637b5bb36e06db9f0.png";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-0 relative shrink-0 w-full">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        {children}
      </svg>
    </div>
  );
}
type ContentTextProps = {
  text: string;
};

function ContentText({ text }: ContentTextProps) {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] whitespace-nowrap">
        <p className="leading-[normal]">{text}</p>
      </div>
    </div>
  );
}
type CheckboxProps = {
  className?: string;
  status?: "Normal" | "Active" | "Disabled" | "Intermediate";
};

function Checkbox({ className, status = "Normal" }: CheckboxProps) {
  if (status === "Active") {
    return (
      <button className={className || "bg-[#0d97fc] block cursor-pointer relative rounded-[5px] shadow-[0px_3px_3px_0px_rgba(107,107,114,0.06)] size-[24px]"} data-name="Status=Active">
        <div className="absolute inset-[28.57%_22.22%_32.14%_20.64%]" data-name="Vector">
          <div className="absolute inset-[-10.61%_-7.29%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.7143 11.4286">
              <path d={svgPaths.p2e04c780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </button>
    );
  }
  if (status === "Intermediate") {
    return (
      <button className={className || "bg-[#0d97fc] block cursor-pointer relative rounded-[5px] shadow-[0px_3px_3px_0px_rgba(107,107,114,0.06)] size-[24px]"} data-name="Status=Intermediate">
        <div className="absolute h-0 left-[5px] top-[13px] w-[14px]">
          <div className="absolute inset-[-2px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 2">
              <line id="Line 16" stroke="var(--stroke-0, white)" strokeWidth="2" x2="14" y1="1" y2="1" />
            </svg>
          </div>
        </div>
      </button>
    );
  }
  if (status === "Disabled") {
    return <div className={className || "bg-[#d5d5d7] rounded-[5px] size-[24px]"} data-name="Status=Disabled" />;
  }
  return (
    <button className={className || "bg-white block cursor-pointer relative rounded-[5px] size-[24px]"} data-name="Status=Normal">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </button>
  );
}

export default function ModuleContent() {
  return (
    <div className="bg-white border border-[#e6e6e8] border-solid relative rounded-[4.383px] size-full" data-name="Module content">
      <div className="absolute contents left-[14px] top-[120px]">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] left-[68px] text-[#6b6b72] text-[12px] top-[128.5px] whitespace-nowrap">
          <p className="leading-[normal]">Receipt details</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] left-[229px] text-[#6b6b72] text-[12px] top-[128.5px] whitespace-nowrap">
          <p className="leading-[normal]">Customer, project</p>
        </div>
        <div className="-translate-y-1/2 absolute flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] left-[861px] text-[#6b6b72] text-[12px] top-[128.5px] w-[90px]">
          <p className="leading-[normal]">Total amount</p>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[15px] top-[146px]">
          <div className="relative rounded-[5px] shrink-0 w-[959px]" data-name="Open row">
            <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
              <div className="bg-[#fafafa] h-[62px] relative rounded-tl-[5px] rounded-tr-[5px] shrink-0 w-full" data-name="header">
                <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-tl-[5px] rounded-tr-[5px]" />
                <div className="-translate-y-1/2 absolute flex items-center justify-center right-[9px] top-[calc(50%+0.5px)]">
                  <div className="flex-none rotate-180">
                    <div className="content-stretch flex items-center justify-center relative" data-name="Arrow">
                      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
                        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex items-center left-0 top-0 w-[912px]" data-name="Columns">
                  <div className="bg-[rgba(255,255,255,0)] h-[62px] shrink-0 w-[44px]" data-name="Table/Cell" />
                  <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[160px]" data-name="Table/Cell">
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 whitespace-nowrap">
                      <div className="col-1 flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[normal] ml-0 mt-[18px] relative row-1 text-[#42424a] text-[12px]">
                        <p className="mb-0">12 June 2023, 15:32</p>
                        <p>Nama Namason</p>
                      </div>
                      <div className="col-1 flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-0 relative row-1 text-[#22222c] text-[14px]">
                        <p className="leading-[normal]">SE1-3659</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[646px]" data-name="Table/Cell">
                    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 whitespace-nowrap">
                      <div className="col-1 flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[19px] relative row-1 text-[#42424a] text-[12px]">
                        <p className="leading-[normal]">Project: Brennerigata 43A, building B</p>
                      </div>
                      <div className="col-1 flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-0 relative row-1 text-[#22222c] text-[14px]">
                        <p className="leading-[normal]">Builder Snorre Rogne</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[87px]" data-name="Table/Cell">
                    <div className="content-stretch flex items-center justify-end overflow-clip relative shrink-0" data-name="Content">
                      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-right whitespace-nowrap">
                        <p className="leading-[normal]">483.30</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="body">
                <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full">
                  <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-name="Table/Row">
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] relative shrink-0 w-[100px]" data-name="Table/Cell">
                      <div className="content-stretch flex gap-[10px] items-center overflow-clip shrink-0" data-name="Content" />
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="Table/Cell">
                      <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
                        <div className="content-stretch flex flex-col items-start justify-end px-[10px] relative size-full">
                          <ContentText text="Item name" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip pl-[61px] pr-[10px] relative shrink-0 w-[201px]" data-name="Table/Cell">
                      <ContentText text="Quantity" />
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] relative shrink-0 w-[98px]" data-name="Table/Cell">
                      <ContentText text="Per unit" />
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] relative shrink-0 w-[65px]" data-name="Table/Cell">
                      <ContentText text="Discount" />
                    </div>
                    <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip pl-[30px] pr-[32px] relative shrink-0 w-[94px]" data-name="Table/Cell">
                      <ContentText text="Total" />
                    </div>
                  </div>
                  <div className="h-[67px] relative shrink-0 w-full" data-name="Table/Row">
                    <div className="content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
                      <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[49px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[44px]" data-name="Table/Cell">
                        <Checkbox className="bg-white block cursor-pointer relative rounded-[5px] shrink-0 size-[24px]" />
                      </div>
                      <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[49px] items-center justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[56px]" data-name="Table/Cell">
                        <div className="relative rounded-[5px] shrink-0 size-[36px]" data-name="image 38">
                          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[5px] size-full" src={imgImage38} />
                        </div>
                      </div>
                      <div className="bg-[rgba(255,255,255,0)] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table/Cell">
                        <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
                          <div className="content-stretch flex flex-col items-start justify-center px-[10px] py-[5px] relative w-full">
                            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Content">
                              <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] whitespace-nowrap">
                                <p className="leading-[19px]">Screw 5.0x40 CS A-250 Corrseal 23083603</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,255,255,0)] content-stretch flex gap-[10px] items-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[201px]" data-name="Table/Cell">
                        <div className="relative shrink-0" data-name="stepper">
                          <div className="flex flex-row items-center justify-center size-full">
                            <div className="content-stretch flex items-center justify-center relative">
                              <div className="bg-white content-stretch flex items-center justify-center px-[13.333px] py-[8px] relative rounded-bl-[5px] rounded-tl-[5px] shrink-0 size-[48px]" data-name="Iconbutton/small">
                                <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-bl-[5px] rounded-tl-[5px]" />
                                <div className="overflow-clip relative shrink-0 size-[13px]" data-name="Icon / Minus">
                                  <div className="absolute left-0 size-[13.333px] top-0" data-name="Icon Plate" />
                                  <div className="absolute inset-[43.75%_8.33%]" data-name="Group">
                                    <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.8333 1.625">
                                      <g id="Group">
                                        <path clipRule="evenodd" d={svgPaths.p10373480} fill="var(--fill-0, #42424A)" fillRule="evenodd" id="Vector (Stroke)" />
                                      </g>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white content-stretch flex flex-col gap-[8px] items-center justify-center px-[20px] py-[11px] relative shrink-0 size-[48px]" data-name="Textfield">
                                <div aria-hidden="true" className="absolute border-[#d5d5d7] border-b border-solid border-t inset-0 pointer-events-none" />
                                <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[14px] whitespace-nowrap">2</p>
                              </div>
                              <button className="bg-[#f5f5f6] content-stretch cursor-pointer flex h-[46px] items-center justify-center px-[13px] py-[6px] relative rounded-br-[5px] rounded-tr-[5px] shrink-0 w-[48px]" data-name="Iconbutton/small">
                                <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-[-1px] pointer-events-none rounded-br-[6px] rounded-tr-[6px]" />
                                <div className="overflow-clip relative shrink-0 size-[13px]" data-name="Icon / Plus">
                                  <div className="absolute left-0 size-[64px] top-0" data-name="Icon Plate" />
                                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13 13">
                                    <g id="Group">
                                      <path clipRule="evenodd" d={svgPaths.p2117c00} fill="var(--fill-0, #6B6B72)" fillRule="evenodd" id="Vector (Stroke)" />
                                      <path clipRule="evenodd" d={svgPaths.p20dca340} fill="var(--fill-0, #6B6B72)" fillRule="evenodd" id="Vector (Stroke)_2" />
                                    </g>
                                  </svg>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#090914] text-[14px] whitespace-nowrap">
                          <p className="leading-[1.38]">PCS</p>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-end justify-center px-[10px] py-[5px] relative shrink-0 w-[90px]" data-name="numpad">
                        <div className="content-stretch flex h-[40px] items-center overflow-clip relative shrink-0" data-name="Content">
                          <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0" data-name="Textfield">
                            <div className="content-stretch flex gap-[5px] items-center relative shrink-0">
                              <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#090914] text-[14px] whitespace-nowrap">
                                <p className="leading-[1.38]">179.00</p>
                              </div>
                            </div>
                            <Wrapper>
                              <line id="Line 2" opacity="0" stroke="var(--stroke-0, #6B6B72)" strokeWidth="2" x2="44" y1="-1" y2="-1" />
                            </Wrapper>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-end justify-center overflow-clip pl-[10px] pr-[4px] py-[5px] relative shrink-0 w-[68px]" data-name="Table/Cell">
                        <div className="content-stretch flex h-[40px] items-center overflow-clip relative shrink-0" data-name="Content">
                          <div className="content-stretch flex flex-col gap-[4px] items-center overflow-clip relative shrink-0" data-name="Textfield">
                            <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 whitespace-nowrap">
                              <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#090914] text-[14px]">
                                <p className="leading-[1.38]">10</p>
                              </div>
                              <div className="flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center relative shrink-0 text-[#42424a] text-[12px]">
                                <p className="leading-[1.38]">%</p>
                              </div>
                            </div>
                            <Wrapper>
                              <line id="Line 2" opacity="0" stroke="var(--stroke-0, #6B6B72)" strokeWidth="2" x2="29" y1="-1" y2="-1" />
                            </Wrapper>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,255,255,0)] content-stretch flex flex-col items-end justify-center overflow-clip pl-[30px] pr-[32px] py-[5px] relative shrink-0 w-[93px]" data-name="Table/Cell">
                        <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-name="Content">
                          <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[19px] relative shrink-0 text-[#22222c] text-[14px] text-right whitespace-nowrap">
                            <p className="mb-0">483.30</p>
                            <p>537.00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[#e6e6e8] border-b border-solid inset-0 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
          </div>
        </div>
      </div>
      <div className="absolute contents left-[14px] top-[14px]">
        <div className="absolute contents left-[15px] top-[15px]" data-name="Input and label">
          <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] left-[16px] text-[#22222c] text-[14px] top-[15px] w-[124px]">Bong number</p>
          <div className="absolute bg-white h-[48px] left-[15px] rounded-[5px] top-[41px] w-[320px]" data-name="Textfield/Normal">
            <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[10px] items-center px-[14px] py-[8px] relative size-full">
                <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px relative text-[#42424a] text-[14px]">110-3</p>
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
        </div>
      </div>
    </div>
  );
}
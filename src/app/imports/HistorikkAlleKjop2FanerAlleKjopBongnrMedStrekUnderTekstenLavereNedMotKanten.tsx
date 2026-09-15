import svgPaths from "./svg-iv7y0qxqgi";

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
      <div className="content-stretch flex h-full items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative">{children}</div>
    </div>
  );
}
type ButtonsButtonTextProps = {
  text: string;
};

function ButtonsButtonText({ text }: ButtonsButtonTextProps) {
  return (
    <div className="bg-[#efeff0] h-[48px] min-w-[100px] relative rounded-[5px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#f5f5f6] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Wrapper>
        <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#42424a] text-[13px] whitespace-nowrap">{text}</p>
      </Wrapper>
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

export default function HistorikkAlleKjop2FanerAlleKjopBongnrMedStrekUnderTekstenLavereNedMotKanten() {
  return (
    <div className="bg-[#fafafa] overflow-clip relative rounded-[3px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] size-full" data-name="Historikk: alle kjøp, 2 faner (alle kjøp, bongnr) med strek under, teksten lavere ned mot kanten">
      <div className="absolute content-stretch flex flex-col items-center left-0 top-0 w-[1024px]" data-name="Header">
        <div className="bg-white relative shrink-0 w-full" data-name="Module header">
          <div aria-hidden="true" className="absolute border-[#e6e6e8] border-b-[1.461px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-center px-[20px] py-[22px] relative w-full">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                <div className="col-1 ml-0 mt-0 relative row-1 size-[24px]" data-name="Shipping Logistic Estimate Time Arrival 1">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <g id="Shipping Logistic Estimate Time Arrival 1">
                      <path d={svgPaths.p3613d600} id="Vector" stroke="var(--stroke-0, #22222C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M6.25 14L3.75 11L1.25 14" id="Vector_2" stroke="var(--stroke-0, #22222C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M13.25 7.5V12.5H16.75" id="Vector_3" stroke="var(--stroke-0, #22222C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
                <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.3] ml-[35px] mt-[3.09px] relative row-1 text-[#22222c] text-[15px] whitespace-nowrap">Find previous sales</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white h-[45px] relative shadow-[0px_3px_3px_0px_rgba(107,107,114,0.06)] shrink-0 w-full" data-name="Page header">
          <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[30px] items-center pb-[5px] pt-[10px] px-[20px] relative size-full">
              <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[14px] whitespace-nowrap">All sales</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex items-center justify-center left-0 top-[630px] w-[1024px]">
        <div className="flex-none rotate-180">
          <div className="bg-white relative w-[1024px]" data-name="Footer">
            <div className="content-stretch flex isolate items-start justify-end overflow-clip px-[20px] py-[15px] relative rounded-[inherit] w-full">
              <div className="flex items-center justify-center relative shrink-0 z-[1]">
                <div className="flex-none rotate-180">
                  <div className="content-stretch flex gap-[20px] items-center relative" data-name="Buttons">
                    <div className="bg-[#efeff0] h-[48px] min-w-[100px] relative rounded-[5px] shrink-0" data-name="Button">
                      <Wrapper>
                        <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#42424a] text-[15px] whitespace-nowrap">Add as return</p>
                      </Wrapper>
                    </div>
                    <ButtonsButtonText text="Add as normal sale" />
                    <ButtonsButtonText text="Print return slip" />
                    <button className="bg-white cursor-pointer h-[48px] min-w-[100px] relative rounded-[5px] shrink-0" data-name="Button">
                      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                      <Wrapper>
                        <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-left whitespace-nowrap">Cancel</p>
                      </Wrapper>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#e6e6e8] border-b border-solid inset-0 pointer-events-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)]" />
          </div>
        </div>
      </div>
      <div className="absolute h-[864px] left-0 top-[113px] w-[1024px]" data-name="Body">
        <div className="absolute content-stretch flex flex-col h-[48px] items-start justify-center left-[33px] p-[8px] top-[122px]">
          <div className="relative shrink-0" data-name="Checkbox with label">
            <div className="flex flex-row items-center size-full">
              <div className="content-stretch flex gap-[8px] items-center relative">
                <Checkbox className="bg-white block cursor-pointer relative rounded-[5px] shrink-0 size-[24px]" />
                <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#090914] text-[12px] whitespace-nowrap">Kunde uten konto</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-white border border-[#e6e6e8] border-solid h-[580px] left-[15px] rounded-[5px] top-[15px] w-[994px]" data-name="Content">
          <div className="absolute contents left-[14px] top-[14px]">
            <div className="absolute contents left-[15px] top-[15px]" data-name="Input and label">
              <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] left-[16px] text-[#22222c] text-[14px] top-[15px] w-[124px]">Bong number</p>
              <div className="absolute bg-white h-[48px] left-[15px] rounded-[5px] top-[41px] w-[320px]" data-name="Textfield/Normal">
                <div aria-hidden="true" className="absolute border-2 border-[#0d97fc] border-solid inset-0 pointer-events-none rounded-[5px]" />
                <div className="flex flex-row items-center size-full">
                  <div className="content-stretch flex gap-[6px] items-center px-[14px] py-[8px] relative size-full">
                    <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px opacity-60 relative text-[#6b6b72] text-[14px]">Bong number scan or search</p>
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
                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_2px_2px_3px_0px_rgba(0,0,0,0.1)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import clsx from "clsx";
import svgPaths from "./svg-x4vikvvhe3";

function ButtonsHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
      <div className="content-stretch flex h-full items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative">{children}</div>
    </div>
  );
}

function Wrapper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center size-full">
      <div className="content-stretch flex gap-[10px] items-center px-[14px] py-[8px] relative size-full">{children}</div>
    </div>
  );
}
type InputAndLabelTextProps = {
  text: string;
};

function InputAndLabelText({ text }: InputAndLabelTextProps) {
  return (
    <div className="flex-[1_0_0] grid-cols-[max-content] grid-rows-[max-content] inline-grid min-h-px min-w-px place-items-start relative">
      <div className="bg-white col-1 h-[48px] ml-0 mt-[26px] relative rounded-[4px] row-1 w-[444.463px]" data-name="Select">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[4px]" />
        <div className="flex flex-row items-center justify-end size-full">
          <div className="content-stretch flex gap-[10px] items-center justify-end px-[15px] py-[5px] size-full" />
        </div>
      </div>
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#22222c] text-[14px] w-[444.543px] whitespace-pre-wrap">{text}</p>
    </div>
  );
}
type InputAndLabelProps = {
  text: string;
  text1: string;
};

function InputAndLabel({ text, text1 }: InputAndLabelProps) {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full">
      <div className="bg-white col-1 h-[48px] ml-0 mt-[25.5px] relative rounded-[5px] row-1 w-[911px]" data-name="Textfield/Normal">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Wrapper>
          <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px relative text-[#6b6b72] text-[14px] whitespace-pre-wrap">{text}</p>
        </Wrapper>
      </div>
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#22222c] text-[14px] w-[911px] whitespace-pre-wrap">{text1}</p>
    </div>
  );
}
type TextfieldNormalTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextfieldNormalText({ text, additionalClassNames = "" }: TextfieldNormalTextProps) {
  return (
    <div className={clsx("bg-white col-1 h-[48px] relative rounded-[5px] row-1", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Wrapper>
        <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px relative text-[#42424a] text-[14px] whitespace-pre-wrap">{text}</p>
      </Wrapper>
    </div>
  );
}

export default function KundeProsjekt() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col isolate items-start overflow-clip relative rounded-[3px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] size-full" data-name="Kunde/prosjekt">
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-full z-[3]" data-name="Header">
        <div className="bg-white relative shrink-0 w-full" data-name="Module header">
          <div aria-hidden="true" className="absolute border-[#e6e6e8] border-b-[1.461px] border-solid inset-0 pointer-events-none" />
          <div className="content-stretch flex flex-col items-start px-[21px] py-[22px] relative w-full">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
              <div className="col-1 ml-0 mt-0 overflow-clip relative row-1 size-[24px]" data-name="Icon / Client">
                <div className="absolute left-0 size-[70.124px] top-0" data-name="Icon Plate" />
                <div className="absolute inset-[0_0_0.01%_0]" data-name="Group">
                  <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 23.997">
                    <g id="Group">
                      <path clipRule="evenodd" d={svgPaths.p156ab980} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)" />
                      <path clipRule="evenodd" d={svgPaths.p5f2db00} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_2" />
                      <path clipRule="evenodd" d={svgPaths.p21dbe100} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_3" />
                      <path clipRule="evenodd" d={svgPaths.p32762400} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_4" />
                      <path clipRule="evenodd" d={svgPaths.p21baca80} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_5" />
                      <path clipRule="evenodd" d={svgPaths.p10db3d00} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_6" />
                      <path clipRule="evenodd" d={svgPaths.p1df16280} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_7" />
                      <path clipRule="evenodd" d={svgPaths.p2228a3f0} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_8" />
                      <path clipRule="evenodd" d={svgPaths.p5823df0} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_9" />
                      <path clipRule="evenodd" d={svgPaths.p25fcb880} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_10" />
                    </g>
                  </svg>
                </div>
              </div>
              <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.3] ml-[35.09px] mt-[3.29px] relative row-1 text-[#22222c] text-[15px]">Create new contact person assigned to the customer</p>
            </div>
          </div>
        </div>
        <div className="bg-white h-[58px] relative shadow-[0px_3px_3px_0px_rgba(107,107,114,0.06)] shrink-0 w-full" data-name="Tabs header with underline">
          <div className="flex flex-row items-end overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex gap-[30px] items-end pt-[10px] px-[20px] relative size-full">
              <div className="content-stretch flex flex-col gap-[6px] h-[48px] items-center justify-end relative shrink-0">
                <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[14px]">New contact person</p>
                <div className="h-0 relative shrink-0 w-full">
                  <div className="absolute inset-[-3px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 63 3">
                      <line id="Line 57" stroke="var(--stroke-0, black)" strokeWidth="3" x2="63" y1="1.5" y2="1.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full z-[2]" data-name="Body">
        <div className="flex-[1_0_0] min-h-px min-w-px relative">
          <div className="content-stretch flex flex-col items-start p-[20px] relative w-full">
            <div className="bg-white h-[455px] relative rounded-[4.383px] shrink-0 w-full" data-name="Module content">
              <div aria-hidden="true" className="absolute border border-[#e6e6e8] border-solid inset-0 pointer-events-none rounded-[4.383px]" />
              <div className="content-stretch flex flex-col gap-[10px] items-start leading-[0] p-[20px] relative size-full">
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0 w-full" data-name="Input and label">
                  <TextfieldNormalText text="Enter name of contact person" additionalClassNames="ml-0 mt-[25.5px] w-[911px]" />
                  <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#22222c] text-[14px] w-[911px] whitespace-pre-wrap">Name</p>
                </div>
                <InputAndLabel text="Enter address" text1="Address" />
                <InputAndLabel text="Enter address 2" text1="Address 2" />
                <div className="content-stretch flex gap-[21.914px] items-start relative shrink-0 w-full">
                  <InputAndLabelText text="Postal code" />
                  <div className="flex-[1_0_0] grid-cols-[max-content] grid-rows-[max-content] inline-grid min-h-px min-w-px place-items-start relative" data-name="Input and label">
                    <TextfieldNormalText text="&nbsp;" additionalClassNames="ml-[0.08px] mt-[26px] w-[444.463px]" />
                    <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#22222c] text-[14px] w-[444.543px] whitespace-pre-wrap">City</p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[21.914px] items-end relative shrink-0 w-full">
                  <InputAndLabelText text="E-mail" />
                  <div className="flex-[1_0_0] grid-cols-[max-content] grid-rows-[max-content] inline-grid min-h-px min-w-px place-items-start relative" data-name="Input and label">
                    <div className="bg-white col-1 content-stretch flex gap-[10px] h-[48px] items-center justify-end ml-0 mt-[26.5px] px-[15px] py-[5px] relative rounded-[4px] row-1 w-[444.543px]" data-name="Select">
                      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[4px]" />
                    </div>
                    <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-[3.76px] mt-0 relative row-1 text-[#22222c] text-[14px] w-[270.192px] whitespace-pre-wrap">Phone number</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center relative shrink-0 w-full z-[1]">
        <div className="flex-none rotate-180 w-full">
          <div className="bg-white relative w-full" data-name="Footer">
            <div className="flex flex-row justify-end overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex isolate items-start justify-end px-[20px] py-[15px] relative w-full">
                <div className="flex items-center justify-center relative shrink-0 z-[1]">
                  <div className="flex-none rotate-180">
                    <div className="content-stretch flex gap-[20px] items-center relative" data-name="Buttons">
                      <div className="bg-[#efeff0] h-[48px] min-w-[100px] relative rounded-[5px] shrink-0" data-name="Button">
                        <ButtonsHelper>
                          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#42424a] text-[15px]">Save and create</p>
                        </ButtonsHelper>
                      </div>
                      <button className="bg-white cursor-pointer h-[48px] min-w-[100px] relative rounded-[5px] shrink-0" data-name="Button">
                        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                        <ButtonsHelper>
                          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-left">Cancel</p>
                        </ButtonsHelper>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="absolute border-[#e6e6e8] border-b border-solid inset-0 pointer-events-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
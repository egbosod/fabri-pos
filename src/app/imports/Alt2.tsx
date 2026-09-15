import svgPaths from "./svg-cdeaem494j";
import clsx from "clsx";
import imgBlinkingCaret1 from "figma:asset/dc3aad517ab9f61fffb0eba3fbe67e248d89a489.png";
import { imgGroup } from "./svg-95rba";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={clsx("relative size-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </div>
  );
}
type TextProps = {
  text: string;
  additionalClassNames?: string;
};

function Text({ text, additionalClassNames = "" }: TextProps) {
  return (
    <div className={clsx("absolute bg-white content-stretch flex h-[48px] items-center justify-center left-[439px] min-w-[100px] px-[20px] py-[6px] rounded-[5px] w-[160px]", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}
type ButtonTextProps = {
  text: string;
};

function ButtonText({ text }: ButtonTextProps) {
  return (
    <div className="bg-white content-stretch flex h-[48px] items-center justify-center min-w-[100px] px-[30px] py-[6px] relative rounded-[5px] shrink-0 w-[120px]">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}

export default function Alt() {
  return (
    <div className="bg-[#e4e4e7] content-stretch flex flex-col isolate items-start relative size-full" data-name="Alt 2">
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[2]" data-name="Header">
        <div className="bg-[#42424a] relative shrink-0 w-full" data-name="Header">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between px-[10px] py-[6px] relative w-full">
              <div className="content-stretch flex gap-[40px] items-center relative shrink-0">
                <div className="h-[18.54px] overflow-clip relative shrink-0 w-[99px]" data-name="EG-Fabri-logo-white 1">
                  <div className="absolute inset-[8.41%_1.88%_8.94%_1.41%]" data-name="Group">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95.7499 15.3233">
                      <g id="Group">
                        <path d={svgPaths.p276e6380} fill="var(--fill-0, #44706A)" id="Vector" />
                        <path d={svgPaths.p393724f0} fill="var(--fill-0, #44706A)" id="Vector_2" />
                        <path d={svgPaths.p22e71880} fill="var(--fill-0, white)" id="Vector_3" />
                        <path d={svgPaths.p2b004e00} fill="var(--fill-0, white)" id="Vector_4" />
                        <g id="Group_2">
                          <path d={svgPaths.p57a4000} fill="var(--fill-0, white)" id="Vector_5" />
                          <path d={svgPaths.p2f43ff80} fill="var(--fill-0, white)" id="Vector_6" />
                          <path d={svgPaths.p37c0f980} fill="var(--fill-0, white)" id="Vector_7" />
                          <path d={svgPaths.p2a743800} fill="var(--fill-0, white)" id="Vector_8" />
                          <path d={svgPaths.p20a5df00} fill="var(--fill-0, white)" id="Vector_9" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="content-stretch flex items-start relative shrink-0">
                  <div className="content-stretch flex gap-[6.477px] items-center relative shrink-0">
                    <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[14.805px] text-nowrap text-white">MENY</p>
                    <div className="h-[11.667px] relative shrink-0 w-[12.301px]" data-name="Chevron Down 2">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.3005 11.6667">
                        <g clipPath="url(#clip0_243_1808)" id="Chevron Down 2">
                          <path d={svgPaths.p507f400} fill="var(--fill-0, white)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_243_1808">
                            <rect fill="white" height="11.6667" width="12.3005" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex font-['Montserrat:Regular',sans-serif] font-normal gap-[30px] items-start leading-[1.75] relative shrink-0 text-[15px] text-center text-nowrap text-white">
                  <p className="relative shrink-0">Nytt salg</p>
                  <p className="relative shrink-0">Tidligere kjøp</p>
                  <p className="relative shrink-0">Kasseoppgjør</p>
                </div>
              </div>
              <div className="content-stretch flex items-center relative shrink-0">
                <div className="h-[48px] relative shrink-0 w-[163px]" data-name="User menu button">
                  <div className="absolute bg-[#22222c] content-stretch flex inset-0 items-center px-[10px] py-[6px] rounded-[5px]" data-name="Iconbutton" />
                  <div className="absolute flex items-center justify-center right-[12px] size-[12px] top-[calc(50%+0.77px)] translate-y-[-50%]">
                    <div className="flex-none rotate-[180deg]">
                      <Wrapper>
                        <g clipPath="url(#clip0_243_1811)" id="Icon / Up" opacity="0.9">
                          <g id="Icon Plate"></g>
                          <path d={svgPaths.pb1aff00} fill="var(--fill-0, white)" id="Vector" />
                        </g>
                        <defs>
                          <clipPath id="clip0_243_1811">
                            <rect fill="white" height="12" width="12" />
                          </clipPath>
                        </defs>
                      </Wrapper>
                    </div>
                  </div>
                  <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal h-[14.767px] leading-[1.75] left-[37px] text-[12px] text-white top-[calc(50%-10px)] w-[97.5px]">Ola Nordmann</p>
                  <div className="absolute h-[16.689px] left-[13.01px] top-[calc(50%-0.1px)] translate-y-[-50%] w-[13.563px]" data-name="user icon">
                    <div className="absolute inset-[-4.49%_-5.53%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0631 18.1892">
                        <g id="user icon">
                          <ellipse cx="7.50237" cy="4.64541" id="Ellipse 2" rx="3.66853" ry="3.89541" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
                          <path d={svgPaths.pbb1cae0} id="Ellipse 3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
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
      <div className="h-[708px] relative shrink-0 w-full z-[1]" data-name="Body">
        <div className="absolute bg-white h-[646px] left-0 top-[63px] w-[787px]">
          <div className="absolute content-stretch flex gap-[8px] h-[48px] items-center left-[20px] top-[143px]" data-name="Checkbox with label">
            <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
              <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
            </div>
            <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#090914] text-[12px] text-nowrap">Ekstra uttak av kontanter</p>
          </div>
          <div className="absolute content-stretch flex gap-[12px] items-end left-[20px] top-[20px]" data-name="Customer without Santander account">
            <div className="bg-[#0d97fc] content-stretch flex flex-col h-[110px] items-center justify-center pb-[10px] pt-[20px] px-[20px] relative rounded-[5px] shrink-0 w-[120px]" data-name="Button card">
              <div aria-hidden="true" className="absolute border-[#0d97fc] border-[1.74px] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="content-stretch flex flex-col items-center pb-[7px] pt-0 px-0 relative shrink-0">
                <div className="mb-[-7px] relative shrink-0 size-[48px]" data-name="Checkbox">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
                    <g id="Checkbox">
                      <rect fill="var(--fill-0, #0D97FC)" height="48" rx="10" width="48" />
                      <path d={svgPaths.pba52600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
                    </g>
                  </svg>
                </div>
                <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[1.75] relative shrink-0 text-[16px] text-nowrap text-white">Kort</p>
              </div>
            </div>
            <div className="bg-white content-stretch flex flex-col h-[110px] items-center justify-center pb-[10px] pt-[20px] px-[20px] relative rounded-[5px] shrink-0 w-[120px]" data-name="Button cash">
              <div aria-hidden="true" className="absolute border-[#d5d5d7] border-[1.74px] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="h-[42px] overflow-clip relative shrink-0 w-[44px]" data-name="Currency Dollar Circle">
                <div className="absolute inset-[13.1%_11.79%_8.78%_13.64%]" data-name="Group">
                  <div className="absolute inset-[-3.33%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
                      <g id="Group">
                        <path d={svgPaths.p1247000} id="Vector" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1875" />
                        <g id="Group_2">
                          <path d={svgPaths.p2c2cd380} id="Vector_2" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1875" />
                          <path d="M17.5 10.9377V7.65649" id="Vector_3" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1875" />
                          <path d="M17.5 27.3441V24.0629" id="Vector_4" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.1875" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[1.75] relative shrink-0 text-[#090914] text-[16px] text-nowrap">Kontant</p>
            </div>
            <div className="bg-white content-stretch flex flex-col h-[110px] items-center justify-center pb-[10px] pt-[20px] px-[25px] relative rounded-[5px] shrink-0 w-[120px]" data-name="Button payment small/Variant2">
              <div aria-hidden="true" className="absolute border-[#d5d5d7] border-[1.471px] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="h-[41px] overflow-clip relative shrink-0 w-[62px]" data-name="mark 1">
                <div className="absolute contents inset-[15.85%_16.13%_13.41%_14.52%]" data-name="Clip path group">
                  <div className="absolute inset-[15.85%_16.13%_13.41%_14.52%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[43px_29px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 43 29">
                      <g id="Group">
                        <path d={svgPaths.p393ba500} fill="var(--fill-0, #FF5B24)" id="Vector" />
                        <path clipRule="evenodd" d={svgPaths.p1ec77580} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector_2" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[1.75] relative shrink-0 text-[#090914] text-[16px] text-nowrap">Vipps</p>
            </div>
            <div className="bg-white content-stretch flex flex-col h-[110px] items-center justify-center pb-[10px] pt-[20px] px-[25px] relative rounded-[5px] shrink-0 w-[120px]" data-name="Button payment small/Variant2">
              <div aria-hidden="true" className="absolute border-[#d5d5d7] border-[1.471px] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <div className="h-[42px] overflow-clip relative shrink-0 w-[83px]" data-name="klarna_badge 1">
                <div className="absolute contents inset-[16.67%_16.93%_18.52%_17.47%]" data-name="Pink-menu-+-footer">
                  <div className="absolute contents inset-[16.67%_16.93%_18.52%_17.47%]" data-name="new-footer">
                    <div className="absolute inset-[16.67%_16.93%_18.52%_17.47%]" data-name="Mark">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.4444 27.2222">
                        <g id="Mark">
                          <path clipRule="evenodd" d={svgPaths.p2f78ac80} fill="var(--fill-0, #FFB3C7)" fillRule="evenodd" id="BG" />
                          <path clipRule="evenodd" d={svgPaths.p33847600} fill="var(--fill-0, black)" fillRule="evenodd" id="Letter" />
                          <path clipRule="evenodd" d={svgPaths.p92679b0} fill="var(--fill-0, black)" fillRule="evenodd" id="Letter_2" />
                          <path clipRule="evenodd" d={svgPaths.p30c51600} fill="var(--fill-0, black)" fillRule="evenodd" id="Letter_3" />
                          <path clipRule="evenodd" d={svgPaths.p1bd0cf80} fill="var(--fill-0, black)" fillRule="evenodd" id="Letter_4" />
                          <path clipRule="evenodd" d={svgPaths.p14efbb00} fill="var(--fill-0, black)" fillRule="evenodd" id="Letter_5" />
                          <path clipRule="evenodd" d={svgPaths.p2871300} fill="var(--fill-0, black)" fillRule="evenodd" id="Letter_6" />
                          <path clipRule="evenodd" d={svgPaths.p2b3ae680} fill="var(--fill-0, black)" fillRule="evenodd" id="Letter_7" />
                          <path clipRule="evenodd" d={svgPaths.p2ab01880} fill="var(--fill-0, black)" fillRule="evenodd" id="Letter_8" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[1.75] relative shrink-0 text-[#090914] text-[16px] text-nowrap">Klarna</p>
            </div>
            <div className="bg-white content-stretch flex gap-[10px] h-[48px] items-center px-[15px] py-[5px] relative rounded-[4px] shrink-0" data-name="Select">
              <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="flex flex-col font-['Montserrat:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
                <p className="leading-[1.75]">Vis flere</p>
              </div>
              <div className="h-[6.175px] relative shrink-0 w-[10px]" data-name="Vector">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6.175">
                  <path d={svgPaths.p312e7240} fill="var(--fill-0, black)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#fafafa] border border-[#d5d5d7] border-solid h-[383px] left-[20px] rounded-[5px] top-[209px] w-[620px]" data-name="Numpad payment">
            <div className="absolute bg-[#0d97fc] content-stretch flex h-[48px] items-center justify-center left-[438px] min-w-[100px] px-[20px] py-[6px] rounded-[5px] top-[50px] w-[160px]" data-name="Button">
              <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[15px] text-nowrap text-white">Start betaling</p>
            </div>
            <div className="absolute contents left-[438px] top-[130px]">
              <Text text="+ 100 ,-" additionalClassNames="top-[131px]" />
              <Text text="+ 500 ,-" additionalClassNames="top-[255px]" />
              <Text text="+ 1 000 ,-" additionalClassNames="top-[317px]" />
              <Text text="+ 200 ,-" additionalClassNames="top-[193px]" />
            </div>
            <div className="absolute contents left-[19px] top-[19px]">
              <p className="absolute font-['Montserrat:Bold',sans-serif] font-bold h-[29px] leading-[1.75] left-[20px] text-[#090914] text-[14px] top-[20px] tracking-[0.5px] w-[388px]">Beløp på kort</p>
              <div className="absolute content-stretch flex flex-col gap-[14px] items-start left-[20px] top-[129px]">
                <div className="content-stretch flex gap-[14px] items-start relative shrink-0">
                  <ButtonText text="1" />
                  <ButtonText text="2" />
                  <ButtonText text="3" />
                </div>
                <div className="content-stretch flex gap-[14px] items-start relative shrink-0">
                  <ButtonText text="4" />
                  <ButtonText text="5" />
                  <ButtonText text="6" />
                </div>
                <div className="content-stretch flex gap-[14px] items-start relative shrink-0">
                  <ButtonText text="7" />
                  <ButtonText text="8" />
                  <ButtonText text="9" />
                </div>
                <div className="content-stretch flex gap-[14px] items-start relative shrink-0">
                  <ButtonText text="C" />
                  <ButtonText text="0" />
                  <div className="bg-white content-stretch flex h-[48px] items-center justify-center px-[30px] py-[6px] relative rounded-[5px] shrink-0 w-[120px]" data-name="Button">
                    <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                    <div className="h-[14.4px] relative shrink-0 w-[18px]">
                      <div className="absolute inset-[-3.79%_-3.03%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.0909 15.4911">
                          <g id="Group 163">
                            <path d={svgPaths.p36765300} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
                            <path d={svgPaths.p3374740} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
                            <path d={svgPaths.p17633100} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.09085" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bg-white content-stretch flex gap-[10px] h-[48px] items-center left-[20px] px-[14px] py-[8px] rounded-[5px] top-[49px] w-[388px]" data-name="Textfield/Normal">
                <div aria-hidden="true" className="absolute border-2 border-[#0d97fc] border-solid inset-0 pointer-events-none rounded-[5px]" />
                <div className="basis-0 content-stretch flex grow items-center min-h-px min-w-px relative shrink-0">
                  <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#42424a] text-[14px] text-nowrap">1289</p>
                  <div className="h-[15px] relative shrink-0 w-px" data-name="blinking-caret 1">
                    <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBlinkingCaret1} />
                  </div>
                </div>
                <div className="relative shrink-0 size-[14px]" data-name="Icon / KR">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                    <g clipPath="url(#clip0_243_1783)" id="Icon / KR" opacity="0.5">
                      <g id="Icon Plate"></g>
                      <g id="KR">
                        <path d={svgPaths.p1279c700} fill="var(--fill-0, #090914)" />
                        <path d={svgPaths.p2d62f180} fill="var(--fill-0, #090914)" />
                      </g>
                    </g>
                    <defs>
                      <clipPath id="clip0_243_1783">
                        <rect fill="white" height="14" width="14" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="absolute inset-0 pointer-events-none shadow-[inset_2px_2px_3px_0px_rgba(0,0,0,0.1)]" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-[63px] left-0 top-0 w-[1024px]" data-name="Header">
          <div className="absolute bg-white border-[#e6e6e8] border-[0px_0px_1.461px] border-solid h-[63px] left-0 top-0 w-[1024px]" data-name="Module header">
            <div className="absolute contents left-[63px] top-[22px]">
              <p className="absolute font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.2] left-[63px] text-[#22222c] text-[17px] text-nowrap top-[22px]">Betaling kort</p>
            </div>
            <div className="absolute content-stretch flex items-center justify-center left-[9px] p-[8px] size-[48px] top-[8px]" data-name="Close 48 px toch area">
              <div className="relative shrink-0 size-[27px]" data-name="Close">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
                  <circle cx="13.5" cy="13.5" fill="var(--fill-0, #090914)" id="Ellipse 1" opacity="0.08" r="13.5" />
                </svg>
                <div className="absolute inset-[31.48%_30.37%_28.52%_29.63%] overflow-clip" data-name="Icon / Close">
                  <div className="absolute left-0 size-[10.8px] top-0" data-name="Icon Plate" />
                  <div className="absolute inset-[6.05%_6.05%_6.06%_6.05%]" data-name="Group">
                    <div className="absolute inset-[-3.56%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1672 10.1672">
                        <g id="Group">
                          <path d={svgPaths.p68b6a80} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.675" />
                          <path d={svgPaths.p1c344f00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.675" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bg-[#fafafa] content-stretch flex flex-col h-[646px] items-start left-[698px] p-[20px] top-[63px]" data-name="Sidebar">
          <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="bg-white content-stretch flex flex-col items-start justify-center overflow-clip pb-0 pt-[15px] px-[15px] relative rounded-[5px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] shrink-0" data-name="Payment section">
            <div className="content-stretch flex items-start justify-between relative shrink-0 w-[256px]">
              <div className="content-stretch flex flex-col items-start relative shrink-0">
                <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.4] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">Totalt å betale:</p>
                <div className="content-stretch flex font-['Montserrat:Bold',sans-serif] font-bold items-baseline leading-[1.4] relative shrink-0 text-[#090914] text-nowrap">
                  <p className="relative shrink-0 text-[30px]">1 289</p>
                  <p className="relative shrink-0 text-[24px]">,-</p>
                </div>
              </div>
              <div className="content-stretch flex flex-col items-end relative shrink-0">
                <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.4] relative shrink-0 text-[#6b6b72] text-[14px] text-nowrap">Gjenstående:</p>
                <div className="content-stretch flex font-['Montserrat:Medium',sans-serif] font-medium items-baseline justify-end leading-[1.4] relative shrink-0 text-[#6b6b72] text-nowrap text-right">
                  <p className="relative shrink-0 text-[30px]">0</p>
                  <p className="relative shrink-0 text-[24px]">,-</p>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-col items-start relative shrink-0">
              <div className="content-stretch flex flex-col gap-[20px] items-start justify-center relative shrink-0">
                <div className="content-stretch flex flex-col font-['Montserrat:Regular',sans-serif] font-normal gap-[3px] items-start leading-[1.4] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                  <p className="relative shrink-0">(1 288,80)</p>
                  <p className="relative shrink-0">{`Inkl. mva: 322,20 `}</p>
                </div>
                <div className="content-stretch flex items-center justify-between relative shrink-0 w-[256px]">
                  <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#090914] text-[14px] text-nowrap">Kort:</p>
                  <div className="content-stretch flex font-['Montserrat:Regular',sans-serif] font-normal gap-[3px] items-center leading-[1.4] relative shrink-0 text-[#090914] text-[14px] text-nowrap w-[38px]">
                    <p className="relative shrink-0">1 289</p>
                    <p className="relative shrink-0">,-</p>
                  </div>
                  <div className="content-stretch flex gap-[6px] h-[48px] items-center justify-center px-[10px] py-0 relative shrink-0">
                    <Wrapper additionalClassNames="shrink-0">
                      <g clipPath="url(#clip0_243_1819)" id="Undo">
                        <path d={svgPaths.p221a1900} id="Vector" stroke="var(--stroke-0, #0D97FC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                        <path d={svgPaths.p7b263c0} id="Vector_2" stroke="var(--stroke-0, #0D97FC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                      </g>
                      <defs>
                        <clipPath id="clip0_243_1819">
                          <rect fill="white" height="12" width="12" />
                        </clipPath>
                      </defs>
                    </Wrapper>
                    <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#0d97fc] text-[12px] text-nowrap">Angre</p>
                  </div>
                </div>
                <div className="absolute h-0 left-1/2 top-[57px] translate-x-[-50%] w-[256px]">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 256 1">
                      <line id="Line 55" stroke="var(--stroke-0, #E6E6E8)" x2="256" y1="0.5" y2="0.5" />
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
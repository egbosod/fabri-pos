import svgPaths from "./svg-k33k9dvofh";
type TextProps = {
  text: string;
};

function Text({ text }: TextProps) {
  return (
    <div className="absolute content-stretch flex gap-[6px] h-[48px] items-center justify-center left-[180px] px-[10px] py-0 top-0">
      <div className="relative shrink-0 size-[12px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
          <g clipPath="url(#clip0_255_747)" id="Undo">
            <path d={svgPaths.p2b06b580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
            <path d={svgPaths.p139d1560} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
          </g>
          <defs>
            <clipPath id="clip0_255_747">
              <rect fill="white" height="12" width="12" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[12px] text-nowrap text-white">{text}</p>
    </div>
  );
}

export default function PaymentSection() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center overflow-clip p-[15px] relative rounded-[5px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] size-full" data-name="Payment section">
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
            <p className="relative shrink-0 text-[30px]">1 289</p>
            <p className="relative shrink-0 text-[24px]">,-</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex flex-col gap-[20px] items-start justify-center pb-[20px] pt-0 px-0 relative shrink-0">
        <div className="content-stretch flex flex-col font-['Montserrat:Regular',sans-serif] font-normal gap-[3px] items-start leading-[1.4] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
          <p className="relative shrink-0">(1 288,80)</p>
          <p className="relative shrink-0">{`Inkl. mva: 322,20 `}</p>
        </div>
        <div className="content-stretch flex flex-col items-start relative shrink-0">
          <div className="h-[48px] relative shrink-0 w-[256px]">
            <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] left-0 text-[#090914] text-[14px] text-nowrap top-[14px]">Kontant:</p>
            <Text text="Angre" />
          </div>
          <div className="h-[48px] relative shrink-0 w-[256px]">
            <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] left-0 text-[#090914] text-[14px] text-nowrap top-[14px]">Kort</p>
            <div className="absolute content-stretch flex flex-col font-['Montserrat:Regular',sans-serif] font-normal gap-[28px] items-start leading-[1.4] left-[106px] text-[#090914] text-[14px] text-nowrap top-[-34px]">
              <p className="relative shrink-0">500 ,-</p>
              <p className="relative shrink-0">789 ,-</p>
            </div>
            <Text text="Angre" />
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
      <div className="content-stretch flex gap-[51px] items-center justify-center relative shrink-0">
        <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
          <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[27px]" data-name="Spinner">
            <div className="absolute inset-[1.25%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 26.325 26.325">
                <g id="Group 10">
                  <path clipRule="evenodd" d={svgPaths.p385dff0} fill="var(--fill-0, #CCE6FB)" fillRule="evenodd" id="Vector (Stroke)" />
                  <path clipRule="evenodd" d={svgPaths.p2a286c80} fill="var(--fill-0, #0094F9)" fillRule="evenodd" id="bar" />
                </g>
              </svg>
            </div>
          </div>
          <p className="[grid-area:1_/_1] font-['Montserrat:SemiBold_Italic',sans-serif] font-semibold italic leading-[1.75] ml-[37px] mt-[3.5px] relative text-[12px] text-black text-nowrap">Betaling pågår</p>
        </div>
        <div className="bg-white content-stretch flex h-[40px] items-center px-[13px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
          <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-nowrap">Avbryt</p>
        </div>
      </div>
    </div>
  );
}
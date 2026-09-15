import svgPaths from "./svg-8zujwixoj4";

export default function PaymentSection() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center overflow-clip pb-0 pt-[15px] px-[15px] relative rounded-[5px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] size-full" data-name="Payment section">
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
              <div className="relative shrink-0 size-[12px]" data-name="Undo">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                  <g clipPath="url(#clip0_247_549)" id="Undo">
                    <path d={svgPaths.p221a1900} id="Vector" stroke="var(--stroke-0, #0D97FC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                    <path d={svgPaths.p7b263c0} id="Vector_2" stroke="var(--stroke-0, #0D97FC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.75" />
                  </g>
                  <defs>
                    <clipPath id="clip0_247_549">
                      <rect fill="white" height="12" width="12" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
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
  );
}
import svgPaths from "./svg-h6ir3b7lwu";

function InputAndLabel() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full" data-name="Input and label">
      <div className="bg-white col-1 content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] row-1 w-[541px]" data-name="Textfield">
        <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px opacity-60 relative text-[#5d5e63] text-[13px] whitespace-pre-wrap">Select or search for user</p>
        <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
          <div className="absolute inset-[28.57%_2.93%_22.48%_2.94%]" data-name="Vector">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1783 6.85421">
              <path clipRule="evenodd" d={svgPaths.p35d11800} fill="var(--fill-0, #1A1B1F)" fillRule="evenodd" id="Vector" />
            </svg>
          </div>
        </div>
      </div>
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#1a1b1f] text-[14px] w-[541px] whitespace-pre-wrap">User</p>
    </div>
  );
}

function InputAndLabel1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full" data-name="Input and label">
      <div className="bg-white col-1 content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] row-1 w-[541px]" data-name="Textfield">
        <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px opacity-60 relative text-[#5d5e63] text-[13px] whitespace-pre-wrap">Enter current password</p>
      </div>
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#1a1b1f] text-[14px] w-[541px] whitespace-pre-wrap">Password</p>
    </div>
  );
}

function InputAndLabel2() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full" data-name="Input and label">
      <div className="bg-white col-1 content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] row-1 w-[541px]" data-name="Textfield">
        <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px opacity-60 relative text-[#5d5e63] text-[13px] whitespace-pre-wrap">Enter new PIN-code</p>
      </div>
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#1a1b1f] text-[14px] w-[541px] whitespace-pre-wrap">PIN-code</p>
    </div>
  );
}

function InputAndLabel3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full" data-name="Input and label">
      <div className="bg-white col-1 content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] row-1 w-[541px]" data-name="Textfield">
        <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px opacity-60 relative text-[#5d5e63] text-[13px] whitespace-pre-wrap">Enter new PIN-code again</p>
      </div>
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-0 mt-0 relative row-1 text-[#1a1b1f] text-[14px] w-[541px] whitespace-pre-wrap">PIN-code again</p>
    </div>
  );
}

export default function ModuleContent() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[10px] items-start p-[20px] relative rounded-[4.383px] size-full" data-name="Module content">
      <div aria-hidden="true" className="absolute border border-[#e6e6e8] border-solid inset-0 pointer-events-none rounded-[4.383px]" />
      <InputAndLabel />
      <InputAndLabel1 />
      <InputAndLabel2 />
      <InputAndLabel3 />
    </div>
  );
}
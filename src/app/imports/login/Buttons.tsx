export default function Buttons() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative size-full" data-name="Buttons">
      <div className="bg-[#f1f0f1] content-stretch flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
        <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#46464b] text-[15px]">Confirm new PIN-code</p>
      </div>
      <button className="bg-white content-stretch cursor-pointer flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[13px] text-left">Cancel</p>
      </button>
    </div>
  );
}
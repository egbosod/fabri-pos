function Button() {
  return (
    <div className="bg-[#f1f0f1] content-stretch flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#46464b] text-[15px]">Confirm new PIN-code</p>
    </div>
  );
}

function Button1() {
  return (
    <button className="bg-white content-stretch cursor-pointer flex h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[13px] text-left">Cancel</p>
    </button>
  );
}

function TextButton() {
  return (
    <div className="content-stretch flex gap-[8px] h-[48px] items-center px-[8px] py-[6px] relative rounded-[5px] shrink-0" data-name="Text button">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#0094f9] text-[12px] uppercase">Back to pin login</p>
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[20px] items-center relative" data-name="Buttons">
      <Button />
      <Button1 />
      <TextButton />
    </div>
  );
}

export default function Footer() {
  return (
    <div className="bg-white relative size-full" data-name="Footer">
      <div className="content-stretch flex isolate items-start justify-end px-[20px] py-[15px] relative size-full">
        <div className="flex items-center justify-center relative shrink-0 z-[1]">
          <div className="flex-none rotate-180">
            <Buttons />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-b border-solid inset-0 pointer-events-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)]" />
    </div>
  );
}
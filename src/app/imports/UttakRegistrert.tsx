import svgPaths from "./svg-vjauia50h5";

function IconsFontAwesome() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icons Font awesome">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icons Font awesome">
          <path d={svgPaths.p29592580} fill="var(--fill-0, #1A1B1F)" id="Primary" />
        </g>
      </svg>
    </div>
  );
}

function IconClose() {
  return (
    <div className="relative shrink-0 size-[10.8px]" data-name="Icon / Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.8 10.8">
        <g clipPath="url(#clip0_325_193)" id="Icon / Close">
          <path clipRule="evenodd" d={svgPaths.p69c3900} fill="var(--fill-0, #1A1B1F)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_325_193">
            <rect fill="white" height="10.8" width="10.8" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Close({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="bg-[#e3e2e4] content-stretch cursor-pointer flex items-center justify-center p-[8px] relative rounded-[13.5px] shrink-0 size-[27px] hover:bg-[#d4d4d6] transition-colors" data-name="Close">
      <IconClose />
    </button>
  );
}

export default function UttakRegistrert({ onClose, username }: { onClose?: () => void; username?: string }) {
  return (
    <div className="bg-[#f0fcf3] content-stretch flex gap-[13px] items-center p-[13px] relative rounded-[3px] w-full min-w-[300px] shadow-sm" data-name="Uttak registrert">
      <div aria-hidden="true" className="absolute border border-[#30ac5a] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <IconsFontAwesome />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-90 relative shrink-0 text-[#101115] text-[15px] flex-1">
        POS User switch success: {username}
      </p>
      <Close onClick={onClose} />
    </div>
  );
}

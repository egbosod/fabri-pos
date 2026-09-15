function HelperbuttonHelper({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
      <div className="content-stretch flex h-full items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative">{children}</div>
    </div>
  );
}

export default function Buttons() {
  return (
    <div className="content-stretch cursor-pointer flex gap-[20px] items-center relative size-full" data-name="Buttons">
      <button className="bg-[#0d97fc] h-[48px] min-w-[100px] relative rounded-[5px] shrink-0" data-name="Button">
        <HelperbuttonHelper>
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[15px] text-left text-white whitespace-nowrap">Bekreft</p>
        </HelperbuttonHelper>
      </button>
      <button className="bg-white h-[48px] min-w-[100px] relative rounded-[5px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <HelperbuttonHelper>
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-left whitespace-nowrap">Avbryt</p>
        </HelperbuttonHelper>
      </button>
    </div>
  );
}
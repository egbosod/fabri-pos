export default function Button() {
  return (
    <div className="bg-[#f1f0f1] relative rounded-[5px] size-full" data-name="Button">
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#46464b] text-[15px] whitespace-nowrap">Ny ordre</p>
        </div>
      </div>
    </div>
  );
}
import svgPaths from "./svg-rwq2qa5anz";

export default function Iconbutton() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center px-[10px] py-[6px] relative rounded-[5px] size-full" data-name="Iconbutton">
      <div aria-hidden className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Variant=barcode-read">
        <div className="absolute inset-[8.33%]" data-name="Primary">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p1eb9d340} fill="var(--fill-0, black)" id="Primary" />
          </svg>
        </div>
      </div>
    </div>
  );
}
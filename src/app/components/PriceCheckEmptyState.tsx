import svgPaths from "../imports/svg-bzympghppx";

function Graphic() {
  return (
    <div className="absolute h-[92px] left-[15px] top-[11px] w-[84px]" data-name="graphic">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 92">
        <g id="graphic">
          <path d="M21 32.875V64.375" id="Vector" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M31.5 32.875V48.625" id="Vector_2" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M63 32.875V64.375" id="Vector_3" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M52.5 32.875V48.625" id="Vector_4" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M42 32.875V48.625" id="Vector_5" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M31.5 59.125H52.5" id="Vector_6" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M5.25 17.125V6.625H15.75" id="Vector_7" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M78.75 17.125V6.625H68.25" id="Vector_8" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M5.25 74.875V85.375H15.75" id="Vector_9" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M78.75 74.875V85.375H68.25" id="Vector_10" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
        </g>
      </svg>
    </div>
  );
}

function Group161() {
  return (
    <div className="absolute left-1/2 top-[160px] translate-x-[-50%]">
      <p className="absolute font-normal h-[34px] leading-[1.38] left-[calc(50%-9.5px)] text-[13px] text-black text-center top-[320px] translate-x-[-50%] w-[322px]">Scan/søk varer for å sjekke pris tilhørende kunde/prosjekt. Legg deretter til varene på salget dersom kunden ønsker varene.</p>
      <p className="absolute font-semibold leading-[1.75] left-1/2 text-[#42424a] text-[15px] text-center top-[283px] translate-x-[-50%] w-[359px]">Sjekk pris for valgt kunde/prosjekt</p>
      <div className="absolute left-[calc(50%+0.5px)] overflow-clip size-[114px] top-[160px] translate-x-[-50%]" data-name="Barcode Scan">
        <Graphic />
      </div>
    </div>
  );
}

export function PriceCheckEmptyState() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start justify-end min-h-px min-w-px overflow-clip relative shrink-0 w-full" data-name="Order items">
      <Group161 />
    </div>
  );
}

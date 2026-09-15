function Row() {
  return (
    <div className="box-border content-stretch flex gap-[5px] items-center leading-[1.4] overflow-clip px-0 py-[2px] relative shrink-0 text-[#22222c] text-[14px] w-full" data-name="Row">
      <p className="font-['Montserrat:Medium',sans-serif] font-medium relative shrink-0 text-nowrap whitespace-pre">Sum før rabatt</p>
      <p className="basis-0 font-['Montserrat:Regular',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-right">1 611,00</p>
    </div>
  );
}

function Row1() {
  return (
    <div className="box-border content-stretch flex gap-[5px] items-center leading-[1.4] overflow-clip px-0 py-[2px] relative shrink-0 text-[#22222c] text-[14px] w-full" data-name="Row">
      <p className="font-['Montserrat:Medium',sans-serif] font-medium relative shrink-0 text-nowrap whitespace-pre">Rabatt</p>
      <p className="basis-0 font-['Montserrat:Regular',sans-serif] font-normal grow min-h-px min-w-px relative shrink-0 text-right">322,20</p>
    </div>
  );
}

function Row2() {
  return (
    <div className="box-border content-stretch flex font-['Montserrat:SemiBold',sans-serif] font-semibold gap-[5px] items-center leading-[1.4] overflow-clip px-0 py-[2px] relative shrink-0 text-[#22222c] w-full" data-name="Row">
      <p className="relative shrink-0 text-[14px] text-nowrap whitespace-pre">Å betale</p>
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[18px] text-right">1 288,80</p>
    </div>
  );
}

export default function Sums() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[3px] size-full" data-name="Sums">
      <Row />
      <Row1 />
      <Row2 />
    </div>
  );
}
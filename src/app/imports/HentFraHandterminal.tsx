import svgPaths from "./svg-yzk1u5sjyl";
import img from "figma:asset/dc3aad517ab9f61fffb0eba3fbe67e248d89a489.png";

function Group3() {
  return (
    <div className="absolute bottom-[2.05%] left-0 right-0 top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group 3">
          <path clipRule="evenodd" d={svgPaths.p2d8c2380} fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.p3d995300} fill="var(--fill-0, #090914)" fillRule="evenodd" id="Vector (Stroke)_2" />
        </g>
      </svg>
    </div>
  );
}

function InputAndLabel() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-name="Input and label">
      <p className="[grid-area:1_/_1] font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-px mt-0 relative text-[#22222c] text-[14px] w-[124px]">Ekspedisjon</p>
      <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[6px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] w-[300px]" data-name="Textfield/Normal">
        <div aria-hidden="true" className="absolute border-2 border-[#0d97fc] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <p className="basis-0 font-['Montserrat:Regular',sans-serif] font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-[#6b6b72] text-[14px]">Søk på mobilnr, navn eller kundenr</p>
        <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
          <div className="absolute left-0 size-[57.6px] top-0" data-name="Icon Plate" />
          <Group3 />
        </div>
        <div className="absolute h-[15px] left-[13px] top-1/2 translate-y-[-50%] w-px" data-name="blinking-caret 1">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={img} />
        </div>
        <div className="absolute inset-0 pointer-events-none shadow-[2px_2px_3px_0px_inset_rgba(0,0,0,0.1)]" />
      </div>
    </div>
  );
}

function Frame427319109() {
  return (
    <div className="content-stretch flex gap-[40px] items-start relative shrink-0">
      <InputAndLabel />
    </div>
  );
}

function Frame427319110() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[7px] items-start pb-[25px] pt-[20px] px-[20px] relative w-full">
          <Frame427319109 />
        </div>
      </div>
    </div>
  );
}

function Content() {
  return <div className="content-stretch flex gap-[10px] items-center overflow-clip shrink-0" data-name="Content" />;
}

function TableCell() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[44px]" data-name="Table/Cell">
      <Content />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Selger</p>
      </div>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Content1 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Kunde</p>
      </div>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[183px]" data-name="Table/Cell">
      <Content2 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Referanse</p>
      </div>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[549px]" data-name="Table/Cell">
      <Content3 />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap text-right">
        <p className="leading-[normal] whitespace-pre">Sum</p>
      </div>
    </div>
  );
}

function TableCell4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[74px]" data-name="Table/Cell">
      <Content4 />
    </div>
  );
}

function TableRow() {
  return (
    <div className="box-border content-stretch flex items-start overflow-clip pb-[10px] pt-0 px-0 relative rounded-[5px] shrink-0 w-[963px]" data-name="Table/Row">
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
    </div>
  );
}

function Arrow() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319078() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319078 />
    </div>
  );
}

function Frame427319114() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content5 />
    </div>
  );
}

function TableCell6() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319114 />
    </div>
  );
}

function Group427319079() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt A</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319079 />
    </div>
  );
}

function Frame427319115() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content6 />
    </div>
  );
}

function TableCell7() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319115 />
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Tor</p>
      </div>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content7 />
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">5 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell9() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content8 />
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell10() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content9 />
    </div>
  );
}

function Columns() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell5 />
      <TableCell6 />
      <TableCell7 />
      <TableCell8 />
      <TableCell9 />
      <TableCell10 />
    </div>
  );
}

function Arrow1() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell11() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319080() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">EGTTEW</p>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319080 />
    </div>
  );
}

function Frame427319116() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content10 />
    </div>
  );
}

function TableCell12() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319116 />
    </div>
  );
}

function Group427319081() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Brennerigata 43A, bygg B</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319081 />
    </div>
  );
}

function Frame427319117() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content11 />
    </div>
  );
}

function TableCell13() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319117 />
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">&nbsp;</p>
      </div>
    </div>
  );
}

function TableCell14() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content12 />
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">3 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell15() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content13 />
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell16() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content14 />
    </div>
  );
}

function Columns1() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell11 />
      <TableCell12 />
      <TableCell13 />
      <TableCell14 />
      <TableCell15 />
      <TableCell16 />
    </div>
  );
}

function Arrow2() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell17() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319082() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319082 />
    </div>
  );
}

function Frame427319118() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content15 />
    </div>
  );
}

function TableCell18() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319118 />
    </div>
  );
}

function Group427319083() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt A</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319083 />
    </div>
  );
}

function Frame427319120() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content16 />
    </div>
  );
}

function TableCell19() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319120 />
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">&nbsp;</p>
      </div>
    </div>
  );
}

function TableCell20() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content17 />
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">5 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell21() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content18 />
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell22() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content19 />
    </div>
  );
}

function Columns2() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell17 />
      <TableCell18 />
      <TableCell19 />
      <TableCell20 />
      <TableCell21 />
      <TableCell22 />
    </div>
  );
}

function Arrow3() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell23() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319084() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319084 />
    </div>
  );
}

function Frame427319121() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content20 />
    </div>
  );
}

function TableCell24() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319121 />
    </div>
  );
}

function Group427319085() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] text-nowrap translate-y-[-50%]">
        <p className="leading-[normal] whitespace-pre">Kunde uten konto</p>
      </div>
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319085 />
    </div>
  );
}

function Frame427319122() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content21 />
    </div>
  );
}

function TableCell25() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319122 />
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">KJ12312</p>
      </div>
    </div>
  );
}

function TableCell26() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content22 />
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">7 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell27() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content23 />
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell28() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content24 />
    </div>
  );
}

function Columns3() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell23 />
      <TableCell24 />
      <TableCell25 />
      <TableCell26 />
      <TableCell27 />
      <TableCell28 />
    </div>
  );
}

function Arrow4() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell29() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319086() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319086 />
    </div>
  );
}

function Frame427319123() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content25 />
    </div>
  );
}

function TableCell30() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319123 />
    </div>
  );
}

function Group427319087() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt A</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content26() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319087 />
    </div>
  );
}

function Frame427319124() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content26 />
    </div>
  );
}

function TableCell31() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319124 />
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">&nbsp;</p>
      </div>
    </div>
  );
}

function TableCell32() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content27 />
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">5 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell33() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content28 />
    </div>
  );
}

function Content29() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell34() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content29 />
    </div>
  );
}

function Columns4() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell29 />
      <TableCell30 />
      <TableCell31 />
      <TableCell32 />
      <TableCell33 />
      <TableCell34 />
    </div>
  );
}

function Arrow5() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell35() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319088() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319088 />
    </div>
  );
}

function Frame427319125() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content30 />
    </div>
  );
}

function TableCell36() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319125 />
    </div>
  );
}

function Group427319089() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt A</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content31() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319089 />
    </div>
  );
}

function Frame427319126() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content31 />
    </div>
  );
}

function TableCell37() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319126 />
    </div>
  );
}

function Content32() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">&nbsp;</p>
      </div>
    </div>
  );
}

function TableCell38() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content32 />
    </div>
  );
}

function Content33() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">2 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell39() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content33 />
    </div>
  );
}

function Content34() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell40() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content34 />
    </div>
  );
}

function Columns5() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell35 />
      <TableCell36 />
      <TableCell37 />
      <TableCell38 />
      <TableCell39 />
      <TableCell40 />
    </div>
  );
}

function Arrow6() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell41() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319090() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content35() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319090 />
    </div>
  );
}

function Frame427319127() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content35 />
    </div>
  );
}

function TableCell42() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319127 />
    </div>
  );
}

function Group427319091() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt A</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content36() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319091 />
    </div>
  );
}

function Frame427319128() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content36 />
    </div>
  );
}

function TableCell43() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319128 />
    </div>
  );
}

function Content37() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">&nbsp;</p>
      </div>
    </div>
  );
}

function TableCell44() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content37 />
    </div>
  );
}

function Content38() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">5 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell45() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content38 />
    </div>
  );
}

function Content39() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell46() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content39 />
    </div>
  );
}

function Columns6() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell41 />
      <TableCell42 />
      <TableCell43 />
      <TableCell44 />
      <TableCell45 />
      <TableCell46 />
    </div>
  );
}

function Arrow7() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell47() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319092() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content40() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319092 />
    </div>
  );
}

function Frame427319129() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content40 />
    </div>
  );
}

function TableCell48() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319129 />
    </div>
  );
}

function Group427319093() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt A</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content41() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319093 />
    </div>
  );
}

function Frame427319130() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content41 />
    </div>
  );
}

function TableCell49() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319130 />
    </div>
  );
}

function Content42() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Tor</p>
      </div>
    </div>
  );
}

function TableCell50() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content42 />
    </div>
  );
}

function Content43() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">5 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell51() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content43 />
    </div>
  );
}

function Content44() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell52() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content44 />
    </div>
  );
}

function Columns7() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell47 />
      <TableCell48 />
      <TableCell49 />
      <TableCell50 />
      <TableCell51 />
      <TableCell52 />
    </div>
  );
}

function Arrow8() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell53() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319094() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content45() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319094 />
    </div>
  );
}

function Frame427319131() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content45 />
    </div>
  );
}

function TableCell54() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319131 />
    </div>
  );
}

function Group427319095() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt A</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content46() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319095 />
    </div>
  );
}

function Frame427319132() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content46 />
    </div>
  );
}

function TableCell55() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319132 />
    </div>
  );
}

function Content47() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Tor</p>
      </div>
    </div>
  );
}

function TableCell56() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content47 />
    </div>
  );
}

function Content48() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">5 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell57() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content48 />
    </div>
  );
}

function Content49() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell58() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content49 />
    </div>
  );
}

function Columns8() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell53 />
      <TableCell54 />
      <TableCell55 />
      <TableCell56 />
      <TableCell57 />
      <TableCell58 />
    </div>
  );
}

function Arrow9() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell59() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319096() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content50() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319096 />
    </div>
  );
}

function Frame427319133() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content50 />
    </div>
  );
}

function TableCell60() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319133 />
    </div>
  );
}

function Group427319097() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt A</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content51() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319097 />
    </div>
  );
}

function Frame427319134() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content51 />
    </div>
  );
}

function TableCell61() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319134 />
    </div>
  );
}

function Content52() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Tor</p>
      </div>
    </div>
  );
}

function TableCell62() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content52 />
    </div>
  );
}

function Content53() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">5 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell63() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content53 />
    </div>
  );
}

function Content54() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell64() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content54 />
    </div>
  );
}

function Columns9() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell59 />
      <TableCell60 />
      <TableCell61 />
      <TableCell62 />
      <TableCell63 />
      <TableCell64 />
    </div>
  );
}

function Arrow10() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]" data-name="Arrow">
      <div className="overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Down">
        <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
        <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]" data-name="Vector">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
            <path d={svgPaths.p1bf14e00} fill="var(--fill-0, #6B6B72)" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function TableCell65() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0" data-name="Table/Cell">
      <div className="relative shrink-0 size-[24px]" data-name="Radiobutton">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" fill="var(--fill-0, white)" id="Ellipse 49" r="11.5" stroke="var(--stroke-0, #D5D5D7)" />
          </svg>
        </div>
        <div className="absolute inset-[8.333%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <circle cx="10" cy="10" fill="var(--fill-0, white)" id="Ellipse 52" r="10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group427319098() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">I dag, 14:56</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">AK</p>
      </div>
    </div>
  );
}

function Content55() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319098 />
    </div>
  );
}

function Frame427319135() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content55 />
    </div>
  );
}

function TableCell66() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]" data-name="Table/Cell">
      <Frame427319135 />
    </div>
  );
}

function Group427319099() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center ml-0 mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt A</p>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Eventyrslottet AS</p>
      </div>
    </div>
  );
}

function Content56() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <Group427319099 />
    </div>
  );
}

function Frame427319136() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start justify-center relative shrink-0">
      <Content56 />
    </div>
  );
}

function TableCell67() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]" data-name="Table/Cell">
      <Frame427319136 />
    </div>
  );
}

function Content57() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Tor</p>
      </div>
    </div>
  );
}

function TableCell68() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]" data-name="Table/Cell">
      <Content57 />
    </div>
  );
}

function Content58() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">5 varelinjer</p>
      </div>
    </div>
  );
}

function TableCell69() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content58 />
    </div>
  );
}

function Content59() {
  return (
    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0" data-name="Content">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">1 449,00</p>
      </div>
    </div>
  );
}

function TableCell70() {
  return (
    <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]" data-name="Table/Cell">
      <Content59 />
    </div>
  );
}

function Columns10() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0 w-[729px]" data-name="Columns">
      <TableCell65 />
      <TableCell66 />
      <TableCell67 />
      <TableCell68 />
      <TableCell69 />
      <TableCell70 />
    </div>
  );
}

function Frame427319119() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow />
        <Columns />
      </div>
      <button className="bg-white block cursor-pointer h-[62px] overflow-visible relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow1 />
        <Columns1 />
      </button>
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow2 />
        <Columns2 />
      </div>
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow3 />
        <Columns3 />
      </div>
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow4 />
        <Columns4 />
      </div>
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow5 />
        <Columns5 />
      </div>
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow6 />
        <Columns6 />
      </div>
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow7 />
        <Columns7 />
      </div>
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow8 />
        <Columns8 />
      </div>
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow9 />
        <Columns9 />
      </div>
      <div className="bg-white h-[62px] relative rounded-[5px] shrink-0 w-full" data-name="PDA row">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <Arrow10 />
        <Columns10 />
      </div>
    </div>
  );
}

function Frame427319095() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[15px] py-0 relative w-full">
          <TableRow />
          <Frame427319119 />
        </div>
      </div>
    </div>
  );
}

function Content60() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[15px] rounded-[5px] top-[15px] w-[994px]" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#e6e6e8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame427319110 />
      <Frame427319095 />
    </div>
  );
}

function Body() {
  return (
    <div className="absolute h-[632px] left-0 overflow-x-clip overflow-y-auto top-[68px] w-[1024px]" data-name="Body">
      <Content60 />
    </div>
  );
}

function MobileShoppingCart() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]" data-name="Mobile Shopping Cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Mobile Shopping Cart">
          <path d={svgPaths.p9a07500} id="Vector" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M4.375 18H16.375" id="Vector_2" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2e2a0e90} id="Vector_3" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p39b9bc00} id="Vector_4" stroke="var(--stroke-0, #42424A)" strokeWidth="1.5" />
          <path d={svgPaths.p3ede7580} id="Vector_5" stroke="var(--stroke-0, #42424A)" strokeWidth="1.5" />
          <g id="Group">
            <path d={svgPaths.p21edb020} id="Vector_6" stroke="var(--stroke-0, #42424A)" strokeWidth="1.5" />
            <path d={svgPaths.p23f2e320} id="Vector_7" stroke="var(--stroke-0, #42424A)" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Group32() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <MobileShoppingCart />
      <p className="[grid-area:1_/_1] font-['Montserrat:Bold',sans-serif] font-bold leading-[1.3] ml-[35px] mt-[3.086px] relative text-[#22222c] text-[15px] text-nowrap whitespace-pre">Hent ekspedisjon fra håndterminal</p>
    </div>
  );
}

function ModuleHeader() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Module header">
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1.461px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-[20px] py-[22px] relative w-full">
          <Group32 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="absolute content-stretch flex flex-col items-center left-0 top-0 w-[1024px]" data-name="Header">
      <ModuleHeader />
    </div>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative" data-name="Buttons">
      <div className="bg-[#efeff0] box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
        <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#42424a] text-[15px] text-nowrap whitespace-pre">Hent for betaling</p>
      </div>
      <button className="bg-white box-border content-stretch cursor-pointer flex gap-[8px] h-[48px] items-center justify-center min-w-[100px] overflow-visible px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
        <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-nowrap whitespace-pre">Avbryt</p>
      </button>
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white relative w-[1024px]" data-name="Footer">
      <div className="box-border content-stretch flex gap-[10px] isolate items-start justify-end overflow-clip p-[15px] relative rounded-[inherit] w-[1024px]">
        <div className="flex items-center justify-center relative shrink-0 z-[1]">
          <div className="flex-none rotate-[180deg]">
            <Buttons />
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)]" />
    </div>
  );
}

export default function HentFraHandterminal() {
  return (
    <div className="bg-neutral-50 relative shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] size-full" data-name="Hent fra håndterminal">
      <div className="absolute flex items-center justify-center left-0 top-[690px] w-[1024px]">
        <div className="flex-none rotate-[180deg]">
          <Footer />
        </div>
      </div>
      <Body />
      <Header />
    </div>
  );
}
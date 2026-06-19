import svgPaths from "./svg-p6kc57wo9f";
import imgBlinkingCaret1 from "figma:asset/dc3aad517ab9f61fffb0eba3fbe67e248d89a489.png";

function Group() {
  return (
    <div className="absolute inset-[6.05%_14.84%]" data-name="Group">
      <div className="absolute inset-[-3.56%_-4.44%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 23">
          <g id="Group">
            <path d="M4.96885 9.9H13.4063" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M4.96885 13.4156H13.4063" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d="M4.96885 16.9312H13.4063" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p2c632f00} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
            <path d={svgPaths.p3f1fb500} id="Vector_5" stroke="var(--stroke-0, black)" strokeWidth="1.5" />
            <path d={svgPaths.p45f2e80} id="Vector_6" stroke="var(--stroke-0, black)" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IconOrders() {
  return (
    <div className="[grid-area:1_/_1] ml-0 mt-0 overflow-clip relative size-[24px]" data-name="Icon / Orders">
      <div className="absolute left-0 size-[24px] top-0" data-name="Icon Plate" />
      <Group />
    </div>
  );
}

function Group3() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <IconOrders />
      <p className="[grid-area:1_/_1] font-['Montserrat:Bold',sans-serif] font-bold leading-[1.3] ml-[35px] mt-[3.09px] relative text-[#22222c] text-[15px] text-nowrap whitespace-pre">Hent ordre for betaling</p>
    </div>
  );
}

function ModuleHeader() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Module header">
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1.461px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-[20px] py-[22px] relative w-full">
          <Group3 />
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Header">
      <ModuleHeader />
    </div>
  );
}

function Group1() {
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

function IconSearch() {
  return (
    <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
      <div className="absolute left-0 size-[57.6px] top-0" data-name="Icon Plate" />
      <Group1 />
    </div>
  );
}

function TextfieldNormal() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[6px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] w-[300px]" data-name="Textfield/Normal">
      <div aria-hidden="true" className="absolute border-2 border-[#0d97fc] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="basis-0 font-['Montserrat:Regular',sans-serif] font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-[#6b6b72] text-[14px]">Søk på mobilnr, navn eller kundenr</p>
      <IconSearch />
      <div className="absolute h-[15px] left-[13px] top-1/2 translate-y-[-50%] w-px" data-name="blinking-caret 1">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgBlinkingCaret1} />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[2px_2px_3px_0px_inset_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function InputAndLabel() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Input and label">
      <p className="[grid-area:1_/_1] font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-px mt-0 relative text-[#22222c] text-[14px] w-[124px]">Kunde</p>
      <TextfieldNormal />
    </div>
  );
}

function Group2() {
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

function IconSearch1() {
  return (
    <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
      <div className="absolute left-0 size-[57.6px] top-0" data-name="Icon Plate" />
      <Group2 />
    </div>
  );
}

function TextfieldNormal1() {
  return (
    <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] w-[300px]" data-name="Textfield/Normal">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="basis-0 font-['Montserrat:Regular',sans-serif] font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-[#6b6b72] text-[14px]">Søk etter ordrenummer</p>
      <IconSearch1 />
    </div>
  );
}

function InputAndLabel1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Input and label">
      <p className="[grid-area:1_/_1] font-['Montserrat:Bold',sans-serif] font-bold leading-[1.75] ml-px mt-0 relative text-[#22222c] text-[14px] w-[151px]">Ordrenummer</p>
      <TextfieldNormal1 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[40px] items-start leading-[0] relative shrink-0">
      <InputAndLabel />
      <InputAndLabel1 />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function CheckboxWithLabel() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Checkbox with label">
      <Checkbox />
      <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#090914] text-[12px] text-nowrap whitespace-pre">Kunde uten konto</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[48px] items-start justify-center pl-0 pr-[8px] py-[8px] relative shrink-0">
      <CheckboxWithLabel />
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[7px] items-start pb-[15px] pt-[20px] px-[20px] relative w-full">
          <Frame22 />
          <Frame6 />
        </div>
      </div>
    </div>
  );
}

function Track() {
  return <div className="absolute bg-[#989899] bottom-[15%] left-[2.7%] right-0 rounded-[125px] top-[15%]" data-name="Track" />;
}

function Button() {
  return <div className="absolute bg-white border-[#d5d5d7] border-[1.25px] border-solid bottom-0 left-0 right-[45.95%] rounded-[125px] shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)] top-0" data-name="Button" />;
}

function Control() {
  return (
    <div className="h-[25px] relative shrink-0 w-[46.25px]" data-name="Control">
      <Track />
      <Button />
    </div>
  );
}

function Toggle() {
  return (
    <div className="content-stretch flex gap-[11.25px] items-center relative shrink-0" data-name="Toggle">
      <Control />
    </div>
  );
}

function Toggle1() {
  return (
    <div className="content-stretch flex gap-[9px] h-[48px] items-center relative shrink-0" data-name="Toggle">
      <Toggle />
    </div>
  );
}

function ToggleBig() {
  return (
    <div className="relative shrink-0 w-full" data-name="Toggle big">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[9px] items-center pb-[15px] pl-[20px] pr-0 pt-[5px] relative w-full">
          <Toggle1 />
          <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#090914] text-[14px] text-center text-nowrap whitespace-pre">Vis kun ordre som skal forhåndsbetales</p>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="font-['Montserrat:Medium',sans-serif] font-medium h-[15px] leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap w-[876px]">
      <div className="absolute flex flex-col justify-center left-0 top-[7.5px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Ordrenr, dato</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[121px] top-[7.5px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Kunde, prosjekt</p>
      </div>
      <div className="absolute flex flex-col justify-center left-[819px] top-[7.5px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Totalsum</p>
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[67px] pr-0 py-0 relative shrink-0">
      <Frame24 />
    </div>
  );
}

function Checkbox1() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Group4() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-[4px] mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <ol className="list-decimal" start="12">
          <li className="ms-[18px]">
            <span className="leading-[normal]">juni 2023</span>
          </li>
        </ol>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">520591</p>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Checkbox1 />
      <Group4 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center leading-[0] relative shrink-0 text-nowrap">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#22222c] text-[14px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Byggmestrene Gundersen AS</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#42424a] text-[12px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt: NT6</p>
      </div>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex gap-[43px] items-center relative shrink-0 w-[430px]">
      <Frame21 />
      <Frame7 />
    </div>
  );
}

function Label() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[4px] py-px relative rounded-[3px] shrink-0" data-name="Label">
      <div aria-hidden="true" className="absolute border border-[#ff8c21] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.38] relative shrink-0 text-[#ff8c21] text-[11px] text-nowrap whitespace-pre">Delvis betalt</p>
    </div>
  );
}

function LabelAndCounter() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0" data-name="Label and counter">
      <Label />
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">3 varelinjer</p>
      </div>
    </div>
  );
}

function Sum() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="sum">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center justify-end pl-[10px] pr-[25px] py-0 relative w-full">
          <LabelAndCounter />
          <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
            <p className="leading-[normal] whitespace-pre">{` 58 200,75`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[5px] items-center px-[10px] py-0 relative w-full">
          <Frame13 />
          <Sum />
        </div>
      </div>
    </div>
  );
}

function IconDown() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_209_14908)" id="Icon / Down">
          <g id="Icon Plate"></g>
          <path d={svgPaths.p30f04900} fill="var(--fill-0, #6B6B72)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_209_14908">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame20() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]">
      <IconDown />
    </div>
  );
}

function Orderrows() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[62px] items-start justify-center px-0 py-[12px] relative rounded-[5px] shrink-0 w-full" data-name="Orderrows">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame />
      <Frame20 />
    </div>
  );
}

function Checkbox2() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Group5() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-[4px] mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <ol className="list-decimal" start="12">
          <li className="ms-[18px]">
            <span className="leading-[normal]">juni 2023</span>
          </li>
        </ol>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">365842</p>
      </div>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Checkbox2 />
      <Group5 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center leading-[0] relative shrink-0 text-nowrap">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#22222c] text-[14px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">LS Bygg og Service AS</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#42424a] text-[12px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt: NT6</p>
      </div>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[43px] items-center relative shrink-0 w-[430px]">
      <Frame27 />
      <Frame8 />
    </div>
  );
}

function LabelAndCounter1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0" data-name="Label and counter">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">12 varelinjer</p>
      </div>
    </div>
  );
}

function Sum1() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="sum">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center justify-end pl-[10px] pr-[25px] py-0 relative w-full">
          <LabelAndCounter1 />
          <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
            <p className="leading-[normal] whitespace-pre">{` 58 200,75`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[5px] items-center px-[10px] py-0 relative w-full">
          <Frame15 />
          <Sum1 />
        </div>
      </div>
    </div>
  );
}

function IconDown1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_209_14908)" id="Icon / Down">
          <g id="Icon Plate"></g>
          <path d={svgPaths.p30f04900} fill="var(--fill-0, #6B6B72)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_209_14908">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame28() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]">
      <IconDown1 />
    </div>
  );
}

function Orderrows1() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[62px] items-start justify-center px-0 py-[12px] relative rounded-[5px] shrink-0 w-full" data-name="Orderrows">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame1 />
      <Frame28 />
    </div>
  );
}

function Checkbox3() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Group6() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-[4px] mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <ol className="list-decimal" start="12">
          <li className="ms-[18px]">
            <span className="leading-[normal]">juni 2023</span>
          </li>
        </ol>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">520591</p>
      </div>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Checkbox3 />
      <Group6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center leading-[0] relative shrink-0 text-nowrap">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#22222c] text-[14px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">LS Bygg og Service AS</p>
      </div>
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#42424a] text-[12px]">
        <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt: NT6</p>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[43px] items-center relative shrink-0 w-[430px]">
      <Frame29 />
      <Frame9 />
    </div>
  );
}

function LabelAndCounter2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0" data-name="Label and counter">
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">8 varelinjer</p>
      </div>
    </div>
  );
}

function Sum2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="sum">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center justify-end pl-[10px] pr-[25px] py-0 relative w-full">
          <LabelAndCounter2 />
          <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
            <p className="leading-[normal] whitespace-pre">{` 58 200,75`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[5px] items-center px-[10px] py-0 relative w-full">
          <Frame16 />
          <Sum2 />
        </div>
      </div>
    </div>
  );
}

function IconDown2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_209_14908)" id="Icon / Down">
          <g id="Icon Plate"></g>
          <path d={svgPaths.p30f04900} fill="var(--fill-0, #6B6B72)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_209_14908">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame30() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]">
      <IconDown2 />
    </div>
  );
}

function Orderrows2() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[62px] items-start justify-center px-0 py-[12px] relative rounded-[5px] shrink-0 w-full" data-name="Orderrows">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame2 />
      <Frame30 />
    </div>
  );
}

function Checkbox4() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Group7() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-[4px] mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <ol className="list-decimal" start="12">
          <li className="ms-[18px]">
            <span className="leading-[normal]">juni 2023</span>
          </li>
        </ol>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">258748</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Checkbox4 />
      <Group7 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Kunde uten konto</p>
      </div>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[43px] items-center relative shrink-0 w-[430px]">
      <Frame31 />
      <Frame10 />
    </div>
  );
}

function Label1() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[4px] py-px relative rounded-[3px] shrink-0" data-name="Label">
      <div aria-hidden="true" className="absolute border border-[#ff8c21] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.38] relative shrink-0 text-[#ff8c21] text-[11px] text-nowrap whitespace-pre">Delvis betalt</p>
    </div>
  );
}

function LabelAndCounter3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0" data-name="Label and counter">
      <Label1 />
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">4 varelinjer</p>
      </div>
    </div>
  );
}

function Sum3() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="sum">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center justify-end pl-[10px] pr-[25px] py-0 relative w-full">
          <LabelAndCounter3 />
          <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
            <p className="leading-[normal] whitespace-pre">{` 58 200,75`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[5px] items-center px-[10px] py-0 relative w-full">
          <Frame17 />
          <Sum3 />
        </div>
      </div>
    </div>
  );
}

function IconDown3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_209_14908)" id="Icon / Down">
          <g id="Icon Plate"></g>
          <path d={svgPaths.p30f04900} fill="var(--fill-0, #6B6B72)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_209_14908">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]">
      <IconDown3 />
    </div>
  );
}

function Orderrows3() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[62px] items-start justify-center px-0 py-[12px] relative rounded-[5px] shrink-0 w-full" data-name="Orderrows">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame3 />
      <Frame32 />
    </div>
  );
}

function Checkbox5() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Group8() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-[4px] mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <ol className="list-decimal" start="12">
          <li className="ms-[18px]">
            <span className="leading-[normal]">juni 2023</span>
          </li>
        </ol>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">258748</p>
      </div>
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Checkbox5 />
      <Group8 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Kunde uten konto</p>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[43px] items-center relative shrink-0 w-[430px]">
      <Frame33 />
      <Frame11 />
    </div>
  );
}

function Label2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[4px] py-px relative rounded-[3px] shrink-0" data-name="Label">
      <div aria-hidden="true" className="absolute border border-[#ff8c21] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.38] relative shrink-0 text-[#ff8c21] text-[11px] text-nowrap whitespace-pre">Delvis betalt</p>
    </div>
  );
}

function LabelAndCounter4() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0" data-name="Label and counter">
      <Label2 />
      <div className="flex flex-col font-['Montserrat:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">12 varelinjer</p>
      </div>
    </div>
  );
}

function Sum4() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="sum">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center justify-end pl-[10px] pr-[25px] py-0 relative w-full">
          <LabelAndCounter4 />
          <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
            <p className="leading-[normal] whitespace-pre">{` 58 200,75`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[5px] items-center px-[10px] py-0 relative w-full">
          <Frame18 />
          <Sum4 />
        </div>
      </div>
    </div>
  );
}

function IconDown4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_209_14908)" id="Icon / Down">
          <g id="Icon Plate"></g>
          <path d={svgPaths.p30f04900} fill="var(--fill-0, #6B6B72)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_209_14908">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]">
      <IconDown4 />
    </div>
  );
}

function Orderrows4() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[62px] items-start justify-center px-0 py-[12px] relative rounded-[5px] shrink-0 w-full" data-name="Orderrows">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame4 />
      <Frame34 />
    </div>
  );
}

function Checkbox6() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function Group9() {
  return (
    <div className="font-['Montserrat:Regular',sans-serif] font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-[4px] mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
        <ol className="list-decimal" start="12">
          <li className="ms-[18px]">
            <span className="leading-[normal]">juni 2023</span>
          </li>
        </ol>
      </div>
      <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
        <p className="leading-[normal] text-nowrap whitespace-pre">258748</p>
      </div>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
      <Checkbox6 />
      <Group9 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0">
      <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap">
        <p className="leading-[normal] whitespace-pre">Kunde uten konto</p>
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[43px] items-center relative shrink-0 w-[430px]">
      <Frame35 />
      <Frame12 />
    </div>
  );
}

function Label3() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[4px] py-px relative rounded-[3px] shrink-0" data-name="Label">
      <div aria-hidden="true" className="absolute border border-[#ff8c21] border-solid inset-0 pointer-events-none rounded-[3px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.38] relative shrink-0 text-[#ff8c21] text-[11px] text-nowrap whitespace-pre">Delvis betalt</p>
    </div>
  );
}

function Sum5() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="sum">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="box-border content-stretch flex gap-[20px] items-center justify-end pl-[10px] pr-[25px] py-0 relative w-full">
          <Label3 />
          <div className="flex flex-col font-['Montserrat:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
            <p className="leading-[normal] whitespace-pre">{` 58 200,75`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[5px] items-center px-[10px] py-0 relative w-full">
          <Frame19 />
          <Sum5 />
        </div>
      </div>
    </div>
  );
}

function IconDown5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_209_14908)" id="Icon / Down">
          <g id="Icon Plate"></g>
          <path d={svgPaths.p30f04900} fill="var(--fill-0, #6B6B72)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_209_14908">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] top-[calc(50%+0.5px)] translate-y-[-50%]">
      <IconDown5 />
    </div>
  );
}

function Orderrows5() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[62px] items-start justify-center px-0 py-[12px] relative rounded-[5px] shrink-0 w-full" data-name="Orderrows">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame5 />
      <Frame36 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] items-start px-[20px] py-0 relative w-full">
          <Orderrows />
          <Orderrows1 />
          <Orderrows2 />
          <Orderrows3 />
          <Orderrows4 />
          {[...Array(9).keys()].map((_, i) => (
            <Orderrows5 key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start pb-[20px] pt-0 px-0 relative shrink-0 w-full">
      <Frame26 />
      <Frame14 />
    </div>
  );
}

function Content() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[15px] rounded-[5px] top-[15px] w-[994px]" data-name="Content">
      <div aria-hidden="true" className="absolute border border-[#e6e6e8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <Frame23 />
      <ToggleBig />
      <Frame25 />
    </div>
  );
}

function Body() {
  return (
    <div className="basis-0 grow min-h-px min-w-px overflow-x-clip overflow-y-auto relative shrink-0 w-full" data-name="Body">
      <Content />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#efeff0] box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] opacity-60 relative shrink-0 text-[#42424a] text-[15px] text-nowrap whitespace-pre">Hent for betaling</p>
    </div>
  );
}

function Button2() {
  return (
    <button className="bg-white box-border content-stretch cursor-pointer flex gap-[8px] h-[48px] items-center justify-center min-w-[100px] px-[20px] py-[6px] relative rounded-[5px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-nowrap whitespace-pre">Avbryt</p>
    </button>
  );
}

function Buttons() {
  return (
    <div className="content-stretch flex gap-[15px] items-center relative" data-name="Buttons">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-white relative w-full" data-name="Footer">
      <div className="flex flex-row justify-end overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[10px] isolate items-start justify-end p-[15px] relative w-full">
          <div className="flex items-center justify-center relative shrink-0 z-[1]">
            <div className="flex-none rotate-[180deg]">
              <Buttons />
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)]" />
    </div>
  );
}

export default function HentOrdre() {
  return (
    <div className="bg-neutral-50 box-border content-stretch flex flex-col items-start relative shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] size-full" data-name="Hent ordre">
      <Header />
      <Body />
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="flex-none rotate-[180deg] w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
}
import svgPaths from "./svg-dsbqfd0ypz";

function Textfield() {
  return (
    <div className="bg-white col-1 content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[23px] px-[14px] py-[8px] relative rounded-[5px] row-1 w-[320px]" data-name="Textfield">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px relative text-[#46464b] text-[13px] whitespace-pre-wrap">egtskam</p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.2] ml-0 mt-0 relative row-1 text-[#1a1b1f] text-[14px] w-[97.684px] whitespace-pre-wrap">User name</p>
      <Textfield />
    </div>
  );
}

function Textfield1() {
  return (
    <div className="bg-white col-1 content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[23px] px-[14px] py-[8px] relative rounded-[5px] row-1 w-[320px]" data-name="Textfield">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <p className="flex-[1_0_0] font-['Montserrat:Regular',sans-serif] font-normal leading-[1.75] min-h-px min-w-px opacity-0 relative text-[#46464b] text-[13px] whitespace-pre-wrap">Tekst hbbie</p>
    </div>
  );
}

function Group1() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 w-full">
      <p className="col-1 font-['Montserrat:Bold',sans-serif] font-bold leading-[1.2] ml-0 mt-0 relative row-1 text-[#1a1b1f] text-[14px] w-[80px] whitespace-pre-wrap">Password</p>
      <Textfield1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute h-[6px] left-[14px] top-[44px] w-[76px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 76 6">
        <g id="Group 36690">
          <circle cx="3" cy="3" fill="var(--fill-0, #1A1B1F)" id="Ellipse 186" r="3" />
          <circle cx="13" cy="3" fill="var(--fill-0, #1A1B1F)" id="Ellipse 187" r="3" />
          <circle cx="23" cy="3" fill="var(--fill-0, #1A1B1F)" id="Ellipse 188" r="3" />
          <circle cx="33" cy="3" fill="var(--fill-0, #1A1B1F)" id="Ellipse 189" r="3" />
          <circle cx="43" cy="3" fill="var(--fill-0, #1A1B1F)" id="Ellipse 190" r="3" />
          <circle cx="53" cy="3" fill="var(--fill-0, #1A1B1F)" id="Ellipse 191" r="3" />
          <circle cx="63" cy="3" fill="var(--fill-0, #1A1B1F)" id="Ellipse 192" r="3" />
          <circle cx="73" cy="3" fill="var(--fill-0, #1A1B1F)" id="Ellipse 193" r="3" />
        </g>
      </svg>
    </div>
  );
}

function IconViewOff() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon / view off">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon / view off">
          <path clipRule="evenodd" d={svgPaths.p146e9d80} fill="var(--fill-0, #1A1B1F)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[273px] size-[46px] top-[24px]">
      <IconViewOff />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[21px] items-start relative shrink-0 w-full">
      <Group1 />
      <Group2 />
      <Frame6 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full">
      <Group />
      <Frame3 />
    </div>
  );
}

function Checkbox() {
  return (
    <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}

function CheckboxWithLabel() {
  return (
    <div className="content-stretch flex gap-[8px] items-center overflow-clip py-[8px] relative shrink-0" data-name="Checkbox with label">
      <Checkbox />
      <p className="font-['Montserrat:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#1a1b1f] text-[12px]">Remember login</p>
    </div>
  );
}

function TextButton() {
  return (
    <div className="bg-white content-stretch flex h-[30px] items-center px-[9px] py-[6px] relative rounded-[5px] shrink-0" data-name="Text button">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#0094f9] text-[12px]">Forgot password</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <CheckboxWithLabel />
      <TextButton />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#0094f9] h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[15px] text-white">Login</p>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[13px]">Logon using PIN</p>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white h-[48px] min-w-[100px] relative rounded-[5px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#c7c7c8] border-solid inset-0 pointer-events-none rounded-[5px]" />
      <div className="flex flex-row items-center justify-center min-w-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center min-w-[inherit] px-[20px] py-[6px] relative size-full">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.75] relative shrink-0 text-[#101115] text-[13px]">Two factor method</p>
        </div>
      </div>
    </div>
  );
}

function CtAs() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[320px]" data-name="CTAs">
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[60px] items-start relative shrink-0 w-full">
      <Frame2 />
      <CtAs />
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-0 px-[20px] py-[8px] top-[204px] w-[360px]">
      <Frame />
      <Frame4 />
    </div>
  );
}

function LogoFabriVersion() {
  return (
    <div className="h-[64px] relative shrink-0 w-[226px]" data-name="Logo_Fabri_Version_2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 226 64">
        <g id="Logo_Fabri_Version_2">
          <path d={svgPaths.p30dd3e00} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p1df99c80} fill="var(--fill-0, #E9EAED)" id="Vector_2" />
          <path d={svgPaths.p13f01200} fill="var(--fill-0, #47A4F1)" id="Vector_3" />
          <path d={svgPaths.p317a8f00} fill="var(--fill-0, #0075E7)" id="Vector_4" />
          <path d={svgPaths.p1ae15f80} fill="var(--fill-0, #93CCFF)" id="Vector_5" />
          <path d={svgPaths.p13585e80} fill="var(--fill-0, #424D60)" id="Vector_6" />
          <path clipRule="evenodd" d={svgPaths.p3988700} fill="var(--fill-0, #424D60)" fillRule="evenodd" id="Vector_7" />
          <path clipRule="evenodd" d={svgPaths.p2ef3c900} fill="var(--fill-0, #424D60)" fillRule="evenodd" id="Vector_8" />
          <path d={svgPaths.p20d87870} fill="var(--fill-0, #424D60)" id="Vector_9" />
          <path d={svgPaths.p3dac7c80} fill="var(--fill-0, #424D60)" id="Vector_10" />
          <path d={svgPaths.p3cad900} fill="var(--fill-0, #424D60)" id="Vector_11" />
          <path d={svgPaths.p17d95200} fill="var(--fill-0, #424D60)" id="Vector_12" />
          <path d={svgPaths.p3ad40670} fill="var(--fill-0, #424D60)" id="Vector_13" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-[67px] top-[40px]">
      <LogoFabriVersion />
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[#1a1b1f] text-[17px]">Welcome to EG Fabri POS</p>
    </div>
  );
}

function Mobile() {
  return (
    <div className="absolute bg-white h-[736px] left-[684px] overflow-clip rounded-[10px] top-[249px] w-[361px]" data-name="Mobile">
      <Frame1 />
      <Frame5 />
    </div>
  );
}

function Background() {
  return (
    <div className="absolute h-[52px] left-0 overflow-clip right-0 top-0" data-name="Background">
      <div className="absolute backdrop-blur-[40.774px] bg-[#fcfcfc] h-[52px] left-0 right-0 shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)] top-0" data-name="Background" />
    </div>
  );
}

function ViewAllTabs() {
  return (
    <div className="absolute overflow-clip right-0 size-[15.042px] top-[2.38px]" data-name="View All Tabs">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.042 15.042">
        <g id="View All Tabs" style={{ mixBlendMode: "plus-darker" }}>
          <path clipRule="evenodd" d={svgPaths.p2672fdc0} fill="var(--fill-0, #808080)" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

function NewTab() {
  return (
    <div className="absolute overflow-clip right-[37.83px] size-[13.488px] top-[3.14px]" data-name="New Tab">
      <div className="absolute right-0 size-[13.488px] top-0" data-name="New Tab">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.4885 13.4885">
          <g id="New Tab" style={{ mixBlendMode: "plus-darker" }}>
            <path d={svgPaths.p1a47f00} fill="var(--fill-0, #808080)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Share() {
  return (
    <div className="absolute h-[18.438px] overflow-clip right-[74.72px] top-0 w-[14.565px]" data-name="Share">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.5649 18.438">
        <g id="Share" style={{ mixBlendMode: "plus-darker" }}>
          <path clipRule="evenodd" d={svgPaths.p7865600} fill="var(--fill-0, #808080)" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

function Download() {
  return (
    <div className="absolute h-[16.645px] overflow-clip right-[111.08px] top-[2.06px] w-[16.653px]" data-name="Download">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6531 16.645">
        <g id="Download" style={{ mixBlendMode: "plus-darker" }}>
          <path clipRule="evenodd" d={svgPaths.p214289c0} fill="var(--fill-0, #808080)" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

function Right() {
  return (
    <div className="absolute h-[18.709px] overflow-clip right-[19.25px] top-[15.3px] w-[127.735px]" data-name="Right">
      <ViewAllTabs />
      <NewTab />
      <Share />
      <Download />
    </div>
  );
}

function Content() {
  return (
    <div className="-translate-x-1/2 absolute h-[16px] left-[calc(50%+15.89px)] overflow-clip text-center top-[6px] w-[121px]" data-name="Content">
      <p className="-translate-x-1/2 absolute font-['SF_Pro:Regular',sans-serif] font-normal leading-[normal] left-[calc(50%+8.5px)] text-[13px] text-[rgba(0,0,0,0.7)] top-[calc(50%-7.5px)]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        www.login-pos
      </p>
      <p className="-translate-x-1/2 absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] left-[calc(50%-54.5px)] text-[11.5px] text-[rgba(0,0,0,0.35)] top-[calc(50%-8px)]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        􀎡
      </p>
    </div>
  );
}

function Center() {
  return (
    <div className="absolute content-stretch flex gap-[17px] items-center left-[27.55%] right-[29.91%] top-[13px]" data-name="Center">
      <div className="h-[16.394px] relative shrink-0 w-[13.612px]" data-name="Privacy">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.6117 16.394">
          <g id="Privacy" style={{ mixBlendMode: "plus-darker" }}>
            <path clipRule="evenodd" d={svgPaths.p1a0d0b00} fill="var(--fill-0, #808080)" fillRule="evenodd" />
          </g>
        </svg>
      </div>
      <div className="flex-[1_0_0] h-[26px] min-h-px min-w-px relative rounded-[6px]" data-name="Textfield Background">
        <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.12)] border-solid inset-[-1px] pointer-events-none rounded-[7px]" />
      </div>
      <div className="absolute h-[12.615px] right-[6.29px] top-[6.76px] w-[10.354px]" data-name="Refresh">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.3535 12.6152">
          <path d={svgPaths.p2d1a7f00} fill="var(--fill-0, black)" fillOpacity="0.5" id="Refresh" />
        </svg>
      </div>
      <Content />
    </div>
  );
}

function WindowControlZoom() {
  return (
    <div className="absolute left-[40px] size-[12px] top-[3px]" data-name="Window Control - Zoom">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Window Control - Zoom">
          <g id="Button">
            <circle cx="6" cy="6" fill="var(--fill-0, #61C554)" r="6" />
            <circle cx="6" cy="6" r="5.75" stroke="var(--stroke-0, black)" strokeOpacity="0.2" strokeWidth="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function WindowControlMinimise() {
  return (
    <div className="absolute left-[20px] size-[12px] top-[3px]" data-name="Window Control - Minimise">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Window Control - Minimise">
          <g id="Button">
            <circle cx="6" cy="6" fill="var(--fill-0, #F4BF4F)" r="6" />
            <circle cx="6" cy="6" r="5.75" stroke="var(--stroke-0, black)" strokeOpacity="0.2" strokeWidth="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function WindowControlClose() {
  return (
    <div className="absolute left-0 size-[12px] top-[3px]" data-name="Window Control - Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Window Control - Close">
          <g id="Button">
            <circle cx="6" cy="6" fill="var(--fill-0, #ED6A5F)" r="6" />
            <circle cx="6" cy="6" r="5.75" stroke="var(--stroke-0, black)" strokeOpacity="0.2" strokeWidth="0.5" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function WindowControls() {
  return (
    <div className="absolute contents left-0 top-[3px]" data-name="Window Controls">
      <WindowControlZoom />
      <WindowControlMinimise />
      <WindowControlClose />
    </div>
  );
}

function Left() {
  return (
    <div className="absolute h-[18px] left-[20px] overflow-clip top-[17px] w-[188px]" data-name="Left">
      <p className="-translate-x-1/2 absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] left-[182.5px] opacity-20 text-[#808080] text-[16.5px] text-center top-0" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        􀯻
      </p>
      <p className="-translate-x-1/2 absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] left-[148.5px] text-[#808080] text-[16.5px] text-center top-0" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        􀯶
      </p>
      <div className="absolute h-[4.246px] left-[110.32px] top-[6.68px] w-[7.156px]" data-name="Arrow">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.15625 4.24609">
          <path d={svgPaths.p27ebbdf0} fill="var(--fill-0, black)" fillOpacity="0.45" id="Arrow" />
        </svg>
      </div>
      <div className="absolute bg-[rgba(0,0,0,0.05)] h-[18px] left-[104px] top-0 w-px" data-name="Separator" />
      <p className="-translate-x-1/2 absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[16px] left-[87px] text-[#808080] text-[16.5px] text-center top-0" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        􀏚
      </p>
      <WindowControls />
    </div>
  );
}

function Safari() {
  return (
    <div className="absolute h-[52px] left-0 top-0 w-[1728px]" data-name="Safari">
      <Background />
      <Right />
      <Center />
      <Left />
    </div>
  );
}

export default function LoginFilled() {
  return (
    <div className="bg-[#395f6f] relative size-full" data-name="Login filled">
      <Mobile />
      <Safari />
    </div>
  );
}
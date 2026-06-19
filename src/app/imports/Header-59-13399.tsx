import svgPaths from "./svg-2t930jla84";

function UserIcon() {
  return (
    <div className="absolute h-[16.689px] left-[13.01px] top-[calc(50%-0.101px)] translate-y-[-50%] w-[13.563px]" data-name="user icon">
      <div className="absolute inset-[-4.49%_-5.53%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 19">
          <g id="user icon">
            <ellipse cx="7.50237" cy="4.64541" id="Ellipse 2" rx="3.66853" ry="3.89541" stroke="var(--stroke-0, white)" strokeWidth="1.5" />
            <path d="M1.75237 17.6992C1.75237 15.6272 1.75237 14.5912 2.12903 13.7926C2.45812 13.0953 2.99742 12.5185 3.64785 12.1594C4.39383 11.75 5.36184 11.75 7.29785 11.75H7.70689C9.6429 11.75 10.611 11.75 11.357 12.1594C12.0074 12.5185 12.5467 13.0953 12.8758 13.7926C13.2524 14.5912 13.2524 15.6272 13.2524 17.6992" id="Ellipse 3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeWidth="1.5" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-[6.05%_6.05%_6.06%_6.05%]" data-name="Group">
      <div className="absolute inset-[-3.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
          <g id="Group">
            <path d={svgPaths.p68b6a80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.675" />
            <path d={svgPaths.p1c344f00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.675" />
          </g>
        </svg>
      </div>
    </div>
  );
}

interface Frame681Props {
  onClose?: () => void;
}

function Frame681({ onClose }: Frame681Props) {
  return (
    <button 
      onClick={onClose}
      className="box-border content-stretch cursor-pointer flex gap-[8px] items-center justify-center overflow-visible p-[8px] relative shrink-0 size-[48px]"
    >
      <div className="relative shrink-0 size-[27px]" data-name="Close">
        <div className="absolute inset-0">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 27 27">
            <circle cx="13.5" cy="13.5" fill="var(--fill-0, #42424A)" id="Ellipse 1" r="13.5" />
          </svg>
        </div>
        <div className="absolute inset-[31.48%_30.37%_28.52%_29.63%] overflow-clip" data-name="Icon / Close">
          <div className="absolute left-0 size-[10.8px] top-0" data-name="Icon Plate" />
          <Group />
        </div>
      </div>
    </button>
  );
}

function TextButton() {
  return (
    <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center px-[9px] py-[6px] relative rounded-[5px] shrink-0" data-name="Text button">
      <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold leading-[1.2] relative shrink-0 text-[17px] text-nowrap text-white whitespace-pre">Prisjekkmodus</p>
    </div>
  );
}

interface Frame427319064Props {
  onClose?: () => void;
}

function Frame427319064({ onClose }: Frame427319064Props) {
  return (
    <div className="absolute content-stretch flex items-start left-[12px] top-[10px]">
      <Frame681 onClose={onClose} />
      <TextButton />
    </div>
  );
}

interface TopMenuProps {
  onClose?: () => void;
  currentUser?: string;
  onProfileClick?: () => void;
}

function TopMenu({ onClose, currentUser = 'Erik Wheeler', onProfileClick }: TopMenuProps) {
  return (
    <div className="bg-[#282832] h-[68px] overflow-clip relative shadow-[2px_2px_4px_0px_rgba(126,126,126,0.06),3px_10px_15px_0px_rgba(126,126,126,0.06)] shrink-0 w-full" data-name="Top menu">
      <Frame427319064 onClose={onClose} />
      <button 
        onClick={onProfileClick}
        className="absolute cursor-pointer h-[48px] overflow-visible right-[10px] top-[10px] w-[163px]" 
        data-name="User menu button"
      >
        <div className="absolute bg-[#22222c] box-border content-stretch flex gap-[10px] inset-0 items-center px-[10px] py-[6px] rounded-[5px]" data-name="Iconbutton" />
        <div className="absolute flex items-center justify-center right-[12px] size-[12px] top-[calc(50%+0.771px)] translate-y-[-50%]">
          <div className="flex-none rotate-[180deg]">
            <div className="opacity-90 overflow-clip relative size-[12px]" data-name="Icon / Up">
              <div className="absolute left-0 size-[48px] top-0" data-name="Icon Plate" />
              <div className="absolute bottom-[19.5%] flex items-center justify-center left-0 right-0 top-[18.75%]">
                <div className="flex-none h-[8.645px] rotate-[180deg] w-[14px]">
                  <div className="relative size-full" data-name="Vector">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
                      <path d={svgPaths.p3a351d00} fill="var(--fill-0, white)" id="Vector" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute font-['Montserrat:Regular',sans-serif] font-normal h-[14.767px] leading-[1.75] left-[37px] text-[12px] text-white top-[calc(50%-10px)] w-[97.5px]">{currentUser}</p>
        <UserIcon />
      </button>
    </div>
  );
}

interface HeaderProps {
  onClose?: () => void;
  currentUser?: string;
  onProfileClick?: () => void;
}

export default function Header({ onClose, currentUser, onProfileClick }: HeaderProps) {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative w-full" data-name="Header">
      <TopMenu onClose={onClose} currentUser={currentUser} onProfileClick={onProfileClick} />
    </div>
  );
}
import MainMenu from "../imports/MainMenu";
import { Barcode } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface MainMenuWithPriceCheckProps {
  onPriceCheckClick: () => void;
}

export function MainMenuWithPriceCheck({ onPriceCheckClick }: MainMenuWithPriceCheckProps) {
  const { t } = useLanguage();
  
  return (
    <div className="bg-[#42424a] box-border content-stretch flex flex-col gap-[0px] items-start overflow-clip pb-[10px] pt-[15px] px-0 relative rounded-[5px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] w-[220px]">
      {/* Price Check Button */}
      <button
        onClick={onPriceCheckClick}
        className="h-[48px] relative rounded-[5px] shrink-0 w-full hover:bg-[#4a4a52] transition-colors"
      >
        <div className="flex flex-col justify-center size-full">
          <div className="box-border content-stretch flex flex-col gap-[8px] h-[48px] items-start justify-center px-[15px] py-[8px] relative w-full">
            <div className="content-stretch flex gap-[11px] items-center justify-center relative shrink-0">
              <Barcode size={14} className="text-[#E6E6E8] shrink-0" />
              <div className="box-border content-stretch flex gap-[8px] items-start px-[2px] py-0 relative shrink-0">
                <div className="capitalize flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap text-white">
                  <p className="leading-[16px] whitespace-pre">{t('priceCheck')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </button>
      
      {/* Original MainMenu items */}
      <MainMenu className="" />
    </div>
  );
}
import { useLanguage } from '../contexts/LanguageContext';

interface SumsProps {
  subtotal?: number;
  discount?: number;
  total?: number;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="box-border content-stretch flex gap-[5px] items-center leading-[1.4] overflow-clip px-0 py-[2px] relative shrink-0 text-[#22222c] text-[14px] w-full" data-name="Row">
      <p className="font-medium relative shrink-0 text-nowrap whitespace-pre">{label}</p>
      <p className="basis-0 font-normal grow min-h-px min-w-px relative shrink-0 text-right">{value}</p>
    </div>
  );
}

function TotalRow({ value }: { value: string }) {
  const { t } = useLanguage();
  return (
    <div className="box-border content-stretch flex font-semibold gap-[5px] items-center leading-[1.4] overflow-clip px-0 py-[2px] relative shrink-0 text-[#22222c] w-full" data-name="Row">
      <p className="relative shrink-0 text-[14px] text-nowrap whitespace-pre">{t('toPay')}</p>
      <p className="basis-0 grow min-h-px min-w-px relative shrink-0 text-[18px] text-right">{value}</p>
    </div>
  );
}

export function Sums({
  subtotal = 1611.00,
  discount = 322.20,
  total = 1288.80
}: SumsProps) {
  const { t } = useLanguage();
  return (
    <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[3px] w-full" data-name="Sums">
      <Row label={t('total')} value={subtotal.toFixed(2)} />
      <Row label={t('discount')} value={discount.toFixed(2)} />
      <TotalRow value={total.toFixed(2)} />
    </div>
  );
}

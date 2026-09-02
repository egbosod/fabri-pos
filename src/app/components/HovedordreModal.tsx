import React, { useState, useMemo } from 'react';
import svgPaths from "../imports/svg-p6kc57wo9f";
import { useLanguage } from '../contexts/LanguageContext';

interface HovedordreOrder {
  id: string;
  ordrenummer: string;
  dato: string;
  rekv: string;
  projekt: string;
  adresse1: string;
  adresse2?: string;
}

interface HovedordreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (order: HovedordreOrder) => void;
}

const mockHovedordrer: HovedordreOrder[] = [
  { id: '1', ordrenummer: '520591', dato: '12. juni 2023', rekv: 'REK-001', projekt: 'NT6', adresse1: 'Hovedveien 1', adresse2: 'Oslo' },
  { id: '2', ordrenummer: '365842', dato: '11. juni 2023', rekv: 'REK-002', projekt: 'NT6', adresse1: 'Storgata 15', adresse2: 'Bergen' },
  { id: '3', ordrenummer: '520591-2', dato: '10. juni 2023', rekv: 'REK-003', projekt: 'Prosjekt Trondheim', adresse1: 'Kirkegata 8', adresse2: 'Trondheim' },
  { id: '4', ordrenummer: '258748', dato: '9. juni 2023', rekv: 'REK-004', projekt: 'NT7', adresse1: 'Torggata 3', adresse2: 'Stavanger' },
  { id: '5', ordrenummer: '478923', dato: '8. juni 2023', rekv: 'REK-005', projekt: 'Prosjekt Oslo', adresse1: 'Nedre gate 22', adresse2: 'Kristiansand' },
  { id: '6', ordrenummer: '556789', dato: '7. juni 2023', rekv: 'REK-006', projekt: 'Hytteutbygging', adresse1: 'Østgata 5', adresse2: 'Fredrikstad' },
  { id: '7', ordrenummer: '667234', dato: '6. juni 2023', rekv: 'REK-007', projekt: 'NT8', adresse1: 'Vestneset 12', adresse2: 'Tromsø' },
  { id: '8', ordrenummer: '701234', dato: '5. juni 2023', rekv: 'REK-008', projekt: 'Renovering', adresse1: 'Sentergata 9', adresse2: 'Lillehammer' },
  { id: '9', ordrenummer: '812456', dato: '4. juni 2023', rekv: 'REK-009', projekt: 'NT9', adresse1: 'Fv. Langseth gt 11', adresse2: 'Hamar' },
  { id: '10', ordrenummer: '934567', dato: '3. juni 2023', rekv: 'REK-010', projekt: 'Terrasse', adresse1: 'Arkitekt Wies gt 4', adresse2: 'Gjøvik' },
];

function IconOrders() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Orders">
      <div className="absolute left-0 size-[24px] top-0" data-name="Icon Plate" />
      <div className="absolute inset-[6.05%_14.84%]" data-name="Group">
        <div className="absolute inset-[-3.56%_-4.44%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 23">
            <g id="Group">
              <path d="M4.96885 9.9H13.4063" id="Vector" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M4.96885 13.4156H13.4063" id="Vector_2" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d="M4.96885 16.9312H13.4063" id="Vector_3" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d={svgPaths.p2c632f00} id="Vector_4" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              <path d={svgPaths.p3f1fb500} id="Vector_5" stroke="black" strokeWidth="1.5" />
              <path d={svgPaths.p45f2e80} id="Vector_6" stroke="black" strokeWidth="1.5" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function IconSearch() {
  return (
    <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
      <div className="absolute left-0 size-[57.6px] top-0" data-name="Icon Plate" />
      <div className="absolute bottom-[2.05%] left-0 right-0 top-0">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
          <g id="Group 3">
            <path clipRule="evenodd" d={svgPaths.p2d8c2380} fill="#090914" fillRule="evenodd" id="Vector (Stroke)" />
            <path clipRule="evenodd" d={svgPaths.p3d995300} fill="#090914" fillRule="evenodd" id="Vector (Stroke)_2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export function HovedordreModal({ isOpen, onClose, onSelect }: HovedordreModalProps) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    if (!searchQuery.trim()) return mockHovedordrer;

    const query = searchQuery.toLowerCase();
    return mockHovedordrer.filter(order =>
      order.ordrenummer.toLowerCase().includes(query) ||
      order.rekv.toLowerCase().includes(query) ||
      order.projekt.toLowerCase().includes(query) ||
      order.adresse1.toLowerCase().includes(query) ||
      order.adresse2?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSelect = () => {
    if (selectedOrderId) {
      const order = mockHovedordrer.find(o => o.id === selectedOrderId);
      if (order) {
        onSelect(order);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[5px] w-full max-w-[968px] h-[600px] flex flex-col overflow-hidden shadow-[2px_2px_4px_0px_rgba(126,126,126,0.06),3px_10px_15px_0px_rgba(126,126,126,0.06)]">
        {/* Header */}
        <div className="bg-white relative shrink-0 w-full" data-name="Module header">
          <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1.461px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-col justify-center size-full">
            <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-[20px] py-[22px] relative w-full">
              <div className="flex items-center gap-[11px]">
                <IconOrders />
                <p className="font-bold leading-[1.3] text-[#22222c] text-[15px] text-nowrap whitespace-pre">{t('hovedordre')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[7px] items-start pb-[15px] pt-[20px] px-[20px] relative w-full">
              <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Input and label">
                <p className="[grid-area:1_/_1] font-bold leading-[1.75] ml-px mt-0 relative text-[#22222c] text-[14px]">{t('searchMainOrder')}</p>
                <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[6px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] w-[300px]" data-name="Textfield/Normal">
                  <div
                    aria-hidden="true"
                    className={`absolute border-2 border-solid inset-0 pointer-events-none rounded-[5px] ${searchQuery ? 'border-[#0d97fc]' : 'border-[#d5d5d7]'}`}
                    style={searchQuery ? { boxShadow: '2px 2px 3px 0px inset rgba(0,0,0,0.1)' } : {}}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchMainOrderPlaceholder')}
                    className="basis-0 font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-[#6b6b72] text-[14px] bg-transparent border-none outline-none placeholder:text-[#6b6b72]"
                  />
                  <IconSearch />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[20px] pr-0 py-0 relative shrink-0 pb-[10px]">
          <div className="font-medium h-[15px] leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap w-full">
            <div className="absolute flex flex-col justify-center left-[0px] top-[7.5px] translate-y-[-50%]">
              <p className="leading-[normal] text-nowrap whitespace-pre">Ordrenummer</p>
            </div>
            <div className="absolute flex flex-col justify-center left-[120px] top-[7.5px] translate-y-[-50%]">
              <p className="leading-[normal] text-nowrap whitespace-pre">Dato</p>
            </div>
            <div className="absolute flex flex-col justify-center left-[200px] top-[7.5px] translate-y-[-50%]">
              <p className="leading-[normal] text-nowrap whitespace-pre">Rekv.</p>
            </div>
            <div className="absolute flex flex-col justify-center left-[280px] top-[7.5px] translate-y-[-50%]">
              <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt</p>
            </div>
            <div className="absolute flex flex-col justify-center left-[420px] top-[7.5px] translate-y-[-50%]">
              <p className="leading-[normal] text-nowrap whitespace-pre">Adresse 1</p>
            </div>
            <div className="absolute flex flex-col justify-center left-[590px] top-[7.5px] translate-y-[-50%]">
              <p className="leading-[normal] text-nowrap whitespace-pre">Adresse 2</p>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto px-[20px] pb-[20px] min-h-0">
          {filteredOrders.length === 0 ? (
            <div className="flex items-center justify-center h-[200px]">
              <p className="font-normal text-[#6b6b72] text-[14px]">
                {t('noOrdersFound')}
              </p>
            </div>
          ) : (
            <div className="content-stretch flex flex-col gap-[10px] items-start relative w-full">
              {filteredOrders.map((order) => {
                const isSelected = selectedOrderId === order.id;
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrderId(order.id)}
                    className={`bg-white box-border content-stretch flex gap-[5px] items-center justify-between px-[15px] py-[12px] relative rounded-[5px] shrink-0 w-full cursor-pointer transition-colors ${
                      isSelected ? 'bg-blue-50 border border-[#0d97fc]' : 'border border-[#d5d5d7] hover:bg-gray-50'
                    }`}
                    data-name="Orderrow"
                  >
                    <div className="font-normal text-[#22222c] text-[14px] text-nowrap w-[100px]">
                      {order.ordrenummer}
                    </div>
                    <div className="font-normal text-[#6b6b72] text-[12px] text-nowrap w-[70px]">
                      {order.dato}
                    </div>
                    <div className="font-normal text-[#22222c] text-[14px] text-nowrap w-[60px]">
                      {order.rekv}
                    </div>
                    <div className="font-normal text-[#22222c] text-[14px] text-nowrap flex-1 min-w-[120px]">
                      {order.projekt}
                    </div>
                    <div className="font-normal text-[#22222c] text-[14px] text-nowrap flex-1 min-w-[150px]">
                      {order.adresse1}
                    </div>
                    <div className="font-normal text-[#6b6b72] text-[12px] text-nowrap flex-1 min-w-[150px]">
                      {order.adresse2 || ''}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative shrink-0 w-full border-t border-[#e6e6e8]">
          <div className="flex flex-row items-center justify-between size-full px-[20px] py-[20px]">
            <button
              onClick={onClose}
              className="bg-white box-border content-stretch flex gap-[8px] h-[48px] items-center px-[20px] py-[6px] relative rounded-[5px] shrink-0 hover:bg-gray-50 transition-colors"
              data-name="Button"
            >
              <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
              <p className="font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[15px] text-nowrap whitespace-pre">{t('cancel')}</p>
            </button>
            <button
              onClick={handleSelect}
              disabled={!selectedOrderId}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--text-lg)',
                lineHeight: 1.75,
                height: 48,
                padding: '6px 20px',
                borderRadius: 'var(--radius)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                whiteSpace: 'nowrap',
                transition: 'background 0.15s',
                background: selectedOrderId ? 'var(--primary)' : 'var(--secondary)',
                color: selectedOrderId ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                opacity: selectedOrderId ? 1 : 0.6,
                cursor: selectedOrderId ? 'pointer' : 'not-allowed',
              }}
              data-name="Button"
            >
              {t('fetchMainOrder')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

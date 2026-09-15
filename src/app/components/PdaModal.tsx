import { useState, useEffect } from 'react';
import svgPaths from "../imports/svg-yzk1u5sjyl";
import img from "figma:asset/dc3aad517ab9f61fffb0eba3fbe67e248d89a489.png";

// Mock data for expeditions
const mockExpeditions = [
  {
    id: 1,
    seller: 'AK',
    time: 'I dag, 14:56',
    customer: 'Eventyrslottet AS',
    project: 'Prosjekt A',
    reference: 'Tor',
    itemCount: 3,
    total: '1 449,90',
    items: [
      { name: 'Beslagsskrue 5,0x40 CS A-250 Corrseal', sku: '23083603', quantity: 3, unit: 'PAK', price: 179.00, discount: 10, total: 483.30, originalTotal: 537.00 },
      { name: 'Beslagsskrue 5,0x40 CS A-250 Corrseal', sku: '23083603', quantity: 3, unit: 'PAK', price: 179.00, discount: 10, total: 483.30, originalTotal: 537.00 },
      { name: 'Beslagsskrue 5,0x40 CS A-250 Corrseal', sku: '23083603', quantity: 3, unit: 'PAK', price: 179.00, discount: 10, total: 483.30, originalTotal: 537.00 },
    ]
  },
  {
    id: 2,
    seller: 'EGTTEW',
    time: 'I dag, 14:56',
    customer: 'Eventyrslottet AS',
    project: 'Brennerigata 43A, bygg B',
    reference: '',
    itemCount: 2,
    total: '966,60',
    items: [
      { name: 'Beslagsskrue 5,0x40 CS A-250 Corrseal', sku: '23083603', quantity: 3, unit: 'PAK', price: 179.00, discount: 10, total: 483.30, originalTotal: 537.00 },
      { name: 'Beslagsskrue 5,0x40 CS A-250 Corrseal', sku: '23083603', quantity: 3, unit: 'PAK', price: 179.00, discount: 10, total: 483.30, originalTotal: 537.00 },
    ]
  },
  {
    id: 3,
    seller: 'AK',
    time: 'I dag, 14:56',
    customer: 'Eventyrslottet AS',
    project: 'Prosjekt A',
    reference: 'Tor',
    itemCount: 2,
    total: '850,00',
    items: [
      { name: 'Gipsplate 13mm 120x240', sku: '12345678', quantity: 5, unit: 'STK', price: 150.00, discount: 0, total: 750.00 },
      { name: 'Skrueset universal', sku: '87654321', quantity: 2, unit: 'PAK', price: 50.00, discount: 0, total: 100.00 },
    ]
  },
  {
    id: 4,
    seller: 'AK',
    time: 'I dag, 14:56',
    customer: 'Kunde uten konto',
    project: '',
    reference: 'KJ12312',
    itemCount: 3,
    total: '2 340,00',
    items: [
      { name: 'Lafteaktig 30x180 Sibirsk Lerk', sku: '99887766', quantity: 10, unit: 'STK', price: 220.00, discount: 5, total: 2090.00, originalTotal: 2200.00 },
      { name: 'Terrasseskrue 5x70', sku: '55443322', quantity: 1, unit: 'PAK', price: 250.00, discount: 0, total: 250.00 },
    ]
  },
  {
    id: 5,
    seller: 'AK',
    time: 'I dag, 13:22',
    customer: 'Eventyrslottet AS',
    project: 'Prosjekt A',
    reference: 'Tor',
    itemCount: 4,
    total: '3 120,00',
    items: [
      { name: 'Isolasjon Glava 150mm', sku: '11223344', quantity: 12, unit: 'M2', price: 85.00, discount: 0, total: 1020.00 },
      { name: 'Plastfolie 4x50m', sku: '44556677', quantity: 2, unit: 'RUL', price: 350.00, discount: 10, total: 630.00, originalTotal: 700.00 },
      { name: 'Tape 50mm hvit', sku: '77889900', quantity: 5, unit: 'STK', price: 45.00, discount: 0, total: 225.00 },
      { name: 'Plugger 8x60', sku: '00998877', quantity: 5, unit: 'PAK', price: 49.00, discount: 0, total: 245.00 },
    ]
  },
  {
    id: 6,
    seller: 'AK',
    time: 'I dag, 12:15',
    customer: 'Eventyrslottet AS',
    project: 'Prosjekt A',
    reference: '',
    itemCount: 2,
    total: '1 680,00',
    items: [
      { name: 'Panel furu 14x120', sku: '33221100', quantity: 20, unit: 'STK', price: 75.00, discount: 0, total: 1500.00 },
      { name: 'Panelskrue 3,5x42', sku: '66554433', quantity: 2, unit: 'PAK', price: 90.00, discount: 0, total: 180.00 },
    ]
  },
  {
    id: 7,
    seller: 'AK',
    time: 'I går, 16:45',
    customer: 'Eventyrslottet AS',
    project: 'Prosjekt A',
    reference: 'Tor',
    itemCount: 1,
    total: '429,00',
    items: [
      { name: 'Sement Norcem Standard 25kg', sku: '22334455', quantity: 6, unit: 'STK', price: 78.00, discount: 8, total: 429.00, originalTotal: 468.00 },
    ]
  },
  {
    id: 8,
    seller: 'AK',
    time: 'I går, 15:30',
    customer: 'Eventyrslottet AS',
    project: 'Prosjekt A',
    reference: 'Tor',
    itemCount: 3,
    total: '2 567,00',
    items: [
      { name: 'Vindusplate MDF hvit 18x240', sku: '88776655', quantity: 8, unit: 'STK', price: 125.00, discount: 0, total: 1000.00 },
      { name: 'Listverk buet 12x42', sku: '11335577', quantity: 15, unit: 'STK', price: 89.00, discount: 5, total: 1267.25, originalTotal: 1335.00 },
      { name: 'Beis teak 3L', sku: '99112233', quantity: 2, unit: 'STK', price: 150.00, discount: 0, total: 300.00 },
    ]
  },
];

interface PdaModalProps {
  onClose: () => void;
  onFetchExpedition: (items: any[]) => void;
}

export function PdaModal({ onClose, onFetchExpedition }: PdaModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExpeditionId, setSelectedExpeditionId] = useState<number | null>(2);
  const [expandedExpeditionId, setExpandedExpeditionId] = useState<number | null>(2);

  const handleFetch = () => {
    const selectedExpedition = mockExpeditions.find(exp => exp.id === selectedExpeditionId);
    if (selectedExpedition && selectedExpedition.items) {
      // Pass the full expedition object with all details
      onFetchExpedition({
        items: selectedExpedition.items,
        time: selectedExpedition.time,
        customer: selectedExpedition.customer,
        project: selectedExpedition.project,
        seller: selectedExpedition.seller,
        reference: selectedExpedition.reference
      });
      onClose();
    }
  };

  const filteredExpeditions = mockExpeditions.filter(exp => 
    exp.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exp.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (exp.reference && exp.reference.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1024px] h-[758px] z-50">
        <div className="bg-neutral-50 relative shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] size-full">
          
          {/* Header */}
          <div className="absolute content-stretch flex flex-col items-center left-0 top-0 w-[1024px]">
            <div className="bg-white relative shrink-0 w-full">
              <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1.461px] border-solid inset-0 pointer-events-none" />
              <div className="flex flex-col justify-center size-full">
                <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-[20px] py-[22px] relative w-full">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                    <div className="[grid-area:1_/_1] ml-0 mt-0 relative size-[24px]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g>
                          <path d={svgPaths.p9a07500} stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d="M4.375 18H16.375" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d={svgPaths.p2e2a0e90} stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                          <path d={svgPaths.p39b9bc00} stroke="var(--stroke-0, #42424A)" strokeWidth="1.5" />
                          <path d={svgPaths.p3ede7580} stroke="var(--stroke-0, #42424A)" strokeWidth="1.5" />
                          <g>
                            <path d={svgPaths.p21edb020} stroke="var(--stroke-0, #42424A)" strokeWidth="1.5" />
                            <path d={svgPaths.p23f2e320} stroke="var(--stroke-0, #42424A)" strokeWidth="1.5" />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <p className="[grid-area:1_/_1] font-bold leading-[1.3] ml-[35px] mt-[3.086px] relative text-[#22222c] text-[15px] text-nowrap whitespace-pre">Hent ekspedisjon fra håndterminal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="absolute h-[632px] left-0 overflow-x-clip overflow-y-auto top-[68px] w-[1024px]">
            <div className="relative bg-white content-stretch flex flex-col items-start mx-[15px] my-[15px] rounded-[5px] w-[994px]">
              <div aria-hidden="true" className="absolute border border-[#e6e6e8] border-solid inset-0 pointer-events-none rounded-[5px]" />
              
              {/* Search Field */}
              <div className="relative shrink-0 w-full">
                <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col gap-[7px] items-start pb-[25px] pt-[20px] px-[20px] relative w-full">
                    <div className="content-stretch flex gap-[40px] items-start relative shrink-0">
                      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
                        <p className="[grid-area:1_/_1] font-bold leading-[1.75] ml-px mt-0 relative text-[#22222c] text-[14px] w-[124px]">Ekspedisjon</p>
                        <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[6px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] w-[300px]">
                          <div aria-hidden="true" className={`absolute border-2 ${searchQuery ? 'border-[#0d97fc]' : 'border-[#d5d5d7]'} border-solid inset-0 pointer-events-none rounded-[5px]`} />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Søk på mobilnr, navn eller kundenr"
                            className="basis-0 font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-[#6b6b72] text-[14px] bg-transparent border-none outline-none focus:opacity-100 placeholder:text-[#6b6b72]"
                          />
                          <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]">
                            <div className="absolute bottom-[2.05%] left-0 right-0 top-0">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                                <g>
                                  <path clipRule="evenodd" d={svgPaths.p2d8c2380} fill="var(--fill-0, #090914)" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={svgPaths.p3d995300} fill="var(--fill-0, #090914)" fillRule="evenodd" />
                                </g>
                              </svg>
                            </div>
                          </div>
                          <div className="absolute inset-0 pointer-events-none shadow-[2px_2px_3px_0px_inset_rgba(0,0,0,0.1)]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expedition List */}
              <div className="relative shrink-0 w-full">
                <div className="size-full">
                  <div className="box-border content-stretch flex flex-col items-start px-[15px] py-0 relative w-full">
                    {/* Table Header */}
                    <div className="box-border content-stretch flex items-start overflow-clip pb-[10px] pt-0 px-0 relative rounded-[5px] shrink-0 w-[963px]">
                      <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[44px]" />
                      <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[85px]">
                        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                          <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                            <p className="leading-[normal] whitespace-pre">Selger</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[183px]">
                        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                          <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                            <p className="leading-[normal] whitespace-pre">Kunde</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[549px]">
                        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                          <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                            <p className="leading-[normal] whitespace-pre">Referanse</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[74px]">
                        <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                          <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap text-right">
                            <p className="leading-[normal] whitespace-pre">Sum</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expedition Rows */}
                    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
                      {filteredExpeditions.map((expedition) => (
                        <ExpeditionRow
                          key={expedition.id}
                          expedition={expedition}
                          isSelected={selectedExpeditionId === expedition.id}
                          isExpanded={expandedExpeditionId === expedition.id}
                          onSelect={() => setSelectedExpeditionId(expedition.id)}
                          onToggleExpand={() => setExpandedExpeditionId(expandedExpeditionId === expedition.id ? null : expedition.id)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute flex items-center justify-center left-0 top-[690px] w-[1024px]">
            <div className="flex-none rotate-[180deg]">
              <div className="bg-white relative w-[1024px]">
                <div className="box-border content-stretch flex gap-[10px] isolate items-start justify-end overflow-clip p-[15px] relative rounded-[inherit] w-[1024px]">
                  <div className="flex items-center justify-center relative shrink-0 z-[1]">
                    <div className="flex-none rotate-[180deg]">
                      <div className="content-stretch flex gap-[15px] items-center relative">
                        <button 
                          onClick={handleFetch}
                          disabled={!selectedExpeditionId}
                          style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: 'var(--text-lg)',
                            lineHeight: 1.75,
                            height: 48,
                            minWidth: 100,
                            padding: '6px 20px',
                            borderRadius: 'var(--radius)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 10,
                            whiteSpace: 'nowrap',
                            background: selectedExpeditionId ? 'var(--primary)' : 'var(--secondary)',
                            color: selectedExpeditionId ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                            opacity: selectedExpeditionId ? 1 : 0.6,
                            cursor: selectedExpeditionId ? 'pointer' : 'not-allowed',
                          }}
                        >
                          Hent for betaling
                        </button>
                        <button 
                          onClick={onClose}
                          className="bg-white box-border content-stretch cursor-pointer flex gap-[8px] h-[48px] items-center justify-center min-w-[100px] overflow-visible px-[20px] py-[6px] relative rounded-[5px] shrink-0"
                        >
                          <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                          <p className="font-semibold leading-[1.75] relative shrink-0 text-[#090914] text-[13px] text-nowrap whitespace-pre">Avbryt</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none shadow-[0px_4px_4px_0px_rgba(0,0,0,0.03)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ExpeditionRow({ expedition, isSelected, isExpanded, onSelect, onToggleExpand }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`relative rounded-[5px] shrink-0 w-full`}>
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] w-full">
        {isExpanded && expedition.items && (
          <>
            <div className="absolute bg-sky-50 h-[62px] left-0 right-0 top-0" />
            <div className="absolute bg-neutral-50 left-px right-px top-[63px] bottom-0" />
          </>
        )}
        
        {/* Main Row - Clickable for accordion */}
        <button 
          onClick={onToggleExpand}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`flex items-center w-full cursor-pointer transition-colors ${
            isExpanded ? 'bg-sky-50' : isHovered ? 'bg-sky-50' : ''
          } relative shrink-0`}
        >
          <div 
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 cursor-pointer"
          >
            <div className="relative shrink-0 size-[24px]">
              {isSelected ? (
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" fill="#0D97FC" r="12" />
                  <circle cx="12" cy="12" fill="white" r="5" />
                </svg>
              ) : (
                <>
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" fill="white" r="11.5" stroke="#D5D5D7" />
                  </svg>
                  <div className="absolute inset-[8.333%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" fill="white" r="10" />
                    </svg>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[85px]">
            <div className="font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
              <div className={`[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[26.5px] relative text-[12px] translate-y-[-50%] text-[#42424a]`}>
                <p className="leading-[normal] text-nowrap whitespace-pre">{expedition.time}</p>
              </div>
              <div className={`[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[14px] translate-y-[-50%] ${isSelected && isExpanded ? 'text-[#909095]' : 'text-[#1a1b1f]'}`}>
                <p className="leading-[normal] text-nowrap whitespace-pre">{expedition.seller}</p>
              </div>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[182px]">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
              {expedition.project && (
                <div className={`[grid-area:1_/_1] flex flex-col font-normal justify-center ml-0 mt-[26.5px] relative text-[12px] translate-y-[-50%] text-[#42424a]`}>
                  <p className="leading-[normal] text-nowrap whitespace-pre">{expedition.project}</p>
                </div>
              )}
              <div className={`[grid-area:1_/_1] flex flex-col font-medium justify-center ml-0 mt-[8.5px] relative text-[14px] translate-y-[-50%] ${isSelected && isExpanded ? 'text-[#909095]' : 'text-[#1a1b1f]'}`}>
                <p className="leading-[normal] text-nowrap whitespace-pre">{expedition.customer}</p>
              </div>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-start justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[469px]">
            {expedition.reference && (
              <div className="flex flex-col font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
                <p className="leading-[normal] whitespace-pre">{expedition.reference}</p>
              </div>
            )}
          </div>

          <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]">
            {expedition.itemCount && !isExpanded && (
              <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
                <p className="leading-[normal] whitespace-pre">{expedition.itemCount} varelinjer</p>
              </div>
            )}
          </div>

          <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[62px] items-end justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[78px]">
            <div className={`flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[14px] text-nowrap ${isSelected && isExpanded ? 'text-[#909095]' : 'text-[#1a1b1f]'}`}>
              <p className="leading-[normal] whitespace-pre">{expedition.total}</p>
            </div>
          </div>
        </button>

        {/* Expand/Collapse Arrow */}
        <div className={`absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] pointer-events-none ${isExpanded ? 'top-[21px]' : 'top-[calc(50%+0.5px)] translate-y-[-50%]'}`}>
          <div className="flex items-center justify-center relative shrink-0">
            <div className={`flex-none ${isExpanded ? 'scale-y-[-100%]' : ''}`}>
              <div className="overflow-clip relative size-[14px]">
                <div className="absolute bottom-[19.5%] left-0 right-0 top-[18.75%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 9">
                    <path d={svgPaths.p1bf14e00} fill="#6B6B72" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expanded Item Details */}
        {isExpanded && expedition.items && (
          <div className="content-stretch flex flex-col items-start justify-center relative shrink-0 w-full z-10">
            {/* Items Header */}
            <div className="relative shrink-0 w-full">
              <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
                <div className="basis-0 bg-[rgba(255,255,255,0)] grow h-[28px] min-h-px min-w-px relative shrink-0">
                  <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
                    <div className="box-border content-stretch flex flex-col h-[28px] items-start justify-end px-[10px] py-0 relative w-full">
                      <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                        <p className="leading-[normal] whitespace-pre">Varenavn</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[85px]">
                  <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Antall</p>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[82px]">
                  <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Per enhet</p>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-start justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[54px]">
                  <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Rabatt</p>
                  </div>
                </div>
                <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip pl-[30px] pr-[40px] py-0 relative shrink-0 w-[102px]">
                  <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                    <p className="leading-[normal] whitespace-pre">Totalt</p>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
            </div>

            {/* Item Rows */}
            {expedition.items.map((item: any, idx: number) => (
              <div key={idx} className="relative shrink-0 w-full">
                <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
                  <div className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0">
                    <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
                      <div className="box-border content-stretch flex flex-col items-start justify-center px-[10px] py-[5px] relative w-full">
                        <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#1a1b1f] text-[0px] text-nowrap">
                          <p className="leading-[19px] whitespace-pre">
                            <span className="font-medium text-[14px]">{item.name}</span>
                            <span className="text-[14px]"><br aria-hidden="true" /></span>
                            <span className="text-[#6b6b72] text-[12px]">{item.sku}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-end justify-center px-[10px] py-[5px] relative shrink-0 w-[85px]">
                    <div className="content-stretch flex gap-[5px] h-[40px] items-center relative shrink-0">
                      <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#090914] text-[14px] text-nowrap">
                        <p className="leading-[1.38] whitespace-pre">{item.quantity.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#1a1b1f] text-[14px] text-nowrap">
                        <p className="leading-[normal] whitespace-pre">{item.unit}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-end justify-center px-[10px] py-[5px] relative shrink-0 w-[82px]">
                    <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#090914] text-[14px] text-nowrap">
                      <p className="leading-[1.38] whitespace-pre">{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-end justify-center overflow-clip pl-[10px] pr-[4px] py-[5px] relative shrink-0 w-[54px]">
                    <div className="content-stretch flex gap-[3px] items-center leading-[0] relative shrink-0 text-nowrap">
                      <div className="flex flex-col font-normal justify-center relative shrink-0 text-[#090914] text-[14px]">
                        <p className="leading-[1.38] text-nowrap whitespace-pre">{item.discount}</p>
                      </div>
                      <div className="flex flex-col font-semibold justify-center relative shrink-0 text-[#42424a] text-[12px]">
                        <p className="leading-[1.38] text-nowrap whitespace-pre">%</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-end justify-center overflow-clip pl-[30px] pr-[40px] py-[5px] relative shrink-0 w-[102px]">
                    <div className="flex flex-col font-medium justify-center leading-[19px] relative shrink-0 text-[#1a1b1f] text-[0px] text-nowrap text-right whitespace-pre">
                      <p className="mb-0 text-[14px]">{item.total.toFixed(2)}</p>
                      {item.originalTotal && item.originalTotal !== item.total && (
                        <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-normal line-through text-[#6b6b72] text-[12px]">{item.originalTotal.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
      <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
    </div>
  );
}
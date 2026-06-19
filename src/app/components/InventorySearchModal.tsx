import React, { useState, useRef, useEffect } from 'react';
import svgPaths from "../imports/svg-cyizkdbmkk";
import { useLanguage } from '../contexts/LanguageContext';

function Group3() {
  return (
    <div className="absolute bottom-[0.01%] left-0 right-0 top-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p12a2d640} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.pb06def0} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_2" />
          <path clipRule="evenodd" d={svgPaths.p9473200} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_3" />
          <path clipRule="evenodd" d={svgPaths.p3c2a6d00} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_4" />
          <path clipRule="evenodd" d={svgPaths.p3d2d8400} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_5" />
          <path clipRule="evenodd" d={svgPaths.p109fd700} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_6" />
          <path clipRule="evenodd" d={svgPaths.p144b3880} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_7" />
          <path clipRule="evenodd" d={svgPaths.p23720400} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_8" />
          <path clipRule="evenodd" d={svgPaths.p1b349c80} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_9" />
        </g>
      </svg>
    </div>
  );
}

interface InventoryItem {
  id: number;
  varenr: string;
  varetekst: string;
  leverandor: string;
  pris: string;
  beholdning: string | null;
  info: string[];
  isNonStock: boolean;
}

/**
 * Data produced by a fake article/product barcode scan (Ctrl+- when the
 * inventory search modal is open). Exported so RootLayout can type the state.
 */
export interface ScannedArticleData {
  /** Article / product number to look up */
  varenr: string;
  /** Optional pre-set quantity from the scanner */
  quantity?: number;
  /** Raw barcode string (for audit / display) */
  barcode?: string;
}

interface InventorySearchModalProps {
  onClose: () => void;
  onAddItems: (items: InventoryItem[]) => void;
  initialSearchValue?: string;
  /** Pre-populated data from a barcode scan (Ctrl+- shortcut) */
  scannedArticleData?: ScannedArticleData | null;
  /** Called once the scanned data has been applied to the form */
  onArticleDataProcessed?: () => void;
}

const mockItems: InventoryItem[] = [
  { id: 469650132, varenr: '469650132', varetekst: 'ADAPTER GDE 16 PLUS FOR BORHAMMER', leverandor: 'BOSCH ROBERT AS', pris: '29,50 kr / STK', beholdning: '99 STK', info: ['Nordic Swan Ecolabel'], isNonStock: false },
  { id: 521954131, varenr: '521954131', varetekst: 'BORHAMMER GBH 18V-20 SOLO L-BOXX', leverandor: 'Eikås Sagbruk AS', pris: '22,75 kr / STK', beholdning: '67 STK', info: ['PEFC certificate'], isNonStock: false },
  { id: 516804172, varenr: '516804172', varetekst: 'BORHAMMER GBH 18V-26 SOLO L-BOXX LEVERES UTEN BATTERI OG LADER', leverandor: 'BOSCH ROBERT AS', pris: '31,00 kr / STK', beholdning: '48 STK', info: ['FSC Certified', 'EU Ecolabel'], isNonStock: false },
  { id: 565151585, varenr: '565151585', varetekst: 'BORHAMMER GBH 18V-34 CF SOLO BITURBO', leverandor: 'Eikås Sagbruk AS', pris: '24,90 kr / STK', beholdning: 'Not in stock', info: ['Non-stock', 'Expires 22.11.2023'], isNonStock: true },
  { id: 565151588, varenr: '565151588', varetekst: 'BORHAMMER GBH 18V-36 C SOLO CASE BITURBO', leverandor: 'Eikås Sagbruk AS', pris: '27,30 kr / STK', beholdning: '78 STK', info: ['Expires 10.09.2023'], isNonStock: false },
  { id: 56082645, varenr: '56082645', varetekst: 'Avslutningslist alu sølv 2M alloc dim 200x20x18mm', leverandor: 'Alloc AS', pris: '25,60 kr / STK', beholdning: '76 STK', info: ['Non-stock', 'Expires 10.09.2023', 'Nordic Swan Ecolabel', 'PEFC certificate'], isNonStock: true },
  { id: 789012345, varenr: '789012345', varetekst: 'BORHAMMER GBH 24V-32 PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '45,00 kr / STK', beholdning: null, info: ['FSC Certified'], isNonStock: false },
  { id: 890123456, varenr: '890123456', varetekst: 'DRILL BIT SET 15PC HSS-G', leverandor: 'Eikås Sagbruk AS', pris: '18,90 kr / STK', beholdning: null, info: ['Non-stock', 'Expires 15.03.2024'], isNonStock: true },
  { id: 901234567, varenr: '901234567', varetekst: 'IMPACT WRENCH 18V SOLO', leverandor: 'BOSCH ROBERT AS', pris: '52,50 kr / STK', beholdning: null, info: ['EU Ecolabel'], isNonStock: false },
  { id: 912345678, varenr: '912345678', varetekst: 'CIRCULAR SAW BLADE 190MM', leverandor: 'Alloc AS', pris: '35,20 kr / STK', beholdning: null, info: ['PEFC certificate', 'FSC Certified'], isNonStock: false },
  { id: 923456789, varenr: '923456789', varetekst: 'SANDING DISC 125MM P120', leverandor: 'Eikås Sagbruk AS', pris: '12,40 kr / STK', beholdning: null, info: ['Non-stock'], isNonStock: true },
  { id: 934567890, varenr: '934567890', varetekst: 'MEASURING TAPE 5M PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '28,75 kr / STK', beholdning: null, info: ['Nordic Swan Ecolabel', 'PEFC certificate'], isNonStock: false },
  { id: 945678901, varenr: '945678901', varetekst: 'HAMMER DRILL BIT SET 8PC SDS-PLUS', leverandor: 'BOSCH ROBERT AS', pris: '38,90 kr / STK', beholdning: null, info: ['Expires 18.07.2024'], isNonStock: false },
  { id: 956789012, varenr: '956789012', varetekst: 'WOOD CHISEL SET 6PC PROFESSIONAL', leverandor: 'Eikås Sagbruk AS', pris: '42,50 kr / STK', beholdning: null, info: ['Non-stock', 'EU Ecolabel'], isNonStock: true },
  { id: 967890123, varenr: '967890123', varetekst: 'PLANER GHO 26-82 D PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '55,00 kr / STK', beholdning: null, info: ['FSC Certified'], isNonStock: false },
  { id: 978901234, varenr: '978901234', varetekst: 'RECIPROCATING SAW GSA 18V-32', leverandor: 'BOSCH ROBERT AS', pris: '48,25 kr / STK', beholdning: null, info: ['Nordic Swan Ecolabel'], isNonStock: false },
  { id: 989012345, varenr: '989012345', varetekst: 'ROUTER GOF 1600 CE PROFESSIONAL', leverandor: 'Eikås Sagbruk AS', pris: '62,80 kr / STK', beholdning: null, info: ['Non-stock', 'Expires 05.12.2023'], isNonStock: true },
  { id: 990123456, varenr: '990123456', varetekst: 'BELT SANDER PBS 75 AE SET', leverandor: 'BOSCH ROBERT AS', pris: '44,90 kr / STK', beholdning: null, info: ['PEFC certificate'], isNonStock: false },
  { id: 991234567, varenr: '991234567', varetekst: 'ORBITAL SANDER GEX 125-1 AE', leverandor: 'Alloc AS', pris: '36,75 kr / STK', beholdning: null, info: ['EU Ecolabel', 'FSC Certified'], isNonStock: false },
  { id: 992345678, varenr: '992345678', varetekst: 'HEAT GUN GHG 23-66 PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '41,20 kr / STK', beholdning: null, info: ['Non-stock'], isNonStock: true },
  { id: 1001234567, varenr: '1001234567', varetekst: 'JIGSAW GST 160 BCE PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '33,40 kr / STK', beholdning: null, info: ['Non-stock', 'Nordic Swan Ecolabel'], isNonStock: true },
  { id: 1002345678, varenr: '1002345678', varetekst: 'ANGLE GRINDER GWS 19-125 CI', leverandor: 'Eikås Sagbruk AS', pris: '39,80 kr / STK', beholdning: null, info: ['Non-stock', 'Expires 22.11.2023'], isNonStock: true },
  { id: 1003456789, varenr: '1003456789', varetekst: 'MULTI-TOOL GOP 12V-28 SOLO', leverandor: 'Alloc AS', pris: '47,60 kr / STK', beholdning: null, info: ['Non-stock', 'PEFC certificate'], isNonStock: true }
];

export function InventorySearchModal({ onClose, onAddItems, initialSearchValue = '', scannedArticleData = null, onArticleDataProcessed = () => {} }: InventorySearchModalProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    multipleLines: true,
    nonStock: true
  });
  
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set([516804172]));
  const [loadedDetails, setLoadedDetails] = useState<Set<number>>(new Set([469650132, 521954131, 516804172, 565151588]));
  const [loadedStockAmounts, setLoadedStockAmounts] = useState<Record<number, string>>({});
  const [visibleItems, setVisibleItems] = useState(10);
  const [searchQuery, setSearchQuery] = useState(initialSearchValue);
  const [searchFocused, setSearchFocused] = useState(initialSearchValue.length > 0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      setVisibleItems(prev => Math.min(prev + 5, mockItems.length));
    }
  };

  const toggleFilter = (filterName: 'multipleLines' | 'nonStock') => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const toggleSelection = (id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const loadDetails = (id: number) => {
    const randomStock = Math.floor(Math.random() * 141) + 10;
    
    setLoadedStockAmounts(prev => ({
      ...prev,
      [id]: `${randomStock} STK`
    }));
    
    setLoadedDetails(prev => new Set([...prev, id]));
  };

  const bulkLoadInventory = () => {
    displayedItems.forEach(item => {
      if (!loadedDetails.has(item.id)) {
        loadDetails(item.id);
      }
    });
  };

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.varenr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.varetekst.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leverandor.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (!filters.nonStock) {
      if (item.isNonStock || (item.info && item.info.includes('Non-stock'))) {
        return false;
      }
    }
    
    return true;
  });

  const displayedItems = filteredItems.slice(0, visibleItems);
  const hasSelection = selectedItems.size > 0;

  const handleAddItems = () => {
    const itemsToAdd = mockItems.filter(item => selectedItems.has(item.id));
    onAddItems(itemsToAdd);
    onClose();
  };

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

  // ─── Article scan auto-populate ──────────────────────────────────────────────
  // Runs once when scannedArticleData arrives (Ctrl+- while inventory modal is
  // open). Filters the list to the scanned varenr and auto-selects the item.
  useEffect(() => {
    if (!scannedArticleData) return;

    // 1. Narrow the search to the scanned article number
    setSearchQuery(scannedArticleData.varenr);

    // 2. Find and auto-select the matching item
    const match = mockItems.find(item => item.varenr === scannedArticleData.varenr);
    if (match) {
      setSelectedItems(new Set([match.id]));
      // Ensure the item is visible
      setVisibleItems(prev => Math.max(prev, mockItems.indexOf(match) + 1));
    }

    // 3. Signal the parent that we have consumed the scan data
    onArticleDataProcessed?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scannedArticleData]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40 bg-black opacity-10"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-[20px]">
        <div className="w-full max-w-[1200px] pointer-events-auto bg-neutral-50 rounded-[3px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] flex flex-col max-h-[90vh]">
          {/* Header with filters */}
          <div className="p-[20px] border-b border-[#e6e6e8]">
            <div className="flex items-center gap-[20px]">
              <label className="flex items-center gap-[10px] cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.multipleLines}
                    onChange={() => toggleFilter('multipleLines')}
                    className="sr-only peer"
                  />
                  <div className="w-[40px] h-[20px] bg-[#d5d5d7] rounded-full peer peer-checked:bg-[#0d97fc] transition-colors"></div>
                  <div className="absolute top-[2px] left-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-[20px]"></div>
                </div>
                <span className="text-[14px] text-[#42424a]">{t('addMultipleLines')}</span>
              </label>

              <label className="flex items-center gap-[10px] cursor-pointer select-none">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.nonStock}
                    onChange={() => toggleFilter('nonStock')}
                    className="sr-only peer"
                  />
                  <div className="w-[40px] h-[20px] bg-[#d5d5d7] rounded-full peer peer-checked:bg-[#0d97fc] transition-colors"></div>
                  <div className="absolute top-[2px] left-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-[20px]"></div>
                </div>
                <span className="text-[14px] text-[#42424a]">{t('includeNonStock')}</span>
              </label>

              <button
                onClick={bulkLoadInventory}
                className="px-[20px] py-[8px] text-[14px] text-[#42424a] bg-white border border-[#d5d5d7] rounded-[5px] hover:bg-[#f5f5f5] hover:border-[#6b6b72] transition-colors shadow-sm"
              >
                {t('loadStock')}
              </button>
            </div>
          </div>

          {/* Scrollable table container */}
          <div className="relative flex-1 overflow-hidden">
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="overflow-auto h-full"
            >
              <table className="w-full">
                <thead className="bg-[#fafafa] sticky top-0 z-10">
                  <tr>
                    {filters.multipleLines && <th className="px-[15px] py-[13px] w-[48px]"></th>}
                    <th className="px-[15px] py-[13px] text-left">
                      <p className="font-bold text-[12px] text-[#6b6b72] tracking-[0.5px] uppercase">{t('itemNumber')}</p>
                    </th>
                    <th className="px-[15px] py-[13px] text-left">
                      <p className="font-bold text-[12px] text-[#6b6b72] tracking-[0.5px] uppercase">{t('itemText')}</p>
                    </th>
                    <th className="px-[15px] py-[13px] text-left">
                      <p className="font-bold text-[12px] text-[#6b6b72] tracking-[0.5px] uppercase">{t('supplier')}</p>
                    </th>
                    <th className="px-[15px] py-[13px] text-left">
                      <p className="font-bold text-[12px] text-[#6b6b72] tracking-[0.5px] uppercase">{t('price')}</p>
                    </th>
                    <th className="px-[15px] py-[13px] text-left">
                      <p className="font-bold text-[12px] text-[#6b6b72] tracking-[0.5px] uppercase">{t('stock')}</p>
                    </th>
                    <th className="px-[15px] py-[13px] text-left">
                      <p className="font-bold text-[12px] text-[#6b6b72] tracking-[0.5px] uppercase">{t('info')}</p>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {displayedItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-[15px] py-[48px] text-center">
                        <p className="text-[14px] text-[#6b6b72]">{t('noItemsFound')}</p>
                      </td>
                    </tr>
                  ) : (
                    displayedItems.map((item, index) => {
                      const isLoaded = loadedDetails.has(item.id);
                      const isSelected = selectedItems.has(item.id);

                      return (
                        <tr 
                          key={item.id}
                          className={`hover:bg-[#fafafa] transition-colors border-b border-[#e6e6e8] last:border-b-0 ${isSelected ? 'bg-[#e6f4fe]' : ''}`}
                        >
                          {filters.multipleLines && (
                            <td className="px-[15px] py-[13px]">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelection(item.id)}
                                className="w-[16px] h-[16px] text-[#0d97fc] rounded border-[#d5d5d7] focus:ring-2 focus:ring-[#0d97fc] cursor-pointer"
                              />
                            </td>
                          )}
                          <td className="px-[15px] py-[13px]">
                            <p className="text-[14px] text-[#090914]">{item.varenr}</p>
                          </td>
                          <td className="px-[15px] py-[13px] max-w-[300px]">
                            <p className="text-[14px] text-[#090914]">{item.varetekst}</p>
                          </td>
                          <td className="px-[15px] py-[13px]">
                            <p className="text-[14px] text-[#6b6b72]">{item.leverandor}</p>
                          </td>
                          <td className="px-[15px] py-[13px] whitespace-nowrap">
                            <p className="text-[14px] text-[#090914]">{item.pris}</p>
                          </td>
                          <td className="px-[15px] py-[13px]">
                            {isLoaded ? (
                              (() => {
                                const displayBeholdning = loadedStockAmounts[item.id] || item.beholdning;
                                return displayBeholdning === 'Not in stock' ? (
                                  <span className="text-[12px] text-[#ff8c21] bg-[#fff4e6] px-[8px] py-[4px] rounded-[3px] whitespace-nowrap inline-block">
                                    Ikke på lager
                                  </span>
                                ) : (
                                  <span className="font-semibold text-[14px] text-[#48b76e] flex items-center gap-[6px]">
                                    <span className="w-[8px] h-[8px] bg-[#48b76e] rounded-full"></span>
                                    {displayBeholdning}
                                  </span>
                                );
                              })()
                            ) : (
                              <button
                                onClick={() => loadDetails(item.id)}
                                className="px-[16px] py-[6px] font-semibold text-[12px] text-[#0d97fc] bg-white border border-[#0d97fc] rounded-[3px] hover:bg-[#e6f4fe] transition-colors whitespace-nowrap"
                              >
                                Last beholdning
                              </button>
                            )}
                          </td>
                          <td className="px-[15px] py-[13px]">
                            {item.info.length > 0 && (
                              <div className="flex flex-wrap gap-[6px]">
                                {item.info.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className={`text-[12px] px-[8px] py-[2px] rounded-[3px] ${
                                      tag.includes('Expires')
                                        ? 'bg-[#fff4e6] text-[#ff8c21]'
                                        : tag === 'Non-stock'
                                        ? 'bg-[#e6e6e8] text-[#6b6b72]'
                                        : 'bg-[#e8f5ec] text-[#48b76e]'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Sticky bottom section with search and button */}
            <div className="sticky bottom-0 bg-white border-t border-[#e6e6e8] px-[20px] py-[15px] shadow-[0px_-2px_4px_0px_rgba(107,107,114,0.06)]">
              <div className="flex items-center gap-[15px]">
                {/* Search bar */}
                <div className="relative flex-1">
                  <div className="bg-white box-border content-stretch flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] relative rounded-[5px] w-full">
                    <div 
                      aria-hidden="true" 
                      className="absolute border-solid inset-0 pointer-events-none rounded-[5px]"
                      style={{
                        borderWidth: searchFocused ? '2px' : '1px',
                        borderColor: searchFocused ? 'rgb(13, 151, 252)' : 'rgb(213, 213, 215)'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Søk etter ordre"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      className="basis-0 font-normal grow leading-[1.75] min-h-px min-w-px relative shrink-0 text-[14px] bg-transparent border-none outline-none placeholder:text-[#6b6b72]"
                      style={{
                        color: searchQuery ? 'rgb(9, 9, 20)' : '#6b6b72',
                        opacity: searchQuery ? 1 : 0.6
                      }}
                    />
                    <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]">
                      <Group3 />
                    </div>
                  </div>
                </div>
                
                {/* Add button */}
                <button
                  onClick={handleAddItems}
                  disabled={!hasSelection}
                  style={{
                    padding: '6px 20px',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-lg)',
                    lineHeight: 1.75,
                    borderRadius: 'var(--radius)',
                    border: 'none',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                    background: hasSelection ? 'var(--primary)' : 'var(--secondary)',
                    color: hasSelection ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                    opacity: hasSelection ? 1 : 0.6,
                    cursor: hasSelection ? 'pointer' : 'not-allowed',
                  }}
                >
                  {t('addToOrderLine')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
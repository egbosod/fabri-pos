import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';

const InventorySearchPrototype = () => {
  const [filters, setFilters] = useState({
    multipleLines: true,
    nonStock: true,
    inventory: true
  });
  
  const [interactedToggles, setInteractedToggles] = useState({
    multipleLines: false,
    nonStock: false,
    inventory: false
  });
  
  const [selectedItems, setSelectedItems] = useState(new Set([516804172]));
  const [loadedDetails, setLoadedDetails] = useState(new Set([469650132, 521954131, 516804172, 565151585, 565151588, 56082645]));
  const [loadedStockAmounts, setLoadedStockAmounts] = useState({});
  const [loadedInfoTags, setLoadedInfoTags] = useState({});
  const [visibleItems, setVisibleItems] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef(null);

  const allItems = [
    { id: 469650132, varenr: '469650132', varetekst: 'ADAPTER GDE 16 PLUS FOR BORHAMMER', leverandor: 'BOSCH ROBERT AS', pris: '29,50 kr / STK', beholdning: '99 STK', info: [], isNonStock: false },
    { id: 521954131, varenr: '521954131', varetekst: 'BORHAMMER GBH 18V-20 SOLO L-BOXX', leverandor: 'Eikås Sagbruk AS', pris: '22,75 kr / STK', beholdning: '67 STK', info: [], isNonStock: false },
    { id: 516804172, varenr: '516804172', varetekst: 'BORHAMMER GBH 18V-26 SOLO L-BOXX...', leverandor: 'BOSCH ROBERT AS', pris: '31,00 kr / STK', beholdning: '48 STK', info: [], isNonStock: false },
    { id: 565151585, varenr: '565151585', varetekst: 'BORHAMMER GBH 18V-34 CF SOLO BITU...', leverandor: 'Eikås Sagbruk AS', pris: '24,90 kr / STK', beholdning: 'Not in stock', info: [], isNonStock: true },
    { id: 565151588, varenr: '565151588', varetekst: 'BORHAMMER GBH 18V-36 C SOLO CASE...', leverandor: 'Eikås Sagbruk AS', pris: '27,30 kr / STK', beholdning: '78 STK', info: ['Expired 10.09.2023'], isNonStock: false },
    { id: 56082645, varenr: '56082645', varetekst: 'Avslutningslist alu sølv 2M alloc dim 200x...', leverandor: 'Alloc AS', pris: '25,60 kr / STK', beholdning: '76 STK', info: ['Non-stock', 'Expired 10.09.2023', 'Nordic Swan Ecolabel', 'PEFC certificate'], isNonStock: true },
    { id: 789012345, varenr: '789012345', varetekst: 'BORHAMMER GBH 24V-32 PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '45,00 kr / STK', beholdning: null, info: [], isNonStock: false },
    { id: 890123456, varenr: '890123456', varetekst: 'DRILL BIT SET 15PC HSS-G', leverandor: 'Eikås Sagbruk AS', pris: '18,90 kr / STK', beholdning: null, info: [], isNonStock: true },
    { id: 901234567, varenr: '901234567', varetekst: 'IMPACT WRENCH 18V SOLO', leverandor: 'BOSCH ROBERT AS', pris: '52,50 kr / STK', beholdning: null, info: [], isNonStock: false },
    { id: 912345678, varenr: '912345678', varetekst: 'CIRCULAR SAW BLADE 190MM', leverandor: 'Alloc AS', pris: '35,20 kr / STK', beholdning: null, info: [], isNonStock: false },
    { id: 923456789, varenr: '923456789', varetekst: 'SANDING DISC 125MM P120', leverandor: 'Eikås Sagbruk AS', pris: '12,40 kr / STK', beholdning: null, info: [], isNonStock: true },
    { id: 934567890, varenr: '934567890', varetekst: 'MEASURING TAPE 5M PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '28,75 kr / STK', beholdning: null, info: [], isNonStock: false },
    { id: 945678901, varenr: '945678901', varetekst: 'HAMMER DRILL BIT SET 8PC SDS-PLUS', leverandor: 'BOSCH ROBERT AS', pris: '38,90 kr / STK', beholdning: null, info: [], isNonStock: false },
    { id: 956789012, varenr: '956789012', varetekst: 'WOOD CHISEL SET 6PC PROFESSIONAL', leverandor: 'Eikås Sagbruk AS', pris: '42,50 kr / STK', beholdning: null, info: [], isNonStock: true },
    { id: 967890123, varenr: '967890123', varetekst: 'PLANER GHO 26-82 D PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '55,00 kr / STK', beholdning: null, info: [], isNonStock: false },
    { id: 978901234, varenr: '978901234', varetekst: 'RECIPROCATING SAW GSA 18V-32', leverandor: 'BOSCH ROBERT AS', pris: '48,25 kr / STK', beholdning: null, info: [], isNonStock: false },
    { id: 989012345, varenr: '989012345', varetekst: 'ROUTER GOF 1600 CE PROFESSIONAL', leverandor: 'Eikås Sagbruk AS', pris: '62,80 kr / STK', beholdning: null, info: [], isNonStock: true },
    { id: 990123456, varenr: '990123456', varetekst: 'BELT SANDER PBS 75 AE SET', leverandor: 'BOSCH ROBERT AS', pris: '44,90 kr / STK', beholdning: null, info: [], isNonStock: false },
    { id: 991234567, varenr: '991234567', varetekst: 'ORBITAL SANDER GEX 125-1 AE', leverandor: 'Alloc AS', pris: '36,75 kr / STK', beholdning: null, info: [], isNonStock: false },
    { id: 992345678, varenr: '992345678', varetekst: 'HEAT GUN GHG 23-66 PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '41,20 kr / STK', beholdning: null, info: [], isNonStock: true }
  ];

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      setVisibleItems(prev => Math.min(prev + 5, allItems.length));
    }
  };

  const toggleFilter = (filterName) => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const toggleSelection = (id) => {
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

  const loadDetails = (id) => {
    // Generate random stock amount between 10-150
    const randomStock = Math.floor(Math.random() * 141) + 10;
    
    // Generate random info tags
    const possibleTags = [
      'Non-stock',
      'Nordic Swan Ecolabel',
      'PEFC certificate',
      'FSC Certified',
      'EU Ecolabel',
      'Expired 15.03.2024',
      'Expired 22.11.2023',
      'Expired 10.09.2023',
      'Expired 18.07.2024',
      'Expired 05.12.2023'
    ];
    
    // Randomly decide how many tags (0-4)
    const numTags = Math.floor(Math.random() * 5);
    const shuffled = [...possibleTags].sort(() => Math.random() - 0.5);
    const randomTags = shuffled.slice(0, numTags);
    
    // Store the loaded stock amount in state
    setLoadedStockAmounts(prev => ({
      ...prev,
      [id]: `${randomStock} STK`
    }));
    
    // Store the loaded info tags in state
    setLoadedInfoTags(prev => ({
      ...prev,
      [id]: randomTags
    }));
    
    setLoadedDetails(prev => new Set([...prev, id]));
  };

  // Filter items based on search and toggles
  const filteredItems = allItems.filter(item => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      item.varenr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.varetekst.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leverandor.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    // Multiple lines filter - if OFF, only show first 3 items
    if (!filters.multipleLines) {
      const itemPosition = allItems.indexOf(item);
      if (itemPosition >= 3) return false;
    }
    
    // Non-stock filter - if OFF, hide non-stock items
    if (!filters.nonStock && item.isNonStock) {
      return false;
    }
    
    // Inventory filter - if OFF, hide items with "Not in stock"
    if (!filters.inventory && (item.beholdning === 'Not in stock' || !loadedDetails.has(item.id))) {
      return false;
    }
    
    return true;
  });

  const displayedItems = filteredItems.slice(0, visibleItems);
  const hasSelection = selectedItems.size > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        {/* Header with filters */}
        <div className="p-6 border-b border-gray-200">
          {/* Filters */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.multipleLines}
                  onChange={() => toggleFilter('multipleLines')}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
              </div>
              <span className="text-sm text-gray-700">Add multiple article lines</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.nonStock}
                  onChange={() => toggleFilter('nonStock')}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
              </div>
              <span className="text-sm text-gray-700">Include non-stock items</span>
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={filters.inventory}
                  onChange={() => toggleFilter('inventory')}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 transition-colors"></div>
                <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-5"></div>
              </div>
              <span className="text-sm text-gray-700">Inventory</span>
            </label>
          </div>
        </div>

        {/* Scrollable table container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="overflow-auto"
            style={{ maxHeight: '450px' }}
          >
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                  {filters.multipleLines && <th className="px-6 py-3 w-12"></th>}
                  <th className="px-6 py-3">Varenr</th>
                  <th className="px-6 py-3">Varetekst</th>
                  <th className="px-6 py-3">Leverandør</th>
                  <th className="px-6 py-3">Pris</th>
                  <th className="px-6 py-3">Beholdning</th>
                  <th className="px-6 py-3">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {displayedItems.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500 text-sm">
                      No items found matching your search
                    </td>
                  </tr>
                ) : (
                  displayedItems.map((item) => {
                    const isLoaded = loadedDetails.has(item.id);
                    const isSelected = selectedItems.has(item.id);

                    return (
                      <tr 
                        key={item.id}
                        className={`hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : ''}`}
                      >
                        {filters.multipleLines && (
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelection(item.id)}
                              className="w-4 h-4 text-blue-500 rounded border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                            />
                          </td>
                        )}
                        <td className="px-6 py-4 text-sm text-gray-900">{item.varenr}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.varetekst}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{item.leverandor}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{item.pris}</td>
                        <td className="px-6 py-4">
                          {isLoaded ? (
                            (() => {
                              const displayBeholdning = loadedStockAmounts[item.id] || item.beholdning;
                              return displayBeholdning === 'Not in stock' ? (
                                <span className="text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded">
                                  Not in stock
                                </span>
                              ) : (
                                <span className="text-sm text-green-600 font-medium flex items-center gap-1.5">
                                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                  {displayBeholdning}
                                </span>
                              );
                            })()
                          ) : (
                            <button
                              onClick={() => loadDetails(item.id)}
                              className="px-3 py-1 text-xs font-medium text-blue-600 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors"
                            >
                              Load
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {isLoaded && (() => {
                            const displayInfo = loadedInfoTags[item.id] || item.info;
                            return displayInfo.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {displayInfo.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className={`text-xs px-2 py-0.5 rounded ${
                                      tag.includes('Expired')
                                        ? 'bg-orange-50 text-orange-700'
                                        : tag === 'Non-stock'
                                        ? 'bg-gray-100 text-gray-700'
                                        : 'bg-green-50 text-green-700'
                                    }`}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            );
                          })()}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Sticky bottom section with search and button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
            <div className="flex items-center gap-4">
              {/* Search bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search for order"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              
              {/* Add button */}
              <button
                disabled={!hasSelection}
                className={`px-6 py-2.5 rounded font-medium transition-all whitespace-nowrap ${
                  hasSelection
                    ? 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer shadow-sm'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Legg til i varelinje
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventorySearchPrototype;

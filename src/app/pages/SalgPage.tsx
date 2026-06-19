import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useModalParams } from '../hooks/useModalParams';
import svgPaths from '../imports/svg-mrnj5uwtcu';
import { useLanguage } from '../contexts/LanguageContext';
import { usePOS } from '../contexts/POSContext';
import { OrderGroup } from '../components/OrderGroup';
import { AggregatedHandOpenOrderGroup } from '../components/AggregatedHandOpenOrderGroup';
import { AggregatedOrderClosedGroup } from '../components/AggregatedOrderClosedGroup';
import { SwipeableOrderItem, OrderLineState as SwipeableOrderLineState } from '../components/SwipeableOrderItem';
import { SwipeableDefaultOrderItem } from '../components/SwipeableDefaultOrderItem';
import { PriceCheckEmptyState } from '../components/PriceCheckEmptyState';
import { PaymentSummary } from '../components/PaymentSummary';
import { CustomerBadge } from '../components/CustomerBadge';
import { CART_COLUMNS } from '../components/cartColumnWidths';
import { Check, RotateCcw, Trash2, Plus } from 'lucide-react';
import type { CartItem, OrderGroupData, ProductItem, RowState } from '../types/pos';

/* ═══════════════════════════════════════════════════════════════════════════
   SVG helpers (Salg-specific icons)
   ═══════════════════════════════════════════════════════════════════════════ */

function SearchIcon() {
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

function OrdersIcon() {
  return (
    <div className="absolute inset-[6.05%_14.84%]" data-name="Group">
      <div className="absolute inset-[-3.56%_-4.44%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 15">
          <g id="Group">
            <path d="M3.1055 6.18774H8.37894" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.9375" />
            <path d="M3.1055 8.38501H8.37894" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.9375" />
            <path d="M3.1055 10.5823H8.37894" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.9375" />
            <path d={svgPaths.p2994e800} stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.9375" />
            <path d={svgPaths.p33760100} stroke="var(--stroke-0, black)" strokeWidth="0.9375" />
            <path d={svgPaths.p7425e80} stroke="var(--stroke-0, black)" strokeWidth="0.9375" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function UserGroupIcon() {
  return (
    <div className="absolute bottom-0 left-[6.25%] right-[6.25%] top-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 12">
        <g id="Group">
          <path d={svgPaths.p10bfa400} fill="var(--fill-0, black)" id="Vector" />
          <path d={svgPaths.p34bbb900} fill="var(--fill-0, black)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function MobileShoppingCartIcon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Mobile Shopping Cart">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Mobile Shopping Cart">
          <path d={svgPaths.p2468040} stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3125" />
          <path d="M2.25 12H10.25" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3125" />
          <path d={svgPaths.p2d8aab80} stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3125" />
          <path d={svgPaths.p34582180} stroke="var(--stroke-0, #42424A)" strokeWidth="1.3125" />
          <path d={svgPaths.pbb7e500} stroke="var(--stroke-0, #42424A)" strokeWidth="1.3125" />
          <g id="Group">
            <path d={svgPaths.p3fd93080} stroke="var(--stroke-0, #42424A)" strokeWidth="1.3125" />
            <path d={svgPaths.p27c8ec00} stroke="var(--stroke-0, #42424A)" strokeWidth="1.3125" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function BarcodeScanGraphic() {
  return (
    <div className="absolute h-[92px] left-[15px] top-[11px] w-[84px]" data-name="graphic">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 92">
        <g id="graphic">
          <path d="M21 32.875V64.375" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M31.5 32.875V48.625" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M63 32.875V64.375" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M52.5 32.875V48.625" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M42 32.875V48.625" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M31.5 59.125H52.5" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M5.25 17.125V6.625H15.75" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M78.75 17.125V6.625H68.25" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M5.25 74.875V85.375H15.75" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
          <path d="M78.75 74.875V85.375H68.25" stroke="var(--stroke-0, #42424A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5.23926" />
        </g>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Product Search Results (inline search table)
   ═══════════════════════════════════════════════════════════════════════════ */

function ProductSearchResults({
  searchQuery,
  onAddToSale,
}: {
  searchQuery: string;
  onAddToSale?: (item: ProductItem) => void;
}) {
  const { t } = useLanguage();
  const [loadedDetails, setLoadedDetails] = useState(
    new Set([469650132, 521954131, 516804172, 565151585, 565151588, 56082645]),
  );
  const [loadedStockAmounts, setLoadedStockAmounts] = useState<Record<number, string>>({});
  const [loadedInfoTags, setLoadedInfoTags] = useState<Record<number, string[]>>({});

  const [items, setItems] = useState<ProductItem[]>([
    { id: 469650132, varenr: '469650132', varetekst: 'ADAPTER GDE 16 PLUS FOR BORHAMMER', leverandor: 'BOSCH ROBERT AS', pris: '29,50 kr / STK', beholdning: '99 STK', info: [], isNonStock: false, state: 'normal' },
    { id: 521954131, varenr: '521954131', varetekst: 'BORHAMMER GBH 18V-20 SOLO L-BOXX', leverandor: 'Eikås Sagbruk AS', pris: '22,75 kr / STK', beholdning: '67 STK', info: [], isNonStock: false, state: 'normal' },
    { id: 516804172, varenr: '516804172', varetekst: 'BORHAMMER GBH 18V-26 SOLO L-BOXX...', leverandor: 'BOSCH ROBERT AS', pris: '31,00 kr / STK', beholdning: '48 STK', info: [], isNonStock: false, state: 'normal' },
    { id: 565151585, varenr: '565151585', varetekst: 'BORHAMMER GBH 18V-34 CF SOLO BITU...', leverandor: 'Eikås Sagbruk AS', pris: '24,90 kr / STK', beholdning: 'Not in stock', info: [], isNonStock: true, state: 'normal' },
    { id: 565151588, varenr: '565151588', varetekst: 'BORHAMMER GBH 18V-36 C SOLO CASE...', leverandor: 'Eikås Sagbruk AS', pris: '27,30 kr / STK', beholdning: '78 STK', info: ['Expired 10.09.2023'], isNonStock: false, state: 'normal' },
    { id: 56082645, varenr: '56082645', varetekst: 'Avslutningslist alu sølv 2M alloc dim 200x...', leverandor: 'Alloc AS', pris: '25,60 kr / STK', beholdning: '76 STK', info: ['Non-stock', 'Expired 10.09.2023', 'Nordic Swan Ecolabel', 'PEFC certificate'], isNonStock: true, state: 'normal' },
    { id: 789012345, varenr: '789012345', varetekst: 'BORHAMMER GBH 24V-32 PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '45,00 kr / STK', beholdning: null, info: [], isNonStock: false, state: 'normal' },
    { id: 890123456, varenr: '890123456', varetekst: 'DRILL BIT SET 15PC HSS-G', leverandor: 'Eikås Sagbruk AS', pris: '18,90 kr / STK', beholdning: null, info: [], isNonStock: true, state: 'normal' },
    { id: 901234567, varenr: '901234567', varetekst: 'IMPACT WRENCH 18V SOLO', leverandor: 'BOSCH ROBERT AS', pris: '52,50 kr / STK', beholdning: null, info: [], isNonStock: false, state: 'normal' },
    { id: 912345678, varenr: '912345678', varetekst: 'CIRCULAR SAW BLADE 190MM', leverandor: 'Alloc AS', pris: '35,20 kr / STK', beholdning: null, info: [], isNonStock: false, state: 'normal' },
    { id: 923456789, varenr: '923456789', varetekst: 'SANDING DISC 125MM P120', leverandor: 'Eikås Sagbruk AS', pris: '12,40 kr / STK', beholdning: null, info: [], isNonStock: true, state: 'normal' },
    { id: 934567890, varenr: '934567890', varetekst: 'MEASURING TAPE 5M PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '28,75 kr / STK', beholdning: null, info: [], isNonStock: false, state: 'normal' },
  ]);

  const filteredItems = items.filter((item) => {
    return (
      searchQuery === '' ||
      item.varenr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.varetekst.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.leverandor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const loadDetails = (id: number) => {
    const randomStock = Math.floor(Math.random() * 141) + 10;
    const possibleTags = ['Non-stock', 'Nordic Swan Ecolabel', 'PEFC certificate', 'FSC Certified', 'EU Ecolabel', 'Expired 15.03.2024', 'Expired 22.11.2023'];
    const numTags = Math.floor(Math.random() * 5);
    const shuffled = [...possibleTags].sort(() => Math.random() - 0.5);
    setLoadedStockAmounts((prev) => ({ ...prev, [id]: `${randomStock} STK` }));
    setLoadedInfoTags((prev) => ({ ...prev, [id]: shuffled.slice(0, numTags) }));
    setLoadedDetails((prev) => new Set([...prev, id]));
  };

  const cycleRowState = (id: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const flow: Record<RowState, RowState> = { normal: 'return', return: 'returned', returned: 'delete', delete: 'deleted', deleted: 'normal' };
          return { ...item, state: flow[item.state] };
        }
        return item;
      }),
    );
  };

  const getRowStyle = (state: RowState) => {
    switch (state) {
      case 'return': return 'bg-orange-100 border-l-4 border-orange-500';
      case 'returned': return 'bg-green-100 border-l-4 border-green-500';
      case 'delete': return 'bg-red-100 border-l-4 border-red-500';
      case 'deleted': return 'bg-green-100 border-l-4 border-green-500';
      default: return 'hover:bg-gray-50';
    }
  };

  const getActionButton = (item: ProductItem) => {
    const base = 'px-4 py-2 rounded font-semibold flex items-center gap-2 transition-colors';
    const style: Record<string, string> = { fontSize: 'var(--text-sm)' } as any;
    switch (item.state) {
      case 'return': return <button onClick={() => cycleRowState(item.id)} className={`${base} bg-orange-500 text-white hover:bg-orange-600`} style={style}><Check className="w-4 h-4" />{t('return')}</button>;
      case 'returned': return <button onClick={() => cycleRowState(item.id)} className={`${base} bg-green-500 text-white hover:bg-green-600`} style={style}><RotateCcw className="w-4 h-4" />{t('undoReturn')}</button>;
      case 'delete': return <button onClick={() => cycleRowState(item.id)} className={`${base} bg-red-500 text-white hover:bg-red-600`} style={style}><Trash2 className="w-4 h-4" />{t('delete')}</button>;
      case 'deleted': return <button onClick={() => cycleRowState(item.id)} className={`${base} bg-green-500 text-white hover:bg-green-600`} style={style}><RotateCcw className="w-4 h-4" />{t('undoDelete')}</button>;
      default: return <button onClick={() => cycleRowState(item.id)} className={`${base} bg-secondary text-secondary-foreground hover:bg-secondary/80`} style={style}>{t('actions')}</button>;
    }
  };

  return (
    <div className="flex-1 bg-card overflow-auto">
      <table className="w-full">
        <thead className="bg-secondary/50 sticky top-0 z-10">
          <tr className="text-left uppercase tracking-wide" style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--font-weight-medium)', color: 'var(--muted-foreground)' }}>
            <th className="px-6 py-3">{t('itemNumber')}</th>
            <th className="px-6 py-3">{t('itemText')}</th>
            <th className="px-6 py-3">{t('supplier')}</th>
            <th className="px-6 py-3">{t('price')}</th>
            <th className="px-6 py-3">{t('stock')}</th>
            <th className="px-6 py-3">{t('info')}</th>
            <th className="px-6 py-3">{t('action')}</th>
            <th className="px-6 py-3 w-12"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{t('noItemsFound')}</td>
            </tr>
          ) : (
            filteredItems.map((item) => {
              const isLoaded = loadedDetails.has(item.id);
              return (
                <tr key={item.id} className={`transition-colors ${getRowStyle(item.state)}`}>
                  <td className="px-6 py-4 text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{item.varenr}</td>
                  <td className="px-6 py-4 text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{item.varetekst}</td>
                  <td className="px-6 py-4 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{item.leverandor}</td>
                  <td className="px-6 py-4 text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{item.pris}</td>
                  <td className="px-6 py-4">
                    {isLoaded ? (() => {
                      const display = loadedStockAmounts[item.id] || item.beholdning;
                      return display === 'Not in stock' ? (
                        <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded" style={{ fontSize: 'var(--text-xs)' }}>{t('notInStock')}</span>
                      ) : (
                        <span className="text-green-600 font-medium flex items-center gap-1.5" style={{ fontSize: 'var(--text-sm)' }}>
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>{display}
                        </span>
                      );
                    })() : (
                      <button onClick={() => loadDetails(item.id)} className="px-3 py-1 font-medium text-primary bg-card border border-primary/30 rounded hover:bg-primary/5 transition-colors" style={{ fontSize: 'var(--text-xs)' }}>{t('load')}</button>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isLoaded && (() => {
                      const info = loadedInfoTags[item.id] || item.info;
                      return info.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {info.map((tag, idx) => (
                            <span key={idx} className={`px-2 py-0.5 rounded ${tag.includes('Expired') ? 'bg-orange-50 text-orange-700' : tag === 'Non-stock' ? 'bg-secondary text-secondary-foreground' : 'bg-green-50 text-green-700'}`} style={{ fontSize: 'var(--text-xs)' }}>{tag}</span>
                          ))}
                        </div>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4">{getActionButton(item)}</td>
                  <td className="px-6 py-4">
                    <button onClick={() => onAddToSale?.(item)} className="bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90 transition-colors" title={t('addToOrderLine')}>
                      <Plus className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Order Items (cart line items area)
   ═══════════════════════════════════════════════════════════════════════════ */

function OrderItemsView({
  searchQuery,
  onAddToSale,
  orderGroups = [],
  swipeableOrderLineStates,
  onSwipeableStateChange,
  onRemoveOrderGroup,
  onRemoveAllItemsFromGroup,
  addedItems = [],
  onRemoveAddedItem,
}: {
  searchQuery: string;
  onAddToSale: (item: CartItem) => void;
  orderGroups?: OrderGroupData[];
  swipeableOrderLineStates: Record<string, SwipeableOrderLineState>;
  onSwipeableStateChange: (groupId: string | number, itemIndex: number, newState: SwipeableOrderLineState) => void;
  onRemoveOrderGroup: (groupId: string) => void;
  onRemoveAllItemsFromGroup: (groupId: string) => void;
  addedItems?: CartItem[];
  onRemoveAddedItem: (index: number) => void;
}) {
  const { t } = useLanguage();
  const hasResults = searchQuery.length > 0;

  const totalItemCount = React.useMemo(() => {
    let count = 0;
    orderGroups?.forEach((group) => {
      group.items.forEach((_, index) => {
        const key = `${group.id}-${index}`;
        if ((swipeableOrderLineStates[key] || 'normal') !== 'deleted') count++;
      });
    });
    addedItems.forEach((_, index) => {
      const key = `added-${index}`;
      if ((swipeableOrderLineStates[key] || 'normal') !== 'deleted') count++;
    });
    return count;
  }, [orderGroups, addedItems, swipeableOrderLineStates]);

  if (hasResults) {
    return (
      <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full">
        <ProductSearchResults searchQuery={searchQuery} onAddToSale={onAddToSale as any} />
      </div>
    );
  }

  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="Order items">
      <div className="content-stretch flex flex-col items-start relative size-full">
        {/* Column headers */}
        <div className="content-stretch flex flex-col items-start justify-center relative rounded-[var(--radius)] shrink-0 w-full">
          <div className="box-border content-stretch flex items-start overflow-clip pb-[10px] pt-0 px-0 relative rounded-[var(--radius)] shrink-0 w-full">
            {[
              { label: t('itemName'), width: CART_COLUMNS.VARENAVN, align: 'items-start' },
              { label: t('quantity'), width: CART_COLUMNS.ANTALL, align: 'items-end' },
              { label: t('perUnit'), width: CART_COLUMNS.PER_ENHET, align: 'items-end' },
              { label: t('discount'), width: CART_COLUMNS.RABATT, align: 'items-end' },
              { label: t('total'), width: CART_COLUMNS.TOTALT, align: 'items-end' },
            ].map((col) => (
              <div key={col.label} className={`bg-transparent box-border content-stretch flex flex-col h-[28px] ${col.align} justify-end overflow-clip px-[10px] py-0 relative shrink-0`} style={{ width: `${col.width}px` }}>
                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                  <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-nowrap" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                    <p className="leading-[normal] whitespace-pre">{col.label}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex-1 flex items-end justify-end px-[20px] h-[28px]">
              {totalItemCount > 0 && (
                <div className="font-normal" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>{totalItemCount} {t('orderLines')}</div>
              )}
            </div>
          </div>
        </div>

        {/* Groups & items */}
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
          {orderGroups.map((group) => {
            if (group.status === 'AggregatedHandOpen') {
              return (
                <AggregatedHandOpenOrderGroup
                  key={group.id}
                  orderNumber={group.orderNumber || ''}
                  source="Håndterminal"
                  dateTime={group.orderDate}
                  totalAmount={group.total}
                  prepaidAmount={group.prepaidAmount}
                  remainingAmount={group.remainingAmount}
                  badge={group.badge}
                  lines={group.items.map((item) => ({ id: item.id || `${group.id}-${item.sku}`, productName: item.name, productCode: item.sku, quantity: item.quantity, unit: item.unit, pricePerUnit: item.price, discount: item.discount || 0, total: item.total, originalTotal: item.originalTotal }))}
                  onRemoveAll={() => onRemoveAllItemsFromGroup(group.id)}
                />
              );
            }
            if (group.status === 'AggregatedOrderClosed') {
              return (
                <AggregatedOrderClosedGroup
                  key={group.id}
                  orderNumber={group.orderNumber || ''}
                  orderDate={group.orderDate}
                  customerName={group.customerName || ''}
                  projectName={group.projectName}
                  totalAmount={group.total}
                  paymentStatus={group.paymentStatus}
                  paymentStatusVariant={group.paymentStatusVariant}
                  lines={group.items.map((item) => ({ id: item.id || `${group.id}-${item.sku}`, productName: item.name, productCode: item.sku, quantity: item.quantity, unit: item.unit, pricePerUnit: item.price, discount: item.discount || 0, total: item.total, originalTotal: item.originalTotal }))}
                  onRemoveAll={() => onRemoveAllItemsFromGroup(group.id)}
                />
              );
            }
            return (
              <OrderGroup
                key={group.id}
                orderNumber={group.orderNumber}
                orderDate={group.orderDate}
                customerName={group.customerName}
                projectName={group.projectName}
                phoneNumber={group.phoneNumber}
                total={group.total}
                itemCount={group.itemCount}
                label={group.label}
                showRemoveButton={group.showRemoveButton}
                onRemove={() => onRemoveOrderGroup(group.id)}
              >
                {group.items.map((item, index) => {
                  const key = `${group.id}-${index}`;
                  return (
                    <SwipeableOrderItem
                      key={index}
                      productName={item.name}
                      productCode={item.sku}
                      quantity={item.quantity}
                      unit={item.unit}
                      pricePerUnit={item.price}
                      discount={item.discount || 0}
                      total={item.total}
                      originalTotal={item.originalTotal}
                      label={item.label}
                      state={swipeableOrderLineStates[key] || 'normal'}
                      onStateChange={(newState) => onSwipeableStateChange(group.id, index, newState)}
                      onQuantityChange={() => {}}
                      onPriceChange={() => {}}
                      onDiscountChange={() => {}}
                    />
                  );
                })}
              </OrderGroup>
            );
          })}

          {addedItems.map((item, index) => {
            const key = `added-${index}`;
            const itemState = swipeableOrderLineStates[key] || 'normal';
            if (itemState === 'deleted') return null;
            const itemTotal = item.total || item.price * item.quantity;
            const originalTotal = item.discount ? itemTotal / (1 - item.discount / 100) : itemTotal;
            return (
              <SwipeableDefaultOrderItem
                key={key}
                productName={item.name}
                productCode={item.sku}
                quantity={item.quantity}
                unit={item.unit}
                pricePerUnit={item.price}
                discount={item.discount || 0}
                total={itemTotal}
                originalTotal={originalTotal}
                label={item.label}
                state={itemState}
                onStateChange={(newState) => {
                  onSwipeableStateChange('added', index, newState);
                  if (newState === 'deleted') onRemoveAddedItem(index);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Search & Actions bar
   ═══════════════════════════════════════════════���═══════════════════════════ */

function SearchAndActionsBar({
  orderGroups,
  swipeableOrderLineStates,
  onSwipeableStateChange,
  onRemoveOrderGroup,
  onRemoveAllItemsFromGroup,
  addedItems,
  onRemoveAddedItem,
}: {
  orderGroups: OrderGroupData[];
  swipeableOrderLineStates: Record<string, SwipeableOrderLineState>;
  onSwipeableStateChange: (groupId: string | number, itemIndex: number, newState: SwipeableOrderLineState) => void;
  onRemoveOrderGroup: (groupId: string) => void;
  onRemoveAllItemsFromGroup: (groupId: string) => void;
  addedItems: CartItem[];
  onRemoveAddedItem: (index: number) => void;
}) {
  const { t } = useLanguage();
  const { searchQuery, inventorySearchValue, setInventorySearchValue, handleAddToSale } = usePOS();
  const { openModal } = useModalParams();
  const [searchFocused, setSearchFocused] = React.useState(false);

  const handleSearchInput = (value: string) => {
    setInventorySearchValue(value);
    if (value.length > 0) openModal('inventory');
  };

  return (
    <div className="basis-0 bg-card grow h-full min-h-px min-w-px relative shrink-0">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[20px] items-start justify-end p-[20px] relative size-full">
          <div className="overflow-auto min-h-0 w-full">
            <OrderItemsView
              searchQuery={searchQuery}
              onAddToSale={handleAddToSale}
              orderGroups={orderGroups}
              swipeableOrderLineStates={swipeableOrderLineStates}
              onSwipeableStateChange={onSwipeableStateChange}
              onRemoveOrderGroup={onRemoveOrderGroup}
              onRemoveAllItemsFromGroup={onRemoveAllItemsFromGroup}
              addedItems={addedItems}
              onRemoveAddedItem={onRemoveAddedItem}
            />
          </div>
          <div className="content-stretch flex gap-[10px] items-center relative rounded-bl-[3px] rounded-br-[3px] shrink-0 w-full" data-name="Search and actions">
            <div className="basis-0 bg-card grow h-[48px] min-h-px min-w-px relative rounded-[var(--radius)] shrink-0" data-name="Textfield/Normal">
              <div
                aria-hidden="true"
                className="absolute border-solid inset-0 pointer-events-none rounded-[var(--radius)]"
                style={{ borderWidth: searchFocused ? '2px' : '1px', borderColor: searchFocused ? 'var(--ring)' : 'var(--border)' }}
              />
              <div className="flex flex-row items-center size-full">
                <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] relative w-full">
                  <input
                    type="text"
                    value={inventorySearchValue}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder={t('searchProducts')}
                    className="basis-0 font-normal grow leading-[1.75] min-h-px min-w-px relative shrink-0 text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground placeholder:opacity-60"
                    style={{ fontSize: 'var(--text-base)', fontFamily: "'Montserrat', sans-serif" }}
                  />
                  <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
                    <div className="absolute left-0 size-[57.6px] top-0" data-name="Icon Plate" />
                    <SearchIcon />
                  </div>
                </div>
              </div>
            </div>
            {/* Fetch order button */}
            <div className="content-stretch flex gap-[10px] items-start justify-center relative shrink-0">
              <div
                onClick={() => openModal('pickup')}
                className="bg-card box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center px-[13px] py-[6px] relative rounded-[var(--radius)] shrink-0 cursor-pointer hover:bg-secondary/50 transition-colors"
              >
                <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none rounded-[var(--radius)]" />
                <div className="overflow-clip relative shrink-0 size-[15px]" data-name="Icon / Orders">
                  <div className="absolute left-0 size-[15px] top-0" />
                  <OrdersIcon />
                </div>
                <p className="font-semibold leading-[1.75] relative shrink-0 text-foreground text-nowrap whitespace-pre" style={{ fontSize: 'var(--text-sm)' }}>{t('fetchOrder')}</p>
              </div>
            </div>
            {/* PDA button */}
            <button
              onClick={() => openModal('pda')}
              className="bg-card border border-border box-border content-stretch cursor-pointer flex gap-[8px] h-[48px] items-center justify-center px-[13px] py-[6px] relative rounded-[var(--radius)] shrink-0 hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors"
            >
              <MobileShoppingCartIcon />
              <span className="text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>Hent fra håndterminal</span>
              <div className="absolute bg-accent box-border content-stretch flex items-start left-[188px] overflow-clip px-[7px] py-0 rounded-[100px] top-[-9.5px]">
                <div className="flex flex-col font-semibold justify-center leading-[0] relative shrink-0 text-center text-nowrap text-primary-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                  <p className="leading-[1.75] whitespace-pre">2</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Salg Page
   ═══════════════════════════════════════════════════════════════════════════ */

export default function SalgPage() {
  const navigate = useNavigate();
  const { openModal } = useModalParams();
  const { t } = useLanguage();
  const {
    selectedCustomer,
    selectedProject,
    handleRemoveCustomer,
    orderGroups,
    handleRemoveOrderGroup,
    handleRemoveAllItemsFromGroup,
    addedItems,
    handleRemoveAddedItem,
    paymentTotals,
    hasOrderItems,
  } = usePOS();

  const [swipeableOrderLineStates, setSwipeableOrderLineStates] = useState<Record<string, SwipeableOrderLineState>>({});

  const handleSwipeableStateChange = (groupId: string | number, itemIndex: number, newState: SwipeableOrderLineState) => {
    setSwipeableOrderLineStates((prev) => ({ ...prev, [`${groupId}-${itemIndex}`]: newState }));
  };

  /* Recalculate payment totals accounting for swipeable states */
  const localPaymentTotals = React.useMemo(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    let itemCount = 0;
    let returnAmount = 0;

    orderGroups.forEach((group) => {
      const allDeleted = group.items.every((item, idx) => {
        const key = `${group.id}-${idx}`;
        return item.isDeleted || swipeableOrderLineStates[key] === 'deleted';
      });
      if (allDeleted && group.items.length > 0) return;

      group.items.forEach((item, idx) => {
        const key = `${group.id}-${idx}`;
        const state = swipeableOrderLineStates[key];
        if (item.isDeleted || state === 'deleted') return;
        const lineTotal = (item.price || 0) * (item.quantity || 0);

        if (state === 'returned') {
          returnAmount += lineTotal;
          itemCount += 1;
          if (item.discount) totalDiscount -= lineTotal * (item.discount / 100);
          return;
        }

        itemCount += 1;
        subtotal += lineTotal;
        if (item.discount) totalDiscount += lineTotal * (item.discount / 100);
      });
    });

    addedItems.forEach((item, index) => {
      const key = `added-${index}`;
      const state = swipeableOrderLineStates[key];
      if (state === 'deleted') return;
      const lineTotal = (item.price || 0) * (item.quantity || 0);

      if (state === 'returned') {
        returnAmount += lineTotal;
        itemCount += 1;
        if (item.discount) totalDiscount -= lineTotal * (item.discount / 100);
        return;
      }

      itemCount += 1;
      subtotal += lineTotal;
      if (item.discount) totalDiscount += lineTotal * (item.discount / 100);
    });

    return { subtotal, discount: totalDiscount, total: subtotal - totalDiscount - returnAmount, itemCount, returnAmount };
  }, [orderGroups, addedItems, swipeableOrderLineStates]);

  const localHasItems = localPaymentTotals.itemCount > 0;

  return (
    <div className="content-stretch flex flex-row flex-1 items-stretch relative shrink-0 w-full z-[1] min-h-0" data-name="Body">
      {/* Main cart area */}
      <SearchAndActionsBar
        orderGroups={orderGroups}
        swipeableOrderLineStates={swipeableOrderLineStates}
        onSwipeableStateChange={handleSwipeableStateChange}
        onRemoveOrderGroup={handleRemoveOrderGroup}
        onRemoveAllItemsFromGroup={handleRemoveAllItemsFromGroup}
        addedItems={addedItems}
        onRemoveAddedItem={handleRemoveAddedItem}
      />

      {/* Sidebar */}
      <div className="bg-background box-border content-stretch flex flex-col gap-[30px] h-full items-start justify-end p-[20px] relative shrink-0 w-[263px]" data-name="Sidebar">
        <div aria-hidden="true" className="absolute border-border border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />

        {!selectedCustomer ? (
          <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="Customer select">
            <button
              onClick={() => openModal('customer')}
              className="bg-card border border-border h-[48px] min-w-[100px] relative rounded-[var(--radius)] shrink-0 w-full cursor-pointer hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors"
            >
              <div className="flex flex-row items-center justify-center min-w-inherit size-full">
                <div className="box-border content-stretch flex gap-[8px] h-[48px] items-center justify-center min-w-inherit px-[15px] py-[6px] relative w-full">
                  <div className="overflow-clip relative shrink-0 size-[12px] text-foreground">
                    <UserGroupIcon />
                  </div>
                  <span className="text-foreground" style={{ fontFamily: "'Montserrat', sans-serif" }}>{t('selectCustomerButton')}</span>
                </div>
              </div>
            </button>
          </div>
        ) : (
          <CustomerBadge
            customer={selectedCustomer}
            project={selectedProject}
            mode="sales"
            onEdit={() => openModal('customer')}
            onRemove={handleRemoveCustomer}
            onGiftCard={() => {}}
            onBankTerminal={() => {}}
            onExchangeSlip={() => openModal('faktura')}
            onPreviousPurchases={() => navigate('/tidligere-kjop')}
          />
        )}

        {localHasItems && (
          <PaymentSummary
            subtotal={localPaymentTotals.subtotal}
            discount={localPaymentTotals.discount}
            total={localPaymentTotals.total}
            itemCount={localPaymentTotals.itemCount}
            returnAmount={localPaymentTotals.returnAmount || 0}
          />
        )}

        <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-full" data-name="Buttons">
          {localHasItems && (
            <button className="bg-transparent border border-primary text-primary h-[48px] min-w-[100px] relative rounded-[var(--radius)] shrink-0 w-full cursor-pointer hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors">
              <div className="flex flex-row items-center justify-center min-w-inherit size-full">
                <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-inherit px-[20px] py-[6px] relative w-full">
                  <span style={{ fontFamily: "'Montserrat', sans-serif" }}>{t('createPackingSlip')}</span>
                </div>
              </div>
            </button>
          )}
          <button
            onClick={() => { if (localHasItems) openModal('payment'); }}
            className={`h-[48px] min-w-[100px] relative rounded-[var(--radius)] shrink-0 w-full transition-colors ${
              localHasItems
                ? 'bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring'
                : 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
            }`}
            disabled={!localHasItems}
          >
            <div className="flex flex-row items-center justify-center min-w-inherit size-full">
              <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center min-w-inherit px-[20px] py-[6px] relative w-full">
                <span style={{ fontFamily: "'Montserrat', sans-serif" }}>{t('payNow')}</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
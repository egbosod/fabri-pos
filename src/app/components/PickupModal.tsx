import React, { useState, useMemo } from 'react';
import svgPaths from "../imports/svg-p6kc57wo9f";
import { useLanguage } from '../contexts/LanguageContext';

interface OrderItem {
  name: string;
  sku: string;
  quantity: number;
  unit: string;
  price: number;
  discount: number;
  total: number;
  originalTotal: number;
}

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: string;
  customerNumber?: string;
  phoneNumber?: string;
  project?: string;
  paymentStatus?: 'Delvis betalt';
  itemCount: number;
  total: number;
  items: OrderItem[];
  totals?: {
    total: number;
    prepaid: number;
    remaining: number;
  };
  isCustomerWithoutAccount: boolean;
  requiresPrepayment: boolean;
}

interface PickupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPickup: (orders: Order[]) => void;
}

// Product catalog for generating realistic items
const productCatalog = [
  { name: 'Beslagsskrue 5,0x40 CS A-250 Corrseal', sku: '23083603', price: 179.00, unit: 'PAK' },
  { name: 'Gipsplate 13mm 1200x2400', sku: '10234567', price: 125.00, unit: 'STK' },
  { name: 'Sparkel Gyproc Fuge 10L', sku: '10445678', price: 285.00, unit: 'STK' },
  { name: 'Isolasjon 100mm Glava 34', sku: '20334455', price: 450.00, unit: 'PK' },
  { name: 'Trelast 48x98x4800 C24', sku: '30445566', price: 120.00, unit: 'STK' },
  { name: 'Maling Jotun Lady Pure Color 10L', sku: '40556677', price: 890.00, unit: 'STK' },
  { name: 'Kabel 3x1,5mm Hvit 100m', sku: '50667788', price: 650.00, unit: 'RLL' },
  { name: 'Skruer TX20 4x50 Gulvplateskrue', sku: '60778899', price: 95.00, unit: 'PK' },
  { name: 'Rør PEX 16x2,2mm 50m', sku: '70889900', price: 420.00, unit: 'RLL' },
  { name: 'Sement Norbetong Standard 25kg', sku: '80990011', price: 89.00, unit: 'SEK' },
  { name: 'Panel Skygge Furu 12x120', sku: '91001122', price: 65.00, unit: 'M' },
  { name: 'Lim Bison Kit 310ml', sku: '11223344', price: 45.00, unit: 'STK' },
  { name: 'Vindu 3-lags 12x12', sku: '22334455', price: 3500.00, unit: 'STK' },
  { name: 'Dør Innerdør Hvit 8x21', sku: '33445566', price: 2800.00, unit: 'STK' },
  { name: 'Fliser Porselensgulv 60x60', sku: '44556677', price: 350.00, unit: 'M2' },
  { name: 'Spiker 3,1x90 Kamspiker', sku: '55667788', price: 125.00, unit: 'PAK' },
  { name: 'Tape Armering 50mm x 90m', sku: '66778899', price: 35.00, unit: 'RLL' },
  { name: 'Silikon Neutral Hvit', sku: '77889900', price: 55.00, unit: 'STK' },
  { name: 'Kabelkanal 25x16mm Hvit', sku: '88990011', price: 25.00, unit: 'M' },
  { name: 'Stikkontakt Enkel Hvit', sku: '99001122', price: 38.00, unit: 'STK' }
];

// Helper function to generate random items for an order
const generateOrderItems = (count: number, seed: number): OrderItem[] => {
  const items: OrderItem[] = [];
  const random = (max: number) => Math.abs(Math.floor((Math.sin(seed++) * 10000))) % max;
  
  for (let i = 0; i < count; i++) {
    const product = productCatalog[random(productCatalog.length)];
    const quantity = [1, 2, 3, 4, 5, 10, 15, 20, 25, 50][random(10)];
    const discount = [0, 0, 0, 5, 10, 15, 20][random(7)];
    const unitPrice = product.price;
    const subtotal = quantity * unitPrice;
    const total = subtotal * (1 - discount / 100);
    
    items.push({
      name: product.name,
      sku: product.sku,
      quantity: quantity,
      unit: product.unit,
      price: unitPrice,
      discount: discount,
      total: Math.round(total * 100) / 100,
      originalTotal: Math.round(subtotal * 100) / 100
    });
  }
  
  return items;
};

// Helper function to calculate order totals
const calculateOrderTotal = (items: OrderItem[], hasPrepayment: boolean = false) => {
  const discountedTotal = items.reduce((sum, item) => sum + item.total, 0);
  
  if (hasPrepayment) {
    const prepaid = Math.round(discountedTotal * 0.6 * 100) / 100;
    return {
      total: Math.round(discountedTotal * 100) / 100,
      prepaid: -prepaid,
      remaining: Math.round((discountedTotal - prepaid) * 100) / 100
    };
  }
  
  return Math.round(discountedTotal * 100) / 100;
};

// Generate more comprehensive mock data
const mockOrders: Order[] = [
  {
    id: '520591',
    orderNumber: '520591',
    date: '12. juni 2023',
    customer: 'Byggmestrene Gundersen AS',
    customerNumber: '10234',
    phoneNumber: '98765432',
    project: 'NT6',
    paymentStatus: 'Delvis betalt',
    itemCount: 3,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: true,
    items: generateOrderItems(3, 1000),
    totals: undefined
  },
  {
    id: '365842',
    orderNumber: '365842',
    date: '12. juni 2023',
    customer: 'LS Bygg og Service AS',
    customerNumber: '10567',
    phoneNumber: '99887766',
    project: 'NT6',
    itemCount: 12,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: false,
    items: generateOrderItems(12, 2000)
  },
  {
    id: '520591-2',
    orderNumber: '520591',
    date: '11. juni 2023',
    customer: 'LS Bygg og Service AS',
    customerNumber: '10567',
    phoneNumber: '99887766',
    project: 'NT6',
    itemCount: 8,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: false,
    items: generateOrderItems(8, 3000)
  },
  {
    id: '258748',
    orderNumber: '258748',
    date: '10. juni 2023',
    customer: 'Kunde uten konto',
    phoneNumber: '45678901',
    paymentStatus: 'Delvis betalt',
    itemCount: 4,
    total: 0,
    isCustomerWithoutAccount: true,
    requiresPrepayment: true,
    items: generateOrderItems(4, 4000),
    totals: undefined
  },
  {
    id: '258748-2',
    orderNumber: '298456',
    date: '10. juni 2023',
    customer: 'Kunde uten konto',
    phoneNumber: '45678902',
    paymentStatus: 'Delvis betalt',
    itemCount: 12,
    total: 0,
    isCustomerWithoutAccount: true,
    requiresPrepayment: true,
    items: generateOrderItems(12, 5000),
    totals: undefined
  },
  {
    id: '478923',
    orderNumber: '478923',
    date: '9. juni 2023',
    customer: 'Håndverkerne AS',
    customerNumber: '10892',
    phoneNumber: '91234567',
    project: 'Prosjekt Oslo',
    itemCount: 15,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: false,
    items: generateOrderItems(15, 6000)
  },
  {
    id: '556789',
    orderNumber: '556789',
    date: '9. juni 2023',
    customer: 'Snekker Hansen',
    customerNumber: '10445',
    phoneNumber: '97654321',
    project: 'Hytteutbygging',
    itemCount: 6,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: false,
    items: generateOrderItems(6, 7000)
  },
  {
    id: '667234',
    orderNumber: '667234',
    date: '8. juni 2023',
    customer: 'Kunde uten konto',
    phoneNumber: '98123456',
    itemCount: 2,
    total: 0,
    isCustomerWithoutAccount: true,
    requiresPrepayment: true,
    items: generateOrderItems(2, 8000),
    totals: undefined
  },
  {
    id: '701234',
    orderNumber: '701234',
    date: '8. juni 2023',
    customer: 'Bygg & Anlegg Sørensen',
    customerNumber: '10998',
    phoneNumber: '94567890',
    project: 'Renovering',
    paymentStatus: 'Delvis betalt',
    itemCount: 20,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: true,
    items: generateOrderItems(20, 9000),
    totals: undefined
  },
  {
    id: '812456',
    orderNumber: '812456',
    date: '7. juni 2023',
    customer: 'Maler Johansen',
    customerNumber: '10334',
    phoneNumber: '92345678',
    itemCount: 8,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: false,
    items: generateOrderItems(8, 10000)
  },
  {
    id: '934567',
    orderNumber: '934567',
    date: '7. juni 2023',
    customer: 'Tømrer Olsen',
    customerNumber: '10221',
    phoneNumber: '95678901',
    project: 'Terrasse',
    itemCount: 10,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: false,
    items: generateOrderItems(10, 11000)
  },
  {
    id: '123789',
    orderNumber: '123789',
    date: '6. juni 2023',
    customer: 'Kunde uten konto',
    phoneNumber: '91928374',
    itemCount: 5,
    total: 0,
    isCustomerWithoutAccount: true,
    requiresPrepayment: true,
    items: generateOrderItems(5, 12000),
    totals: undefined
  },
  {
    id: '245890',
    orderNumber: '245890',
    date: '6. juni 2023',
    customer: 'Elektrikeren AS',
    customerNumber: '10776',
    phoneNumber: '98765432',
    project: 'Elektrisk',
    itemCount: 14,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: false,
    items: generateOrderItems(14, 13000)
  },
  {
    id: '356901',
    orderNumber: '356901',
    date: '5. juni 2023',
    customer: 'Rørlegger Berg',
    customerNumber: '10889',
    phoneNumber: '93456789',
    project: 'Badrom',
    itemCount: 7,
    total: 0,
    isCustomerWithoutAccount: false,
    requiresPrepayment: false,
    items: generateOrderItems(7, 14000)
  },
  {
    id: '467012',
    orderNumber: '467012',
    date: '5. juni 2023',
    customer: 'Kunde uten konto',
    phoneNumber: '96543210',
    paymentStatus: 'Delvis betalt',
    itemCount: 3,
    total: 0,
    isCustomerWithoutAccount: true,
    requiresPrepayment: true,
    items: generateOrderItems(3, 15000),
    totals: undefined
  }
];

// Calculate totals for all orders
mockOrders.forEach(order => {
  if (order.requiresPrepayment && order.paymentStatus === 'Delvis betalt') {
    const totals = calculateOrderTotal(order.items, true);
    order.totals = typeof totals === 'number' ? undefined : totals;
    order.total = typeof totals === 'number' ? totals : totals.total;
  } else {
    const total = calculateOrderTotal(order.items, false);
    order.total = typeof total === 'number' ? total : total;
  }
});

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

function IconDown() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon / Down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g clipPath="url(#clip0_209_14908)" id="Icon / Down">
          <g id="Icon Plate"></g>
          <path d={svgPaths.p30f04900} fill="#6B6B72" id="Vector" />
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

export function PickupModal({ isOpen, onClose, onPickup }: PickupModalProps) {
  const { t } = useLanguage();
  const [customerSearch, setCustomerSearch] = useState('');
  const [orderNumberSearch, setOrderNumberSearch] = useState('');
  const [customerWithoutAccount, setCustomerWithoutAccount] = useState(false);
  const [showPrepaidOnly, setShowPrepaidOnly] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  // Filter orders based on search and filter criteria
  const filteredOrders = useMemo(() => {
    return mockOrders.filter(order => {
      if (customerSearch) {
        const searchLower = customerSearch.toLowerCase();
        const matchesCustomer = order.customer.toLowerCase().includes(searchLower);
        const matchesCustomerNumber = order.customerNumber?.toLowerCase().includes(searchLower);
        const matchesPhone = order.phoneNumber?.includes(searchLower);
        if (!matchesCustomer && !matchesCustomerNumber && !matchesPhone) {
          return false;
        }
      }

      if (orderNumberSearch) {
        if (!order.orderNumber.toLowerCase().includes(orderNumberSearch.toLowerCase())) {
          return false;
        }
      }

      if (customerWithoutAccount) {
        if (!order.isCustomerWithoutAccount) {
          return false;
        }
      }

      if (showPrepaidOnly) {
        if (!order.requiresPrepayment) {
          return false;
        }
      }

      return true;
    });
  }, [customerSearch, orderNumberSearch, customerWithoutAccount, showPrepaidOnly]);

  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('no-NO', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).replace(/\s/g, ' ');
  };

  const handlePickup = () => {
    const ordersToPickup = mockOrders.filter(order => selectedOrders.has(order.id));
    if (ordersToPickup.length > 0) {
      onPickup(ordersToPickup);
      onClose();
    }
  };

  const toggleOrderSelection = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const toggleExpanded = (orderId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-[5px] w-full max-w-[968px] h-[768px] flex flex-col overflow-hidden shadow-[2px_2px_4px_0px_rgba(126,126,126,0.06),3px_10px_15px_0px_rgba(126,126,126,0.06)]">
        {/* Header */}
        <div className="bg-white relative shrink-0 w-full" data-name="Module header">
          <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1.461px] border-solid inset-0 pointer-events-none" />
          <div className="flex flex-col justify-center size-full">
            <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-[20px] py-[22px] relative w-full">
              <div className="flex items-center gap-[11px]">
                <IconOrders />
                <p className="font-bold leading-[1.3] text-[#22222c] text-[15px] text-nowrap whitespace-pre">{t('fetchOrderForPayment')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative shrink-0 w-full">
          <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
          <div className="size-full">
            <div className="box-border content-stretch flex flex-col gap-[7px] items-start pb-[15px] pt-[20px] px-[20px] relative w-full">
              <div className="content-stretch flex gap-[40px] items-start leading-[0] relative shrink-0">
                {/* Kunde input */}
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Input and label">
                  <p className="[grid-area:1_/_1] font-bold leading-[1.75] ml-px mt-0 relative text-[#22222c] text-[14px]">{t('customer')}</p>
                  <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[6px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] w-[300px]" data-name="Textfield/Normal">
                    <div 
                      aria-hidden="true" 
                      className={`absolute border-2 border-solid inset-0 pointer-events-none rounded-[5px] ${customerSearch ? 'border-[#0d97fc]' : 'border-[#d5d5d7]'}`} 
                      style={customerSearch ? { boxShadow: '2px 2px 3px 0px inset rgba(0,0,0,0.1)' } : {}}
                    />
                    <input
                      type="text"
                      value={customerSearch}
                      onChange={(e) => setCustomerSearch(e.target.value)}
                      placeholder={t('searchPlaceholder')}
                      className="basis-0 font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-[#6b6b72] text-[14px] bg-transparent border-none outline-none placeholder:text-[#6b6b72]"
                    />
                    <IconSearch />
                  </div>
                </div>

                {/* Ordrenummer input */}
                <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-name="Input and label">
                  <p className="[grid-area:1_/_1] font-bold leading-[1.75] ml-px mt-0 relative text-[#22222c] text-[14px]">{t('orderNumber')}</p>
                  <div className="[grid-area:1_/_1] bg-white box-border content-stretch flex gap-[10px] h-[48px] items-center ml-0 mt-[26px] px-[14px] py-[8px] relative rounded-[5px] w-[300px]" data-name="Textfield/Normal">
                    <div 
                      aria-hidden="true" 
                      className={`absolute border-2 border-solid inset-0 pointer-events-none rounded-[5px] ${orderNumberSearch ? 'border-[#0d97fc]' : 'border-[#d5d5d7]'}`}
                      style={orderNumberSearch ? { boxShadow: '2px 2px 3px 0px inset rgba(0,0,0,0.1)' } : {}}
                    />
                    <input
                      type="text"
                      value={orderNumberSearch}
                      onChange={(e) => setOrderNumberSearch(e.target.value)}
                      placeholder="Søk etter ordrenummer"
                      className="basis-0 font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-[#6b6b72] text-[14px] bg-transparent border-none outline-none placeholder:text-[#6b6b72]"
                    />
                    <IconSearch />
                  </div>
                </div>
              </div>

              {/* Kunde uten konto checkbox */}
              <div className="box-border content-stretch flex flex-col gap-[8px] h-[48px] items-start justify-center pl-0 pr-[8px] py-[8px] relative shrink-0">
                <label className="content-stretch flex gap-[8px] items-center relative shrink-0 cursor-pointer" data-name="Checkbox with label">
                  <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
                    <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                    <input
                      type="checkbox"
                      checked={customerWithoutAccount}
                      onChange={(e) => setCustomerWithoutAccount(e.target.checked)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {customerWithoutAccount && (
                      <svg className="absolute inset-0 m-auto pointer-events-none" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#0d97fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <p className="font-normal leading-[1.4] relative shrink-0 text-[#090914] text-[12px] text-nowrap whitespace-pre">Kunde uten konto</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle */}
        <div className="relative shrink-0 w-full" data-name="Toggle big">
          <div className="flex flex-row items-center size-full">
            <div className="box-border content-stretch flex gap-[9px] items-center pb-[15px] pl-[20px] pr-0 pt-[5px] relative w-full">
              <label className="content-stretch flex gap-[9px] h-[48px] items-center relative shrink-0 cursor-pointer" data-name="Toggle">
                <div className="h-[25px] relative shrink-0 w-[46.25px]" data-name="Control">
                  <div className={`absolute bottom-[15%] left-[2.7%] right-0 rounded-[125px] top-[15%] transition-colors ${showPrepaidOnly ? 'bg-[#0d97fc]' : 'bg-[#989899]'}`} data-name="Track" />
                  <div 
                    className={`absolute bg-white border-[#d5d5d7] border-[1.25px] border-solid bottom-0 rounded-[125px] shadow-[0px_1.25px_2.5px_0px_rgba(0,0,0,0.27)] top-0 transition-all ${showPrepaidOnly ? 'left-[45.95%] right-0' : 'left-0 right-[45.95%]'}`} 
                    data-name="Button" 
                  />
                  <input
                    type="checkbox"
                    checked={showPrepaidOnly}
                    onChange={(e) => setShowPrepaidOnly(e.target.checked)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="font-normal leading-[1.4] relative shrink-0 text-[#090914] text-[14px] text-center text-nowrap whitespace-pre">Vis kun ordre som skal forhåndsbetales</p>
              </label>
            </div>
          </div>
        </div>

        {/* Table Header */}
        <div className="box-border content-stretch flex flex-col gap-[10px] items-start pl-[67px] pr-0 py-0 relative shrink-0 pb-[10px]">
          <div className="font-medium h-[15px] leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap w-[876px]">
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
        </div>

        {/* Order List - Fixed height with scroll when needed */}
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
                const isExpanded = expandedOrderId === order.id;
                const isSelected = selectedOrders.has(order.id);
                
                return (
                  <div 
                    key={order.id} 
                    className={`bg-white box-border content-stretch flex flex-col items-start justify-center px-0 relative rounded-[5px] shrink-0 w-full ${!isExpanded ? 'py-[12px] h-[62px]' : 'pt-[14px] pb-0'}`}
                    data-name="Orderrows"
                  >
                    <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                    
                    {/* Background colors for expanded state */}
                    {isExpanded && (
                      <>
                        <div className="absolute bg-sky-50 h-[63px] left-px right-px rounded-tl-[5px] rounded-tr-[5px] top-px" />
                        <div className="absolute bg-neutral-50 left-px right-px top-[65px] bottom-px rounded-bl-[5px] rounded-br-[5px]" />
                      </>
                    )}
                    
                    {/* Order Header */}
                    <div className="relative shrink-0 w-full z-10">
                      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                        <div className={`box-border content-stretch flex gap-[5px] items-center py-0 relative w-full ${isExpanded ? 'pl-[10px] pr-[30px]' : 'px-[10px]'}`}>
                          {/* Left side - Checkbox and Order Info */}
                          <div 
                            className="content-stretch flex gap-[43px] items-center relative shrink-0 w-[430px] cursor-pointer"
                            onClick={() => toggleOrderSelection(order.id)}
                          >
                            <div className="content-stretch flex gap-[15px] items-center relative shrink-0">
                              {/* Checkbox */}
                              {isSelected ? (
                                <div className="relative shrink-0 size-[24px]" data-name="Checkbox">
                                  <div className="absolute bottom-[-25%] left-[-12.5%] right-[-12.5%] top-0">
                                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
                                      <g filter="url(#filter0_d_209_24031)" id="Checkbox">
                                        <rect fill="#0D97FC" height="24" rx="5" width="24" x="3" />
                                        <path d="M15.5 11L11.5 15L9.5 13" id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                      </g>
                                      <defs>
                                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="30" id="filter0_d_209_24031" width="30" x="0" y="0">
                                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                                          <feOffset dy="3" />
                                          <feGaussianBlur stdDeviation="1.5" />
                                          <feColorMatrix type="matrix" values="0 0 0 0 0.419608 0 0 0 0 0.419608 0 0 0 0 0.447059 0 0 0 0.06 0" />
                                          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_209_24031" />
                                          <feBlend in="SourceGraphic" in2="effect1_dropShadow_209_24031" mode="normal" result="shape" />
                                        </filter>
                                      </defs>
                                    </svg>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-white relative rounded-[5px] shrink-0 size-[24px]" data-name="Checkbox">
                                  <div aria-hidden="true" className="absolute border border-[#d5d5d7] border-solid inset-0 pointer-events-none rounded-[5px]" />
                                </div>
                              )}

                              {/* Order Number and Date */}
                              <div className="font-normal grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0 text-nowrap">
                                <div className="[grid-area:1_/_1] flex flex-col justify-center ml-[4px] mt-[26.5px] relative text-[#42424a] text-[12px] translate-y-[-50%]">
                                  <p className="leading-[normal]">{order.date}</p>
                                </div>
                                <div className="[grid-area:1_/_1] flex flex-col justify-center ml-0 mt-[8.5px] relative text-[#22222c] text-[14px] translate-y-[-50%]">
                                  <p className="leading-[normal] text-nowrap whitespace-pre">{order.orderNumber}</p>
                                </div>
                              </div>
                            </div>

                            {/* Customer and Project */}
                            <div className="content-stretch flex flex-col gap-[2px] items-start justify-center leading-[0] relative shrink-0 text-nowrap">
                              <div className="flex flex-col font-medium justify-center relative shrink-0 text-[#22222c] text-[14px]">
                                <p className="leading-[normal] text-nowrap whitespace-pre">{order.customer}</p>
                              </div>
                              {order.project && (
                                <div className="flex flex-col font-normal justify-center relative shrink-0 text-[#42424a] text-[12px]">
                                  <p className="leading-[normal] text-nowrap whitespace-pre">Prosjekt: {order.project}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right side - Label/Counter and Total */}
                          <div className="basis-0 grow min-h-px min-w-px relative shrink-0" data-name="sum">
                            <div className="flex flex-row items-center justify-end size-full">
                              <div className={`box-border content-stretch flex gap-[20px] items-center justify-end pl-[10px] py-0 relative w-full ${isExpanded ? 'pr-[5px]' : 'pr-[25px]'}`}>
                                {/* Label and Counter */}
                                <div className="content-stretch flex flex-col gap-[4px] items-end justify-center relative shrink-0" data-name="Label and counter">
                                  {order.paymentStatus && (
                                    <div className="box-border content-stretch flex gap-[10px] items-center justify-center px-[4px] py-px relative rounded-[3px] shrink-0" data-name="Label">
                                      <div aria-hidden="true" className="absolute border border-[#ff8c21] border-solid inset-0 pointer-events-none rounded-[3px]" />
                                      <p className="font-semibold leading-[1.38] relative shrink-0 text-[#ff8c21] text-[11px] text-nowrap whitespace-pre">{order.paymentStatus}</p>
                                    </div>
                                  )}
                                  <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#42424a] text-[12px] text-nowrap">
                                    <p className="leading-[normal] whitespace-pre">{order.itemCount} varelinjer</p>
                                  </div>
                                </div>

                                {/* Total */}
                                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#22222c] text-[14px] text-nowrap text-right">
                                  <p className="leading-[normal] whitespace-pre"> {formatCurrency(order.total)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && order.items.length > 0 && (
                      <div className="box-border content-stretch flex flex-col items-start justify-center pb-0 pt-[15px] px-0 relative shrink-0 w-full z-10">
                        {/* Table Header Row */}
                        <div className="relative shrink-0 w-full" data-name="Table/Row">
                          <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
                            {/* Item name */}
                            <div className="basis-0 bg-[rgba(255,255,255,0)] grow h-[28px] min-h-px min-w-px relative shrink-0" data-name="Table/Cell">
                              <div className="flex flex-col justify-end overflow-clip rounded-[inherit] size-full">
                                <div className="box-border content-stretch flex flex-col h-[28px] items-start justify-end px-[10px] py-0 relative w-full">
                                  <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                                    <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                                      <p className="leading-[normal] whitespace-pre">Item name</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* Quantity */}
                            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[100px]">
                              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                                  <p className="leading-[normal] whitespace-pre">Quantity</p>
                                </div>
                              </div>
                            </div>
                            {/* Per unit */}
                            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[90px]">
                              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                                  <p className="leading-[normal] whitespace-pre">Per unit</p>
                                </div>
                              </div>
                            </div>
                            {/* Discount */}
                            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-center justify-end overflow-clip px-[10px] py-0 relative shrink-0 w-[70px]">
                              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                                  <p className="leading-[normal] whitespace-pre">Discount</p>
                                </div>
                              </div>
                            </div>
                            {/* Total */}
                            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col h-[28px] items-end justify-end overflow-clip pl-[10px] pr-[40px] py-0 relative shrink-0 w-[110px]">
                              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                                <div className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-[#6b6b72] text-[12px] text-nowrap">
                                  <p className="leading-[normal] whitespace-pre">Total</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
                        </div>

                        {/* Item Rows */}
                        {order.items.map((item, index) => (
                          <div key={index} className="relative shrink-0 w-full" data-name="Table/Row">
                            <div className="content-stretch flex items-start overflow-clip relative rounded-[inherit] w-full">
                              {/* Product Name and SKU */}
                              <div className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0">
                                <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
                                  <div className="box-border content-stretch flex flex-col items-start justify-center px-[10px] py-[5px] relative w-full">
                                    <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                                      <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#22222c] text-[0px] text-nowrap">
                                        <p className="leading-[19px] whitespace-pre">
                                          <span className="font-medium text-[14px]">{item.name}</span>
                                          <span className="text-[14px]">
                                            <br aria-hidden="true" />
                                          </span>
                                          <span className="text-[#6b6b72] text-[12px]">{item.sku}</span>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Quantity and Unit */}
                              <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-end justify-center px-[10px] py-[5px] relative shrink-0 w-[100px]">
                                <div className="content-stretch flex flex-col gap-[2px] h-[40px] items-end justify-center relative shrink-0">
                                  <div className="flex gap-[4px] items-baseline">
                                    <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#090914] text-[14px] text-nowrap border-b border-[#090914]">
                                      <p className="leading-[1.38] whitespace-pre">{item.quantity.toFixed(2)}</p>
                                    </div>
                                    <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#22182c] text-[14px] text-nowrap">
                                      <p className="leading-[1.38] whitespace-pre">{item.unit}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Price */}
                              <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-end justify-center px-[10px] py-[5px] relative shrink-0 w-[90px]">
                                <div className="content-stretch flex gap-[10px] h-[40px] items-center overflow-clip relative shrink-0">
                                  <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[#090914] text-[14px] text-nowrap border-b border-[#090914]">
                                    <p className="leading-[1.38] whitespace-pre">{formatCurrency(item.price)}</p>
                                  </div>
                                </div>
                              </div>
                              {/* Discount */}
                              <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-center justify-center overflow-clip px-[10px] py-[5px] relative shrink-0 w-[70px]">
                                <div className="content-stretch flex gap-[10px] h-[40px] items-center overflow-clip relative shrink-0">
                                  <div className="flex gap-[3px] items-baseline leading-[0] relative shrink-0 text-nowrap border-b border-[#090914]">
                                    <div className="flex flex-col font-normal justify-center relative shrink-0 text-[#090914] text-[14px]">
                                      <p className="leading-[1.38] text-nowrap whitespace-pre">{item.discount}</p>
                                    </div>
                                    <div className="flex flex-col font-semibold justify-center relative shrink-0 text-[#42424a] text-[12px]">
                                      <p className="leading-[1.38] text-nowrap whitespace-pre">%</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Total */}
                              <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-end justify-center overflow-clip pl-[10px] pr-[40px] py-[5px] relative shrink-0 w-[110px]">
                                <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                                  <div className="flex flex-col font-medium justify-center leading-[19px] relative shrink-0 text-[#22222c] text-[0px] text-nowrap text-right whitespace-pre">
                                    <p className="mb-0 text-[14px]">{formatCurrency(item.total)}</p>
                                    {item.discount > 0 && (
                                      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-solid font-normal line-through text-[#6b6b72] text-[12px]">{formatCurrency(item.originalTotal)}</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div aria-hidden="true" className="absolute border-[#e6e6e8] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
                          </div>
                        ))}

                        {/* Totals Row */}
                        {order.totals && (
                          <div className="box-border content-stretch flex items-start overflow-clip px-0 py-[15px] relative shrink-0 w-full">
                            <div className="basis-0 bg-[rgba(255,255,255,0)] grow min-h-px min-w-px relative shrink-0">
                              <div className="flex flex-col items-end overflow-clip rounded-[inherit] size-full">
                                <div className="box-border content-stretch flex flex-col items-end pl-0 pr-[5px] py-0 relative w-full">
                                  <div className="content-stretch flex gap-[10px] items-center justify-end overflow-clip relative shrink-0">
                                    <div className="flex flex-col font-medium justify-center leading-[21px] relative shrink-0 text-[#22222c] text-[12px] text-nowrap text-right whitespace-pre">
                                      <p className="font-normal mb-0">Totalt</p>
                                      <p className="font-normal mb-0">Forhåndsbetalt</p>
                                      <p>Gjenstående</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-[rgba(255,255,255,0)] box-border content-stretch flex flex-col items-start overflow-clip pl-[10px] pr-[40px] py-0 relative shrink-0">
                              <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                                <div className="flex flex-col font-medium justify-center leading-[21px] relative shrink-0 text-[#22222c] text-[12px] text-nowrap text-right whitespace-pre">
                                  <p className="font-normal mb-0">{formatCurrency(order.totals.total)}</p>
                                  <p className="font-normal mb-0">{formatCurrency(order.totals.prepaid)}</p>
                                  <p>{formatCurrency(order.totals.remaining)}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Chevron */}
                    <div 
                      className={`absolute content-stretch flex gap-[10px] items-center justify-center right-[9px] cursor-pointer z-20 ${isExpanded ? 'top-[23px]' : 'top-[calc(50%+0.5px)] translate-y-[-50%]'}`}
                      onClick={(e) => toggleExpanded(order.id, e)}
                    >
                      <div className={`flex items-center justify-center relative shrink-0 transition-transform ${isExpanded ? 'scale-y-[-100%]' : ''}`}>
                        <IconDown />
                      </div>
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
              onClick={handlePickup}
              disabled={selectedOrders.size === 0}
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
                background: selectedOrders.size > 0 ? 'var(--primary)' : 'var(--secondary)',
                color: selectedOrders.size > 0 ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                opacity: selectedOrders.size > 0 ? 1 : 0.6,
                cursor: selectedOrders.size > 0 ? 'pointer' : 'not-allowed',
              }}
              data-name="Button"
            >
              {t('fetchForPayment')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
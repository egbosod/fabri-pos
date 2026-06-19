import type { OrderLineState } from '../components/OrderLineRow';
import type { OrderLineState as SwipeableOrderLineState } from '../components/SwipeableOrderItem';
import type { ItemMetadata } from '../components/pricingUtils';

export type { OrderLineState, SwipeableOrderLineState, ItemMetadata };

export interface Customer {
  id: string;
  name: string;
  customerNumber: string;
  type: 'Proff' | 'Privat';
  discountRate?: number;
  category?: string;
}

export interface Project {
  id: string;
  nr: string;
  ekstNr: string;
  navn: string;
  adresse: string;
  postnr: string;
  utlopsdato: string;
}

export type RowState = 'normal' | 'return' | 'returned' | 'delete' | 'deleted';

export interface ProductItem {
  id: number;
  varenr: string;
  varetekst: string;
  leverandor: string;
  pris: string;
  beholdning: string | null;
  info: string[];
  isNonStock: boolean;
  state: RowState;
}

export interface CartItem {
  name: string;
  sku: string;
  priceInfo?: {
    priceString: string;
    numericPrice: number;
    formattedPrice: string;
  };
  price: number;
  quantity: number;
  unit: string;
  discount: number;
  total: number;
  smartPrice?: number;
  pricingMethod?: string;
  state?: OrderLineState;
  label?: {
    text: string;
    color: string;
    bgColor: string;
  };
}

export interface OrderGroupData {
  id: string;
  type: 'handterminal' | 'order';
  status?: 'AggregatedHandOpen' | 'AggregatedOrderClosed' | 'normal';
  orderNumber?: string;
  orderDate: string;
  customerName?: string;
  projectName?: string;
  phoneNumber?: string;
  total: number;
  prepaidAmount?: number;
  remainingAmount?: number;
  paymentStatus?: string;
  paymentStatusVariant?: 'partial' | 'full' | 'pending' | 'unpaid';
  itemCount: number;
  badge?: string;
  label?: {
    text: string;
    borderColor: string;
  };
  showRemoveButton?: boolean;
  items: {
    id?: string;
    name: string;
    sku: string;
    quantity: number;
    unit: string;
    price: number;
    discount?: number;
    total: number;
    originalTotal?: number;
    state?: OrderLineState;
    isDeleted?: boolean;
    label?: {
      text: string;
      color: string;
      bgColor: string;
    };
    metadata?: ItemMetadata;
  }[];
}

export type ModalName =
  | 'customer'
  | 'pda'
  | 'pickup'
  | 'inventory'
  | 'payment'
  | 'config'
  | 'faktura'
  | 'switch-user';

export interface PaymentTotals {
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
  returnAmount: number;
}
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
  | 'pricecheck-inventory'
  | 'payment'
  | 'config'
  | 'faktura'
  | 'switch-user'
  | 'hovedordre'
  | 'pro-card'
  | 'packing-slip-signature'
  | 'delivery-note';

export interface PaymentTotals {
  subtotal: number;
  discount: number;
  total: number;
  itemCount: number;
  returnAmount: number;
}
/* ─── VIP card (Aspect4 DK / Prototype C) ──────────────────────────────────── */

export type VipCardStatus = 'open' | 'blocked';

/**
 * Payload returned by the VIP card reader (aspect4-pos-proxy).
 * Simulated in the prototype via the Ctrl+< shortcut.
 */
export interface VipCardData {
  /** Raw VIP card id / barcode */
  cardId: string;
  /** Customer number used to look up the customer record */
  customerId: string;
  customerName: string;
  status: VipCardStatus;
  /** Numeric — formatted at render time only */
  creditLimit: number;
  projectRequired: boolean;
  requisitionRequired: boolean;
  address?: { line1: string; line2?: string; postalCode: string; city: string };
  /** Every VIP field except Navn is marked mandatory (asterisk) */
  allFieldsMandatory?: boolean;
  /** Navn comes locked from the card and cannot be edited at the till */
  nameReadOnly?: boolean;
}

/* ─── PRO card (XL-BYG/Aspect4 / Prototype B) ──────────────────────────────── */

export type ProCardStatus = 'open' | 'blocked';

/**
 * Payload returned by Aspect4 (via aspect4-pos-proxy) for a PRO card lookup.
 * Simulated in the prototype via the Ctrl+> shortcut. Independent from the
 * VIP card concept above (Prototype C / Aspect4 DK) — do not merge the two.
 */
export interface ProCardData {
  cardNumber: string;
  customerNumber: string;
  customerName: string;
  address?: { line1: string; line2?: string; postalCode: string; city: string };
  creditLimit: number;
  status: ProCardStatus;
  projectRequired: boolean;
  requisitionRequired: boolean;
}

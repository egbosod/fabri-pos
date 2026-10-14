import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { getLoginToken } from '../utils/loginToken';
import type {
  Customer,
  Project,
  CartItem,
  OrderGroupData,
  InvoiceForPayment,
  OrderLineState,
  PaymentTotals,
  VipCardData,
} from '../types/pos';

/* ─── Context value shape ──────────────────────────────────────────────────── */

export interface ParkedSale {
  id: string;
  parkedAt: number;
  /** Username of whoever parked it; the panel shows "you" for the current user. */
  parkedBy: string;
  createdBy: string;
  customerName: string;
  bong: string;
  total: number;
  addedItems: CartItem[];
  orderGroups: OrderGroupData[];
  customer: Customer | null;
  project: Project | null;
  vipCard: VipCardData | null;
}

interface POSContextValue {
  addedItems: CartItem[];
  handleAddToSale: (item: CartItem) => void;
  handleRemoveAddedItem: (index: number) => void;
  handleUpdateAddedItem: (index: number, patch: Partial<CartItem>) => void;
  orderGroups: OrderGroupData[];
  handlePickupOrder: (orders: any[]) => void;
  handlePickupInvoices: (invoices: InvoiceForPayment[]) => void;
  handleAddAccountPayment: (amount: number) => void;
  handleFetchExpedition: (expeditionData: any) => void;
  handleRemoveOrderGroup: (groupId: string) => void;
  handleRemoveAllItemsFromGroup: (groupId: string) => void;
  /** Strike every sale line through — the "Remove items" answer to a credit block */
  markAllItemsRemoved: () => void;
  selectedCustomer: Customer | null;
  selectedProject: Project | null;
  handleCustomerConfirm: (customer: Customer | null, project?: Project) => void;
  handleRemoveCustomer: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  inventorySearchValue: string;
  setInventorySearchValue: (v: string) => void;
  currentUser: string;
  setCurrentUser: (u: string) => void;
  currentConfigItem: { name: string; code: string; price: number; unit: string } | null;
  setCurrentConfigItem: (item: { name: string; code: string; price: number; unit: string } | null) => void;
  pendingInventoryItems: any[];
  setPendingInventoryItems: (items: any[]) => void;
  userSwitchToast: { visible: boolean; username: string };
  showUserSwitchNotification: (username: string) => void;
  userLogoutToast: { visible: boolean; username: string };
  showUserLogoutNotification: (username: string) => void;
  paymentTotals: PaymentTotals;
  hasOrderItems: boolean;
  resetPOS: () => void;
  /** Empties the sale (order groups + added lines) but keeps customer, project and user. */
  clearCart: () => void;
  /** Sales set aside with "Park sale" — snapshots of the cart, customer, project and VIP card. */
  parkedSales: ParkedSale[];
  /** Snapshots the live sale into parkedSales, then clears it for a fresh one. */
  parkSale: () => void;
  /** Makes a parked sale the live sale again (the caller deals with any open sale first). */
  restoreParkedSale: (id: string) => void;
  /** Throws the live sale away (cart, customer, project, VIP card); keeps the user. */
  discardSale: () => void;
  selectedHovedordre: { ordrenummer: string } | null;
  setSelectedHovedordre: (order: { ordrenummer: string } | null) => void;
  /* Price check (Prissjekkmodus) — separate basket, kept off the live sale */
  priceCheckItems: CartItem[];
  addPriceCheckItems: (items: CartItem[]) => void;
  removePriceCheckItem: (index: number) => void;
  updatePriceCheckItem: (index: number, patch: Partial<CartItem>) => void;
  priceCheckCustomer: Customer | null;
  priceCheckProject: Project | null;
  setPriceCheckCustomer: (customer: Customer | null, project?: Project) => void;
  initPriceCheck: () => void;
  clearPriceCheck: () => void;
  clearPriceCheckItems: () => void;
  priceCheckLocked: boolean;
  /* VIP card (Aspect4 DK / Prototypes B & C) */
  vipCard: VipCardData | null;
  setVipCard: (card: VipCardData | null) => void;
  /** A scanned card the cashier hasn't confirmed yet; only the modal sees it. */
  pendingVipCard: VipCardData | null;
  setPendingVipCard: (card: VipCardData | null) => void;
  vipAcknowledged: boolean;
  setVipAcknowledged: (ack: boolean) => void;
  vipBlocked: boolean;
  vipCreditExceeded: boolean;
}

const POSContext = createContext<POSContextValue | null>(null);

export function usePOS(): POSContextValue {
  const ctx = useContext(POSContext);
  if (!ctx) {
    throw new Error('usePOS must be used within POSProvider');
  }
  return ctx;
}

/** Mock colleague sales shown next to the cashier's own once something has been parked. */
function seedColleagueSales(): ParkedSale[] {
  const mk = (id: string, at: Date, bong: string, total: number, lineName: string, sku: string, quantity = 1): ParkedSale => ({
    id,
    parkedAt: at.getTime(),
    parkedBy: 'egtnpa',
    createdBy: 'egtnpa',
    customerName: 'BYGGMESTER SNORRE ROGNE',
    bong,
    total,
    addedItems: [{ name: lineName, sku, price: total / quantity, quantity, unit: 'STK', discount: 0, total }],
    orderGroups: [],
    customer: null,
    project: null,
    vipCard: null,
  });
  return [
    mk('seed-v3-70', new Date(2026, 9, 13, 10, 57), 'V3-70', 64.9, 'ØYESKRUE SVEIS 432 8X77 Ø15 ELF SB', '27620145'),
    mk('seed-v3-69', new Date(2026, 9, 13, 10, 56), 'V3-69', -55.16, 'GIPSSKRUE 3,9X35 FOSFATERT 1000 STK', '27610388', -1),
    mk('seed-v3-68', new Date(2026, 9, 13, 10, 9), 'V3-68', -143.65, 'MALERTAPE GUL 50 MM X 50 M', '27455012', -1),
    mk('seed-v3-67', new Date(2026, 9, 13, 10, 7), 'V3-67', 423.16, 'BYGNINGSFOLIE 0,2 MM 4X25 M', '27300771'),
  ];
}

/* ─── Provider ─────────────────────────────────────────────────────────────── */

export function POSProvider({ children }: { children: React.ReactNode }) {
  /* ── Cart ───────────────────────────────────────────────────────────────── */
  const [addedItems, setAddedItems] = useState<CartItem[]>([]);

  const handleAddToSale = useCallback((item: CartItem) => {
    setAddedItems((prev) => [...prev, item]);
  }, []);

  const handleRemoveAddedItem = useCallback((index: number) => {
    setAddedItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleUpdateAddedItem = useCallback((index: number, patch: Partial<CartItem>) => {
    setAddedItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }, []);

  /* ── Order groups ───────────────────────────────────────────────────────── */
  const [orderGroups, setOrderGroups] = useState<OrderGroupData[]>([]);

  const handlePickupOrder = useCallback((orders: any[]) => {
    const newGroups: OrderGroupData[] = orders.map((order) => ({
      id: `picked-order-${order.id}-${Date.now()}`,
      type: 'order' as const,
      status: 'AggregatedOrderClosed' as const,
      orderNumber: `Ordre ${order.orderNumber}`,
      orderDate: order.date,
      customerName: order.customer,
      projectName: order.project,
      total: order.total,
      paymentStatus: order.paymentStatus || 'Ikke betalt',
      paymentStatusVariant: order.paymentStatus ? ('partial' as const) : ('pending' as const),
      itemCount: order.itemCount,
      items: (order.items || []).map((item: any, index: number) => ({
        id: `${order.id}-item-${index}`,
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        discount: item.discount,
        total: item.total,
        originalTotal: item.originalTotal || item.total,
      })),
    }));
    setOrderGroups((prev) => [...prev, ...newGroups]);
  }, []);

  const handlePickupInvoices = useCallback((invoices: InvoiceForPayment[]) => {
    setOrderGroups((prev) => {
      const already = new Set(prev.map((g) => g.invoice?.id));
      const added: OrderGroupData[] = invoices
        .filter((inv) => !already.has(inv.id))
        .map((inv) => {
          const remaining = inv.total - inv.prepaid;
          return {
            id: `invoice-${inv.id}`,
            type: 'order' as const,
            status: 'Invoice' as const,
            invoice: inv,
            orderDate: inv.dueDate,
            total: remaining,
            itemCount: 1,
            items: [{ name: `Invoice ${inv.number}`, sku: inv.customerRef, quantity: 1, unit: 'STK', price: remaining, discount: 0, total: remaining }],
          };
        });
      return [...prev, ...added];
    });
  }, []);

  const handleAddAccountPayment = useCallback((amount: number) => {
    const id = `account-${Date.now()}`;
    setOrderGroups((prev) => [
      ...prev,
      {
        id,
        type: 'order' as const,
        status: 'Invoice' as const,
        invoice: { id, number: '', dueDate: '', customerRef: '', total: amount, prepaid: 0, kind: 'account' as const },
        orderDate: '',
        total: amount,
        itemCount: 1,
        items: [{ name: 'Account payment', sku: '', quantity: 1, unit: 'STK', price: amount, discount: 0, total: amount }],
      },
    ]);
  }, []);

  const handleFetchExpedition = useCallback((expeditionData: any) => {
    let items: any[];
    let expeditionInfo: any;

    if (Array.isArray(expeditionData)) {
      items = expeditionData;
      expeditionInfo = { time: 'I dag', customer: 'Kunde', project: '', seller: 'Terminal' };
    } else if (expeditionData?.items && Array.isArray(expeditionData.items)) {
      items = expeditionData.items;
      expeditionInfo = expeditionData;
    } else {
      return;
    }

    const totalAmount = items.reduce((sum: number, item: any) => sum + item.total, 0);

    const newGroup: OrderGroupData = {
      id: `handterminal-${Date.now()}`,
      type: 'handterminal',
      orderDate: expeditionInfo.time || 'I dag',
      customerName: expeditionInfo.customer,
      projectName: expeditionInfo.project,
      phoneNumber: expeditionInfo.seller,
      total: totalAmount,
      itemCount: items.length,
      items: items.map((item: any) => ({
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        unit: item.unit,
        price: item.price,
        discount: item.discount || 0,
        total: item.total,
      })),
    };

    setOrderGroups((prev) => [...prev, newGroup]);
  }, []);

  const handleRemoveOrderGroup = useCallback((groupId: string) => {
    setOrderGroups((prev) => prev.filter((g) => g.id !== groupId));
  }, []);

  /**
   * Strikes every line in the sale through instead of dropping it, so the
   * cashier can see what the "Remove items" answer to a credit block actually
   * took out. Totals skip struck lines, so the running total falls with it.
   */
  const markAllItemsRemoved = useCallback(() => {
    setOrderGroups((prev) =>
      prev.map((group) => ({ ...group, items: group.items.map((item) => ({ ...item, isDeleted: true })) })),
    );
    setAddedItems((prev) => prev.map((item) => ({ ...item, state: 'deleted' as const })));
  }, []);

  const handleRemoveAllItemsFromGroup = useCallback((groupId: string) => {
    setOrderGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? { ...group, items: group.items.map((item) => ({ ...item, isDeleted: true })) }
          : group,
      ),
    );
  }, []);

  /* ── Customer / Project ─────────────────────────────────────────────────── */
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleCustomerConfirm = useCallback((customer: Customer | null, project?: Project) => {
    setSelectedCustomer(customer);
    setSelectedProject(project || null);
  }, []);

  const handleRemoveCustomer = useCallback(() => {
    setSelectedCustomer(null);
    setSelectedProject(null);
    setSelectedHovedordre(null);
  }, []);

  /* ── Price check (Prissjekkmodus) ───────────────────────────────────────── */
  const [priceCheckItems, setPriceCheckItems] = useState<CartItem[]>([]);
  const [priceCheckCustomer, setPriceCheckCustomerState] = useState<Customer | null>(null);
  const [priceCheckProject, setPriceCheckProjectState] = useState<Project | null>(null);

  const addPriceCheckItems = useCallback((items: CartItem[]) => {
    setPriceCheckItems((prev) => [...prev, ...items]);
  }, []);

  const removePriceCheckItem = useCallback((index: number) => {
    setPriceCheckItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updatePriceCheckItem = useCallback((index: number, patch: Partial<CartItem>) => {
    setPriceCheckItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }, []);

  const setPriceCheckCustomer = useCallback((customer: Customer | null, project?: Project) => {
    setPriceCheckCustomerState(customer);
    setPriceCheckProjectState(project || null);
  }, []);

  /** Pre-load rule: when price check opens with nothing chosen yet, mirror the live sale's customer/project. */
  const initPriceCheck = useCallback(() => {
    setPriceCheckCustomerState((prev) => prev ?? selectedCustomer);
    setPriceCheckProjectState((prev) => prev ?? selectedProject);
  }, [selectedCustomer, selectedProject]);

  const clearPriceCheck = useCallback(() => {
    setPriceCheckItems([]);
    setPriceCheckCustomerState(null);
    setPriceCheckProjectState(null);
  }, []);

  /** Clears just the basket — keeps the chosen customer/project (used after "add to cart"). */
  const clearPriceCheckItems = useCallback(() => {
    setPriceCheckItems([]);
  }, []);

  /** EBS-11395: customer/project can't be swapped once the price-check basket has items. */
  const priceCheckLocked = priceCheckItems.length > 0;

  /* ── VIP card ───────────────────────────────────────────────────────────── */
  // Sale-scoped: must outlive the customer modal so PaymentFlowModal can read it.
  const [vipCard, setVipCard] = useState<VipCardData | null>(null);
  const [pendingVipCard, setPendingVipCard] = useState<VipCardData | null>(null);
  const [vipAcknowledged, setVipAcknowledged] = useState(false);

  /* ── Hovedordre (Main order) ────────────────────────────────────────────── */
  const [selectedHovedordre, setSelectedHovedordre] = useState<{ ordrenummer: string } | null>(null);

  /* ── Search ─────────────────────────────────────────────────────────────── */
  const [searchQuery, setSearchQuery] = useState('');
  const [inventorySearchValue, setInventorySearchValue] = useState('');

  /* ── User ────────────────────────────────────────────────────────────────── */
  const [currentUser, setCurrentUser] = useState(() => getLoginToken()?.username ?? 'Erik Wheeler');

  /* ── Item config staging ────────────────────────────────────────────────── */
  const [currentConfigItem, setCurrentConfigItem] = useState<{
    name: string;
    code: string;
    price: number;
    unit: string;
  } | null>(null);
  const [pendingInventoryItems, setPendingInventoryItems] = useState<any[]>([]);

  /* ── Notifications ──────────────────────────────────────────────────────── */
  const [userSwitchToast, setUserSwitchToast] = useState<{
    visible: boolean;
    username: string;
  }>({ visible: false, username: '' });
  const [userLogoutToast, setUserLogoutToast] = useState<{
    visible: boolean;
    username: string;
  }>({ visible: false, username: '' });

  const showUserSwitchNotification = useCallback((username: string) => {
    setUserSwitchToast({ visible: true, username });
    setTimeout(() => {
      setUserSwitchToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  }, []);

  const showUserLogoutNotification = useCallback((username: string) => {
    setUserLogoutToast({ visible: true, username });
    setTimeout(() => {
      setUserLogoutToast((prev) => ({ ...prev, visible: false }));
    }, 2500);
  }, []);

  /* ── Payment calculation ────────────────────────────────────────────────── */
  const paymentTotals: PaymentTotals = React.useMemo(() => {
    let subtotal = 0;
    let totalDiscount = 0;
    let itemCount = 0;
    const returnAmount = 0;

    orderGroups.forEach((group) => {
      group.items.forEach((item) => {
        if (item.isDeleted) return;
        const lineTotal = (item.price || 0) * (item.quantity || 0);
        itemCount += 1;
        subtotal += lineTotal;
        if (item.discount) totalDiscount += lineTotal * (item.discount / 100);
      });
    });

    addedItems.forEach((item) => {
      if (item.state === 'deleted') return;
      const lineTotal = (item.price || 0) * (item.quantity || 0);
      itemCount += 1;
      subtotal += lineTotal;
      if (item.discount) totalDiscount += lineTotal * (item.discount / 100);
    });

    return {
      subtotal,
      discount: totalDiscount,
      total: subtotal - totalDiscount - returnAmount,
      itemCount,
      returnAmount,
    };
  }, [orderGroups, addedItems]);

  /**
   * Mid-sale credit-exceeded (open question 5 in docs/vip-card-spec.md).
   * The running sale total has tipped past the limit the VIP card carries —
   * the card's limit replaces the standard account's, so this is the only
   * credit figure that matters while a card is registered. Derived, not
   * stored, so removing lines or removing the card clears it on its own.
   */
  const vipCreditExceeded = !!vipCard && paymentTotals.total > vipCard.creditLimit;

  /**
   * A blocked-and-unacknowledged VIP card prevents finalizing the sale.
   * Prototype C lets the cashier acknowledge and carry on (Flow 1); Prototype B
   * never acknowledges, so there the block stands until the card is removed.
   */
  const vipBlocked = !!vipCard && vipCard.status === 'blocked' && !vipAcknowledged
    // Resolvable cards are blocked only while over the limit: removing enough items lifts it.
    && !(vipCard.blockedResolvableByRemovingItems && !vipCreditExceeded);

  const hasOrderItems = paymentTotals.itemCount > 0;

  /* ── Clear the cart only ───────────────────────────────────────────────── */
  const clearCart = useCallback(() => {
    setAddedItems([]);
    setOrderGroups([]);
  }, []);

  /* ── Park / discard the live sale ──────────────────────────────────────── */
  const [parkedSales, setParkedSales] = useState<ParkedSale[]>([]);

  const discardSale = useCallback(() => {
    setAddedItems([]);
    setOrderGroups([]);
    setSelectedCustomer(null);
    setSelectedProject(null);
    setSelectedHovedordre(null);
    setVipCard(null);
    setPendingVipCard(null);
    setVipAcknowledged(false);
  }, []);

  const bongCounter = useRef(9);

  const parkSale = useCallback(() => {
    const mine: ParkedSale = {
      id: `parked-${Date.now()}`,
      parkedAt: Date.now(),
      parkedBy: currentUser,
      createdBy: currentUser,
      customerName: selectedCustomer?.name ?? '',
      bong: `BO1-${bongCounter.current++}`,
      total: paymentTotals.total,
      addedItems,
      orderGroups,
      customer: selectedCustomer,
      project: selectedProject,
      vipCard,
    };
    // The first park also brings in the other cashiers' sales, so the list
    // reads like a shared till rather than a one-row table.
    setParkedSales((prev) => [...(prev.length === 0 ? seedColleagueSales() : prev), mine]);
    discardSale();
  }, [addedItems, orderGroups, selectedCustomer, selectedProject, vipCard, currentUser, paymentTotals.total, discardSale]);

  /** Loads a parked sale back as the live sale and removes it from the list. */
  const restoreParkedSale = useCallback((id: string) => {
    const sale = parkedSales.find((p) => p.id === id);
    if (!sale) return;
    setAddedItems(sale.addedItems);
    setOrderGroups(sale.orderGroups);
    setSelectedCustomer(sale.customer);
    setSelectedProject(sale.project);
    setVipCard(sale.vipCard);
    setParkedSales((prev) => prev.filter((p) => p.id !== id));
  }, [parkedSales]);

  /* ── Reset POS ──────────────────────────────────────────────────────────── */
  const resetPOS = useCallback(() => {
    setAddedItems([]);
    setOrderGroups([]);
    setSelectedCustomer(null);
    setSelectedProject(null);
    setSelectedHovedordre(null);
    setSearchQuery('');
    setInventorySearchValue('');
    setCurrentUser('Erik Wheeler');
    setCurrentConfigItem(null);
    setPendingInventoryItems([]);
    setUserSwitchToast({ visible: false, username: '' });
    setUserLogoutToast({ visible: false, username: '' });
    setVipCard(null);
    setPendingVipCard(null);
    setVipAcknowledged(false);
    setPriceCheckItems([]);
    setPriceCheckCustomerState(null);
    setPriceCheckProjectState(null);
  }, []);

  /* ── Context value ──────────────────────────────────────────────────────── */
  const value: POSContextValue = {
    addedItems,
    handleAddToSale,
    handleRemoveAddedItem,
    handleUpdateAddedItem,
    orderGroups,
    handlePickupOrder,
    handlePickupInvoices,
    handleAddAccountPayment,
    handleFetchExpedition,
    handleRemoveOrderGroup,
    handleRemoveAllItemsFromGroup,
    markAllItemsRemoved,
    selectedCustomer,
    selectedProject,
    handleCustomerConfirm,
    handleRemoveCustomer,
    searchQuery,
    setSearchQuery,
    inventorySearchValue,
    setInventorySearchValue,
    currentUser,
    setCurrentUser,
    currentConfigItem,
    setCurrentConfigItem,
    pendingInventoryItems,
    setPendingInventoryItems,
    userSwitchToast,
    showUserSwitchNotification,
    userLogoutToast,
    showUserLogoutNotification,
    paymentTotals,
    hasOrderItems,
    resetPOS,
    clearCart,
    parkedSales,
    parkSale,
    restoreParkedSale,
    discardSale,
    selectedHovedordre,
    setSelectedHovedordre,
    vipCard,
    setVipCard,
    pendingVipCard,
    setPendingVipCard,
    vipAcknowledged,
    setVipAcknowledged,
    vipBlocked,
    vipCreditExceeded,
    priceCheckItems,
    addPriceCheckItems,
    removePriceCheckItem,
    updatePriceCheckItem,
    priceCheckCustomer,
    priceCheckProject,
    setPriceCheckCustomer,
    initPriceCheck,
    clearPriceCheck,
    clearPriceCheckItems,
    priceCheckLocked,
  };

  return <POSContext.Provider value={value}>{children}</POSContext.Provider>;
}

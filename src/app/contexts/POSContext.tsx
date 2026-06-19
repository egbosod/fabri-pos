import React, { createContext, useContext, useState, useCallback } from 'react';
import type {
  Customer,
  Project,
  CartItem,
  OrderGroupData,
  OrderLineState,
  PaymentTotals,
} from '../types/pos';

/* ─── Context value shape ──────────────────────────────────────────────────── */

interface POSContextValue {
  addedItems: CartItem[];
  handleAddToSale: (item: CartItem) => void;
  handleRemoveAddedItem: (index: number) => void;
  orderGroups: OrderGroupData[];
  handlePickupOrder: (orders: any[]) => void;
  handleFetchExpedition: (expeditionData: any) => void;
  handleRemoveOrderGroup: (groupId: string) => void;
  handleRemoveAllItemsFromGroup: (groupId: string) => void;
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
}

const POSContext = createContext<POSContextValue | null>(null);

export function usePOS(): POSContextValue {
  const ctx = useContext(POSContext);
  if (!ctx) {
    throw new Error('usePOS must be used within POSProvider');
  }
  return ctx;
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
  }, []);

  /* ── Search ─────────────────────────────────────────────────────────────── */
  const [searchQuery, setSearchQuery] = useState('');
  const [inventorySearchValue, setInventorySearchValue] = useState('');

  /* ── User ────────────────────────────────────────────────────────────────── */
  const [currentUser, setCurrentUser] = useState('Erik Wheeler');

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

  const hasOrderItems = paymentTotals.itemCount > 0;

  /* ── Reset POS ──────────────────────────────────────────────────────────── */
  const resetPOS = useCallback(() => {
    setAddedItems([]);
    setOrderGroups([]);
    setSelectedCustomer(null);
    setSelectedProject(null);
    setSearchQuery('');
    setInventorySearchValue('');
    setCurrentUser('Erik Wheeler');
    setCurrentConfigItem(null);
    setPendingInventoryItems([]);
    setUserSwitchToast({ visible: false, username: '' });
    setUserLogoutToast({ visible: false, username: '' });
  }, []);

  /* ── Context value ──────────────────────────────────────────────────────── */
  const value: POSContextValue = {
    addedItems,
    handleAddToSale,
    handleRemoveAddedItem,
    orderGroups,
    handlePickupOrder,
    handleFetchExpedition,
    handleRemoveOrderGroup,
    handleRemoveAllItemsFromGroup,
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
  };

  return <POSContext.Provider value={value}>{children}</POSContext.Provider>;
}

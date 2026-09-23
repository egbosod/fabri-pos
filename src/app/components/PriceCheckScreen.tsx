import React, { useEffect, useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { usePOS } from '../contexts/POSContext';
import { useModalParams } from '../hooks/useModalParams';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { CustomerBadge } from './CustomerBadge';
import { PaymentSummary } from './PaymentSummary';
import { SwipeableDefaultOrderItem, OrderLineState } from './SwipeableDefaultOrderItem';
import { PriceCheckEmptyState } from './PriceCheckEmptyState';
import { CART_COLUMNS } from './cartColumnWidths';
import svgPaths from '../imports/svg-v4b5vuykpy';
import { ShoppingCart, AlertTriangle, Lock } from 'lucide-react';
import { EgConfirmModal } from './EgConfirmModal';
import { POS_TOAST_STYLE } from '../utils/prototypeDescriptions';

/* ─── Search icon (matches the rest of the app's search fields) ───────────── */
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

/**
 * Consolidated price-check screen (EBS-11361 / EBS-11395).
 *
 * Replaces the three near-duplicate PriceCheckMode* wrappers. Renders only
 * the body — the shared HeaderWithMenu (rendered by RootLayout) already
 * handles the "Prisjekkmodus" top bar.
 */
export default function PriceCheckScreen() {
  const { t } = useLanguage();
  const { openModal } = useModalParams();
  const { priceCheckLockConcept } = useSettings();
  const {
    selectedCustomer,
    selectedProject,
    handleCustomerConfirm,
    handleAddToSale,
    priceCheckItems,
    removePriceCheckItem,
    updatePriceCheckItem,
    priceCheckCustomer,
    priceCheckProject,
    setPriceCheckCustomer,
    initPriceCheck,
    clearPriceCheckItems,
    priceCheckLocked,
    proCard,
  } = usePOS();

  const [lineStates, setLineStates] = useState<Record<number, OrderLineState>>({});
  const [showLockedNotice, setShowLockedNotice] = useState(false);
  const [showMismatchConfirm, setShowMismatchConfirm] = useState(false);

  // Variant A (EBS-11395 prototype) has no lock at all — the "Add to Cart"
  // mismatch modal below is the only warning in that variant.
  const lockEnabled = priceCheckLockConcept !== 'A';

  // EBS-11361 step 2: pre-load whatever customer/project is already on the live sale.
  useEffect(() => {
    initPriceCheck();
    // Only ever seed once per price-check session.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleItems = priceCheckItems
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => lineStates[index] !== 'deleted');

  const paymentTotals = React.useMemo(() => {
    let subtotal = 0;
    let itemDiscount = 0;
    let itemCount = 0;

    visibleItems.forEach(({ item }) => {
      itemCount += 1;
      const lineTotal = (item.price || 0) * (item.quantity || 0);
      subtotal += lineTotal;
      if (item.discount) itemDiscount += lineTotal * (item.discount / 100);
    });

    const subtotalAfterItemDiscount = subtotal - itemDiscount;
    const customerDiscountRate = priceCheckCustomer?.discountRate || 0;
    const customerDiscount = subtotalAfterItemDiscount * (customerDiscountRate / 100);
    const total = subtotalAfterItemDiscount - customerDiscount;

    return { subtotal, discount: itemDiscount, customerDiscount, customerDiscountRate, total, itemCount };
  }, [visibleItems, priceCheckCustomer]);

  const hasItems = paymentTotals.itemCount > 0;

  const handleEditCustomer = () => {
    if (lockEnabled && priceCheckLocked) {
      setShowLockedNotice(true);
      return;
    }
    openModal('customer');
  };

  const handleRemovePriceCheckCustomer = () => {
    if (lockEnabled && priceCheckLocked) {
      setShowLockedNotice(true);
      return;
    }
    setPriceCheckCustomer(null);
  };

  const handleAddItemsToCart = () => {
    const sameCustomer =
      (priceCheckCustomer?.id ?? null) === (selectedCustomer?.id ?? null) &&
      (priceCheckProject?.id ?? null) === (selectedProject?.id ?? null);

    if (sameCustomer) {
      priceCheckItems.forEach((item) => handleAddToSale(item));
      clearPriceCheckItems();
      setLineStates({});
      toast(t('itemsAddedToSale'), { duration: 2500, style: POS_TOAST_STYLE });
    } else {
      setShowMismatchConfirm(true);
    }
  };

  const confirmMismatchAndAdd = () => {
    handleCustomerConfirm(priceCheckCustomer, priceCheckProject || undefined);
    priceCheckItems.forEach((item) => handleAddToSale(item));
    clearPriceCheckItems();
    setLineStates({});
    setShowMismatchConfirm(false);
    toast(t('itemsAddedToSale'), { duration: 2500, style: POS_TOAST_STYLE });
  };

  return (
    <div className="flex flex-1 items-end relative w-full min-h-0" data-name="Price check body">
      {/* ── Main column: basket + search ────────────────────────────────── */}
      <div className="basis-0 bg-card grow h-full min-h-px min-w-px relative shrink-0">
        <div className="size-full">
          <div className="box-border content-stretch flex flex-col gap-[20px] items-start p-[20px] relative size-full">
            {hasItems ? (
              <div className="basis-0 content-stretch flex flex-col grow items-start justify-end min-h-px min-w-px overflow-clip relative shrink-0 w-full">
                <div className="content-stretch flex flex-col items-start justify-end relative size-full">
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
                        <div
                          key={col.label}
                          className={`bg-transparent box-border content-stretch flex flex-col h-[28px] ${col.align} justify-end overflow-clip px-[10px] py-0 relative shrink-0`}
                          style={{ width: `${col.width}px` }}
                        >
                          <div className="content-stretch flex gap-[10px] items-center overflow-clip relative shrink-0">
                            <div
                              className="flex flex-col font-medium justify-center leading-[0] relative shrink-0 text-nowrap"
                              style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}
                            >
                              <p className="leading-[normal] whitespace-pre">{col.label}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="flex-1 flex items-end justify-end px-[20px] h-[28px]">
                        <div className="font-normal" style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                          {paymentTotals.itemCount} {t('orderLines')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rows */}
                  <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-full">
                    {visibleItems.map(({ item, index }) => {
                      const itemTotal = item.total || item.price * item.quantity;
                      const originalTotal = item.discount ? itemTotal / (1 - item.discount / 100) : itemTotal;
                      return (
                        <SwipeableDefaultOrderItem
                          key={index}
                          productName={item.name}
                          productCode={item.sku}
                          quantity={item.quantity}
                          unit={item.unit}
                          pricePerUnit={item.price}
                          discount={item.discount || 0}
                          total={itemTotal}
                          originalTotal={originalTotal}
                          label={item.label}
                          state={lineStates[index] || 'normal'}
                          onStateChange={(newState) => {
                            setLineStates((prev) => ({ ...prev, [index]: newState }));
                            if (newState === 'deleted') removePriceCheckItem(index);
                          }}
                          onQuantityChange={(newQuantity, newUnit) => {
                            updatePriceCheckItem(index, {
                              quantity: newQuantity,
                              unit: newUnit,
                              total: item.price * newQuantity * (1 - (item.discount || 0) / 100),
                            });
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <PriceCheckEmptyState />
            )}

            {/* Search bar — opens the shared inventory search, targeted at the price-check basket */}
            <div className="content-stretch flex gap-[10px] items-center relative rounded-bl-[3px] rounded-br-[3px] shrink-0 w-full" data-name="Search and actions">
              <button
                onClick={() => openModal('pricecheck-inventory')}
                className="basis-0 bg-card grow h-[48px] min-h-px min-w-px relative rounded-[var(--radius)] shrink-0 cursor-pointer text-left"
                data-name="Textfield/Normal"
              >
                <div aria-hidden="true" className="absolute border border-border border-solid inset-0 pointer-events-none rounded-[var(--radius)]" />
                <div className="flex flex-row items-center size-full">
                  <div className="box-border content-stretch flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] relative w-full">
                    <p className="basis-0 font-normal grow leading-[1.75] min-h-px min-w-px opacity-60 relative shrink-0 text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
                      {t('searchProducts')}
                    </p>
                    <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]" data-name="Icon / Search">
                      <SearchIcon />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sidebar: customer + sums + CTA ──────────────────────────────── */}
      <div className="bg-secondary box-border content-stretch flex flex-col gap-[30px] h-full items-start justify-end p-[20px] relative shrink-0 w-[263px]" data-name="Sidebar">
        <div aria-hidden="true" className="absolute border-border border-[0px_0px_0px_1px] border-solid inset-0 pointer-events-none" />

        {priceCheckCustomer ? (
          <CustomerBadge
            customer={priceCheckCustomer}
            project={priceCheckProject}
            mode="pricecheck"
            onEdit={handleEditCustomer}
            onRemove={handleRemovePriceCheckCustomer}
            proCard={proCard}
          />
        ) : (
          <button
            onClick={handleEditCustomer}
            className="bg-card h-[48px] min-w-[100px] relative rounded-[var(--radius)] shrink-0 w-full cursor-pointer border border-border hover:border-primary hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring transition-colors"
          >
            <div className="flex flex-row items-center justify-center min-w-inherit size-full">
              <span className="text-foreground">{t('selectCustomer')}</span>
            </div>
          </button>
        )}

        <PaymentSummary
          subtotal={paymentTotals.subtotal}
          discount={paymentTotals.discount}
          total={paymentTotals.total}
          itemCount={paymentTotals.itemCount}
          customerDiscount={paymentTotals.customerDiscount}
          customerDiscountRate={paymentTotals.customerDiscountRate}
        />

        <div className="content-stretch flex flex-col gap-[10px] items-start justify-end relative shrink-0 w-full" data-name="Buttons">
          <button
            onClick={handleAddItemsToCart}
            disabled={!hasItems}
            className="h-[48px] min-w-[100px] relative rounded-[var(--radius)] shrink-0 w-full cursor-pointer disabled:cursor-not-allowed"
            style={{
              backgroundColor: hasItems ? 'var(--primary)' : 'var(--secondary)',
              opacity: hasItems ? 1 : 0.6,
            }}
          >
            <div className="flex flex-row items-center justify-center min-w-inherit size-full">
              <p
                className="font-semibold leading-[1.75] relative shrink-0 text-nowrap whitespace-pre"
                style={{ fontSize: 'var(--text-lg)', color: hasItems ? 'var(--primary-foreground)' : 'var(--secondary-foreground)' }}
              >
                {t('addItemsToCart')}
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* ── EBS-11395: customer/project locked once the basket has items ───
           Variant B adds an "Legg til varer i salg" shortcut; variant C is
           the same single-button modal, just relabeled "Lukk". Variant A
           never sets showLockedNotice, so this block only renders for B/C. ─── */}
      {showLockedNotice && (
        <EgConfirmModal
          icon={Lock}
          title={t('priceCheckLockedTitle')}
          primaryLabel={priceCheckLockConcept === 'B' ? t('addItemsToCart') : t('closeLabel')}
          onPrimary={() => {
            setShowLockedNotice(false);
            if (priceCheckLockConcept === 'B') handleAddItemsToCart();
          }}
          secondaryLabel={priceCheckLockConcept === 'B' ? t('closeLabel') : undefined}
          onSecondary={priceCheckLockConcept === 'B' ? () => setShowLockedNotice(false) : undefined}
          onDismiss={() => setShowLockedNotice(false)}
        >
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>
            {t('priceCheckLockedDescription')}
          </p>
        </EgConfirmModal>
      )}

      {/* ── EBS-11361: confirm before moving a differently-customer'd basket to the sale ───
           Mirrors the production "Add to Cart" mismatch modal (eg-modal-container). ─── */}
      {showMismatchConfirm && (
        <EgConfirmModal
          icon={ShoppingCart}
          title={t('priceCheckMismatchTitle')}
          primaryLabel={t('ok')}
          onPrimary={confirmMismatchAndAdd}
          secondaryLabel={t('cancel')}
          onSecondary={() => setShowMismatchConfirm(false)}
          onDismiss={() => setShowMismatchConfirm(false)}
        >
          {/* Error notification box */}
          <div className="flex gap-[10px] p-[15px] rounded-[var(--radius)] bg-destructive/10 border border-destructive/30">
            <AlertTriangle className="text-destructive shrink-0" size={20} />
            <div className="flex flex-col gap-[5px]">
              <p className="font-semibold text-destructive" style={{ fontSize: 'var(--text-base)' }}>
                {t('priceCheckMismatchNotificationTitle')}
              </p>
              <p className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                {t('priceCheckMismatchBodyPrefix')} (<strong>{priceCheckCustomer?.name}</strong>){' '}
                {t('priceCheckMismatchBodyMiddle')} (<strong>{selectedCustomer?.name || t('noCustomerOnSale')}</strong>).
              </p>
            </div>
          </div>

          {/* Customer / project detail rows */}
          <div className="flex flex-col gap-[8px] p-[15px] rounded-[var(--radius)] border border-border">
            <div className="flex justify-between gap-[10px]">
              <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{t('customerLabel')}</span>
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{priceCheckCustomer?.name}</span>
            </div>
            <div className="flex justify-between gap-[10px]">
              <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{t('projectLabel')}</span>
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{priceCheckProject?.navn || ''}</span>
            </div>
          </div>
        </EgConfirmModal>
      )}
    </div>
  );
}

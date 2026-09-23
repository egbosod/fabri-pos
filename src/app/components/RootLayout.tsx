import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { toast, Toaster } from 'sonner@2.0.3';
import { HeaderWithMenu } from './HeaderWithMenu';
import { SwitchUserModalFlowB } from './SwitchUserModalFlowB';
import { CustomerSelectionModal } from './CustomerSelectionModal';
import { PdaModal } from './PdaModal';
import { PickupModal } from './PickupModal';
import { InventorySearchModal } from './InventorySearchModal';
import { ItemConfigurationModal } from './ItemConfigurationModal';
import { PaymentFlowModal } from './PaymentFlowModal';
import { PackingSlipSignatureModal } from './PackingSlipSignatureModal';
import { DeliveryNoteModal } from './DeliveryNoteModal';
import { ProCardModal, generateFakeProScan } from './ProCardModal';
import { FakturaModal } from './FakturaModal';
import { HovedordreModal } from './HovedordreModal';
import { EnvDebugBanner } from './EnvDebugBanner';
import ProfileBadge from './ProfileBadge';
import ToastParkertSalg from '../imports/ToastParkertSalg';
import ToastLogoutSuccess from '../imports/ToastLogoutSuccess';
import { useSettings } from '../contexts/SettingsContext';
import { POSProvider } from '../contexts/POSContext';
import { usePOS } from '../contexts/POSContext';
import { useModalParams } from '../hooks/useModalParams';
import type { OrderLineState, VipCardData, VipCardStatus } from '../types/pos';
import type { ScannedCardData } from './CustomerSelectionModal';
import { playBarcodeBeep } from '../utils/scanSound';
import { formatAmount } from '../utils/formatAmount';
import type { ScannedArticleData } from './InventorySearchModal';
import { calculateSmartPrice, getMockItemMetadata, getItemLabels, parsePriceString } from './pricingUtils';
import { EgConfirmModal } from './EgConfirmModal';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FLOW_DESCRIPTIONS, PRICE_CHECK_LOCK_DESCRIPTIONS, PROTOTYPE_TOAST_OPTS, POS_TOAST_STYLE } from '../utils/prototypeDescriptions';

// ─── Mock pools for fake card scans (mirrors CustomerSelectionModal data) ──────
const SCAN_CUSTOMERS = [
  { customerNumber: '399999', contactPersons: ['Ariel Havmøy', 'Simba Løvansen'],       projectNrs: ['399999', '310601'] },
  { customerNumber: '400000', contactPersons: ['Ariel Havmøy', 'Simba Løvansen'],       projectNrs: ['399999', '76589'] },
  { customerNumber: '400001', contactPersons: ['Elsa Frostheim', 'Woody Cowboygaard'],  projectNrs: ['240209', '76712'] },
  { customerNumber: '400002', contactPersons: ['Moana Havdatter', 'Ariel Havmøy'],      projectNrs: ['76845', '76923'] },
  { customerNumber: '400003', contactPersons: ['Simba Løvansen', 'Elsa Frostheim'],     projectNrs: ['77014', '77156'] },
  { customerNumber: '400004', contactPersons: ['Woody Cowboygaard', 'Moana Havdatter'], projectNrs: ['76589', '399999'] },
  { customerNumber: '400005', contactPersons: ['Ariel Havmøy', 'Elsa Frostheim'],       projectNrs: ['76712', '240209'] },
  { customerNumber: '400006', contactPersons: ['Simba Løvansen', 'Woody Cowboygaard'],  projectNrs: ['76845', '77014'] },
  { customerNumber: '400007', contactPersons: ['Moana Havdatter', 'Ariel Havmøy'],      projectNrs: ['76923', '77156'] },
  { customerNumber: '400008', contactPersons: ['Elsa Frostheim', 'Simba Løvansen'],     projectNrs: ['310601', '76589'] },
  { customerNumber: '400009', contactPersons: ['Woody Cowboygaard', 'Moana Havdatter'], projectNrs: ['240209', '76712'] },
  { customerNumber: '400010', contactPersons: ['Ariel Havmøy', 'Elsa Frostheim'],       projectNrs: ['77014', '76845'] },
  { customerNumber: '400014', contactPersons: ['Simba Løvansen', 'Ariel Havmøy'],       projectNrs: ['76923', '77156'] },
  { customerNumber: '400015', contactPersons: ['Moana Havdatter', 'Woody Cowboygaard'], projectNrs: ['399999', '310601'] },
  { customerNumber: '400017', contactPersons: ['Elsa Frostheim', 'Moana Havdatter'],    projectNrs: ['76589', '77014'] },
];

function pickRandom<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function generateFakeCardScan(): ScannedCardData {
  const pool = pickRandom(SCAN_CUSTOMERS);
  return {
    customerNumber:    pool.customerNumber,
    contactPerson:     pickRandom(pool.contactPersons),
    projectNr:         pickRandom(pool.projectNrs),
    requisitionNumber: `REK-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    cardId:            `CARD-${pool.customerNumber}-${Math.floor(Math.random() * 90000) + 10000}`,
  };
}

// ─── Mock pool for fake VIP card scans (Aspect4 DK / Prototype C) ─────────────
// Names mirror mockCustomers in CustomerSelectionModal so the lookup by
// customerNumber resolves to a real record.
const SCAN_VIP_CUSTOMERS = [
  { customerNumber: '399999', name: 'Fenriz Nattgaard', line1: 'Trandalsvegen 12',  postalCode: '1890', city: 'Rakkestad' },
  { customerNumber: '400000', name: 'Varg Grimfjell',   line1: 'Svartskogsveien 1', postalCode: '5353', city: 'Straume'   },
  { customerNumber: '400001', name: 'Elsa Frostheim',   line1: 'Isslottveien 3',    postalCode: '0150', city: 'Oslo'      },
];

function generateFakeVipScan(): VipCardData {
  const pool = pickRandom(SCAN_VIP_CUSTOMERS);
  const status = pickRandom<VipCardStatus>(['open', 'open', 'blocked']);
  return {
    cardId:              `VIP-${pool.customerNumber}-${Math.floor(Math.random() * 90000) + 10000}`,
    customerId:          pool.customerNumber,
    customerName:        pool.name,
    status,
    // Deliberately includes low limits so Flow 2 (over limit) is easy to hit.
    creditLimit:         pickRandom([2000, 10000, 50000]),
    projectRequired:     Math.random() > 0.5,
    requisitionRequired: Math.random() > 0.5,
    address: { line1: pool.line1, postalCode: pool.postalCode, city: pool.city },
  };
}

export function RootLayout() {
  return (
    <POSProvider>
      <RootLayoutInner />
    </POSProvider>
  );
}

function RootLayoutInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeModal, openModal, closeModal, isModalOpen } = useModalParams();
  const {
    switchUserFlow,
    setSwitchUserFlow,
    priceCheckLockConcept,
    setPriceCheckLockConcept,
    resetSettings,
    showFlowIndicator,
    setShowFlowIndicator,
    erpScenario,
    simulateProCardOffline,
  } = useSettings();

  const {
    addedItems,
    handleAddToSale,
    orderGroups,
    handlePickupOrder,
    handleFetchExpedition,
    handleRemoveAddedItem,
    selectedCustomer,
    selectedProject,
    handleCustomerConfirm,
    handleRemoveCustomer,
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
    resetPOS,
    clearCart,
    setSelectedHovedordre,
    vipCard,
    setVipCard,
    setVipAcknowledged,
    vipBlocked,
    vipCreditExceeded,
    proCard,
    setProCard,
    proCardMandatoryFields,
    setProCardMandatoryFields,
    proCardBlocked,
    priceCheckCustomer,
    setPriceCheckCustomer,
    addPriceCheckItems,
    priceCheckItems,
    clearPriceCheck,
  } = usePOS();
  const { t } = useLanguage();

  const isPriceCheckMode = location.pathname === '/priskontroll';

  /* ── Mid-sale credit-exceeded (Aspect4 DK / Prototype C) ──────────────────
     Open question 5 in docs/vip-pro-card-spec.md: the overrun is discovered
     mid-sale, on the line that tips the total past the card's limit, so the
     cashier is stopped there rather than at the payment step. Edge-triggered:
     the effect only re-runs when the boolean itself flips, so dismissing it
     while still over the limit does not immediately re-open it, but dropping
     back under and crossing again does. */
  const [showVipCreditExceeded, setShowVipCreditExceeded] = useState(false);
  useEffect(() => {
    if (vipCreditExceeded) setShowVipCreditExceeded(true);
  }, [vipCreditExceeded]);

  /* ── Profile menu (standalone overlay) ───────────────────────────────── */
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [autoSwitchToUser, setAutoSwitchToUser] = useState<string | null>(null);

  /* ── Price check close guard (EBS-11361) ──────────────────────────────── */
  const [showPriceCheckCloseConfirm, setShowPriceCheckCloseConfirm] = useState(false);

  const handlePriceCheckClose = () => {
    if (priceCheckItems.length === 0) {
      navigate('/salg');
      return;
    }
    setShowPriceCheckCloseConfirm(true);
  };

  const confirmPriceCheckClose = () => {
    clearPriceCheck();
    setShowPriceCheckCloseConfirm(false);
    navigate('/salg');
  };

  /* ── Scanned card data (populated by Ctrl+- shortcut) ────────────────── */
  const [scannedCardData, setScannedCardData] = useState<ScannedCardData | null>(null);

  /* ── Scanned article data (populated by Ctrl+- when inventory modal is open) ── */
  const [scannedArticleData, setScannedArticleData] = useState<ScannedArticleData | null>(null);

  /* ── Keyboard shortcuts ──────────────────────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if ((e.metaKey || e.ctrlKey) && e.key === ',') {
        // Aggressively prevent browser shortcuts
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        // Beep
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1500, ctx.currentTime);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
          }
        } catch { /* silent */ }

        if (switchUserFlow === 'B') {
          openModal('switch-user');
          return false;
        }

        // Flow A and Flow C both use profile menu with auto-switch
        const allUsers = ['Per Gunnersen', 'Ole Gunnar Damstuen', 'Mari Kristine Gullerud', 'Lise Arntsen'];
        const otherUsers = allUsers.filter((u) => u !== currentUser);
        const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];
        setAutoSwitchToUser(randomUser);
        setShowProfileMenu(true);
        return false;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        showUserLogoutNotification(currentUser);
        setTimeout(() => navigate('/login'), 500);
      }

      // H → Reset everything and go to default page
      if (e.key === 'h' && !isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        resetPOS();
        resetSettings();
        closeModal();
        setShowProfileMenu(false);
        setAutoSwitchToUser(null);
        navigate('/salg', { replace: true });
        toast('Reset complete', {
          description: 'All state cleared, back to default page',
          duration: 2000,
          ...PROTOTYPE_TOAST_OPTS,
        });
      }

      // I → Toggle prototype/flow indicator
      if (e.key === 'i' && !isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setShowFlowIndicator(!showFlowIndicator);
        toast(showFlowIndicator ? 'Flow indicator hidden' : 'Flow indicator shown', {
          description: showFlowIndicator
            ? 'Prototype and flow info hidden from header'
            : 'Prototype and flow info visible in header',
          duration: 2000,
          ...PROTOTYPE_TOAST_OPTS,
        });
      }

      // A, B, C → Switch prototype (user-switch flow + price-check lock, kept in sync)
      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const key = e.key.toUpperCase();
        if (key === 'A' || key === 'B' || key === 'C') {
          const newFlow = key as 'A' | 'B' | 'C';
          setSwitchUserFlow(newFlow);
          setPriceCheckLockConcept(newFlow);
          toast(`Switched to Prototype ${newFlow}`, {
            description: `${FLOW_DESCRIPTIONS[newFlow]}. ${PRICE_CHECK_LOCK_DESCRIPTIONS[newFlow]}.`,
            duration: 2500,
            ...PROTOTYPE_TOAST_OPTS,
          });
        }
      }

      // Ctrl+- → Simulate barcode scan (Aspect4)
      // Context-aware: inventory modal open → article scan, otherwise → customer card scan
      if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        e.stopPropagation();

        // Always play the scanner beep regardless of context
        playBarcodeBeep();

        if (activeModal === 'inventory' || activeModal === 'pricecheck-inventory') {
          // ── Fake article / product scan ──────────────────────────────────
          // Mock payload: ADAPTER GDE 16 PLUS FOR BORHAMMER (varenr 469650132)
          const mockArticle: ScannedArticleData = {
            varenr: '469650132',
            quantity: 1,
            barcode: 'EAN-4693651320001',
          };
          setScannedArticleData(mockArticle);
        } else {
          // ── Fake customer card scan ──────────────────────────────────────
          // Mock data returned by the Aspect4 card reader
          const mockCard = generateFakeCardScan();
          setScannedCardData(mockCard);
          openModal('customer');
        }
      }

      // Ctrl+< → Simulate a card scan on Aspect4 DK. Which flow it triggers
      // depends on switchUserFlow: 'C' → VIP card (Prototype C), 'B' → PRO
      // card (Prototype B). Same ERP scenario, same shortcut, different flow.
      if (e.ctrlKey && e.key === '<') {
        e.preventDefault();
        e.stopPropagation();

        if (erpScenario !== 'Aspect4 DK' || (switchUserFlow !== 'C' && switchUserFlow !== 'B')) {
          toast('Card scan unavailable', {
            description: "Set ERP scenario to 'Aspect4 DK' and Prototype to 'B' or 'C' in Settings first",
            duration: 3000,
            ...PROTOTYPE_TOAST_OPTS,
          });
          return;
        }

        playBarcodeBeep();

        if (switchUserFlow === 'C') {
          const mockVip = generateFakeVipScan();
          setVipCard(mockVip);
          setVipAcknowledged(false);
          openModal('customer');
        } else {
          const mockPro = generateFakeProScan();
          setProCard(mockPro);
          openModal('pro-card');
        }
      }
    };

    // Use capture phase (true) to intercept the event before browser shortcuts
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [currentUser, switchUserFlow, setSwitchUserFlow, priceCheckLockConcept, setPriceCheckLockConcept, openModal, activeModal, showUserLogoutNotification, resetPOS, resetSettings, closeModal, navigate, showFlowIndicator, setShowFlowIndicator, erpScenario, setVipCard, setVipAcknowledged, setProCard]);

  /* ── Modals rendering (URL-addressable) ───────────���────────────────── */
  const renderModals = () => (
    <>
      {isModalOpen('customer') && (
        <CustomerSelectionModal
          onClose={closeModal}
          onConfirm={(customer, project) => {
            if (isPriceCheckMode) {
              setPriceCheckCustomer(customer, project);
            } else {
              handleCustomerConfirm(customer, project);
            }
            closeModal();
          }}
          isPriceCheckMode={isPriceCheckMode}
          scannedCardData={scannedCardData}
          onCardDataProcessed={() => setScannedCardData(null)}
          vipCard={vipCard}
          saleTotal={paymentTotals.total}
          onVipRemoved={() => setVipCard(null)}
          onVipAcknowledged={() => setVipAcknowledged(true)}
        />
      )}

      {isModalOpen('pro-card') && (
        <ProCardModal
          context={isPriceCheckMode ? 'priceCheck' : 'sale'}
          proCard={proCard}
          setProCard={setProCard}
          mandatoryFields={proCardMandatoryFields}
          setMandatoryFields={setProCardMandatoryFields}
          saleTotal={paymentTotals.total}
          simulateOffline={simulateProCardOffline}
          onClose={closeModal}
        />
      )}

      {isModalOpen('pda') && (
        <PdaModal
          onClose={closeModal}
          onFetchExpedition={(data: any) => {
            handleFetchExpedition(data);
            closeModal();
          }}
        />
      )}

      <PickupModal
        isOpen={isModalOpen('pickup')}
        onClose={closeModal}
        onPickup={(orders: any) => {
          handlePickupOrder(orders);
          closeModal();
        }}
      />

      {isModalOpen('inventory') && (
        <InventorySearchModal
          onClose={() => {
            closeModal();
            setInventorySearchValue('');
          }}
          onAddItems={(items: any[]) => {
            const parsePriceAndUnit = (priceString: string) => {
              const match = priceString.match(/([\d,]+)\s*kr\s*\/\s*(\w+)/);
              if (match) {
                const price = parseFloat(match[1].replace(',', '.'));
                const unit = match[2];
                return { price, unit };
              }
              return { price: 0, unit: 'STK' };
            };

            items.forEach((item: any) => {
              const { price, unit } = parsePriceAndUnit(item.pris);
              handleAddToSale({
                name: item.varetekst,
                sku: item.varenr,
                price,
                priceInfo: { priceString: item.pris, numericPrice: price, formattedPrice: item.pris },
                quantity: 1,
                unit,
                discount: 0,
                total: price,
                smartPrice: price,
                pricingMethod: 'standard',
                state: 'normal' as OrderLineState,
              });
            });
            closeModal();
            setInventorySearchValue('');
          }}
          initialSearchValue={inventorySearchValue}
          scannedArticleData={scannedArticleData}
          onArticleDataProcessed={() => setScannedArticleData(null)}
        />
      )}

      {isModalOpen('pricecheck-inventory') && (
        <InventorySearchModal
          onClose={() => {
            closeModal();
            setInventorySearchValue('');
          }}
          onAddItems={(items: any[]) => {
            // Price check pricing: run each item through the same smart-pricing
            // rules as the sale, but scoped to the price-check customer/project
            // rather than the live sale's.
            const pricingCustomer = priceCheckCustomer
              ? { type: priceCheckCustomer.type, discount: priceCheckCustomer.discountRate }
              : undefined;

            items.forEach((item: any) => {
              const { price, unit } = parsePriceString(item.pris);
              const metadata = getMockItemMetadata(item.varenr);
              const smart = calculateSmartPrice(price, 1, pricingCustomer, undefined, metadata);
              const label = getItemLabels(metadata)[0];

              addPriceCheckItems([{
                name: item.varetekst,
                sku: item.varenr,
                price: smart.price,
                priceInfo: { priceString: item.pris, numericPrice: price, formattedPrice: item.pris },
                quantity: 1,
                unit,
                discount: smart.discount,
                total: smart.price * (1 - smart.discount / 100),
                smartPrice: smart.price,
                pricingMethod: smart.appliedRules.join(', ') || 'standard',
                state: 'normal' as OrderLineState,
                label,
              }]);
            });
            closeModal();
            setInventorySearchValue('');
          }}
          initialSearchValue={inventorySearchValue}
          scannedArticleData={scannedArticleData}
          onArticleDataProcessed={() => setScannedArticleData(null)}
        />
      )}

      {isModalOpen('config') && currentConfigItem && (
        <ItemConfigurationModal
          isOpen={true}
          itemName={currentConfigItem.name}
          itemCode={currentConfigItem.code}
          defaultPrice={currentConfigItem.price}
          availableUnits={[currentConfigItem.unit, 'STK', 'PK', 'M', 'M2']}
          defaultUnit={currentConfigItem.unit}
          onClose={() => {
            closeModal();
            setCurrentConfigItem(null);
            setPendingInventoryItems([]);
            setInventorySearchValue('');
          }}
          onConfirm={(configuredItem) => {
            const lineTotal = configuredItem.price * configuredItem.quantity;
            handleAddToSale({
              name: currentConfigItem.name,
              sku: currentConfigItem.code,
              price: configuredItem.price,
              priceInfo: {
                priceString: `${configuredItem.price} kr`,
                numericPrice: configuredItem.price,
                formattedPrice: `${configuredItem.price} kr`,
              },
              quantity: configuredItem.quantity,
              unit: configuredItem.unit,
              discount: configuredItem.discount || 0,
              total: lineTotal,
              smartPrice: configuredItem.price,
              pricingMethod: 'standard',
              state: 'normal' as OrderLineState,
            });
            closeModal();
            setCurrentConfigItem(null);
            setPendingInventoryItems([]);
            setInventorySearchValue('');
          }}
        />
      )}

      {isModalOpen('faktura') && (
        <FakturaModal onClose={closeModal} customerName={selectedCustomer?.name} />
      )}

      <HovedordreModal
        isOpen={isModalOpen('hovedordre')}
        onClose={closeModal}
        onSelect={(order) => {
          setSelectedHovedordre(order);
          closeModal();
        }}
      />

      <PaymentFlowModal
        isOpen={isModalOpen('payment')}
        onClose={closeModal}
        totalAmount={paymentTotals.total}
        onPaymentComplete={(payments: any) => {
          closeModal();
        }}
        onMenuClick={() => {}}
        isMenuOpen={false}
        onProfileClick={() => setShowProfileMenu(true)}
        isProfileOpen={showProfileMenu}
        currentUser={currentUser}
        vipBlocked={vipBlocked}
        vipCard={vipCard}
        proCard={proCard}
        proCardBlocked={proCardBlocked}
      />

      {/* ── Packing slip: signature → delivery note → sale completed ──────── */}
      <PackingSlipSignatureModal
        isOpen={isModalOpen('packing-slip-signature')}
        onClose={closeModal}
        onApprove={() => openModal('delivery-note')}
      />

      <DeliveryNoteModal
        isOpen={isModalOpen('delivery-note')}
        onClose={closeModal}
        onConfirm={() => {
          closeModal();
          clearCart();
          toast(t('saleCompletedToast'), { duration: 3000, style: POS_TOAST_STYLE });
        }}
      />

      <SwitchUserModalFlowB
        isOpen={isModalOpen('switch-user')}
        onClose={closeModal}
        currentUser={currentUser}
        onSwitchUser={(newUser: string) => {
          setCurrentUser(newUser);
          closeModal();
          showUserSwitchNotification(newUser);
        }}
      />
    </>
  );

  return (
    <div
      className="bg-background content-stretch flex flex-col isolate items-start relative h-screen w-full"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <EnvDebugBanner />

      {/* ── Shared Header ────────────────────────────────────────────────── */}
      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]">
        <HeaderWithMenu
          isPriceCheckMode={isPriceCheckMode}
          onPriceCheckClick={() => navigate('/priskontroll')}
          onPriceCheckClose={handlePriceCheckClose}
          currentUser={currentUser}
          onUserChange={setCurrentUser}
          onUserLogout={showUserLogoutNotification}
          onPreviousPurchasesClick={() => navigate('/tidligere-kjop')}
        />
      </div>

      {/* ── Profile Menu Overlay ─────────────────────────────────────────── */}
      {showProfileMenu && (
        <>
          <div className="fixed bottom-0 left-0 right-0 top-[60px] z-40" onClick={() => setShowProfileMenu(false)} />
          <div className="fixed right-[10px] top-[70px] z-50">
            <ProfileBadge
              currentUser={currentUser}
              autoSwitchToUser={autoSwitchToUser}
              onUserChange={(username: string) => {
                setCurrentUser(username);
                setShowProfileMenu(false);
                setAutoSwitchToUser(null);
                showUserSwitchNotification(username);
              }}
            />
          </div>
        </>
      )}

      {/* ── Mid-sale credit limit exceeded (Aspect4 DK / Prototype C) ───── */}
      {showVipCreditExceeded && vipCard && (
        <EgConfirmModal
          icon={AlertCircle}
          iconClassName="text-destructive"
          title={t('vipCreditExceededTitle')}
          primaryLabel={t('removeVipCard')}
          onPrimary={() => {
            setVipCard(null);
            setVipAcknowledged(false);
            setShowVipCreditExceeded(false);
          }}
          secondaryLabel={t('vipRemoveItems')}
          onSecondary={() => setShowVipCreditExceeded(false)}
          onDismiss={() => setShowVipCreditExceeded(false)}
        >
          <p className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
            {t('vipCreditExceededBody')}
          </p>
          {/* The two figures behind the block, so the cashier can see how far over. */}
          <div className="flex flex-col gap-[6px]">
            <div className="flex justify-between gap-[20px]">
              <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{t('vipCreditLimit')}</span>
              <span className="text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{formatAmount(vipCard.creditLimit)}</span>
            </div>
            <div className="flex justify-between gap-[20px]">
              <span className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{t('vipCreditUsed')}</span>
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--destructive)' }}>{formatAmount(paymentTotals.total)}</span>
            </div>
          </div>
        </EgConfirmModal>
      )}

      {/* ── Price check close guard (EBS-11361) ──────────────────────────── */}
      {showPriceCheckCloseConfirm && (
        <EgConfirmModal
          icon={AlertCircle}
          iconClassName="text-destructive"
          title={t('closePriceCheckTitle')}
          primaryLabel={t('yesLabel')}
          onPrimary={confirmPriceCheckClose}
          secondaryLabel={t('noLabel')}
          onSecondary={() => setShowPriceCheckCloseConfirm(false)}
          onDismiss={() => setShowPriceCheckCloseConfirm(false)}
        >
          <p className="text-foreground" style={{ fontSize: 'var(--text-base)' }}>
            {t('closePriceCheckBody')} {priceCheckItems.length}{' '}
            {priceCheckItems.length === 1 ? t('itemSingular') : t('items')} {t('willNotBeAdded')}
          </p>
        </EgConfirmModal>
      )}

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <Outlet />

      {/* ── URL-addressable modals ───────────────────────────────────────── */}
      {renderModals()}

      {/* ── Toasts ───────────────────────────────────────────────────────── */}
      {userSwitchToast.visible && (
        <div className="fixed bottom-[30px] right-[30px] z-[99999] min-w-[300px] animate-in slide-in-from-right-10 fade-in duration-300">
          <ToastParkertSalg username={userSwitchToast.username} />
        </div>
      )}
      {userLogoutToast.visible && (
        <div className="fixed bottom-[30px] right-[30px] z-[99999] min-w-[300px] animate-in slide-in-from-right-10 fade-in duration-300">
          <ToastLogoutSuccess username={userLogoutToast.username} />
        </div>
      )}

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { right: '30px', bottom: '30px', zIndex: 99999 },
          className: 'z-[99999]',
        }}
        offset={30}
      />
    </div>
  );
}
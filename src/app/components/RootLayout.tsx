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
import { FakturaModal } from './FakturaModal';
import { SettingsModal } from './SettingsModal';
import { EnvDebugBanner } from './EnvDebugBanner';
import ProfileBadge from './ProfileBadge';
import ToastParkertSalg from '../imports/ToastParkertSalg';
import ToastLogoutSuccess from '../imports/ToastLogoutSuccess';
import { useSettings } from '../contexts/SettingsContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { SettingsProvider } from '../contexts/SettingsContext';
import { POSProvider } from '../contexts/POSContext';
import { usePOS } from '../contexts/POSContext';
import { useModalParams } from '../hooks/useModalParams';
import { navigateToPrototype } from '../utils/environmentNavigation';
import type { OrderLineState } from '../types/pos';
import type { ScannedCardData } from './CustomerSelectionModal';
import { playBarcodeBeep } from '../utils/scanSound';
import type { ScannedArticleData } from './InventorySearchModal';

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

export function RootLayout() {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <POSProvider>
          <RootLayoutInner />
        </POSProvider>
      </SettingsProvider>
    </LanguageProvider>
  );
}

function RootLayoutInner() {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeModal, openModal, closeModal, isModalOpen } = useModalParams();
  const { switchUserFlow, setSwitchUserFlow, resetSettings, showFlowIndicator, setShowFlowIndicator } = useSettings();

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
  } = usePOS();

  const isPriceCheckMode = location.pathname === '/priskontroll';

  /* ── Profile menu (standalone overlay) ───────────────────────────────── */
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [autoSwitchToUser, setAutoSwitchToUser] = useState<string | null>(null);

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
        setTimeout(() => navigateToPrototype('loginHome'), 500);
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
        });
      }

      // A, B, C → Switch user flow
      if (!isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const key = e.key.toUpperCase();
        if (key === 'A' || key === 'B' || key === 'C') {
          const newFlow = key as 'A' | 'B' | 'C';
          setSwitchUserFlow(newFlow);
          toast(`Switched to Flow ${newFlow}`, {
            description: newFlow === 'A'
              ? 'In-menu PIN / Password'
              : newFlow === 'B'
                ? 'Modal with PIN / Password tabs'
                : 'In-menu with navigation to login',
            duration: 2000,
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

        if (activeModal === 'inventory') {
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
    };

    // Use capture phase (true) to intercept the event before browser shortcuts
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [currentUser, switchUserFlow, setSwitchUserFlow, openModal, activeModal, showUserLogoutNotification, resetPOS, resetSettings, closeModal, navigate, showFlowIndicator, setShowFlowIndicator]);

  /* ── Modals rendering (URL-addressable) ───────────���────────────────── */
  const renderModals = () => (
    <>
      {isModalOpen('customer') && (
        <CustomerSelectionModal
          onClose={closeModal}
          onConfirm={(customer, project) => {
            handleCustomerConfirm(customer, project);
            closeModal();
          }}
          isPriceCheckMode={isPriceCheckMode}
          scannedCardData={scannedCardData}
          onCardDataProcessed={() => setScannedCardData(null)}
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
      {!isPriceCheckMode && (
        <div className="content-stretch flex flex-col items-start relative shrink-0 w-full z-[3]">
          <HeaderWithMenu
            isPriceCheckMode={isPriceCheckMode}
            onPriceCheckClick={() => navigate('/priskontroll')}
            onPriceCheckClose={() => navigate('/salg')}
            currentUser={currentUser}
            onUserChange={setCurrentUser}
            onUserLogout={showUserLogoutNotification}
            onPreviousPurchasesClick={() => navigate('/tidligere-kjop')}
          />
        </div>
      )}

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

      {/* ── Page content ─────────────────────────────────────────────────── */}
      <Outlet />

      {/* ── URL-addressable modals ───────────────────────────────────────── */}
      {renderModals()}
      <SettingsModal />

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
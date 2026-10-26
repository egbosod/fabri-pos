import React, { createContext, useContext, useState, useCallback, useRef, ReactNode, useEffect } from 'react';
import {
  DEFAULT_SETTINGS,
  readSettingsFromURL,
  type SwitchUserFlow,
  type HovedordrePlacement,
  type CustomerSearchConcept,
  type PriceCheckLockConcept,
  type ParkingConcept,
  type FetchOrdersLayout,
  type OrderTypeDisplay,
  type ErpScenario,
} from '../utils/settingsUrl';

// Re-exported for existing consumers that import these types from SettingsContext.
export type { SwitchUserFlow, HovedordrePlacement, CustomerSearchConcept, PriceCheckLockConcept, ParkingConcept, FetchOrdersLayout, OrderTypeDisplay, ErpScenario };
export { DEFAULT_SETTINGS };

export interface SettingsContextType {
  switchUserFlow: SwitchUserFlow;
  setSwitchUserFlow: (flow: SwitchUserFlow) => void;
  erpScenario: ErpScenario;
  setErpScenario: (scenario: ErpScenario) => void;
  hovedordrePlacement: HovedordrePlacement;
  setHovedordrePlacement: (placement: HovedordrePlacement) => void;
  customerSearchConcept: CustomerSearchConcept;
  setCustomerSearchConcept: (concept: CustomerSearchConcept) => void;
  priceCheckLockConcept: PriceCheckLockConcept;
  setPriceCheckLockConcept: (concept: PriceCheckLockConcept) => void;
  parkingConcept: ParkingConcept;
  setParkingConcept: (concept: ParkingConcept) => void;
  fetchOrdersLayout: FetchOrdersLayout;
  setFetchOrdersLayout: (layout: FetchOrdersLayout) => void;
  orderTypeDisplay: OrderTypeDisplay;
  setOrderTypeDisplay: (display: OrderTypeDisplay) => void;
  showFlowIndicator: boolean;
  setShowFlowIndicator: (show: boolean) => void;
  isSettingsModalOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  allowCreateProject: boolean;
  setAllowCreateProject: (allow: boolean) => void;
  allowCreateContactPerson: boolean;
  setAllowCreateContactPerson: (allow: boolean) => void;
  showExpiredProjectsToggle: boolean;
  setShowExpiredProjectsToggle: (show: boolean) => void;
  brandSyncEnabled: boolean;
  setBrandSyncEnabled: (enabled: boolean) => void;
  brandSyncDark: boolean;
  setBrandSyncDark: (enabled: boolean) => void;
  showPasswordOption: boolean;
  setShowPasswordOption: (show: boolean) => void;
  scanCustomerCard: boolean;
  setScanCustomerCard: (enabled: boolean) => void;
  twoFactorEnabled: boolean;
  setTwoFactorEnabled: (enabled: boolean) => void;
  showLoginButton: boolean;
  setShowLoginButton: (show: boolean) => void;
  showTwoFactorButton: boolean;
  setShowTwoFactorButton: (show: boolean) => void;
  showForgotPassword: boolean;
  setShowForgotPassword: (show: boolean) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Settings carried in via a shared link (?flow=, ?erp=, ...). Read once at module
// scope so it isn't re-parsed (and doesn't stomp user changes) on every render.
const urlSettings = readSettingsFromURL(window.location.search);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [switchUserFlow, setSwitchUserFlowState] = useState<SwitchUserFlow>(
    urlSettings.switchUserFlow ?? DEFAULT_SETTINGS.switchUserFlow,
  );
  const [erpScenario, setErpScenario] = useState<ErpScenario>(
    urlSettings.erpScenario ?? DEFAULT_SETTINGS.erpScenario,
  );
  // Prototype D defaults to ERP AX: picking D (header, Settings or shortcut) selects AX.
  // The ERP can still be changed afterwards.
  const setSwitchUserFlow = (flow: SwitchUserFlow) => {
    setSwitchUserFlowState(flow);
    if (flow === 'D') setErpScenario('AX');
    if (flow === 'X') setErpScenario('Nexstep');
  };
  const [hovedordrePlacement, setHovedordrePlacement] = useState<HovedordrePlacement>(
    urlSettings.hovedordrePlacement ?? DEFAULT_SETTINGS.hovedordrePlacement,
  );
  const [customerSearchConcept, setCustomerSearchConcept] = useState<CustomerSearchConcept>(
    urlSettings.customerSearchConcept ?? DEFAULT_SETTINGS.customerSearchConcept,
  );
  const [priceCheckLockConcept, setPriceCheckLockConcept] = useState<PriceCheckLockConcept>(
    urlSettings.priceCheckLockConcept ?? DEFAULT_SETTINGS.priceCheckLockConcept,
  );
  const [parkingConcept, setParkingConcept] = useState<ParkingConcept>(
    urlSettings.parkingConcept ?? DEFAULT_SETTINGS.parkingConcept,
  );
  const [fetchOrdersLayout, setFetchOrdersLayout] = useState<FetchOrdersLayout>(
    urlSettings.fetchOrdersLayout ?? DEFAULT_SETTINGS.fetchOrdersLayout,
  );
  const [orderTypeDisplay, setOrderTypeDisplay] = useState<OrderTypeDisplay>(
    urlSettings.orderTypeDisplay ?? DEFAULT_SETTINGS.orderTypeDisplay,
  );
  const [showFlowIndicator, setShowFlowIndicator] = useState(
    urlSettings.showFlowIndicator ?? DEFAULT_SETTINGS.showFlowIndicator,
  );
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [allowCreateProject, setAllowCreateProject] = useState(
    urlSettings.allowCreateProject ?? DEFAULT_SETTINGS.allowCreateProject,
  );
  const [allowCreateContactPerson, setAllowCreateContactPerson] = useState(
    urlSettings.allowCreateContactPerson ?? DEFAULT_SETTINGS.allowCreateContactPerson,
  );
  const [showExpiredProjectsToggle, setShowExpiredProjectsToggle] = useState(
    urlSettings.showExpiredProjectsToggle ?? DEFAULT_SETTINGS.showExpiredProjectsToggle,
  );
  const [brandSyncEnabled, setBrandSyncEnabled] = useState(
    urlSettings.brandSyncEnabled ?? DEFAULT_SETTINGS.brandSyncEnabled,
  );
  const [brandSyncDark, setBrandSyncDark] = useState(
    urlSettings.brandSyncDark ?? DEFAULT_SETTINGS.brandSyncDark,
  );
  const [showPasswordOption, setShowPasswordOption] = useState(
    urlSettings.showPasswordOption ?? DEFAULT_SETTINGS.showPasswordOption,
  );
  const [scanCustomerCard, setScanCustomerCard] = useState(
    urlSettings.scanCustomerCard ?? DEFAULT_SETTINGS.scanCustomerCard,
  );
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    urlSettings.twoFactorEnabled ?? DEFAULT_SETTINGS.twoFactorEnabled,
  );
  const [showLoginButton, setShowLoginButton] = useState(
    urlSettings.showLoginButton ?? DEFAULT_SETTINGS.showLoginButton,
  );
  const [showTwoFactorButton, setShowTwoFactorButton] = useState(
    urlSettings.showTwoFactorButton ?? DEFAULT_SETTINGS.showTwoFactorButton,
  );
  const [showForgotPassword, setShowForgotPassword] = useState(
    urlSettings.showForgotPassword ?? DEFAULT_SETTINGS.showForgotPassword,
  );

  const openSettingsModal = useCallback(() => setIsSettingsModalOpen(true), []);
  const closeSettingsModal = useCallback(() => setIsSettingsModalOpen(false), []);

  // BrandSync mode: colour, font, style, buttons and tables (see styles/brandsync.css).
  useEffect(() => {
    document.documentElement.classList.toggle('brandsync', brandSyncEnabled);
    return () => document.documentElement.classList.remove('brandsync');
  }, [brandSyncEnabled]);

  // Dark variant only takes effect together with BrandSync.
  useEffect(() => {
    document.documentElement.classList.toggle('brandsync-dark', brandSyncEnabled && brandSyncDark);
    return () => document.documentElement.classList.remove('brandsync-dark');
  }, [brandSyncEnabled, brandSyncDark]);

  // Auto-enable scan for Aspect4 ERP sources — but only on an actual change,
  // not on mount, so a shared `?scan=` value isn't immediately stomped.
  const isErpMounted = useRef(false);
  useEffect(() => {
    if (!isErpMounted.current) {
      isErpMounted.current = true;
      return;
    }
    setScanCustomerCard(erpScenario === 'Aspect4' || erpScenario === 'Aspect4 DK');
  }, [erpScenario]);

  const resetSettings = useCallback(() => {
    setSwitchUserFlow(DEFAULT_SETTINGS.switchUserFlow);
    setErpScenario(DEFAULT_SETTINGS.erpScenario);
    setHovedordrePlacement(DEFAULT_SETTINGS.hovedordrePlacement);
    setCustomerSearchConcept(DEFAULT_SETTINGS.customerSearchConcept);
    setPriceCheckLockConcept(DEFAULT_SETTINGS.priceCheckLockConcept);
    setParkingConcept(DEFAULT_SETTINGS.parkingConcept);
    setFetchOrdersLayout(DEFAULT_SETTINGS.fetchOrdersLayout);
    setOrderTypeDisplay(DEFAULT_SETTINGS.orderTypeDisplay);
    setShowFlowIndicator(DEFAULT_SETTINGS.showFlowIndicator);
    setIsSettingsModalOpen(false);
    setAllowCreateProject(DEFAULT_SETTINGS.allowCreateProject);
    setAllowCreateContactPerson(DEFAULT_SETTINGS.allowCreateContactPerson);
    setShowExpiredProjectsToggle(DEFAULT_SETTINGS.showExpiredProjectsToggle);
    setBrandSyncEnabled(DEFAULT_SETTINGS.brandSyncEnabled);
    setBrandSyncDark(DEFAULT_SETTINGS.brandSyncDark);
    setShowPasswordOption(DEFAULT_SETTINGS.showPasswordOption);
    setScanCustomerCard(DEFAULT_SETTINGS.scanCustomerCard);
    setTwoFactorEnabled(DEFAULT_SETTINGS.twoFactorEnabled);
    setShowLoginButton(DEFAULT_SETTINGS.showLoginButton);
    setShowTwoFactorButton(DEFAULT_SETTINGS.showTwoFactorButton);
    setShowForgotPassword(DEFAULT_SETTINGS.showForgotPassword);
  }, []);

  // Keyboard listener for "." (settings)
  // NOTE: A/B/C flow shortcuts are handled in RootLayout where toast is available
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (event.key === '.' && !isInput) {
        setIsSettingsModalOpen(prev => !prev);
      }

      if (event.key === 'e' && !isInput) {
        setShowPasswordOption(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        switchUserFlow,
        setSwitchUserFlow,
        erpScenario,
        setErpScenario,
        hovedordrePlacement,
        setHovedordrePlacement,
        customerSearchConcept,
        setCustomerSearchConcept,
        priceCheckLockConcept,
        setPriceCheckLockConcept,
        parkingConcept,
        setParkingConcept,
        fetchOrdersLayout,
        setFetchOrdersLayout,
        orderTypeDisplay,
        setOrderTypeDisplay,
        showFlowIndicator,
        setShowFlowIndicator,
        isSettingsModalOpen,
        openSettingsModal,
        closeSettingsModal,
        allowCreateProject,
        setAllowCreateProject,
        allowCreateContactPerson,
        setAllowCreateContactPerson,
        showExpiredProjectsToggle,
        setShowExpiredProjectsToggle,
        brandSyncEnabled,
        setBrandSyncEnabled,
        brandSyncDark,
        setBrandSyncDark,
        showPasswordOption,
        setShowPasswordOption,
        scanCustomerCard,
        setScanCustomerCard,
        twoFactorEnabled,
        setTwoFactorEnabled,
        showLoginButton,
        setShowLoginButton,
        showTwoFactorButton,
        setShowTwoFactorButton,
        showForgotPassword,
        setShowForgotPassword,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
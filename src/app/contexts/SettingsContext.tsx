import React, { createContext, useContext, useState, useCallback, useRef, ReactNode, useEffect } from 'react';
import {
  DEFAULT_SETTINGS,
  readSettingsFromURL,
  type SwitchUserFlow,
  type HovedordrePlacement,
  type CustomerSearchConcept,
  type PriceCheckLockConcept,
  type ErpScenario,
} from '../utils/settingsUrl';

// Re-exported for existing consumers that import these types from SettingsContext.
export type { SwitchUserFlow, HovedordrePlacement, CustomerSearchConcept, PriceCheckLockConcept, ErpScenario };
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
  showFlowIndicator: boolean;
  setShowFlowIndicator: (show: boolean) => void;
  showDebugBanner: boolean;
  setShowDebugBanner: (show: boolean) => void;
  isSettingsModalOpen: boolean;
  openSettingsModal: () => void;
  closeSettingsModal: () => void;
  allowCreateProject: boolean;
  setAllowCreateProject: (allow: boolean) => void;
  allowCreateContactPerson: boolean;
  setAllowCreateContactPerson: (allow: boolean) => void;
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
  /** PRO card (XL-BYG/Aspect4 / Prototype B) demo-only offline toggle — no real network detection exists in this prototype. */
  simulateProCardOffline: boolean;
  setSimulateProCardOffline: (simulate: boolean) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Settings carried in via a shared link (?flow=, ?erp=, ...). Read once at module
// scope so it isn't re-parsed (and doesn't stomp user changes) on every render.
const urlSettings = readSettingsFromURL(window.location.search);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [switchUserFlow, setSwitchUserFlow] = useState<SwitchUserFlow>(
    urlSettings.switchUserFlow ?? DEFAULT_SETTINGS.switchUserFlow,
  );
  const [erpScenario, setErpScenario] = useState<ErpScenario>(
    urlSettings.erpScenario ?? DEFAULT_SETTINGS.erpScenario,
  );
  const [hovedordrePlacement, setHovedordrePlacement] = useState<HovedordrePlacement>(
    urlSettings.hovedordrePlacement ?? DEFAULT_SETTINGS.hovedordrePlacement,
  );
  const [customerSearchConcept, setCustomerSearchConcept] = useState<CustomerSearchConcept>(
    urlSettings.customerSearchConcept ?? DEFAULT_SETTINGS.customerSearchConcept,
  );
  const [priceCheckLockConcept, setPriceCheckLockConcept] = useState<PriceCheckLockConcept>(
    urlSettings.priceCheckLockConcept ?? DEFAULT_SETTINGS.priceCheckLockConcept,
  );
  const [showFlowIndicator, setShowFlowIndicator] = useState(
    urlSettings.showFlowIndicator ?? DEFAULT_SETTINGS.showFlowIndicator,
  );
  const [showDebugBanner, setShowDebugBanner] = useState(
    urlSettings.showDebugBanner ?? DEFAULT_SETTINGS.showDebugBanner,
  );
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [allowCreateProject, setAllowCreateProject] = useState(
    urlSettings.allowCreateProject ?? DEFAULT_SETTINGS.allowCreateProject,
  );
  const [allowCreateContactPerson, setAllowCreateContactPerson] = useState(
    urlSettings.allowCreateContactPerson ?? DEFAULT_SETTINGS.allowCreateContactPerson,
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
  const [simulateProCardOffline, setSimulateProCardOffline] = useState(false);

  const openSettingsModal = useCallback(() => setIsSettingsModalOpen(true), []);
  const closeSettingsModal = useCallback(() => setIsSettingsModalOpen(false), []);

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
    setShowFlowIndicator(DEFAULT_SETTINGS.showFlowIndicator);
    setShowDebugBanner(DEFAULT_SETTINGS.showDebugBanner);
    setIsSettingsModalOpen(false);
    setAllowCreateProject(DEFAULT_SETTINGS.allowCreateProject);
    setAllowCreateContactPerson(DEFAULT_SETTINGS.allowCreateContactPerson);
    setShowPasswordOption(DEFAULT_SETTINGS.showPasswordOption);
    setScanCustomerCard(DEFAULT_SETTINGS.scanCustomerCard);
    setTwoFactorEnabled(DEFAULT_SETTINGS.twoFactorEnabled);
    setShowLoginButton(DEFAULT_SETTINGS.showLoginButton);
    setShowTwoFactorButton(DEFAULT_SETTINGS.showTwoFactorButton);
    setShowForgotPassword(DEFAULT_SETTINGS.showForgotPassword);
    setSimulateProCardOffline(false);
  }, []);

  // Keyboard listener for "." (settings) and "d" (debug banner)
  // NOTE: A/B/C flow shortcuts are handled in RootLayout where toast is available
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (event.key === '.' && !isInput) {
        setIsSettingsModalOpen(prev => !prev);
      }

      if (event.key === 'd' && !isInput) {
        setShowDebugBanner(prev => !prev);
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
        showFlowIndicator,
        setShowFlowIndicator,
        showDebugBanner,
        setShowDebugBanner,
        isSettingsModalOpen,
        openSettingsModal,
        closeSettingsModal,
        allowCreateProject,
        setAllowCreateProject,
        allowCreateContactPerson,
        setAllowCreateContactPerson,
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
        simulateProCardOffline,
        setSimulateProCardOffline,
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
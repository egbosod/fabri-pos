import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export type SwitchUserFlow = 'A' | 'B' | 'C';
// Where the Hovedordre trigger lives. Independent of SwitchUserFlow.
//   A = action bar only   B = sidebar, shown disabled up front   C = sidebar, only once a customer exists
export type HovedordrePlacement = 'A' | 'B' | 'C';
// How a customer is fetched from an external ERP source in the select-customer modal.
//   A = toggle inside the search results, fetch happens automatically
//   B = toggle in the modal header, plus an explicit "Get customer" button
export type CustomerSearchConcept = 'A' | 'B';
export type ErpScenario = 'Nexstep' | 'Trygg2000' | 'Aspect4' | 'Aspect4 DK' | 'AX' | 'IFS';

export interface SettingsContextType {
  switchUserFlow: SwitchUserFlow;
  setSwitchUserFlow: (flow: SwitchUserFlow) => void;
  erpScenario: ErpScenario;
  setErpScenario: (scenario: ErpScenario) => void;
  hovedordrePlacement: HovedordrePlacement;
  setHovedordrePlacement: (placement: HovedordrePlacement) => void;
  customerSearchConcept: CustomerSearchConcept;
  setCustomerSearchConcept: (concept: CustomerSearchConcept) => void;
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
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

/**
 * Get initial flow from URL parameters
 * Supports: ?flow=A, ?flow=B, ?flow=C
 */
function getFlowFromURL(): SwitchUserFlow {
  const params = new URLSearchParams(window.location.search);
  const flowParam = params.get('flow')?.toUpperCase();
  
  if (flowParam === 'A' || flowParam === 'B' || flowParam === 'C') {
    return flowParam as SwitchUserFlow;
  }
  
  // Default to Flow C if no valid parameter
  return 'C';
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [switchUserFlow, setSwitchUserFlow] = useState<SwitchUserFlow>(getFlowFromURL());
  const [erpScenario, setErpScenario] = useState<ErpScenario>('Nexstep');
  const [hovedordrePlacement, setHovedordrePlacement] = useState<HovedordrePlacement>('A');
  const [customerSearchConcept, setCustomerSearchConcept] = useState<CustomerSearchConcept>('A');
  const [showFlowIndicator, setShowFlowIndicator] = useState(true);
  const [showDebugBanner, setShowDebugBanner] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [allowCreateProject, setAllowCreateProject] = useState(false);
  const [allowCreateContactPerson, setAllowCreateContactPerson] = useState(false);
  const [showPasswordOption, setShowPasswordOption] = useState(false);
  const [scanCustomerCard, setScanCustomerCard] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showTwoFactorButton, setShowTwoFactorButton] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(true);

  const openSettingsModal = useCallback(() => setIsSettingsModalOpen(true), []);
  const closeSettingsModal = useCallback(() => setIsSettingsModalOpen(false), []);

  // Auto-enable scan for Aspect4 ERP sources
  useEffect(() => {
    setScanCustomerCard(erpScenario === 'Aspect4' || erpScenario === 'Aspect4 DK');
  }, [erpScenario]);

  const resetSettings = useCallback(() => {
    setSwitchUserFlow(getFlowFromURL());
    setErpScenario('Nexstep');
    setHovedordrePlacement('A');
    setCustomerSearchConcept('A');
    setShowFlowIndicator(true);
    setShowDebugBanner(false);
    setIsSettingsModalOpen(false);
    setAllowCreateProject(false);
    setAllowCreateContactPerson(false);
    setShowPasswordOption(false);
    setScanCustomerCard(false);
    setTwoFactorEnabled(true);
    setShowLoginButton(true);
    setShowTwoFactorButton(false);
    setShowForgotPassword(true);
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
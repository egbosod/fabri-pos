import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export type SwitchUserFlow = 'A' | 'B' | 'C';
export type ErpScenario = 'Nexstep' | 'Trygg2000' | 'Aspect4' | 'Aspect4 DK' | 'AX' | 'IFS';

export interface SettingsContextType {
  switchUserFlow: SwitchUserFlow;
  setSwitchUserFlow: (flow: SwitchUserFlow) => void;
  erpScenario: ErpScenario;
  setErpScenario: (scenario: ErpScenario) => void;
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
  const [showFlowIndicator, setShowFlowIndicator] = useState(true);
  const [showDebugBanner, setShowDebugBanner] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [allowCreateProject, setAllowCreateProject] = useState(false);
  const [allowCreateContactPerson, setAllowCreateContactPerson] = useState(false);
  const [showPasswordOption, setShowPasswordOption] = useState(false);
  const [scanCustomerCard, setScanCustomerCard] = useState(true);

  const openSettingsModal = useCallback(() => setIsSettingsModalOpen(true), []);
  const closeSettingsModal = useCallback(() => setIsSettingsModalOpen(false), []);

  // Auto-enable scan for Aspect4 ERP sources
  useEffect(() => {
    setScanCustomerCard(erpScenario === 'Aspect4' || erpScenario === 'Aspect4 DK');
  }, [erpScenario]);

  const resetSettings = useCallback(() => {
    setSwitchUserFlow(getFlowFromURL());
    setErpScenario('Nexstep');
    setShowFlowIndicator(true);
    setShowDebugBanner(false);
    setIsSettingsModalOpen(false);
    setAllowCreateProject(false);
    setAllowCreateContactPerson(false);
    setShowPasswordOption(false);
    setScanCustomerCard(false);
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
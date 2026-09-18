import React, { useEffect, useRef, useState } from 'react';
import { X, Bug, ChevronDown, ChevronRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { buildShareURL, type SharedSettings } from '../utils/settingsUrl';

// ─── Panel language ───────────────────────────────────────────────────────────
// This panel is an internal prototyping tool, so it keeps its own language
// separate from the product language in LanguageContext. One language at a
// time — never mix Norwegian and English in the same view.
type PanelLang = 'no' | 'en';

const STRINGS: Record<PanelLang, Record<string, string>> = {
  no: {
    title: 'Innstillinger',
    save: 'Lagre',
    copyShareLink: 'Kopier delingslenke',
    copied: 'Kopiert!',
    copyFailed: 'Kunne ikke kopiere',

    userFlowHeading: 'Bytte bruker-flyt',
    userFlowDesc: 'Velg hvilket samhandlingsmønster som skal brukes for å bytte bruker i profilmenyen.',
    activeFlow: 'Aktiv flyt',
    flowA: 'Flyt A: Utvid brukernavnet for å vise PIN-/passordknapper.',
    flowB: 'Flyt B: Modal med PIN-/passordinnlogging.',
    flowC: 'Flyt C: Enkel meny med brukerliste og direkte handlingsknapper.',
    showFlowIndicator: 'Vis flytindikator',
    showFlowIndicatorDesc: 'Viser en rosa sirkel med aktiv flyt ved siden av profilmerket.',

    erpHeading: 'ERP-kilde',
    erpDesc: 'Velg hvilket ERP-scenario som skal brukes for kunde- og prosjektvalg.',
    erpNexstep: 'Nexstep ERP: Standard kunde- og prosjektoppsett med vanlige felter.',
    erpTrygg2000: 'Trygg2000 ERP: Utvidede kundedata med flere felter.',
    erpAspect4: 'Aspect4 ERP: Forenklet oppsett med vekt på prosjektvalg.',
    erpAspect4DK: 'Aspect4 DK ERP: Dansk variant med OIO-felter for offentlig fakturering.',
    erpAX: 'AX ERP: Microsoft Dynamics AX-integrasjon med utvidet kundeinfo.',
    erpIFS: 'IFS ERP: IFS Applications-oppsett med bransjespesifikke felter.',

    hovedordrePlacement: 'Plassering av hovedordre',
    hovedordreA: 'A: Kun handlingslinjen, deaktivert til en kunde er valgt.',
    hovedordreB: 'B: Kun sidemenyen, vises deaktivert til en kunde er valgt.',
    hovedordreC: 'C: Kun sidemenyen, vises når en kunde er valgt.',

    specificCustomerNumber: 'Spesifikt kundenummer',
    customerSearchA: 'A: Bryteren ligger i søkeresultatet, ERP-oppslaget kjøres automatisk.',
    customerSearchB: 'B: Bryteren ligger øverst til høyre i toppen, med en egen «Hent kunde»-knapp.',

    scanCustomerCard: 'Skann kundekort',
    scanCustomerCardAspect4: 'Aktivert som standard for Aspect4-kilder. Viser skanneknapp ved Kunde-feltet.',
    scanCustomerCardDesc: 'Vis skanneknapp ved Kunde-feltet i kundevalgmodalen.',

    shortcutsHeading: 'Tastatursnarveier',
    scSwitchUser: 'Bytt bruker',
    scSwitchUserDesc: 'Bytt til en tilfeldig bruker (flyt A og C)',
    scFakeCardScan: 'Falsk kortskanning',
    scFakeCardScanDesc: 'Simuler skanning av Aspect4-kundekort',
    scFakeVipScan: 'Falsk VIP-kortskanning',
    scFakeVipScanDesc: 'Simuler skanning av VIP-kort (krever Aspect4 DK og flyt C)',
    scFakeLogout: 'Falsk utlogging',
    scFakeLogoutDesc: 'Logg ut og gå til innloggingsskjermen',
    scResetAll: 'Nullstill all tilstand',
    scResetAllDesc: 'Tøm all tilstand og gå tilbake til standardsiden',
    scToggleIndicator: 'Vis/skjul flytindikator',
    scToggleIndicatorDesc: 'Vis eller skjul prototypens flytindikator',
    scSwitchFlow: 'Bytt flyt A / B / C',
    scSwitchFlowDesc: 'Endre samhandlingsmønster for brukerbytte raskt',
    scOpenSettings: 'Åpne innstillinger',
    scOpenSettingsDesc: 'Vis eller skjul dette innstillingspanelet',

    developerHeading: 'Utvikler',
    allowCreateProject: 'Tillat oppretting av nytt prosjekt',
    allowCreateProjectDesc: 'Vis en pluss-knapp ved «Prosjekt» i kundevalg for å opprette nye prosjekter.',
    allowCreateContactPerson: 'Tillat oppretting av ny kontaktperson',
    allowCreateContactPersonDesc: 'Vis en pluss-knapp ved «Kontaktperson» i kundevalg for å opprette nye kontakter.',
    showPasswordOption: 'Vis «Endre passord»-alternativ',
    showPasswordOptionDesc: 'Vis et passordalternativ i modalen for brukerbytte.',
    showDebugBanner: 'Vis debug-banner',
    showDebugBannerDesc: 'Vis overlegg for miljødebugging (kan også slås av og på med D).',

    wcagHeading: 'WCAG tilgjengelighet',
    wcagDesc: 'Test visuelle tilgjengelighetsfunksjoner. Slå på enkeltinnstillinger eller alt samtidig.',
    wcagContrast: 'Farger',
    wcagContrastDesc: 'Bruk WCAG AA/AAA-kontrastforhold for all tekst.',
    wcagTypography: 'Typografi',
    wcagTypographyDesc: 'Større skriftstørrelser, økt linjeavstand og tegnavstand.',
    wcagAll: 'Slå på alt',
    wcagAllDesc: 'Aktiver alle tilgjengelighetsfunksjoner samtidig.',
  },
  en: {
    title: 'Settings',
    save: 'Save',
    copyShareLink: 'Copy share link',
    copied: 'Copied!',
    copyFailed: 'Could not copy',

    userFlowHeading: 'User switch flow',
    userFlowDesc: 'Choose which interaction pattern to use for switching users in the profile menu.',
    activeFlow: 'Active flow',
    flowA: 'Flow A: Expand user name to show PIN/Password buttons.',
    flowB: 'Flow B: Modal with PIN/Password login.',
    flowC: 'Flow C: Simple menu with user list and direct action buttons.',
    showFlowIndicator: 'Show flow indicator',
    showFlowIndicatorDesc: 'Display a pink circle indicating the active flow next to the profile badge.',

    erpHeading: 'ERP source',
    erpDesc: 'Select which ERP scenario to use for customer/project selection.',
    erpNexstep: 'Nexstep ERP: Default customer/project layout with standard fields.',
    erpTrygg2000: 'Trygg2000 ERP: Enhanced customer data with additional fields.',
    erpAspect4: 'Aspect4 ERP: Simplified layout with focus on project selection.',
    erpAspect4DK: 'Aspect4 DK ERP: Danish variant with OIO fields for public sector invoicing.',
    erpAX: 'AX ERP: Microsoft Dynamics AX integration with extended customer info.',
    erpIFS: 'IFS ERP: IFS Applications layout with industry-specific fields.',

    hovedordrePlacement: 'Hovedordre placement',
    hovedordreA: 'A: Action bar only, disabled until a customer is selected.',
    hovedordreB: 'B: Sidebar only, shown disabled until a customer is selected.',
    hovedordreC: 'C: Sidebar only, appears once a customer is selected.',

    specificCustomerNumber: 'Specific customer number',
    customerSearchA: 'A: Toggle sits in the search results; the ERP lookup runs automatically.',
    customerSearchB: 'B: Toggle sits top right in the header, with an explicit "Get customer" button.',

    scanCustomerCard: 'Scan customer card',
    scanCustomerCardAspect4: 'Enabled by default for Aspect4 sources. Shows a scan button by the Customer field.',
    scanCustomerCardDesc: 'Show a scan button by the Customer field in the customer selection modal.',

    shortcutsHeading: 'Keyboard shortcuts',
    scSwitchUser: 'Switch user',
    scSwitchUserDesc: 'Switch to a random user (Flows A & C)',
    scFakeCardScan: 'Fake card scan',
    scFakeCardScanDesc: 'Simulate an Aspect4 customer card scan',
    scFakeVipScan: 'Fake VIP card scan',
    scFakeVipScanDesc: 'Simulate a VIP card scan (requires Aspect4 DK and Flow C)',
    scFakeLogout: 'Fake logout',
    scFakeLogoutDesc: 'Log out and navigate to the login screen',
    scResetAll: 'Reset all state',
    scResetAllDesc: 'Clear all state and return to the default page',
    scToggleIndicator: 'Toggle flow indicator',
    scToggleIndicatorDesc: 'Show / hide the prototype flow indicator',
    scSwitchFlow: 'Switch flow A / B / C',
    scSwitchFlowDesc: 'Quickly change the user switch interaction pattern',
    scOpenSettings: 'Open settings',
    scOpenSettingsDesc: 'Show or hide this settings panel',

    developerHeading: 'Developer',
    allowCreateProject: 'Allow creating new project',
    allowCreateProjectDesc: 'Show a plus button next to "Project" in customer selection to create new projects.',
    allowCreateContactPerson: 'Allow creating new contact person',
    allowCreateContactPersonDesc: 'Show a plus button next to "Contact person" in customer selection to create new contacts.',
    showPasswordOption: 'Show "Change password" option',
    showPasswordOptionDesc: 'Show a password option in the user switch modal.',
    showDebugBanner: 'Show debug banner',
    showDebugBannerDesc: 'Display the environment debug overlay (also toggled with the D key).',

    wcagHeading: 'WCAG accessibility',
    wcagDesc: 'Test visual accessibility features. Toggle individual settings or enable all at once.',
    wcagContrast: 'Contrast',
    wcagContrastDesc: 'Enable WCAG AA/AAA contrast ratios for all text.',
    wcagTypography: 'Typography',
    wcagTypographyDesc: 'Larger font sizes, enhanced line-height and letter-spacing.',
    wcagAll: 'Enable all',
    wcagAllDesc: 'Activate all accessibility features at once.',
  },
};

function NorwegianFlag() {
  return (
    <svg width="22" height="16" viewBox="0 0 24 18" aria-hidden="true">
      <rect width="24" height="18" fill="#BA0C2F" />
      <rect x="6" width="3" height="18" fill="white" />
      <rect width="24" height="3" y="7.5" fill="white" />
      <rect x="7" width="1" height="18" fill="#00205B" />
      <rect width="24" height="1" y="8.5" fill="#00205B" />
    </svg>
  );
}

function AustralianFlag() {
  return (
    <svg width="22" height="16" viewBox="0 0 24 18" aria-hidden="true">
      <rect width="24" height="18" fill="#00247D" />
      {/* Union Jack canton */}
      <clipPath id="au-canton">
        <rect width="12" height="9" />
      </clipPath>
      <g clipPath="url(#au-canton)">
        <path d="M0,0 L12,9 M12,0 L0,9" stroke="white" strokeWidth="1.8" />
        <path d="M0,0 L12,9 M12,0 L0,9" stroke="#CF142B" strokeWidth="1" />
        <path d="M6,0 L6,9 M0,4.5 L12,4.5" stroke="white" strokeWidth="3" />
        <path d="M6,0 L6,9 M0,4.5 L12,4.5" stroke="#CF142B" strokeWidth="1.8" />
      </g>
      {/* Commonwealth Star */}
      <circle cx="6" cy="13.5" r="1.9" fill="white" />
      {/* Southern Cross */}
      <circle cx="18.5" cy="4" r="1.1" fill="white" />
      <circle cx="21.5" cy="8.5" r="1.1" fill="white" />
      <circle cx="18.5" cy="13.5" r="1.1" fill="white" />
      <circle cx="15.5" cy="9.5" r="1.1" fill="white" />
      <circle cx="19.5" cy="9.8" r="0.6" fill="white" />
    </svg>
  );
}

// Shared style for both footer buttons ("Kopier delingslenke" and save/close).
const footerButtonStyle: React.CSSProperties = {
  padding: '6px 20px',
  height: 40,
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--radius)',
  cursor: 'pointer',
  fontFamily: "'Montserrat', sans-serif",
  fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'],
  fontSize: 'var(--text-sm)',
  color: 'var(--foreground)',
  lineHeight: 1.75,
  transition: 'background 0.1s',
};

export function SettingsModal() {
  const {
    switchUserFlow,
    setSwitchUserFlow,
    erpScenario,
    setErpScenario,
    hovedordrePlacement,
    setHovedordrePlacement,
    customerSearchConcept,
    setCustomerSearchConcept,
    isSettingsModalOpen,
    closeSettingsModal,
    showFlowIndicator,
    setShowFlowIndicator,
    showDebugBanner,
    setShowDebugBanner,
    allowCreateProject,
    setAllowCreateProject,
    allowCreateContactPerson,
    setAllowCreateContactPerson,
    showPasswordOption,
    setShowPasswordOption,
    scanCustomerCard,
    setScanCustomerCard,
    twoFactorEnabled,
    showLoginButton,
    showTwoFactorButton,
    showForgotPassword,
  } = useSettings();

  // Panel language is deliberately independent of the product language.
  const [panelLang, setPanelLang] = useState<PanelLang>('no');
  const s = STRINGS[panelLang];

  // Dragging state
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Collapsible sections — all expanded by default
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    userFlow: true,
    erp: true,
    shortcuts: true,
    developer: true,
    wcag: false,
  });

  // WCAG toggles (no persistence yet - visual testing only)
  const [wcagContrast, setWcagContrast] = useState(false);
  const [wcagTypography, setWcagTypography] = useState(false);
  const [wcagAll, setWcagAll] = useState(false);

  // "Kopier delingslenke" footer button label, temporarily swapped after a click
  const [copyStatus, setCopyStatus] = useState<'copied' | 'failed' | null>(null);
  const shareLinkTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (shareLinkTimeoutRef.current) clearTimeout(shareLinkTimeoutRef.current);
    };
  }, []);

  const flashCopyStatus = (status: 'copied' | 'failed') => {
    setCopyStatus(status);
    if (shareLinkTimeoutRef.current) clearTimeout(shareLinkTimeoutRef.current);
    shareLinkTimeoutRef.current = setTimeout(() => setCopyStatus(null), 2000);
  };

  const handleCopyShareLink = () => {
    const settings: SharedSettings = {
      switchUserFlow,
      erpScenario,
      hovedordrePlacement,
      customerSearchConcept,
      showFlowIndicator,
      showDebugBanner,
      allowCreateProject,
      allowCreateContactPerson,
      showPasswordOption,
      scanCustomerCard,
      twoFactorEnabled,
      showLoginButton,
      showTwoFactorButton,
      showForgotPassword,
    };

    const url = buildShareURL(settings);

    navigator.clipboard.writeText(url).then(
      () => flashCopyStatus('copied'),
      () => flashCopyStatus('failed'),
    );
  };

  const handleWcagContrastToggle = () => {
    const newState = !wcagContrast;
    setWcagContrast(newState);
    document.documentElement.classList.toggle('wcag-contrast', newState);
  };

  const handleWcagTypographyToggle = () => {
    const newState = !wcagTypography;
    setWcagTypography(newState);
    document.documentElement.classList.toggle('wcag-typography', newState);
  };

  const handleWcagAllToggle = () => {
    const newState = !wcagAll;
    setWcagAll(newState);
    setWcagContrast(newState);
    setWcagTypography(newState);
    document.documentElement.classList.toggle('wcag-contrast', newState);
    document.documentElement.classList.toggle('wcag-typography', newState);
  };

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Center the modal on first open
  useEffect(() => {
    if (isSettingsModalOpen) {
      const centerX = window.innerWidth / 2 - 250;
      const centerY = window.innerHeight / 2 - 300;
      setPosition({ x: centerX, y: centerY });
    }
  }, [isSettingsModalOpen]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragOffset({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y });
    };
    const handleMouseUp = () => setIsDragging(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  useEffect(() => {
    if (!isSettingsModalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        closeSettingsModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSettingsModalOpen, closeSettingsModal]);

  if (!isSettingsModalOpen) return null;

  // ── Shared sub-components ────────────────────────────────────────────────────

  const SectionHeader = ({
    sectionKey,
    children,
    icon,
  }: {
    sectionKey: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
  }) => {
    const isExpanded = expandedSections[sectionKey];
    return (
      <button
        onClick={() => toggleSection(sectionKey)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          textAlign: 'left',
          width: '100%',
        }}
      >
        {icon && (
          <span style={{ color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center' }}>
            {icon}
          </span>
        )}
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--foreground)',
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {children}
        </span>
        <span style={{ color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </span>
      </button>
    );
  };

  const DescText = ({ children }: { children: React.ReactNode }) => (
    <p
      style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--font-weight-normal)',
        color: 'var(--muted-foreground)',
        lineHeight: 1.5,
        margin: 0,
      }}
    >
      {children}
    </p>
  );

  const RowCard = ({ children }: { children: React.ReactNode }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        background: 'var(--background)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        padding: 16,
      }}
    >
      {children}
    </div>
  );

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      onClick={onChange}
      style={{
        width: 48,
        height: 24,
        borderRadius: 999,
        padding: 4,
        border: 'none',
        cursor: 'pointer',
        background: checked ? 'var(--primary)' : 'var(--muted)',
        transition: 'background 0.2s ease-in-out',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'var(--card)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          position: 'absolute',
          top: 4,
          left: checked ? 28 : 4,
          transition: 'left 0.2s ease-in-out',
        }}
      />
    </button>
  );

  const Kbd = ({ children }: { children: React.ReactNode }) => (
    <kbd
      style={{
        padding: '2px 8px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'monospace',
        fontWeight: 'var(--font-weight-medium)',
        fontSize: 'var(--text-sm)',
        color: 'var(--secondary-foreground)',
        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </kbd>
  );

  const KbdRow = ({
    label,
    desc,
    keys,
    separator = '+',
  }: {
    label: string;
    desc: string;
    keys: React.ReactNode[];
    /** '+' for a chord (Ctrl + L), '/' when the keys are alternatives (A / B / C). */
    separator?: '+' | '/';
  }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 'var(--font-weight-semibold)',
            fontSize: 'var(--text-base)',
            color: 'var(--foreground)',
            lineHeight: 1.5,
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'var(--text-sm)',
            color: 'var(--muted-foreground)',
            lineHeight: 1.4,
          }}
        >
          {desc}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {keys.map((key, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>
                {separator}
              </span>
            )}
            {key}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const Divider = () => <div style={{ height: 1, background: 'var(--border)' }} />;

  const erpOptions = ['Nexstep', 'Trygg2000', 'Aspect4', 'Aspect4 DK', 'AX', 'IFS'] as const;
  const erpDescriptions: Record<string, string> = {
    Nexstep: s.erpNexstep,
    Trygg2000: s.erpTrygg2000,
    Aspect4: s.erpAspect4,
    'Aspect4 DK': s.erpAspect4DK,
    AX: s.erpAX,
    IFS: s.erpIFS,
  };

  const flowDescriptions: Record<string, string> = { A: s.flowA, B: s.flowB, C: s.flowC };

  const customerSearchDescriptions: Record<string, string> = { A: s.customerSearchA, B: s.customerSearchB };

  const hovedordreDescriptions: Record<string, string> = {
    A: s.hovedordreA,
    B: s.hovedordreB,
    C: s.hovedordreC,
  };

  const isAspect4 = erpScenario === 'Aspect4' || erpScenario === 'Aspect4 DK';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.5)',
      }}
    >
      <div
        style={{
          background: 'var(--card)',
          borderRadius: 'var(--radius)',
          boxShadow: '2px 2px 4px rgba(107,107,114,0.06), 4px 12px 20px rgba(107,107,114,0.16)',
          width: '100%',
          maxWidth: 520,
          maxHeight: 'calc(100vh - 2rem)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          left: `${position.x}px`,
          top: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'default',
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        {/* ── Header (draggable) ── */}
        <div
          onMouseDown={handleMouseDown}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
            cursor: 'grab',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--foreground)',
              lineHeight: 1.5,
            }}
          >
            {s.title}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {/* Panel language — one language at a time, never mixed */}
            <div
              onMouseDown={e => e.stopPropagation()}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                background: 'var(--secondary)',
                borderRadius: 999,
                padding: 2,
                marginRight: 4,
              }}
            >
              {([
                { code: 'no' as const, Flag: NorwegianFlag, label: 'Norsk' },
                { code: 'en' as const, Flag: AustralianFlag, label: 'English' },
              ]).map(({ code, Flag, label }) => (
                <button
                  key={code}
                  onClick={() => setPanelLang(code)}
                  title={label}
                  aria-label={label}
                  aria-pressed={panelLang === code}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: 999,
                    background: panelLang === code ? 'var(--card)' : 'transparent',
                    boxShadow: panelLang === code ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                    opacity: panelLang === code ? 1 : 0.5,
                    transition: 'all 0.15s ease-in-out',
                  }}
                >
                  <Flag />
                </button>
              ))}
            </div>
          <button
            onClick={closeSettingsModal}
            onMouseDown={e => e.stopPropagation()}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              borderRadius: 'var(--radius)',
              color: 'var(--muted-foreground)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'none')}
          >
            <X size={20} />
          </button>
          </div>
        </div>

        {/* ── Body (scrollable) ── */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 0, overflowY: 'auto', flex: 1 }}>

          {/* ─ Switch User Flow ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeader sectionKey="userFlow">
              {s.userFlowHeading}
            </SectionHeader>
            {expandedSections.userFlow && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                <DescText>
                  {s.userFlowDesc}
                </DescText>

                <RowCard>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {s.activeFlow}: {switchUserFlow}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {flowDescriptions[switchUserFlow]}
                    </p>
                  </div>
                  {/* A / B / C toggle pill */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'var(--secondary)',
                      borderRadius: 999,
                      padding: 4,
                      width: 200,
                      flexShrink: 0,
                      position: 'relative',
                    }}
                  >
                    {(['A', 'B', 'C'] as const).map(flow => (
                      <button
                        key={flow}
                        onClick={() => setSwitchUserFlow(flow)}
                        style={{
                          flex: 1,
                          padding: '4px 12px',
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontFamily: "'Montserrat', sans-serif",
                          borderRadius: 999,
                          border: 'none',
                          cursor: 'pointer',
                          background: switchUserFlow === flow ? 'var(--card)' : 'transparent',
                          color: switchUserFlow === flow ? 'var(--primary)' : 'var(--muted-foreground)',
                          boxShadow: switchUserFlow === flow ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                          transition: 'all 0.15s ease-in-out',
                          zIndex: 1,
                        }}
                      >
                        {flow}
                      </button>
                    ))}
                  </div>
                </RowCard>

                <RowCard>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.showFlowIndicator}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.showFlowIndicatorDesc}
                    </p>
                  </div>
                  <Toggle checked={showFlowIndicator} onChange={() => setShowFlowIndicator(!showFlowIndicator)} />
                </RowCard>
              </div>
            )}
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

          {/* ─ ERP System Selection ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeader sectionKey="erp">{s.erpHeading}</SectionHeader>
            {expandedSections.erp && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                <DescText>{s.erpDesc}</DescText>

                <div
                  style={{
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    {erpOptions.map(option => {
                      const active = erpScenario === option;
                      return (
                        <button
                          key={option}
                          onClick={() => setErpScenario(option)}
                          style={{
                            padding: '6px 16px',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontFamily: "'Montserrat', sans-serif",
                            borderRadius: 'var(--radius)',
                            border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                            cursor: 'pointer',
                            background: active ? 'var(--primary)' : 'var(--card)',
                            color: active ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                            boxShadow: active ? '0 1px 4px rgba(13,151,252,0.18)' : 'none',
                            transition: 'all 0.15s ease-in-out',
                            lineHeight: 1.75,
                          }}
                          onMouseEnter={e => {
                            if (!active) {
                              e.currentTarget.style.borderColor = 'var(--primary)';
                              e.currentTarget.style.color = 'var(--foreground)';
                            }
                          }}
                          onMouseLeave={e => {
                            if (!active) {
                              e.currentTarget.style.borderColor = 'var(--border)';
                              e.currentTarget.style.color = 'var(--muted-foreground)';
                            }
                          }}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)',
                      margin: '12px 0 0',
                      lineHeight: 1.5,
                    }}
                  >
                    {erpDescriptions[erpScenario]}
                  </p>
                </div>

                {isAspect4 && (
                  <RowCard>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--text-base)',
                          color: 'var(--foreground)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {s.hovedordrePlacement}: {hovedordrePlacement}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                          margin: '4px 0 0',
                          lineHeight: 1.4,
                        }}
                      >
                        {hovedordreDescriptions[hovedordrePlacement]}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--secondary)',
                        borderRadius: 999,
                        padding: 4,
                        width: 200,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      {(['A', 'B', 'C'] as const).map(placement => (
                        <button
                          key={placement}
                          onClick={() => setHovedordrePlacement(placement)}
                          style={{
                            flex: 1,
                            padding: '4px 12px',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontFamily: "'Montserrat', sans-serif",
                            borderRadius: 999,
                            border: 'none',
                            cursor: 'pointer',
                            background: hovedordrePlacement === placement ? 'var(--card)' : 'transparent',
                            color: hovedordrePlacement === placement ? 'var(--primary)' : 'var(--muted-foreground)',
                            boxShadow: hovedordrePlacement === placement ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.15s ease-in-out',
                            zIndex: 1,
                          }}
                        >
                          {placement}
                        </button>
                      ))}
                    </div>
                  </RowCard>
                )}

                {isAspect4 && (
                  <RowCard>
                    <div>
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 'var(--font-weight-semibold)',
                          fontSize: 'var(--text-base)',
                          color: 'var(--foreground)',
                          lineHeight: 1.5,
                          margin: 0,
                        }}
                      >
                        {s.specificCustomerNumber}: {customerSearchConcept}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Montserrat', sans-serif",
                          fontSize: 'var(--text-sm)',
                          color: 'var(--muted-foreground)',
                          margin: '4px 0 0',
                          lineHeight: 1.4,
                        }}
                      >
                        {customerSearchDescriptions[customerSearchConcept]}
                      </p>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--secondary)',
                        borderRadius: 999,
                        padding: 4,
                        width: 200,
                        flexShrink: 0,
                        position: 'relative',
                      }}
                    >
                      {(['A', 'B'] as const).map(concept => (
                        <button
                          key={concept}
                          onClick={() => setCustomerSearchConcept(concept)}
                          style={{
                            flex: 1,
                            padding: '4px 12px',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontFamily: "'Montserrat', sans-serif",
                            borderRadius: 999,
                            border: 'none',
                            cursor: 'pointer',
                            background: customerSearchConcept === concept ? 'var(--card)' : 'transparent',
                            color: customerSearchConcept === concept ? 'var(--primary)' : 'var(--muted-foreground)',
                            boxShadow: customerSearchConcept === concept ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                            transition: 'all 0.15s ease-in-out',
                            zIndex: 1,
                          }}
                        >
                          {concept}
                        </button>
                      ))}
                    </div>
                  </RowCard>
                )}

                {/* Scan Customer Card toggle */}
                <RowCard>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.scanCustomerCard}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {isAspect4
                        ? s.scanCustomerCardAspect4
                        : s.scanCustomerCardDesc}
                    </p>
                  </div>
                  <Toggle checked={scanCustomerCard} onChange={() => setScanCustomerCard(!scanCustomerCard)} />
                </RowCard>
              </div>
            )}
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

          {/* ─ Keyboard Shortcuts ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeader sectionKey="shortcuts">
              {s.shortcutsHeading}
            </SectionHeader>
            {expandedSections.shortcuts && (
              <div
                style={{
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: 16,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  marginTop: 12,
                }}
              >
                <KbdRow
                  label={s.scSwitchUser}
                  desc={s.scSwitchUserDesc}
                  keys={[<Kbd key="mod">⌘/Ctrl</Kbd>, <Kbd key="key">,</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label={s.scFakeCardScan}
                  desc={s.scFakeCardScanDesc}
                  keys={[<Kbd key="mod">Ctrl</Kbd>, <Kbd key="key">-</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label={s.scFakeVipScan}
                  desc={s.scFakeVipScanDesc}
                  keys={[<Kbd key="mod">Ctrl</Kbd>, <Kbd key="key">&lt;</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label={s.scFakeLogout}
                  desc={s.scFakeLogoutDesc}
                  keys={[<Kbd key="mod">⌘/Ctrl</Kbd>, <Kbd key="key">L</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label={s.scResetAll}
                  desc={s.scResetAllDesc}
                  keys={[<Kbd key="key">H</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label={s.scToggleIndicator}
                  desc={s.scToggleIndicatorDesc}
                  keys={[<Kbd key="key">I</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label={s.scSwitchFlow}
                  desc={s.scSwitchFlowDesc}
                  keys={[<Kbd key="key">A</Kbd>, <Kbd key="key2">B</Kbd>, <Kbd key="key3">C</Kbd>]}
                  separator="/"
                />
                <Divider />
                <KbdRow
                  label={s.scOpenSettings}
                  desc={s.scOpenSettingsDesc}
                  keys={[<Kbd key="key">.</Kbd>]}
                />
              </div>
            )}
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

          {/* ─ Developer ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeader sectionKey="developer" icon={<Bug size={16} />}>
              {s.developerHeading}
            </SectionHeader>
            {expandedSections.developer && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                <RowCard>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.allowCreateProject}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.allowCreateProjectDesc}
                    </p>
                  </div>
                  <Toggle
                    checked={allowCreateProject}
                    onChange={() => setAllowCreateProject(!allowCreateProject)}
                  />
                </RowCard>

                <RowCard>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.allowCreateContactPerson}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.allowCreateContactPersonDesc}
                    </p>
                  </div>
                  <Toggle
                    checked={allowCreateContactPerson}
                    onChange={() => setAllowCreateContactPerson(!allowCreateContactPerson)}
                  />
                </RowCard>

                <RowCard>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.showPasswordOption}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.showPasswordOptionDesc}
                    </p>
                  </div>
                  <Toggle
                    checked={showPasswordOption}
                    onChange={() => setShowPasswordOption(!showPasswordOption)}
                  />
                </RowCard>

                <RowCard>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.showDebugBanner}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.showDebugBannerDesc}
                    </p>
                  </div>
                  <Toggle checked={showDebugBanner} onChange={() => setShowDebugBanner(!showDebugBanner)} />
                </RowCard>
              </div>
            )}
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

          {/* ─ WCAG Accessibility ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeader sectionKey="wcag">
              {s.wcagHeading}
            </SectionHeader>
            {expandedSections.wcag && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                <DescText>
                  {s.wcagDesc}
                </DescText>

                <RowCard>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.wcagContrast}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.wcagContrastDesc}
                    </p>
                  </div>
                  <Toggle checked={wcagContrast} onChange={handleWcagContrastToggle} />
                </RowCard>

                <RowCard>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.wcagTypography}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.wcagTypographyDesc}
                    </p>
                  </div>
                  <Toggle checked={wcagTypography} onChange={handleWcagTypographyToggle} />
                </RowCard>

                <RowCard>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: 'var(--font-weight-semibold)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--foreground)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {s.wcagAll}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: 'var(--text-sm)',
                        color: 'var(--muted-foreground)',
                        margin: '4px 0 0',
                        lineHeight: 1.4,
                      }}
                    >
                      {s.wcagAllDesc}
                    </p>
                  </div>
                  <Toggle checked={wcagAll} onChange={handleWcagAllToggle} />
                </RowCard>
              </div>
            )}
          </div>

          {/* bottom padding */}
          <div style={{ height: 8 }} />
        </div>

        {/* ── Footer ── */}
        <div
          style={{
            padding: '12px 24px',
            borderTop: '1px solid var(--border)',
            background: 'var(--background)',
            display: 'flex',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}
        >
          <button
            onClick={handleCopyShareLink}
            style={footerButtonStyle}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
          >
            {copyStatus === 'copied' ? s.copied : copyStatus === 'failed' ? s.copyFailed : s.copyShareLink}
          </button>
          <button
            onClick={closeSettingsModal}
            style={footerButtonStyle}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
          >
            {s.save}
          </button>
        </div>
      </div>
    </div>
  );
}

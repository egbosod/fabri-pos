import React, { useEffect, useState } from 'react';
import { X, Bug, ChevronDown, ChevronRight } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useLanguage } from '../contexts/LanguageContext';

export function SettingsModal() {
  const {
    switchUserFlow,
    setSwitchUserFlow,
    erpScenario,
    setErpScenario,
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
  } = useSettings();

  const { t } = useLanguage();

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
  });

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
  }: {
    label: string;
    desc: string;
    keys: React.ReactNode[];
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
              <span style={{ fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)' }}>+</span>
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
    Nexstep: 'Nexstep ERP: Default customer/project layout with standard fields.',
    Trygg2000: 'Trygg2000 ERP: Enhanced customer data with additional fields.',
    Aspect4: 'Aspect4 ERP: Simplified layout with focus on project selection.',
    'Aspect4 DK': 'Aspect4 DK ERP: Danish variant with OIO fields for public sector invoicing.',
    AX: 'AX ERP: Microsoft Dynamics AX integration with extended customer info.',
    IFS: 'IFS ERP: IFS Applications layout with industry-specific fields.',
  };

  const flowDescriptions: Record<string, string> = {
    A: 'Flow A: Expand user name to show PIN/Password buttons.',
    B: 'Flow B: Modal with PIN/Password login.',
    C: 'Flow C: Simple menu with user list and direct action buttons.',
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
            Settings / Innstillinger
          </span>
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

        {/* ── Body (scrollable) ── */}
        <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 0, overflowY: 'auto', flex: 1 }}>

          {/* ─ Switch User Flow ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeader sectionKey="userFlow">
              User Switch Flow / Bytte bruker flyt
            </SectionHeader>
            {expandedSections.userFlow && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                <DescText>
                  Choose which interaction pattern to use for switching users in the profile menu.
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
                      Active Flow: {switchUserFlow}
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
                      Show Flow Indicator
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
                      Display a pink circle indicating the active flow next to the profile badge.
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
            <SectionHeader sectionKey="erp">ERP-source</SectionHeader>
            {expandedSections.erp && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
                <DescText>Select which ERP scenario to use for customer/project selection.</DescText>

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
                      Skann kundekort / Scan Customer Card
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
                        ? 'Aktivert som standard for Aspect4-kilder. Viser skanneknapp ved Kunde-feltet.'
                        : 'Vis skanneknapp ved Kunde-feltet i kundevalgmodalen.'}
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
              Keyboard Shortcuts / Tastatursnarveier
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
                  label="Switch User"
                  desc="Switch to a random user (Flows A & C)"
                  keys={[<Kbd key="mod">⌘/Ctrl</Kbd>, <Kbd key="key">,</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label="Fake Card Scan"
                  desc="Simulate Aspect4 customer card scan"
                  keys={[<Kbd key="mod">Ctrl</Kbd>, <Kbd key="key">-</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label="Fake Logout"
                  desc="Log out and navigate to login screen"
                  keys={[<Kbd key="mod">⌘/Ctrl</Kbd>, <Kbd key="key">L</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label="Reset All State"
                  desc="Clear all state and return to default page"
                  keys={[<Kbd key="key">H</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label="Toggle Flow Indicator"
                  desc="Show / hide prototype flow indicator"
                  keys={[<Kbd key="key">I</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label="Switch Flow A / B / C"
                  desc="Quickly change user switch interaction pattern"
                  keys={[<Kbd key="key">A</Kbd>, <Kbd key="key2">B</Kbd>, <Kbd key="key3">C</Kbd>]}
                />
                <Divider />
                <KbdRow
                  label="Open Settings"
                  desc="Toggle this settings panel"
                  keys={[<Kbd key="key">.</Kbd>]}
                />
              </div>
            )}
          </div>

          <div style={{ height: 1, background: 'var(--border)', margin: '20px 0' }} />

          {/* ─ Developer ─ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <SectionHeader sectionKey="developer" icon={<Bug size={16} />}>
              Developer / Utvikler
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
                      {t('allowCreateProject')}
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
                      Show a plus button next to «Prosjekt» in customer selection to create new projects.
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
                      {t('allowCreateContactPerson')}
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
                      Show a plus button next to «Kontaktperson» in customer selection to create new contacts.
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
                      {t('showPasswordOption')}
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
                      Show a password option in the user switch modal.
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
                      Show Debug Banner
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
                      Display environment debug overlay (also toggled with D key).
                    </p>
                  </div>
                  <Toggle checked={showDebugBanner} onChange={() => setShowDebugBanner(!showDebugBanner)} />
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
            justifyContent: 'flex-end',
            flexShrink: 0,
          }}
        >
          <button
            onClick={closeSettingsModal}
            style={{
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
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
          >
            {t('save')}
          </button>
        </div>
      </div>
    </div>
  );
}

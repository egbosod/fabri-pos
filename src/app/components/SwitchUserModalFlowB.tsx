import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'sonner@2.0.3';
import svgPathsPinIcon from "../imports/svg-pi7ybb4q4f";

/* ─── SVG helpers from Figma imports ─────────────────────────────────────── */

function UserIcon() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <path
          clipRule="evenodd"
          d={svgPathsPinIcon.p36364e40}
          fill="var(--foreground)"
          fillRule="evenodd"
        />
      </svg>
    </div>
  );
}

function ChevronDownIcon({ className = '' }: { className?: string }) {
  return (
    <div className={`relative shrink-0 size-[14px] ${className}`}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <path
          clipRule="evenodd"
          d={svgPathsPinIcon.pc2f4900}
          fill="var(--foreground)"
          fillRule="evenodd"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}

function BackspaceIcon() {
  return (
    <div className="h-[14.4px] relative shrink-0 w-[18px]">
      <svg className="block size-full" fill="none" viewBox="0 0 19 16">
        <path
          d={svgPathsPinIcon.p36765300}
          stroke="var(--foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.09"
        />
        <path
          d={svgPathsPinIcon.p3374740}
          stroke="var(--foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.09"
        />
        <path
          d={svgPathsPinIcon.p17633100}
          stroke="var(--foreground)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.09"
        />
      </svg>
    </div>
  );
}

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface SwitchUserModalFlowBProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: string;
  onSwitchUser: (newUser: string) => void;
}

type ViewState = 'pin' | 'password' | 'change-pin';

const ALL_USERS = ['Per Gunnersen', 'Ole Gunnar Damstuen', 'Mari Kristine Gullerud', 'Lise Arntsen'];

/* ─── Numpad Component ───────────────────────────────────────────────────── */

function NumpadButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        bg-card relative flex-[1_0_0] h-[48px] min-w-[100px] rounded-[var(--radius)]
        flex items-center justify-center cursor-pointer
        hover:bg-secondary/50 active:bg-secondary transition-colors
        font-['Montserrat',sans-serif] font-semibold text-[var(--text-base)] text-foreground
        ${className}
      `}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 border border-border rounded-[var(--radius)] pointer-events-none"
      />
      {children}
    </button>
  );
}

function Numpad({ onKey }: { onKey: (val: string) => void }) {
  const rows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['C', '0', 'backspace'],
  ];

  return (
    <div className="flex flex-col gap-[12px] w-full max-w-[328px]">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-[12px] w-full">
          {row.map((key) => (
            <NumpadButton key={key} onClick={() => onKey(key)}>
              {key === 'backspace' ? <BackspaceIcon /> : key}
            </NumpadButton>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Main Modal ─────────────────────────────────────────────────────────── */

export function SwitchUserModalFlowB({
  isOpen,
  onClose,
  currentUser,
  onSwitchUser,
}: SwitchUserModalFlowBProps) {
  const [view, setView] = useState<ViewState>('pin');
  const [selectedUser, setSelectedUser] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // PIN view state
  const [pin, setPin] = useState('');

  // Password view state
  const [password, setPassword] = useState('');

  // Change-PIN view state
  const [changePinPassword, setChangePinPassword] = useState('');
  const [changePinNew, setChangePinNew] = useState('');
  const [changePinConfirm, setChangePinConfirm] = useState('');

  // Which PIN field the numpad targets in change-pin view
  const [changePinFocus, setChangePinFocus] = useState<'new' | 'confirm'>('new');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);

  /* ── Reset on open ─────────────────────────────────────────────────────── */
  useEffect(() => {
    if (isOpen) {
      setView('pin');
      setSelectedUser('');
      setPin('');
      setPassword('');
      setChangePinPassword('');
      setChangePinNew('');
      setChangePinConfirm('');
      setChangePinFocus('new');
      setIsDropdownOpen(false);
    }
  }, [isOpen]);

  /* ── Esc to close ──────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Close dropdown first if open, otherwise close modal
        if (isDropdownOpen) {
          setIsDropdownOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isDropdownOpen, onClose]);

  /* ── Close dropdown on outside click ───────────────────────────────────── */
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isDropdownOpen]);

  /* ── Numpad handler ────────────────────────────────────────────────────── */
  const handleNumpadKey = useCallback(
    (val: string) => {
      if (view === 'pin') {
        if (val === 'C') {
          setPin('');
        } else if (val === 'backspace') {
          setPin((p) => p.slice(0, -1));
        } else if (pin.length < 6) {
          setPin((p) => p + val);
        }
      } else if (view === 'change-pin') {
        if (val === 'C') {
          if (changePinFocus === 'confirm') {
            setChangePinConfirm('');
          } else {
            setChangePinNew('');
          }
        } else if (val === 'backspace') {
          if (changePinFocus === 'confirm') {
            setChangePinConfirm((p) => p.slice(0, -1));
          } else {
            setChangePinNew((p) => p.slice(0, -1));
          }
        } else {
          if (changePinFocus === 'new' && changePinNew.length < 6) {
            setChangePinNew((p) => p + val);
          } else if (changePinFocus === 'confirm' && changePinConfirm.length < 6) {
            setChangePinConfirm((p) => p + val);
          }
        }
      }
      // Password view: no numpad interaction (keyboard input only)
    },
    [view, pin, changePinFocus, changePinNew, changePinConfirm]
  );

  /* ── Validation ────────────────────────────────────────────────────────── */
  const isFormValid = (): boolean => {
    if (!selectedUser) return false;
    if (view === 'pin') return pin.length >= 4;
    if (view === 'password') return password.length > 0;
    if (view === 'change-pin') {
      return (
        changePinPassword.length > 0 &&
        changePinNew.length >= 4 &&
        changePinConfirm.length >= 4 &&
        changePinNew === changePinConfirm
      );
    }
    return false;
  };

  const isValid = isFormValid();

  /* ── Confirm action ────────────────────────────────────────────────────── */
  const handleConfirm = () => {
    if (!selectedUser) {
      toast.error('Velg en bruker');
      return;
    }

    if (view === 'pin') {
      if (pin.length < 4) {
        toast.error('PIN-kode må være minst 4 siffer');
        return;
      }
      onSwitchUser(selectedUser);
    } else if (view === 'password') {
      if (!password) {
        toast.error('Skriv inn passord');
        return;
      }
      onSwitchUser(selectedUser);
    } else if (view === 'change-pin') {
      if (!changePinPassword) {
        toast.error('Skriv inn nåværende passord');
        return;
      }
      if (changePinNew.length < 4) {
        toast.error('Ny PIN-kode må være minst 4 siffer');
        return;
      }
      if (changePinNew !== changePinConfirm) {
        toast.error('PIN-kodene stemmer ikke overens');
        return;
      }
      toast.success('PIN-kode endret');
      setView('pin');
      setChangePinPassword('');
      setChangePinNew('');
      setChangePinConfirm('');
    }
  };

  /* ── Switch tab ────────────────────────────────────────────────────────── */
  const switchTab = (newView: ViewState) => {
    setView(newView);
    // Reset fields when switching tabs
    setPin('');
    setPassword('');
    setChangePinPassword('');
    setChangePinNew('');
    setChangePinConfirm('');
    setChangePinFocus('new');
  };

  if (!isOpen) return null;

  const showNumpad = view === 'pin' || view === 'change-pin';

  /* ── Header title ──────────────────────────────────────────────────────── */
  const headerTitle =
    view === 'change-pin' ? 'Change user, choose method' : 'Select method to change user';

  /* ── Confirm button label ──────────────────────────────────────────────── */
  const confirmLabel = view === 'change-pin' ? 'Confirm new PIN-code' : 'Confirm';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div
        className="
          bg-background flex flex-col overflow-hidden
          rounded-[var(--radius-sm)] 
          shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)]
          w-[900px] max-h-[90vh]
        "
      >
        {/* ═══ HEADER ═══════════════════════════════════════════════════════ */}
        <div className="bg-card shrink-0 z-[3]">
          {/* Module header */}
          <div className="relative px-[21px] py-[22px]">
            <div className="flex items-center gap-[11px]">
              <UserIcon />
              <span
                className="font-['Montserrat',sans-serif] font-bold text-[var(--text-lg)] text-foreground"
                style={{ lineHeight: '1.3' }}
              >
                {headerTitle}
              </span>
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-0 border-b border-border pointer-events-none"
            />
          </div>

          {/* Tabs */}
          <div className="relative h-[58px] shadow-[var(--elevation-sm)]">
            <div className="flex gap-[30px] items-end px-[20px] h-full">
              {/* PIN-code tab */}
              <button
                type="button"
                onClick={() => view !== 'change-pin' && switchTab('pin')}
                className={`
                  flex flex-col gap-[6px] h-[48px] items-center justify-end shrink-0
                  font-['Montserrat',sans-serif] font-semibold text-[var(--text-base)]
                  transition-colors cursor-pointer
                  ${
                    view === 'pin' || view === 'change-pin'
                      ? 'text-foreground'
                      : 'text-primary'
                  }
                `}
              >
                <span style={{ lineHeight: '1.75' }}>PIN-code</span>
                <div className="h-0 relative w-full">
                  <div
                    className={`absolute inset-[-3px_0_0_0] h-[3px] transition-colors ${
                      view === 'pin' || view === 'change-pin' ? 'bg-foreground' : 'bg-transparent'
                    }`}
                  />
                </div>
              </button>

              {/* Password tab */}
              <button
                type="button"
                onClick={() => switchTab('password')}
                className={`
                  flex flex-col gap-[6px] h-[48px] items-center justify-end shrink-0
                  font-['Montserrat',sans-serif] font-semibold text-[var(--text-base)]
                  transition-colors cursor-pointer
                  ${
                    view === 'password'
                      ? 'text-foreground'
                      : 'text-primary'
                  }
                `}
              >
                <span style={{ lineHeight: '1.75' }}>Password</span>
                <div className="h-0 relative w-full">
                  <div
                    className={`absolute inset-[-3px_0_0_0] h-[3px] transition-colors ${
                      view === 'password' ? 'bg-foreground' : 'bg-transparent'
                    }`}
                  />
                </div>
              </button>

              {/* Spacer tab */}
              <div className="flex h-[48px] items-end pb-[6px] shrink-0 flex-1" />
            </div>
          </div>
        </div>

        {/* ═══ BODY ═════════════════════════════════════════════════════════ */}
        <div className="flex flex-1 overflow-hidden z-[2]">
          {/* Left — Form fields */}
          <div className="flex-1 min-w-0 p-[20px] overflow-y-auto">
            <div className="bg-card relative rounded-[calc(var(--radius)+1px)] w-full">
              <div
                aria-hidden="true"
                className="absolute inset-0 border border-border rounded-[inherit] pointer-events-none"
              />
              <div className="flex flex-col gap-[10px] p-[20px]">
                {/* ── User dropdown ────────────────────────────────────── */}
                <div className="relative w-full" ref={dropdownRef}>
                  <FieldLabel>User</FieldLabel>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="
                      bg-input-background w-full h-[48px] relative rounded-[var(--radius)]
                      flex items-center gap-[10px] px-[14px] cursor-pointer
                    "
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 border border-border rounded-[var(--radius)] pointer-events-none"
                    />
                    <span
                      className={`
                        flex-1 text-left font-['Montserrat',sans-serif] font-normal text-[var(--text-sm)]
                        ${selectedUser ? 'text-foreground' : 'text-muted-foreground opacity-60'}
                      `}
                      style={{ lineHeight: '1.75' }}
                    >
                      {selectedUser || 'Select or search for user'}
                    </span>
                    <ChevronDownIcon
                      className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-[var(--radius)] shadow-lg z-50 max-h-[200px] overflow-y-auto">
                      {ALL_USERS.map((user) => (
                        <button
                          key={user}
                          type="button"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full px-[14px] py-[10px] text-left
                            font-['Montserrat',sans-serif] font-normal text-[var(--text-sm)]
                            text-foreground hover:bg-secondary/50 transition-colors cursor-pointer
                            ${selectedUser === user ? 'bg-secondary/30' : ''}
                          `}
                        >
                          {user}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ── PIN-code view fields ─────────────────────────────── */}
                {view === 'pin' && (
                  <>
                    <div className="w-full">
                      <FieldLabel>PIN-code</FieldLabel>
                      <div className="bg-input-background w-full h-[48px] relative rounded-[var(--radius)] flex items-center px-[14px]">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 border border-border rounded-[var(--radius)] pointer-events-none"
                        />
                        <input
                          ref={pinInputRef}
                          type="password"
                          value={pin}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setPin(val);
                          }}
                          placeholder="Søk på navn, prosjektnr eller adresse"
                          className="
                            w-full bg-transparent outline-none
                            font-['Montserrat',sans-serif] font-normal text-[var(--text-sm)] text-foreground
                            placeholder:text-muted-foreground placeholder:opacity-60
                          "
                          style={{ lineHeight: '1.75' }}
                        />
                      </div>
                    </div>

                    {/* Change PIN-code link */}
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={() => setView('change-pin')}
                        className="
                          h-[48px] px-[8px] py-[6px] rounded-[var(--radius)]
                          font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] text-primary
                          uppercase hover:bg-secondary/30 transition-colors cursor-pointer
                        "
                        style={{ lineHeight: '1.75' }}
                      >
                        Change pin-code
                      </button>
                    </div>
                  </>
                )}

                {/* ── Password view fields ─────────────────────────────── */}
                {view === 'password' && (
                  <div className="w-full">
                    <FieldLabel>Password</FieldLabel>
                    <div className="bg-input-background w-full h-[48px] relative rounded-[var(--radius)] flex items-center px-[14px]">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 border border-border rounded-[var(--radius)] pointer-events-none"
                      />
                      <input
                        ref={passwordInputRef}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter current password"
                        className="
                          w-full bg-transparent outline-none
                          font-['Montserrat',sans-serif] font-normal text-[var(--text-sm)] text-foreground
                          placeholder:text-muted-foreground placeholder:opacity-60
                        "
                        style={{ lineHeight: '1.75' }}
                      />
                    </div>
                  </div>
                )}

                {/* ── Change PIN view fields ───────────────────────────── */}
                {view === 'change-pin' && (
                  <>
                    <div className="w-full">
                      <FieldLabel>Password</FieldLabel>
                      <div className="bg-input-background w-full h-[48px] relative rounded-[var(--radius)] flex items-center px-[14px]">
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 border border-border rounded-[var(--radius)] pointer-events-none"
                        />
                        <input
                          type="password"
                          value={changePinPassword}
                          onChange={(e) => setChangePinPassword(e.target.value)}
                          placeholder="Enter current password"
                          className="
                            w-full bg-transparent outline-none
                            font-['Montserrat',sans-serif] font-normal text-[var(--text-sm)] text-foreground
                            placeholder:text-muted-foreground placeholder:opacity-60
                          "
                          style={{ lineHeight: '1.75' }}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <FieldLabel>PIN-code</FieldLabel>
                      <div
                        onClick={() => setChangePinFocus('new')}
                        className={`
                          bg-input-background w-full h-[48px] relative rounded-[var(--radius)] flex items-center px-[14px] cursor-text
                          ${changePinFocus === 'new' ? 'ring-2 ring-ring' : ''}
                        `}
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 border border-border rounded-[var(--radius)] pointer-events-none"
                        />
                        <input
                          type="password"
                          value={changePinNew}
                          onFocus={() => setChangePinFocus('new')}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setChangePinNew(val);
                          }}
                          placeholder="Enter new PIN-code"
                          className="
                            w-full bg-transparent outline-none
                            font-['Montserrat',sans-serif] font-normal text-[var(--text-sm)] text-foreground
                            placeholder:text-muted-foreground placeholder:opacity-60
                          "
                          style={{ lineHeight: '1.75' }}
                        />
                      </div>
                    </div>

                    <div className="w-full">
                      <FieldLabel>PIN-code again</FieldLabel>
                      <div
                        onClick={() => setChangePinFocus('confirm')}
                        className={`
                          bg-input-background w-full h-[48px] relative rounded-[var(--radius)] flex items-center px-[14px] cursor-text
                          ${changePinFocus === 'confirm' ? 'ring-2 ring-ring' : ''}
                        `}
                      >
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 border border-border rounded-[var(--radius)] pointer-events-none"
                        />
                        <input
                          type="password"
                          value={changePinConfirm}
                          onFocus={() => setChangePinFocus('confirm')}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setChangePinConfirm(val);
                          }}
                          placeholder="Enter new PIN-code again"
                          className="
                            w-full bg-transparent outline-none
                            font-['Montserrat',sans-serif] font-normal text-[var(--text-sm)] text-foreground
                            placeholder:text-muted-foreground placeholder:opacity-60
                          "
                          style={{ lineHeight: '1.75' }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right — Numpad panel (only for PIN views) */}
          <div
            className={`
              bg-background shrink-0 relative
              ${showNumpad ? 'w-[376px]' : 'w-[370px]'}
            `}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 border-l border-border pointer-events-none"
            />
            {showNumpad ? (
              <div className="flex flex-col gap-[20px] items-center overflow-y-auto p-[20px] h-full">
                <Numpad onKey={handleNumpadKey} />
              </div>
            ) : (
              /* Empty right panel for password view — matches Figma */
              <div className="p-[20px] h-full" />
            )}
          </div>
        </div>

        {/* ═══ FOOTER ═══════════════════════════════════════════════════════ */}
        <div className="bg-card relative shrink-0 z-[1]">
          <div
            aria-hidden="true"
            className="absolute inset-0 border-t border-border pointer-events-none shadow-[0px_-4px_4px_0px_rgba(0,0,0,0.03)]"
          />
          <div className="flex items-center gap-[20px] px-[20px] py-[15px]">
            {/* Confirm button — left-aligned per guidelines */}
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!isValid}
              className={`
                h-[48px] min-w-[100px] px-[20px] py-[6px] rounded-[var(--radius)] shrink-0
                flex items-center justify-center
                font-['Montserrat',sans-serif] font-semibold text-[var(--text-lg)]
                transition-colors cursor-pointer
                ${
                  isValid
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-secondary text-secondary-foreground opacity-60 cursor-not-allowed'
                }
              `}
              style={{ lineHeight: '1.75' }}
            >
              {confirmLabel}
            </button>

            {/* Cancel button */}
            <button
              type="button"
              onClick={onClose}
              className="
                bg-card relative h-[48px] min-w-[100px] px-[20px] py-[6px] rounded-[var(--radius)] shrink-0
                flex items-center justify-center
                font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] text-foreground
                hover:bg-secondary/50 transition-colors cursor-pointer
              "
              style={{ lineHeight: '1.75' }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 border border-border rounded-[var(--radius)] pointer-events-none"
              />
              Cancel
            </button>

            {/* Back to PIN link — only in change-pin view */}
            {view === 'change-pin' && (
              <button
                type="button"
                onClick={() => switchTab('pin')}
                className="
                  h-[48px] px-[8px] py-[6px] rounded-[var(--radius)]
                  flex items-center
                  font-['Montserrat',sans-serif] font-semibold text-[var(--text-sm)] text-primary
                  uppercase hover:bg-secondary/30 transition-colors cursor-pointer
                "
                style={{ lineHeight: '1.75' }}
              >
                Back to PIN login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Shared sub-components ──────────────────────────────────────────────── */

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="font-['Montserrat',sans-serif] font-bold text-[var(--text-base)] text-foreground mb-0"
      style={{ lineHeight: '1.75' }}
    >
      {children}
    </p>
  );
}

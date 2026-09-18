import React, { useState } from 'react';
import LogoFabriVersion from '../imports/login/LogoFabriVersion2';

const STORAGE_KEY = 'fabri-pos-prototype-auth-v2';
const VALID_EMAIL = 'hawkeye@eg.no';
// The email is the only real check. Any non-empty password is accepted so a
// colleague opening a shared link never gets stuck on a forgotten password.

function isAuthenticated(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

function setAuthenticated() {
  try {
    localStorage.setItem(STORAGE_KEY, 'true');
  } catch {}
}

export function PrototypeLoginGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(isAuthenticated);

  if (authed) return <>{children}</>;
  return <LoginScreen onSuccess={() => setAuthed(true)} />;
}

function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberLogin, setRememberLogin] = useState(false);

  const validate = () => {
    let ok = true;
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== VALID_EMAIL) {
      setEmailError('Unrecognised email');
      ok = false;
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Enter any password');
      ok = false;
    } else {
      setPasswordError('');
    }

    return ok;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setAuthenticated();
      onSuccess();
    }
  };

  const inputBorder = (error: string, focused: boolean) =>
    error
      ? '1.5px solid var(--destructive)'
      : focused
        ? '1.5px solid var(--ring)'
        : '1.5px solid var(--border)';

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      <div className="w-full max-w-[360px] mx-4 bg-card rounded-[var(--radius-card)] overflow-hidden shadow-[var(--elevation-sm)]">

        {/* Header: logo + title */}
        <div className="flex flex-col items-center gap-[16px] pt-[40px] pb-[20px] px-[20px]">
          <div className="h-[64px] w-[226px]" role="img" aria-label="EG Fabri">
            <LogoFabriVersion />
          </div>
          <p
            className="text-[length:var(--text-xl)] font-[var(--font-weight-semibold)] leading-[1.2] text-foreground whitespace-nowrap"
          >
            Welcome to EG Fabri POS
          </p>
        </div>

        {/* Form */}
        <div className="px-[20px] pb-[32px]">
          <form onSubmit={handleSubmit} noValidate>
            {/* Fields */}
            <div className="flex flex-col gap-[20px]">

              {/* Email */}
              <div className="flex flex-col gap-[4px]">
                <label
                  htmlFor="gate-email"
                  className="text-[length:var(--text-base)] font-[var(--font-weight-bold)] leading-[1.2] text-foreground"
                >
                  EG Email
                </label>
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-[var(--radius-input)] pointer-events-none"
                    style={{ border: inputBorder(emailError, emailFocused) }}
                  />
                  <input
                    id="gate-email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    placeholder="name@eg.no"
                    className="w-full h-[46px] px-[14px] bg-transparent rounded-[var(--radius-input)] outline-none text-[length:var(--text-sm)] text-foreground"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>
                {emailError && (
                  <p className="text-[length:var(--text-sm)] text-destructive">{emailError}</p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-[4px]">
                <label
                  htmlFor="gate-password"
                  className="text-[length:var(--text-base)] font-[var(--font-weight-bold)] leading-[1.2] text-foreground"
                >
                  Prototype password
                </label>
                <div className="relative">
                  <div
                    className="absolute inset-0 rounded-[var(--radius-input)] pointer-events-none"
                    style={{ border: inputBorder(passwordError, passwordFocused) }}
                  />
                  <input
                    id="gate-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPasswordError(''); }}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="Enter password"
                    className="w-full h-[46px] pl-[14px] pr-[46px] bg-transparent rounded-[var(--radius-input)] outline-none text-[length:var(--text-sm)] text-foreground"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-0 top-0 flex items-center justify-center size-[46px]"
                    style={{ color: 'var(--muted-foreground)' }}
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-[length:var(--text-sm)] text-destructive">{passwordError}</p>
                )}
              </div>
            </div>

            {/* Remember login + forgot password row */}
            <div className="flex items-center justify-between mt-[21px]">
              <label className="flex items-center gap-[8px] py-[8px] cursor-pointer select-none">
                <div
                  className="flex items-center justify-center w-[18px] h-[18px] rounded-[var(--radius-sm)] border shrink-0"
                  style={{
                    borderColor: rememberLogin ? 'var(--primary)' : 'var(--border)',
                    background: rememberLogin ? 'var(--primary)' : 'transparent',
                  }}
                  onClick={() => setRememberLogin((v) => !v)}
                >
                  {rememberLogin && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="var(--primary-foreground)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[length:var(--text-sm)] font-[var(--font-weight-normal)] leading-[1.4] text-foreground whitespace-nowrap">
                  Remember login
                </span>
              </label>
              <button
                type="button"
                className="text-[length:var(--text-sm)] font-[var(--font-weight-semibold)] text-primary whitespace-nowrap"
                tabIndex={-1}
              >
                Forgot password
              </button>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-[16px] mt-[60px]">
              <button
                type="submit"
                className="w-full h-[50px] rounded-[var(--radius-button)] bg-primary text-primary-foreground text-[length:var(--text-base)] font-[var(--font-weight-semibold)] leading-[1.2] transition-opacity hover:opacity-90 active:opacity-80"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Access prototype
              </button>
            </div>
          </form>

          <p className="text-center mt-6 text-[length:var(--text-xs)] text-muted-foreground">
            Only for EG employees · Not a real login
          </p>
        </div>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

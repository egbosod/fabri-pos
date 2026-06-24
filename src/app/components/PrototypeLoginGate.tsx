import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'fabri-pos-prototype-auth-v2';
const VALID_EMAIL = 'hawkeye@eg.no';
const VALID_PASSWORD = 'fabri2840';

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

  const validate = () => {
    let ok = true;
    if (email.trim().toLowerCase() !== VALID_EMAIL) {
      setEmailError('Unrecognised email');
      ok = false;
    } else {
      setEmailError('');
    }

    if (password !== VALID_PASSWORD) {
      setPasswordError('Incorrect password');
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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #f8f9fb 0%, #eef2f7 100%)',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div
        className="w-full max-w-[420px] mx-4 bg-white rounded-2xl shadow-xl overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.10), 0 4px 16px rgba(0,0,0,0.06)' }}
      >
        {/* Header stripe */}
        <div
          className="h-1.5 w-full"
          style={{ background: 'linear-gradient(90deg, #0d97fc 0%, #38b6ff 100%)' }}
        />

        <div className="px-10 pt-10 pb-10">
          {/* Logo / title */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ background: '#0d97fc' }}
              >
                F
              </div>
              <span className="font-semibold text-lg" style={{ color: '#090914' }}>
                Fabri POS
              </span>
            </div>
            <p className="text-sm mt-4 font-medium" style={{ color: '#42424a' }}>
              Prototype access
            </p>
            <p className="text-xs mt-1" style={{ color: '#717182' }}>
              Sign in with your EG email to view the prototype.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email field */}
            <div className="mb-4">
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: '#42424a' }}
                htmlFor="gate-email"
              >
                EG Email
              </label>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    border: emailError
                      ? '1.5px solid #d4183d'
                      : emailFocused
                      ? '1.5px solid #0d97fc'
                      : '1.5px solid #d5d5d7',
                  }}
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
                  className="w-full h-11 px-3.5 bg-transparent rounded-lg outline-none text-sm"
                  style={{ color: '#090914', fontFamily: "'Montserrat', sans-serif" }}
                />
              </div>
              {emailError && (
                <p className="mt-1.5 text-xs" style={{ color: '#d4183d' }}>{emailError}</p>
              )}
            </div>

            {/* Password field */}
            <div className="mb-6">
              <label
                className="block text-xs font-semibold mb-1.5"
                style={{ color: '#42424a' }}
                htmlFor="gate-password"
              >
                Prototype password
              </label>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none"
                  style={{
                    border: passwordError
                      ? '1.5px solid #d4183d'
                      : passwordFocused
                      ? '1.5px solid #0d97fc'
                      : '1.5px solid #d5d5d7',
                  }}
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
                  className="w-full h-11 pl-3.5 pr-10 bg-transparent rounded-lg outline-none text-sm"
                  style={{ color: '#090914', fontFamily: "'Montserrat', sans-serif" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5"
                  style={{ color: '#717182' }}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {passwordError && (
                <p className="mt-1.5 text-xs" style={{ color: '#d4183d' }}>{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 active:opacity-80"
              style={{ background: '#0d97fc', fontFamily: "'Montserrat', sans-serif" }}
            >
              Access prototype
            </button>
          </form>

          <p className="text-center mt-6 text-xs" style={{ color: '#a0a0b0' }}>
            Only for EG employees · Not a real login
          </p>
        </div>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

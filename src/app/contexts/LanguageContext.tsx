import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations } from '../locales';
import type { Translations } from '../locales';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Language = keyof typeof translations; // 'no' | 'da' | 'sv' | 'en'

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  /**
   * Translate a key to the current language string.
   * Falls back to English, then to the raw key if still missing.
   */
  t: (key: keyof Translations) => string;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('no');

  const t = (key: keyof Translations): string => {
    // Primary: current language
    const primary = translations[language]?.[key];
    if (primary) return primary;

    // Fallback: English
    const fallback = translations.en?.[key];
    if (fallback) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[i18n] Missing key "${key}" for language "${language}", falling back to English.`);
      }
      return fallback;
    }

    // Last resort: return the key itself so the UI never shows blank
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[i18n] Missing key "${key}" in all languages.`);
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // During hot reload the context may be momentarily undefined; provide a
    // safe no-op fallback so the app doesn't hard-crash in development.
    if (process.env.NODE_ENV === 'development') {
      console.warn('useLanguage: context unavailable, likely a hot-reload hiccup. Using fallback.');
      return {
        language: 'no',
        setLanguage: () => {},
        t: (key) => (translations.no[key] ?? translations.en[key] ?? key),
      };
    }
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

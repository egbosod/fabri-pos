/**
 * Central export for all translations.
 *
 * To add a new language:
 *   1. Create `/locales/xx.ts` implementing the `Translations` interface.
 *   2. Import it here and add it to the `translations` map.
 *   3. Add the language code to the `Language` union type in LanguageContext.
 *
 * To add a new translation key:
 *   1. Add the key (and its type) to `Translations` in `/locales/types.ts`.
 *   2. TypeScript will immediately flag any language file that is missing the key.
 */

export type { Translations } from './types';

import no from './no';
import da from './da';
import sv from './sv';
import en from './en';

export const translations = { no, da, sv, en } as const;

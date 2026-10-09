// Single source of truth for mapping SettingsContext state <-> shareable URL query params.
// Keeping the mapping in one spec array (SHARED_SETTINGS) means readSettingsFromURL and
// buildShareURL can never drift out of sync with each other.

export type SwitchUserFlow = 'A' | 'B' | 'C';
// Where the Hovedordre trigger lives. Independent of SwitchUserFlow.
//   A = action bar only   B = sidebar, shown disabled up front   C = sidebar, only once a customer exists
export type HovedordrePlacement = 'A' | 'B' | 'C';
// How a customer is fetched from an external ERP source in the select-customer modal.
//   A = toggle inside the search results, fetch happens automatically
//   B = toggle in the modal header, plus an explicit "Get customer" button
export type CustomerSearchConcept = 'A' | 'B';
// Whether/how the price-check customer/project can be swapped once the basket has items.
//   A = no lock, swap freely (the "Add to Cart" mismatch modal is the only warning)
//   B = locked; the block modal adds a "Legg til varer i salg" shortcut next to "Lukk"
//   C = locked; same block modal as B without the shortcut, just relabeled "Lukk"
export type PriceCheckLockConcept = 'A' | 'B' | 'C';
export type ErpScenario = 'Nexstep' | 'Trygg2000' | 'Aspect4' | 'Aspect4 DK' | 'AX' | 'IFS';
export const ERP_SCENARIOS: ErpScenario[] = ['Nexstep', 'Trygg2000', 'Aspect4', 'Aspect4 DK', 'AX', 'IFS'];

export interface SharedSettings {
  switchUserFlow: SwitchUserFlow;
  erpScenario: ErpScenario;
  hovedordrePlacement: HovedordrePlacement;
  customerSearchConcept: CustomerSearchConcept;
  priceCheckLockConcept: PriceCheckLockConcept;
  showFlowIndicator: boolean;
  showDebugBanner: boolean;
  allowCreateProject: boolean;
  allowCreateContactPerson: boolean;
  showPasswordOption: boolean;
  scanCustomerCard: boolean;
  twoFactorEnabled: boolean;
  showLoginButton: boolean;
  showTwoFactorButton: boolean;
  showForgotPassword: boolean;
}

export const DEFAULT_SETTINGS: SharedSettings = {
  switchUserFlow: 'C',
  erpScenario: 'Aspect4 DK',
  hovedordrePlacement: 'B',
  customerSearchConcept: 'A',
  priceCheckLockConcept: 'A',
  showFlowIndicator: true,
  showDebugBanner: false,
  allowCreateProject: false,
  allowCreateContactPerson: false,
  showPasswordOption: false,
  scanCustomerCard: true,
  twoFactorEnabled: true,
  showLoginButton: true,
  showTwoFactorButton: false,
  showForgotPassword: true,
};

function parseBoolean(raw: string): boolean | undefined {
  const v = raw.toLowerCase();
  if (v === '1' || v === 'true' || v === 'yes') return true;
  if (v === '0' || v === 'false' || v === 'no') return false;
  return undefined;
}

function serializeBoolean(value: boolean): string {
  return value ? '1' : '0';
}

function makeEnumParser<T extends string>(allowed: readonly T[]) {
  return (raw: string): T | undefined => {
    const match = allowed.find(a => a.toLowerCase() === raw.toLowerCase());
    return match;
  };
}

interface SettingSpec<K extends keyof SharedSettings> {
  key: K;
  param: string;
  parse(raw: string): SharedSettings[K] | undefined;
  serialize(value: SharedSettings[K]): string;
}

type AnySettingSpec = { [K in keyof SharedSettings]: SettingSpec<K> }[keyof SharedSettings];

// Order matches the SharedSettings field order in the plan.
const SHARED_SETTINGS: AnySettingSpec[] = [
  {
    key: 'switchUserFlow',
    param: 'flow',
    parse: makeEnumParser<SwitchUserFlow>(['A', 'B', 'C']),
    serialize: v => v,
  },
  {
    key: 'erpScenario',
    param: 'erp',
    parse: makeEnumParser<ErpScenario>(ERP_SCENARIOS),
    serialize: v => v,
  },
  {
    key: 'hovedordrePlacement',
    param: 'hovedordre',
    parse: makeEnumParser<HovedordrePlacement>(['A', 'B', 'C']),
    serialize: v => v,
  },
  {
    key: 'customerSearchConcept',
    param: 'kundesok',
    parse: makeEnumParser<CustomerSearchConcept>(['A', 'B']),
    serialize: v => v,
  },
  {
    key: 'priceCheckLockConcept',
    param: 'pclock',
    parse: makeEnumParser<PriceCheckLockConcept>(['A', 'B', 'C']),
    serialize: v => v,
  },
  {
    key: 'showFlowIndicator',
    param: 'flowindicator',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
  {
    key: 'showDebugBanner',
    param: 'debug',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
  {
    key: 'allowCreateProject',
    param: 'nyttprosjekt',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
  {
    key: 'allowCreateContactPerson',
    param: 'nykontakt',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
  {
    key: 'showPasswordOption',
    param: 'passord',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
  {
    key: 'scanCustomerCard',
    param: 'scan',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
  {
    key: 'twoFactorEnabled',
    param: '2fa',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
  {
    key: 'showLoginButton',
    param: 'loginbtn',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
  {
    key: 'showTwoFactorButton',
    param: '2fabtn',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
  {
    key: 'showForgotPassword',
    param: 'glemtpassord',
    parse: parseBoolean,
    serialize: serializeBoolean,
  },
];

/**
 * Parse settings out of a location.search string. Unknown params and invalid
 * values are silently ignored (never throws) so a stale/hand-edited link
 * degrades gracefully to defaults for the affected fields.
 */
export function readSettingsFromURL(search: string): Partial<SharedSettings> {
  const params = new URLSearchParams(search);
  const result: Partial<SharedSettings> = {};

  for (const spec of SHARED_SETTINGS) {
    const raw = params.get(spec.param);
    if (raw === null) continue;
    try {
      const value = spec.parse(raw);
      if (value !== undefined) {
        (result as Record<string, unknown>)[spec.key] = value;
      }
    } catch {
      // Ignore malformed values — never throw from a URL parse.
    }
  }

  return result;
}

/**
 * Build an absolute, shareable URL that reproduces the given settings.
 * Only non-default values are emitted. Preserves the current pathname and
 * any existing non-settings query params (e.g. modal, kunde, prosjekt, sok).
 */
export function buildShareURL(settings: SharedSettings, loc: Location = window.location): string {
  const params = new URLSearchParams(loc.search);
  const settingsParamNames = new Set(SHARED_SETTINGS.map(s => s.param));

  // Strip any existing settings params so we can re-add only what's non-default.
  for (const name of settingsParamNames) {
    params.delete(name);
  }

  for (const spec of SHARED_SETTINGS) {
    const value = settings[spec.key];
    if (value !== DEFAULT_SETTINGS[spec.key]) {
      params.set(spec.param, spec.serialize(value as never));
    }
  }

  const query = params.toString();
  return `${loc.origin}${loc.pathname}${query ? `?${query}` : ''}`;
}

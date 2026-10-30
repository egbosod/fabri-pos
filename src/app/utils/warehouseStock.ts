// Mock warehouse (Lager) balances for Trygg2000. Single source for the product search result
// (tags, column and the Inventory total) and the item details drawer ("På lager"), so the
// quantities can never drift apart. The product search result is the base: Inventory is the
// first (primary) warehouse quantity, and that is also the first "På lager" row in the drawer.
//
// Hand-set rows below (Glava); the rest is generated deterministically from the SKU in
// registerWarehouseStock. About 20% of each search result is in minus:
//   "glava" 4 of 20, "vindu" 5 of 25, "spiker" 4 of 20, everything else every 5th product.
export interface WarehouseQty {
  lager: number;
  qty: number;
}

export const MOCK_LAGER: Record<string, WarehouseQty[]> = {
  '20334455': [{ lager: 10, qty: 11 }],
  '20334458': [{ lager: 10, qty: 8 }, { lager: 20, qty: 24 }],
  '20334463': [{ lager: 10, qty: 42 }],
  '20334464': [{ lager: 10, qty: -12 }],
  '20334465': [{ lager: 20, qty: 7 }, { lager: 30, qty: 0 }],
  '20334466': [{ lager: 10, qty: 15 }, { lager: 30, qty: 18 }],
  '20334467': [{ lager: 10, qty: 26 }, { lager: 20, qty: 9 }],
  '20334468': [{ lager: 10, qty: -8 }],
  '20334469': [{ lager: 20, qty: 31 }],
  '20334470': [{ lager: 30, qty: 14 }],
  '20334471': [{ lager: 10, qty: -9 }, { lager: 20, qty: 3 }],
  '20334472': [{ lager: 20, qty: 22 }],
  '20334473': [{ lager: 10, qty: -2 }],
  '20334474': [{ lager: 30, qty: 19 }],
};

// Rows set by hand above; registerWarehouseStock keeps them as the first rows and pads the rest.
const HAND_SET = new Set(Object.keys(MOCK_LAGER));

/** Sample warehouse names, in the style of the real list: Utsalgssted XX, Lager (shop) (city), Eksternt lager. */
export const WAREHOUSE_NAMES: Record<number, string> = {
  10: 'Utsalgssted 10',
  20: 'Lager EG Gjøvik',
  30: 'Utsalgssted 30',
  40: 'Lager Byggmakker Hamar',
  50: 'Eksternt lager',
  22: 'Utsalgssted 22',
  23: 'Utsalgssted 23',
  24: 'Utsalgssted 24',
  51: 'Utsalgssted 51',
  60: 'Utsalgssted 60',
  65: 'Utsalgssted 65',
  70: 'Utsalgssted 70',
  75: 'Utsalgssted 75',
  80: 'Utsalgssted 80',
  90: 'Utsalgssted 90',
  95: 'Utsalgssted 95',
  212: 'Utsalgssted 212',
  100: 'Lager EG Lillehammer',
  110: 'Lager Byggmakker Elverum',
  120: 'RDS Lager',
};

export const warehouseName = (lager: number): string => WAREHOUSE_NAMES[lager] ?? `Lager ${lager}`;

export const getWarehouseStock = (sku: string): WarehouseQty[] | undefined => MOCK_LAGER[sku];

/**
 * Mock shelf number for a product at a location (Proto B shows it in the Location column instead of
 * the warehouse name): aisle letter, bay and shelf level, e.g. "C-14-3". Stable per product + location.
 */
export const shelfNumber = (sku: string, lager: number): string => {
  const h = hash(`${sku}:${lager}`);
  return `${String.fromCharCode(65 + (h % 8))}-${String(1 + ((h >>> 3) % 24)).padStart(2, '0')}-${1 + ((h >>> 8) % 5)}`;
};

/** Inventory shown in the product search result: the first (primary) warehouse quantity. */
export const primaryStock = (rows: WarehouseQty[]): number => rows[0]?.qty ?? 0;

const hash = (s: string): number => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
};

const WAREHOUSE_IDS = Object.keys(WAREHOUSE_NAMES).map(Number);

// Every product has 3 to 15 locations. The first row is the primary one (Inventory, minus decided
// there); the others are mostly 0 or small balances, never negative.
const MIN_LOCATIONS = 3;
const MAX_LOCATIONS = 15;
const STRIDE = 7; // coprime with the 20 warehouses, so a product never gets the same one twice

const locationCount = (sku: string): number => MIN_LOCATIONS + (hash(sku) % (MAX_LOCATIONS - MIN_LOCATIONS + 1));

const fillerQty = (h: number, i: number): number => {
  const v = (h >>> (i % 20)) % 100;
  return v < 55 ? 0 : 1 + (v % 40);
};

/** Pads (hand-set) or builds (generated) rows up to the product's location count. */
const buildRows = (sku: string, first: WarehouseQty[], minus: boolean, nonStock: boolean): WarehouseQty[] => {
  const h = hash(sku);
  const count = locationCount(sku);
  const rows: WarehouseQty[] = [...first];
  let k = h % WAREHOUSE_IDS.length;
  const used = new Set(rows.map(r => r.lager));
  while (rows.length < count) {
    const lager = WAREHOUSE_IDS[k % WAREHOUSE_IDS.length];
    k += STRIDE;
    if (used.has(lager)) continue;
    used.add(lager);
    const i = rows.length;
    const qty = nonStock ? 0 : i === 0 ? (minus ? -(1 + (h % 14)) : 2 + ((h >>> 1) % 58)) : fillerQty(h, i);
    rows.push({ lager, qty });
  }
  return rows;
};

const WINDOW_MINUS = [1, 5, 9, 14, 19]; // positions among the in-stock windows (5 of 25 incl. special order)
const NAIL_MINUS = [1, 5, 10, 15]; // positions among the in-stock nails (4 of 20)

/**
 * Fills MOCK_LAGER for every searchable product that has no hand-set rows. Called once with the
 * product list by the product search, so the drawer (which only knows the SKU) finds the same data.
 * Special-order (non-stock) products get 3 to 15 locations, all 0, matching "Not in stock".
 * Hand-set products keep their rows as the first ones and are padded up to the same range.
 */
export function registerWarehouseStock(items: { varenr: string; varetekst: string; isNonStock: boolean }[]): void {
  let windows = 0, nails = 0, others = 0;
  items.forEach(({ varenr, varetekst, isNonStock }) => {
    if (HAND_SET.has(varenr)) { MOCK_LAGER[varenr] = buildRows(varenr, MOCK_LAGER[varenr], false, false); return; }
    if (isNonStock) { MOCK_LAGER[varenr] = buildRows(varenr, [], false, true); return; }
    let minus: boolean;
    if (/glava|isolasjon|steinull|vindsperre|dampsperre/i.test(varetekst)) minus = false; // keeps "glava" at 4 of 20
    else if (/vindu/i.test(varetekst)) minus = WINDOW_MINUS.includes(windows++);
    else if (/spiker/i.test(varetekst)) minus = NAIL_MINUS.includes(nails++);
    else minus = others++ % 5 === 2;
    MOCK_LAGER[varenr] = buildRows(varenr, [], minus, false);
  });
}

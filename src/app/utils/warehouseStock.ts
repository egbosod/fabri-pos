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

// Rows set by hand above; registerWarehouseStock leaves these alone.
const HAND_SET = new Set(Object.keys(MOCK_LAGER));

/** Sample warehouse names, in the style of the real list: Utsalgssted XX, Lager (shop) (city), Eksternt lager. */
export const WAREHOUSE_NAMES: Record<number, string> = {
  10: 'Utsalgssted 10',
  20: 'Lager EG Gjøvik',
  30: 'Utsalgssted 30',
  40: 'Lager Byggmakker Hamar',
  50: 'Eksternt lager',
};

export const warehouseName = (lager: number): string => WAREHOUSE_NAMES[lager] ?? `Lager ${lager}`;

export const getWarehouseStock = (sku: string): WarehouseQty[] | undefined => MOCK_LAGER[sku];

/** Inventory shown in the product search result: the first (primary) warehouse quantity. */
export const primaryStock = (rows: WarehouseQty[]): number => rows[0]?.qty ?? 0;

const hash = (s: string): number => {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
};

const WAREHOUSE_IDS = Object.keys(WAREHOUSE_NAMES).map(Number);

const generateRows = (sku: string, minus: boolean): WarehouseQty[] => {
  const h = hash(sku);
  const count = 1 + (h % 3);
  const start = h % WAREHOUSE_IDS.length;
  return Array.from({ length: count }, (_, i) => ({
    // Step 2 through 5 ids, so a product never gets the same warehouse twice.
    lager: WAREHOUSE_IDS[(start + i * 2) % WAREHOUSE_IDS.length],
    qty: i === 0 && minus ? -(1 + (h % 14)) : 2 + ((h >>> (i * 3 + 1)) % 58),
  }));
};

const WINDOW_MINUS = [1, 5, 9, 14, 19]; // positions among the in-stock windows (5 of 25 incl. special order)
const NAIL_MINUS = [1, 5, 10, 15]; // positions among the in-stock nails (4 of 20)

/**
 * Fills MOCK_LAGER for every searchable product that has no hand-set rows. Called once with the
 * product list by the product search, so the drawer (which only knows the SKU) finds the same data.
 * Special-order (non-stock) products get one warehouse with 0, matching "Not in stock".
 */
export function registerWarehouseStock(items: { varenr: string; varetekst: string; isNonStock: boolean }[]): void {
  let windows = 0, nails = 0, others = 0;
  items.forEach(({ varenr, varetekst, isNonStock }) => {
    if (HAND_SET.has(varenr)) return;
    if (isNonStock) { MOCK_LAGER[varenr] = [{ lager: 10, qty: 0 }]; return; }
    let minus: boolean;
    if (/glava|isolasjon|steinull|vindsperre|dampsperre/i.test(varetekst)) minus = false; // keeps "glava" at 4 of 20
    else if (/vindu/i.test(varetekst)) minus = WINDOW_MINUS.includes(windows++);
    else if (/spiker/i.test(varetekst)) minus = NAIL_MINUS.includes(nails++);
    else minus = others++ % 5 === 2;
    MOCK_LAGER[varenr] = generateRows(varenr, minus);
  });
}

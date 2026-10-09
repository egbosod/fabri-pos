/**
 * Whole-krone amount formatting, space-grouped (e.g. "12 500").
 *
 * Shared so the credit figures stay identical wherever they appear — the VIP
 * credit panel in CustomerSelectionModal and the mid-sale credit-exceeded
 * modal show the same limit and must not format it two different ways.
 */
export const formatAmount = (n: number) =>
  n.toLocaleString('no-NO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/,/g, ' ');

import type { CSSProperties } from 'react';

// Shared column widths for cart table to ensure consistent alignment
// across all order item types and states

export const CART_COLUMNS = {
  // Column widths (includes padding)
  VARENAVN: 310,
  ANTALL: 85,
  PER_ENHET: 82,
  // Wide enough for the English "Discount" header (54.9px of text + 2 x 10px
  // padding); it was 54, which only fit the Norwegian "Rabatt".
  RABATT: 76,
  TOTALT: 79,
  
  // Padding for each column
  PADDING: 10,
} as const;

// Total width of all columns
export const CART_TOTAL_WIDTH = 
  CART_COLUMNS.VARENAVN + 
  CART_COLUMNS.ANTALL + 
  CART_COLUMNS.PER_ENHET + 
  CART_COLUMNS.RABATT + 
  CART_COLUMNS.TOTALT;

// Width for left section in collapsed groups (Varenavn + Antall + Per enhet + Rabatt)
export const CART_LEFT_SECTION_WIDTH = 
  CART_COLUMNS.VARENAVN + 
  CART_COLUMNS.ANTALL + 
  CART_COLUMNS.PER_ENHET + 
  CART_COLUMNS.RABATT;

// The cart is laid out as: a flexible Item name column, the fixed numeric block
// (Antall, Per enhet, Rabatt, Totalt) and a fixed trailing slot. The numbers sit
// against the right edge, so they stay close together however wide the cart is,
// and the trailing slot holds the line count and expand chevron of grouped orders.

// Item name takes whatever the numeric block and trailing slot leave over.
export const NAME_COLUMN_STYLE: CSSProperties = {
  flex: '1 1 0%',
  minWidth: `${CART_COLUMNS.VARENAVN}px`,
};

// Right padding of the trailing slot. The cart's column header uses the same
// value, so its line count and every group's chevron end on the same edge.
export const CART_TRAILING_PADDING = 20;

// Width of the trailing slot to the right of the Totalt column.
export const CART_TRAILING_WIDTH = 180;

// Antall + Per enhet + Rabatt: the stretch between the name and the Totalt column.
export const CART_PRE_TOTAL_WIDTH =
  CART_COLUMNS.ANTALL +
  CART_COLUMNS.PER_ENHET +
  CART_COLUMNS.RABATT;

// First cell of a grouped order's header (source or order number); the second
// cell (order number or customer) takes the rest of the name column.
export const GROUP_HEADER_FIRST_CELL_WIDTH = 220;

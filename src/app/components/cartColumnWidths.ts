// Shared column widths for cart table to ensure consistent alignment
// across all order item types and states

export const CART_COLUMNS = {
  // Column widths (includes padding)
  VARENAVN: 310,
  ANTALL: 85,
  PER_ENHET: 82,
  RABATT: 54,
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

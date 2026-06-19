// Pricing utilities for Norwegian POS system

export interface PricingRule {
  type: 'customer' | 'project' | 'quantity' | 'item';
  discountPercent: number;
  condition?: {
    minQuantity?: number;
    customerType?: 'Proff' | 'Privat';
  };
}

export interface ItemMetadata {
  isDiscontinued?: boolean;
  isDangerousGoods?: boolean;
  isFragile?: boolean;
  isHeavy?: boolean;
  customerSpecificPrice?: {
    customerType: 'Proff' | 'Privat';
    price: number;
  }[];
  quantityDiscounts?: {
    minQuantity: number;
    discountPercent: number;
  }[];
}

export interface Customer {
  type: 'Proff' | 'Privat';
  discount?: number;
}

export interface Project {
  discount?: number;
}

/**
 * Calculate smart price based on customer, project, quantity and item metadata
 */
export function calculateSmartPrice(
  basePrice: number,
  quantity: number,
  customer?: Customer,
  project?: Project,
  itemMetadata?: ItemMetadata
): {
  price: number;
  discount: number;
  appliedRules: string[];
} {
  let finalPrice = basePrice;
  let totalDiscount = 0;
  const appliedRules: string[] = [];

  // 1. Check for customer-specific pricing
  if (customer && itemMetadata?.customerSpecificPrice) {
    const customerPrice = itemMetadata.customerSpecificPrice.find(
      cp => cp.customerType === customer.type
    );
    if (customerPrice) {
      finalPrice = customerPrice.price;
      appliedRules.push(`${customer.type} pricing`);
    }
  }

  // 2. Apply quantity discounts
  if (itemMetadata?.quantityDiscounts) {
    const applicableDiscount = itemMetadata.quantityDiscounts
      .filter(qd => quantity >= qd.minQuantity)
      .sort((a, b) => b.discountPercent - a.discountPercent)[0];
    
    if (applicableDiscount) {
      totalDiscount += applicableDiscount.discountPercent;
      appliedRules.push(`Quantity discount (${quantity} units)`);
    }
  }

  // 3. Apply customer discount
  if (customer?.discount) {
    totalDiscount += customer.discount;
    appliedRules.push(`Customer discount (${customer.discount}%)`);
  }

  // 4. Apply project discount
  if (project?.discount) {
    totalDiscount += project.discount;
    appliedRules.push(`Project discount (${project.discount}%)`);
  }

  // Cap total discount at 100%
  totalDiscount = Math.min(100, totalDiscount);

  return {
    price: finalPrice,
    discount: totalDiscount,
    appliedRules
  };
}

/**
 * Get item labels based on metadata
 */
export function getItemLabels(itemMetadata?: ItemMetadata): Array<{
  text: string;
  color: string;
  bgColor: string;
}> {
  const labels: Array<{ text: string; color: string; bgColor: string }> = [];

  if (itemMetadata?.isDiscontinued) {
    labels.push({
      text: 'Utgått',
      color: '#090914',
      bgColor: '#FFE5E5'
    });
  }

  if (itemMetadata?.isDangerousGoods) {
    labels.push({
      text: 'Farlig gods',
      color: '#ffffff',
      bgColor: '#F24C35'
    });
  }

  if (itemMetadata?.isFragile) {
    labels.push({
      text: 'Skjørt',
      color: '#090914',
      bgColor: '#FFF4E5'
    });
  }

  if (itemMetadata?.isHeavy) {
    labels.push({
      text: 'Tungt',
      color: '#090914',
      bgColor: '#E5F4FF'
    });
  }

  return labels;
}

/**
 * Parse price string from inventory format "29,50 kr / STK"
 */
export function parsePriceString(priceString: string): {
  price: number;
  unit: string;
} {
  const priceMatch = priceString.match(/([\d,]+)/);
  const price = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : 0;
  
  const unitMatch = priceString.match(/\/\s*(\w+)/);
  const unit = unitMatch ? unitMatch[1] : 'STK';
  
  return { price, unit };
}

/**
 * Generate mock item metadata for demo purposes
 * In production, this would come from the inventory database
 */
export function getMockItemMetadata(itemCode: string): ItemMetadata {
  // Simulate different item types based on item code
  const metadata: ItemMetadata = {};
  
  // Ensure itemCode is a string
  const code = itemCode || '';

  // Some items are discontinued
  if (code.includes('001') || code.includes('999')) {
    metadata.isDiscontinued = true;
  }

  // Some items are dangerous goods
  if (code.includes('CHEM') || code.includes('FLAM')) {
    metadata.isDangerousGoods = true;
  }

  // Some items are fragile
  if (code.includes('GLASS') || code.includes('FRAG')) {
    metadata.isFragile = true;
  }

  // Some items are heavy
  if (code.includes('HEAVY') || code.includes('BULK')) {
    metadata.isHeavy = true;
  }

  // Professional customers get better prices on some items
  if (code.includes('PRO')) {
    metadata.customerSpecificPrice = [
      { customerType: 'Proff', price: 25.00 },
      { customerType: 'Privat', price: 29.50 }
    ];
  }

  // Quantity discounts on bulk items
  if (code.includes('BULK') || code.includes('PAK')) {
    metadata.quantityDiscounts = [
      { minQuantity: 10, discountPercent: 5 },
      { minQuantity: 50, discountPercent: 10 },
      { minQuantity: 100, discountPercent: 15 }
    ];
  }

  return metadata;
}
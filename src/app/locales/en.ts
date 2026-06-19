import type { Translations } from './types';

/**
 * English (en)
 */
const en: Translations = {
  // ── Menu ──────────────────────────────────────────────────────────────────
  menu: 'MENU',
  newSale: 'New sale',
  previousPurchases: 'Previous purchases',
  cashSettlement: 'Cash settlement',

  // ── Main menu options ──────────────────────────────────────────────────────
  giftCard: 'Gift card',
  bankTerminal: 'Bank terminal',
  exchangeSlip: 'Exchange slip',
  priceCheck: 'Price check',
  fetchFromHandTerminal: 'Fetch from hand terminal',
  fetchOrder: 'Fetch order',
  parkSale: 'Park sale',

  // ── Profile menu ───────────────────────────────────────────────────────────
  switchUser: 'SWITCH USER',
  yourRole: 'YOUR ROLE',
  sales: 'Sales',
  purchaseManager: 'Purchase manager',
  language: 'LANGUAGE',
  norwegian: 'Norwegian',
  danish: 'Danish',
  swedish: 'Swedish',
  english: 'English',
  logOut: 'Log out',
  password: 'Password',
  logIn: 'Log in',
  cancel: 'Cancel',
  incorrectPassword: 'Incorrect password',
  editPin: 'Edit PIN',
  editPassword: 'Edit password',
  lockUser: 'Lock POS',

  // ── Customer / Project ─────────────────────────────────────────────────────
  customer: 'Customer',
  project: 'Project',
  selectCustomer: 'Select customer',
  selectProject: 'Select project',
  searchPlaceholder: 'Search by mobile no, name or customer no',
  projectSearchPlaceholder: 'Search by project no, name or address',
  noCustomerSelected: 'No customer selected',
  noProjectSelected: 'No project selected',

  // ── Cart / Order ───────────────────────────────────────────────────────────
  quantity: 'Quantity',
  perUnit: 'Per unit',
  discount: 'Discount',
  sum: 'Sum',
  total: 'Total',
  vat: 'VAT',
  toPay: 'To pay',
  items: 'items',
  itemName: 'Item name',
  orderLines: 'order lines',
  createPackingSlip: 'Create packing slip',
  selectCustomerButton: 'Select customer',

  // ── Actions ────────────────────────────────────────────────────────────────
  add: 'Add',
  remove: 'Remove',
  delete: 'Delete',
  return: 'Return',
  undoReturn: 'Undo return',
  undoDelete: 'Undo delete',
  actions: 'Actions',
  search: 'Search',
  load: 'Load',

  // ── Inventory search ───────────────────────────────────────────────────────
  addToOrderLine: 'Add to order line',
  itemNumber: 'Item no',
  itemText: 'Item text',
  supplier: 'Supplier',
  price: 'Price',
  stock: 'Stock',
  info: 'Info',
  action: 'Action',
  noItemsFound: 'No items found',
  notInStock: 'Not in stock',
  nonStock: 'Non-stock',
  expired: 'Expired',
  searchProducts: 'Search products',

  // ── Price check ────────────────────────────────────────────────────────────
  checkPriceTitle: 'Check price for selected customer/project',
  checkPriceDescription:
    'Scan/search items to check price for customer/project. Then add items to the sale if the customer wants them.',

  // ── Pickup order modal ─────────────────────────────────────────────────────
  fetchOrderForPayment: 'Fetch order for payment',
  orderNumber: 'Order number',
  orderNumberShort: 'Order no',
  noOrdersFound: 'No orders found',
  fetchForPayment: 'Fetch for payment',
  orderDate: 'Order date',
  phoneNumber: 'Phone number',
  totalAmount: 'Total amount',
  prepaid: 'Prepaid',
  remaining: 'Remaining',
  paymentStatus: 'Payment status',
  partiallyPaid: 'Partially paid',
  paid: 'Paid',
  pending: 'Pending',

  // ── PDA Modal ──────────────────────────────────────────────────────────────
  fetchFromHandTerminalTitle: 'Fetch from hand terminal',
  handTerminalNumber: 'Hand terminal number',
  handTerminalNumberShort: 'Hand terminal no',
  fetch: 'Fetch',

  // ── Payment ────────────────────────────────────────────────────────────────
  paymentSummary: 'Payment summary',
  pay: 'Pay',
  payNow: 'Pay now',
  totalToPay: 'Total to pay',
  remainingAmount: 'Remaining amount',
  includeVat: 'Including VAT',
  undo: 'Undo',
  paymentCard: 'Payment by card',
  paymentCash: 'Payment cash',
  paymentVipps: 'Payment Vipps',
  paymentKlarna: 'Payment Klarna',
  card: 'Card',
  cash: 'Cash',
  vipps: 'Vipps',
  klarna: 'Klarna',
  showMore: 'Show more',
  extraCashWithdrawal: 'Extra cash withdrawal',
  amountOnCard: 'Amount on card',
  amountInCash: 'Amount in cash',
  amountForWithdrawal: 'Amount for withdrawal',
  startPayment: 'Start payment',
  paymentOngoing: 'Payment ongoing',
  cancelPayment: 'Cancel payment',
  paymentCompleted: 'Payment completed!',
  printReceipt: 'Print receipt',
  digitalReceipt: 'Digital receipt',
  regular: 'Regular',
  a4Paper: 'A4 paper',
  email: 'Email',
  sms: 'SMS',
  sellerOnSale: 'Seller on sale',
  confirm: 'Confirm',
  confirmPayment: 'Confirm payment',
  customerChangeReturn: 'Change to return',
  printExchangeSlip: 'Print exchange slip',
  orderDiscount: 'Order discount',
  sumDiscount: 'Sum discount',
  discountPercent: 'Discount percent',
  close: 'Close',
  save: 'Save',

  // ── Units ──────────────────────────────────────────────────────────────────
  pcs: 'PCS',
  m: 'M',
  m2: 'M2',
  kg: 'KG',
  l: 'L',

  // ── Date format ────────────────────────────────────────────────────────────
  dateFormat: 'yyyy-MM-dd',

  // ── Unit conversion modal ──────────────────────────────────────────────────
  conversion: 'Conversion',
  saveChanges: 'Save changes',
  changeToReturn: 'Change to return',
  splitOrderLine: 'Split order line',
  changeUnitCode: 'Change unit code',

  // ── Settings modal ─────────────────────────────────────────────────────────
  allowCreateProject: 'Allow creating new project',
  allowCreateContactPerson: 'Allow creating new contact person',
  showPasswordOption: 'Show "Change Password" option',

  // ── Create project modal ───────────────────────────────────────────────────
  createNewProject: 'Create new project',
  createNewProjectTitle: 'Create new project linked to current customer',
  newProject: 'New project',
  projectId: 'Id*',
  address: 'Address',
  address2: 'Address 2',
  postalCode: 'Postal code',
  city: 'City',
  contactPerson: 'Contact person',
  saveAndCreate: 'Save and create',
  selectCustomerFirst: 'Select customer first',

  // ── Customer selection modal ───────────────────────────────────────────────
  customerReference: 'Customer reference',
  requisition: 'Requisition',
  customerReferencePlaceholder: 'Enter customer reference',
  customerSearchPlaceholder: 'Search for customer',
  requisitionPlaceholder: 'Enter requisition number',
  contactPersonPlaceholder: 'Select contact person',
  contactPersonReferencePlaceholder: 'Enter contact person reference',
  namePlaceholder: 'Enter name',
  address1Placeholder: 'Enter address',
  address2Placeholder: 'Enter address 2',
  phonePlaceholder: 'Enter phone number',
  emailPlaceholder: 'Enter email address',
  postalCodePlaceholder: 'Enter postal code',
  cityPlaceholder: 'Enter city',
  accountingPlaceholder: 'Enter accounting value',
  projectReferencePlaceholder: 'Enter project reference',
  idControlPlaceholder: 'Enter name for ID control',

  // ── Customer info card ─────────────────────────────────────────────────────
  customerInfoTitle: 'CUSTOMER',
  projectInfoTitle: 'PROJECT',
  customerNo: 'Customer no',
  customerName: 'Customer name',
  category: 'Category',
  mobile: 'Mobile',
  emailLabel: 'Email',
  addressTitle: 'ADDRESS',
  street: 'Street',
  postalCodeAndCity: 'Postal code and city',
  creditTitle: 'CREDIT INFO',
  creditLimit: 'Credit limit',
  availableCredit: 'Available credit',
  totalBalance: 'Total balance',
  invoicedBalance: 'Invoiced balance',
  dueBalance: 'Due balance',
  projectNo: 'Project no',
  projectName: 'Project name',
  location: 'Location',
  expirationDate: 'Expiration date',
  expandCustomerDetails: 'Expand customer details',
  expandProjectDetails: 'Expand project details',
  selectCustomerToView: 'Search and select a customer to view information here.',

  // ── Table headers ──────────────────────────────────────────────────────────
  tableHeaderNumber: 'NO',
  tableHeaderName: 'NAME',
  tableHeaderCategory: 'CATEGORY',
  tableHeaderAddress: 'ADDRESS',
  tableHeaderPostalCodeCity: 'POSTAL CODE / CITY',

  // ── Tab labels ─────────────────────────────────────────────────────────────
  tabGeneral: 'General',
  tabDeliveryAddress: 'Delivery address',
  tabOioInformation: 'OIO INFORMATION',

  // ── Field labels ───────────────────────────────────────────────────────────
  name: 'Name',
  address1: 'Address 1',
  phone: 'Phone',
  contactPersonReference: 'Contact person reference',
  idControl: 'ID control (Name)*',
  projectReference: 'Project reference',
  oioEan: 'OIO EAN *',
  oioReference: 'OIO Reference',
  oioAccounting: 'OIO Accounting',
  requisitionRequired: 'Requisition *',
  contactPersonReferenceRequired: 'Contact person reference *',

  // ── Misc text ──────────────────────────────────────────────────────────────
  selectContact: 'Select contact…',
  createNewContactPerson: 'Create new contact person',
  selectEan: 'Select EAN…',
  selectContactPerson: 'Select contact person',
  deliveryAddressInfo:
    'If there is a delivery address, it will be used instead of the invoice address on the delivery note.',

  // ── Card scan ─────────────────────────────────────────────────────────────
  cardScanned: 'Customer card scanned',
  cardScannedDetails: 'Fields have been pre-filled from the card scan',
  scannedFieldLabel: 'scanned',
};

export default en;
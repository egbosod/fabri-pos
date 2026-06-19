/**
 * Shared type for all translation keys.
 * Adding a new key here will cause a TypeScript error in any language file
 * that doesn't implement it — making missing translations immediately visible.
 */
export interface Translations {
  // ── Menu ──────────────────────────────────────────────────────────────────
  menu: string;
  newSale: string;
  previousPurchases: string;
  cashSettlement: string;

  // ── Main menu options ──────────────────────────────────────────────────────
  giftCard: string;
  bankTerminal: string;
  exchangeSlip: string;
  priceCheck: string;
  fetchFromHandTerminal: string;
  fetchOrder: string;
  parkSale: string;

  // ── Profile menu ───────────────────────────────────────────────────────────
  switchUser: string;
  yourRole: string;
  sales: string;
  purchaseManager: string;
  language: string;
  norwegian: string;
  danish: string;
  swedish: string;
  english: string;
  logOut: string;
  password: string;
  logIn: string;
  cancel: string;
  incorrectPassword: string;
  editPin: string;
  editPassword: string;
  lockUser: string;

  // ── Customer / Project ─────────────────────────────────────────────────────
  customer: string;
  project: string;
  selectCustomer: string;
  selectProject: string;
  searchPlaceholder: string;
  projectSearchPlaceholder: string;
  noCustomerSelected: string;
  noProjectSelected: string;

  // ── Cart / Order ───────────────────────────────────────────────────────────
  quantity: string;
  perUnit: string;
  discount: string;
  sum: string;
  total: string;
  vat: string;
  toPay: string;
  items: string;
  itemName: string;
  orderLines: string;
  createPackingSlip: string;
  selectCustomerButton: string;

  // ── Actions ────────────────────────────────────────────────────────────────
  add: string;
  remove: string;
  delete: string;
  return: string;
  undoReturn: string;
  undoDelete: string;
  actions: string;
  search: string;
  load: string;

  // ── Inventory search ───────────────────────────────────────────────────────
  addToOrderLine: string;
  itemNumber: string;
  itemText: string;
  supplier: string;
  price: string;
  stock: string;
  info: string;
  action: string;
  noItemsFound: string;
  notInStock: string;
  nonStock: string;
  expired: string;
  searchProducts: string;

  // ── Price check ────────────────────────────────────────────────────────────
  checkPriceTitle: string;
  checkPriceDescription: string;

  // ── Pickup order modal ─────────────────────────────────────────────────────
  fetchOrderForPayment: string;
  orderNumber: string;
  orderNumberShort: string;
  noOrdersFound: string;
  fetchForPayment: string;
  orderDate: string;
  phoneNumber: string;
  totalAmount: string;
  prepaid: string;
  remaining: string;
  paymentStatus: string;
  partiallyPaid: string;
  paid: string;
  pending: string;

  // ── PDA Modal ──────────────────────────────────────────────────────────────
  fetchFromHandTerminalTitle: string;
  handTerminalNumber: string;
  handTerminalNumberShort: string;
  fetch: string;

  // ── Payment ────────────────────────────────────────────────────────────────
  paymentSummary: string;
  pay: string;
  payNow: string;
  totalToPay: string;
  remainingAmount: string;
  includeVat: string;
  undo: string;
  paymentCard: string;
  paymentCash: string;
  paymentVipps: string;
  paymentKlarna: string;
  card: string;
  cash: string;
  vipps: string;
  klarna: string;
  showMore: string;
  extraCashWithdrawal: string;
  amountOnCard: string;
  amountInCash: string;
  amountForWithdrawal: string;
  startPayment: string;
  paymentOngoing: string;
  cancelPayment: string;
  paymentCompleted: string;
  printReceipt: string;
  digitalReceipt: string;
  regular: string;
  a4Paper: string;
  email: string;
  sms: string;
  sellerOnSale: string;
  confirm: string;
  confirmPayment: string;
  customerChangeReturn: string;
  printExchangeSlip: string;
  orderDiscount: string;
  sumDiscount: string;
  discountPercent: string;
  close: string;
  save: string;

  // ── Units ──────────────────────────────────────────────────────────────────
  pcs: string;
  m: string;
  m2: string;
  kg: string;
  l: string;

  // ── Date format ────────────────────────────────────────────────────────────
  dateFormat: string;

  // ── Unit conversion modal ──────────────────────────────────────────────────
  conversion: string;
  saveChanges: string;
  changeToReturn: string;
  splitOrderLine: string;
  changeUnitCode: string;

  // ── Settings modal ─────────────────────────────────────────────────────────
  allowCreateProject: string;
  allowCreateContactPerson: string;
  showPasswordOption: string;

  // ── Create project modal ───────────────────────────────────────────────────
  createNewProject: string;
  createNewProjectTitle: string;
  newProject: string;
  projectId: string;
  address: string;
  address2: string;
  postalCode: string;
  city: string;
  contactPerson: string;
  saveAndCreate: string;
  selectCustomerFirst: string;

  // ── Customer selection modal ───────────────────────────────────────────────
  customerReference: string;
  requisition: string;
  customerReferencePlaceholder: string;
  customerSearchPlaceholder: string;
  requisitionPlaceholder: string;
  contactPersonPlaceholder: string;
  contactPersonReferencePlaceholder: string;
  namePlaceholder: string;
  address1Placeholder: string;
  address2Placeholder: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  postalCodePlaceholder: string;
  cityPlaceholder: string;
  accountingPlaceholder: string;
  projectReferencePlaceholder: string;
  idControlPlaceholder: string;

  // ── Customer info card ─────────────────────────────────────────────────────
  customerInfoTitle: string;
  projectInfoTitle: string;
  customerNo: string;
  customerName: string;
  category: string;
  mobile: string;
  emailLabel: string;
  addressTitle: string;
  street: string;
  postalCodeAndCity: string;
  creditTitle: string;
  creditLimit: string;
  availableCredit: string;
  totalBalance: string;
  invoicedBalance: string;
  dueBalance: string;
  projectNo: string;
  projectName: string;
  location: string;
  expirationDate: string;
  expandCustomerDetails: string;
  expandProjectDetails: string;
  selectCustomerToView: string;

  // ── Table headers ──────────────────────────────────────────────────────────
  tableHeaderNumber: string;
  tableHeaderName: string;
  tableHeaderCategory: string;
  tableHeaderAddress: string;
  tableHeaderPostalCodeCity: string;

  // ── Tab labels ─────────────────────────────────────────────────────────────
  tabGeneral: string;
  tabDeliveryAddress: string;
  tabOioInformation: string;

  // ── Field labels ───────────────────────────────────────────────────────────
  name: string;
  address1: string;
  phone: string;
  contactPersonReference: string;
  idControl: string;
  projectReference: string;
  oioEan: string;
  oioReference: string;
  oioAccounting: string;
  requisitionRequired: string;
  contactPersonReferenceRequired: string;

  // ── Misc text ──────────────────────────────────────────────────────────────
  selectContact: string;
  createNewContactPerson: string;
  selectEan: string;
  selectContactPerson: string;
  deliveryAddressInfo: string;

  // ── Card scan ─────────────────────────────────────────────────────────────
  cardScanned: string;
  cardScannedDetails: string;
  scannedFieldLabel: string;
}
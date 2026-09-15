import type { Translations } from './types';

/**
 * Danish (da-DK)
 * "Indtast" is the standard imperative for input fields in Danish.
 * Key Danish/Norwegian differences: "projekt" (da) vs "prosjekt" (no),
 * "reference" (da) vs "referanse" (no), "e-mail" (da) vs "e-post" (no),
 * "vælg" (da) vs "velg" (no), "søg" (da) vs "søk" (no).
 */
const da: Translations = {
  // ── Menu ──────────────────────────────────────────────────────────────────
  menu: 'MENU',
  newSale: 'Nyt salg',
  previousPurchases: 'Tidligere køb',
  cashSettlement: 'Kasseafregning',

  // ── Main menu options ──────────────────────────────────────────────────────
  giftCard: 'Gavekort',
  bankTerminal: 'Bankterminal',
  exchangeSlip: 'Byttebon',
  priceCheck: 'Pristjek',
  fetchFromHandTerminal: 'Hent fra håndterminal',
  fetchOrder: 'Hent ordre',
  parkSale: 'Parker salg',

  // ── Profile menu ───────────────────────────────────────────────────────────
  switchUser: 'SKIFT BRUGER',
  yourRole: 'DIN ROLLE',
  sales: 'Salg',
  purchaseManager: 'Indkøbschef',
  language: 'SPROG',
  norwegian: 'Norsk',
  danish: 'Dansk',
  swedish: 'Svensk',
  english: 'English',
  logOut: 'Log ud',
  password: 'Adgangskode',
  logIn: 'Log på',
  cancel: 'Annuller',
  incorrectPassword: 'Forkert adgangskode',
  editPin: 'Rediger PIN',
  editPassword: 'Rediger adgangskode',
  lockUser: 'Lås POS',

  // ── Customer / Project ─────────────────────────────────────────────────────
  customer: 'Kunde',
  project: 'Projekt',
  selectCustomer: 'Vælg kunde',
  selectProject: 'Vælg projekt',
  searchPlaceholder: 'Søg på mobilnr, navn eller kundenr',
  projectSearchPlaceholder: 'Søg på projektnr, navn eller adresse',
  noCustomerSelected: 'Ingen kunde valgt',
  noProjectSelected: 'Intet projekt valgt',

  // ── Cart / Order ───────────────────────────────────────────────────────────
  quantity: 'Antal',
  perUnit: 'Per enhed',
  discount: 'Rabat',
  sum: 'Sum',
  total: 'Total',
  vat: 'Moms',
  toPay: 'At betale',
  items: 'varer',
  itemName: 'Varenavn',
  orderLines: 'varelinjer',
  createPackingSlip: 'Opret pakkeseddel',
  selectCustomerButton: 'Vælg kunde',

  // ── Actions ────────────────────────────────────────────────────────────────
  add: 'Tilføj',
  remove: 'Fjern',
  delete: 'Slet',
  return: 'Retur',
  undoReturn: 'Fortryd retur',
  undoDelete: 'Fortryd sletning',
  actions: 'Handlinger',
  search: 'Søg',
  load: 'Indlæs',

  // ── Inventory search ───────────────────────────────────────────────────────
  addToOrderLine: 'Tilføj varelinje',
  itemNumber: 'Varenr',
  itemText: 'Varetekst',
  supplier: 'Leverandør',
  price: 'Pris',
  stock: 'Beholdning',
  info: 'Info',
  action: 'Handling',
  noItemsFound: 'Ingen varer fundet',
  notInStock: 'Ikke på lager',
  nonStock: 'Ikke-lagervare',
  expired: 'Udløbet',
  searchProducts: 'Søg efter varer',

  // ── Price check ────────────────────────────────────────────────────────────
  checkPriceTitle: 'Tjek pris for valgt kunde/projekt',
  checkPriceDescription:
    'Scan/søg varer for at tjekke pris tilhørende kunde/projekt. Tilføj derefter varerne til salget, hvis kunden ønsker dem.',

  // ── Pickup order modal ─────────────────────────────────────────────────────
  fetchOrderForPayment: 'Hent ordre til betaling',
  orderNumber: 'Ordrenummer',
  orderNumberShort: 'Ordrenr',
  noOrdersFound: 'Ingen ordrer fundet',
  fetchForPayment: 'Hent til betaling',
  orderDate: 'Ordredato',
  phoneNumber: 'Telefonnummer',
  totalAmount: 'Totalbeløb',
  prepaid: 'Forudbetaling',
  remaining: 'Resterende',
  paymentStatus: 'Betalingsstatus',
  partiallyPaid: 'Delvist betalt',
  paid: 'Betalt',
  pending: 'Afventer',

  // ── PDA Modal ──────────────────────────────────────────────────────────────
  fetchFromHandTerminalTitle: 'Hent fra håndterminal',
  handTerminalNumber: 'Håndterminalnummer',
  handTerminalNumberShort: 'Håndterminalnr',
  fetch: 'Hent',

  // ── Payment ────────────────────────────────────────────────────────────────
  paymentSummary: 'Betalingsoversigt',
  pay: 'Betal',
  payNow: 'Betal nu',
  totalToPay: 'Totalt at betale',
  remainingAmount: 'Resterende beløb',
  includeVat: 'Heraf moms',
  undo: 'Fortryd',
  paymentCard: 'Betaling med kort',
  paymentCash: 'Betaling kontant',
  paymentVipps: 'Betaling Vipps',
  paymentKlarna: 'Betaling Klarna',
  card: 'Kort',
  cash: 'Kontant',
  vipps: 'Vipps',
  klarna: 'Klarna',
  showMore: 'Vis flere',
  extraCashWithdrawal: 'Ekstra udtag af kontanter',
  amountOnCard: 'Beløb på kort',
  amountInCash: 'Beløb kontant',
  amountForWithdrawal: 'Beløb for udtag',
  startPayment: 'Start betaling',
  paymentOngoing: 'Betaling pågår',
  cancelPayment: 'Annuller betaling',
  paymentCompleted: 'Betaling gennemført!',
  printReceipt: 'Udskriv kvittering',
  digitalReceipt: 'Digital kvittering',
  regular: 'Almindelig',
  a4Paper: 'A4-ark',
  email: 'E-mail',
  sms: 'SMS',
  sellerOnSale: 'Sælger på salget',
  confirm: 'Bekræft',
  confirmPayment: 'Bekræft betaling',
  customerChangeReturn: 'Kunden skal have tilbage',
  printExchangeSlip: 'Udskriv byttebon',
  orderDiscount: 'Ordrerabat',
  sumDiscount: 'Sumrabat',
  discountPercent: 'Rabatprocent',
  close: 'Luk',
  save: 'Gem',

  // ── Units ──────────────────────────────────────────────────────────────────
  pcs: 'STK',
  m: 'M',
  m2: 'M2',
  kg: 'KG',
  l: 'L',

  // ── Date format ────────────────────────────────────────────────────────────
  dateFormat: 'dd.MM.yyyy',

  // ── Unit conversion modal ──────────────────────────────────────────────────
  conversion: 'Konvertering',
  saveChanges: 'Gem ændringer',
  changeToReturn: 'Skift til retur',
  splitOrderLine: 'Del varelinjen',
  changeUnitCode: 'Skift enhedskode',

  // ── Settings modal ─────────────────────────────────────────────────────────
  allowCreateProject: 'Tillad oprettelse af nyt projekt',
  allowCreateContactPerson: 'Tillad oprettelse af ny kontaktperson',
  showPasswordOption: 'Vis «Skift adgangskode»-mulighed',

  // ── Create project modal ───────────────────────────────────────────────────
  createNewProject: 'Opret nyt projekt',
  createNewProjectTitle: 'Opret nyt projekt tilknyttet nuværende kunde',
  newProject: 'Nyt projekt',
  projectId: 'Id*',
  address: 'Adresse',
  address2: 'Adresse 2',
  postalCode: 'Postnummer',
  city: 'By',
  contactPerson: 'Kontaktperson',
  saveAndCreate: 'Gem og opret',
  selectCustomerFirst: 'Vælg kunde først',

  // ── Customer selection modal ───────────────────────────────────────────────
  customerReference: 'Kundens reference',
  requisition: 'Rekvisitionsnummer',
  customerReferencePlaceholder: 'Indtast kundereference',
  customerSearchPlaceholder: 'Søg på kunde',
  requisitionPlaceholder: 'Indtast rekvisitionsnummer',
  contactPersonPlaceholder: 'Vælg kontaktperson',
  contactPersonReferencePlaceholder: 'Indtast kontaktpersonreference',
  namePlaceholder: 'Indtast navn',
  address1Placeholder: 'Indtast adresse',
  address2Placeholder: 'Indtast adresse 2',
  phonePlaceholder: 'Indtast telefonnummer',
  emailPlaceholder: 'Indtast e-mailadresse',
  postalCodePlaceholder: 'Indtast postnummer',
  cityPlaceholder: 'Indtast by',
  accountingPlaceholder: 'Indtast regnskabsværdi',
  projectReferencePlaceholder: 'Indtast projektreference',
  idControlPlaceholder: 'Indtast navn til ID-kontrol',

  // ── Customer info card ─────────────────────────────────────────────────────
  customerInfoTitle: 'KUNDE',
  projectInfoTitle: 'PROJEKT',
  customerNo: 'Kundenr',
  customerName: 'Kundenavn',
  category: 'Kategori',
  mobile: 'Mobil',
  emailLabel: 'E-mail',
  addressTitle: 'ADRESSE',
  street: 'Gade',
  postalCodeAndCity: 'Postnr og by',
  creditTitle: 'KREDITINFO',
  creditLimit: 'Kreditgrænse',
  availableCredit: 'Tilgængelig kredit',
  totalBalance: 'Total saldo',
  invoicedBalance: 'Faktureret saldo',
  dueBalance: 'Forfalden saldo',
  projectNo: 'Projektnr',
  projectName: 'Projektnavn',
  location: 'Sted',
  expirationDate: 'Udløbsdato',
  expandCustomerDetails: 'Udvid kundedetaljer',
  expandProjectDetails: 'Udvid projektdetaljer',
  selectCustomerToView: 'Søg og vælg en kunde for at se information her.',

  // ── Table headers ──────────────────────────────────────────────────────────
  tableHeaderNumber: 'NR',
  tableHeaderName: 'NAVN',
  tableHeaderCategory: 'KATEGORI',
  tableHeaderAddress: 'ADRESSE',
  tableHeaderPostalCodeCity: 'POSTNR/BY',

  // ── Tab labels ─────────────────────────────────────────────────────────────
  tabGeneral: 'Generelt',
  tabDeliveryAddress: 'Leveringsadresse',
  tabOioInformation: 'OIO-INFORMATION',

  // ── Field labels ───────────────────────────────────────────────────────────
  name: 'Navn',
  address1: 'Adresse 1',
  phone: 'Telefon',
  contactPersonReference: 'Kontaktpersonreference',
  idControl: 'ID-kontrol (Navn)*',
  projectReference: 'Projektreference',
  oioEan: 'OIO EAN *',
  oioReference: 'OIO Reference',
  oioAccounting: 'OIO Regnskab',
  requisitionRequired: 'Rekvisition *',
  contactPersonReferenceRequired: 'Kontaktpersonreference *',

  // ── Misc text ──────────────────────────────────────────────────────────────
  selectContact: 'Vælg kontakt…',
  createNewContactPerson: 'Opret ny kontaktperson',
  selectEan: 'Vælg EAN…',
  selectContactPerson: 'Vælg kontaktperson',
  deliveryAddressInfo:
    'Hvis der er en leveringsadresse, vil den blive brugt i stedet for fakturaadresse på følgesedlen.',

  // ── Card scan ─────────────────────────────────────────────────────────────
  cardScanned: 'Kundekort skannet',
  cardScannedDetails: 'Felterne er forudfyldt baseret på kortscanning',
  scannedFieldLabel: 'skannet',
};

export default da;
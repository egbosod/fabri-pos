import type { Translations } from './types';

/**
 * Swedish (sv-SE)
 * "Ange" is the standard imperative for input fields in Swedish.
 */
const sv: Translations = {
  // ── Menu ──────────────────────────────────────────────────────────────────
  menu: 'MENY',
  newSale: 'Ny försäljning',
  previousPurchases: 'Tidigare köp',
  cashSettlement: 'Kassaavstämning',

  // ── Main menu options ──────────────────────────────────────────────────────
  giftCard: 'Presentkort',
  bankTerminal: 'Bankterminal',
  exchangeSlip: 'Byteslapp',
  priceCheck: 'Priskontroll',
  fetchFromHandTerminal: 'Hämta från handterminal',
  fetchOrder: 'Hämta order',
  parkSale: 'Parkera försäljning',

  // ── Profile menu ───────────────────────────────────────────────────────────
  switchUser: 'BYT ANVÄNDARE',
  yourRole: 'DIN ROLL',
  sales: 'Försäljning',
  purchaseManager: 'Inköpschef',
  language: 'SPRÅK',
  norwegian: 'Norska',
  danish: 'Danska',
  swedish: 'Svenska',
  english: 'English',
  logOut: 'Logga ut',
  password: 'Lösenord',
  logIn: 'Logga in',
  cancel: 'Avbryt',
  incorrectPassword: 'Fel lösenord',
  editPin: 'Ändra PIN',
  editPassword: 'Ändra lösenord',
  lockUser: 'Lås POS',

  // ── Customer / Project ─────────────────────────────────────────────────────
  customer: 'Kund',
  project: 'Projekt',
  selectCustomer: 'Välj kund',
  selectProject: 'Välj projekt',
  searchPlaceholder: 'Sök på mobilnr, namn eller kundnr',
  projectSearchPlaceholder: 'Sök på projektnr, namn eller adress',
  noCustomerSelected: 'Ingen kund vald',
  noProjectSelected: 'Inget projekt valt',

  // ── Cart / Order ───────────────────────────────────────────────────────────
  quantity: 'Antal',
  perUnit: 'Per enhet',
  discount: 'Rabatt',
  sum: 'Summa',
  total: 'Totalt',
  vat: 'Moms',
  toPay: 'Att betala',
  items: 'varor',
  itemName: 'Varunamn',
  orderLines: 'varulinjer',
  createPackingSlip: 'Skapa följesedel',
  selectCustomerButton: 'Välj kund',

  // ── Actions ────────────────────────────────────────────────────────────────
  add: 'Lägg till',
  remove: 'Ta bort',
  delete: 'Radera',
  return: 'Retur',
  undoReturn: 'Ångra retur',
  undoDelete: 'Ångra radering',
  actions: 'Åtgärder',
  search: 'Sök',
  load: 'Ladda',

  // ── Inventory search ───────────────────────────────────────────────────────
  addToOrderLine: 'Lägg till varurad',
  itemNumber: 'Varunr',
  itemText: 'Varutext',
  supplier: 'Leverantör',
  price: 'Pris',
  stock: 'Lagersaldo',
  info: 'Info',
  action: 'Åtgärd',
  noItemsFound: 'Inga varor hittades',
  notInStock: 'Inte i lager',
  nonStock: 'Ej lagerhållen',
  expired: 'Utgången',
  searchProducts: 'Sök produkter',

  // ── Price check ────────────────────────────────────────────────────────────
  checkPriceTitle: 'Kontrollera pris för vald kund/projekt',
  checkPriceDescription:
    'Skanna/sök varor för att kontrollera pris för kund/projekt. Lägg sedan till varorna i försäljningen om kunden önskar dem.',

  // ── Pickup order modal ─────────────────────────────────────────────────────
  fetchOrderForPayment: 'Hämta order för betalning',
  orderNumber: 'Ordernummer',
  orderNumberShort: 'Ordernr',
  noOrdersFound: 'Inga ordrar hittades',
  fetchForPayment: 'Hämta för betalning',
  orderDate: 'Orderdatum',
  phoneNumber: 'Telefonnummer',
  totalAmount: 'Totalt belopp',
  prepaid: 'Förskott',
  remaining: 'Återstående',
  paymentStatus: 'Betalningsstatus',
  partiallyPaid: 'Delvis betald',
  paid: 'Betald',
  pending: 'Väntar',

  // ── PDA Modal ──────────────────────────────────────────────────────────────
  fetchFromHandTerminalTitle: 'Hämta från handterminal',
  handTerminalNumber: 'Handterminalnummer',
  handTerminalNumberShort: 'Handterminalnr',
  fetch: 'Hämta',

  // ── Payment ────────────────────────────────────────────────────────────────
  paymentSummary: 'Betalningsöversikt',
  pay: 'Betala',
  payNow: 'Betala nu',
  totalToPay: 'Totalt att betala',
  remainingAmount: 'Återstående belopp',
  includeVat: 'Varav moms',
  undo: 'Ångra',
  paymentCard: 'Betalning med kort',
  paymentCash: 'Betalning kontant',
  paymentVipps: 'Betalning Vipps',
  paymentKlarna: 'Betalning Klarna',
  card: 'Kort',
  cash: 'Kontant',
  vipps: 'Vipps',
  klarna: 'Klarna',
  showMore: 'Visa fler',
  extraCashWithdrawal: 'Extra kontantuttag',
  amountOnCard: 'Belopp på kort',
  amountInCash: 'Belopp kontant',
  amountForWithdrawal: 'Belopp för uttag',
  startPayment: 'Starta betalning',
  paymentOngoing: 'Betalning pågår',
  cancelPayment: 'Avbryt betalning',
  paymentCompleted: 'Betalning slutförd!',
  printReceipt: 'Skriv ut kvitto',
  digitalReceipt: 'Digitalt kvitto',
  regular: 'Normal',
  a4Paper: 'A4-ark',
  email: 'E-post',
  sms: 'SMS',
  sellerOnSale: 'Säljare på försäljningen',
  confirm: 'Bekräfta',
  confirmPayment: 'Bekräfta betalning',
  customerChangeReturn: 'Kunden ska ha tillbaka',
  printExchangeSlip: 'Skriv ut byteslapp',
  orderDiscount: 'Orderrabatt',
  sumDiscount: 'Summarabatt',
  discountPercent: 'Rabattprocent',
  close: 'Stäng',
  save: 'Spara',

  // ── Units ──────────────────────────────────────────────────────────────────
  pcs: 'ST',
  m: 'M',
  m2: 'M2',
  kg: 'KG',
  l: 'L',

  // ── Date format ────────────────────────────────────────────────────────────
  dateFormat: 'yyyy-MM-dd',

  // ── Unit conversion modal ──────────────────────────────────────────────────
  conversion: 'Konvertering',
  saveChanges: 'Spara ändringar',
  changeToReturn: 'Ändra till retur',
  splitOrderLine: 'Dela orderrad',
  changeUnitCode: 'Ändra enhetskod',

  // ── Settings modal ─────────────────────────────────────────────────────────
  allowCreateProject: 'Tillåt skapande av nytt projekt',
  allowCreateContactPerson: 'Tillåt skapande av ny kontaktperson',
  showPasswordOption: 'Visa «Ändra lösenord»-alternativ',

  // ── Create project modal ───────────────────────────────────────────────────
  createNewProject: 'Skapa nytt projekt',
  createNewProjectTitle: 'Skapa nytt projekt kopplat till aktuell kund',
  newProject: 'Nytt projekt',
  projectId: 'Id*',
  address: 'Adress',
  address2: 'Adress 2',
  postalCode: 'Postnummer',
  city: 'Stad',
  contactPerson: 'Kontaktperson',
  saveAndCreate: 'Spara och skapa',
  selectCustomerFirst: 'Välj kund först',

  // ── Customer selection modal ───────────────────────────────────────────────
  customerReference: 'Kundreferens',
  requisition: 'Rekvisitionsnummer',
  customerReferencePlaceholder: 'Ange kundreferens',
  customerSearchPlaceholder: 'Sök på kund',
  requisitionPlaceholder: 'Ange rekvisitionsnummer',
  contactPersonPlaceholder: 'Välj kontaktperson',
  contactPersonReferencePlaceholder: 'Ange kontaktpersonreferens',
  namePlaceholder: 'Ange namn',
  address1Placeholder: 'Ange adress',
  address2Placeholder: 'Ange adress 2',
  phonePlaceholder: 'Ange telefonnummer',
  emailPlaceholder: 'Ange e-postadress',
  postalCodePlaceholder: 'Ange postnummer',
  cityPlaceholder: 'Ange stad',
  accountingPlaceholder: 'Ange redovisningsvärde',
  projectReferencePlaceholder: 'Ange projektreferens',
  idControlPlaceholder: 'Ange namn för ID-kontroll',

  // ── Customer info card ─────────────────────────────────────────────────────
  customerInfoTitle: 'KUND',
  projectInfoTitle: 'PROJEKT',
  customerNo: 'Kundnr',
  customerName: 'Kundens namn',
  category: 'Kategori',
  mobile: 'Mobil',
  emailLabel: 'E-post',
  addressTitle: 'ADRESS',
  street: 'Gata',
  postalCodeAndCity: 'Postnummer och stad',
  creditTitle: 'KREDITINFO',
  creditLimit: 'Kreditgräns',
  availableCredit: 'Tillgänglig kredit',
  totalBalance: 'Total balans',
  invoicedBalance: 'Fakturerad balans',
  dueBalance: 'Förfallen balans',
  projectNo: 'Projektnr',
  projectName: 'Projektnamn',
  location: 'Plats',
  expirationDate: 'Utgångsdatum',
  expandCustomerDetails: 'Expandera kunddetaljer',
  expandProjectDetails: 'Expandera projektdetaljer',
  selectCustomerToView: 'Sök och välj en kund för att se information här.',

  // ── Table headers ─────────────────────────────────────────────────────────
  tableHeaderNumber: 'NR',
  tableHeaderName: 'NAMN',
  tableHeaderCategory: 'KATEGORI',
  tableHeaderAddress: 'ADRESS',
  tableHeaderPostalCodeCity: 'POSTNR/STAD',

  // ── Tab labels ─────────────────────────────────────────────────────────────
  tabGeneral: 'Allmänt',
  tabDeliveryAddress: 'Leveransadress',
  tabOioInformation: 'OIO-INFORMATION',

  // ── Field labels ───────────────────────────────────────────────────────────
  name: 'Namn',
  address1: 'Adress 1',
  phone: 'Telefon',
  contactPersonReference: 'Kontaktpersonreferens',
  idControl: 'ID-kontroll (Namn)*',
  projectReference: 'Projektreferens',
  oioEan: 'OIO EAN *',
  oioReference: 'OIO Referens',
  oioAccounting: 'OIO Redovisning',
  requisitionRequired: 'Rekvisition *',
  contactPersonReferenceRequired: 'Kontaktpersonreferens *',

  // ── Misc text ──────────────────────────────────────────────────────────────
  selectContact: 'Välj kontakt…',
  createNewContactPerson: 'Skapa ny kontaktperson',
  selectEan: 'Välj EAN…',
  selectContactPerson: 'Välj kontaktperson',
  deliveryAddressInfo:
    'Om det finns en leveransadress kommer denna att användas istället för fakturaadress på följesedeln.',

  // ── Card scan ─────────────────────────────────────────────────────────────
  cardScanned: 'Kundkort skannat',
  cardScannedDetails: 'Fälten är förifyllda baserat på kortskanning',
  scannedFieldLabel: 'skannat',
};

export default sv;
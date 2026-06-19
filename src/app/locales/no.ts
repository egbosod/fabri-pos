import type { Translations } from './types';

/**
 * Norwegian Bokmål (nb-NO)
 * "Angi" is the standard polite imperative for input fields in Norwegian.
 */
const no: Translations = {
  // ── Menu ──────────────────────────────────────────────────────────────────
  menu: 'MENY',
  newSale: 'Nytt salg',
  previousPurchases: 'Tidligere kjøp',
  cashSettlement: 'Kasseoppgjør',

  // ── Main menu options ──────────────────────────────────────────────────────
  giftCard: 'Gavekort',
  bankTerminal: 'Bankterminal',
  exchangeSlip: 'Byttelapp',
  priceCheck: 'Prissjekk',
  fetchFromHandTerminal: 'Hent fra håndterminal',
  fetchOrder: 'Hent ordre',
  parkSale: 'Parker salg',

  // ── Profile menu ───────────────────────────────────────────────────────────
  switchUser: 'BYTT BRUKER',
  yourRole: 'DIN ROLLE',
  sales: 'Salg',
  purchaseManager: 'Innkjøpsleder',
  language: 'SPRÅK',
  norwegian: 'Norsk',
  danish: 'Dansk',
  swedish: 'Svensk',
  english: 'English',
  logOut: 'Logg ut',
  password: 'Passord',
  logIn: 'Logg inn',
  cancel: 'Avbryt',
  incorrectPassword: 'Feil passord',
  editPin: 'Endre PIN',
  editPassword: 'Endre passord',
  lockUser: 'Lås POS',

  // ── Customer / Project ─────────────────────────────────────────────────────
  customer: 'Kunde',
  project: 'Prosjekt',
  selectCustomer: 'Velg kunde',
  selectProject: 'Velg prosjekt',
  searchPlaceholder: 'Søk på mobilnr, navn eller kundenr',
  projectSearchPlaceholder: 'Søk på prosjektnr, navn eller adresse',
  noCustomerSelected: 'Ingen kunde valgt',
  noProjectSelected: 'Ingen prosjekt valgt',

  // ── Cart / Order ───────────────────────────────────────────────────────────
  quantity: 'Antall',
  perUnit: 'Per enhet',
  discount: 'Rabatt',
  sum: 'Sum',
  total: 'Totalt',
  vat: 'MVA',
  toPay: 'Å betale',
  items: 'varer',
  itemName: 'Varenavn',
  orderLines: 'varelinjer',
  createPackingSlip: 'Opprett pakkseddel',
  selectCustomerButton: 'Velg kunde',

  // ── Actions ────────────────────────────────────────────────────────────────
  add: 'Legg til',
  remove: 'Fjern',
  delete: 'Slett',
  return: 'Retur',
  undoReturn: 'Angre retur',
  undoDelete: 'Angre sletting',
  actions: 'Handlinger',
  search: 'Søk',
  load: 'Last',

  // ── Inventory search ───────────────────────────────────────────────────────
  addToOrderLine: 'Legg til varelinje',
  itemNumber: 'Varenr',
  itemText: 'Varetekst',
  supplier: 'Leverandør',
  price: 'Pris',
  stock: 'Beholdning',
  info: 'Info',
  action: 'Handling',
  noItemsFound: 'Ingen varer funnet',
  notInStock: 'Ikke på lager',
  nonStock: 'Ikke-lagervare',
  expired: 'Utgått',
  searchProducts: 'Søk etter varer',

  // ── Price check ────────────────────────────────────────────────────────────
  checkPriceTitle: 'Sjekk pris for valgt kunde/prosjekt',
  checkPriceDescription:
    'Scan/søk varer for å sjekke pris tilhørende kunde/prosjekt. Legg deretter til varene på salget dersom kunden ønsker varene.',

  // ── Pickup order modal ─────────────────────────────────────────────────────
  fetchOrderForPayment: 'Hent ordre for betaling',
  orderNumber: 'Ordrenummer',
  orderNumberShort: 'Ordrenr',
  noOrdersFound: 'Ingen ordre funnet',
  fetchForPayment: 'Hent for betaling',
  orderDate: 'Ordredato',
  phoneNumber: 'Telefonnummer',
  totalAmount: 'Totalbeløp',
  prepaid: 'Forskudd',
  remaining: 'Resterende',
  paymentStatus: 'Betalingsstatus',
  partiallyPaid: 'Delvis betalt',
  paid: 'Betalt',
  pending: 'Venter',

  // ── PDA Modal ──────────────────────────────────────────────────────────────
  fetchFromHandTerminalTitle: 'Hent fra håndterminal',
  handTerminalNumber: 'Håndterminalnummer',
  handTerminalNumberShort: 'Håndterminalnr',
  fetch: 'Hent',

  // ── Payment ────────────────────────────────────────────────────────────────
  paymentSummary: 'Betalingsoversikt',
  pay: 'Betal',
  payNow: 'Betal nå',
  totalToPay: 'Totalt å betale',
  remainingAmount: 'Gjenstående beløp',
  includeVat: 'Herav mva',
  undo: 'Angre',
  paymentCard: 'Betaling kort',
  paymentCash: 'Betaling kontant',
  paymentVipps: 'Betaling Vipps',
  paymentKlarna: 'Betaling Klarna',
  card: 'Kort',
  cash: 'Kontant',
  vipps: 'Vipps',
  klarna: 'Klarna',
  showMore: 'Vis flere',
  extraCashWithdrawal: 'Ekstra kontantuttak',
  amountOnCard: 'Beløp på kort',
  amountInCash: 'Beløp kontant',
  amountForWithdrawal: 'Beløp for uttak',
  startPayment: 'Start betaling',
  paymentOngoing: 'Betaling pågår',
  cancelPayment: 'Avbryt betaling',
  paymentCompleted: 'Betaling fullført!',
  printReceipt: 'Skriv ut kvittering',
  digitalReceipt: 'Digital kvittering',
  regular: 'Vanlig',
  a4Paper: 'A4-ark',
  email: 'E-post',
  sms: 'SMS',
  sellerOnSale: 'Selger på salget',
  confirm: 'Bekreft',
  confirmPayment: 'Bekreft betaling',
  customerChangeReturn: 'Kunden skal ha tilbake',
  printExchangeSlip: 'Skriv ut byttelapp',
  orderDiscount: 'Ordrerabatt',
  sumDiscount: 'Sumrabatt',
  discountPercent: 'Rabattprosent',
  close: 'Lukk',
  save: 'Lagre',

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
  saveChanges: 'Lagre endringer',
  changeToReturn: 'Endre til retur',
  splitOrderLine: 'Del opp varelinjen',
  changeUnitCode: 'Endre enhetskode',

  // ── Settings modal ─────────────────────────────────────────────────────────
  allowCreateProject: 'Tillat oppretting av nytt prosjekt',
  allowCreateContactPerson: 'Tillat oppretting av ny kontaktperson',
  showPasswordOption: 'Vis «Endre passord»-alternativ',

  // ── Create project modal ───────────────────────────────────────────────────
  createNewProject: 'Opprett nytt prosjekt',
  createNewProjectTitle: 'Opprett nytt prosjekt tilknyttet nåværende kunde',
  newProject: 'Nytt prosjekt',
  projectId: 'Id*',
  address: 'Adresse',
  address2: 'Adresse 2',
  postalCode: 'Postnummer',
  city: 'Poststed',
  contactPerson: 'Kontaktperson',
  saveAndCreate: 'Lagre og opprett',
  selectCustomerFirst: 'Velg kunde først',

  // ── Customer selection modal ───────────────────────────────────────────────
  customerReference: 'Kundens referanse',
  requisition: 'Rekvisisjonsnummer',
  customerReferencePlaceholder: 'Angi kundereference',
  customerSearchPlaceholder: 'Søk på kunde',
  requisitionPlaceholder: 'Angi rekvisisjonsnummer',
  contactPersonPlaceholder: 'Velg kontaktperson',
  contactPersonReferencePlaceholder: 'Angi kontaktpersonreferanse',
  namePlaceholder: 'Angi navn',
  address1Placeholder: 'Angi adresse',
  address2Placeholder: 'Angi adresse 2',
  phonePlaceholder: 'Angi telefonnummer',
  emailPlaceholder: 'Angi e-postadresse',
  postalCodePlaceholder: 'Angi postnummer',
  cityPlaceholder: 'Angi poststed',
  accountingPlaceholder: 'Angi regnskapsverdi',
  projectReferencePlaceholder: 'Angi prosjektreferanse',
  idControlPlaceholder: 'Angi navn for ID-kontroll',

  // ── Customer info card ─────────────────────────────────────────────────────
  customerInfoTitle: 'KUNDE',
  projectInfoTitle: 'PROSJEKT',
  customerNo: 'Kundenr',
  customerName: 'Kundenavn',
  category: 'Kategori',
  mobile: 'Mobil',
  emailLabel: 'E-post',
  addressTitle: 'ADRESSE',
  street: 'Gate',
  postalCodeAndCity: 'Postnr og sted',
  creditTitle: 'KREDITINFO',
  creditLimit: 'Kredittgrense',
  availableCredit: 'Tilgjengelig kreditt',
  totalBalance: 'Totalsaldo',
  invoicedBalance: 'Fakturert saldo',
  dueBalance: 'Forfalt saldo',
  projectNo: 'Prosjektnr',
  projectName: 'Prosjektnavn',
  location: 'Sted',
  expirationDate: 'Utløpsdato',
  expandCustomerDetails: 'Utvid kundedetaljer',
  expandProjectDetails: 'Utvid prosjektdetaljer',
  selectCustomerToView: 'Søk og velg en kunde for å se informasjon her.',

  // ── Table headers ──────────────────────────────────────────────────────────
  tableHeaderNumber: 'NR',
  tableHeaderName: 'NAVN',
  tableHeaderCategory: 'KATEGORI',
  tableHeaderAddress: 'ADRESSE',
  tableHeaderPostalCodeCity: 'POSTNR/STED',

  // ── Tab labels ─────────────────────────────────────────────────────────────
  tabGeneral: 'Generelt',
  tabDeliveryAddress: 'Leveringsadresse',
  tabOioInformation: 'OIO-INFORMASJON',

  // ── Field labels ───────────────────────────────────────────────────────────
  name: 'Navn',
  address1: 'Adresse 1',
  phone: 'Telefon',
  contactPersonReference: 'Kontaktpersonreferanse',
  idControl: 'ID-kontroll (Navn)*',
  projectReference: 'Prosjektreferanse',
  oioEan: 'OIO EAN *',
  oioReference: 'OIO Referanse',
  oioAccounting: 'OIO Regnskap',
  requisitionRequired: 'Rekvisisjon *',
  contactPersonReferenceRequired: 'Kontaktpersonreferanse *',

  // ── Misc text ──────────────────────────────────────────────────────────────
  selectContact: 'Velg kontakt…',
  createNewContactPerson: 'Opprett ny kontaktperson',
  selectEan: 'Velg EAN…',
  selectContactPerson: 'Velg kontaktperson',
  deliveryAddressInfo:
    'Hvis det finnes en leveringsadresse, vil den bli brukt i stedet for fakturaadresse på følgeseddelen.',

  // ── Card scan ─────────────────────────────────────────────────────────────
  cardScanned: 'Kundekort skannet',
  cardScannedDetails: 'Feltene er forhåndsutfylt basert på kortskanning',
  scannedFieldLabel: 'skannet',
};

export default no;
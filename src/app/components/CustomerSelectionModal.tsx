import React, { useState, useEffect, useRef, useCallback } from 'react';
import svgPaths from "../imports/svg-cyizkdbmkk";
import barcodeSvgPaths from "../../imports/Iconbutton-1/svg-rwq2qa5anz";
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { Plus } from 'lucide-react';
import { CreateNewContactPersonModal, ContactPersonData } from './CreateNewContactPersonModal';
import { CreateNewProjectModal, NewProjectData } from './CreateNewProjectModal';
import { ModalCTAFooter } from './ModalCTAFooter';
import { playBarcodeBeep } from '../utils/scanSound';

// ─── Interfaces ───────────────────────────────────────────────────────────────

/**
 * Data returned by the Aspect4 customer card scanner.
 * Exported so RootLayout can import and type the state correctly.
 */
export interface ScannedCardData {
  /** Customer number used to look up the customer record */
  customerNumber: string;
  /** Contact person name pre-filled from the card */
  contactPerson: string;
  /** Optional project number embedded in the card */
  projectNr?: string;
  /** Optional requisition number embedded in the card */
  requisitionNumber?: string;
  /** The raw card barcode/ID (for audit / display) */
  cardId: string;
}

interface Customer {
  id: string;
  name: string;
  customerNumber: string;
  type: 'Proff' | 'Privat';
  discountRate?: number;
  category?: string;
  mobile?: string;
  email?: string;
  street?: string;
  postalCode?: string;
  city?: string;
  creditLimit?: string;
  availableCredit?: string;
  totalBalance?: string;
  invoicedBalance?: string;
  dueBalance?: string;
}

interface Project {
  id: string;
  nr: string;
  ekstNr: string;
  navn: string;
  kategori: string;
  adresse: string;
  postnr: string;
  sted: string;
  utlopsdato: string;
  // optional fields for newly created projects
  address2?: string;
  contactPerson?: string;
  email?: string;
  phoneNumber?: string;
}

interface CustomerSelectionModalProps {
  onClose: () => void;
  onConfirm: (customer: Customer | null, project?: Project) => void;
  isPriceCheckMode?: boolean;
  /** Pre-populated data from a physical card scan (Aspect4) */
  scannedCardData?: ScannedCardData | null;
  /** Called once the scanned data has been applied to the form */
  onCardDataProcessed?: () => void;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockCustomers: Customer[] = [
  { id: '1',  name: 'Fenriz Nattgaard',      customerNumber: '399999', type: 'Proff',  discountRate: 15, category: 'Byggmestre',    mobile: '+47 911 66 666', email: 'fenriz@darkthrone.no',     street: 'Trandalsvegen 12',   postalCode: '1890', city: 'Rakkestad',  creditLimit: '50 000',  availableCredit: '32 450',  totalBalance: '17 550',  invoicedBalance: '12 300',  dueBalance: '5 250' },
  { id: '2',  name: 'Varg Grimfjell',        customerNumber: '400000', type: 'Proff',  discountRate: 20, category: 'Byggmestre',    mobile: '+47 922 77 777', email: 'varg@burzum.no',           street: 'Svartskogsveien 1',  postalCode: '5353', city: 'Straume',    creditLimit: '80 000',  availableCredit: '61 200',  totalBalance: '18 800',  invoicedBalance: '14 600',  dueBalance: '4 200' },
  { id: '3',  name: 'Abbath Blodskjegg',     customerNumber: '400001', type: 'Proff',  discountRate: 18, category: 'Elektrikere',   mobile: '+47 933 88 888', email: 'abbath@immortal.no',       street: 'Isfjellveien 66',    postalCode: '5700', city: 'Voss',       creditLimit: '40 000',  availableCredit: '28 750',  totalBalance: '11 250',  invoicedBalance: '8 900',   dueBalance: '2 350' },
  { id: '4',  name: 'Grutle Jernbjørn',      customerNumber: '400002', type: 'Proff',  discountRate: 12, category: 'Tømrere',       mobile: '+47 944 99 999', email: 'grutle@enslaved.no',       street: 'Runevegen 42',       postalCode: '5527', city: 'Haugesund',  creditLimit: '60 000',  availableCredit: '44 000',  totalBalance: '16 000',  invoicedBalance: '11 500',  dueBalance: '4 500' },
  { id: '5',  name: 'Ihsahn Svartskov',      customerNumber: '400003', type: 'Proff',  discountRate: 22, category: 'Rørleggere',    mobile: '+47 955 11 111', email: 'ihsahn@emperor.no',        street: 'Tronfjellgata 7',    postalCode: '2400', city: 'Elverum',    creditLimit: '70 000',  availableCredit: '55 300',  totalBalance: '14 700',  invoicedBalance: '10 200',  dueBalance: '4 500' },
  { id: '6',  name: 'Satyr Wølfhausen',      customerNumber: '400004', type: 'Proff',  discountRate: 16, category: 'Byggmestre',    mobile: '+47 966 22 222', email: 'satyr@satyricon.no',       street: 'Ulveskogenveien 3',  postalCode: '0694', city: 'Oslo',       creditLimit: '90 000',  availableCredit: '72 100',  totalBalance: '17 900',  invoicedBalance: '13 400',  dueBalance: '4 500' },
  { id: '7',  name: 'Gaahl Vindsval',        customerNumber: '400005', type: 'Proff',  discountRate: 14, category: 'Malere',        mobile: '+47 977 33 333', email: 'gaahl@gorgoroth.no',       street: 'Fjellheimsvegen 19', postalCode: '5700', city: 'Voss',       creditLimit: '35 000',  availableCredit: '22 800',  totalBalance: '12 200',  invoicedBalance: '9 100',   dueBalance: '3 100' },
  { id: '8',  name: 'Shagrath Dødsbann',     customerNumber: '400006', type: 'Proff',  discountRate: 19, category: 'Elektrikere',   mobile: '+47 988 44 444', email: 'shagrath@dimmuborgir.no', street: 'Borghjemsgata 66',   postalCode: '0562', city: 'Oslo',       creditLimit: '55 000',  availableCredit: '38 500',  totalBalance: '16 500',  invoicedBalance: '12 800',  dueBalance: '3 700' },
  { id: '9',  name: 'Samoth Tyrannhammer',   customerNumber: '400007', type: 'Proff',  discountRate: 11, category: 'Tømrere',       mobile: '+47 999 55 555', email: 'samoth@emperor.no',        street: 'Hammerfjellet 4',    postalCode: '2400', city: 'Elverum',    creditLimit: '45 000',  availableCredit: '31 600',  totalBalance: '13 400',  invoicedBalance: '10 100',  dueBalance: '3 300' },
  { id: '10', name: 'Nocturno Skjervheim',   customerNumber: '400008', type: 'Proff',  discountRate: 17, category: 'Rørleggere',    mobile: '+47 900 66 666', email: 'nocturno@darkthrone.no',   street: 'Kuldedalen 11',      postalCode: '1890', city: 'Rakkestad',  creditLimit: '30 000',  availableCredit: '18 200',  totalBalance: '11 800',  invoicedBalance: '8 600',   dueBalance: '3 200' },
  { id: '11', name: 'Demonaz Hreggviðr',     customerNumber: '400009', type: 'Proff',  discountRate: 25, category: 'Byggmestre',    mobile: '+47 901 77 777', email: 'demonaz@immortal.no',      street: 'Blizzardveien 88',   postalCode: '5700', city: 'Voss',       creditLimit: '100 000', availableCredit: '84 000',  totalBalance: '16 000',  invoicedBalance: '11 200',  dueBalance: '4 800' },
  { id: '12', name: 'Hellhammer Tronstad',   customerNumber: '400010', type: 'Proff',  discountRate: 13, category: 'Elektrikere',   mobile: '+47 902 88 888', email: 'hellhammer@mayhem.no',     street: 'Kaosgata 6',         postalCode: '0475', city: 'Oslo',       creditLimit: '65 000',  availableCredit: '49 900',  totalBalance: '15 100',  invoicedBalance: '11 300',  dueBalance: '3 800' },
  { id: '13', name: 'Mortiis Bergstad',      customerNumber: '400011', type: 'Privat', discountRate: 5,  category: 'Forbrukersalg', mobile: '+47 903 99 999', email: 'mortiis@underworld.no',    street: 'Fjellhula 2',        postalCode: '3830', city: 'Kviteseid' },
  { id: '14', name: 'Silenoz Grimstad',      customerNumber: '400012', type: 'Privat', discountRate: 3,  category: 'Forbrukersalg', mobile: '+47 904 11 111', email: 'silenoz@dimmuborgir.no',   street: 'Mørketidsvegen 5',   postalCode: '4876', city: 'Grimstad' },
  { id: '15', name: 'Trym Torvet',           customerNumber: '400013', type: 'Privat', discountRate: 0,  category: 'Forbrukersalg', mobile: '+47 905 22 222', email: 'trym@emperor.no',          street: 'Moseveien 9',        postalCode: '2400', city: 'Elverum' },
  { id: '16', name: 'Infernus Mørkdal',      customerNumber: '400014', type: 'Proff',  discountRate: 21, category: 'Byggmestre',    mobile: '+47 906 33 333', email: 'infernus@gorgoroth.no',    street: 'Avgrunnsveien 13',   postalCode: '5058', city: 'Bergen',     creditLimit: '75 000',  availableCredit: '56 300',  totalBalance: '18 700',  invoicedBalance: '14 100',  dueBalance: '4 600' },
  { id: '17', name: 'Ivar Blodøks',          customerNumber: '400015', type: 'Proff',  discountRate: 10, category: 'Tømrere',       mobile: '+47 907 44 444', email: 'ivar@enslaved.no',         street: 'Ragnarbakken 31',    postalCode: '5527', city: 'Haugesund',  creditLimit: '42 000',  availableCredit: '27 700',  totalBalance: '14 300',  invoicedBalance: '10 700',  dueBalance: '3 600' },
  { id: '18', name: 'Nergal Khaosfjord',     customerNumber: '400016', type: 'Privat', discountRate: 2,  category: 'Forbrukersalg', mobile: '+47 908 55 555', email: 'nergal@behemoth.no',       street: 'Kaosholmen 7',       postalCode: '0150', city: 'Oslo' },
  { id: '19', name: 'Erkekjetter Svartskau', customerNumber: '400017', type: 'Proff',  discountRate: 9,  category: 'Malere',        mobile: '+47 909 66 666', email: 'erkekjetter@kvist.no',     street: 'Svartskauvegen 44',  postalCode: '2150', city: 'Årnes',      creditLimit: '28 000',  availableCredit: '14 500',  totalBalance: '13 500',  invoicedBalance: '10 200',  dueBalance: '3 300' },
  { id: '20', name: 'Maniac Skadesmann',     customerNumber: '400018', type: 'Privat', discountRate: 0,  category: 'Forbrukersalg', mobile: '+47 910 77 777', email: 'maniac@mayhem.no',         street: 'Skarvetoppen 1',     postalCode: '3560', city: 'Hemsedal' },
];

const mockProjects: Project[] = [
  { id: '1', nr: '399999', ekstNr: '1337', navn: 'Byggmester Snorre Rogne', kategori: 'Byggmestre', adresse: 'Byggerivegen 43', postnr: '2653', sted: 'Vestre Gausdal', utlopsdato: '31.12.2023' },
  { id: '2', nr: '310601', ekstNr: '', navn: 'Snorre Rogne forbruker', kategori: 'Forbrukersalg', adresse: 'Veståsvegen 43', postnr: '2821', sted: 'Gjøvik', utlopsdato: '31.12.2023' },
  { id: '3', nr: '240209', ekstNr: '2048', navn: 'Snorre Fredrik Cystad', kategori: 'Forbrukersalg', adresse: 'Vestbygvegen 21', postnr: '2565', sted: 'Stange', utlopsdato: '30.06.2024' },
  { id: '4', nr: '240209', ekstNr: '3142', navn: 'Snorre Birger Pettersen', kategori: 'Forbrukersalg', adresse: 'Huldrevegen 432', postnr: '5698', sted: 'Lillehammer', utlopsdato: '15.09.2024' },
  { id: '5', nr: '76589', ekstNr: '', navn: 'Tilbygg skolekjøkken', kategori: 'Byggmestre', adresse: 'Skolevegen 8', postnr: '2000', sted: 'Lillestrøm', utlopsdato: '20.08.2024' },
  { id: '6', nr: '76712', ekstNr: '4096', navn: 'Kontorbygg Teknologiparken', kategori: 'Elektrikere', adresse: 'Innovasjonsveien 3', postnr: '7034', sted: 'Trondheim', utlopsdato: '31.12.2024' },
  { id: '7', nr: '76845', ekstNr: '5001', navn: 'Rehabilitering gamlehjem', kategori: 'Rørleggere', adresse: 'Omsorgsveien 22', postnr: '5003', sted: 'Bergen', utlopsdato: '10.11.2024' },
  { id: '8', nr: '76923', ekstNr: '', navn: 'Parkeringshus Vikingsenteret', kategori: 'Byggmestre', adresse: 'Vikingvegen 50', postnr: '4050', sted: 'Sola', utlopsdato: '28.02.2025' },
  { id: '9', nr: '77014', ekstNr: '6128', navn: 'Leiligheter Fjordutsikt', kategori: 'Byggmestre', adresse: 'Strandpromenaden 7', postnr: '5200', sted: 'Os', utlopsdato: '15.05.2025' },
  { id: '10', nr: '77156', ekstNr: '7256', navn: 'Industribygg Næringspark', kategori: 'Tømrere', adresse: 'Industriveien 18', postnr: '3611', sted: 'Kongsberg', utlopsdato: '30.04.2025' },
];

const MOCK_CONTACTS = [
  { id: 1, navn: 'Ariel Havmøy', tittel: 'Prosjektleder' },
  { id: 2, navn: 'Simba Løvansen', tittel: 'Innkjøpsansvarlig' },
  { id: 3, navn: 'Elsa Frostheim', tittel: 'Anleggskoordinator' },
  { id: 4, navn: 'Woody Cowboygaard', tittel: 'Driftsleder' },
  { id: 5, navn: 'Moana Havdatter', tittel: 'Prosjektingeniør' },
];

// ─── Scan Card Button ─────────────────────────────────────────────────────────

function ScanCardButton({ onClick, active = false }: { onClick: () => void; active?: boolean }) {
  return (
    <button
      onClick={onClick}
      title="Skann kundekort"
      style={{
        background: active ? 'var(--primary)' : 'var(--card)',
        border: active ? '1px solid var(--primary)' : '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.15s, border-color 0.15s',
        padding: 0,
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.background = 'var(--secondary)';
      }}
      onMouseLeave={e => {
        if (!active) e.currentTarget.style.background = 'var(--card)';
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d={barcodeSvgPaths.p1eb9d340} fill={active ? 'var(--primary-foreground)' : 'var(--card-foreground)'} />
      </svg>
    </button>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function Group() {
  return (
    <div className="absolute bottom-[0.01%] left-0 right-0 top-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p12a2d640} fill="var(--card-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.pb06def0} fill="var(--card-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p9473200} fill="var(--card-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p3c2a6d00} fill="var(--card-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p3d2d8400} fill="var(--card-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p109fd700} fill="var(--card-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p144b3880} fill="var(--card-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p23720400} fill="var(--card-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p1b349c80} fill="var(--card-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p2c963880} fill="var(--card-foreground)" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute bottom-[2.05%] left-0 right-0 top-0">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group 3">
          <path clipRule="evenodd" d={svgPaths.p2d8c2380} fill="var(--muted-foreground)" fillRule="evenodd" />
          <path clipRule="evenodd" d={svgPaths.p3d995300} fill="var(--muted-foreground)" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

const PersonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="4.5" r="2.5" stroke="var(--muted-foreground)" strokeWidth="1.2" />
    <path d="M2 12c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="var(--muted-foreground)" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

// ─── useAnchorRect ────────────────────────────────────────────────────────────

function useAnchorRect(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const update = useCallback(() => {
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  }, [ref]);

  useEffect(() => {
    if (!active) { setRect(null); return; }
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [active, update]);

  return rect;
}

// ─── Customer Dropdown Table ──────────────────────────────────────────────────

const CUSTOMER_COLS = '80px 1fr 130px';
const PROJECT_COLS = '80px 1fr 110px 1fr 110px';
const HEADER_H = 37;
const ROW_H = 48;

interface DropdownCustomer {
  id: string;
  customerNumber: string;
  name: string;
  category?: string;
}

function CustomerDropdownTable({ rect, modalRight, rows, hoveredIdx, onHover, onSelect }: {
  rect: DOMRect | null;
  modalRight: number | null;
  rows: DropdownCustomer[];
  hoveredIdx: number | null;
  onHover: (i: number | null) => void;
  onSelect: (r: DropdownCustomer) => void;
}) {
  const { t } = useLanguage();
  if (!rect || rows.length === 0) return null;
  const dropWidth = (modalRight != null ? modalRight - 20 : rect.right) - rect.left;

  return (
    <div style={{
      position: 'fixed',
      top: rect.bottom + 2,
      left: rect.left,
      width: dropWidth,
      maxHeight: HEADER_H + ROW_H * 6.5,
      zIndex: 2147483647,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: '0 2px 8px rgba(107,107,114,0.10), 0 8px 24px rgba(107,107,114,0.16)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: CUSTOMER_COLS, padding: '0 12px', height: HEADER_H, alignItems: 'center', flexShrink: 0, borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
        {[t('tableHeaderNumber'), t('tableHeaderName'), t('tableHeaderCategory')].map(h => (
          <span key={h} style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
        ))}
      </div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {rows.map((r, i) => (
          <div
            key={r.id}
            style={{
              display: 'grid',
              gridTemplateColumns: CUSTOMER_COLS,
              padding: '0 12px',
              height: ROW_H,
              alignItems: 'center',
              borderTop: i === 0 ? 'none' : '1px solid var(--border)',
              background: hoveredIdx === i ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'var(--card)',
              cursor: 'pointer',
              transition: 'background 0.07s',
            }}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            onMouseDown={(e) => { e.preventDefault(); onSelect(r); }}
          >
            {[r.customerNumber, r.name, r.category || ''].map((val, ci) => (
              <span key={ci} style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)', lineHeight: 1.38, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>{val}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Project Dropdown Table ───────────────────────────────────────────────────

function ProjectDropdownTable({ rect, modalRight, rows, hoveredIdx, onHover, onSelect }: {
  rect: DOMRect | null;
  modalRight: number | null;
  rows: Project[];
  hoveredIdx: number | null;
  onHover: (i: number | null) => void;
  onSelect: (r: Project) => void;
}) {
  const { t } = useLanguage();
  if (!rect || rows.length === 0) return null;
  const dropWidth = (modalRight != null ? modalRight - 20 : rect.right) - rect.left;

  return (
    <div style={{
      position: 'fixed',
      top: rect.bottom + 2,
      left: rect.left,
      width: dropWidth,
      maxHeight: HEADER_H + ROW_H * 6.5,
      zIndex: 2147483647,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: '0 2px 8px rgba(107,107,114,0.10), 0 8px 24px rgba(107,107,114,0.16)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: PROJECT_COLS, padding: '0 12px', height: HEADER_H, alignItems: 'center', flexShrink: 0, borderBottom: '1px solid var(--border)', background: 'var(--card)' }}>
        {[t('tableHeaderNumber'), t('tableHeaderName'), t('tableHeaderCategory'), t('tableHeaderAddress'), t('tableHeaderPostalCodeCity')].map(h => (
          <span key={h} style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</span>
        ))}
      </div>
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {rows.map((r, i) => (
          <div
            key={r.id}
            style={{
              display: 'grid',
              gridTemplateColumns: PROJECT_COLS,
              padding: '0 12px',
              height: ROW_H,
              alignItems: 'center',
              borderTop: i === 0 ? 'none' : '1px solid var(--border)',
              background: hoveredIdx === i ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'var(--card)',
              cursor: 'pointer',
              transition: 'background 0.07s',
            }}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            onMouseDown={(e) => { e.preventDefault(); onSelect(r); }}
          >
            {[r.nr, r.navn, r.kategori, r.adresse, `${r.postnr} ${r.sted}`].map((val, ci) => (
              <span key={ci} style={{ fontSize: 'var(--text-base)', color: 'var(--foreground)', lineHeight: 1.38, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: 8 }}>{val}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contact Select List ────────────────────────────���─────────────────────────

function ContactSelectList({ anchorRef, open, selected, onSelect, onClose }: {
  anchorRef: React.RefObject<HTMLElement | null>;
  open: boolean;
  selected: string;
  onSelect: (name: string) => void;
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const update = useCallback(() => {
    if (anchorRef.current) setRect(anchorRef.current.getBoundingClientRect());
  }, [anchorRef]);

  useEffect(() => {
    if (!open) { setRect(null); return; }
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, update]);

  if (!open || !rect) return null;

  return (
    <div style={{
      position: 'fixed',
      top: rect.bottom + 2,
      left: rect.left,
      width: rect.width,
      zIndex: 2147483647,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: '0 2px 8px rgba(107,107,114,0.10), 0 12px 28px rgba(107,107,114,0.18)',
      overflow: 'hidden',
      fontFamily: "'Montserrat', sans-serif",
    }}>
      <div style={{ overflowY: 'auto', maxHeight: ROW_H * 5 }}>
        {MOCK_CONTACTS.map((c, i) => {
          const isSelected = selected === c.navn;
          return (
            <div
              key={c.id}
              style={{
                padding: '0 12px',
                height: ROW_H,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                background: hovered === i ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : isSelected ? 'color-mix(in srgb, var(--primary) 5%, transparent)' : 'var(--card)',
                cursor: 'pointer',
                transition: 'background 0.07s',
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onMouseDown={(e) => { e.preventDefault(); onSelect(c.navn); onClose(); }}
            >
              <span style={{ flex: 1, fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', color: 'var(--foreground)', lineHeight: 1.75, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {c.navn}
              </span>
              {isSelected && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7L5.5 10L11.5 4" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── InfoCard (side panel) ────────────────────────────────────────────────────

interface CardRowData { label: string; value: string; badge?: string | null; }
interface CardSection { title?: string | null; rows: CardRowData[]; }

function CardRow({ label, value, badge, borderTop = true }: CardRowData & { borderTop?: boolean }) {
  return (
    <div style={{ borderTop: borderTop ? '1px solid var(--border)' : 'none', padding: 10, display: 'flex', gap: 10, alignItems: 'center', fontFamily: "'Montserrat', sans-serif" }}>
      <span style={{ flex: 1, fontWeight: 700, fontSize: 'var(--text-xs)', color: 'var(--card-foreground)', lineHeight: 1.4 }}>{label}</span>
      <span style={{ flex: 1, fontWeight: 400, fontSize: 'var(--text-xs)', color: 'var(--card-foreground)', lineHeight: 1.4 }}>{value}</span>
      {badge && (
        <span style={{ background: 'color-mix(in srgb, var(--primary) 18%, var(--card))', borderRadius: 'var(--radius-sm)', padding: '2px 6px', fontWeight: 400, fontSize: 'var(--text-xs)', color: 'var(--foreground)', lineHeight: 1.75, whiteSpace: 'nowrap', fontFamily: "'Montserrat', sans-serif" }}>
          {badge}
        </span>
      )}
    </div>
  );
}

function InfoCard({ title, rows, expandLabel, expandedCard }: {
  title: string;
  rows: CardRowData[];
  expandLabel: string;
  expandedCard: CardSection[] | null;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%', fontFamily: "'Montserrat', sans-serif" }}>
      {/* Collapsed card */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
        <div style={{ borderBottom: '1px solid var(--border)', padding: 10 }}>
          <span style={{ fontWeight: 700, fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.75 }}>
            {title}
          </span>
        </div>
        {rows.map((row, i) => (
          <CardRow key={i} label={row.label} value={row.value} badge={row.badge} borderTop={true} />
        ))}
      </div>

      {/* Expand/collapse button */}
      <button
        onClick={() => setExpanded(v => !v)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 5, alignSelf: 'flex-end', fontFamily: "'Montserrat', sans-serif" }}
      >
        <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.3px', lineHeight: 1.75, whiteSpace: 'nowrap' }}>
          {expanded ? expandLabel.replace('Utvid', 'Skjul') : expandLabel}
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.18s ease-in-out', flexShrink: 0 }}>
          <path d="M2 4L6 8L10 4" stroke="var(--primary)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Expanded detail card */}
      {expanded && expandedCard && (
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
          {expandedCard.map((section, si) => (
            <div key={si}>
              {section.title && (
                <div style={{ borderBottom: '1px solid var(--border)', padding: '6px 10px', background: 'var(--background)' }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.75 }}>
                    {section.title}
                  </span>
                </div>
              )}
              {section.rows.map((row, ri) => (
                <CardRow key={ri} label={row.label} value={row.value} borderTop={si > 0 || ri > 0 || !!section.title} />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Shared field components ──────────────────────────────────────────────────

function FieldLabel({ children, scanned = false }: { children: React.ReactNode; scanned?: boolean }) {
  const { t } = useLanguage();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'var(--text-base)', color: 'var(--card-foreground)', lineHeight: 1.75 }}>
        {children}
      </span>
      {scanned && (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 3,
          background: 'color-mix(in srgb, var(--primary) 12%, var(--card))',
          border: '1px solid color-mix(in srgb, var(--primary) 25%, transparent)',
          borderRadius: 20,
          padding: '0px 6px',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: '10px',
          color: 'var(--primary)',
          lineHeight: 1.6,
          whiteSpace: 'nowrap',
        }}>
          {/* tiny barcode icon */}
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <rect x="0" y="1" width="1" height="7" fill="var(--primary)" />
            <rect x="2" y="1" width="0.5" height="7" fill="var(--primary)" />
            <rect x="3.5" y="1" width="1" height="7" fill="var(--primary)" />
            <rect x="5.5" y="1" width="0.5" height="7" fill="var(--primary)" />
            <rect x="7" y="1" width="1" height="7" fill="var(--primary)" />
            <rect x="8.5" y="1" width="0.5" height="7" fill="var(--primary)" />
          </svg>
          {t('scannedFieldLabel')}
        </span>
      )}
    </div>
  );
}

function InputBox({ focused, children, style = {} }: { focused: boolean; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'var(--card)',
      border: focused ? '2px solid var(--primary)' : '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      height: 48,
      display: 'flex',
      alignItems: 'center',
      padding: focused ? '0 13px' : '0 14px',
      gap: 10,
      cursor: 'text',
      transition: 'border 0.1s',
      ...style,
    }}>
      {children}
    </div>
  );
}

const baseInputStyle: React.CSSProperties = {
  flex: 1,
  border: 'none',
  outline: 'none',
  fontFamily: "'Montserrat', sans-serif",
  fontSize: 'var(--text-base)',
  background: 'transparent',
  lineHeight: 1.75,
};

// ─── Plus button (shared) ─────────────────────────────────────────────────────

function ContactPersonPlusBtn({ onClick }: { onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      title={t('createNewContactPerson')}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        flexShrink: 0,
        transition: 'background 0.1s',
      }}
    >
      <Plus size={20} style={{ color: 'var(--card-foreground)' }} />
    </button>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export function CustomerSelectionModal({
  onClose,
  onConfirm,
  isPriceCheckMode = false,
  scannedCardData,
  onCardDataProcessed,
}: CustomerSelectionModalProps) {
  const { t } = useLanguage();
  const { erpScenario, allowCreateProject, allowCreateContactPerson, scanCustomerCard } = useSettings();

  type TabKey = 'generelt' | 'leveringsadresse' | 'oioInformation';
  const [activeTab, setActiveTab] = useState<TabKey>('generelt');

  // Customer / Project search + selection
  const [customerSearch, setCustomerSearch] = useState('');
  const [projectSearch, setProjectSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dropdown open states
  const [customerOpen, setCustomerOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  // Dropdown hover states
  const [hoveredCustomer, setHoveredCustomer] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Refs for floating dropdowns and auto-focus
  const customerSearchInputRef = useRef<HTMLInputElement>(null);
  const customerAnchorRef = useRef<HTMLDivElement>(null);
  const projectAnchorRef = useRef<HTMLDivElement>(null);
  const contactAnchorRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scanPanelInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus customer search input on mount
  useEffect(() => {
    if (customerSearchInputRef.current) {
      customerSearchInputRef.current.focus();
    }
  }, []);

  // Anchor rects for floating dropdowns
  const customerRect = useAnchorRect(customerAnchorRef, customerOpen);
  const projectRect = useAnchorRect(projectAnchorRef, projectOpen);
  const modalRect = useAnchorRect(modalRef, customerOpen || projectOpen);

  // General fields
  const [customerReference, setCustomerReference] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [requisitionNumber, setRequisitionNumber] = useState('');

  // Trygg2000-specific fields
  const [contactPersonReference, setContactPersonReference] = useState('');
  const [idControlName, setIdControlName] = useState('');
  const [projectReference, setProjectReference] = useState('');

  // Delivery address fields
  const [deliveryName, setDeliveryName] = useState('');
  const [deliveryAddress1, setDeliveryAddress1] = useState('');
  const [deliveryAddress2, setDeliveryAddress2] = useState('');
  const [deliveryPhone, setDeliveryPhone] = useState('');
  const [deliveryEmail, setDeliveryEmail] = useState('');
  const [deliveryPostalCode, setDeliveryPostalCode] = useState('');
  const [deliveryCity, setDeliveryCity] = useState('');

  // OIO Information fields (Aspect4 DK)
  const [oioEan, setOioEan] = useState('');
  const [oioReference, setOioReference] = useState('');
  const [oioAccounting, setOioAccounting] = useState('');
  const [oioCustomerReference, setOioCustomerReference] = useState('');
  const [oioRequisition, setOioRequisition] = useState('');
  const [oioContactPersonReference, setOioContactPersonReference] = useState('');
  const [oioContactPerson, setOioContactPerson] = useState('');
  const [oioProjectReference, setOioProjectReference] = useState('');

  // Sub-modal states
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showCreateContactPersonModal, setShowCreateContactPersonModal] = useState(false);

  // Scan panel state
  const [scanPanelOpen, setScanPanelOpen] = useState(false);
  const [cardScanInput, setCardScanInput] = useState('');
  const [scanHasResult, setScanHasResult] = useState(false);
  const [scanInputFocused, setScanInputFocused] = useState(false);

  // Fake scan handler — populates all form fields with random mock data
  const handleFakeScan = useCallback(() => {
    playBarcodeBeep();
    const randCust    = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
    const randContact = MOCK_CONTACTS[Math.floor(Math.random() * MOCK_CONTACTS.length)];
    const randProject = mockProjects[Math.floor(Math.random() * mockProjects.length)];
    const randReq     = `REK-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    setSelectedCustomer(randCust);
    setCustomerSearch(`${randCust.name} (${randCust.customerNumber})`);
    setContactPerson(randContact.navn);
    setSelectedProject(randProject);
    setProjectSearch(randProject.navn);
    setRequisitionNumber(randReq);
    setCustomerOpen(false);
    onCardDataProcessed?.();
  }, [onCardDataProcessed]);

  const closeScanPanel = useCallback(() => {
    setScanPanelOpen(false);
    setCardScanInput('');
    setScanHasResult(false);
  }, []);

  const handleScanSearch = useCallback(() => {
    const query = cardScanInput.trim().toLowerCase();
    if (!query) {
      handleFakeScan();
      closeScanPanel();
    } else {
      const randomCustomer = mockCustomers[Math.floor(Math.random() * mockCustomers.length)];
      setSelectedCustomer(randomCustomer);
      setCustomerSearch(`${randomCustomer.name} (${randomCustomer.customerNumber})`);
      playBarcodeBeep();
      setScanHasResult(true);
    }
  }, [cardScanInput, handleFakeScan, closeScanPanel]);

  // Auto-focus scan panel input when it opens
  useEffect(() => {
    if (scanPanelOpen && scanPanelInputRef.current) {
      scanPanelInputRef.current.focus();
    }
  }, [scanPanelOpen]);

  // ─── Filtering ──────────────────────────────────────────────────────────────

  const filteredCustomers = mockCustomers.filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.customerNumber.includes(customerSearch)
  );

  const filteredProjects = projectSearch
    ? mockProjects.filter(p =>
        p.navn.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.nr.includes(projectSearch) ||
        p.kategori.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.adresse.toLowerCase().includes(projectSearch.toLowerCase()) ||
        p.postnr.includes(projectSearch) ||
        p.sted.toLowerCase().includes(projectSearch.toLowerCase())
      )
    : mockProjects;

  // ─── Handlers ───────────────────────────────────────────────────────────────

  const handleCustomerSelect = (c: Customer) => {
    setSelectedCustomer(c);
    setCustomerSearch(`${c.name} (${c.customerNumber})`);
    setCustomerOpen(false);
    setHoveredCustomer(null);
  };

  const handleProjectSelect = (p: Project) => {
    setSelectedProject(p);
    setProjectSearch(p.navn);
    setProjectOpen(false);
    setHoveredProject(null);
  };

  const handleProjectCreated = (data: NewProjectData) => {
    const newProject: Project = {
      id: data.projectId,
      nr: data.projectId,
      ekstNr: '',
      navn: data.projectName,
      kategori: '',
      adresse: data.address,
      postnr: data.postalCode,
      sted: data.city,
      utlopsdato: '',
      address2: data.address2,
      contactPerson: data.contactPerson,
      email: data.email,
      phoneNumber: data.phoneNumber,
    };
    setSelectedProject(newProject);
    setProjectSearch(newProject.navn);
    setShowCreateProjectModal(false);
  };

  const handleConfirm = () => {
    onConfirm(selectedCustomer, selectedProject || undefined);
  };

  const handleSaveContactPerson = (contactData: ContactPersonData) => {
    setContactPerson(contactData.name);
  };

  // ─── Close on outside click ──────────────────────────────────────────────────

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (customerAnchorRef.current && !customerAnchorRef.current.contains(e.target as Node)) setCustomerOpen(false);
      if (projectAnchorRef.current && !projectAnchorRef.current.contains(e.target as Node)) setProjectOpen(false);
      if (contactAnchorRef.current && !contactAnchorRef.current.contains(e.target as Node)) setContactOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  // ─── Escape key ─────────────────────────────────────────────────────────────

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (scanPanelOpen) {
          closeScanPanel();
        } else if (!showCreateContactPersonModal && !showCreateProjectModal) {
          onClose();
        }
      }
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose, showCreateContactPersonModal, showCreateProjectModal, scanPanelOpen, closeScanPanel]);

  // ─── Card scan auto-populate ─────────────────────────────────────────────────
  // Runs once when scannedCardData arrives. Looks up customer + project in mock
  // data and populates all relevant form fields.

  useEffect(() => {
    if (!scannedCardData) return;

    // 1. Match customer by customerNumber
    const customer = mockCustomers.find(c => c.customerNumber === scannedCardData.customerNumber);
    if (customer) {
      setSelectedCustomer(customer);
      setCustomerSearch(`${customer.name} (${customer.customerNumber})`);
    }

    // 2. Pre-fill contact person
    if (scannedCardData.contactPerson) {
      setContactPerson(scannedCardData.contactPerson);
    }

    // 3. Match project by nr
    if (scannedCardData.projectNr) {
      const project = mockProjects.find(p => p.nr === scannedCardData.projectNr);
      if (project) {
        setSelectedProject(project);
        setProjectSearch(project.navn);
      }
    }

    // 4. Pre-fill requisition
    if (scannedCardData.requisitionNumber) {
      setRequisitionNumber(scannedCardData.requisitionNumber);
    }

    // 5. Signal the parent that we have consumed the card data
    onCardDataProcessed?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scannedCardData]);

  // ─── Side panel data ─────────────────────────────────────────────────────────

  const customerCardRows: CardRowData[] = selectedCustomer ? [
    { label: t('customerNo'), value: selectedCustomer.customerNumber },
    { label: t('customerName'), value: selectedCustomer.name, badge: selectedCustomer.type },
  ] : [];

  const customerExpandedCard: CardSection[] | null = selectedCustomer ? (() => {
    // Calculate available credit: Credit limit minus total balance (used credit)
    const calculateAvailableCredit = () => {
      if (!selectedCustomer.creditLimit || !selectedCustomer.totalBalance) return 'N/A';
      
      // Parse credit limit and total balance (remove spaces and convert to number)
      const limitStr = selectedCustomer.creditLimit.replace(/\s/g, '');
      const balanceStr = selectedCustomer.totalBalance.replace(/\s/g, '');
      
      const limit = parseFloat(limitStr);
      const balance = parseFloat(balanceStr);
      
      if (isNaN(limit) || isNaN(balance)) return 'N/A';
      
      const available = limit - balance;
      // Format with space as thousand separator
      return available.toLocaleString('no-NO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/,/g, ' ');
    };

    const availableCredit = calculateAvailableCredit();

    return [
      {
        title: null,
        rows: [
          { label: t('category'), value: selectedCustomer.category || 'N/A' },
          { label: t('mobile'), value: selectedCustomer.mobile || 'N/A' },
          { label: t('emailLabel'), value: selectedCustomer.email || 'N/A' },
        ],
      },
      {
        title: t('addressTitle'),
        rows: [
          { label: t('street'), value: selectedCustomer.street || 'N/A' },
          { label: t('postalCodeAndCity'), value: selectedCustomer.postalCode && selectedCustomer.city ? `${selectedCustomer.postalCode} ${selectedCustomer.city}` : 'N/A' },
        ],
      },
      {
        title: t('creditTitle'),
        rows: [
          { label: t('creditLimit'), value: selectedCustomer.creditLimit || 'N/A' },
          { label: t('availableCredit'), value: availableCredit },
          { label: t('totalBalance'), value: selectedCustomer.totalBalance || 'N/A' },
          { label: t('invoicedBalance'), value: selectedCustomer.invoicedBalance || 'N/A' },
          { label: t('dueBalance'), value: selectedCustomer.dueBalance || 'N/A' },
        ],
      },
    ];
  })() : null;

  const projectCardRows: CardRowData[] = selectedProject ? [
    { label: t('projectNo'), value: selectedProject.nr },
    { label: t('projectName'), value: selectedProject.navn },
  ] : [];

  const projectExpandedCard: CardSection[] | null = selectedProject ? (() => {
    const addressRows: CardRowData[] = [
      { label: t('category'), value: selectedProject.kategori || 'N/A' },
      { label: t('address'), value: selectedProject.adresse || 'N/A' },
      { label: t('location'), value: `${selectedProject.postnr} ${selectedProject.sted}`.trim() || 'N/A' },
      ...(selectedProject.utlopsdato ? [{ label: t('expirationDate'), value: selectedProject.utlopsdato }] : []),
    ];
    const contactRows: CardRowData[] = [
      ...(selectedProject.contactPerson ? [{ label: t('contactPerson'), value: selectedProject.contactPerson }] : []),
      ...(selectedProject.email ? [{ label: t('emailLabel'), value: selectedProject.email }] : []),
      ...(selectedProject.phoneNumber ? [{ label: t('phoneNumber'), value: selectedProject.phoneNumber }] : []),
    ];
    const sections: CardSection[] = [{ title: null, rows: addressRows }];
    if (contactRows.length > 0) sections.push({ title: 'KONTAKT', rows: contactRows });
    return sections;
  })() : null;

  const tabs: { key: TabKey; label: string; show: boolean }[] = [
    { key: 'generelt', label: t('tabGeneral'), show: true },
    { key: 'leveringsadresse', label: t('tabDeliveryAddress'), show: !isPriceCheckMode },
    { key: 'oioInformation', label: t('tabOioInformation'), show: erpScenario === 'Aspect4 DK' },
  ];

  // ─── Shared input field helper ────────────────────────────────────────────────

  const isDefault = erpScenario !== 'Trygg2000' && erpScenario !== 'AX';

  // Whether we entered the modal via a card scan (banner stays visible for the session)
  const [showScanBanner] = useState(() => !!scannedCardData);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black opacity-10" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div
          ref={modalRef}
          className="w-[1016px] max-h-[90vh] pointer-events-auto flex flex-col rounded-[var(--radius-sm)]"
          style={{ background: 'var(--background)', boxShadow: '2px 2px 4px rgba(107,107,114,0.06), 3px 10px 15px rgba(107,107,114,0.08)' }}
        >
          {/* ── Header ── */}
          <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', padding: '22px 21px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div className="inline-grid grid-cols-[max-content] grid-rows-[max-content] place-items-start relative leading-[0]">
                <div className="[grid-area:1_/_1] relative overflow-clip size-[24px]">
                  <Group />
                </div>
                <span
                  className="[grid-area:1_/_1]"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'var(--text-lg)', color: 'var(--card-foreground)', lineHeight: 1.3, whiteSpace: 'nowrap', marginLeft: 35, marginTop: 3 }}
                >
                  {t('selectCustomer')}
                </span>
              </div>

              {/* ── Card-scan badge (shown when modal was opened via Ctrl+-) ── */}
              {showScanBanner && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'color-mix(in srgb, var(--primary) 10%, var(--card))',
                  border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)',
                  borderRadius: 'var(--radius)',
                  padding: '6px 12px',
                  flexShrink: 0,
                }}>
                  {/* Barcode / card icon */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
                    <rect x="1" y="4" width="2" height="10" rx="0.5" fill="var(--primary)" />
                    <rect x="4.5" y="4" width="1" height="10" rx="0.5" fill="var(--primary)" />
                    <rect x="6.5" y="4" width="2" height="10" rx="0.5" fill="var(--primary)" />
                    <rect x="9.5" y="4" width="1" height="10" rx="0.5" fill="var(--primary)" />
                    <rect x="11.5" y="4" width="2" height="10" rx="0.5" fill="var(--primary)" />
                    <rect x="14.5" y="4" width="2" height="10" rx="0.5" fill="var(--primary)" />
                  </svg>
                  <div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--primary)', lineHeight: 1.3 }}>
                      {t('cardScanned')}
                    </div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400, fontSize: 'var(--text-xs)', color: 'var(--muted-foreground)', lineHeight: 1.4 }}>
                      {t('cardScannedDetails')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Tabs ── */}
          <div style={{ background: 'var(--card)', boxShadow: '0 3px 3px rgba(107,107,114,0.06)', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 30, padding: '10px 20px 0', alignItems: 'flex-end' }}>
              {tabs.filter(t => t.show).map(({ key, label }) => {
                const active = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      height: 48,
                      justifyContent: 'flex-end',
                      flexShrink: 0,
                    }}
                  >
                    <span style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 600,
                      fontSize: 'var(--text-base)',
                      color: active ? 'var(--foreground)' : 'var(--primary)',
                      lineHeight: 1.75,
                      whiteSpace: 'nowrap',
                    }}>
                      {label}
                    </span>
                    <div style={{
                      height: 2,
                      width: '100%',
                      background: active ? 'var(--primary)' : 'transparent',
                      borderRadius: 1,
                      transition: 'background 0.15s',
                    }} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Body ── */}
          <div className="flex-1 flex overflow-hidden">

            {/* Main content column */}
            <div className="flex-1 p-5 overflow-y-auto">
              <div
                className="relative rounded-[4px]"
                style={{ background: 'var(--card)', border: '1px solid var(--border)', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}
              >

                {/* ═══ GENERELT TAB ═══ */}
                {activeTab === 'generelt' && (
                  <>
                    {/* ── DEFAULT LAYOUT (Nexstep, Aspect4, IFS) ── */}
                    {isDefault && (
                      <>
                        {/* Kunde */}
                        <div>
                          <FieldLabel scanned={showScanBanner && !!selectedCustomer}>{t('customer')}</FieldLabel>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <div ref={customerAnchorRef} style={{ flex: 1 }}>
                              <InputBox focused={customerOpen}>
                                <input
                                  ref={customerSearchInputRef}
                                  style={{ ...baseInputStyle, color: customerSearch ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                  value={customerSearch}
                                  placeholder={t('customerSearchPlaceholder')}
                                  onChange={e => {
                                    setCustomerSearch(e.target.value);
                                    setCustomerOpen(true);
                                    if (e.target.value === '') {
                                      setSelectedCustomer(null);
                                    }
                                  }}
                                  onFocus={() => setCustomerOpen(true)}
                                  onBlur={() => setTimeout(() => setCustomerOpen(false), 150)}
                                  onKeyDown={e => {
                                    if (e.ctrlKey && e.key === '-') {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleFakeScan();
                                    }
                                  }}
                                />
                                <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]">
                                  <Group3 />
                                </div>
                              </InputBox>
                            </div>
                            {scanCustomerCard && <ScanCardButton onClick={() => { if (scanHasResult) { setScanHasResult(false); setCardScanInput(''); } else { setScanPanelOpen(v => !v); } }} active={scanPanelOpen} />}
                          </div>
                        </div>

                        {/* Prosjekt + optional create button */}
                        <div>
                          <FieldLabel scanned={showScanBanner && !!selectedProject}>{t('project')}</FieldLabel>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <div ref={projectAnchorRef} style={{ flex: 1 }}>
                              <InputBox focused={projectOpen}>
                                <input
                                  style={{ ...baseInputStyle, color: projectSearch ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                  value={projectSearch}
                                  placeholder={t('projectSearchPlaceholder')}
                                  onChange={e => { setProjectSearch(e.target.value); setProjectOpen(true); }}
                                  onFocus={() => setProjectOpen(true)}
                                  onBlur={() => setTimeout(() => setProjectOpen(false), 150)}
                                />
                                <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]">
                                  <Group3 />
                                </div>
                              </InputBox>
                            </div>
                            {allowCreateProject && selectedCustomer && (
                              <button
                                onClick={() => setShowCreateProjectModal(true)}
                                title={t('createNewProject')}
                                style={{
                                  background: 'var(--card)',
                                  border: '1px solid var(--border)',
                                  borderRadius: 'var(--radius)',
                                  width: 48,
                                  height: 48,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  flexShrink: 0,
                                  transition: 'background 0.1s',
                                }}
                              >
                                <Plus size={20} style={{ color: 'var(--card-foreground)' }} />
                              </button>
                            )}
                          </div>
                        </div>

                        {!isPriceCheckMode && (
                          <>
                            {/* Kundens referanse */}
                            <div>
                              <FieldLabel>{t('customerReference')}</FieldLabel>
                              <InputBox focused={false}>
                                <input
                                  style={{ ...baseInputStyle, color: customerReference ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                  value={customerReference}
                                  placeholder={t('customerReferencePlaceholder')}
                                  onChange={e => setCustomerReference(e.target.value)}
                                />
                              </InputBox>
                            </div>

                            {/* Kontaktperson + Rekvisisjonsnummer */}
                            <div style={{ display: 'flex', gap: 22 }}>
                              <div style={{ flex: 1 }}>
                                <FieldLabel>{t('contactPerson')}</FieldLabel>
                                {/* ── CHANGE: flex wrapper + conditional plus button ── */}
                                <div style={{ display: 'flex', gap: 10 }}>
                                  <div ref={contactAnchorRef as React.RefObject<HTMLDivElement>} style={{ flex: 1 }}>
                                    <InputBox
                                      focused={contactOpen}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      <span
                                        style={{ flex: 1, fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', color: contactPerson ? 'var(--foreground)' : 'var(--muted-foreground)', lineHeight: 1.75, userSelect: 'none' }}
                                        onMouseDown={(e) => { e.preventDefault(); setContactOpen(v => !v); }}
                                      >
                                        {contactPerson || t('selectContact')}
                                      </span>
                                      <svg
                                        width="10" height="7" viewBox="0 0 10 7" fill="none"
                                        style={{ transform: contactOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.18s ease-in-out', flexShrink: 0 }}
                                      >
                                        <path d="M1 1L5 5L9 1" stroke="var(--muted-foreground)" strokeWidth="1.3" strokeLinecap="round" />
                                      </svg>
                                    </InputBox>
                                  </div>
                                  {allowCreateContactPerson && selectedCustomer && (
                                    <ContactPersonPlusBtn 
                                      onClick={() => setShowCreateContactPersonModal(true)} 
                                    />
                                  )}
                                </div>
                              </div>
                              <div style={{ flex: 1 }}>
                                <FieldLabel>{t('requisition')}</FieldLabel>
                                <InputBox focused={false}>
                                  <input
                                    style={{ ...baseInputStyle, color: requisitionNumber ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                    value={requisitionNumber}
                                    placeholder={t('requisitionPlaceholder')}
                                    onChange={e => setRequisitionNumber(e.target.value)}
                                  />
                                </InputBox>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    )}

                     {/* ── AX LAYOUT ── */}
                    {erpScenario === 'AX' && (
                      <>
                        {/* Kunde */}
                        <div>
                          <FieldLabel>{t('customer')}</FieldLabel>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <div ref={customerAnchorRef} style={{ flex: 1 }}>
                              <InputBox focused={customerOpen}>
                                <input
                                  ref={customerSearchInputRef}
                                  style={{ ...baseInputStyle, color: customerSearch ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                  value={customerSearch}
                                  placeholder={t('customerSearchPlaceholder')}
                                  onChange={e => {
                                    setCustomerSearch(e.target.value);
                                    setCustomerOpen(true);
                                    if (e.target.value === '') {
                                      setSelectedCustomer(null);
                                    }
                                  }}
                                  onFocus={() => setCustomerOpen(true)}
                                  onBlur={() => setTimeout(() => setCustomerOpen(false), 150)}
                                />
                                <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]">
                                  <Group3 />
                                </div>
                              </InputBox>
                            </div>
                            {scanCustomerCard && <ScanCardButton onClick={() => setScanPanelOpen(v => !v)} active={scanPanelOpen} />}
                          </div>
                        </div>

                        {/* Prosjekt */}
                        <div>
                          <FieldLabel>{t('project')}</FieldLabel>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <div ref={projectAnchorRef} style={{ flex: 1 }}>
                              <InputBox focused={projectOpen}>
                                <input
                                  style={{ ...baseInputStyle, color: projectSearch ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                  value={projectSearch}
                                  placeholder={t('projectSearchPlaceholder')}
                                  onChange={e => { setProjectSearch(e.target.value); setProjectOpen(true); }}
                                  onFocus={() => setProjectOpen(true)}
                                  onBlur={() => setTimeout(() => setProjectOpen(false), 150)}
                                />
                                <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]">
                                  <Group3 />
                                </div>
                              </InputBox>
                            </div>
                            {allowCreateProject && selectedCustomer && (
                              <button
                                onClick={() => setShowCreateProjectModal(true)}
                                title={t('createNewProject')}
                                style={{
                                  background: 'var(--card)',
                                  border: '1px solid var(--border)',
                                  borderRadius: 'var(--radius)',
                                  width: 48,
                                  height: 48,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  flexShrink: 0,
                                  transition: 'background 0.1s',
                                }}
                              >
                                <Plus size={20} style={{ color: 'var(--card-foreground)' }} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Kundens referanse */}
                        <div>
                          <FieldLabel>{t('customerReference')}</FieldLabel>
                          <InputBox focused={false}>
                            <input
                              style={{ ...baseInputStyle, color: customerReference ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                              value={customerReference}
                              placeholder={t('customerReferencePlaceholder')}
                              onChange={e => setCustomerReference(e.target.value)}
                            />
                          </InputBox>
                        </div>

                        {/* Kontaktperson (native select) + Rekvisisjonsnummer */}
                        <div style={{ display: 'flex', gap: 22 }}>
                          <div style={{ flex: 1 }}>
                            <FieldLabel>{t('contactPerson')}</FieldLabel>
                            {/* ── CHANGE: flex wrapper + conditional plus button ── */}
                            <div style={{ display: 'flex', gap: 10 }}>
                              <InputBox focused={false} style={{ cursor: 'default', flex: 1 }}>
                                <select
                                  value={contactPerson}
                                  onChange={e => setContactPerson(e.target.value)}
                                  style={{ flex: 1, fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', color: contactPerson ? 'var(--foreground)' : 'var(--muted-foreground)', background: 'transparent', border: 'none', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                                >
                                  <option value=""></option>
                                  <option value="John Doe">John Doe</option>
                                  <option value="Jane Smith">Jane Smith</option>
                                  <option value="Mike Johnson">Mike Johnson</option>
                                </select>
                                <svg width="10" height="7" viewBox="0 0 10 7" fill="none" style={{ flexShrink: 0, pointerEvents: 'none' }}>
                                  <path d="M1 1L5 5L9 1" stroke="var(--muted-foreground)" strokeWidth="1.3" strokeLinecap="round" />
                                </svg>
                              </InputBox>
                              {allowCreateContactPerson && selectedCustomer && (
                                <ContactPersonPlusBtn 
                                  onClick={() => setShowCreateContactPersonModal(true)} 
                                />
                              )}
                            </div>
                          </div>
                          <div style={{ flex: 1 }}>
                            <FieldLabel>{t('requisition')}</FieldLabel>
                            <InputBox focused={false}>
                              <input
                                style={{ ...baseInputStyle, color: requisitionNumber ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                value={requisitionNumber}
                                placeholder={t('requisitionPlaceholder')}
                                onChange={e => setRequisitionNumber(e.target.value)}
                              />
                            </InputBox>
                          </div>
                        </div>
                      </>
                    )}

                    {/* ── TRYGG2000 LAYOUT ── */}
                    {erpScenario === 'Trygg2000' && (
                      <>
                        {/* Customer */}
                        <div>
                          <FieldLabel>{t('customer')}</FieldLabel>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <div ref={customerAnchorRef} style={{ flex: 1 }}>
                              <InputBox focused={customerOpen}>
                                <input
                                  ref={customerSearchInputRef}
                                  style={{ ...baseInputStyle, color: customerSearch ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                  value={customerSearch}
                                  placeholder={t('customerSearchPlaceholder')}
                                  onChange={e => {
                                    setCustomerSearch(e.target.value);
                                    setCustomerOpen(true);
                                    if (e.target.value === '') {
                                      setSelectedCustomer(null);
                                    }
                                  }}
                                  onFocus={() => setCustomerOpen(true)}
                                  onBlur={() => setTimeout(() => setCustomerOpen(false), 150)}
                                />
                                <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]">
                                  <Group3 />
                                </div>
                              </InputBox>
                            </div>
                            {scanCustomerCard && <ScanCardButton onClick={() => setScanPanelOpen(v => !v)} active={scanPanelOpen} />}
                          </div>
                        </div>

                        {/* Project */}
                        <div>
                          <FieldLabel>{t('project')}</FieldLabel>
                          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                            <div ref={projectAnchorRef} style={{ flex: 1 }}>
                              <InputBox focused={projectOpen}>
                                <input
                                  style={{ ...baseInputStyle, color: projectSearch ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                  value={projectSearch}
                                  placeholder={t('projectSearchPlaceholder')}
                                  onChange={e => { setProjectSearch(e.target.value); setProjectOpen(true); }}
                                  onFocus={() => setProjectOpen(true)}
                                  onBlur={() => setTimeout(() => setProjectOpen(false), 150)}
                                />
                                <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]">
                                  <Group3 />
                                </div>
                              </InputBox>
                            </div>
                            {allowCreateProject && selectedCustomer && (
                              <button
                                onClick={() => setShowCreateProjectModal(true)}
                                title={t('createNewProject')}
                                style={{
                                  background: 'var(--card)',
                                  border: '1px solid var(--border)',
                                  borderRadius: 'var(--radius)',
                                  width: 48,
                                  height: 48,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  cursor: 'pointer',
                                  flexShrink: 0,
                                  transition: 'background 0.1s',
                                }}
                              >
                                <Plus size={20} style={{ color: 'var(--card-foreground)' }} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Customer reference + Requisition */}
                        <div style={{ display: 'flex', gap: 22 }}>
                          <div style={{ flex: 1 }}>
                            <FieldLabel>{t('customerReference')}</FieldLabel>
                            <InputBox focused={false}>
                              <input style={{ ...baseInputStyle, color: customerReference ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={customerReference} onChange={e => setCustomerReference(e.target.value)} />
                            </InputBox>
                          </div>
                          <div style={{ flex: 1 }}>
                            <FieldLabel>{t('requisition')}</FieldLabel>
                            <InputBox focused={false}>
                              <input style={{ ...baseInputStyle, color: 'var(--foreground)' }} value={requisitionNumber} onChange={e => setRequisitionNumber(e.target.value)} />
                            </InputBox>
                          </div>
                        </div>

                        {/* Contact person reference + Contact person + plus button */}
                        <div style={{ display: 'flex', gap: 22 }}>
                          <div style={{ flex: 1 }}>
                            <FieldLabel>{t('contactPersonReference')}</FieldLabel>
                            <InputBox focused={false}>
                              <input style={{ ...baseInputStyle, color: contactPersonReference ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={contactPersonReference} placeholder={t('contactPersonReferencePlaceholder')} onChange={e => setContactPersonReference(e.target.value)} />
                            </InputBox>
                          </div>
                          <div style={{ flex: 1 }}>
                            <FieldLabel>{t('contactPerson')}</FieldLabel>
                            <div style={{ display: 'flex', gap: 10 }}>
                              <InputBox focused={false} style={{ flex: 1 }}>
                                <input
                                  style={{ ...baseInputStyle, color: contactPerson ? 'var(--foreground)' : 'var(--muted-foreground)' }}
                                  value={contactPerson}
                                  placeholder={t('contactPersonPlaceholder')}
                                  onChange={e => setContactPerson(e.target.value)}
                                />
                              </InputBox>
                              {/* ── CHANGE: conditional plus button ── */}
                              {allowCreateContactPerson && selectedCustomer && (
                                <ContactPersonPlusBtn 
                                  onClick={() => setShowCreateContactPersonModal(true)} 
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* ID-control + Project reference */}
                        <div style={{ display: 'flex', gap: 22 }}>
                          <div style={{ flex: 1 }}>
                            <FieldLabel>{t('idControl')}</FieldLabel>
                            <InputBox focused={false} style={{ opacity: selectedCustomer ? 1 : 0.5 }}>
                              <input 
                                style={{ 
                                  ...baseInputStyle, 
                                  color: idControlName ? 'var(--foreground)' : 'var(--muted-foreground)',
                                  cursor: selectedCustomer ? 'text' : 'not-allowed'
                                }} 
                                value={idControlName} 
                                onChange={e => setIdControlName(e.target.value)} 
                                disabled={!selectedCustomer}
                                placeholder={selectedCustomer ? t('idControlPlaceholder') : t('selectCustomerFirst')}
                              />
                            </InputBox>
                          </div>
                          <div style={{ flex: 1 }}>
                            <FieldLabel>{t('projectReference')}</FieldLabel>
                            <InputBox focused={false}>
                              <input style={{ ...baseInputStyle, color: projectReference ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={projectReference} onChange={e => setProjectReference(e.target.value)} />
                            </InputBox>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}

                {/* ═══ LEVERINGSADRESSE TAB ═══ */}
                {activeTab === 'leveringsadresse' && (
                  <>
                    {/* Info banner */}
                    <div style={{ background: 'color-mix(in srgb, var(--primary) 15%, var(--card))', borderRadius: 'var(--radius-sm)', padding: 15 }}>
                      <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', color: 'var(--foreground)', lineHeight: 1.75, margin: 0 }}>
                        {t('deliveryAddressInfo')}
                      </p>
                    </div>

                    {/* Navn */}
                    <div>
                      <FieldLabel>{t('name')}</FieldLabel>
                      <InputBox focused={false}>
                        <input style={{ ...baseInputStyle, color: deliveryName ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={deliveryName} placeholder={t('namePlaceholder')} onChange={e => setDeliveryName(e.target.value)} />
                      </InputBox>
                    </div>

                    {/* Adresse 1 + Telefon */}
                    <div style={{ display: 'flex', gap: 22 }}>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('address1')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: deliveryAddress1 ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={deliveryAddress1} placeholder={t('address1Placeholder')} onChange={e => setDeliveryAddress1(e.target.value)} />
                        </InputBox>
                      </div>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('phone')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: deliveryPhone ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={deliveryPhone} placeholder={t('phonePlaceholder')} onChange={e => setDeliveryPhone(e.target.value)} />
                        </InputBox>
                      </div>
                    </div>

                    {/* Adresse 2 + E-post */}
                    <div style={{ display: 'flex', gap: 22 }}>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('address2')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: deliveryAddress2 ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={deliveryAddress2} placeholder={t('address2Placeholder')} onChange={e => setDeliveryAddress2(e.target.value)} />
                        </InputBox>
                      </div>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('email')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: deliveryEmail ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={deliveryEmail} placeholder={t('emailPlaceholder')} onChange={e => setDeliveryEmail(e.target.value)} />
                        </InputBox>
                      </div>
                    </div>

                    {/* Postnummer + By */}
                    <div style={{ display: 'flex', gap: 22 }}>
                      <div style={{ width: 160 }}>
                        <FieldLabel>{t('postalCode')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: deliveryPostalCode ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={deliveryPostalCode} placeholder={t('postalCodePlaceholder')} onChange={e => setDeliveryPostalCode(e.target.value)} />
                        </InputBox>
                      </div>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('city')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: deliveryCity ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={deliveryCity} placeholder={t('cityPlaceholder')} onChange={e => setDeliveryCity(e.target.value)} />
                        </InputBox>
                      </div>
                    </div>
                  </>
                )}

                {/* ═══ OIO INFORMATION TAB (Aspect4 DK) ═══ */}
                {activeTab === 'oioInformation' && (
                  <>
                    {/* OIO EAN */}
                    <div>
                      <FieldLabel>{t('oioEan')}</FieldLabel>
                      <InputBox focused={false} style={{ cursor: 'default' }}>
                        <select
                          value={oioEan}
                          onChange={e => setOioEan(e.target.value)}
                          style={{ flex: 1, fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', color: oioEan ? 'var(--foreground)' : 'var(--muted-foreground)', background: 'transparent', border: 'none', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                        >
                          <option value="">{t('selectEan')}</option>
                          <option value="5790000123456">5790000123456</option>
                          <option value="5790000654321">5790000654321</option>
                        </select>
                        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" style={{ flexShrink: 0, pointerEvents: 'none' }}>
                          <path d="M1 1L5 5L9 1" stroke="var(--muted-foreground)" strokeWidth="1.3" strokeLinecap="round" />
                        </svg>
                      </InputBox>
                    </div>

                    {/* OIO Reference */}
                    <div>
                      <FieldLabel>{t('oioReference')}</FieldLabel>
                      <InputBox focused={false}>
                        <input style={{ ...baseInputStyle, color: oioReference ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={oioReference} onChange={e => setOioReference(e.target.value)} />
                      </InputBox>
                    </div>

                    {/* OIO Accounting + Customer reference */}
                    <div style={{ display: 'flex', gap: 22 }}>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('oioAccounting')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: oioAccounting ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={oioAccounting} placeholder={t('accountingPlaceholder')} onChange={e => setOioAccounting(e.target.value)} />
                        </InputBox>
                      </div>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('customerReference')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: oioCustomerReference ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={oioCustomerReference} placeholder={t('customerReferencePlaceholder')} onChange={e => setOioCustomerReference(e.target.value)} />
                        </InputBox>
                      </div>
                    </div>

                    {/* Requisition + Contact person reference */}
                    <div style={{ display: 'flex', gap: 22 }}>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('requisitionRequired')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: oioRequisition ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={oioRequisition} placeholder={t('requisitionPlaceholder')} onChange={e => setOioRequisition(e.target.value)} />
                        </InputBox>
                      </div>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('contactPersonReferenceRequired')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: oioContactPersonReference ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={oioContactPersonReference} placeholder={t('contactPersonReferencePlaceholder')} onChange={e => setOioContactPersonReference(e.target.value)} />
                        </InputBox>
                      </div>
                    </div>

                    {/* Contact person select + plus button */}
                    <div style={{ display: 'flex', gap: 22 }}>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('contactPerson')}</FieldLabel>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <InputBox focused={false} style={{ flex: 1, cursor: 'default' }}>
                            <select
                              value={oioContactPerson}
                              onChange={e => setOioContactPerson(e.target.value)}
                              style={{ flex: 1, fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', color: oioContactPerson ? 'var(--foreground)' : 'var(--muted-foreground)', background: 'transparent', border: 'none', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                            >
                              <option value="">{t('selectContactPerson')}</option>
                              <option value="anders">Anders Andersen</option>
                              <option value="birgitte">Birgitte Nielsen</option>
                              <option value="christian">Christian Larsen</option>
                              <option value="dorte">Dorte Hansen</option>
                            </select>
                            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" style={{ flexShrink: 0, pointerEvents: 'none' }}>
                              <path d="M1 1L5 5L9 1" stroke="var(--muted-foreground)" strokeWidth="1.3" strokeLinecap="round" />
                            </svg>
                          </InputBox>
                          {/* ── CHANGE: conditional plus button ── */}
                          {allowCreateContactPerson && selectedCustomer && (
                            <ContactPersonPlusBtn 
                              onClick={() => setShowCreateContactPersonModal(true)} 
                            />
                          )}
                        </div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <FieldLabel>{t('projectReference')}</FieldLabel>
                        <InputBox focused={false}>
                          <input style={{ ...baseInputStyle, color: oioProjectReference ? 'var(--foreground)' : 'var(--muted-foreground)' }} value={oioProjectReference} placeholder={t('projectReferencePlaceholder')} onChange={e => setOioProjectReference(e.target.value)} />
                        </InputBox>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Side panel ── */}
            <div
              style={{ width: 296, borderLeft: '1px solid var(--border)', padding: 20, display: scanPanelOpen ? 'none' : 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto', alignSelf: 'stretch', flexShrink: 0, background: 'var(--background)' }}
            >
              {!selectedCustomer && !selectedProject && (
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-sm)', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                  {t('selectCustomerToView')}
                </p>
              )}

              {selectedCustomer && (
                <InfoCard
                  title={t('customerInfoTitle')}
                  expandLabel={t('expandCustomerDetails')}
                  rows={customerCardRows}
                  expandedCard={customerExpandedCard}
                />
              )}

              {selectedProject && (
                <InfoCard
                  title={t('projectInfoTitle')}
                  expandLabel={t('expandProjectDetails')}
                  rows={projectCardRows}
                  expandedCard={projectExpandedCard}
                />
              )}
            </div>

          {/* ── Scan panel (right sidebar) ── */}
          {scanPanelOpen && (
            <div style={{
              width: 336,
              flexShrink: 0,
              background: 'var(--background)',
              borderLeft: '1px solid var(--border)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <style>{`
                @keyframes scanCaret {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
                .scan-caret-blink { animation: scanCaret 1s step-end infinite; }
              `}</style>
              <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>
                {scanHasResult && selectedCustomer ? (
                  /* ── Result view: info cards matching right panel ── */
                  <>
                    <InfoCard
                      title={t('customerInfoTitle')}
                      expandLabel={t('expandCustomerDetails')}
                      rows={customerCardRows}
                      expandedCard={customerExpandedCard}
                    />
                    {selectedProject && (
                      <InfoCard
                        title={t('projectInfoTitle')}
                        expandLabel={t('expandProjectDetails')}
                        rows={projectCardRows}
                        expandedCard={projectExpandedCard}
                      />
                    )}
                  </>
                ) : (
                  /* ── Search view ── */
                  <div style={{
                    background: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    padding: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}>
                    <FieldLabel>Søk kundekort</FieldLabel>

                    <div style={{
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '0 14px',
                      background: 'var(--card)',
                      border: '2px solid var(--primary)',
                      borderRadius: 'var(--radius)',
                      boxShadow: 'inset 2px 2px 3px rgba(0,0,0,0.08)',
                      position: 'relative',
                    }}>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', minWidth: 0 }}>
                        {!cardScanInput && !scanInputFocused && (
                          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', pointerEvents: 'none', gap: 1 }}>
                            <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 'var(--text-base)', color: 'var(--muted-foreground)', lineHeight: 1.75, whiteSpace: 'nowrap' }}>
                              Scan card or type to search
                            </span>
                            <span
                              className="scan-caret-blink"
                              style={{ display: 'inline-block', width: 1.5, height: 15, background: 'var(--foreground)', marginLeft: 2, flexShrink: 0 }}
                            />
                          </div>
                        )}
                        <input
                          ref={scanPanelInputRef}
                          value={cardScanInput}
                          onChange={e => setCardScanInput(e.target.value)}
                          onFocus={() => setScanInputFocused(true)}
                          onBlur={() => setScanInputFocused(false)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') { e.preventDefault(); handleScanSearch(); }
                            if (e.key === 'Escape') { e.stopPropagation(); closeScanPanel(); }
                            if (e.ctrlKey && e.key === '-') {
                              e.preventDefault();
                              e.stopPropagation();
                              handleFakeScan();
                              closeScanPanel();
                            }
                          }}
                          style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            fontFamily: "'Montserrat', sans-serif",
                            fontSize: 'var(--text-base)',
                            color: 'var(--foreground)',
                            lineHeight: 1.75,
                            caretColor: 'var(--foreground)',
                          }}
                        />
                      </div>
                      <div style={{ opacity: 0.5, width: 14, height: 14, flexShrink: 0, position: 'relative' }}>
                        <Group3 />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingTop: 10 }}>
                      <button
                        onClick={handleScanSearch}
                        style={{
                          height: 48,
                          minWidth: 100,
                          padding: '6px 20px',
                          background: 'var(--primary)',
                          border: 'none',
                          borderRadius: 'var(--radius)',
                          cursor: 'pointer',
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'],
                          fontSize: 'var(--text-lg)',
                          color: 'var(--primary-foreground)',
                          lineHeight: 1.75,
                          whiteSpace: 'nowrap',
                          transition: 'background 0.12s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--primary) 88%, black)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
                      >
                        Søk
                      </button>
                      <button
                        onClick={closeScanPanel}
                        style={{
                          height: 48,
                          minWidth: 100,
                          padding: '6px 20px',
                          background: 'var(--card)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius)',
                          cursor: 'pointer',
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 'var(--font-weight-semibold)' as React.CSSProperties['fontWeight'],
                          fontSize: 'var(--text-sm)',
                          color: 'var(--foreground)',
                          lineHeight: 1.75,
                          whiteSpace: 'nowrap',
                          transition: 'background 0.12s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'var(--secondary)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
                      >
                        Avbryt
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          </div>

          {/* ── Footer ── */}
          <div style={{ flexShrink: 0 }}>
            <ModalCTAFooter
              onCancel={onClose}
              onConfirm={handleConfirm}
              cancelText={t('cancel')}
              confirmText={t('confirm')}
              confirmDisabled={!selectedCustomer}
            />
          </div>
        </div>
      </div>

      {/* ─── Floating dropdowns — rendered outside modal ──────────────────────── */}
      <CustomerDropdownTable
        rect={customerRect}
        modalRight={modalRect?.right ?? null}
        rows={filteredCustomers}
        hoveredIdx={hoveredCustomer}
        onHover={setHoveredCustomer}
        onSelect={handleCustomerSelect}
      />
      <ProjectDropdownTable
        rect={projectRect}
        modalRight={modalRect?.right ?? null}
        rows={filteredProjects}
        hoveredIdx={hoveredProject}
        onHover={setHoveredProject}
        onSelect={handleProjectSelect}
      />
      <ContactSelectList
        anchorRef={contactAnchorRef as React.RefObject<HTMLElement>}
        open={contactOpen}
        selected={contactPerson}
        onSelect={setContactPerson}
        onClose={() => setContactOpen(false)}
      />

      {/* ─── Sub-modals ────────────────────────────────────────────────────────── */}
      {showCreateProjectModal && (
        <CreateNewProjectModal
          onClose={() => setShowCreateProjectModal(false)}
          customerName={selectedCustomer?.name}
          onProjectCreated={handleProjectCreated}
        />
      )}
      {showCreateContactPersonModal && (
        <CreateNewContactPersonModal
          isOpen={showCreateContactPersonModal}
          onClose={() => setShowCreateContactPersonModal(false)}
          onSave={handleSaveContactPerson}
        />
      )}
    </>
  );
}

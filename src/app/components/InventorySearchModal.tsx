import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import svgPaths from "../imports/svg-cyizkdbmkk";
import { useLanguage } from '../contexts/LanguageContext';
import { matchesProductQuery } from '../utils/productSearch';

function Group3() {
  return (
    <div className="absolute bottom-[0.01%] left-0 right-0 top-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p12a2d640} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)" />
          <path clipRule="evenodd" d={svgPaths.pb06def0} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_2" />
          <path clipRule="evenodd" d={svgPaths.p9473200} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_3" />
          <path clipRule="evenodd" d={svgPaths.p3c2a6d00} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_4" />
          <path clipRule="evenodd" d={svgPaths.p3d2d8400} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_5" />
          <path clipRule="evenodd" d={svgPaths.p109fd700} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_6" />
          <path clipRule="evenodd" d={svgPaths.p144b3880} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_7" />
          <path clipRule="evenodd" d={svgPaths.p23720400} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_8" />
          <path clipRule="evenodd" d={svgPaths.p1b349c80} fill="var(--fill-0, #22222C)" fillRule="evenodd" id="Vector (Stroke)_9" />
        </g>
      </svg>
    </div>
  );
}

interface InventoryItem {
  id: number;
  varenr: string;
  varetekst: string;
  leverandor: string;
  pris: string;
  beholdning: string | null;
  info: string[];
  isNonStock: boolean;
}

/**
 * Data produced by a fake article/product barcode scan (Ctrl+- when the
 * inventory search modal is open). Exported so RootLayout can type the state.
 */
export interface ScannedArticleData {
  /** Article / product number to look up */
  varenr: string;
  /** Optional pre-set quantity from the scanner */
  quantity?: number;
  /** Raw barcode string (for audit / display) */
  barcode?: string;
}

interface InventorySearchModalProps {
  onClose: () => void;
  onAddItems: (items: InventoryItem[]) => void;
  initialSearchValue?: string;
  /** Pre-populated data from a barcode scan (Ctrl+- shortcut) */
  scannedArticleData?: ScannedArticleData | null;
  /** Called once the scanned data has been applied to the form */
  onArticleDataProcessed?: () => void;
  /**
   * Anchored mode (sale screen): the list sits just above the cart's search
   * field, left aligned, with no dimmer and no search field of its own. The
   * cart field is the only active search; it filters via `query`.
   */
  anchored?: boolean;
  query?: string;
  onQueryChange?: (v: string) => void;
}

const mockItems: InventoryItem[] = [
  { id: 469650132, varenr: '469650132', varetekst: 'ADAPTER GDE 16 PLUS FOR BORHAMMER', leverandor: 'BOSCH ROBERT AS', pris: '29,50 kr / STK', beholdning: '99 STK', info: ['Nordic Swan Ecolabel'], isNonStock: false },
  { id: 521954131, varenr: '521954131', varetekst: 'BORHAMMER GBH 18V-20 SOLO L-BOXX', leverandor: 'Eikås Sagbruk AS', pris: '22,75 kr / STK', beholdning: '67 STK', info: ['PEFC certificate'], isNonStock: false },
  { id: 516804172, varenr: '516804172', varetekst: 'BORHAMMER GBH 18V-26 SOLO L-BOXX LEVERES UTEN BATTERI OG LADER', leverandor: 'BOSCH ROBERT AS', pris: '31,00 kr / STK', beholdning: '48 STK', info: ['FSC Certified', 'EU Ecolabel'], isNonStock: false },
  { id: 565151585, varenr: '565151585', varetekst: 'BORHAMMER GBH 18V-34 CF SOLO BITURBO', leverandor: 'Eikås Sagbruk AS', pris: '24,90 kr / STK', beholdning: 'Not in stock', info: ['Non-stock', 'Expires 22.11.2023'], isNonStock: true },
  { id: 565151588, varenr: '565151588', varetekst: 'BORHAMMER GBH 18V-36 C SOLO CASE BITURBO', leverandor: 'Eikås Sagbruk AS', pris: '27,30 kr / STK', beholdning: '78 STK', info: ['Expires 10.09.2023'], isNonStock: false },
  { id: 56082645, varenr: '56082645', varetekst: 'Avslutningslist alu sølv 2M alloc dim 200x20x18mm', leverandor: 'Alloc AS', pris: '25,60 kr / STK', beholdning: '76 STK', info: ['Non-stock', 'Expires 10.09.2023', 'Nordic Swan Ecolabel', 'PEFC certificate'], isNonStock: true },
  { id: 789012345, varenr: '789012345', varetekst: 'BORHAMMER GBH 24V-32 PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '45,00 kr / STK', beholdning: null, info: ['FSC Certified'], isNonStock: false },
  { id: 890123456, varenr: '890123456', varetekst: 'DRILL BIT SET 15PC HSS-G', leverandor: 'Eikås Sagbruk AS', pris: '18,90 kr / STK', beholdning: null, info: ['Non-stock', 'Expires 15.03.2024'], isNonStock: true },
  { id: 901234567, varenr: '901234567', varetekst: 'IMPACT WRENCH 18V SOLO', leverandor: 'BOSCH ROBERT AS', pris: '52,50 kr / STK', beholdning: null, info: ['EU Ecolabel'], isNonStock: false },
  { id: 912345678, varenr: '912345678', varetekst: 'CIRCULAR SAW BLADE 190MM', leverandor: 'Alloc AS', pris: '35,20 kr / STK', beholdning: null, info: ['PEFC certificate', 'FSC Certified'], isNonStock: false },
  { id: 923456789, varenr: '923456789', varetekst: 'SANDING DISC 125MM P120', leverandor: 'Eikås Sagbruk AS', pris: '12,40 kr / STK', beholdning: null, info: ['Non-stock'], isNonStock: true },
  { id: 934567890, varenr: '934567890', varetekst: 'MEASURING TAPE 5M PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '28,75 kr / STK', beholdning: null, info: ['Nordic Swan Ecolabel', 'PEFC certificate'], isNonStock: false },
  { id: 945678901, varenr: '945678901', varetekst: 'HAMMER DRILL BIT SET 8PC SDS-PLUS', leverandor: 'BOSCH ROBERT AS', pris: '38,90 kr / STK', beholdning: null, info: ['Expires 18.07.2024'], isNonStock: false },
  { id: 956789012, varenr: '956789012', varetekst: 'WOOD CHISEL SET 6PC PROFESSIONAL', leverandor: 'Eikås Sagbruk AS', pris: '42,50 kr / STK', beholdning: null, info: ['Non-stock', 'EU Ecolabel'], isNonStock: true },
  { id: 967890123, varenr: '967890123', varetekst: 'PLANER GHO 26-82 D PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '55,00 kr / STK', beholdning: null, info: ['FSC Certified'], isNonStock: false },
  { id: 978901234, varenr: '978901234', varetekst: 'RECIPROCATING SAW GSA 18V-32', leverandor: 'BOSCH ROBERT AS', pris: '48,25 kr / STK', beholdning: null, info: ['Nordic Swan Ecolabel'], isNonStock: false },
  { id: 989012345, varenr: '989012345', varetekst: 'ROUTER GOF 1600 CE PROFESSIONAL', leverandor: 'Eikås Sagbruk AS', pris: '62,80 kr / STK', beholdning: null, info: ['Non-stock', 'Expires 05.12.2023'], isNonStock: true },
  { id: 990123456, varenr: '990123456', varetekst: 'BELT SANDER PBS 75 AE SET', leverandor: 'BOSCH ROBERT AS', pris: '44,90 kr / STK', beholdning: null, info: ['PEFC certificate'], isNonStock: false },
  { id: 991234567, varenr: '991234567', varetekst: 'ORBITAL SANDER GEX 125-1 AE', leverandor: 'Alloc AS', pris: '36,75 kr / STK', beholdning: null, info: ['EU Ecolabel', 'FSC Certified'], isNonStock: false },
  { id: 992345678, varenr: '992345678', varetekst: 'HEAT GUN GHG 23-66 PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '41,20 kr / STK', beholdning: null, info: ['Non-stock'], isNonStock: true },
  { id: 1001234567, varenr: '1001234567', varetekst: 'JIGSAW GST 160 BCE PROFESSIONAL', leverandor: 'BOSCH ROBERT AS', pris: '33,40 kr / STK', beholdning: null, info: ['Non-stock', 'Nordic Swan Ecolabel'], isNonStock: true },
  { id: 1002345678, varenr: '1002345678', varetekst: 'ANGLE GRINDER GWS 19-125 CI', leverandor: 'Eikås Sagbruk AS', pris: '39,80 kr / STK', beholdning: null, info: ['Non-stock', 'Expires 22.11.2023'], isNonStock: true },
  { id: 1003456789, varenr: '1003456789', varetekst: 'MULTI-TOOL GOP 12V-28 SOLO', leverandor: 'Alloc AS', pris: '47,60 kr / STK', beholdning: null, info: ['Non-stock', 'PEFC certificate'], isNonStock: true }
];

// Norwegian building-supply catalogue (searchable: spiker, vindu, planker, ...).
// Tuple: sku, name, supplier, price, unit, stock (null = not loaded yet), info tags.
// Items tagged 'Non-stock' are special-order articles with no stock.
const NB = (
  sku: string, name: string, supplier: string, price: number, unit: string,
  beholdning: string | null, info: string[] = [],
): InventoryItem => ({
  id: Number(sku),
  varenr: sku,
  varetekst: name,
  leverandor: supplier,
  pris: `${price.toFixed(2).replace('.', ',')} kr / ${unit}`,
  beholdning,
  info,
  isNonStock: info.includes('Non-stock'),
});

const norwegianItems: InventoryItem[] = [
  NB('23083603', 'Beslagsskrue 5,0x40 CS A-250 Corrseal', 'Eikås Sagbruk AS', 179, 'PAK', null, ['EU Ecolabel']),
  NB('10234567', 'Gipsplate 13mm 1200x2400', 'Alloc AS', 125, 'STK', null, ['Nordic Swan Ecolabel']),
  NB('10445678', 'Sparkel Gyproc Fuge 10L', 'Alloc AS', 285, 'STK', null, ['Expires 15.03.2027']),
  NB('20334455', 'Isolasjon 100mm Glava 34', 'Eikås Sagbruk AS', 450, 'PK', null, ['Nordic Swan Ecolabel', 'EU Ecolabel']),
  NB('30445566', 'Trelast 48x98x4800 C24', 'Eikås Sagbruk AS', 120, 'STK', null, ['FSC Certified', 'PEFC certificate']),
  NB('40556677', 'Maling Jotun Lady Pure Color 10L', 'BOSCH ROBERT AS', 890, 'STK', null, ['Expires 10.09.2027']),
  NB('50667788', 'Kabel 3x1,5mm Hvit 100m', 'BOSCH ROBERT AS', 650, 'RLL', null, ['Non-stock']),
  NB('60778899', 'Skruer TX20 4x50 Gulvplateskrue', 'Eikås Sagbruk AS', 95, 'PK', null, []),
  NB('70889900', 'Rør PEX 16x2,2mm 50m', 'Alloc AS', 420, 'RLL', null, ['Non-stock', 'EU Ecolabel']),
  NB('80990011', 'Sement Norbetong Standard 25kg', 'Alloc AS', 89, 'SEK', null, ['Expires 22.11.2026']),
  NB('91001122', 'Panel Skygge Furu 12x120', 'Eikås Sagbruk AS', 65, 'M', null, ['FSC Certified']),
  NB('11223344', 'Lim Bison Kit 310ml', 'BOSCH ROBERT AS', 45, 'STK', null, ['Expires 18.07.2026']),
  NB('22334455', 'Vindu 3-lags 12x12', 'Alloc AS', 3500, 'STK', null, ['Non-stock', 'Nordic Swan Ecolabel']),
  NB('22334466', 'Vindu 2-lags 10x12 Hvit', 'Alloc AS', 2650, 'STK', '4 STK', ['EU Ecolabel']),
  NB('22334477', 'Takvindu Velux 78x118', 'Alloc AS', 5900, 'STK', null, ['Non-stock']),
  NB('33445566', 'Dør Innerdør Hvit 8x21', 'Alloc AS', 2800, 'STK', null, ['FSC Certified']),
  NB('44556677', 'Fliser Porselensgulv 60x60', 'Alloc AS', 350, 'M2', null, ['Non-stock', 'Expires 05.12.2026']),
  NB('55667788', 'Spiker 3,1x90 Kamspiker', 'BOSCH ROBERT AS', 125, 'PAK', '240 PAK', []),
  NB('55667799', 'Spiker 2,8x65 Galvanisert', 'BOSCH ROBERT AS', 98, 'PAK', null, ['EU Ecolabel']),
  NB('55667800', 'Takspiker 2,8x25 Galvanisert 1kg', 'BOSCH ROBERT AS', 72, 'PAK', null, ['Non-stock']),
  NB('55667811', 'Rustfrie spiker 2,5x50 A4', 'Eikås Sagbruk AS', 215, 'PAK', null, ['Non-stock', 'Expires 12.04.2027']),
  NB('66778899', 'Tape Armering 50mm x 90m', 'Alloc AS', 35, 'RLL', null, []),
  NB('77889900', 'Silikon Neutral Hvit', 'BOSCH ROBERT AS', 55, 'STK', null, ['Expires 30.06.2026']),
  NB('88990011', 'Kabelkanal 25x16mm Hvit', 'BOSCH ROBERT AS', 25, 'M', null, []),
  NB('99001122', 'Stikkontakt Enkel Hvit', 'BOSCH ROBERT AS', 38, 'STK', null, []),
  NB('31001001', 'Planke høvlet furu 28x120 4,8m', 'Eikås Sagbruk AS', 189, 'STK', '86 STK', ['FSC Certified', 'PEFC certificate']),
  NB('31001002', 'Terrassebord planker impregnert 28x120', 'Eikås Sagbruk AS', 64, 'M', null, ['PEFC certificate']),
  NB('31001003', 'Planker gran 48x148 3,6m C24', 'Eikås Sagbruk AS', 245, 'STK', null, ['FSC Certified']),
  NB('31001004', 'Planker lerk 38x150 uhøvlet', 'Eikås Sagbruk AS', 310, 'STK', null, ['Non-stock', 'Expires 20.08.2026']),
  // Insulation
  NB('20334456', 'Steinull Rockwool Flexi 100mm 565x1170', 'Isolasjonsgrossisten AS', 389, 'PK', '120 PK', ['Nordic Swan Ecolabel', 'EU Ecolabel']),
  NB('20334457', 'Steinull Rockwool Flexi 150mm 565x1170', 'Isolasjonsgrossisten AS', 519, 'PK', null, ['Nordic Swan Ecolabel']),
  NB('20334458', 'Isolasjon Glava Standard 36 200mm', 'Isolasjonsgrossisten AS', 595, 'PK', null, ['EU Ecolabel']),
  NB('20334459', 'Isolasjon EPS Hvit 100mm 600x1200', 'Isolasjonsgrossisten AS', 79, 'STK', null, []),
  NB('20334460', 'Isolasjon PIR-plate 50mm 600x2400 Kingspan', 'Isolasjonsgrossisten AS', 285, 'STK', null, ['Non-stock']),
  NB('20334461', 'Vindsperre Isola Tyvek 1,5x50m', 'Isolasjonsgrossisten AS', 1290, 'RLL', null, ['Expires 14.02.2027']),
  NB('20334462', 'Dampsperre PE-folie 0,20mm 4x25m', 'Isolasjonsgrossisten AS', 459, 'RLL', null, []),
  // Roof
  NB('50100001', 'Takstein betong Nordic svart', 'Takpartner AS', 28, 'STK', '5400 STK', ['PEFC certificate']),
  NB('50100002', 'Takstein tegl rød engobert', 'Takpartner AS', 34, 'STK', null, ['Non-stock']),
  NB('50100003', 'Stålplatetak Plannja Trapez 35 sort', 'Takpartner AS', 219, 'M2', null, ['EU Ecolabel']),
  NB('50100004', 'Undertak Isola Tyvek Supro 1,5x50m', 'Takpartner AS', 1590, 'RLL', null, ['Expires 20.05.2027']),
  NB('50100005', 'Takrenne PVC 125mm hvit 3m', 'Takpartner AS', 169, 'STK', null, []),
  NB('50100006', 'Takrenne endestykke 125mm sort', 'Takpartner AS', 45, 'STK', null, []),
  NB('50100007', 'Takrenne beslag og festebraketter sort', 'Takpartner AS', 29, 'STK', null, ['Non-stock']),
  NB('50100008', 'Takfoss rørtakfot og snøfanger 2m', 'Takpartner AS', 349, 'STK', null, ['Non-stock', 'Expires 18.09.2026']),
  NB('50100009', 'Takpapp underlagspapp Icopal 1x10m', 'Takpartner AS', 279, 'RLL', null, ['EU Ecolabel']),
  // Plates
  NB('60200001', 'OSB/3 plate 12mm 1220x2440', 'Plateimport AS', 189, 'STK', '312 STK', ['FSC Certified']),
  NB('60200002', 'OSB/3 plate 18mm 1220x2440 not og fjær', 'Plateimport AS', 295, 'STK', null, ['FSC Certified', 'PEFC certificate']),
  NB('60200003', 'Kryssfiner bjørk 12mm 1220x2440', 'Plateimport AS', 549, 'STK', null, ['FSC Certified']),
  NB('60200004', 'Sponplate gulv P5 22mm 600x2400', 'Plateimport AS', 229, 'STK', null, ['PEFC certificate']),
  NB('60200005', 'MDF plate 16mm 1220x2440', 'Plateimport AS', 365, 'STK', null, ['EU Ecolabel']),
  NB('60200006', 'Fibersementplate Cembrit 8mm 1200x2500', 'Plateimport AS', 449, 'STK', null, ['Non-stock']),
  NB('60200007', 'Vindtett gipsplate Glasroc 9mm 900x2700', 'Plateimport AS', 189, 'STK', null, ['Expires 30.11.2026']),
  NB('60200008', 'Våtromsplate Wedi 12,5mm 600x1200', 'Plateimport AS', 365, 'STK', null, ['Non-stock', 'Nordic Swan Ecolabel']),
  // DIY tools
  NB('70300001', 'Hammer Stanley FatMax 570g', 'Verktøy Norge AS', 249, 'STK', '42 STK', []),
  NB('70300002', 'Sag Bahco håndsag 550mm', 'Verktøy Norge AS', 189, 'STK', null, []),
  NB('70300003', 'Skrutrekkersett Wera 6 deler', 'Verktøy Norge AS', 329, 'SET', null, []),
  NB('70300004', 'Vater Stabila 80cm', 'Verktøy Norge AS', 459, 'STK', null, []),
  NB('70300005', 'Målebånd Stanley 5m', 'Verktøy Norge AS', 99, 'STK', null, []),
  NB('70300006', 'Tang kombinasjonstang Knipex 180mm', 'Verktøy Norge AS', 389, 'STK', null, ['Non-stock']),
  NB('70300007', 'Borhammer Bosch GBH 2-26 DRE 800W', 'BOSCH ROBERT AS', 2490, 'STK', null, ['Expires 12.12.2027']),
  NB('70300008', 'Skrumaskin Makita 18V DDF484 sett', 'Verktøy Norge AS', 2990, 'SET', null, ['Non-stock']),
  NB('70300009', 'Bor sett HSS-G 1-10mm 19 deler', 'Verktøy Norge AS', 349, 'SET', null, []),
  NB('70300010', 'Kniv Stanley stikkekniv 18mm', 'Verktøy Norge AS', 69, 'STK', null, []),
  NB('70300011', 'Sandpapir sett P60-P240 20 ark', 'Verktøy Norge AS', 119, 'PAK', null, []),
  NB('70300012', 'Arbeidshansker Hestra Job str 9', 'Verktøy Norge AS', 149, 'PAR', null, []),
];
mockItems.push(...norwegianItems);

export function InventorySearchModal({ onClose, onAddItems, initialSearchValue = '', scannedArticleData = null, onArticleDataProcessed = () => {}, anchored = false, query = '', onQueryChange }: InventorySearchModalProps) {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    multipleLines: true,
    nonStock: true
  });
  
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set<number>());
  const [loadedDetails, setLoadedDetails] = useState<Set<number>>(new Set([469650132, 521954131, 516804172, 565151588, 55667788, 31001001, 22334466]));
  const [loadedStockAmounts, setLoadedStockAmounts] = useState<Record<number, string>>({});
  const [visibleItems, setVisibleItems] = useState(10);
  const [localQuery, setLocalQuery] = useState(initialSearchValue);
  const searchQuery = anchored ? query : localQuery;
  const setSearchQuery = (v: string) => (anchored ? onQueryChange?.(v) : setLocalQuery(v));
  const panelRef = useRef<HTMLDivElement>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  // Anchored mode: measure the cart search row so the list sits right above it.
  useLayoutEffect(() => {
    if (!anchored) return;
    const measure = () => {
      const el = document.querySelector('[data-inventory-anchor]');
      setAnchorRect(el ? el.getBoundingClientRect() : null);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [anchored]);

  // No dimmer means no backdrop to click; close when clicking outside the list and the cart search row.
  useEffect(() => {
    if (!anchored) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current?.contains(target)) return;
      if (document.querySelector('[data-inventory-anchor]')?.contains(target)) return;
      onClose();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [anchored, onClose]);
  const [searchFocused, setSearchFocused] = useState(initialSearchValue.length > 0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      setVisibleItems(prev => Math.min(prev + 5, mockItems.length));
    }
  };

  const toggleFilter = (filterName: 'multipleLines' | 'nonStock') => {
    setFilters(prev => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  // 'Choose multiple article lines' off: choosing a row adds just that line.
  const chooseRow = (item: InventoryItem) => {
    if (filters.multipleLines) {
      toggleSelection(item.id);
    } else {
      onAddItems([item]);
      onClose();
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const loadDetails = (id: number) => {
    const item = mockItems.find(i => i.id === id);
    const unit = item?.pris.split('/')[1]?.trim() || 'STK';
    const randomStock = Math.floor(Math.random() * 141) + 10;

    // Non-stock articles are special order, so loading the inventory says so.
    setLoadedStockAmounts(prev => ({
      ...prev,
      [id]: item?.isNonStock ? 'Not in stock' : `${randomStock} ${unit}`
    }));
    
    setLoadedDetails(prev => new Set([...prev, id]));
  };

  const bulkLoadInventory = () => {
    displayedItems.forEach(item => {
      if (!loadedDetails.has(item.id)) {
        loadDetails(item.id);
      }
    });
  };

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = matchesProductQuery([item.varetekst, item.varenr, item.leverandor], searchQuery);
    
    if (!matchesSearch) return false;
    
    if (!filters.nonStock) {
      if (item.isNonStock || (item.info && item.info.includes('Non-stock'))) {
        return false;
      }
    }
    
    return true;
  });

  const displayedItems = filteredItems.slice(0, visibleItems);
  const hasSelection = selectedItems.size > 0 && filters.multipleLines;

  const handleAddItems = () => {
    const itemsToAdd = mockItems.filter(item => selectedItems.has(item.id));
    onAddItems(itemsToAdd);
    onClose();
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // ─── Article scan auto-populate ──────────────────────────────────────────────
  // Runs once when scannedArticleData arrives (Ctrl+- while inventory modal is
  // open). Filters the list to the scanned varenr and auto-selects the item.
  useEffect(() => {
    if (!scannedArticleData) return;

    // 1. Narrow the search to the scanned article number
    setSearchQuery(scannedArticleData.varenr);

    // 2. Find and auto-select the matching item
    const match = mockItems.find(item => item.varenr === scannedArticleData.varenr);
    if (match) {
      setSelectedItems(new Set([match.id]));
      // Ensure the item is visible
      setVisibleItems(prev => Math.max(prev, mockItems.indexOf(match) + 1));
    }

    // 3. Signal the parent that we have consumed the scan data
    onArticleDataProcessed?.();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scannedArticleData]);

  const selectedCount = filters.multipleLines ? selectedItems.size : 0;
  const addLabel = selectedCount === 0
    ? t('addToOrderLine')
    : (selectedCount === 1 ? t('addProductLine') : t('addProductLines')).replace('{n}', String(selectedCount));

  // List styling: compact rows, muted uppercase headers, numbers right-aligned.
  // Colours are the Fabri POS UI palette this modal always used.
  const th: React.CSSProperties = { padding: '12px 8px', textAlign: 'left', fontWeight: 700, fontSize: 'var(--text-sm)', letterSpacing: '0.5px', textTransform: 'uppercase', color: '#6b6b72', whiteSpace: 'nowrap', background: '#ffffff' };
  const td: React.CSSProperties = { padding: '10px 8px', fontSize: 'var(--text-sm)', color: '#090914', verticalAlign: 'middle' };
  const num: React.CSSProperties = { textAlign: 'right', whiteSpace: 'nowrap' };
  const chip: React.CSSProperties = { display: 'inline-block', fontSize: 'var(--text-sm)', padding: '2px 8px', borderRadius: 3, whiteSpace: 'nowrap', lineHeight: 1.5 };
  const switchTrack = 'w-[36px] h-[20px] bg-[#d5d5d7] rounded-full peer peer-checked:bg-[#0d97fc] transition-colors';

  const FilterSwitch = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
    <label className="flex items-center gap-[8px] cursor-pointer select-none">
      <div className="relative">
        <input type="checkbox" checked={checked} onChange={onChange} className="sr-only peer" />
        <div className={switchTrack}></div>
        <div className="absolute top-[2px] left-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-sm transition-transform peer-checked:translate-x-[16px]"></div>
      </div>
      <span style={{ fontSize: 'var(--text-sm)', color: '#42424a' }}>{label}</span>
    </label>
  );

  return (
    <>
      {/* Backdrop (not in anchored mode: no dimmer behind the list) */}
      {!anchored && (
        <div 
          className="fixed inset-0 z-40 bg-black opacity-10"
          onClick={onClose}
        />
      )}
      
      {/* Modal */}
      <div
        className={anchored ? 'fixed z-50 pointer-events-none' : 'fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-[20px]'}
        style={anchored ? (anchorRect
          ? { left: anchorRect.left, bottom: window.innerHeight - anchorRect.top + 8, width: Math.max(anchorRect.width, 720), maxWidth: 'calc(100vw - 20px)' }
          : { left: 20, bottom: 88, width: 'min(1200px, calc(100vw - 40px))' }) : undefined}
      >
        <div ref={panelRef} className={`w-full ${anchored ? '' : 'max-w-[1200px] max-h-[90vh]'} pointer-events-auto rounded-[3px] shadow-[2px_2px_4px_0px_rgba(107,107,114,0.06),3px_10px_15px_0px_rgba(107,107,114,0.06)] flex flex-col`} style={{ background: '#ffffff', maxHeight: anchored ? `calc(${anchorRect ? anchorRect.top : 100}px - 24px)` : undefined, border: anchored ? '1px solid #e6e6e8' : undefined }}>
          {/* Header with filters */}
          <div className="px-[12px] py-[10px]">
            <div className="flex items-center gap-[12px]">
              <FilterSwitch checked={filters.multipleLines} onChange={() => toggleFilter('multipleLines')} label={t('addMultipleLines')} />
              <FilterSwitch checked={filters.nonStock} onChange={() => toggleFilter('nonStock')} label={t('includeNonStock')} />
              <button
                onClick={bulkLoadInventory}
                style={{ padding: '4px 10px', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: '#42424a', background: '#ffffff', border: '1px solid #d5d5d7', borderRadius: 5, cursor: 'pointer' }}
              >
                {t('loadStock')}
              </button>
            </div>
          </div>

          {/* Scrollable table container */}
          <div className="relative flex-1 overflow-hidden flex flex-col">
            <div ref={scrollRef} onScroll={handleScroll} className="overflow-auto flex-1">
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead className="sticky top-0 z-10">
                  <tr>
                    {filters.multipleLines && <th style={{ ...th, width: 48 }}></th>}
                    <th style={{ ...th, ...num }}>{t('itemNumber')}</th>
                    <th style={th}>{t('itemText')}</th>
                    <th style={th}>{t('quantity')}</th>
                    <th style={th}>{t('supplier')}</th>
                    <th style={{ ...th, ...num }}>{t('price')}</th>
                    <th style={{ ...th, ...num }}>{t('inventory')}</th>
                    <th style={th}>{t('info')}</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedItems.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ ...td, padding: '48px 15px', textAlign: 'center', color: '#6b6b72' }}>{t('noItemsFound')}</td>
                    </tr>
                  ) : (
                    displayedItems.map((item) => {
                      const isLoaded = loadedDetails.has(item.id);
                      const isSelected = selectedItems.has(item.id);
                      const unit = item.pris.split('/')[1]?.trim() ?? '';
                      const rowBg = isSelected ? '#e6f4fe' : '#ffffff';

                      return (
                        <tr
                          key={item.id}
                          onClick={(e) => { if (!(e.target as HTMLElement).closest('button, input, label')) chooseRow(item); }}
                          style={{ background: rowBg, borderTop: '1px solid #e6e6e8', transition: 'background 0.1s', cursor: 'pointer' }}
                          onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = '#fafafa'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = rowBg; }}
                        >
                          {filters.multipleLines && (
                            <td style={td}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelection(item.id)}
                                aria-label={item.varenr}
                                style={{ width: 20, height: 20, accentColor: '#0d97fc', cursor: 'pointer' }}
                              />
                            </td>
                          )}
                          <td style={{ ...td, ...num }}>{item.varenr}</td>
                          <td style={{ ...td, maxWidth: 300 }}>{item.varetekst}</td>
                          <td style={{ ...td, whiteSpace: 'nowrap' }}>
                            <span style={{ display: 'inline-block', minWidth: 16, textAlign: 'right' }}>{isSelected ? 1 : 0}</span>
                            <span style={{ marginLeft: 6, color: '#6b6b72' }}>{unit}</span>
                          </td>
                          <td style={{ ...td, color: '#6b6b72' }}>{item.leverandor}</td>
                          <td style={{ ...td, ...num }}>{item.pris.replace(' / ', '/')}</td>
                          <td style={{ ...td, ...num }}>
                            {isLoaded ? (
                              (() => {
                                const displayBeholdning = loadedStockAmounts[item.id] || item.beholdning;
                                return displayBeholdning === 'Not in stock' ? (
                                  <span style={{ ...chip, color: '#f24c35', background: '#fdeceb' }}>
                                    {t('notInStock')}
                                  </span>
                                ) : (
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600, color: '#48b76e' }}>
                                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#48b76e' }}></span>
                                    {displayBeholdning}
                                  </span>
                                );
                              })()
                            ) : (
                              <button
                                onClick={() => loadDetails(item.id)}
                                style={{ padding: '3px 12px', fontWeight: 600, fontSize: 'var(--text-sm)', color: '#0d97fc', background: '#ffffff', border: '1px solid #0d97fc', borderRadius: 3, cursor: 'pointer', whiteSpace: 'nowrap' }}
                              >
                                {t('loadInventoryRow')}
                              </button>
                            )}
                          </td>
                          <td style={td}>
                            {item.info.length > 0 && (
                              <div className="flex flex-wrap gap-[6px]">
                                {item.info.map((tag, idx) => (
                                  tag === 'Non-stock' ? (
                                    <span key={idx} style={{ ...chip, color: '#f24c35', border: '1px solid #f24c35' }}>{t('nonStockArticle')}</span>
                                  ) : tag.includes('Expires') ? (
                                    <span key={idx} style={{ ...chip, color: '#ff8c21', background: '#fff4e6' }}>{tag}</span>
                                  ) : (
                                    <span key={idx} style={{ ...chip, color: '#48b76e', background: '#e8f5ec' }}>{tag}</span>
                                  )
                                ))}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer: add button first, then search */}
            <div style={{ borderTop: '1px solid #e6e6e8', background: '#ffffff', padding: '12px' }}>
              <div className="flex items-center gap-[12px]">
                <button
                  onClick={handleAddItems}
                  disabled={!hasSelection}
                  style={{
                    padding: '6px 20px',
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-lg)',
                    lineHeight: 1.75,
                    borderRadius: 'var(--radius)',
                    border: 'none',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                    background: hasSelection ? 'var(--primary)' : 'var(--secondary)',
                    color: hasSelection ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                    opacity: hasSelection ? 1 : 0.6,
                    cursor: hasSelection ? 'pointer' : 'not-allowed',
                  }}
                >
                  {addLabel}
                </button>

                {/* Search bar (not in anchored mode: the cart field is the only search) */}
                {!anchored && <div className="relative flex-1">
                  <div className="box-border flex gap-[10px] h-[48px] items-center px-[14px] py-[8px] relative rounded-[5px] w-full" style={{ background: '#ffffff' }}>
                    <div
                      aria-hidden="true"
                      className="absolute border-solid inset-0 pointer-events-none rounded-[5px]"
                      style={{
                        borderWidth: searchFocused ? '2px' : '1px',
                        borderColor: searchFocused ? 'rgb(13, 151, 252)' : 'rgb(213, 213, 215)'
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Søk etter ordre"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      className="basis-0 font-normal grow leading-[1.75] min-h-px min-w-px relative shrink-0 text-[14px] bg-transparent border-none outline-none"
                      style={{ color: 'rgb(9, 9, 20)' }}
                    />
                    <div className="opacity-50 overflow-clip relative shrink-0 size-[14px]">
                      <Group3 />
                    </div>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

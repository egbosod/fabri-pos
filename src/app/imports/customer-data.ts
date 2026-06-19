import { useState, useRef, useEffect, useCallback } from "react";

const F = "'Montserrat', sans-serif";
const COLS = "80px 1fr 130px 1fr 160px";

// ─── Icons ────────────────────────────────────────────────────────────────────

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="5.5" cy="5.5" r="4.5" stroke="#42424A" strokeWidth="1.2" strokeOpacity="0.5"/>
    <path d="M9.5 9.5L12.5 12.5" stroke="#42424A" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5"/>
  </svg>
);

const ClientIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="3" width="16" height="13" rx="1.5" stroke="#22222C" strokeWidth="1.5"/>
    <path d="M6 8h8M6 11h5" stroke="#22222C" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M18 8h3.5M18 12h3.5" stroke="#22222C" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="19.5" cy="17.5" r="3.5" stroke="#22222C" strokeWidth="1.5"/>
    <path d="M17.5 17.5h4" stroke="#22222C" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M19.5 15.5v4" stroke="#22222C" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const ChevronIcon = () => (
  <svg width="10" height="7" viewBox="0 0 10 7" fill="none">
    <path d="M1 1L5 5L9 1" stroke="#6B6B72" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const ChevronDownBlue = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 4L6 8L10 4" stroke="#0D97FC" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const CUSTOMERS = [
  { nr: "666001", navn: "Varg Vikernes Bygg AS",        kategori: "Byggmestre",    adresse: "Burzumvegen 1",         postnrSted: "5003 Bergen" },
  { nr: "666002", navn: "Euronymous Elektro",           kategori: "Forbrukersalg", adresse: "Helvetesgata 6",        postnrSted: "0666 Oslo" },
  { nr: "666003", navn: "Dead Pelle Rørlegger",         kategori: "Forbrukersalg", adresse: "Kryptavegen 13",        postnrSted: "3013 Drammen" },
  { nr: "666004", navn: "Necrobutcher Anlegg",          kategori: "Byggmestre",    adresse: "Mayheimsvegen 66",      postnrSted: "0191 Oslo" },
  { nr: "666005", navn: "Abbath Isfront AS",            kategori: "Byggmestre",    adresse: "Blashyrkvegen 3",       postnrSted: "5530 Karmøy" },
  { nr: "666006", navn: "Gaahl Grim Interiør",          kategori: "Forbrukersalg", adresse: "Trolltungevegen 9",     postnrSted: "5783 Vik" },
  { nr: "666007", navn: "Ihsahn Arkitekter",            kategori: "Byggmestre",    adresse: "Emperorgata 22",        postnrSted: "3724 Skien" },
  { nr: "666008", navn: "Samoth Konstruksjon",          kategori: "Byggmestre",    adresse: "Wrathruten 8",          postnrSted: "2010 Strømmen" },
  { nr: "666009", navn: "Nocturno Culto Tak & Fasade",  kategori: "Renovering",    adresse: "Darkthronegata 4",      postnrSted: "3670 Notodden" },
  { nr: "666010", navn: "Fenriz Fritid & Bygg",         kategori: "Forbrukersalg", adresse: "Transylvaniasvei 11",   postnrSted: "3671 Notodden" },
  { nr: "666011", navn: "Infernus Rørfornying",         kategori: "Renovering",    adresse: "Gorgorothvegen 5",      postnrSted: "5003 Bergen" },
  { nr: "666012", navn: "Silenoz Snekker",              kategori: "Forbrukersalg", adresse: "Dimmusvingen 17",       postnrSted: "2821 Gjøvik" },
  { nr: "666013", navn: "Shagrath Stillasbygg",         kategori: "Byggmestre",    adresse: "Stormblåsthøgda 2",    postnrSted: "0581 Oslo" },
  { nr: "666014", navn: "Horgh Gravemaskin AS",         kategori: "Anlegg",        adresse: "Immortalvegen 33",      postnrSted: "5700 Voss" },
  { nr: "666015", navn: "Tchort Totalentreprise",       kategori: "Byggmestre",    adresse: "Greenleafgata 19",      postnrSted: "2317 Hamar" },
  { nr: "666016", navn: "Garm Gulv & Fliser",           kategori: "Forbrukersalg", adresse: "Ulvervegen 44",         postnrSted: "7010 Trondheim" },
  { nr: "666017", navn: "Blasphemer Betong",            kategori: "Anlegg",        adresse: "Mayheimsvegen 68",      postnrSted: "0191 Oslo" },
  { nr: "666018", navn: "Hellhammer Heis & Løft",       kategori: "Anlegg",        adresse: "Celticfroststi 7",      postnrSted: "8008 Bodø" },
  { nr: "666019", navn: "Grutle Kjellson Grunnarbeid",  kategori: "Anlegg",        adresse: "Enslavedsundet 12",     postnrSted: "5527 Haugesund" },
  { nr: "666020", navn: "Ivar Bjørnson Isolasjon",      kategori: "Renovering",    adresse: "Enslavedsundet 14",     postnrSted: "5527 Haugesund" },
];

const PROJECTS = [
  { nr: "P-2024-001", navn: "Nybygg Haugen",               kategori: "Bygg",       adresse: "Haugevegen 4",          postnrSted: "2821 Gjøvik" },
  { nr: "P-2024-002", navn: "Renovering Storgata",         kategori: "Renovering", adresse: "Storgata 12",           postnrSted: "2317 Hamar" },
  { nr: "P-2024-003", navn: "Lager Lillehammer",           kategori: "Bygg",       adresse: "Lagringsv. 3",          postnrSted: "2615 Lillehammer" },
  { nr: "P-2024-004", navn: "Kontorbygg Sentrum",          kategori: "Bygg",       adresse: "Sentrumsgata 22",       postnrSted: "0150 Oslo" },
  { nr: "P-2024-005", navn: "Boligfelt Vestby",            kategori: "Bolig",      adresse: "Vestbyvegen 8",         postnrSted: "1540 Vestby" },
  { nr: "P-2024-006", navn: "Garasjebygg Raufoss",         kategori: "Bygg",       adresse: "Industrivegen 14",      postnrSted: "2830 Raufoss" },
  { nr: "P-2024-007", navn: "Renovering Brugata",          kategori: "Renovering", adresse: "Brugata 5",             postnrSted: "2000 Lillestrøm" },
  { nr: "P-2024-008", navn: "Tilbygg Grünerløkka",         kategori: "Tilbygg",    adresse: "Thorvald Meyers gt 7",  postnrSted: "0555 Oslo" },
  { nr: "P-2024-009", navn: "Hyttebygg Sjusjøen",          kategori: "Hytte",      adresse: "Sjusjøenvegen 45",      postnrSted: "2612 Sjusjøen" },
  { nr: "P-2024-010", navn: "Lagerbygg Jessheim",          kategori: "Bygg",       adresse: "Logistikkveien 3",      postnrSted: "2050 Jessheim" },
  { nr: "P-2024-011", navn: "Boligrenovering Fredrikstad", kategori: "Renovering", adresse: "Glommavegen 19",        postnrSted: "1671 Fredrikstad" },
  { nr: "P-2024-012", navn: "Nybygg Tønsberg",             kategori: "Bygg",       adresse: "Havnevegen 2",          postnrSted: "3110 Tønsberg" },
  { nr: "P-2024-013", navn: "Fasaderehabilitering Skien",  kategori: "Renovering", adresse: "Nedre Hjellegt 11",     postnrSted: "3724 Skien" },
  { nr: "P-2024-014", navn: "Næringsbygg Sandvika",        kategori: "Bygg",       adresse: "Sandviksveien 55",      postnrSted: "1337 Sandvika" },
  { nr: "P-2024-015", navn: "Kjellerhvelv Drammen",        kategori: "Tilbygg",    adresse: "Bragernes Torg 6",      postnrSted: "3017 Drammen" },
  { nr: "P-2024-016", navn: "Tak & Fasade Moss",           kategori: "Renovering", adresse: "Storgata 45",           postnrSted: "1530 Moss" },
  { nr: "P-2024-017", navn: "Barnehagebygg Bodø",          kategori: "Bygg",       adresse: "Rønvikveien 88",        postnrSted: "8008 Bodø" },
  { nr: "P-2024-018", navn: "Sykkelsti Tromsø",            kategori: "Anlegg",     adresse: "Strandvegen 120",       postnrSted: "9008 Tromsø" },
  { nr: "P-2024-019", navn: "Enebolig Bærum",              kategori: "Bolig",      adresse: "Eiksmarka allé 3",      postnrSted: "1359 Eiksmarka" },
  { nr: "P-2024-020", navn: "Rehabilitering Stavanger",    kategori: "Renovering", adresse: "Kongsgård allé 20",     postnrSted: "4010 Stavanger" },
];


// ─── InfoCard — collapsed + expanded states ───────────────────────────────────

// A title-divider row inside an expanded card
function CardSectionHeader({ label }) {
  return (
    <div style={{ borderBottom: "1px solid #E6E6E8", padding: "6px 10px", background: "#FAFAFA" }}>
      <span style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: "#6B6B72", textTransform: "uppercase", letterSpacing: 0.5, lineHeight: 1.75 }}>
        {label}
      </span>
    </div>
  );
}

// A single label/value row inside a card
function CardRow({ label, value, badge, borderTop = true }) {
  return (
    <div style={{ borderTop: borderTop ? "1px solid #E6E6E8" : "none", padding: 10, display: "flex", gap: 10, alignItems: "center" }}>
      <span style={{ flex: 1, fontFamily: F, fontWeight: 700, fontSize: 11, color: "#22222C", lineHeight: 1.4 }}>{label}</span>
      <span style={{ flex: 1, fontFamily: F, fontWeight: 400, fontSize: 11, color: "#22222C", lineHeight: 1.4 }}>{value}</span>
      {badge && (
        <span style={{ background: "#CFEAFE", borderRadius: 3, padding: "2px 6px", fontFamily: F, fontWeight: 400, fontSize: 11, color: "#090914", lineHeight: 1.75, whiteSpace: "nowrap" }}>
          {badge}
        </span>
      )}
    </div>
  );
}

function InfoCard({ title, rows, expandLabel, expandedCard }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, width: "100%" }}>

      {/* ── Collapsed card ── */}
      <div style={{ background: "#fff", border: "1px solid #E6E6E8", borderRadius: 3, overflow: "hidden" }}>
        {/* Section header */}
        <div style={{ borderBottom: "1px solid #E6E6E8", padding: 10 }}>
          <span style={{ fontFamily: F, fontWeight: 700, fontSize: 11, color: "#6B6B72", textTransform: "uppercase", letterSpacing: 0.5, lineHeight: 1.75 }}>
            {title}
          </span>
        </div>
        {rows.map((row, i) => (
          <CardRow key={i} label={row.label} value={row.value} badge={row.badge} borderTop={true} />
        ))}
      </div>

      {/* ── Expand / collapse link ── */}
      <button
        onClick={() => setExpanded(v => !v)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 5, alignSelf: "flex-end" }}
      >
        <span style={{ fontFamily: F, fontWeight: 600, fontSize: 12, color: "#0D97FC", textTransform: "uppercase", letterSpacing: 0.3, lineHeight: 1.75, whiteSpace: "nowrap" }}>
          {expanded ? expandLabel.replace("Utvid", "Skjul") : expandLabel}
        </span>
        <span style={{ display: "flex", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
          <ChevronDownBlue />
        </span>
      </button>

      {/* ── Expanded detail card ── */}
      {expanded && expandedCard && (
        <div style={{ background: "#fff", border: "1px solid #E6E6E8", borderRadius: 3, overflow: "hidden" }}>
          {expandedCard.map((section, si) => (
            <div key={si}>
              {section.title && <CardSectionHeader label={section.title} />}
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

// ─── Floating dropdown — position:fixed, rendered at JSX root ─────────────────

function useAnchorRect(ref, active) {
  const [rect, setRect] = useState(null);
  const update = useCallback(() => {
    if (ref.current) setRect(ref.current.getBoundingClientRect());
  }, [ref]);

  useEffect(() => {
    if (!active) { setRect(null); return; }
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [active, update]);

  return rect;
}

// modalRight: the right edge of the modal card in viewport px
// dropdown stretches from input's left to modal's right edge
function DropdownTable({ rect, modalRight, rows, hoveredIdx, onHover, onSelect }) {
  if (!rect || rows.length === 0) return null;
  const HEADER_H = 37;
  const ROW_H = 48;
  const VISIBLE = 6.5;
  const dropWidth = (modalRight != null ? modalRight - 20 : rect.right) - rect.left;

  return (
    <div style={{
      position: "fixed",
      top: rect.bottom + 2,
      left: rect.left,
      width: dropWidth,
      maxHeight: HEADER_H + ROW_H * VISIBLE,
      zIndex: 2147483647,
      background: "#fff",
      border: "1px solid #E6E6E8",
      borderRadius: 3,
      boxShadow: "0 2px 8px rgba(107,107,114,0.10), 0 8px 24px rgba(107,107,114,0.16)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      pointerEvents: "all",
    }}>
      {/* Sticky header */}
      <div style={{ display: "grid", gridTemplateColumns: COLS, padding: "0 11px", height: HEADER_H, alignItems: "center", flexShrink: 0, borderBottom: "1px solid #E6E6E8", background: "#fff" }}>
        {["NR", "NAVN", "KATEGORI", "ADRESSE", "POSTNR, STED"].map(h => (
          <span key={h} style={{ fontFamily: F, fontWeight: 700, fontSize: 12, color: "#6B6B72", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</span>
        ))}
      </div>
      {/* Scrollable rows */}
      <div style={{ overflowY: "auto", flex: 1 }}>
        {rows.map((r, i) => (
          <div
            key={i}
            style={{ display: "grid", gridTemplateColumns: COLS, padding: "0 11px", height: ROW_H, alignItems: "center", borderTop: i === 0 ? "none" : "1px solid #E6E6E8", background: hoveredIdx === i ? "#EBF6FF" : "#fff", cursor: "pointer", transition: "background 0.07s" }}
            onMouseEnter={() => onHover(i)}
            onMouseLeave={() => onHover(null)}
            onMouseDown={e => { e.preventDefault(); onSelect(r); }}
          >
            {[r.nr, r.navn, r.kategori, r.adresse, r.postnrSted].map((val, ci) => (
              <span key={ci} style={{ fontFamily: F, fontSize: 14, color: "#090914", lineHeight: 1.38, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", paddingRight: 8 }}>{val}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SelectList — used for Kontaktperson ─────────────────────────────────────
// Anatomy: search bar / new-user action link / title divider / item rows

const DISNEY_CONTACTS = [
  { id: 1, navn: "Ariel Havmøy",        tittel: "Prosjektleder" },
  { id: 2, navn: "Simba Løvansen",       tittel: "Innkjøpsansvarlig" },
  { id: 3, navn: "Elsa Frostheim",       tittel: "Anleggskoordinator" },
  { id: 4, navn: "Woody Cowboygaard",    tittel: "Driftsleder" },
  { id: 5, navn: "Moana Havdatter",      tittel: "Prosjektingeniør" },
];

const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M6 1v10M1 6h10" stroke="#0D97FC" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const PersonIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="4.5" r="2.5" stroke="#6B6B72" strokeWidth="1.2"/>
    <path d="M2 12c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#6B6B72" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

function SelectList({ anchorRef, open, selected, onSelect, onClose }) {
  const [hovered, setHovered] = useState(null);
  const [rect, setRect] = useState(null);

  const update = useCallback(() => {
    if (anchorRef.current) setRect(anchorRef.current.getBoundingClientRect());
  }, [anchorRef]);

  useEffect(() => {
    if (!open) { setRect(null); return; }
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open, update]);

  if (!open || !rect) return null;

  return (
    <div style={{
      position: "fixed",
      top: rect.bottom + 2,
      left: rect.left,
      width: rect.width,
      zIndex: 2147483647,
      background: "#fff",
      border: "1px solid #E6E6E8",
      borderRadius: 3,
      boxShadow: "0 2px 8px rgba(107,107,114,0.10), 0 12px 28px rgba(107,107,114,0.18)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* ── Item bodies ── */}
      <div style={{ overflowY: "auto", maxHeight: 48 * 5 }}>
        {DISNEY_CONTACTS.length === 0 ? (
          <div style={{ padding: "12px 14px", fontFamily: F, fontSize: 13, color: "#6B6B72" }}>Ingen treff</div>
        ) : DISNEY_CONTACTS.map((c, i) => {
          const isSelected = selected === c.navn;
          return (
            <div
              key={c.id}
              style={{
                padding: "0 12px",
                height: 48,
                display: "flex",
                alignItems: "center",
                gap: 10,
                borderTop: i === 0 ? "none" : "1px solid #E6E6E8",
                background: hovered === i ? "#EBF6FF" : isSelected ? "#F0F8FF" : "#fff",
                cursor: "pointer",
                transition: "background 0.07s",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onMouseDown={e => { e.preventDefault(); onSelect(c.navn); onClose(); }}
            >
              <PersonIcon />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: F, fontWeight: 600, fontSize: 13, color: "#090914", lineHeight: 1.4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {c.navn}
                </div>
                <div style={{ fontFamily: F, fontWeight: 400, fontSize: 11, color: "#6B6B72", lineHeight: 1.4 }}>
                  {c.tittel}
                </div>
              </div>
              {isSelected && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7L5.5 10L11.5 4" stroke="#0D97FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}


export default function KundeProsjekt() {
  const [activeTab, setActiveTab]               = useState("generelt");
  const [kundeSearch, setKundeSearch]           = useState("");
  const [prosjektSearch, setProsjektSearch]     = useState("");
  const [kundeRef, setKundeRef]                 = useState("");
  const [kontaktperson, setKontaktperson]       = useState("");
  const [rekvisjonsnummer, setRekvisjonsnummer] = useState("");
  const [kundeOpen, setKundeOpen]               = useState(false);
  const [prosjektOpen, setProsjektOpen]         = useState(false);
  const [kontaktOpen, setKontaktOpen]           = useState(false);
  const [selectedKunde, setSelectedKunde]       = useState(null);
  const [selectedProsjekt, setSelectedProsjekt] = useState(null);
  const [hoveredKunde, setHoveredKunde]         = useState(null);
  const [hoveredProsjekt, setHoveredProsjekt]   = useState(null);
  const [confirmed, setConfirmed]               = useState(false);

  const kundeAnchorRef    = useRef(null);
  const prosjektAnchorRef = useRef(null);
  const kontaktAnchorRef  = useRef(null);
  const kundeInputRef     = useRef(null);
  const prosjektInputRef  = useRef(null);
  const modalRef          = useRef(null);

  const kundeRect    = useAnchorRect(kundeAnchorRef, kundeOpen);
  const prosjektRect = useAnchorRect(prosjektAnchorRef, prosjektOpen);
  const modalRect    = useAnchorRect(modalRef, kundeOpen || prosjektOpen);

  const filteredKunder = CUSTOMERS.filter(k =>
    k.navn.toLowerCase().includes(kundeSearch.toLowerCase()) ||
    k.nr.includes(kundeSearch) ||
    k.adresse.toLowerCase().includes(kundeSearch.toLowerCase())
  );
  const filteredProsjekter = prosjektSearch
    ? PROJECTS.filter(p =>
        p.navn.toLowerCase().includes(prosjektSearch.toLowerCase()) ||
        p.nr.includes(prosjektSearch)
      )
    : PROJECTS;

  const canConfirm = !!selectedKunde;

  function handleKundeSelect(k)    { setSelectedKunde(k);    setKundeSearch(k.navn);    setKundeOpen(false); }
  function handleProsjektSelect(p) { setSelectedProsjekt(p); setProsjektSearch(p.navn); setProsjektOpen(false); }

  function handleReset() {
    setConfirmed(false); setSelectedKunde(null); setSelectedProsjekt(null);
    setKundeSearch(""); setProsjektSearch(""); setKundeRef("");
    setKontaktperson(""); setRekvisjonsnummer("");
    setKundeOpen(false); setProsjektOpen(false); setKontaktOpen(false);
  }

  useEffect(() => {
    function handle(e) {
      if (!kundeAnchorRef.current?.contains(e.target))    setKundeOpen(false);
      if (!prosjektAnchorRef.current?.contains(e.target)) setProsjektOpen(false);
      if (!kontaktAnchorRef.current?.contains(e.target))  setKontaktOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const inputBox = (focused) => ({
    background: "#fff",
    border: focused ? "2px solid #0D97FC" : "1px solid #D5D5D7",
    borderRadius: 5, height: 48,
    display: "flex", alignItems: "center",
    padding: focused ? "8px 13px" : "8px 14px",
    gap: 10, cursor: "text",
    boxShadow: focused ? "inset 2px 2px 3px rgba(0,0,0,0.08)" : "none",
    transition: "border 0.1s, box-shadow 0.1s",
  });

  const innerInput = { flex: 1, border: "none", outline: "none", fontFamily: F, fontSize: 14, color: "#42424A", background: "transparent", lineHeight: 1.75 };
  const fieldLabel = { fontWeight: 700, fontSize: 14, color: "#22222C", lineHeight: 1.75, marginBottom: 4, fontFamily: F };

  // Collapsed card rows
  const kundeCardRows = selectedKunde ? [
    { label: "Kundenr",   value: selectedKunde.nr },
    { label: "Kundenavn", value: selectedKunde.navn, badge: selectedKunde.kategori === "Byggmestre" ? "Proff" : null },
  ] : [];

  // Expanded detail card — grouped sections
  const kundeExpandedCard = selectedKunde ? [
    {
      title: null,
      rows: [
        { label: "Kategori", value: selectedKunde.kategori },
        { label: "Mobil",    value: "+47 123 45 678" },
        { label: "E-post",   value: selectedKunde.navn.split(" ")[0].toLowerCase() + "@carpenter.no" },
      ],
    },
    {
      title: "ADDRESS",
      rows: [
        { label: "Gate",           value: selectedKunde.adresse },
        { label: "Postnr og sted", value: selectedKunde.postnrSted },
      ],
    },
    {
      title: "CREDIT",
      rows: [
        { label: "Kredittgrense",       value: "50 000" },
        { label: "Tilgjengelig kreditt", value: "32 450" },
      ],
    },
  ] : null;

  const prosjektCardRows = selectedProsjekt ? [
    { label: "Eksternt prosjektnr", value: selectedProsjekt.nr },
    { label: "Prosjektnavn",        value: selectedProsjekt.navn },
  ] : [];

  const prosjektExpandedCard = selectedProsjekt ? [
    {
      title: null,
      rows: [
        { label: "Kategori", value: selectedProsjekt.kategori },
        { label: "Adresse",  value: selectedProsjekt.adresse },
        { label: "Sted",     value: selectedProsjekt.postnrSted },
      ],
    },
  ] : null;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* ─── PAGE WRAPPER ─── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#E0E0E3", padding: 24 }}>

        {/* ─── MODAL CARD ─── */}
        <div ref={modalRef} style={{ background: "#FAFAFA", borderRadius: 3, boxShadow: "2px 2px 4px rgba(107,107,114,0.06), 3px 10px 15px rgba(107,107,114,0.08)", display: "flex", flexDirection: "column", width: 951, fontFamily: F, position: "relative" }}>

          {/* Confirmation overlay */}
          {confirmed && (
            <div style={{ position: "absolute", inset: 0, borderRadius: 3, background: "rgba(255,255,255,0.97)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, zIndex: 200 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#0D97FC", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M8 16L13 21L24 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <p style={{ fontWeight: 700, fontSize: 18, color: "#22222C", fontFamily: F, margin: 0 }}>Kunde bekreftet</p>
              <p style={{ fontSize: 14, color: "#6B6B72", fontFamily: F, margin: 0 }}>{selectedKunde?.navn} · {selectedKunde?.nr}</p>
              <button onClick={handleReset} style={{ marginTop: 8, background: "#fff", border: "1px solid #D5D5D7", borderRadius: 5, height: 48, minWidth: 120, padding: "6px 20px", fontFamily: F, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
                Start på nytt
              </button>
            </div>
          )}

          {/* Module header */}
          <div style={{ background: "#fff", borderBottom: "1.461px solid #E6E6E8", padding: "22px 21px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "inline-grid", gridTemplateColumns: "max-content", gridTemplateRows: "max-content", placeItems: "start", position: "relative", lineHeight: 0 }}>
              {/* Icon — col 1 row 1 */}
              <div style={{ gridColumn: 1, gridRow: 1, width: 24, height: 24, overflow: "hidden", position: "relative" }}>
                <img src="https://www.figma.com/api/mcp/asset/ab843d3d-c1b4-4a19-b8f0-c882320c6995" alt="" style={{ position: "absolute", inset: "0 0 0.01% 0", width: "100%", height: "100%", display: "block" }} />
              </div>
              {/* Title — col 1 row 1, offset right of icon */}
              <span style={{ gridColumn: 1, gridRow: 1, fontFamily: F, fontWeight: 700, fontSize: 15, color: "#22222C", lineHeight: 1.3, whiteSpace: "nowrap", marginLeft: 35, marginTop: 3 }}>
                Velg kunde og/eller prosjekt
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ background: "#fff", boxShadow: "0px 3px 3px rgba(107,107,114,0.06)", display: "flex", gap: 30, paddingLeft: 20, paddingRight: 20, paddingTop: 10, alignItems: "flex-end" }}>
            {[["generelt","Generelt"],["leveringsadresse","Leveringsadresse"]].map(([key, lbl_]) => {
              const active = activeTab === key;
              return (
                <div
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    height: 48,
                    justifyContent: "flex-end",
                    cursor: "pointer",
                    paddingBottom: 0,
                    flexShrink: 0,
                  }}
                >
                  <span style={{
                    fontFamily: F,
                    fontWeight: 600,
                    fontSize: 14,
                    color: active ? "#090914" : "#0D97FC",
                    lineHeight: 1.75,
                    whiteSpace: "nowrap",
                    paddingBottom: 6,
                  }}>
                    {lbl_}
                  </span>
                  {/* Active underline — 3px, flush to bottom of bar */}
                  <div style={{
                    height: 3,
                    width: "100%",
                    background: active ? "#090914" : "transparent",
                    borderRadius: "2px 2px 0 0",
                    flexShrink: 0,
                  }} />
                </div>
              );
            })}
          </div>

          {/* Body */}
          <div style={{ display: "flex", alignItems: "stretch" }}>

            {/* Main column */}
            <div style={{ flex: 1, padding: 20 }}>
              {activeTab === "generelt" ? (
                <div style={{ background: "#fff", border: "1px solid #E6E6E8", borderRadius: 4, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>

                  {/* Kunde */}
                  <div>
                    <div style={fieldLabel}>Kunde</div>
                    <div ref={kundeAnchorRef} style={inputBox(kundeOpen)} onClick={() => { setKundeOpen(true); kundeInputRef.current?.focus(); }}>
                      <input ref={kundeInputRef} style={innerInput} value={kundeSearch}
                        onChange={e => { setKundeSearch(e.target.value); setKundeOpen(true); setSelectedKunde(null); }}
                        onFocus={() => setKundeOpen(true)} />
                      <SearchIcon />
                    </div>
                  </div>

                  {/* Prosjekt */}
                  <div>
                    <div style={fieldLabel}>Prosjekt</div>
                    <div ref={prosjektAnchorRef} style={inputBox(prosjektOpen)} onClick={() => { setProsjektOpen(true); prosjektInputRef.current?.focus(); }}>
                      <input ref={prosjektInputRef} style={{ ...innerInput, color: prosjektSearch ? "#42424A" : "#6B6B72" }}
                        value={prosjektSearch}
                        placeholder="Søk på navn, prosjektnr eller adresse"
                        onChange={e => { setProsjektSearch(e.target.value); setProsjektOpen(true); setSelectedProsjekt(null); }}
                        onFocus={() => setProsjektOpen(true)} />
                      <SearchIcon />
                    </div>
                  </div>

                  {/* Kundens referanse */}
                  <div>
                    <div style={fieldLabel}>Kundens referanse</div>
                    <div style={inputBox(false)}>
                      <input style={{ ...innerInput, color: "#6B6B72" }} value={kundeRef} onChange={e => setKundeRef(e.target.value)} placeholder="Personen som handler" />
                    </div>
                  </div>

                  {/* Kontaktperson + Rekvisisjonsnummer */}
                  <div style={{ display: "flex", gap: 22 }}>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabel}>Kontaktperson</div>
                      <div
                        ref={kontaktAnchorRef}
                        style={{ ...inputBox(kontaktOpen), padding: "8px 14px", cursor: "pointer" }}
                        onMouseDown={e => { e.preventDefault(); setKontaktOpen(v => !v); }}
                      >
                        <span style={{ flex: 1, fontFamily: F, fontSize: 14, color: kontaktperson ? "#42424A" : "#6B6B72", opacity: kontaktperson ? 1 : 0.6, lineHeight: 1.75, userSelect: "none" }}>
                          {kontaktperson || "Velg kontakt…"}
                        </span>
                        <span style={{ display: "flex", transform: kontaktOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.18s" }}>
                          <ChevronIcon />
                        </span>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={fieldLabel}>Rekvisisjonsnummer</div>
                      <div style={inputBox(false)}>
                        <input style={innerInput} value={rekvisjonsnummer} onChange={e => setRekvisjonsnummer(e.target.value)} />
                      </div>
                    </div>
                  </div>

                </div>
              ) : (
                <div style={{ background: "#fff", border: "1px solid #E6E6E8", borderRadius: 4, padding: 20 }}>
                  <span style={{ color: "#6B6B72", fontSize: 14, fontFamily: F }}>Leveringsadresse-innhold vises her.</span>
                </div>
              )}
            </div>

            {/* ─── Side panel ─── */}
            <div style={{ width: 336, background: "#FAFAFA", borderLeft: "1px solid #E6E6E8", padding: 20, display: "flex", flexDirection: "column", gap: 20, overflowY: "auto", alignSelf: "stretch" }}>

              {!selectedKunde && !selectedProsjekt && (
                <div style={{ fontSize: 13, color: "#6B6B72", lineHeight: 1.6, fontFamily: F }}>
                  Søk og velg en kunde for å se valgt informasjon her.
                </div>
              )}

              {selectedKunde && (
                <InfoCard
                  title="KUNDE"
                  expandLabel="Utvid kundedetaljer"
                  rows={kundeCardRows}
                  expandedCard={kundeExpandedCard}
                />
              )}

              {selectedProsjekt && (
                <InfoCard
                  title="PROSJEKT"
                  expandLabel="Utvid Prosjektdetaljer"
                  rows={prosjektCardRows}
                  expandedCard={prosjektExpandedCard}
                />
              )}

            </div>
          </div>

          {/* Footer */}
          <div style={{ background: "#fff", borderTop: "1px solid #E6E6E8", padding: "15px 20px", display: "flex", justifyContent: "flex-start", gap: 20, alignItems: "center" }}>
            <button onClick={() => canConfirm && setConfirmed(true)}
              style={{ background: canConfirm ? "#0D97FC" : "#EFEFF0", color: canConfirm ? "#fff" : "#42424A", fontFamily: F, fontWeight: 600, fontSize: 15, height: 48, minWidth: 100, padding: "6px 20px", borderRadius: 5, border: "none", cursor: canConfirm ? "pointer" : "default", opacity: canConfirm ? 1 : 0.6, transition: "all 0.15s" }}>
              Bekreft
            </button>
            <button onClick={handleReset}
              style={{ background: "#fff", color: "#090914", fontFamily: F, fontWeight: 600, fontSize: 13, height: 48, minWidth: 100, padding: "6px 20px", borderRadius: 5, border: "1px solid #D5D5D7", cursor: "pointer" }}>
              Avbryt
            </button>
          </div>

        </div>
      </div>

      {/* ─── DROPDOWNS — at JSX root, outside all card containers ─── */}
      {kundeOpen && (
        <DropdownTable rect={kundeRect} modalRight={modalRect?.right} rows={filteredKunder} hoveredIdx={hoveredKunde} onHover={setHoveredKunde} onSelect={handleKundeSelect} />
      )}
      {prosjektOpen && (
        <DropdownTable rect={prosjektRect} modalRight={modalRect?.right} rows={filteredProsjekter} hoveredIdx={hoveredProsjekt} onHover={setHoveredProsjekt} onSelect={handleProsjektSelect} />
      )}
      <SelectList
        anchorRef={kontaktAnchorRef}
        open={kontaktOpen}
        selected={kontaktperson}
        onSelect={setKontaktperson}
        onClose={() => setKontaktOpen(false)}
      />
    </>
  );
}
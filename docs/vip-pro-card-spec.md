# VIP/PRO Card Handling — Prototype B (XL-BYG / Aspect4 DK)

## Overview

XL-BYG (and similar wholesale customers) uses a physical VIP/PRO card for professional customers. The card is issued and validated by **Aspect4**, which remains the source of truth for customer, credit, and pricing data — Fabri POS never owns this data, it only reads and displays it.

This document specifies **Prototype B**'s VIP/PRO card flow. It is a **separate, parallel concept** from the VIP card handling already implemented for **Prototype C ("Aspect4 DK" fake-scan flow)** in this same repo (`POSContext.tsx` — `vipCard`/`vipAcknowledged`/`vipBlocked`; `CustomerSelectionModal.tsx` VIP tab; `RootLayout.tsx` Ctrl+< simulation). The two prototypes are alternate scenarios that can coexist, selected by the active prototype/scenario setting. **Exception (Sept 22 2026):** the delivery-note-only payment rule below was deliberately extended to Prototype C as well, so both scenarios demo the same tender restriction — see *Payment & returns*. Everything else here remains B-only.

This is a **planning artifact only**. It does not scaffold or specify code — no component names, state shapes, or file changes are prescribed here.

---

## Card scanning & identification

- **Entry point**: a new "VIP card" action lets the cashier scan a barcode or manually enter the card number.
- **Aspect4 call**: POS calls Aspect4 (via `aspect4-pos-proxy`) with **only the card number** as input.
- **Response fields**: customer number, name, address, city, credit max, blocked flag, project-required flag, requisition-required flag.
- One customer can hold **multiple VIP cards**.
- The old per-field approach (`#VIP01`–`#VIP25`) is **superseded** — it is not modeled here. Card number is the only input POS sends to Aspect4 for VIP lookup.

---

## Overriding customer data

- On a **valid card**, the current customer's data is overridden by the card response:
  - Credit limit
  - Blocked status
  - Name
  - Address
  - Mandatory-field flags (project required, requisition required)
- Card data **replaces**, does not merge with, the standard Aspect4 account's credit figures.
- Standard credit-limit/blocked-customer logic keeps working unchanged — it simply reads the overridden values, no special-case branching needed there.
- While a VIP card is active, the existing "online credit limit" background enrichment call is **suppressed** — the card response is the only credit source.
- **Card not found** → show an error, no state change (customer remains as before the scan).
- **Card blocked** → show an error, sale is blocked.
- Manually entering a plain debtor/customer number (no card scan) is an **ordinary, non-VIP sale** — none of the above override/blocking behavior applies.

---

## Mandatory fields

- Aspect4's flags (project-required, requisition-required, and possibly recipient/pickup name) control **mandatory-ness only** — they do not affect what gets printed.
- Mandatory fields, once required, must be captured from the cashier and mapped to the corresponding Aspect4 order header field.

---

## Payment & returns

- VIP sales must complete as **delivery/packing note only** — cash payment is not allowed while a VIP card is active.
  - *Implemented in the prototype for both B and C (Sept 22 2026)*: with a PRO card (B) or a VIP card (C) attached, the payment screen **hides** card/cash/Vipps/Klarna and "show more" entirely — they are not rendered, not greyed out — and shows a single locked "Delivery note" tender for the full total. The cash-withdrawal option and the numpad are hidden too (nothing to key in), and the delivery-note entry cannot be undone or discounted, so the cashier cannot reach a tender-less dead end. Wording comes from `proCardDeliveryNoteOnly` / `vipDeliveryNoteOnly`.
- **Returns are fully blocked** while a VIP card is active — no return lines can be added to the sale.

---

## UI direction

- Proposed approach: a **detached VIP flow**. Once a card is scanned, the UI shows only VIP-relevant information, separate from the standard customer-card registration screen.
- A **persistent indicator** must show that a VIP card is currently set for the sale.
- An explicit **"Remove VIP card"** action is required: it re-reads the standard customer record from Aspect4 and resets all overridden fields (credit limit, blocked status, mandatory flags, etc.) back to standard values.
- **Offline mode**: VIP card sales must not be possible offline. Attempting to scan or use a VIP card while offline must surface a clear fault/error rather than silently degrading.

---

## Price check mode

- When **Prototype B / Aspect4 DK** is the active scenario, VIP card scanning is also available from Price Check mode (today's `PriceCheckScreen.tsx`), which already reads a `priceCheckCustomer`/`priceCheckProject` context for pricing lookups.
- Scanning a VIP card in price check applies the card's overridden pricing/discount context to price-check results, using the same Aspect4 card-lookup contract as the sale flow.
- Price check's VIP scan does **not** touch payment, returns, or mandatory-field capture — those rules only apply once an actual sale is started.
- Card-not-found and card-blocked behavior mirror the sale flow (error, no silent fallback).
- Whether "Remove VIP card" in price check shares state with an active sale's VIP card, or is independent per-mode, is **not resolved** — see Open Question 1/2 below; do not assume shared or independent state without a decision.

---

## Open questions

The following are **explicitly unresolved**. They are flagged here so implementation does not proceed on an assumed default.

1. **⚠️ OPEN — not yet decided**: If the standard Aspect4 customer account is shown alongside VIP info, does it have its own separate mandatory fields? How is a conflict between the two sets of mandatory-field requirements (standard account vs. VIP card) handled? This also affects whether Price Check mode's VIP state is shared with or independent from an active sale's VIP state.
2. **⚠️ OPEN — not yet decided**: The exact UI/modal pattern for the detached VIP flow. Snorre's Sept 15 mockup is a rough sketch, not an agreed design — do not treat it as final.
3. **⚠️ OPEN — not yet decided**: Whether/how this needs separate treatment for old vs. new Fabri POS UI.
4. **⚠️ OPEN — not yet decided**: The exact visual distinction between "card blocked" and "credit max exceeded" — these are independent booleans per Snorre's note, and the UI must be able to show either, both, or neither clearly.
5. **⚠️ OPEN — not yet decided**: The mid-sale credit-exceeded notification pattern — credit-exceeded can be discovered after a sale is already in progress, and how/when to surface that to the cashier is undecided.
   - *Prototype C now explores one answer* (still not a decision): a blocking "Credit limit exceeded" modal, fired on the line that tips the running sale total past the limit the VIP card carries — so the cashier is stopped mid-sale rather than at the payment step. Body reads "Your credit max is exceeded. Remove items or remove VIP-card"; the modal offers both of those as actions and shows the limit against the current total. Edge-triggered on crossing the limit, so dismissing it does not immediately re-open it. This is an exploration to react to, not an agreed pattern.
6. **⚠️ OPEN — not yet decided**: The Swagger/API spec for the new Aspect4 webservice is not yet available. No field names or types beyond what's listed in this document should be invented or assumed.

---

## Relationship to existing code (reference only, not to be modified)

For contrast, Prototype C's existing implementation lives in:
- `src/app/contexts/POSContext.tsx` — `vipCard`, `vipAcknowledged`, `vipBlocked`
- `src/app/components/CustomerSelectionModal.tsx` — VIP tab, credit panel, blocked banner
- `src/app/components/RootLayout.tsx` — Ctrl+< fake-scan simulation
- `src/app/types/pos.ts` — `VipCardStatus`, `VipCardData`
- Locale files (`da.ts`, `en.ts`, `sv.ts`, `no.ts`, `types.ts`) — VIP strings labeled "Aspect4 DK / Prototype C"

This spec describes a parallel Prototype B flow and does not require changes to any of the above.

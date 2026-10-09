# VIP Card Handling (XL-BYG / Aspect4 DK)

## Overview

XL-BYG (and similar wholesale customers) uses a physical VIP card for professional customers. The card is issued and validated by **Aspect4**, which remains the source of truth for customer, credit, and pricing data — Fabri POS never owns this data, it only reads and displays it.

There is **one** VIP card concept. Prototypes B and C are two treatments of that same concept, selected by the prototype setting, and they share the scan (Ctrl+<), the card data, the modal and the payment rules. **The only difference is how a blocked card is resolved:** Prototype C lets the cashier dismiss the block and carry on without the card (Flow 1); Prototype B has no override — the sale cannot be finalized while a blocked card is attached.

*(An earlier revision of this document described a second, separate "PRO card" flow with its own modal. That was a prototyping invention, not a real concept, and was removed on Sept 23 2026.)*

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
- **Decided (Sept 23 2026)**: on the VIP Kort tab, **Rekvisisjonsnummer** and **Mottaker / Att.** are always mandatory, in every prototype and every card concept — not conditional on the card's `requisitionRequired`/`allFieldsMandatory` flags. **Navn** is the opposite case: never mandatory, and always locked/non-editable on a VIP card.

---

## Payment & returns

- VIP sales must complete as **delivery/packing note only** — cash payment is not allowed while a VIP card is active.
  - *Implemented in the prototype for both B and C*: with a VIP card attached, the payment screen **hides** card/cash/Vipps/Klarna and "show more" entirely — they are not rendered, not greyed out — and shows a single locked "Delivery note" tender for the full total. The cash-withdrawal option and the numpad are hidden too (nothing to key in), and the delivery-note entry cannot be undone or discounted, so the cashier cannot reach a tender-less dead end. Wording comes from `vipDeliveryNoteOnly`.
- **Returns are fully blocked** while a VIP card is active — no return lines can be added to the sale.

---

## UI direction

- Approach in the prototype: once a card is scanned, the customer modal drops its ordinary tabs and shows a single **VIP Kort** tab, so only VIP-relevant information is on screen. The customer side panel stays, since the card's credit figures are read against the customer's own.
- Card concepts under review, one per scan (rotating, `RootLayout.tsx`): card open · card blocked · address fields omitted · all fields mandatory except Navn · Navn non-editable.
- A **persistent indicator** must show that a VIP card is currently set for the sale.
- An explicit **"Remove VIP card"** action is required: it re-reads the standard customer record from Aspect4 and resets all overridden fields (credit limit, blocked status, mandatory flags, etc.) back to standard values.
- **Offline mode**: VIP card sales must not be possible offline. Attempting to scan or use a VIP card while offline must surface a clear fault/error rather than silently degrading.

---

## Price check mode

- When **Aspect4 DK** is the active scenario (prototype B or C), VIP card scanning is also available from Price Check mode (today's `PriceCheckScreen.tsx`), which already reads a `priceCheckCustomer`/`priceCheckProject` context for pricing lookups.
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

## Where this lives in the prototype

The single VIP card implementation lives in:
- `src/app/contexts/POSContext.tsx` — `vipCard`, `vipAcknowledged`, `vipBlocked`
- `src/app/components/CustomerSelectionModal.tsx` — VIP tab, credit panel, blocked banner, `blockedOverridable` (B vs. C)
- `src/app/components/RootLayout.tsx` — Ctrl+< fake-scan simulation
- `src/app/types/pos.ts` — `VipCardStatus`, `VipCardData`
- `src/app/components/CustomerBadge.tsx` — persistent **VIP** indicator on the sale
- Locale files (`da.ts`, `en.ts`, `sv.ts`, `no.ts`, `types.ts`) — VIP strings

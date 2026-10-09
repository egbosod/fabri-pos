# Icon mapping: lucide-react → Font Awesome Pro

> **Status: on hold (2026-10-09).** Font Awesome Pro was removed so the public GitHub Pages build needs no licence token. Every icon is lucide-react again. The table below is still a complete inventory of the icons in use, so it works as a checklist for moving to Font Awesome or any other icon library later. See [Restoring Font Awesome Pro](#restoring-font-awesome-pro) at the bottom.

Use this table to swap icons one at a time as screens get touched. Every FA name below was checked against the `pro-regular` 7.3 package.

`@mui/icons-material` is in package.json but never imported. Figma-exported screens in `src/app/imports/` draw icons as inline SVG paths and aren't covered here.

## Mapping

| lucide-react | FA Pro (`pro-regular-svg-icons`) | Used in |
|---|---|---|
| AlertCircle | faCircleExclamation | RootLayout, Login |
| AlertTriangle | faTriangleExclamation | PriceCheckScreen |
| ArrowLeft | faArrowLeft | ForgotPassword, TwoFactorLogin |
| Barcode | faBarcode (faBarcodeRead for "scan") | MainMenuWithPriceCheck |
| Bug | faBug | SettingsModal |
| Check / CheckIcon | faCheck | SalgPage, OrderLineRow, EditableOrderLineRow, login/*, ui/select |
| CheckCircle2 | faCircleCheck | ToastLogoutSuccess, TwoFactorLogin |
| ChevronDown / ChevronDownIcon | faChevronDown | SettingsModal, ui/select |
| ChevronRight | faChevronRight | SettingsModal, parked/AppList |
| ChevronUp / ChevronUpIcon | faChevronUp | AggregatedHandOpenOrderGroup, AggregatedOrderClosedGroup, ui/select |
| Copy | faCopy | TwoFactorLogin |
| Eye / EyeOff | faEye / faEyeSlash | Login, ChangePinCode |
| Info | faCircleInfo | TwoFactorLogin |
| KeyRound | faKey (alt: faKeySkeleton) | ProfileBadge |
| Loader2 | faSpinnerThird + `spin` | TwoFactorLogin |
| Lock | faLock | PriceCheckScreen, ProfileBadge |
| LogOut | faArrowRightFromBracket | ProfileBadge, parked/AppList |
| Minus | faMinus | ItemConfigurationModal |
| Pencil | faPen | ProfileBadge |
| Plus | faPlus | SalgPage, CustomerSelectionModal, ItemConfigurationModal |
| Printer | faPrint | DeliveryNoteModal, PackingSlipSignatureModal |
| QrCode | faQrcode | TwoFactorLogin |
| RotateCcw / RotateCcwIcon | faArrowRotateLeft | SalgPage, PaymentFlowModal, OrderLineRow, EditableOrderLineRow, Aggregated*Group |
| Search | faMagnifyingGlass | PaymentCompletedModal, SokOgVelgVarerBeholdning |
| Settings | faGear | TwoFactorLogin, parked/AppList |
| Shield | faShieldHalved (or faShield) | TwoFactorLogin |
| ShoppingCart | faCartShopping | PriceCheckScreen |
| Smartphone | faMobileScreen | TwoFactorLogin |
| Trash2 | faTrashCan | SalgPage |
| UndoIcon | faReply (closest hooked arrow; FA has no `arrow-uturn-left`) | OrderLineRow |
| X | faXmark | PaymentFlowModal, ItemConfigurationModal, SettingsModal, TwoFactorLogin |
| `LucideIcon` (type) | `IconDefinition` from `@fortawesome/fontawesome-svg-core` | EgConfirmModal (callers: PriceCheckScreen, RootLayout) |

## How to swap

Same pattern as `src/app/pages/SalgPage.tsx`:

```tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';

// <X size={24} className="text-primary" />  becomes
<FontAwesomeIcon icon={faXmark} className="text-primary" style={{ fontSize: 24 }} />
```

Watch out for:
- **Size:** lucide's `size={n}` sets width/height. FA sizes by font-size, so use `style={{ fontSize: n }}` or Tailwind `text-[24px]`. `w-4 h-4` classes still work.
- **Stroke:** lucide's `strokeWidth` has no FA equivalent. Switch between the regular and solid weights instead (`pro-solid-svg-icons`).
- **EgConfirmModal:** changing `icon: LucideIcon` to `icon: IconDefinition` means its two callers have to switch in the same change.
- **ui/select.tsx** is shadcn vendor code. Only swap it if the mismatch is visible.
- Once `grep -r "lucide-react" src` comes back empty, remove `lucide-react` (and the unused `@mui/icons-material`) from package.json.

## Restoring Font Awesome Pro

Font Awesome Pro was last in the repo at commit `50f0d72`. Back then it drew four icons: `faCopy`/`faCheck` on the header share-link button, plus `faClipboardList` and `faUser` on the Salg page. Git history still holds a licence token in `.npmrc`. Never copy it back: get a new token from EG DevOps.

1. **Token, never committed.** Add a repo secret `FA_TOKEN` (Settings → Secrets and variables → Actions), and put `export FA_TOKEN=…` in `~/.zshrc` for local installs.
2. **`.npmrc`**: add
   ```
   //artifactory.eg.dk/artifactory/fontawesome-pro-remote/:_authToken=${FA_TOKEN}
   @fortawesome:registry=https://artifactory.eg.dk/artifactory/fontawesome-pro-remote/
   ```
3. **`.github/workflows/deploy.yml`**: give the install step the secret:
   ```yaml
   - run: pnpm install
     env:
       FA_TOKEN: ${{ secrets.FA_TOKEN }}
   ```
4. **Packages:** `pnpm add @fortawesome/fontawesome-svg-core @fortawesome/pro-regular-svg-icons @fortawesome/pro-solid-svg-icons @fortawesome/react-fontawesome`
5. Swap icons with the table and the steps under "How to swap" above.

Moving to another library follows the same shape: credentials (if any) from a secret, a package install, then the table as the swap checklist.

# Icon mapping: lucide-react → Font Awesome Pro

Font Awesome Pro 7.3 is already installed (`@fortawesome/pro-regular-svg-icons`, `pro-solid-svg-icons`, `react-fontawesome`). Use this table to swap icons one at a time as screens get touched. Every FA name below was checked against the installed `pro-regular` package.

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

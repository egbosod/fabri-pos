**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### States
* Normal
  * Purpose: Default state for buttons
  * Visual Style: Neutral border color, placeholder text visible.
* Tab-Focused
  * Purpose: Indicates active user interaction.
  * Visual Style: Highlighted border (Blue 60)
* Active
  * Purpose: Indicates active user interaction.
  * Visual Style: Filled with colour (Blue 60), White text
* Disabled / Inactive
  * Purpose: Indicates the button is unavailable for interaction.
  * Visual Style:
    * Background: #f1f0f1 (var(--secondary) or similar light gray)
    * Border-radius: 5px (var(--radius))
    * Text: #46464b with 60% opacity
    * Font: Montserrat SemiBold (var(--font-weight-semibold))
    * Font size: 15px (var(--text-lg))
    * Line height: 1.75
    * Padding: 20px horizontal, 6px vertical
    * Cursor: not-allowed
    * No interaction or hover effects

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
  * Specifications:
    * Background: var(--primary) (#0d97fc)
    * Text color: var(--primary-foreground) (white)
    * Font: Montserrat SemiBold (var(--font-weight-semibold))
    * Font size: 15px (var(--text-lg))
    * Line height: 1.75
    * Padding: 6px vertical, 20px horizontal
    * Height: 48px
    * Min-width: 100px
    * Border-radius: var(--radius) (5px)
    * Border: none
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : White background with border
  * Usage : Can appear alongside a primary button for less important actions
  * Specifications:
    * Background: white (var(--card))
    * Border: 1px solid var(--border) (#d5d5d7)
    * Text color: var(--foreground) (#090914)
    * Font: Montserrat SemiBold (var(--font-weight-semibold))
    * Font size: 13px (var(--text-sm))
    * Line height: 1.75
    * Padding: 6px vertical, 20px horizontal
    * Height: 48px
    * Min-width: 100px
    * Border-radius: var(--radius) (5px)
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized

## Modal

* Buttons in a modal footer should always be aligned to the left, unless explicitly stated otherwise.
* Button order in modal footer: Primary/Confirm button FIRST (left), then Secondary/Cancel button
* Buttons should be separated by 20px gap

## Background


---

### Checkboxes

Checkboxes allow users to select one or more options from a set. They provide clear visual feedback for selection states.

#### Specifications

**Size**
- Standard: 24px × 24px
- Compact (table rows): 20px × 20px
- Minimum touch target: 44px × 44px (for accessibility)
- Border-radius: 4px
- Border-width: 2px (unchecked state)

**Structure**
- Display: inline-flex
- Clickable area extends to include label
- Cursor: pointer (enabled), not-allowed (disabled)

---

#### States

**Unchecked**
- Border: 2px Black 60 (#909095)
- Background: White (#FFFFFF)
- Hover: Border Black 40 (#5F5E63)
- Active: Border Black 30 (#464648)

**Checked**
- Background: Blue 60 (#0094F9)
- Border: None
- Checkmark: White, bold stroke (2-3px)
- Hover: Background Blue 70 (#6BB3FC)
- Active: Background Blue 50 (#007ACE)

**Indeterminate** (partial selection)
- Background: Blue 60 (#0094F9)
- Border: None
- Dash: White, horizontal line, 12px wide, 2-3px stroke
- Hover: Background Blue 70 (#6BB3FC)
- Usage: "Select all" when some items are selected

**Disabled Unchecked**
- Border: 2px Black 80 (#C7C6CB)
- Background: White or Black 98 (#FAF9FE)
- Cursor: not-allowed
- Opacity: 60% (optional)

**Disabled Checked/Indeterminate**
- Background: Black 90 (#E3E2E7)
- Checkmark/Dash: White
- Cursor: not-allowed
- Opacity: 60% (optional)

**Focus**
- Outline: 2px Blue 60 (#0094F9), 2px offset
- Maintains current state (checked/unchecked/indeterminate)
- Always visible for keyboard navigation

**Error**
- Border: 2px Red 60 (when unchecked)
- Background: Red 60 (when checked/indeterminate)
- Checkmark/Dash: White
- Error message: Below checkbox, 10px text (Tiny), Red 60

---

#### With Labels

**Label Position**: Right of checkbox  
**Label spacing**: 8px (space-1) from checkbox  
**Label typography**: 13px regular (Normal), Black 10  
**Vertical alignment**: Center-aligned with checkbox

**Label States**:
- Default: Black 10 (#1A1B1F)
- Hover: Black 5 (#101115) when checkbox is hovered
- Disabled: Black 40 (#5F5E63)
- Error: Red 60 (when checkbox has error)

**Full Clickable Area**:
- Entire label + checkbox is clickable
- Minimum height: 44px for touch targets
- Padding: 12px vertical (space-1.5) when in list

---

#### Checkbox Groups

**Vertical Layout** (default)
- Spacing between checkboxes: 12px (space-1.5)
- Group label: 12px regular, Black 5, 8px (space-1) margin below
- Container padding: 16px (space-2)

**Horizontal Layout** (when appropriate)
- Spacing between checkboxes: 24px (space-3)
- Use for short lists (2-4 options)
- Ensure sufficient spacing for touch targets

**Nested Checkboxes** (hierarchical)
- Parent checkbox: Uses indeterminate when some children selected
- Child indentation: 32px (space-4) left padding
- Vertical spacing: Same as regular (12px / space-1.5)

**Select All Pattern**:
```
☐ Select All (unchecked: none selected)
  ☐ Option 1
  ☐ Option 2

▣ Select All (indeterminate: some selected)
  ☑ Option 1
  ☐ Option 2

☑ Select All (checked: all selected)
  ☑ Option 1
  ☑ Option 2
```

---

#### Usage Guidelines

**When to Use**
- Multiple selections allowed
- Independent options (selecting one doesn't affect others)
- User needs to see all options at once
- Binary choices (agree/disagree, subscribe/unsubscribe)
- Forms with optional fields

**When NOT to Use**
- Mutually exclusive options → Use radio buttons
- Single selection from many options → Use dropdown
- Simple on/off toggle → Use toggle switch
- Long lists (>10 options) → Consider multi-select dropdown

---

#### Accessibility

**WCAG Requirements**
- Minimum contrast ratio: 3:1 for UI components
- Checked state (Blue 60 on white): ✓ 3.2:1
- Unchecked border (Black 60 on white): ✓ 3.5:1
- Focus indicator: ✓ 2px Blue 60 outline

**Keyboard Navigation**
- **Tab**: Move focus between checkboxes
- **Space**: Toggle checkbox state
- **Shift + Tab**: Move focus backwards
- Focus order: Logical (top to bottom, left to right)

**Screen Reader Support**
- Use semantic HTML: `<input type="checkbox">`
- Associate labels: `<label for="checkbox-id">`
- Announce state: "checked", "unchecked", "partially checked"
- Group context: Use `<fieldset>` and `<legend>` for groups
- Error announcements: Use `aria-describedby` for error messages

**Touch Targets**
- Minimum: 44px × 44px clickable area
- Include label in clickable area
- Sufficient spacing between adjacent checkboxes (min 8px)

---

#### Best Practices

**✓ Do's**
- Always provide clear, concise labels
- Use sentence case for labels
- Keep labels on a single line when possible
- Group related checkboxes together
- Provide "Select All" for long lists
- Show indeterminate state for partial selections
- Use error messages that explain how to fix the issue
- Maintain consistent vertical rhythm (12px spacing)
- Ensure proper contrast in all states

**✗ Don'ts**
- Don't use checkboxes for mutually exclusive options
- Don't place checkboxes without labels (unless in a table column)
- Don't use very long labels (keep under 60 characters)
- Don't disable checkboxes without explanation
- Don't nest more than 2 levels deep
- Don't use checkboxes for actions (use buttons instead)
- Don't rely on color alone to convey state

---

#### CSS Variables Used

```css
/* Checkbox tokens (reference existing palette) */
--checkbox-size: 24px;
--checkbox-border-unchecked: 2px solid var(--black-60, #909095);
--checkbox-border-hover: 2px solid var(--black-40, #5F5E63);
--checkbox-bg-checked: var(--blue-60, #0094F9);
--checkbox-bg-checked-hover: var(--blue-70, #6BB3FC);
--checkbox-bg-disabled-checked: var(--black-90, #E3E2E7);
--checkbox-border-disabled: 2px solid var(--black-80, #C7C6CB);
--checkbox-bg-disabled: var(--black-98, #FAF9FE);
--checkbox-focus-outline: 2px solid var(--blue-60, #0094F9);
```

---

-->
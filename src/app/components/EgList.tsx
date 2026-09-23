import React from 'react';

/**
 * EgList — the EG design system `eg-list` card, ported to the prototype.
 *
 * Mirrors the Angular structure (`eg-list` > `eg-box` > `eg-list-header` +
 * `eg-list-dl` > `eg-list-dl-item` > `eg-list-dt` / `eg-list-dd`): a bordered
 * box with an uppercase header bar and hairline-separated label/value rows.
 *
 * Every card in a right-hand side panel should use this, so the customer,
 * address, credit-info and credit-summary cards read as one component.
 */

export interface EgListRow {
  label: string;
  value: React.ReactNode;
  /** Optional pill rendered after the value (e.g. the "Proff" customer tag) */
  badge?: string | null;
  /** Bold the value — used for totals such as "Gjenstående" */
  emphasise?: boolean;
  /** Overrides the value colour; used to flag an over-limit total */
  valueColor?: string;
}

export interface EgListSection {
  /** Sub-header bar inside the same box (e.g. "ADRESSE", "KREDITINFO") */
  title?: string | null;
  rows: EgListRow[];
}

const FONT = "'Montserrat', sans-serif";

/** Shared styling for the header bar and any in-box section headers */
function EgListHeader({ children, sub = false }: { children: React.ReactNode; sub?: boolean }) {
  return (
    <div style={{
      borderBottom: '1px solid var(--border)',
      padding: sub ? '6px 10px' : 10,
      background: sub ? 'var(--background)' : undefined,
    }}>
      <span style={{
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 'var(--text-xs)',
        color: 'var(--muted-foreground)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        lineHeight: 1.75,
      }}>
        {children}
      </span>
    </div>
  );
}

function EgListItem({ label, value, badge, emphasise, valueColor, borderTop }: EgListRow & { borderTop: boolean }) {
  return (
    <div style={{
      borderTop: borderTop ? '1px solid var(--border)' : 'none',
      padding: 10,
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      fontFamily: FONT,
    }}>
      <span style={{ flex: 1, fontWeight: 700, fontSize: 'var(--text-xs)', color: 'var(--card-foreground)', lineHeight: 1.4 }}>
        {label}
      </span>
      <span style={{
        flex: 1,
        fontWeight: emphasise ? 700 : 400,
        fontSize: 'var(--text-xs)',
        color: valueColor ?? 'var(--card-foreground)',
        lineHeight: 1.4,
      }}>
        {value}
      </span>
      {badge && (
        <span style={{
          background: 'color-mix(in srgb, var(--primary) 18%, var(--card))',
          borderRadius: 'var(--radius-sm)',
          padding: '2px 6px',
          fontWeight: 400,
          fontSize: 'var(--text-xs)',
          color: 'var(--foreground)',
          lineHeight: 1.75,
          whiteSpace: 'nowrap',
          fontFamily: FONT,
        }}>
          {badge}
        </span>
      )}
    </div>
  );
}

export function EgList({ title, rows, sections, tone = 'default', footer }: {
  /** Header bar text. Omit for a headerless box. */
  title?: string | null;
  /** Convenience for a single unsectioned list */
  rows?: EgListRow[];
  /** Multiple labelled groups inside one box */
  sections?: EgListSection[];
  /** `danger` tints the border — e.g. credit over its limit */
  tone?: 'default' | 'danger';
  /** Free-form content below the rows, inside the box (e.g. a warning line) */
  footer?: React.ReactNode;
}) {
  const resolved: EgListSection[] = sections ?? (rows ? [{ rows }] : []);
  const hasHeader = !!title;

  return (
    <div style={{
      background: 'var(--card)',
      border: `1px solid ${tone === 'danger' ? 'color-mix(in srgb, var(--destructive) 50%, transparent)' : 'var(--border)'}`,
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      width: '100%',
      fontFamily: FONT,
    }}>
      {hasHeader && <EgListHeader>{title}</EgListHeader>}
      {resolved.map((section, si) => (
        <div key={si}>
          {section.title && <EgListHeader sub>{section.title}</EgListHeader>}
          {section.rows.map((row, ri) => (
            <EgListItem
              key={ri}
              {...row}
              // No hairline above the very first row when the header bar
              // already provides the separating line.
              borderTop={hasHeader || !!section.title || si > 0 || ri > 0}
            />
          ))}
        </div>
      ))}
      {footer && (
        <div style={{ borderTop: '1px solid var(--border)', padding: 10 }}>
          {footer}
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import svgPaths from '../imports/svg-ivcuuvukk7';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NewProjectData {
  projectId: string;
  projectName: string;
  address: string;
  address2: string;
  postalCode: string;
  city: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
}

interface CreateNewProjectModalProps {
  onClose: () => void;
  customerName?: string;
  onProjectCreated?: (project: NewProjectData) => void;
}

// ─── Field Label ──────────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 700,
      fontSize: 'var(--text-base)',
      color: 'var(--card-foreground)',
      lineHeight: 1.75,
      display: 'block',
      marginBottom: 4,
    }}>
      {children}
    </span>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────

function Field({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  style = {},
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <FieldLabel>{label}</FieldLabel>
      <div style={{
        height: 48,
        background: 'var(--card)',
        border: focused ? '2px solid var(--primary)' : '1px solid var(--border)',
        borderRadius: 'var(--radius)',
        display: 'flex',
        alignItems: 'center',
        padding: focused ? '0 13px' : '0 14px',
        transition: 'border 0.1s',
      }}>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'var(--text-base)',
            color: value ? 'var(--foreground)' : 'var(--muted-foreground)',
            background: 'transparent',
            lineHeight: 1.75,
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export function CreateNewProjectModal({ onClose, customerName, onProjectCreated }: CreateNewProjectModalProps) {
  const [formData, setFormData] = useState<NewProjectData>({
    projectId: '',
    projectName: '',
    address: '',
    address2: '',
    postalCode: '',
    city: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
  });

  const set = (field: keyof NewProjectData) => (value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }));

  const canSave = formData.projectId.trim() !== '' && formData.projectName.trim() !== '';

  const handleSave = () => {
    if (!canSave) return;
    if (onProjectCreated) onProjectCreated(formData);
    onClose();
  };

  // Escape key
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [onClose]);

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.18)' }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--background)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '2px 2px 4px rgba(107,107,114,0.06), 3px 10px 15px rgba(107,107,114,0.08)',
          width: 951,
          maxWidth: '95vw',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Montserrat', sans-serif",
        }}
        onClick={e => e.stopPropagation()}
      >

        {/* ── Header ── */}
        <div style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0, padding: '22px 21px' }}>
            <div style={{ position: 'relative', width: 24, height: 24, flexShrink: 0 }}>
              <svg style={{ display: 'block', width: '100%', height: '100%' }} fill="none" preserveAspectRatio="none" viewBox="0 0 24 23.997">
                <g>
                  <path clipRule="evenodd" d={svgPaths.p156ab980} fill="var(--card-foreground)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p5f2db00} fill="var(--card-foreground)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p21dbe100} fill="var(--card-foreground)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p32762400} fill="var(--card-foreground)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p21baca80} fill="var(--card-foreground)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p10db3d00} fill="var(--card-foreground)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p1df16280} fill="var(--card-foreground)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p2228a3f0} fill="var(--card-foreground)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p5823df0} fill="var(--card-foreground)" fillRule="evenodd" />
                  <path clipRule="evenodd" d={svgPaths.p25fcb880} fill="var(--card-foreground)" fillRule="evenodd" />
                </g>
              </svg>
            </div>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 'var(--text-lg)',
              color: 'var(--card-foreground)',
              lineHeight: 1.3,
              marginLeft: 35,
              marginTop: 3,
              whiteSpace: 'nowrap',
            }}>
              Create new project{customerName ? ` assigned to ${customerName}` : ''}
            </span>
          </div>
        </div>

        {/* ── Tabs Header ── */}
        <div style={{ background: 'var(--card)', boxShadow: '0 3px 3px rgba(107,107,114,0.06)', flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 30, padding: '10px 20px 0', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: 48, justifyContent: 'flex-end', flexShrink: 0 }}>
              <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 'var(--text-base)', color: 'var(--foreground)', lineHeight: 1.75, whiteSpace: 'nowrap', paddingBottom: 6 }}>
                New project
              </span>
              <div style={{ height: 3, width: '100%', background: 'var(--foreground)', borderRadius: '2px 2px 0 0', flexShrink: 0 }} />
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Project info card */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Id */}
            <Field label="Id *" value={formData.projectId} onChange={set('projectId')} />

            {/* Name of project */}
            <Field label="Name of project *" value={formData.projectName} onChange={set('projectName')} />

            {/* Address + Address 2 */}
            <div style={{ display: 'flex', gap: 22 }}>
              <Field label="Address" value={formData.address} onChange={set('address')} style={{ flex: 1 }} />
              <Field label="Address 2" value={formData.address2} onChange={set('address2')} style={{ flex: 1 }} />
            </div>

            {/* Postal code + City */}
            <div style={{ display: 'flex', gap: 22 }}>
              <Field label="Postal code" value={formData.postalCode} onChange={set('postalCode')} style={{ flex: 1 }} />
              <Field label="City" value={formData.city} onChange={set('city')} style={{ flex: 1 }} />
            </div>
          </div>

          {/* Contact person card */}
          <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Contact person — half width */}
            <div style={{ width: '50%', paddingRight: 11 }}>
              <Field label="Contact person" value={formData.contactPerson} onChange={set('contactPerson')} />
            </div>

            {/* E-mail + Phone number */}
            <div style={{ display: 'flex', gap: 22 }}>
              <Field label="E-mail" type="email" value={formData.email} onChange={set('email')} style={{ flex: 1 }} />
              <Field label="Phone number" type="tel" value={formData.phoneNumber} onChange={set('phoneNumber')} style={{ flex: 1 }} />
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{ background: 'var(--card)', borderTop: '1px solid var(--border)', flexShrink: 0, boxShadow: '0px -2px 4px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 20, padding: '15px 20px' }}>
            {/* Save and create - PRIMARY BUTTON FIRST */}
            <button
              onClick={handleSave}
              disabled={!canSave}
              style={{
                height: 48,
                minWidth: 100,
                padding: '6px 20px',
                background: canSave ? 'var(--primary)' : 'var(--secondary)',
                border: 'none',
                borderRadius: 'var(--radius)',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--text-lg)',
                lineHeight: 1.75,
                color: canSave ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                opacity: canSave ? 1 : 0.6,
                cursor: canSave ? 'pointer' : 'not-allowed',
                transition: 'background 0.15s, opacity 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => { if (canSave) e.currentTarget.style.background = 'color-mix(in srgb, var(--primary) 88%, black)'; }}
              onMouseLeave={e => { if (canSave) e.currentTarget.style.background = 'var(--primary)'; }}
            >
              Save and create
            </button>

            {/* Cancel - SECONDARY BUTTON SECOND */}
            <button
              onClick={onClose}
              style={{
                height: 48,
                minWidth: 100,
                padding: '6px 20px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 'var(--font-weight-semibold)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.75,
                color: 'var(--foreground)',
                cursor: 'pointer',
                transition: 'background 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'color-mix(in srgb, var(--border) 20%, var(--card))')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--card)')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
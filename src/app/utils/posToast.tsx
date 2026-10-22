import React, { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { X } from 'lucide-react';

/**
 * Fabri design-system toasts, bottom right: success (green), error (red),
 * warning (orange), info (blue, neutral). Tinted card, 1px coloured border,
 * message left, round grey close button right. Not the pink prototype layer.
 */
type Kind = 'success' | 'error' | 'warning' | 'info';

const COLORS: Record<Kind, { border: string; bg: string }> = {
  info:    { border: 'var(--Blue-Blue-50, #1E9BF0)',     bg: 'var(--Blue-Blue-98, #F4F9FE)' },
  error:   { border: 'var(--Red-Red-50, #C0392B)',       bg: 'var(--Red-Red-98, #FFF6F4)' },
  warning: { border: 'var(--Orange-Orange-60, #E66F04)', bg: 'var(--Orange-Orange-98, #FFF8F3)' },
  success: { border: 'var(--Green-Green-50, #3BAF5E)',   bg: 'var(--Green-Green-98, #F0FAF2)' },
};

function CloseButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: 32,
        height: 32,
        borderRadius: '50%',
        border: 'none',
        // Nudge towards --foreground rather than swapping to another token, so
        // the hover reads in light mode (darker) and dark mode (lighter) alike.
        background: hovered
          ? 'color-mix(in srgb, var(--foreground) 12%, var(--muted))'
          : 'var(--muted)',
        color: 'var(--foreground)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 150ms ease',
      }}
    >
      <X size={16} strokeWidth={1.5} />
    </button>
  );
}

function show(kind: Kind, message: string, duration = 2500) {
  const { border, bg } = COLORS[kind];
  return toast.custom(
    (id) => (
      <div
        role={kind === 'error' || kind === 'warning' ? 'alert' : 'status'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          minWidth: 280,
          padding: '12px 16px',
          background: bg,
          border: `1px solid ${border}`,
          borderRadius: 'var(--radius-sm)',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: 'var(--text-base)',
          color: 'var(--foreground)',
          lineHeight: 1.5,
        }}
      >
        <span>{message}</span>
        <CloseButton onClick={() => toast.dismiss(id)} />
      </div>
    ),
    { duration },
  );
}

export const posToast = {
  success: (message: string, duration?: number) => show('success', message, duration),
  error: (message: string, duration?: number) => show('error', message, duration),
  warning: (message: string, duration?: number) => show('warning', message, duration),
  info: (message: string, duration?: number) => show('info', message, duration),
};

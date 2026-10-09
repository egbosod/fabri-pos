import { useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';

interface EgConfirmModalProps {
  icon: LucideIcon;
  iconClassName?: string;
  title: string;
  children: React.ReactNode;
  primaryLabel: string;
  onPrimary: () => void;
  /** Omit for a single-button (dismiss-only) modal, e.g. the lock notice. */
  secondaryLabel?: string;
  onSecondary?: () => void;
  onDismiss: () => void;
}

/**
 * Shared shell for the EG-style confirmation modals used across price check
 * (lock notice, "Add to Cart" mismatch, close guard): icon + title header,
 * a body slot, and a primary/secondary footer (primary first).
 */
export function EgConfirmModal({
  icon: Icon,
  iconClassName = 'text-primary',
  title,
  children,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  onDismiss,
}: EgConfirmModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onDismiss]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onDismiss} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto bg-card rounded-[3px] shadow-lg max-w-[460px] w-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-[10px] p-[20px] border-b border-border">
            <Icon className={iconClassName} size={24} />
            <p className="text-foreground font-semibold" style={{ fontSize: 'var(--text-lg)' }}>
              {title}
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-[15px] p-[20px]">{children}</div>

          {/* Footer — primary first, then secondary */}
          <div className="flex gap-[10px] p-[20px] border-t border-border self-end">
            <button
              onClick={onPrimary}
              className="h-[48px] rounded-[var(--radius)] px-[20px]"
              style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
            >
              {primaryLabel}
            </button>
            {secondaryLabel && onSecondary && (
              <button onClick={onSecondary} className="h-[48px] rounded-[var(--radius)] px-[20px] border border-border">
                {secondaryLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

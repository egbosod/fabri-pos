import { useEffect, useRef, useState } from 'react';
import { Printer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PackingSlipSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Fires when the customer's signature is approved — advances to the delivery note step. */
  onApprove: () => void;
}

/**
 * Step 1 of the packing slip flow: the customer signs on the terminal before a
 * packing slip may be issued. "Godkjenn signaturen" stays disabled until at
 * least one stroke has been drawn.
 */
export function PackingSlipSignatureModal({ isOpen, onClose, onApprove }: PackingSlipSignatureModalProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Size the backing store to the rendered box so strokes land under the pointer.
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#22222c';
    setHasSignature(false);
  }, [isOpen]);

  if (!isOpen) return null;

  const pointAt = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const { x, y } = pointAt(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const extendStroke = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = pointAt(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    if (!hasSignature) setHasSignature(true);
  };

  const endStroke = () => {
    drawing.current = false;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto bg-card rounded-[var(--radius)] shadow-lg max-w-[640px] w-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-[10px] p-[20px] border-b border-border">
            <Printer className="text-foreground" size={24} />
            <p className="text-foreground font-semibold" style={{ fontSize: 'var(--text-lg)' }}>
              {t('packingSlip')}
            </p>
          </div>

          {/* Body */}
          <div className="flex flex-col gap-[15px] p-[20px]">
            <div className="self-start border border-primary rounded-[var(--radius)] px-[15px] py-[12px]">
              <p className="text-primary" style={{ fontSize: 'var(--text-base)' }}>
                {t('signatureRequiredNotice')}
              </p>
            </div>

            <div className="relative h-[300px] w-full rounded-[var(--radius)] border border-border">
              {!hasSignature && (
                <div className="absolute inset-0 flex flex-col gap-[10px] items-center justify-center pointer-events-none">
                  <SignatureGlyph />
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-lg)' }}>
                    {t('signaturePlaceholder')}
                  </p>
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 size-full touch-none cursor-crosshair"
                onPointerDown={startStroke}
                onPointerMove={extendStroke}
                onPointerUp={endStroke}
                onPointerLeave={endStroke}
              />
            </div>
          </div>

          {/* Footer — primary first, then secondary */}
          <div className="flex gap-[10px] p-[20px] border-t border-border">
            <button
              onClick={() => hasSignature && onApprove()}
              disabled={!hasSignature}
              className={`h-[48px] rounded-[var(--radius)] px-[20px] transition-colors ${
                hasSignature
                  ? 'bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed border border-border'
              }`}
            >
              {t('approveSignature')}
            </button>
            <button
              onClick={clearSignature}
              className="h-[48px] rounded-[var(--radius)] px-[20px] border border-border cursor-pointer hover:bg-muted/50 transition-colors"
            >
              {t('clearSignature')}
            </button>
            <button
              onClick={onClose}
              className="h-[48px] rounded-[var(--radius)] px-[20px] border border-border cursor-pointer hover:bg-muted/50 transition-colors"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function SignatureGlyph() {
  return (
    <svg width="60" height="46" viewBox="0 0 60 46" fill="none" aria-hidden="true">
      <path
        d="M14 34c6-4 9-11 9-19 0-6-2-9-5-9s-5 4-5 11c0 9 5 17 12 17 5 0 8-3 10-8 2 5 5 8 9 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-muted-foreground opacity-50"
      />
      <path d="M8 42h44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted-foreground opacity-50" />
    </svg>
  );
}

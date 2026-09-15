/**
 * Plays a short barcode-scanner beep using the Web Audio API.
 *
 * Used by:
 *  – The global Ctrl+- shortcut in RootLayout (employee/customer card scans)
 *  – The Ctrl+- handler on the customer search input in CustomerSelectionModal
 *  – Future article/product scan triggers
 *
 * The sound is intentionally brief and low-volume so it mimics a real
 * handheld barcode reader without being disruptive.
 */
export function playBarcodeBeep(): void {
  try {
    const AudioCtx =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(2400, ctx.currentTime);
    osc.frequency.setValueAtTime(1800, ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch {
    /* silent – Web Audio not available */
  }
}

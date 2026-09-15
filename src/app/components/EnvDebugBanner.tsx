/**
 * EnvDebugBanner
 * Toggle visibility with the "d" key or the switch in Settings (press "." to open).
 */

import { isFigmaMake, getEnvironment, getPrototypeUrl } from '../utils/environmentNavigation';
import { useSettings } from '../contexts/SettingsContext';

export function EnvDebugBanner() {
  const { showDebugBanner } = useSettings();
  if (!showDebugBanner) return null;

  const hostname = window.location.hostname;
  const href     = window.location.href;
  const env      = getEnvironment();
  const isMake   = isFigmaMake();

  let inIframe      = false;
  let canReadParent = false;
  let parentHref    = '(cross-origin – cannot read)';

  try { inIframe = window.self !== window.top; } catch { inIframe = true; }
  try {
    if (window.top) { parentHref = window.top.location.href; canReadParent = true; }
  } catch { /* cross-origin */ }

  const envPill    = isMake ? 'bg-yellow-400 text-yellow-900' : 'bg-green-500 text-white';
  const parentPill = canReadParent ? 'bg-slate-500 text-white' : 'bg-orange-500 text-white';

  return (
    <div
      style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 11, zIndex: 999999, lineHeight: 1.6 }}
      className="fixed top-0 left-0 right-0 bg-black/85 text-white px-3 py-2 flex flex-col gap-[2px] pointer-events-none select-none"
    >
      <div className="flex items-center gap-2 flex-wrap">
        <span className={`px-2 py-[1px] rounded text-[11px] font-bold ${envPill}`}>
          ENV: {env.toUpperCase()}
        </span>
        <span className={`px-2 py-[1px] rounded text-[11px] ${inIframe ? 'bg-orange-500 text-white' : 'bg-slate-600 text-slate-200'}`}>
          {inIframe ? 'inside iframe' : 'top-level window'}
        </span>
        <span className={`px-2 py-[1px] rounded text-[11px] ${parentPill}`}>
          parent: {canReadParent ? 'readable (same-origin)' : 'BLOCKED (cross-origin)'}
        </span>
      </div>
      <div><span className="text-slate-400">this hostname: </span><span className="text-cyan-300">{hostname}</span></div>
      <div><span className="text-slate-400">this href:     </span><span className="text-cyan-200 break-all">{href}</span></div>
      <div><span className="text-slate-400">parent href:   </span><span className="text-purple-300 break-all">{parentHref}</span></div>
      <div className="flex gap-2 flex-wrap mt-[2px]">
        <span className="text-slate-400">loginHome →</span>
        <span className="text-green-300">{getPrototypeUrl('loginHome')}</span>
      </div>
    </div>
  );
}

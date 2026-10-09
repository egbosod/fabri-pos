import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { useSettings } from '../contexts/SettingsContext';
import { buildShareURL, type SharedSettings } from '../utils/settingsUrl';
import { PROTOTYPE_TOAST_OPTS } from '../utils/prototypeDescriptions';

/**
 * Copies a share link encoding the current prototype settings.
 * `copyStatus` flashes for 2s after a click so callers can swap their label or
 * icon in place; the pink toast is what a collaborator sees in a screen share.
 * English-only, like the rest of this prototyping layer.
 */
export function useCopyShareLink() {
  const {
    switchUserFlow,
    erpScenario,
    hovedordrePlacement,
    customerSearchConcept,
    priceCheckLockConcept,
    showFlowIndicator,
    showDebugBanner,
    allowCreateProject,
    allowCreateContactPerson,
    showPasswordOption,
    scanCustomerCard,
    twoFactorEnabled,
    showLoginButton,
    showTwoFactorButton,
    showForgotPassword,
  } = useSettings();

  const [copyStatus, setCopyStatus] = useState<'copied' | 'failed' | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const flashCopyStatus = (status: 'copied' | 'failed') => {
    setCopyStatus(status);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopyStatus(null), 2000);
  };

  const copyShareLink = () => {
    const settings: SharedSettings = {
      switchUserFlow,
      erpScenario,
      hovedordrePlacement,
      customerSearchConcept,
      priceCheckLockConcept,
      showFlowIndicator,
      showDebugBanner,
      allowCreateProject,
      allowCreateContactPerson,
      showPasswordOption,
      scanCustomerCard,
      twoFactorEnabled,
      showLoginButton,
      showTwoFactorButton,
      showForgotPassword,
    };

    navigator.clipboard.writeText(buildShareURL(settings)).then(
      () => {
        flashCopyStatus('copied');
        toast('Share link copied', {
          description: 'Your current prototype settings are encoded in the URL',
          duration: 2500,
          ...PROTOTYPE_TOAST_OPTS,
        });
      },
      () => {
        flashCopyStatus('failed');
        toast('Copy failed', {
          description: 'Copy the URL from the address bar instead',
          duration: 3000,
          ...PROTOTYPE_TOAST_OPTS,
        });
      },
    );
  };

  return { copyStatus, copyShareLink };
}

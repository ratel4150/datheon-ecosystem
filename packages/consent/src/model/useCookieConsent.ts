// packages/consent/src/model/useCookieConsent.ts
'use client';

import { useCallback, useEffect, useState } from 'react';
import { getStoredConsent, setStoredConsent, CONSENT_REOPEN_EVENT, CONSENT_UPDATED_EVENT, type ConsentChoices } from '../lib';

const DEFAULT_CHOICES: ConsentChoices = { analytics: false, marketing: false };

export function useCookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [choices, setChoices] = useState<ConsentChoices>(DEFAULT_CHOICES);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    } else {
      setChoices(stored);
    }
    const onReopen = () => {
      setVisible(true);
      setExpanded(true);
    };
    window.addEventListener(CONSENT_REOPEN_EVENT, onReopen);
    return () => window.removeEventListener(CONSENT_REOPEN_EVENT, onReopen);
  }, []);

  const persist = useCallback((next: ConsentChoices) => {
    setStoredConsent(next);
    setChoices(next);
    setVisible(false);
    setExpanded(false);
    window.dispatchEvent(new CustomEvent(CONSENT_UPDATED_EVENT, { detail: next }));
  }, []);

  const acceptAll = useCallback(() => persist({ analytics: true, marketing: true }), [persist]);
  const rejectAll = useCallback(() => persist({ analytics: false, marketing: false }), [persist]);
  const saveCustom = useCallback((next: ConsentChoices) => persist(next), [persist]);
  const openSettings = useCallback(() => setExpanded(true), []);
  const dismiss = useCallback(() => {
    setVisible(false);
    setExpanded(false);
  }, []);

  return { visible, expanded, choices, acceptAll, rejectAll, saveCustom, openSettings, dismiss };
}

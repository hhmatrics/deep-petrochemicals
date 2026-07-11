"use client";

import { useCallback, useEffect } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

interface Grecaptcha {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, opts: { action: string }) => Promise<string>;
}

/**
 * Loads Google reCAPTCHA v3 only when NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set.
 * With no key, `enabled` is false and forms fall back to the honeypot only.
 * `getToken` resolves via grecaptcha.ready(), so no local ready-state is needed.
 */
export function useRecaptcha() {
  useEffect(() => {
    if (!SITE_KEY) return;
    if (document.querySelector("script[data-recaptcha]")) return;
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.defer = true;
    s.dataset.recaptcha = "1";
    document.head.appendChild(s);
  }, []);

  const getToken = useCallback(async (action: string): Promise<string | undefined> => {
    if (!SITE_KEY) return undefined;
    const gr = (window as unknown as { grecaptcha?: Grecaptcha }).grecaptcha;
    if (!gr) return undefined;
    return new Promise((resolve) => {
      gr.ready(() => {
        gr.execute(SITE_KEY, { action })
          .then(resolve)
          .catch(() => resolve(undefined));
      });
    });
  }, []);

  return { enabled: !!SITE_KEY, getToken };
}

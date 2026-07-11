"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "dpl-cookie-consent";

/**
 * Lightweight cookie/consent banner. No analytics scripts load until consent is
 * given (analytics itself is wired at launch — Phase 10). Choice persists in
 * localStorage.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time reveal after reading localStorage
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* localStorage unavailable — skip banner */
    }
  }, []);

  function choose(value: "accepted" | "declined") {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4">
      <div className="container-page mx-auto max-w-4xl rounded-2xl border border-ink-200 bg-paper p-5 shadow-xl shadow-ink-900/10 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm text-ink-600">
          We use cookies to improve your experience and understand site usage. See
          our{" "}
          <Link href="/privacy-policy" className="font-medium text-brand-600 underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-4 flex shrink-0 gap-3 sm:mt-0">
          <button
            onClick={() => choose("declined")}
            className="rounded-lg border border-ink-300 px-4 py-2 text-sm font-semibold text-ink-700 hover:border-ink-400"
          >
            Decline
          </button>
          <button
            onClick={() => choose("accepted")}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

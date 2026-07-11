/** Shared enquiry types + client submit helper (used by ContactForm & QuoteForm). */

export interface EnquiryPayload {
  type: "contact" | "quote";
  name: string;
  email: string;
  company?: string;
  phone?: string;
  region?: string;
  product?: string;
  grade?: string;
  quantity?: string;
  message?: string;
  /** Honeypot — must stay empty. */
  company_website?: string;
  recaptchaToken?: string;
}

export interface EnquiryResult {
  ok: boolean;
  /** true = actually emailed; false = captured but no delivery service configured. */
  delivered?: boolean;
  error?: string;
}

export async function submitEnquiry(
  payload: EnquiryPayload,
): Promise<EnquiryResult> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as EnquiryResult;
    if (!res.ok) {
      return { ok: false, error: data.error || "Something went wrong. Please try again." };
    }
    return { ok: true, delivered: data.delivered };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}

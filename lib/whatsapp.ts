/**
 * WhatsApp hand-off helpers.
 *
 * When COMPANY.whatsapp is set, the enquiry + quote forms open a WhatsApp chat
 * to that number with every field the user filled pre-formatted into the message.
 * The moment the owner sets the number in `data/company.ts`, the forms switch to
 * this WhatsApp flow automatically (no code change needed).
 */
import { COMPANY, isKnown } from "@/data/company";

/** Company WhatsApp number as digits only (intl format), or null if not set. */
export function whatsappNumber(): string | null {
  return isKnown(COMPANY.whatsapp) ? COMPANY.whatsapp.replace(/\D/g, "") : null;
}

export interface WaField {
  label: string;
  value?: string | null;
}

/**
 * Build a `wa.me` deep link with a formatted message from label/value pairs.
 * Empty fields are dropped so the message only shows what the user entered.
 * WhatsApp renders `*text*` as bold.
 */
export function buildWhatsappUrl(
  numberDigits: string,
  heading: string,
  fields: WaField[],
): string {
  const body = fields
    .filter((f) => f.value && String(f.value).trim())
    .map((f) => `*${f.label}:* ${String(f.value).trim()}`)
    .join("\n");
  const text = body ? `${heading}\n\n${body}` : heading;
  return `https://wa.me/${numberDigits}?text=${encodeURIComponent(text)}`;
}

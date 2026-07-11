import { COMPANY, isKnown } from "@/data/company";

/**
 * Floating WhatsApp Business chat button (brief §6).
 * Renders only when COMPANY.whatsapp is set (digits, intl format e.g. 9198XXXXXXXX).
 */
export function WhatsAppButton() {
  if (!isKnown(COMPANY.whatsapp)) return null;

  const text = encodeURIComponent(
    `Hello ${COMPANY.shortName}, I have an enquiry about your products.`,
  );
  const href = `https://wa.me/${COMPANY.whatsapp}?text=${text}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-105"
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.04 8.04 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.1 8.09a8.1 8.1 0 0 1-4.12-1.13l-.3-.17-3.12.82.83-3.04-.19-.31a8.02 8.02 0 0 1-1.24-4.29c0-4.46 3.63-8.1 8.1-8.1Zm4.68 11.44c-.08-.13-.29-.2-.6-.36-.31-.16-1.84-.91-2.13-1.01-.29-.11-.5-.16-.7.16-.21.31-.8 1-.98 1.21-.18.2-.36.23-.67.08-.31-.16-1.31-.48-2.5-1.54a9.4 9.4 0 0 1-1.73-2.15c-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.55.16-.18.21-.31.31-.52.1-.21.05-.39-.03-.55-.08-.16-.7-1.69-.96-2.31-.25-.61-.51-.53-.7-.54h-.6c-.21 0-.55.08-.83.39-.29.31-1.09 1.06-1.09 2.59s1.12 3 1.27 3.21c.16.2 2.2 3.36 5.33 4.71.74.32 1.32.51 1.78.66.75.24 1.43.2 1.97.12.6-.09 1.84-.75 2.1-1.48.26-.73.26-1.35.18-1.48Z" />
      </svg>
    </a>
  );
}

"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { PRODUCTS, getProduct } from "@/data/products";
import { submitEnquiry } from "@/lib/enquiry";
import { buildWhatsappUrl, whatsappNumber } from "@/lib/whatsapp";
import { IconWhatsapp } from "@/components/icons";

const fieldCls =
  "w-full rounded-lg border border-ink-300 bg-paper px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 disabled:opacity-60";
const labelCls = "block text-sm font-medium text-ink-800";

// Set once at build time from COMPANY.whatsapp — when present, the form hands off
// to WhatsApp with every filled field; otherwise it falls back to email capture.
const WA_NUMBER = whatsappNumber();

type Status = "idle" | "submitting" | "sent" | "captured" | "handoff" | "error";

export function QuoteForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [product, setProduct] = useState(defaultProduct);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [waUrl, setWaUrl] = useState("");

  const grades = useMemo(() => getProduct(product)?.grades ?? [], [product]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);

    const productSlug = String(fd.get("product") || "");
    const productName = productSlug
      ? getProduct(productSlug)?.name.split(" (")[0] ?? productSlug
      : "";
    const quantity = [fd.get("quantity"), fd.get("unit")].filter(Boolean).join(" ");
    const payload = {
      type: "quote" as const,
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      region: String(fd.get("region") || ""),
      product: productSlug,
      grade: String(fd.get("grade") || ""),
      quantity,
      message: String(fd.get("message") || ""),
      company_website: String(fd.get("company_website") || ""),
    };

    // Honeypot — silently accept without doing anything.
    if (payload.company_website) {
      setStatus("captured");
      return;
    }

    // WhatsApp hand-off: build the message and open the chat synchronously
    // (before any await) so the browser keeps the user-gesture and doesn't block it.
    if (WA_NUMBER) {
      const url = buildWhatsappUrl(
        WA_NUMBER,
        "*New Quote Request — Deep Petrochemicals Ltd*",
        [
          { label: "Name", value: payload.name },
          { label: "Company", value: payload.company },
          { label: "Email", value: payload.email },
          { label: "Phone", value: payload.phone },
          { label: "Product", value: productName },
          { label: "Grade", value: payload.grade },
          { label: "Quantity", value: payload.quantity },
          { label: "Destination", value: payload.region },
          { label: "Requirements", value: payload.message },
        ],
      );
      setWaUrl(url);
      window.open(url, "_blank", "noopener,noreferrer");
      setStatus("handoff");
      // Best-effort capture too, so the lead is recorded even if they don't press send.
      void submitEnquiry(payload);
      return;
    }

    // Fallback: email / API submission.
    setStatus("submitting");
    const result = await submitEnquiry(payload);
    if (result.ok) setStatus(result.delivered ? "sent" : "captured");
    else {
      setError(result.error || "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "handoff") {
    return (
      <div role="status" className="rounded-xl border border-leaf-200 bg-leaf-50 p-6 text-center">
        <p className="font-display text-lg font-bold text-leaf-800">
          Opening WhatsApp…
        </p>
        <p className="mt-2 text-sm text-leaf-900/80">
          We’ve prefilled your quote request. Just press send in WhatsApp and our
          team will get back to you within 48 hours.
        </p>
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 font-semibold text-white transition hover:brightness-95"
        >
          <IconWhatsapp />
          Open WhatsApp
        </a>
      </div>
    );
  }

  if (status === "sent" || status === "captured") {
    return (
      <div role="status" className="rounded-xl border border-leaf-200 bg-leaf-50 p-6 text-center">
        <p className="font-display text-lg font-bold text-leaf-800">
          Thanks — your quote request is in.
        </p>
        <p className="mt-2 text-sm text-leaf-900/80">
          {status === "sent"
            ? "Our sales team will get back to you within 48 hours."
            : "We’ve recorded your request and will be in touch. (Email delivery is being finalised.)"}
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name <span className="text-brand-600">*</span>
          </label>
          <input id="name" name="name" required disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company <span className="text-brand-600">*</span>
          </label>
          <input id="company" name="company" required disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelCls}>
            Work email <span className="text-brand-600">*</span>
          </label>
          <input id="email" name="email" type="email" required disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone
          </label>
          <input id="phone" name="phone" type="tel" disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="product" className={labelCls}>
            Product <span className="text-brand-600">*</span>
          </label>
          <select
            id="product"
            name="product"
            required
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            disabled={submitting}
            className={`mt-1.5 ${fieldCls}`}
          >
            <option value="">Select a product…</option>
            {PRODUCTS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name.includes("(") ? p.name.split(" (")[0] : p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="grade" className={labelCls}>
            Grade
          </label>
          <select id="grade" name="grade" disabled={submitting || grades.length === 0} className={`mt-1.5 ${fieldCls}`}>
            <option value="">{grades.length ? "Any / not sure" : "Select a product first"}</option>
            {grades.map((g) => (
              <option key={g.grade} value={g.grade}>
                {g.grade}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_1fr]">
        <div className="sm:col-span-1">
          <label htmlFor="quantity" className={labelCls}>
            Quantity
          </label>
          <input id="quantity" name="quantity" inputMode="decimal" placeholder="e.g. 500" disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="unit" className={labelCls}>
            Unit
          </label>
          <select id="unit" name="unit" disabled={submitting} className={`mt-1.5 ${fieldCls}`}>
            <option value="MT / month">MT / month</option>
            <option value="MT (one-time)">MT (one-time)</option>
            <option value="Litres">Litres</option>
            <option value="Drums">Drums</option>
          </select>
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="region" className={labelCls}>
            Destination
          </label>
          <input id="region" name="region" placeholder="Country / region" disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Requirements / notes
        </label>
        <textarea id="message" name="message" rows={4} disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
      </div>

      {/* Honeypot */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {status === "error" ? (
        <p role="alert" className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold text-white transition-colors disabled:opacity-70 ${
          WA_NUMBER ? "bg-[#25D366] hover:brightness-95" : "bg-brand-600 hover:bg-brand-700"
        }`}
      >
        {WA_NUMBER ? (
          <>
            <IconWhatsapp />
            {submitting ? "Opening…" : "Request quote on WhatsApp"}
          </>
        ) : (
          submitting ? "Submitting…" : "Request quote"
        )}
      </button>
      <p className="text-xs text-ink-500">
        {WA_NUMBER
          ? "Sends your details straight to our team on WhatsApp. "
          : "We respond to quote requests within 48 hours. "}
        Fields marked <span className="text-brand-600">*</span> are required.
      </p>
    </form>
  );
}

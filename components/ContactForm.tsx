"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { PRODUCTS } from "@/data/products";
import { submitEnquiry } from "@/lib/enquiry";

const fieldCls =
  "w-full rounded-lg border border-ink-300 bg-paper px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 disabled:opacity-60";
const labelCls = "block text-sm font-medium text-ink-800";

type Status = "idle" | "submitting" | "sent" | "captured" | "error";

export function ContactForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);

    const productSlug = String(fd.get("product") || "");
    const payload = {
      type: "contact" as const,
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      product: productSlug,
      message: String(fd.get("message") || ""),
      company_website: String(fd.get("company_website") || ""),
    };

    // Honeypot — silently accept.
    if (payload.company_website) {
      setStatus("captured");
      return;
    }

    setStatus("submitting");
    const result = await submitEnquiry(payload);
    if (result.ok) {
      setStatus(result.delivered ? "sent" : "captured");
    } else {
      setError(result.error || "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent" || status === "captured") {
    return (
      <div
        role="status"
        className="rounded-xl border border-leaf-200 bg-leaf-50 p-6 text-center"
      >
        <p className="font-display text-lg font-bold text-leaf-800">
          Thank you — your enquiry has been received.
        </p>
        <p className="mt-2 text-sm text-leaf-900/80">
          {status === "sent"
            ? "Our team will respond within 48 hours."
            : "We’ve recorded your details and will be in touch. (Email delivery is being finalised.)"}
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
            Company
          </label>
          <input id="company" name="company" disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelCls}>
          Work email <span className="text-brand-600">*</span>
        </label>
        <input id="email" name="email" type="email" required disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
      </div>

      <div>
        <label htmlFor="product" className={labelCls}>
          Product interest
        </label>
        <select id="product" name="product" defaultValue={defaultProduct} disabled={submitting} className={`mt-1.5 ${fieldCls}`}>
          <option value="">General enquiry</option>
          {PRODUCTS.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name.includes("(") ? p.name.split(" (")[0] : p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Message <span className="text-brand-600">*</span>
        </label>
        <textarea id="message" name="message" rows={5} required disabled={submitting} className={`mt-1.5 ${fieldCls}`} />
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
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70 sm:w-auto"
      >
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
      <p className="text-xs text-ink-500">We respond to enquiries within 48 hours.</p>
    </form>
  );
}

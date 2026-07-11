"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { PRODUCTS, getProduct } from "@/data/products";
import { submitEnquiry } from "@/lib/enquiry";
import { useRecaptcha } from "@/components/useRecaptcha";

const fieldCls =
  "w-full rounded-lg border border-ink-300 bg-paper px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 disabled:opacity-60";
const labelCls = "block text-sm font-medium text-ink-800";

type Status = "idle" | "submitting" | "sent" | "captured" | "error";

export function QuoteForm({ defaultProduct = "" }: { defaultProduct?: string }) {
  const [product, setProduct] = useState(defaultProduct);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const { getToken } = useRecaptcha();

  const grades = useMemo(() => getProduct(product)?.grades ?? [], [product]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    const fd = new FormData(e.currentTarget);
    const recaptchaToken = await getToken("quote");

    const result = await submitEnquiry({
      type: "quote",
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      region: String(fd.get("region") || ""),
      product: String(fd.get("product") || ""),
      grade: String(fd.get("grade") || ""),
      quantity: [fd.get("quantity"), fd.get("unit")].filter(Boolean).join(" "),
      message: String(fd.get("message") || ""),
      company_website: String(fd.get("company_website") || ""),
      recaptchaToken,
    });

    if (result.ok) setStatus(result.delivered ? "sent" : "captured");
    else {
      setError(result.error || "Something went wrong.");
      setStatus("error");
    }
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
        className="w-full rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
      >
        {submitting ? "Submitting…" : "Request quote"}
      </button>
      <p className="text-xs text-ink-500">
        We respond to quote requests within 48 hours. Fields marked{" "}
        <span className="text-brand-600">*</span> are required.
      </p>
    </form>
  );
}

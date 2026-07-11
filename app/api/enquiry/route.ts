import { NextResponse } from "next/server";
import type { EnquiryPayload } from "@/lib/enquiry";
import { COMPANY, EMAILS, isKnown } from "@/data/company";

export const runtime = "nodejs";

const REQUIRED: (keyof EnquiryPayload)[] = ["name", "email"];

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function verifyRecaptcha(token?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return true; // reCAPTCHA not configured → skip
  if (!token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });
    const data = (await res.json()) as { success: boolean; score?: number };
    return data.success && (data.score === undefined || data.score >= 0.5);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  let body: EnquiryPayload;
  try {
    body = (await request.json()) as EnquiryPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: pretend success, drop silently.
  if (body.company_website && body.company_website.trim() !== "") {
    return NextResponse.json({ ok: true, delivered: false });
  }

  // Validation
  for (const f of REQUIRED) {
    if (!body[f] || String(body[f]).trim() === "") {
      return NextResponse.json({ ok: false, error: `Missing field: ${f}` }, { status: 400 });
    }
  }
  if (!isEmail(body.email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  // Optional reCAPTCHA
  if (!(await verifyRecaptcha(body.recaptchaToken))) {
    return NextResponse.json({ ok: false, error: "Spam check failed. Please try again." }, { status: 400 });
  }

  const subject =
    body.type === "quote"
      ? `Quote request — ${body.product || "general"} — ${body.company || body.name}`
      : `Website enquiry — ${body.company || body.name}`;

  const lines = [
    `Type: ${body.type}`,
    `Name: ${body.name}`,
    body.company ? `Company: ${body.company}` : "",
    `Email: ${body.email}`,
    body.phone ? `Phone: ${body.phone}` : "",
    body.region ? `Region: ${body.region}` : "",
    body.product ? `Product: ${body.product}` : "",
    body.grade ? `Grade: ${body.grade}` : "",
    body.quantity ? `Quantity: ${body.quantity}` : "",
    body.message ? `Message: ${body.message}` : "",
  ].filter(Boolean);

  // Delivery via Web3Forms when configured (keeps the access key server-side).
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  const toEmail =
    process.env.ENQUIRY_TO_EMAIL || (isKnown(EMAILS.sales) ? EMAILS.sales : undefined);

  if (accessKey) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject,
          from_name: `${COMPANY.shortName} website`,
          replyto: body.email,
          ...(toEmail ? { to: toEmail } : {}),
          message: lines.join("\n"),
        }),
      });
      if (res.ok) return NextResponse.json({ ok: true, delivered: true });
      return NextResponse.json({ ok: false, error: "Delivery failed. Please email us directly." }, { status: 502 });
    } catch {
      return NextResponse.json({ ok: false, error: "Delivery failed. Please email us directly." }, { status: 502 });
    }
  }

  // No delivery service configured yet — capture in server logs, report honestly.
  console.info("[enquiry] (no delivery configured)\n" + lines.join("\n"));
  return NextResponse.json({ ok: true, delivered: false });
}

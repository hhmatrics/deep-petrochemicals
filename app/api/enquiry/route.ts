import { NextResponse } from "next/server";
import type { EnquiryPayload } from "@/lib/enquiry";

export const runtime = "nodejs";

const REQUIRED: (keyof EnquiryPayload)[] = ["name", "email"];

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
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

  // Delivery: Google Sheets via an Apps Script web app that appends a row
  // (see scripts/google-sheets-webhook.gs + GOOGLE_SHEETS_SETUP.md).
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  // Not configured yet — capture in server logs, report honestly.
  if (!sheetsUrl) {
    console.info("[enquiry] (no delivery configured)\n" + lines.join("\n"));
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const res = await fetch(sheetsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        type: body.type,
        name: body.name,
        company: body.company ?? "",
        email: body.email,
        phone: body.phone ?? "",
        product: body.product ?? "",
        grade: body.grade ?? "",
        quantity: body.quantity ?? "",
        region: body.region ?? "",
        message: body.message ?? "",
      }),
    });
    if (res.ok) return NextResponse.json({ ok: true, delivered: true });
  } catch {
    // fall through to the error below.
  }

  console.error("[enquiry] Google Sheets delivery failed\n" + lines.join("\n"));
  return NextResponse.json(
    { ok: false, error: "Delivery failed. Please try again or contact us directly." },
    { status: 502 },
  );
}

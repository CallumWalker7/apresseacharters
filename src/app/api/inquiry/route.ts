import { NextResponse } from "next/server";
import { Resend } from "resend";
import { content } from "@content";
import { inquirySchema } from "@/lib/validation";

/**
 * POST /api/inquiry
 * Validates the inquiry, then sends two emails via Resend:
 *   1. a formatted notification to the business inbox
 *   2. a warm confirmation to the guest
 *
 * Required env vars (see .env.example):
 *   RESEND_API_KEY   — your Resend key
 *   INQUIRY_FROM     — a verified sender, e.g. "Après Sea <hello@apresseacharters.com>"
 * Optional:
 *   INQUIRY_TO       — override recipient (defaults to content.contact.email)
 */

export const runtime = "nodejs";

const BUSINESS_EMAIL = process.env.INQUIRY_TO || content.contact.email;
const FROM =
  process.env.INQUIRY_FROM ||
  `${content.brand.wordmark} <onboarding@resend.dev>`;

// ---- Light in-memory rate limiting (best-effort; per warm instance) --------
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function esc(s: string): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot tripped — pretend success, send nothing.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Don't 500 in dev without a key — tell the client to use the mailto fallback.
    console.warn("[inquiry] RESEND_API_KEY not set — email not sent.");
    return NextResponse.json(
      { ok: false, error: "Email is not configured yet." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const wordmark = content.brand.wordmark;
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Date", data.date],
    ["Departure time", data.time],
    ["Duration", data.duration],
    ["Guests", String(data.guests)],
    ["Notes", data.notes?.trim() || "—"],
  ];

  const businessHtml = `
    <div style="font-family:Georgia,serif;max-width:560px;margin:auto;color:#0B1B3B">
      <p style="font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#2E5A7A;margin:0 0 4px">New charter inquiry</p>
      <h1 style="font-size:22px;margin:0 0 18px">${esc(data.name)} — ${esc(data.date)}</h1>
      <table style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr>
                 <td style="padding:8px 12px 8px 0;color:#5b6478;white-space:nowrap;vertical-align:top;border-bottom:1px solid #eee">${esc(k)}</td>
                 <td style="padding:8px 0;border-bottom:1px solid #eee">${esc(v).replace(/\n/g, "<br>")}</td>
               </tr>`
          )
          .join("")}
      </table>
      <p style="font-family:Arial,sans-serif;font-size:13px;color:#5b6478;margin-top:18px">
        Reply directly to reach ${esc(data.name)} at ${esc(data.email)}.
      </p>
    </div>`;

  const guestHtml = `
    <div style="font-family:Georgia,serif;max-width:520px;margin:auto;color:#0B1B3B">
      <h1 style="font-size:24px;margin:0 0 12px">Thank you, ${esc(data.name.split(" ")[0])}.</h1>
      <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#333">
        We've received your request for a charter aboard <em>${wordmark}</em> and we'll be in
        touch shortly with a tailored quote and next steps.
      </p>
      <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#555;margin-top:18px">
        <strong>Your request</strong><br>
        Date: ${esc(data.date)}<br>
        Departure: ${esc(data.time)}<br>
        Duration: ${esc(data.duration)}<br>
        Guests: ${esc(String(data.guests))}
      </p>
      <p style="font-family:Arial,sans-serif;font-size:14px;line-height:1.6;color:#555;margin-top:18px">
        With warm regards,<br>${wordmark} · ${esc(content.location.addressLine)}
      </p>
    </div>`;

  try {
    const notify = await resend.emails.send({
      from: FROM,
      to: BUSINESS_EMAIL,
      replyTo: data.email,
      subject: `New charter inquiry — ${data.name}, ${data.date}`,
      html: businessHtml,
    });
    if (notify.error) throw new Error(notify.error.message);

    // Guest confirmation is best-effort — don't fail the whole request if it bounces.
    await resend.emails
      .send({
        from: FROM,
        to: data.email,
        subject: `We received your request — ${wordmark}`,
        html: guestHtml,
      })
      .catch((e) => console.warn("[inquiry] guest confirmation failed:", e));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[inquiry] send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your inquiry." },
      { status: 502 }
    );
  }
}

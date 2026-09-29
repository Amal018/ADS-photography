"use server";

import { randomUUID } from "node:crypto";
import {
  inquirySummary,
  serviceLabel,
  validateInquiry,
  type BookingInquiry,
  type InquiryState,
} from "@/lib/inquiry";
import { site } from "@/content/site";

/**
 * Receives a booking enquiry. All validation happens here on the server.
 *
 * Delivery:
 * - Email (required): sent through FormSubmit (formsubmit.co) to
 *   `site.enquiryEmails`. FormSubmit asks the main address to confirm once,
 *   via an "Activate Form" email, before it forwards anything.
 * - WhatsApp (optional): if CALLMEBOT_API_KEY is set, a summary is also sent
 *   to `site.whatsapp` through CallMeBot.
 * - Webhook (optional): if CONTACT_WEBHOOK_URL is set, the enquiry is also
 *   POSTed there as JSON.
 * Only an email failure is shown to the visitor; the optional channels are
 * logged, so a retry never duplicates an email that already went out.
 */
export async function submitInquiry(_prev: InquiryState, form: FormData): Promise<InquiryState> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(form.get("company_website") ?? "") !== "") {
    return { ok: true, errors: {} };
  }

  const result = validateInquiry(form);
  if (!result.ok) {
    return {
      ok: false,
      errors: result.errors,
      values: result.values,
      message: "Some details need another look.",
    };
  }

  const inquiry: BookingInquiry = {
    ...result.inquiry,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };

  try {
    await sendEmail(inquiry);
  } catch (err) {
    console.error("[inquiry] email delivery failed", inquiry.id, err);
    return {
      ok: false,
      errors: {},
      values: {
        name: inquiry.name,
        phone: String(form.get("phone") ?? ""),
        email: inquiry.email,
        serviceInterest: inquiry.serviceInterest,
        preferredDate: inquiry.preferredDate ?? "",
        message: inquiry.message,
      },
      message: "We couldn’t send your enquiry just now. Please try again, or message us on WhatsApp.",
    };
  }

  await Promise.all([
    sendWhatsApp(inquiry).catch((err) => console.error("[inquiry] WhatsApp alert failed", inquiry.id, err)),
    sendWebhook(inquiry).catch((err) => console.error("[inquiry] webhook failed", inquiry.id, err)),
  ]);

  return {
    ok: true,
    errors: {},
    whatsappText: inquirySummary(inquiry, "Hi ADS Photography, I just sent an enquiry from your website:"),
  };
}

async function sendEmail(inquiry: BookingInquiry) {
  const [to, ...cc] = site.enquiryEmails;
  const kind = inquiry.isCorporate ? "Quote request" : "Enquiry";
  const service = serviceLabel(inquiry.serviceInterest);

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      // FormSubmit expects requests to come from the site.
      origin: site.url,
      referer: `${site.url}/contact`,
    },
    body: JSON.stringify({
      Name: inquiry.name,
      Phone: inquiry.phone,
      Email: inquiry.email,
      Shoot: service,
      "Preferred date": inquiry.preferredDate ?? "Not given",
      Package: inquiry.packageId ?? "None",
      Corporate: inquiry.isCorporate ? "Yes" : "No",
      Message: inquiry.message || "(none)",
      "Enquiry ID": inquiry.id,
      Received: inquiry.createdAt,
      _subject: `${kind}: ${inquiry.name} (${service})`,
      _replyto: inquiry.email,
      _cc: cc.join(","),
      _template: "table",
      _captcha: "false",
    }),
    signal: AbortSignal.timeout(10000),
  });

  const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
  if (!res.ok || String(data?.success) !== "true") {
    throw new Error(`FormSubmit ${res.status}: ${data?.message ?? "no response body"}`);
  }
}

async function sendWhatsApp(inquiry: BookingInquiry) {
  const apiKey = process.env.CALLMEBOT_API_KEY;
  if (!apiKey) return;

  const params = new URLSearchParams({
    phone: `+${site.whatsapp}`,
    text: inquirySummary(inquiry, `New ${inquiry.isCorporate ? "quote request" : "enquiry"} from the website`),
    apikey: apiKey,
  });
  const res = await fetch(`https://api.callmebot.com/whatsapp.php?${params}`, {
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`CallMeBot responded ${res.status}`);
}

async function sendWebhook(inquiry: BookingInquiry) {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return;

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(inquiry),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

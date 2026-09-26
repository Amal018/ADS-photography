"use server";

import { randomUUID } from "node:crypto";
import { validateInquiry, type BookingInquiry, type InquiryState } from "@/lib/inquiry";

/**
 * Receives a booking enquiry. All validation happens here on the server.
 *
 * Delivery: if CONTACT_WEBHOOK_URL is set, the enquiry is POSTed there as
 * JSON (Zapier/Make, Google Apps Script, a CRM, or a future database API).
 * Otherwise it is written to the server log.
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

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inquiry),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[inquiry] delivery failed", inquiry.id, err);
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
        message:
          "We couldn’t send your enquiry just now. Please try again, or message us on WhatsApp.",
      };
    }
  } else {
    console.info("[inquiry] received", JSON.stringify(inquiry));
  }

  return { ok: true, errors: {} };
}

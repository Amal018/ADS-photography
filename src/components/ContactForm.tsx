"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInquiry } from "@/app/contact/actions";
import { serviceOptions, type FieldName, type InquiryState, type ServiceInterest } from "@/lib/inquiry";
import { whatsappLink } from "@/content/site";
import { ArrowIcon, WhatsAppIcon } from "./icons";

const initial: InquiryState = { ok: false, errors: {} };

export function ContactForm({
  defaultService,
  packageId,
  isCorporate,
  defaultMessage,
}: {
  defaultService?: ServiceInterest;
  packageId?: string;
  isCorporate: boolean;
  defaultMessage?: string;
}) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.ok) doneRef.current?.focus();
    else if (state.message) summaryRef.current?.focus();
  }, [state]);

  if (state.ok) {
    return (
      <div ref={doneRef} tabIndex={-1} className="rounded-2xl border border-line bg-stone px-6 py-12 outline-none sm:px-10" role="status">
        <p className="display text-4xl sm:text-5xl">Thank you</p>
        <p className="mt-4 max-w-[48ch] text-lg text-ink-soft">
          Your enquiry has reached the studio. We’ll get back to you soon. For anything urgent,
          WhatsApp is the fastest way to reach us.
        </p>
        <a href={whatsappLink("Hi ADS Photography, I just sent an enquiry from your website.")} className="btn btn-secondary mt-7">
          <WhatsAppIcon className="size-4" /> WhatsApp us
        </a>
      </div>
    );
  }

  const v = state.values ?? {};
  const err = state.errors;
  const fieldProps = (name: FieldName) => ({
    id: name,
    name,
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `${name}-error` : undefined,
  });
  const errorText = (name: FieldName) =>
    err[name] ? (
      <p id={`${name}-error`} className="mt-1.5 text-sm font-medium text-error">
        {err[name]}
      </p>
    ) : null;

  return (
    <form action={action} noValidate className="space-y-6">
      {state.message ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-error/40 bg-[#fbeeec] px-4 py-3 text-sm font-medium text-error outline-none">
          {state.message}
        </div>
      ) : null}

      <input type="hidden" name="isCorporate" value={String(isCorporate)} />
      {packageId ? <input type="hidden" name="packageId" value={packageId} /> : null}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">Your name</label>
          <input {...fieldProps("name")} className="field mt-1.5" autoComplete="name" required defaultValue={v.name} />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink">Mobile number</label>
          <input
            {...fieldProps("phone")}
            className="field mt-1.5"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            required
            defaultValue={v.phone}
          />
          {errorText("phone")}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">Email</label>
        <input {...fieldProps("email")} className="field mt-1.5" type="email" autoComplete="email" required defaultValue={v.email} />
        {errorText("email")}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="serviceInterest" className="block text-sm font-medium text-ink">What’s the shoot?</label>
          <select
            {...fieldProps("serviceInterest")}
            className="field mt-1.5 appearance-none bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23151514' stroke-width='2'%3E%3Cpath d='M5 9l7 7 7-7'/%3E%3C/svg%3E\")",
            }}
            required
            defaultValue={v.serviceInterest ?? defaultService ?? ""}
          >
            <option value="" disabled>
              Choose one
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {errorText("serviceInterest")}
        </div>
        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-ink">
            Preferred date <span className="font-normal text-muted">(optional)</span>
          </label>
          <input {...fieldProps("preferredDate")} className="field mt-1.5" type="date" defaultValue={v.preferredDate} />
          {errorText("preferredDate")}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink">
          Tell us more <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea
          {...fieldProps("message")}
          className="field mt-1.5 min-h-36"
          rows={5}
          maxLength={2000}
          placeholder="Venue, number of guests, products to shoot…"
          defaultValue={v.message ?? defaultMessage}
        />
        {errorText("message")}
      </div>

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={pending}>
        {pending ? "Sending…" : (
          <>
            {isCorporate ? "Request a quote" : "Send enquiry"} <ArrowIcon className="size-4" />
          </>
        )}
      </button>
    </form>
  );
}

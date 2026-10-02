"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { submitInquiry } from "@/app/contact/actions";
import { serviceOptions, type FieldName, type InquiryState, type ServiceInterest } from "@/lib/inquiry";
import { whatsappLink } from "@/content/site";
import { ArrowIcon, WhatsAppIcon } from "./icons";

const initial: InquiryState = { ok: false, errors: {} };

// The enquiry is a shot list: one frame per step, advanced like film.
const steps: { title: string; fields: FieldName[] }[] = [
  { title: "The shoot", fields: ["serviceInterest", "preferredDate"] },
  { title: "The details", fields: ["message"] },
  { title: "About you", fields: ["name", "phone", "email"] },
];

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
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLFieldSetElement | null)[]>([]);

  useEffect(() => {
    if (state.ok) doneRef.current?.focus();
    else if (state.message) {
      // Rewind to the first frame with a problem.
      const bad = steps.findIndex((s) => s.fields.some((f) => state.errors[f]));
      if (bad >= 0) setStep(bad);
      summaryRef.current?.focus();
    }
  }, [state]);

  if (state.ok) {
    return (
      <motion.div
        ref={doneRef}
        tabIndex={-1}
        className="border border-line bg-stone px-6 py-12 outline-none sm:px-10"
        role="status"
        initial={reduce ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="display text-4xl sm:text-5xl">Thank you</p>
        <p className="mt-4 max-w-[48ch] text-lg text-ink-soft">
          Your enquiry has reached the studio. We’ll get back to you soon. For a faster reply, send the
          same details to us on WhatsApp.
        </p>
        <a
          href={whatsappLink(state.whatsappText ?? "Hi ADS Photography, I just sent an enquiry from your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary mt-7"
        >
          <WhatsAppIcon className="size-4" /> Send these details on WhatsApp
        </a>
      </motion.div>
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

  const last = steps.length - 1;

  function advance() {
    const fieldset = stepRefs.current[step];
    const invalid = fieldset?.querySelector<HTMLInputElement | HTMLSelectElement>(":invalid");
    if (invalid) {
      invalid.reportValidity();
      return;
    }
    goTo(step + 1);
  }

  function goTo(next: number) {
    setStep(next);
    // Move focus to the new frame's first field once it is shown.
    requestAnimationFrame(() =>
      stepRefs.current[next]?.querySelector<HTMLElement>("input:not([type=hidden]), select, textarea")?.focus(),
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="space-y-8"
      onKeyDown={(e) => {
        // Enter moves to the next frame instead of sending a half-filled enquiry.
        if (e.key === "Enter" && step < last && !(e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
          advance();
        }
      }}
    >
      {state.message ? (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="border border-error/40 bg-[#fbeeec] px-4 py-3 text-sm font-medium text-error outline-none">
          {state.message}
        </div>
      ) : null}

      <input type="hidden" name="isCorporate" value={String(isCorporate)} />
      {packageId ? <input type="hidden" name="packageId" value={packageId} /> : null}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company_website">Leave this empty</label>
        <input id="company_website" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>

      <FilmProgress step={step} onJump={(i) => i < step && goTo(i)} />

      <div className="relative overflow-hidden">
        {steps.map((s, i) => (
          <motion.fieldset
            key={s.title}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            hidden={i !== step}
            aria-labelledby={`step-${i}`}
            initial={false}
            animate={i === step ? { opacity: 1, x: 0 } : { opacity: 0, x: i < step ? -48 : 48 }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <legend id={`step-${i}`} className="readout mb-6 text-xs text-muted">
              FRAME {String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")} ·{" "}
              <span className="text-ink">{s.title.toUpperCase()}</span>
            </legend>

            {i === 0 ? (
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
            ) : null}

            {i === 1 ? (
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
            ) : null}

            {i === 2 ? (
              <>
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
              </>
            ) : null}
          </motion.fieldset>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {step > 0 ? (
          <button type="button" className="btn btn-secondary" onClick={() => goTo(step - 1)}>
            Back
          </button>
        ) : null}
        {step < last ? (
          <button type="button" className="btn btn-primary" onClick={advance}>
            Next frame <ArrowIcon className="size-4" />
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={pending}>
            {pending ? "Sending…" : (
              <>
                {isCorporate ? "Request a quote" : "Send enquiry"} <ArrowIcon className="size-4" />
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}

/** Three frames of film with sprocket holes; exposed frames fill in as you go. */
function FilmProgress({ step, onJump }: { step: number; onJump: (i: number) => void }) {
  return (
    <ol className="relative grid grid-cols-3 gap-1 bg-[#141414] px-1 py-4">
      <span aria-hidden="true" className="sprockets absolute inset-x-0 top-0.5 opacity-40" />
      <span aria-hidden="true" className="sprockets absolute inset-x-0 bottom-0.5 opacity-40" />
      {steps.map((s, i) => (
        <li key={s.title} className="relative">
          <button
            type="button"
            onClick={() => onJump(i)}
            disabled={i >= step}
            aria-current={i === step ? "step" : undefined}
            className={`relative flex h-11 w-full items-center justify-center overflow-hidden text-xs font-medium transition-shadow duration-300 enabled:cursor-pointer ${i === step ? "ring-1 ring-inset ring-white/70" : ""}`}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 origin-left bg-paper"
              initial={false}
              animate={{ scaleX: i < step ? 1 : 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className={`relative transition-colors duration-300 ${i < step ? "text-ink" : "text-on-night"}`}>
              <span className="edge-print mr-2 !text-[0.6rem]">{i + 1}A</span>
              {s.title}
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}

/** BookingInquiry data model (build spec §4.2) and its server-side validation. */

export const serviceOptions = [
  { value: "wedding", label: "Wedding" },
  { value: "maternity", label: "Maternity / family" },
  { value: "corporate", label: "Corporate / product" },
  { value: "other", label: "Something else" },
] as const;

export type ServiceInterest = (typeof serviceOptions)[number]["value"];

export type BookingInquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  serviceInterest: ServiceInterest;
  preferredDate: string | null;
  message: string;
  isCorporate: boolean;
  /** Package tier the visitor came from, if any (e.g. "signature"). */
  packageId: string | null;
  createdAt: string;
  status: "new" | "contacted" | "booked" | "closed";
};

export type FieldName = "name" | "phone" | "email" | "serviceInterest" | "preferredDate" | "message";

export type InquiryState = {
  ok: boolean;
  errors: Partial<Record<FieldName, string>>;
  message?: string;
  values?: Partial<Record<FieldName, string>>;
  /** Enquiry details as plain text, for the visitor's prefilled WhatsApp message. */
  whatsappText?: string;
};

export function serviceLabel(value: ServiceInterest) {
  return serviceOptions.find((o) => o.value === value)?.label ?? value;
}

export function inquirySummary(
  i: Pick<BookingInquiry, "name" | "phone" | "email" | "serviceInterest" | "preferredDate" | "packageId" | "message">,
  heading: string,
) {
  return [
    heading,
    `Name: ${i.name}`,
    `Phone: ${i.phone}`,
    `Email: ${i.email}`,
    `Shoot: ${serviceLabel(i.serviceInterest)}`,
    i.preferredDate ? `Preferred date: ${i.preferredDate}` : null,
    i.packageId ? `Package: ${i.packageId}` : null,
    i.message ? `Message: ${i.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Accepts 10-digit Indian mobiles with optional +91 / 0 prefix and spacing. */
export function normalizeIndianPhone(raw: string): string | null {
  const digits = raw.replace(/[\s\-()]/g, "");
  const m = digits.match(/^(?:\+?91|0)?([6-9]\d{9})$/);
  return m ? `+91${m[1]}` : null;
}

function todayInIndia() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}

export function validateInquiry(form: FormData):
  | { ok: true; inquiry: Omit<BookingInquiry, "id" | "createdAt" | "status"> }
  | { ok: false; errors: InquiryState["errors"]; values: InquiryState["values"] } {
  const get = (k: string) => String(form.get(k) ?? "").trim();
  const values = {
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    serviceInterest: get("serviceInterest"),
    preferredDate: get("preferredDate"),
    message: get("message"),
  };
  const errors: InquiryState["errors"] = {};

  if (values.name.length < 2) errors.name = "Please enter your name.";
  else if (values.name.length > 80) errors.name = "Please keep your name under 80 characters.";

  const phone = normalizeIndianPhone(values.phone);
  if (!phone) errors.phone = "Enter a 10-digit mobile number, for example 98765 43210.";

  if (!EMAIL.test(values.email) || values.email.length > 254)
    errors.email = "Enter an email address like name@example.com.";

  if (!serviceOptions.some((o) => o.value === values.serviceInterest))
    errors.serviceInterest = "Choose what you’d like photographed.";

  if (values.preferredDate) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(values.preferredDate)) errors.preferredDate = "Choose a date from the calendar.";
    else if (values.preferredDate < todayInIndia()) errors.preferredDate = "Choose today or a future date.";
  }

  if (values.message.length > 2000) errors.message = "Please keep your message under 2000 characters.";

  if (Object.keys(errors).length) return { ok: false, errors, values };

  const serviceInterest = values.serviceInterest as ServiceInterest;
  const packageId = get("packageId");
  return {
    ok: true,
    inquiry: {
      name: values.name,
      phone: phone!,
      email: values.email.toLowerCase(),
      serviceInterest,
      preferredDate: values.preferredDate || null,
      message: values.message,
      isCorporate: get("isCorporate") === "true" || serviceInterest === "corporate",
      packageId: /^(essential|signature|luxury)$/.test(packageId) ? packageId : null,
    },
  };
}

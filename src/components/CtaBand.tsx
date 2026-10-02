import { whatsappLink } from "@/content/site";
import { ArrowIcon, WhatsAppIcon } from "./icons";
import { ShutterButton } from "./motion/ShutterButton";

/** Closing call to action at the foot of a page. */
export function CtaBand({
  title,
  text,
  href = "/contact",
  cta = "Send an enquiry",
  whatsappMessage = "Hi ADS Photography, I'd like to enquire about a shoot.",
  className = "mt-28 sm:mt-36",
}: {
  title: string;
  text: string;
  href?: string;
  cta?: string;
  whatsappMessage?: string;
  /** Outer spacing; pages whose last section already has padding pass "". */
  className?: string;
}) {
  return (
    <section className={`bg-night text-on-night ${className}`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-20 sm:px-8 sm:py-24 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="display max-w-[16ch] text-[clamp(2.2rem,5vw,3.75rem)]">{title}</h2>
          <p className="mt-5 max-w-[46ch] text-lg text-on-night-soft">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ShutterButton href={href} className="btn btn-light">
            {cta} <ArrowIcon className="size-4" />
          </ShutterButton>
          <a href={whatsappLink(whatsappMessage)} className="btn btn-ghost-light">
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

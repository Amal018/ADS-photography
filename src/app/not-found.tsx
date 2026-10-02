import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { OutOfFocus } from "@/components/motion/OutOfFocus";

export default function NotFound() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <OutOfFocus />
      <div>
        <h1 className="display text-[clamp(2.1rem,6vw,4rem)]">Out of focus</h1>
        <p className="mt-6 max-w-[42ch] text-lg text-ink-soft">
          We couldn’t find that page. It may have moved, or the link may be mistyped.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Refocus: back to home <ArrowIcon className="size-4" />
          </Link>
          <Link href="/portfolio" className="btn btn-secondary">
            See our moments
          </Link>
        </div>
      </div>
    </section>
  );
}

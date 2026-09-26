import type { ReactNode } from "react";

/** Opens every inner page and carries its H1. `dark` is used for the corporate register. */
export function PageHeader({
  title,
  intro,
  dark = false,
  children,
}: {
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <header className={dark ? "bg-night text-on-night" : "border-b border-line"}>
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-14 sm:px-8 sm:pb-20 sm:pt-24">
        <h1 className="display max-w-[20ch] text-[clamp(2.1rem,6vw,4.5rem)]">{title}</h1>
        {intro ? (
          <p className={`mt-6 max-w-[58ch] text-lg sm:text-xl ${dark ? "text-on-night-soft" : "text-ink-soft"}`}>
            {intro}
          </p>
        ) : null}
        {children ? <div className="mt-9 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </header>
  );
}

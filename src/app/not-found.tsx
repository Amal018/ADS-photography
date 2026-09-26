import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function NotFound() {
  return (
    <PageHeader title="Page not found" intro="That page isn’t here. It may have moved, or the link may be mistyped.">
      <Link href="/" className="btn btn-primary">
        Back to home
      </Link>
      <Link href="/portfolio" className="btn btn-secondary">
        See the portfolio
      </Link>
    </PageHeader>
  );
}

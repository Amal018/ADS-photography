import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCta } from "@/components/StickyCta";
import { JsonLd, localBusinessSchema } from "@/components/JsonLd";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Photography Studio in Coimbatore`,
    template: `%s | ${site.name}, Coimbatore`,
  },
  description: site.description,
  applicationName: site.name,
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={archivo.variable}>
      <body>
        <JsonLd data={localBusinessSchema()} />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyCta />
      </body>
    </html>
  );
}

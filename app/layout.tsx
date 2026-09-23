import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const sora = Sora({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "The King's Electric | Licensed Electricians in Arlington & DFW",
    template: "%s | The King's Electric",
  },
  description:
    "The King's Electric is a locally owned, licensed electrical contractor in Arlington, TX. Residential and commercial service calls, remodels, new construction and repairs across the DFW Metroplex. Call (817) 308-6444.",
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "./" },
};

export const viewport: Viewport = { themeColor: "#0b1530" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: site.legalName,
  url: site.url,
  telephone: "+1-817-308-6444",
  image: `${site.url}/logo.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.city,
    addressRegion: site.region,
    postalCode: site.zip,
    addressCountry: "US",
  },
  areaServed: "Dallas–Fort Worth, TX",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "16:30",
    },
  ],
  sameAs: [site.facebook],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        {/* Enable reveal animations only when JS runs, before first paint */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}

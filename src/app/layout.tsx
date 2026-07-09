import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { content } from "@content";
import "./globals.css";

// Display serif — editorial, high-contrast headings.
const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
});

// Humanist sans — body + UI.
const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const siteUrl = `https://${content.contact.domain}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${content.brand.legalName} — Private Charters on ${content.location.waters}`,
    template: `%s · ${content.brand.wordmark}`,
  },
  description: content.brand.metaDescription,
  applicationName: content.brand.legalName,
  keywords: [
    "boat charter",
    "private charter",
    "Long Island Sound",
    "Cos Cob CT",
    "Sea Ray SLX 310",
    "captained charter",
    "Greenwich boat charter",
  ],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: content.brand.legalName,
    title: `${content.brand.legalName} — Private Charters on ${content.location.waters}`,
    description: content.brand.metaDescription,
    images: [
      {
        url: `/images/${content.hero.image}`,
        width: 1200,
        height: 630,
        alt: content.hero.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${content.brand.legalName} — Private Charters on ${content.location.waters}`,
    description: content.brand.metaDescription,
    images: [`/images/${content.hero.image}`],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  robots: { index: true, follow: true },
};

/** LocalBusiness structured data for a charter business in Cos Cob, CT. */
function StructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: content.brand.legalName,
    description: content.brand.metaDescription,
    url: siteUrl,
    image: `${siteUrl}/images/${content.hero.image}`,
    provider: {
      "@type": "LocalBusiness",
      name: content.brand.legalName,
      email: content.contact.email,
      url: siteUrl,
      areaServed: content.location.waters,
      address: {
        "@type": "PostalAddress",
        addressLocality: content.location.town,
        addressRegion: content.location.region,
        addressCountry: "US",
      },
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        // No published pricing — quotes are custom.
        description: "Custom quotes provided on request.",
      },
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bone"
        >
          Skip to content
        </a>
        {children}
        <StructuredData />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { site, WHATSAPP_NUMBER } from "@/site.config";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-serif" });

const title = `Websites, WhatsApp booking and Google setup for clinics, schools and salons in Hosur | ${site.name}`;
const description =
  "Rootnode builds websites, WhatsApp booking and Google Business setup for clinics, schools and salons in Hosur, Krishnagiri and Attibele, live in 10 days.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: { title, description, type: "website", url: "/", siteName: site.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
  ...(site.googleSiteVerification ? { verification: { google: site.googleSiteVerification } } : {}),
};

export const viewport: Viewport = { themeColor: "#07080c" };

// Tells Google this is a local business in Hosur (helps local search results).
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description,
  url: site.url,
  logo: `${site.url}/rootnode-logo.png`,
  image: `${site.url}/opengraph-image`,
  email: site.email,
  telephone: `+${WHATSAPP_NUMBER}`,
  priceRange: `${site.currency}${site.currency}`,
  address: { "@type": "PostalAddress", addressLocality: "Hosur", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  areaServed: ["Hosur", "Krishnagiri", "Attibele"].map((name) => ({ "@type": "City", name })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }} />
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}

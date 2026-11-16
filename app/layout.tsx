import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { site } from "@/site.config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["italic"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: `${site.name} | Freelance software engineering`,
  description: site.tagline,
  openGraph: { title: site.name, description: site.tagline, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${serif.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

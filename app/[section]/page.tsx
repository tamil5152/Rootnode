import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomePage from "@/components/HomePage";
import { sectionRoutes } from "@/lib/sections";
import { site } from "@/site.config";

// Builds /services, /roadmap, /testimonials, /faq, /contact and /pricing
// as real pages. Any other path shows the 404 page. They all show the same
// one-page site, so each tells Google the home page "/" is the main copy
// (avoids duplicate-content issues in Search Console).
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(sectionRoutes).map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }): Promise<Metadata> {
  const { section } = await params;
  const r = sectionRoutes[section];
  return r ? { title: `${r.title} | ${site.name}`, alternates: { canonical: "/" } } : {};
}

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!sectionRoutes[section]) notFound();
  return <HomePage />;
}

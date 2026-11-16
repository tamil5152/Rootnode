"use client";
import SectionLink from "./SectionLink";
import { useState } from "react";
import { site, whatsappLink } from "@/site.config";
import WhatsAppIcon from "./WhatsAppIcon";
import Logo from "./Logo";

const links = [
  ["Services", "/services"],
  ["Roadmap", "/roadmap"],
  ["Pricing", "/pricing"],
  ["FAQ", "/faq"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-4 py-3">
        <SectionLink href="/" className="flex items-center gap-2.5 text-lg font-semibold tracking-tight" aria-label={site.name}>
          <Logo className="h-5 w-auto" />
          {site.name}
        </SectionLink>
        <div className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map(([label, href]) => (
            <SectionLink key={label} href={href} className="transition hover:text-white">{label}</SectionLink>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="glass inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/10">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp
          </a>
          <SectionLink href="/contact" className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-white/85">
            Book a call
          </SectionLink>
        </div>
        <button aria-label="Menu" className="md:hidden" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"} /></svg>
        </button>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-2xl p-3 md:hidden">
          {[...links, ["Book a call", "/contact"]].map(([label, href]) => (
            <SectionLink key={label} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-muted hover:bg-white/5 hover:text-white">{label}</SectionLink>
          ))}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-muted hover:bg-white/5 hover:text-white">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}

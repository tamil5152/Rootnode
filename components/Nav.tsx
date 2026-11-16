"use client";
import { useState } from "react";
import { site } from "@/site.config";

const links = [
  ["Services", "#services"],
  ["Process", "#process"],
  ["Pricing", "#pricing"],
  ["FAQ", "#faq"],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-4 py-3">
        <a href="#top" className="flex items-center gap-2 font-semibold">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-ember to-rose text-sm text-ink">
            {site.name.charAt(0)}
          </span>
          {site.name}
        </a>
        <div className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-white">{label}</a>
          ))}
        </div>
        <a href="#contact" className="hidden rounded-xl bg-white px-4 py-2 text-sm font-medium text-ink transition hover:bg-white/85 md:inline-block">
          Book a call
        </a>
        <button aria-label="Menu" className="md:hidden" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d={open ? "M6 6l12 12M18 6L6 18" : "M4 8h16M4 16h16"} /></svg>
        </button>
      </nav>
      {open && (
        <div className="glass mx-auto mt-2 flex max-w-5xl flex-col gap-1 rounded-2xl p-3 md:hidden">
          {[...links, ["Book a call", "#contact"]].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-muted hover:bg-white/5 hover:text-white">{label}</a>
          ))}
        </div>
      )}
    </header>
  );
}

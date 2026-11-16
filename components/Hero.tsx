// Server-rendered so the headline paints before any JavaScript loads (faster LCP on phones).
import SectionLink from "./SectionLink";
import Horizon from "./Horizon";
import { site, whatsappLink } from "@/site.config";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <Horizon variant="dusk" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <p
          style={{ animationDelay: "0s" }}
          className="hero-in glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/80"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Taking on 2 new projects this month
        </p>
        <h1
          style={{ animationDelay: "0.1s" }}
          className="hero-in text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Get more patients and bookings,
          <br />
          <span className="font-serif font-normal italic text-gradient">without chasing them.</span>
        </h1>
        <p
          style={{ animationDelay: "0.2s" }}
          className="hero-in mx-auto mt-6 max-w-xl text-lg text-white/70"
        >
          Website, WhatsApp booking and Google setup for clinics, schools and salons in Hosur. Live in 10 days.
        </p>
        <div
          style={{ animationDelay: "0.3s" }}
          className="hero-in mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-ink transition hover:bg-white/85"><WhatsAppIcon /> Chat on WhatsApp</a>
          <SectionLink href="/pricing" className="glass rounded-xl px-6 py-3 font-medium text-white/90 transition hover:bg-white/10">See packages ↓</SectionLink>
        </div>
        <p
          style={{ animationDelay: "0.45s" }}
          className="hero-in mt-5 text-xs text-white/55"
        >
          {site.areas}
        </p>
      </div>
    </section>
  );
}

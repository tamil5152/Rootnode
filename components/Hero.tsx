"use client";
import SectionLink from "./SectionLink";
import { motion } from "framer-motion";
import Horizon from "./Horizon";
import { site, whatsappLink } from "@/site.config";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <Horizon variant="dusk" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* The headline is visible from the first paint (no fade-in), so Google
            measures a fast Largest Contentful Paint. It only slides up slightly. */}
        <h1 className="hero-rise text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
          Get more patients and bookings,
          <br />
          <span className="font-serif font-normal italic text-gradient">without chasing them.</span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg text-white/70"
        >
          Website, WhatsApp booking and Google setup for clinics, schools and salons in Hosur. Live in 10 days.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-ink transition hover:bg-white/85"><WhatsAppIcon /> Chat on WhatsApp</a>
          <SectionLink href="/pricing" className="glass rounded-xl px-6 py-3 font-medium text-white/90 transition hover:bg-white/10">See packages ↓</SectionLink>
        </motion.div>
      </div>
    </section>
  );
}

"use client";
import SectionLink from "./SectionLink";
import { motion } from "framer-motion";
import Horizon from "./Horizon";
import { site } from "@/site.config";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden pt-28">
      <Horizon variant="dusk" />
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/80"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Taking on 2 new projects this month
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
        >
          Software that ships.
          <br />
          <span className="font-serif font-normal italic text-gradient">Built to last.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg text-white/70"
        >
          {site.name} designs and builds web apps, AI automations and cloud setups for founders and small teams, from first idea to launch.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <SectionLink href="/contact" className="rounded-xl bg-white px-6 py-3 font-medium text-ink transition hover:bg-white/85">Start a project</SectionLink>
          <SectionLink href="/roadmap" className="glass rounded-xl px-6 py-3 font-medium text-white/90 transition hover:bg-white/10">See how I work ↓</SectionLink>
        </motion.div>
      </div>
    </section>
  );
}

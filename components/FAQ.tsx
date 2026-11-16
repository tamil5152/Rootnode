"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const faqs = [
  ["How long does a project take?", "A starter site takes about two weeks. A product build is usually four to eight weeks, depending on scope. You get a timeline in writing before we begin."],
  ["How does payment work?", "50% to start, 30% after you see the demo, 20% at go-live."],
  ["Who owns the website?", "You do. The website and domain are registered in your name."],
  ["Where are you based?", "I'm based in Hosur, Tamil Nadu, and reply on WhatsApp the same day."],
  ["Can you take over an existing project?", "Yes, after a quick review of what you have."],
  ["What happens after launch?", "30 days of free fixes, then an optional monthly plan."],
  ["Can it be in Tamil?", "Yes. Tamil, English, or both."],
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-4 py-28">
      <SectionHeading eyebrow="FAQ" title="Questions?" accent="Answers." />
      <div className="mt-12 space-y-3">
        {faqs.map(([q, a], i) => (
          <div key={q} className="glass rounded-2xl">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium" aria-expanded={open === i}>
              {q}
              <span className={`text-xl text-muted transition ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

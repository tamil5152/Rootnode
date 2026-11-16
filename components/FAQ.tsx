"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const faqs = [
  ["How long does a project take?", "A starter site takes about two weeks. A product build is usually four to eight weeks, depending on scope. You get a timeline in writing before we begin."],
  ["How does payment work?", "Fixed-price projects are split 50% upfront and 50% on launch. Retainers are billed monthly and you can cancel anytime."],
  ["Who owns the code?", "You do, completely. The code lives in your GitHub account and runs on hosting you control."],
  ["Do you work with clients in other time zones?", "Yes. I work async with written updates and keep a few overlapping hours for calls."],
  ["Can you take over an existing project?", "Yes. I start with a short paid code review, then give you a plan to fix, improve or rebuild."],
  ["What happens after launch?", "Every project includes support after launch, and many clients move onto a small monthly retainer."],
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

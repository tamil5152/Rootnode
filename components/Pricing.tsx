"use client";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { site } from "@/site.config";

// Placeholder prices: set your own.
const plans = [
  { name: "Starter site", oneOff: 1200, monthly: 300, desc: "A fast, polished site for a new business.", features: ["Up to 5 pages", "Mobile-first design", "Contact form + analytics", "SEO basics", "2 weeks delivery"] },
  { name: "Product build", oneOff: 4800, monthly: 1200, desc: "An MVP or web app with real users.", popular: true, features: ["Logins and dashboards", "Database and API", "Payments (Stripe)", "Weekly demos", "30 days support"] },
  { name: "Retainer", oneOff: 0, monthly: 2000, desc: "An engineer on call for your team.", features: ["Up to 40 hours / month", "Features and fixes", "AI and automation work", "Priority response", "Cancel anytime"] },
];

export default function Pricing() {
  const [monthly, setMonthly] = useState(false);
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading eyebrow="Pricing" title="Simple packages," accent="no surprises." />
      <div className="mt-10 flex justify-center">
        <div className="glass inline-flex rounded-xl p-1 text-sm">
          {[["One-off project", false], ["Monthly", true]].map(([label, val]) => (
            <button key={String(label)} onClick={() => setMonthly(val as boolean)} className={`rounded-lg px-4 py-2 transition ${monthly === val ? "bg-white text-ink" : "text-muted"}`}>
              {label as string}{val === true && <span className="ml-2 rounded bg-ember/20 px-1.5 py-0.5 text-[10px] text-ember">split cost</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {plans.map((p, i) => {
          const price = monthly ? p.monthly : p.oneOff;
          return (
            <Reveal key={p.name} delay={i * 0.1} className={`glass relative flex flex-col rounded-3xl p-8 ${p.popular ? "ring-1 ring-ember/50" : ""}`}>
              {p.popular && <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-ember to-rose px-2.5 py-0.5 text-[10px] font-semibold text-ink">POPULAR</span>}
              <h3 className="text-lg font-medium">{p.name}</h3>
              <p className="mt-1 text-sm text-muted">{p.desc}</p>
              <p className="mt-6 text-4xl font-semibold">
                {price ? `${site.currency}${price.toLocaleString()}` : "Monthly only"}
                {price > 0 && <span className="text-sm font-normal text-muted">{monthly ? " /mo" : " from"}</span>}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><span className="text-ember">✓</span>{f}</li>)}</ul>
              <a href="#contact" className={`mt-8 rounded-xl px-4 py-3 text-center font-medium transition ${p.popular ? "bg-white text-ink hover:bg-white/85" : "border border-line hover:bg-white/5"}`}>Get started</a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

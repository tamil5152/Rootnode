import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import WhatsAppIcon from "./WhatsAppIcon";
import { whatsappLink } from "@/site.config";

// Edit packages and prices here.
const plans = [
  {
    name: "Starter",
    setup: "₹8,000–12,000",
    monthly: "₹1,500",
    features: ["Professional website", "Google Business Profile", "WhatsApp click-to-chat", "Google Maps location", "Monthly updates"],
  },
  {
    name: "Growth",
    setup: "₹15,000",
    monthly: "₹3,000",
    popular: true,
    features: ["Everything in Starter, plus:", "Online booking", "Tamil and English version", "Basic Google ranking work"],
  },
  {
    name: "AI Automation",
    setup: "₹5,000",
    monthly: "₹3,000–5,000",
    note: "Add-on to Starter or Growth",
    features: ["A WhatsApp assistant that answers FAQs", "Takes bookings", "Sends reminders 24/7"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading eyebrow="Pricing" title="Simple," accent="fixed pricing" />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className={`glass relative flex flex-col rounded-3xl p-8 ${p.popular ? "ring-1 ring-ember/50" : ""}`}>
            {p.popular && <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-ember to-rose px-2.5 py-0.5 text-xs font-semibold text-ink">MOST POPULAR</span>}
            <h3 className="text-lg font-medium">{p.name}</h3>
            {p.note && <p className="mt-1 text-xs text-ember">{p.note}</p>}
            <p className="mt-6 text-3xl font-semibold tracking-tight">{p.setup}</p>
            <p className="text-sm text-muted">one-time setup</p>
            <p className="mt-3 text-lg font-medium">+ {p.monthly}<span className="text-sm font-normal text-muted"> /month</span></p>
            <ul className="mt-6 flex-1 space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex gap-2">
                  {f.endsWith(":") ? <span className="text-muted">{f}</span> : <><span className="text-ember">✓</span>{f}</>}
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-8 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition ${p.popular ? "bg-white text-ink hover:bg-white/85" : "border border-line hover:bg-white/5"}`}
            >
              <WhatsAppIcon /> Chat on WhatsApp
            </a>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted">
        Need a custom portal (student or patient login, fees, reports)? Pricing is quoted after a free call.
      </p>
    </section>
  );
}

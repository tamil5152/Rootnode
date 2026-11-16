"use client";
import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Placeholder numbers: replace with your real ones.
const stats = [
  { value: 40, suffix: "+", decimals: 0, label: "Projects delivered", text: "Websites, dashboards and internal tools shipped for clients across 6 countries." },
  { value: 2.5, suffix: "x", decimals: 1, label: "Faster launches", text: "Small focused scope and weekly demos get products live in weeks, not quarters." },
  { value: 92, suffix: "%", decimals: 0, label: "Clients who return", text: "Most clients come back for the next feature, or refer a friend who needs one." },
];

function CountUp({ to, decimals, suffix }: { to: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: setV });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

export default function Stats() {
  return (
    <section id="impact" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading eyebrow="Why it matters" title="Good software is rare." accent="It shouldn't be." sub="Most projects stall between a great idea and a working product. That gap is where I work." />
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="glass rounded-3xl p-8">
            <div className="text-5xl font-semibold tracking-tight text-gradient">
              <CountUp to={s.value} decimals={s.decimals} suffix={s.suffix} />
            </div>
            <p className="mt-4 font-medium">{s.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

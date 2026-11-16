import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const steps = [
  {
    n: "01", title: "Discover", heading: "A clear plan before any code.",
    text: "A free 30-minute call, then a short written scope: what we build, what it costs and when it ships.",
    panel: (
      <ul className="space-y-3 text-sm">
        {["Goals and users", "Must-have features", "Timeline and budget"].map((t) => (
          <li key={t} className="flex items-center gap-3"><span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/20 text-[10px] text-emerald-300">✓</span>{t}</li>
        ))}
      </ul>
    ),
  },
  {
    n: "02", title: "Build", heading: "Weekly demos you can click.",
    text: "Every week you get a live link to try. No black box, no surprises at the end.",
    panel: (
      <div className="space-y-2 font-mono text-xs text-muted">
        <p><span className="text-emerald-300">✓</span> feat: user dashboard</p>
        <p><span className="text-emerald-300">✓</span> feat: stripe checkout</p>
        <p><span className="text-ember">●</span> wip: email notifications</p>
        <div className="mt-4 h-2 rounded-full bg-white/10"><div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-ember to-rose" /></div>
      </div>
    ),
  },
  {
    n: "03", title: "Launch", heading: "Live, fast and handed over.",
    text: "Your domain, analytics and docs are set up. You own all the code, and support continues after launch.",
    panel: (
      <div className="text-center">
        <div className="text-5xl font-semibold text-gradient">100</div>
        <p className="mt-1 text-xs text-muted">Lighthouse performance score</p>
      </div>
    ),
  },
];

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading eyebrow="How I work" title="From idea to launch," accent="step by step." />
      <div className="mt-16 space-y-6">
        {steps.map((s, i) => (
          <Reveal key={s.n} className={`glass grid items-center gap-8 rounded-3xl p-6 md:grid-cols-2 md:p-10 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div>
              <p className="text-sm text-ember">{s.n} · {s.title}</p>
              <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{s.heading}</h3>
              <p className="mt-3 text-muted">{s.text}</p>
              <a href="#contact" className="mt-6 inline-block rounded-xl border border-line px-4 py-2 text-sm transition hover:bg-white/5">Get started</a>
            </div>
            <div className="rounded-2xl border border-line bg-ink/70 p-8">{s.panel}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

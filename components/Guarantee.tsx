import Reveal from "./Reveal";

const points = [
  ["See it before you pay in full", "You pay 50% to start, and the 30% milestone payment is due only after you've seen your working demo."],
  ["Free fixes for 30 days", "Anything that isn't right after launch is fixed free for 30 days."],
  ["Cancel anytime", "Cancel the monthly plan anytime with 30 days' notice. The website stays yours."],
];

export default function Guarantee() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-28">
      <Reveal className="glass grid gap-6 rounded-3xl p-6 sm:p-8 md:grid-cols-3">
        {points.map(([t, d]) => (
          <div key={t} className="flex gap-3">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/15 text-xs text-emerald-300">✓</span>
            <div>
              <p className="font-medium">{t}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{d}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

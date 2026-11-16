import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { site } from "@/site.config";

const rows = [
  ["Handed between account managers", "You talk directly to the engineer"],
  ["Long contracts and big retainers", "Fixed-price scope, cancel anytime"],
  ["Updates once a month", "A live demo every week"],
  ["Generic templates", "Built around your business"],
  ["Code locked to the agency", "You own 100% of the code"],
  ["Months to first launch", "Live in weeks"],
];

export default function Compare() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-28">
      <SectionHeading eyebrow={`Why ${site.name}`} title="Agencies are slow." accent="This isn't." />
      <Reveal className="mt-14 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-line p-8">
          <p className="mb-6 font-medium text-muted">Typical agency</p>
          <ul className="space-y-4">{rows.map(([a]) => <li key={a} className="flex gap-3 text-muted"><span className="text-white/30">✕</span>{a}</li>)}</ul>
        </div>
        <div className="glass relative rounded-3xl p-8 ring-1 ring-ember/30">
          <p className="mb-6 font-medium">{site.name}</p>
          <ul className="space-y-4">{rows.map(([, b]) => <li key={b} className="flex gap-3"><span className="text-ember">✓</span>{b}</li>)}</ul>
        </div>
      </Reveal>
    </section>
  );
}

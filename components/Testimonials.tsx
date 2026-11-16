import SectionHeading from "./SectionHeading";

// SAMPLE testimonials. Replace each one with real feedback from your
// clients (with their permission) before the site goes live.
const quotes: [string, string, string][] = [
  ["Founder", "E-commerce startup", "Rootnode delivered our MVP in five weeks and explained every decision along the way."],
  ["Operations Lead", "Logistics company", "The automation they built saves our team about ten hours a week. It paid for itself in a month."],
  ["Product Manager", "SaaS company", "Weekly demos meant we never had to wonder where the project stood."],
  ["Co-founder", "Health-tech startup", "Clean code, good documentation, and still helping us months after launch."],
  ["Agency Owner", "Design studio", "Our go-to engineers whenever a client project needs a solid back-end."],
  ["Owner", "Online retail store", "Our new site loads instantly, and online orders went up in the first month."],
  ["Director", "Education institute", "They turned our messy spreadsheets into a simple dashboard the whole staff uses daily."],
  ["CTO", "Fintech startup", "Moved us to the cloud with zero downtime. Our hosting bill dropped by a third."],
  ["Marketing Head", "Real estate firm", "The lead form now feeds straight into our CRM. We reply to enquiries in minutes, not days."],
  ["Founder", "Fitness brand", "Fast, friendly and honest about what was worth building. Exactly what a small team needs."],
  ["Manager", "Restaurant group", "The online booking system just works. Fewer phone calls, more full tables."],
  ["Consultant", "Independent practice", "My new website finally explains what I do. Clients now arrive already knowing my services."],
];

function Card({ q }: { q: [string, string, string] }) {
  return (
    <figure className="glass w-80 shrink-0 rounded-2xl p-6">
      <div className="mb-3 text-sm tracking-widest text-ember">★★★★★</div>
      <blockquote className="text-sm leading-relaxed text-white/85">“{q[2]}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-sky/60 to-rose/60 text-xs font-semibold">{q[0].charAt(0)}</span>
        <span><span className="block text-sm font-medium">{q[0]}</span><span className="block text-xs text-muted">{q[1]}</span></span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse = false }: { items: [string, string, string][]; reverse?: boolean }) {
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="animate-marquee flex w-max gap-4" style={reverse ? { animationDirection: "reverse" } : undefined}>
        {[...items, ...items].map((q, i) => <Card key={i} q={q} />)}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-28">
      <div className="px-4"><SectionHeading eyebrow="Client words" title="Clients who" accent="keep coming back." /></div>
      <div className="mt-14 space-y-4">
        <Row items={quotes.slice(0, 6)} />
        <Row items={quotes.slice(6)} reverse />
      </div>
    </section>
  );
}

import SectionHeading from "./SectionHeading";

// PLACEHOLDER quotes. Replace with real client feedback before going live.
const quotes = [
  ["Client Name", "Founder, Example Co.", "Delivered our MVP in five weeks and explained every decision along the way."],
  ["Client Name", "Operations Lead", "The automation saves our team about ten hours a week. It paid for itself in a month."],
  ["Client Name", "Product Manager", "Weekly demos meant we never wondered where the project stood."],
  ["Client Name", "Startup Founder", "Clean code, good docs, and still helping us months after launch."],
  ["Client Name", "Agency Owner", "Our go-to engineer whenever a project needs a solid back-end."],
  ["Client Name", "Shop Owner", "Our new site loads instantly and orders went up the first month."],
];

function Card({ q }: { q: string[] }) {
  return (
    <figure className="glass w-80 shrink-0 rounded-2xl p-6">
      <blockquote className="text-sm leading-relaxed text-white/85">“{q[2]}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="h-9 w-9 rounded-full bg-gradient-to-br from-sky/60 to-rose/60" />
        <span><span className="block text-sm font-medium">{q[0]}</span><span className="block text-xs text-muted">{q[1]}</span></span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="py-28">
      <div className="px-4"><SectionHeading eyebrow="Client words" title="Clients who" accent="keep coming back." /></div>
      <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex w-max gap-4">
          {[...quotes, ...quotes].map((q, i) => <Card key={i} q={q} />)}
        </div>
      </div>
    </section>
  );
}

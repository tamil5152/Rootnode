import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

function BrowserMock() {
  return (
    <div className="rounded-xl border border-line bg-ink/80 p-3">
      <div className="mb-3 flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}</div>
      <div className="h-2 w-2/3 rounded bg-white/15" />
      <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
      <div className="mt-4 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-10 rounded-md bg-gradient-to-br from-ember/40 to-rose/20" />)}</div>
    </div>
  );
}
function FlowMock() {
  return (
    <div aria-hidden className="flex items-center justify-between rounded-xl border border-line bg-ink/80 p-4 text-[10px] text-muted">
      {["Chat", "Auto", "Book"].map((n, i) => (
        <div key={n} className="flex items-center gap-2">
          <span className={`grid h-10 w-10 place-items-center rounded-lg border border-line ${i === 1 ? "bg-rose/25 text-white" : "bg-white/5"}`}>{n}</span>
          {i < 2 && <span className="h-px w-5 bg-gradient-to-r from-ember to-rose sm:w-8" />}
        </div>
      ))}
    </div>
  );
}
function UptimeMock() {
  const bars = [6, 8, 7, 9, 8, 10, 9, 10, 10, 9, 10, 10];
  return (
    <div aria-hidden className="rounded-xl border border-line bg-ink/80 p-4">
      <div className="flex justify-between text-[10px] text-muted"><span>Uptime</span><span className="text-emerald-400">99.98%</span></div>
      <div className="mt-3 flex h-12 items-end gap-1">{bars.map((b, i) => <span key={i} className="flex-1 rounded-sm bg-sky/60" style={{ height: `${b * 10}%` }} />)}</div>
    </div>
  );
}

const services = [
  { title: "Website and online booking", text: "A fast website that shows up on Google, with booking and enquiry forms.", mock: <BrowserMock /> },
  { title: "WhatsApp automation", text: "Auto-replies, bookings and reminders, so you never miss a customer.", mock: <FlowMock /> },
  { title: "Always online", text: "Hosting, backups and monthly updates, handled for you.", mock: <UptimeMock /> },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading eyebrow="What I do" title="Three ways I help" accent="your business grow." />
      <div className="mt-16 grid gap-5 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1} className="glass flex flex-col rounded-3xl p-6">
            {s.mock}
            <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

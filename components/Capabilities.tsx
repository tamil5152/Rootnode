import SectionLink from "./SectionLink";
import Horizon from "./Horizon";
import Reveal from "./Reveal";

const items = [
  ["Next.js and React", "Modern, fast front-ends that rank well on Google."],
  ["Node and Python APIs", "Reliable back-ends and integrations with any service."],
  ["Supabase and Postgres", "Databases, logins and file storage done right."],
  ["AI integrations", "Chatbots, document search and smart automations."],
  ["Mobile-ready design", "Every screen looks sharp from phone to desktop."],
  ["Hosting and automatic updates", "Vercel, AWS or GCP with automatic deploys."],
];

export default function Capabilities() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="absolute inset-0 opacity-50"><Horizon variant="night" /></div>
      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Tech I work with</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">One engineer, <span className="font-serif font-normal italic text-gradient">the full stack.</span></h2>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.05} className="glass rounded-2xl p-6">
              <h3 className="font-medium">{t}</h3>
              <p className="mt-1.5 text-sm text-muted">{d}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center"><SectionLink href="/contact" className="inline-block rounded-xl bg-white px-6 py-3 font-medium text-ink hover:bg-white/85">Discuss your project</SectionLink></div>
      </div>
    </section>
  );
}

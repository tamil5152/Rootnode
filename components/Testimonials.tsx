import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// ─────────────────────────────────────────────────────────────
// PROJECTS: edit this list to update the "Projects I've built" section.
//   name        project / client name
//   type        kind of business
//   description what was built
//   url         live link for the "View project" button (leave "" to hide the card)
//   isDemo      true = shows a "Demo project" label and hides the rating/quote
//   image       optional screenshot path, e.g. "/projects/eden.png" (put the file in /public/projects)
//   quote/role  optional client review (shown only when isDemo is false)
// ─────────────────────────────────────────────────────────────
type Project = {
  name: string;
  type: string;
  description: string;
  url: string;
  isDemo: boolean;
  image?: string;
  quote?: string;
  role?: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Velvet Lounge",
    type: "Beauty salon & luxury spa",
    description: "Salon and spa website showcasing services and the brand",
    url: "https://salon-spa-flax.vercel.app/",
    isDemo: true,
    role: "Owner",
    quote:
      "Clients can now browse our services and get a feel for the salon straight from their phone, and the site looks as premium as the experience we offer.",
  },
  {
    name: "Eden Preschool",
    type: "Pre-primary school",
    description: "School website for Playgroup to UKG admissions",
    url: "https://eden-preschool.vercel.app/",
    isDemo: true,
    role: "Principal",
    quote:
      "Parents finally have one place to learn about our classes, timings and admissions, and the team explained everything patiently.",
  },
  {
    name: "Belvo",
    type: "Creative & branding agency",
    description: "Agency website presenting brand-building services",
    url: "https://belvo-lac.vercel.app/",
    isDemo: true,
  },
  {
    name: "Sapience Abacus School",
    type: "Abacus & mental maths training",
    description: "Maths contest and progress platform with student, teacher, parent and admin logins",
    url: "https://sapience-nine.vercel.app/",
    isDemo: false,
    role: "Director",
    quote:
      "Students take contests and track their progress, teachers manage questions and results, and parents can see how their child is doing, all in one simple system.",
  },
  {
    name: "Naivaidhya Hospital",
    type: "Hospital",
    description: "Hospital website and appointment booking",
    url: "", // Hidden until the live link is added
    isDemo: false,
    role: "Administrator",
    quote:
      "Patients can find our departments and doctors and request an appointment online at any hour. The site is fast and easy for every age group, and Rootnode stayed responsive whenever we needed a change.",
  },
];

function Screenshot({ p }: { p: Project }) {
  if (p.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.image} alt={`${p.name} website screenshot`} className="aspect-[16/9] w-full rounded-2xl border border-line object-cover" />;
  }
  // Placeholder until a real screenshot is added
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-line bg-ink/80 p-3">
      <div className="mb-3 flex gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}</div>
      <div className="h-2 w-1/2 rounded bg-white/15" />
      <div className="mt-2 h-2 w-1/3 rounded bg-white/10" />
      <div className="mt-4 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="h-12 rounded-md bg-gradient-to-br from-ember/30 to-rose/15" />)}</div>
      <span className="absolute bottom-3 right-3 text-xs text-muted">Screenshot coming soon</span>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading eyebrow="Our work" title="Projects" accent="I've built" />
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {PROJECTS.filter((p) => p.url).map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 0.1} className="glass flex flex-col rounded-3xl p-6 sm:p-7">
            <Screenshot p={p} />
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-xl font-semibold">{p.name}</h3>
                <p className="text-xs text-muted">{p.type}</p>
              </div>
              {p.isDemo ? (
                <span className="rounded-full border border-sky/40 bg-sky/10 px-2.5 py-0.5 text-xs text-sky">Demo project</span>
              ) : (
                <span className="text-sm tracking-widest text-ember" aria-label="5 star rating">★★★★★</span>
              )}
            </div>
            <p className="mt-3 text-sm text-white/80">{p.description}</p>
            {!p.isDemo && p.quote && (
              <blockquote className="mt-4 border-l-2 border-ember/50 pl-4 text-sm leading-relaxed text-muted">
                “{p.quote}”{p.role && <span className="mt-1 block text-xs text-white/60">{p.role}, {p.name}</span>}
              </blockquote>
            )}
            <div className="mt-auto pt-6">
              <a
                href={p.url}
                target={p.url.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2 text-sm transition hover:bg-white/5"
              >
                View project <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

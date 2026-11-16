import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// Client testimonials. These are DRAFT wordings: send each one to the
// client and update the text to match what they approve before going live.
const testimonials = [
  {
    client: "Velvel Lounge",
    role: "Owner",
    type: "Lounge & dining",
    project: "Website and online table booking",
    quote:
      "Our guests can now see the menu, check events and reserve a table straight from their phone. Weekend bookings come in online instead of tying up our phone line, and the site looks as premium as the lounge itself.",
  },
  {
    client: "Eden Preschool",
    role: "Principal",
    type: "Preschool",
    project: "School website and admissions enquiry form",
    quote:
      "Parents finally have one place to learn about our classes, facilities and admissions. Enquiries reach us neatly every day, and the team explained everything patiently so our staff can update photos and notices on our own.",
  },
  {
    client: "Sapience Abacus School",
    role: "Director",
    type: "Abacus & mental maths training",
    project: "Website and student enrolment system",
    quote:
      "From batch timings to new enrolments, everything is organised in one simple system now. Parents enquire online, we follow up faster, and the website shows our results and programmes the way we always wanted.",
  },
  {
    client: "Naivaidhya Hospital",
    role: "Administrator",
    type: "Hospital",
    project: "Hospital website and appointment booking",
    quote:
      "Patients can find our departments and doctors and request an appointment online at any hour. The site is fast and easy for every age group, and Rootnode stayed responsive whenever we needed a change.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-4 py-28">
      <SectionHeading eyebrow="Client words" title="Trusted by businesses" accent="we've built for." />
      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.client} delay={(i % 2) * 0.1} className="glass flex flex-col rounded-3xl p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm tracking-widest text-ember">★★★★★</div>
              <span className="rounded-full border border-line px-3 py-1 text-[11px] text-muted">{t.project}</span>
            </div>
            <blockquote className="mt-5 flex-1 leading-relaxed text-white/85">“{t.quote}”</blockquote>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-ember/70 to-rose/70 text-sm font-semibold text-ink">
                {t.client.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
              <span>
                <span className="block font-medium">{t.client}</span>
                <span className="block text-xs text-muted">{t.role} · {t.type}</span>
              </span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

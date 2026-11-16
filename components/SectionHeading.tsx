import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, accent, sub }: { eyebrow: string; title: string; accent?: string; sub?: string }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs uppercase tracking-[0.18em] text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-ember" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
        {title} {accent && <span className="font-serif font-normal italic text-gradient">{accent}</span>}
      </h2>
      {sub && <p className="mt-5 text-muted">{sub}</p>}
    </Reveal>
  );
}

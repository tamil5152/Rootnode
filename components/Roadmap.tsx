"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";

// The journey of a project, from idea to growth. Edit the steps here.
const steps = [
  {
    phase: "Phase 01",
    title: "Idea and impact",
    time: "Week 0",
    text: "We start with your idea, not with code. Who is it for, what problem does it solve, and what will success look like for your business?",
    points: ["Discovery call and workshop", "Target users and goals", "Business impact and success metrics"],
  },
  {
    phase: "Phase 02",
    title: "Plan the roadmap",
    time: "Week 1",
    text: "We turn the idea into a clear plan: the first version worth launching, a prioritised backlog and a timeline you can hold us to.",
    points: ["MVP scope and wireframes", "Prioritised feature backlog", "Fixed timeline and estimate"],
  },
  {
    phase: "Phase 03",
    title: "Build in agile sprints",
    time: "Weeks 2 to 6",
    text: "Work happens in short sprints. Every week you click through a live demo, give feedback, and we adjust the plan together.",
    points: ["1 to 2 week sprints", "Weekly live demos", "Your feedback shapes the next sprint"],
  },
  {
    phase: "Phase 04",
    title: "Test and refine",
    time: "Final sprint",
    text: "Before launch we test on real devices, tune speed and fix the rough edges, so day one feels polished.",
    points: ["Quality and device testing", "Speed and SEO tuning", "Security checks"],
  },
  {
    phase: "Phase 05",
    title: "Launch",
    time: "Launch day",
    text: "Your product goes live on your own domain, with analytics in place and everything handed over: code, logins and docs.",
    points: ["Deployment and domain setup", "Analytics and tracking", "Full handover. You own it all"],
  },
  {
    phase: "Phase 06",
    title: "Grow and support",
    time: "Ongoing",
    text: "Launch is the start. We monitor, support and keep improving based on real user data as your business grows.",
    points: ["Monitoring and support", "Monthly improvements", "New features as you scale"],
  },
];

function Step({ s, i }: { s: (typeof steps)[number]; i: number }) {
  const left = i % 2 === 0;
  return (
    <div className="relative grid md:grid-cols-2 md:gap-16">
      {/* node on the line */}
      <motion.span
        className="absolute left-4 top-8 z-10 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border-[3px] border-white/25 bg-ink md:left-1/2"
        initial={{ scale: 0.6, borderColor: "rgba(255,255,255,0.25)" }}
        whileInView={{ scale: 1, borderColor: "#ff9a4d" }}
        viewport={{ margin: "0px 0px -50% 0px" }}
        transition={{ duration: 0.4 }}
      >
        <motion.span
          className="h-2 w-2 rounded-full bg-ember"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ margin: "0px 0px -50% 0px" }}
        />
      </motion.span>

      <motion.div
        className={`pl-12 md:pl-0 ${left ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}
        initial={{ opacity: 0, x: left ? -40 : 40, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="glass rounded-3xl p-7">
          <div className={`flex items-center gap-3 text-xs ${left ? "md:justify-end" : ""}`}>
            <span className="font-medium text-ember">{s.phase}</span>
            <span className="rounded-full border border-line px-2.5 py-0.5 text-muted">{s.time}</span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight">{s.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
          <ul className={`mt-5 space-y-2 text-sm ${left ? "md:ml-auto" : ""}`}>
            {s.points.map((p) => (
              <li key={p} className={`flex items-center gap-2.5 ${left ? "md:flex-row-reverse" : ""}`}>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-ember to-rose" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="roadmap" className="mx-auto max-w-6xl overflow-x-clip px-4 py-28">
      <SectionHeading
        eyebrow="How we work"
        title="From idea to impact,"
        accent="one step at a time."
        sub="Every project follows the same clear roadmap: understand the idea and its impact, build in agile sprints, then launch and keep growing."
      />
      <div ref={ref} className="relative mt-20 space-y-12 md:space-y-20">
        {/* track + filling line */}
        <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 bg-white/10 md:left-1/2" />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-4 top-0 w-[2px] origin-top -translate-x-1/2 bg-gradient-to-b from-ember via-rose to-sky md:left-1/2"
        />
        {steps.map((s, i) => <Step key={s.title} s={s} i={i} />)}
      </div>
    </section>
  );
}

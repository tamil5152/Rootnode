"use client";
import { useState } from "react";
import Horizon from "./Horizon";
import { supabase } from "@/lib/supabase";
import { site } from "@/site.config";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Keep a reference to the form: React clears e.currentTarget after "await".
    const form = e.currentTarget;
    const f = new FormData(form);
    const row = {
      name: String(f.get("name") || "").trim(),
      email: String(f.get("email") || "").trim(),
      budget: String(f.get("budget") || "").trim(),
      message: String(f.get("message") || "").trim(),
    };
    setStatus("sending");

    // 1) Email the enquiry to you (FormSubmit.co, free, no account needed).
    const mail = fetch(`https://formsubmit.co/ajax/${site.enquiryEmail}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New enquiry from ${row.name} | ${site.name}`,
        _template: "table",
        _replyto: row.email,
        _captcha: "false",
        Name: row.name,
        Email: row.email,
        Budget: row.budget || "Not given",
        Message: row.message,
      }),
    })
      .then((r) => r.json())
      .then((j) => String(j.success) === "true")
      .catch(() => false);

    // 2) Also save a copy in Supabase, if it is set up (optional).
    const db = supabase
      ? supabase.from("contact_messages").insert(row).then(({ error }) => !error, () => false)
      : Promise.resolve(false);

    const [mailed, saved] = await Promise.all([mail, db]);
    if (mailed || saved) {
      form.reset(); // clear the boxes
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  const input = "w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:border-ember/60";

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <Horizon variant="dusk" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Your idea is ready.
            <br />
            <span className="font-serif font-normal italic text-gradient">Let&apos;s build it.</span>
          </h2>
          <p className="mt-5 max-w-md text-white/70">Tell me about your project and I&apos;ll reply within one working day with next steps.</p>
          <p className="mt-6 text-sm text-white/60">Or email <a className="underline" href={`mailto:${site.email}`}>{site.email}</a></p>
        </div>
        <form onSubmit={onSubmit} className="glass space-y-3 rounded-3xl p-6 sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="name" required maxLength={120} placeholder="Your name" className={input} />
            <input name="email" required type="email" maxLength={200} placeholder="Email" className={input} />
          </div>
          <input name="budget" inputMode="numeric" maxLength={60} placeholder="Your budget (e.g. 15000)" className={input} />
          <textarea name="message" required maxLength={4000} rows={5} placeholder="What would you like to build?" className={input} />
          <button disabled={status === "sending"} className="w-full rounded-xl bg-white px-4 py-3 font-medium text-ink transition hover:bg-white/85 disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          {status === "sent" && <p className="text-sm text-emerald-300">Thanks! Your message is in. I&apos;ll be in touch soon.</p>}
          {status === "error" && <p className="text-sm text-rose">Something went wrong. Please email me directly.</p>}
        </form>
      </div>
    </section>
  );
}

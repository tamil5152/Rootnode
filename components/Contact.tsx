"use client";
import { useState } from "react";
import Horizon from "./Horizon";
import { supabase } from "@/lib/supabase";
import { site, whatsappLink, whatsappDisplay } from "@/site.config";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [budgetError, setBudgetError] = useState("");
  const min = site.minBudget;
  const minText = min.toLocaleString("en-IN");

  // Accepts "15000", "15,000" or "15k". Returns NaN if it isn't a number.
  function parseBudget(v: string) {
    const t = v.replace(/[,\s₹$]/g, "").toLowerCase();
    const k = t.endsWith("k");
    const n = Number(k ? t.slice(0, -1) : t);
    return t === "" || (k ? t.length < 2 : false) ? NaN : k ? n * 1000 : n;
  }
  function checkBudget(v: string) {
    const n = parseBudget(v);
    if (isNaN(n)) return "Please enter your budget as a number, e.g. 15000.";
    if (n < min) return `The minimum project budget is ${minText}.`;
    return "";
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Keep a reference to the form: React clears e.currentTarget after "await".
    const form = e.currentTarget;
    const f = new FormData(form);
    const budgetMsg = checkBudget(String(f.get("budget") || ""));
    setBudgetError(budgetMsg);
    if (budgetMsg) {
      (form.elements.namedItem("budget") as HTMLInputElement | null)?.focus();
      return; // don't send
    }
    const row = {
      name: String(f.get("name") || "").trim(),
      email: String(f.get("email") || "").trim(),
      budget: String(f.get("budget") || "").trim(),
      message: String(f.get("message") || "").trim(),
    };
    setStatus("sending");

    // 1) Email the enquiry to you.
    //    If NEXT_PUBLIC_WEB3FORMS_KEY is set (free key from web3forms.com), use Web3Forms.
    //    Otherwise use FormSubmit.co, which needs a one-time "Activate Form" click.
    const w3key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    const fields = {
      Name: row.name,
      Email: row.email,
      Budget: row.budget || "Not given",
      Message: row.message,
    };
    const mail = (w3key
      ? fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: w3key,
            subject: `New enquiry from ${row.name} | ${site.name}`,
            from_name: `${site.name} website`,
            replyto: row.email,
            ...fields,
          }),
        })
      : fetch(`https://formsubmit.co/ajax/${site.enquiryEmail}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            _subject: `New enquiry from ${row.name} | ${site.name}`,
            _template: "table",
            _replyto: row.email,
            _captcha: "false",
            ...fields,
          }),
        })
    )
      .then((r) => r.json())
      .then((j) => {
        if (String(j.success) !== "true") console.warn("Enquiry email not sent:", j.message || j);
        return String(j.success) === "true";
      })
      .catch((err) => {
        console.warn("Enquiry email failed:", err);
        return false;
      });

    // 2) Also save a copy in Supabase, if it is set up (optional).
    const db = supabase
      ? supabase.from("contact_messages").insert(row).then(({ error }) => !error, () => false)
      : Promise.resolve(false);

    // 3) Also send an alert to your phone (Telegram and/or WhatsApp). Runs on
    //    the server, the visitor stays on this page. If it fails, the email above still goes out.
    const whatsapp = fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...row, company: String(f.get("company") || "") }),
    })
      .then((r) => r.json())
      .then((j) => j.ok === true)
      .catch(() => false);

    const [mailed, saved, alerted] = await Promise.all([mail, db, whatsapp]);
    if (mailed || saved || alerted) {
      form.reset(); // clear the boxes
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  const input = "w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-base outline-none placeholder:text-white/30 focus:border-ember/60";

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
          <div className="mt-6 space-y-1 text-sm">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center gap-2 text-white/80 hover:text-white">
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" /> WhatsApp: <span className="underline">{whatsappDisplay}</span>
            </a>
            <a href={`mailto:${site.email}`} className="flex min-h-11 items-center gap-2 break-all text-white/80 hover:text-white">
              <span aria-hidden>✉</span> Email: <span className="underline">{site.email}</span>
            </a>
          </div>
        </div>
        <form onSubmit={onSubmit} className="glass space-y-3 rounded-3xl p-6 sm:p-8">
          {/* Hidden from people; spam bots fill it in and get ignored. */}
          <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="name" required maxLength={120} placeholder="Your name" className={input} />
            <input name="email" required type="email" maxLength={200} placeholder="Email" className={input} />
          </div>
          <div>
            <input
              name="budget"
              required
              inputMode="numeric"
              maxLength={20}
              placeholder={`Your budget (min ${minText})`}
              aria-invalid={!!budgetError}
              onChange={(e) => budgetError && setBudgetError(checkBudget(e.target.value))}
              className={`${input} ${budgetError ? "border-rose/70" : ""}`}
            />
            {budgetError && <p className="mt-1.5 text-xs text-rose">{budgetError}</p>}
          </div>
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

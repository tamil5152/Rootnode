import { site } from "@/site.config";

// Sends each website enquiry to your own WhatsApp using CallMeBot (free).
// The visitor never sees WhatsApp: this runs on the server.
//
// Needs two environment variables in Vercel (never put them in the code,
// the repo is public):
//   CALLMEBOT_PHONE   your WhatsApp number with country code, e.g. 919384515257
//   CALLMEBOT_APIKEY  the key CallMeBot sent you on WhatsApp
// If they are missing, this does nothing and the form still works by email.

export const runtime = "nodejs";

// Light protection so a bot can't flood your WhatsApp.
// (Per server instance only, which is enough for a small site.)
const recent = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 1000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  const phone = process.env.CALLMEBOT_PHONE?.replace(/[^\d]/g, "");
  const apikey = process.env.CALLMEBOT_APIKEY?.trim();
  if (!phone || !apikey) return Response.json({ ok: false, reason: "not-configured" });

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (tooMany(ip)) return Response.json({ ok: false, reason: "rate-limited" }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  if (body.company) return Response.json({ ok: true }); // hidden honeypot field: bots fill it

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const budget = clean(body.budget, 20);
  const message = clean(body.message, 1500);
  if (!name || !email || !message) {
    return Response.json({ ok: false, reason: "missing-fields" }, { status: 400 });
  }

  const text =
    `New enquiry on ${site.name} website\n\n` +
    `Name: ${name}\nEmail: ${email}\nBudget: ${budget || "Not given"}\n\n${message}`;

  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;

  try {
    const r = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    const reply = await r.text();
    // CallMeBot answers with an HTML page; on failure it mentions an error.
    const ok = r.ok && !/error|invalid|not\s+valid/i.test(reply);
    if (!ok) console.warn("CallMeBot did not send the WhatsApp alert:", r.status, reply.slice(0, 300));
    return Response.json({ ok });
  } catch (err) {
    console.warn("CallMeBot request failed:", err);
    return Response.json({ ok: false, reason: "send-failed" });
  }
}

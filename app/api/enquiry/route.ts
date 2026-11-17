import { site } from "@/site.config";

// Sends each website enquiry as an alert to YOUR phone. Runs on the server,
// so the visitor never sees WhatsApp or Telegram and stays on the page.
//
// Set one or both in Vercel (never put them in the code, the repo is public):
//
//   Telegram (free, instant):
//     TELEGRAM_BOT_TOKEN  the token @BotFather gave you
//     TELEGRAM_CHAT_ID    your own chat id (from @userinfobot)
//
//   WhatsApp via CallMeBot (free):
//     CALLMEBOT_PHONE     your WhatsApp number with country code, e.g. 919384515257
//     CALLMEBOT_APIKEY    the key CallMeBot sent you on WhatsApp
//
// If none are set, this does nothing and the form still works by email.

export const runtime = "nodejs";

// Light protection so a bot can't flood your phone.
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

async function sendTelegram(token: string, chatId: string, text: string) {
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    const j = await r.json().catch(() => ({}));
    if (!j.ok) console.warn("Telegram alert not sent:", r.status, j.description || j);
    return j.ok === true;
  } catch (err) {
    console.warn("Telegram request failed:", err);
    return false;
  }
}

async function sendCallMeBot(phone: string, apikey: string, text: string) {
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
  try {
    const r = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    const reply = await r.text();
    // CallMeBot answers with an HTML page; on failure it mentions an error.
    const ok = r.ok && !/error|invalid|not\s+valid/i.test(reply);
    if (!ok) console.warn("CallMeBot did not send the WhatsApp alert:", r.status, reply.slice(0, 300));
    return ok;
  } catch (err) {
    console.warn("CallMeBot request failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  const tgToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const tgChat = process.env.TELEGRAM_CHAT_ID?.trim();
  const phone = process.env.CALLMEBOT_PHONE?.replace(/[^\d]/g, "");
  const apikey = process.env.CALLMEBOT_APIKEY?.trim();
  const hasTelegram = !!(tgToken && tgChat);
  const hasWhatsApp = !!(phone && apikey);
  if (!hasTelegram && !hasWhatsApp) return Response.json({ ok: false, reason: "not-configured" });

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

  const results = await Promise.all([
    hasTelegram ? sendTelegram(tgToken!, tgChat!, text) : Promise.resolve(false),
    hasWhatsApp ? sendCallMeBot(phone!, apikey!, text) : Promise.resolve(false),
  ]);
  return Response.json({ ok: results.some(Boolean), telegram: results[0], whatsapp: results[1] });
}

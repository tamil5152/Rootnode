// ─────────────────────────────────────────────────────────────
// Everything about YOUR business lives here.
// ─────────────────────────────────────────────────────────────

// WhatsApp number used by every WhatsApp button on the site.
// Country code + number, digits only (91 = India).
export const WHATSAPP_NUMBER = "919384515257";

const WHATSAPP_MESSAGE = "Hi Rootnode, I want to know about a website for my business";
export const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
// Readable form for display, e.g. "+91 93845 15257"
export const whatsappDisplay = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 7)} ${WHATSAPP_NUMBER.slice(7)}`;

export const site = {
  name: "Rootnode",            // ← your company name
  // Live address of the site, no trailing slash. Used for Google (sitemap, canonical URLs, share previews).
  // Change this when you move to your own domain.
  url: "https://rootnodesolutions.vercel.app",
  tagline: "Websites, WhatsApp booking and Google setup for clinics, schools and salons in Hosur.",
  // Short company description shown in the footer.
  about:
    "Rootnode helps clinics, schools and salons get more patients, students and bookings online. We build fast websites, WhatsApp booking and Google setup, and keep everything running for you.",
  areas: "Serving Hosur, Krishnagiri and Attibele",
  email: "rootnodesolutions.care@gmail.com", // ← email shown on the site
  enquiryEmail: "rootnodesolutions.care@gmail.com", // ← where enquiry form messages are sent
  minBudget: 8000,               // ← enquiries below this budget are not accepted
  calendarUrl: "/contact",        // ← e.g. your Calendly link
  socials: {
    linkedin: "https://linkedin.com/",
    x: "https://x.com/",
  },
  currency: "₹",
};

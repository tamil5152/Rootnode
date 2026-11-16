// Clean URLs for each part of the one-page site.
// rootnode.../roadmap scrolls to the element with id="roadmap", etc.
export const sectionRoutes: Record<string, { id: string; title: string }> = {
  services: { id: "services", title: "Services" },
  roadmap: { id: "roadmap", title: "Our roadmap" },
  testimonials: { id: "testimonials", title: "Client testimonials" },
  faq: { id: "faq", title: "FAQ" },
  contact: { id: "contact", title: "Contact" },
  pricing: { id: "contact", title: "Get a quote" }, // pricing → enquiry form
};

export function idForPath(path: string): string | null {
  const key = path.replace(/^\/+|\/+$/g, "");
  if (!key) return "top";
  return sectionRoutes[key]?.id ?? null;
}

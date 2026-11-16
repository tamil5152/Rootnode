// Clean URLs for each part of the one-page site.
// rootnode.../roadmap scrolls to the element with id="roadmap", etc.
export const sectionRoutes: Record<string, { id: string; title: string }> = {
  services: { id: "services", title: "Services" },
  roadmap: { id: "roadmap", title: "Our roadmap" },
  projects: { id: "projects", title: "Projects" },
  testimonials: { id: "projects", title: "Projects" },
  faq: { id: "faq", title: "FAQ" },
  contact: { id: "contact", title: "Contact" },
  pricing: { id: "pricing", title: "Pricing" },
};

export function idForPath(path: string): string | null {
  const key = path.replace(/^\/+|\/+$/g, "");
  if (!key) return "top";
  return sectionRoutes[key]?.id ?? null;
}

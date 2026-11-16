"use client";
import { idForPath } from "@/lib/sections";

// A link like /roadmap that smoothly scrolls to that section and
// updates the address bar, without a "#" and without reloading the page.
export default function SectionLink({ href, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        onClick?.(e);
        const id = idForPath(href);
        const el = id === "top" ? document.body : id && document.getElementById(id);
        if (!el || e.metaKey || e.ctrlKey || e.shiftKey) return; // let the browser handle it
        e.preventDefault();
        if (id === "top") window.scrollTo({ top: 0, behavior: "smooth" });
        else el.scrollIntoView({ behavior: "smooth" });
        if (window.location.pathname !== href) window.history.pushState({ id }, "", href);
      }}
      {...props}
    />
  );
}

"use client";
import { useEffect } from "react";
import { idForPath } from "@/lib/sections";

// On first load of /roadmap (etc.) jump to that section, and keep the
// browser's back/forward buttons working between sections.
export default function ScrollManager() {
  useEffect(() => {
    const go = (smooth: boolean) => {
      const id = idForPath(window.location.pathname);
      if (id === "top") return window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: smooth ? "smooth" : "auto" });
    };
    if (window.location.pathname !== "/") requestAnimationFrame(() => go(false));
    const onPop = () => go(true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return null;
}

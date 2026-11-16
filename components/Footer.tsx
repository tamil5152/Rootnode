import { site } from "@/site.config";
import Logo from "./Logo";

export default function Footer() {
  const cols: [string, [string, string][]][] = [
    ["Navigation", [["Services", "#services"], ["Process", "#process"], ["Pricing", "#contact"], ["FAQ", "#faq"]]],
    ["Contact", [["Email", `mailto:${site.email}`], ["Book a call", site.calendarUrl]]],
    ["Socials", [["LinkedIn", site.socials.linkedin], ["X", site.socials.x]]],
  ];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2.5 font-semibold"><Logo className="h-4 w-auto" />{site.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{site.about}</p>
        </div>
        {cols.map(([title, links]) => (
          <div key={title}>
            <p className="text-sm font-medium">{title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {links.map(([l, h]) => <li key={l}><a href={h} className="hover:text-white">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-line py-6 text-center text-xs text-muted">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
    </footer>
  );
}

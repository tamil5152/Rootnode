// Rootnode logo mark, redrawn as SVG so it takes the text colour
// (white on the dark theme). Original artwork: public/rootnode-logo.png
export default function Logo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="130 420 770 180" className={className} fill="currentColor" aria-hidden>
      <rect x="270" y="494" width="480" height="32" />
      <circle cx="216" cy="510" r="57.5" fill="none" stroke="currentColor" strokeWidth="35" />
      <circle cx="512" cy="510" r="57.5" fill="none" stroke="currentColor" strokeWidth="35" />
      <circle cx="808" cy="510" r="78" />
    </svg>
  );
}

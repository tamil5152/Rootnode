// Original dusk-landscape artwork drawn with SVG and gradients (no photos).
export default function Horizon({ variant = "dusk" }: { variant?: "dusk" | "night" }) {
  const sky = variant === "dusk"
    ? ["#0b0d1a", "#2a1a3a", "#7a3a4a", "#ff9a4d"]
    : ["#05060b", "#0b1230", "#1a2a5a", "#3a5aa8"];
  const id = `sky-${variant}`;
  return (
    <svg viewBox="0 0 1440 640" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sky[0]} />
          <stop offset="0.45" stopColor={sky[1]} />
          <stop offset="0.75" stopColor={sky[2]} />
          <stop offset="1" stopColor={sky[3]} />
        </linearGradient>
        <radialGradient id={`${id}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={variant === "dusk" ? "#ffe0b8" : "#cfe0ff"} stopOpacity="0.95" />
          <stop offset="0.35" stopColor={variant === "dusk" ? "#ff9a4d" : "#7aa7ff"} stopOpacity="0.45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.6" stopColor="#07080c" stopOpacity="0" />
          <stop offset="1" stopColor="#07080c" />
        </linearGradient>
      </defs>
      <rect width="1440" height="640" fill={`url(#${id})`} />
      {variant === "night" &&
        Array.from({ length: 70 }).map((_, i) => (
          <circle key={i} cx={(i * 197) % 1440} cy={(i * 89) % 330} r={i % 5 === 0 ? 1.4 : 0.8} fill="#fff" opacity={0.25 + ((i * 37) % 60) / 100} />
        ))}
      <ellipse cx="720" cy="470" rx="420" ry="260" fill={`url(#${id}-sun)`} />
      <path d="M0 470 L160 400 L300 450 L470 360 L620 440 L760 380 L900 450 L1060 370 L1220 440 L1440 390 L1440 640 L0 640 Z" fill="#1a1222" opacity="0.85" />
      <path d="M0 520 L200 470 L380 515 L560 465 L720 505 L880 460 L1080 510 L1260 470 L1440 500 L1440 640 L0 640 Z" fill="#0e0b14" />
      <path d="M0 580 Q 360 545 720 575 T 1440 565 L1440 640 L0 640 Z" fill="#07080c" />
      <rect width="1440" height="640" fill={`url(#${id}-fade)`} />
    </svg>
  );
}

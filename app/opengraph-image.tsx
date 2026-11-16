import { ImageResponse } from "next/og";
import { site } from "@/site.config";

// The preview card shown when the site link is shared on WhatsApp, LinkedIn, etc.
export const alt = `${site.name}: websites for clinics, schools and salons in Hosur`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "#f3f4f7", background: "linear-gradient(160deg, #07080c 0%, #1a1222 55%, #3a1d1f 100%)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 600 }}>
          <svg width="110" height="26" viewBox="130 420 770 180" fill="#f3f4f7">
            <rect x="270" y="494" width="480" height="32" />
            <circle cx="216" cy="510" r="57.5" fill="none" stroke="#f3f4f7" strokeWidth="35" />
            <circle cx="512" cy="510" r="57.5" fill="none" stroke="#f3f4f7" strokeWidth="35" />
            <circle cx="808" cy="510" r="78" />
          </svg>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>Get more patients and bookings, without chasing them.</div>
          <div style={{ fontSize: 30, color: "#ffb37a" }}>Website · WhatsApp booking · Google setup</div>
        </div>
        <div style={{ fontSize: 26, color: "rgba(243,244,247,0.65)" }}>{site.areas}</div>
      </div>
    ),
    size,
  );
}

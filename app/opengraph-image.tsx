import { ImageResponse } from "next/og";
import { site } from "@/site.config";

// The preview image shown when the site link is shared on WhatsApp,
// LinkedIn, Facebook, X, etc. Served at /opengraph-image.
export const alt = `${site.name}: websites, WhatsApp booking and Google setup in Hosur`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          padding: 72, color: "#f3f4f7",
          background: "radial-gradient(circle at 80% 110%, #ff9a4d 0%, #ff6b9a 22%, #07080c 60%)",
          backgroundColor: "#07080c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 40, fontWeight: 600 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 22, height: 22, borderRadius: 11, border: "5px solid #fff" }} />
            <div style={{ width: 40, height: 5, background: "#fff" }} />
            <div style={{ width: 22, height: 22, borderRadius: 11, border: "5px solid #fff" }} />
            <div style={{ width: 40, height: 5, background: "#fff" }} />
            <div style={{ width: 30, height: 30, borderRadius: 15, background: "#fff" }} />
          </div>
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, maxWidth: 980 }}>
            Get more patients and bookings, without chasing them.
          </div>
          <div style={{ fontSize: 30, color: "rgba(243,244,247,0.8)" }}>
            Websites, WhatsApp booking and Google setup for clinics, schools and salons in Hosur.
          </div>
        </div>
      </div>
    ),
    size,
  );
}

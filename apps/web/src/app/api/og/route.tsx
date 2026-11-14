import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") || "Frontier AI Research & Enterprise Intelligence";
    const domain = searchParams.get("domain") || "Softcapphyjas";
    const badge = searchParams.get("badge") || "AI Research Lab";

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#05070D",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 40%)",
          padding: "80px",
          color: "#E8ECF5",
          fontFamily: "sans-serif",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Top Brand Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#0A0E1A",
              border: "1px solid rgba(34, 211, 238, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#22D3EE",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            ✦
          </div>
          <div style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
            Softcapphyjas
          </div>
          <div
            style={{
              marginLeft: "12px",
              padding: "6px 14px",
              borderRadius: "999px",
              backgroundColor: "rgba(34, 211, 238, 0.1)",
              border: "1px solid rgba(34, 211, 238, 0.3)",
              fontSize: "14px",
              color: "#22D3EE",
              fontFamily: "monospace",
              textTransform: "uppercase",
            }}
          >
            {badge}
          </div>
        </div>

        {/* Central Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "950px" }}>
          <div
            style={{
              fontSize: "56px",
              fontWeight: "800",
              lineHeight: "1.15",
              letterSpacing: "-1px",
              color: "#FFFFFF",
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: "22px", color: "#8C97B2", lineHeight: "1.4" }}>
            Bridging natural sciences, mathematical rigor, and enterprise artificial intelligence.
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            paddingTop: "24px",
          }}
        >
          <div style={{ fontSize: "16px", color: "#8C97B2", fontFamily: "monospace" }}>
            softcapphyjas.com • {domain}
          </div>
          <div style={{ fontSize: "16px", color: "#22D3EE", fontFamily: "monospace" }}>
            Medicine • Agriculture • Physics • Mathematics
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch {
    return new Response("Failed to generate OG Image", { status: 500 });
  }
}

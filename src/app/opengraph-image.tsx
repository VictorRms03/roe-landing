import { ImageResponse } from "next/og";

export const alt = "Clínica ROE — Raio-X Odontológico em Mogi Guaçu e Mogi Mirim";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori supports flexbox and a subset of CSS — no grid, no shorthand gaps in
// odd places — so this is laid out with explicit flex columns. The brand's
// logo.webp is deliberately not embedded: Satori does not decode WebP.
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        backgroundColor: "#F5EDDD",
        backgroundImage:
          "radial-gradient(60% 55% at 88% 12%, rgba(230,175,46,0.55) 0%, rgba(230,175,46,0.10) 48%, rgba(230,175,46,0) 74%)",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#e6af2e",
              display: "flex",
            }}
          />
          <div
            style={{
              marginLeft: 20,
              fontSize: 34,
              fontWeight: 700,
              color: "#111827",
              letterSpacing: "-0.01em",
            }}
          >
            Clínica ROE
          </div>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 74,
            fontWeight: 700,
            lineHeight: 1.08,
            color: "#030712",
            letterSpacing: "-0.03em",
            maxWidth: 900,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ display: "flex" }}>Raio-X Odontológico em</div>
          <div style={{ display: "flex", marginTop: 8 }}>
            <span
              style={{
                borderBottom: "10px solid rgba(230,175,46,0.75)",
                paddingBottom: 4,
              }}
            >
              Mogi Guaçu e Mogi Mirim
            </span>
          </div>
        </div>

        <div
          style={{
            marginTop: 34,
            fontSize: 30,
            color: "#374151",
            lineHeight: 1.4,
            maxWidth: 820,
            display: "flex",
          }}
        >
          Panorâmico, periapical, telerradiografia e tomografia 3D — com laudos rápidos.
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {["+30 anos de radiologia", "Duas unidades", "Agendamento no WhatsApp"].map(
          (item, index) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: index === 0 ? 0 : 20,
                padding: "14px 26px",
                borderRadius: 999,
                backgroundColor: "rgba(255,255,255,0.72)",
                border: "1px solid rgba(0,0,0,0.08)",
                fontSize: 25,
                fontWeight: 600,
                color: "#111827",
              }}
            >
              {item}
            </div>
          ),
        )}
      </div>
    </div>,
    size,
  );
}

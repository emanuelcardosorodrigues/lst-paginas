import { ArrowRight, Hash } from "lucide-react";
import { FadeIn } from "@/lib/FadeIn";
import { CountUp } from "@/lib/CountUp";
import { DrawLine } from "@/lib/DrawLine";
import { img } from "@/lib/imgPath";

export default function DepoimentoDestaque() {
  return (
    <section style={{ background: "#F7F3EB", padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container">
        <FadeIn>
          <div
            className="card"
            style={{ maxWidth: 860, margin: "0 auto", padding: 0, overflow: "hidden" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gap: 0,
              }}
              className="depo-grid"
            >
              {/* Left: Photo */}
              <div
                style={{
                  background: "#F0EDE6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 32,
                }}
              >
                <div
                  style={{
                    width: 140,
                    height: 140,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#E8E4DB",
                    border: "1px solid #E8E4DB",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={img("jose-ronaldo.webp")}
                    alt="Dr. José Ronaldo"
                    width={140}
                    height={140}
                    loading="lazy"
                    decoding="async"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={e => {
                      e.currentTarget.style.display = "none";
                      const p = e.currentTarget.parentElement!;
                      const s = document.createElement("span");
                      s.style.cssText = "font-family:var(--font-accent);font-style:italic;color:#A09A8D;font-size:0.75rem;text-align:center;padding:8px";
                      s.textContent = "Dr. José Ronaldo";
                      p.appendChild(s);
                    }}
                  />
                </div>
              </div>

              {/* Right: Content */}
              <div style={{ padding: "32px 36px 32px 28px" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 20, color: "#1A1A1A", marginBottom: 4 }}>
                  Dr. José Ronaldo
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#A09A8D", marginBottom: 24 }}>
                  Dono de clínica · Faturamento de R$100k/mês
                </p>

                {/* Before / After */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "center", marginBottom: 24 }}>
                  {/* ANTES */}
                  <div style={{ background: "#FFF8F6", borderRadius: 10, padding: "16px 20px" }}>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#9B2C2C", marginBottom: 10 }}>ANTES</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <Row label="Faturamento" value="R$100.000/mês" red />
                      <Row label="Lucro" value="R$4.000/mês" red />
                      <Row label="Pacientes novos" value="Necessários" red />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                    <DrawLine direction="right" length="28px" delay={400} />
                    <ArrowRight size={20} color="#C8A84E" strokeWidth={1.5} />
                  </div>

                  {/* DEPOIS */}
                  <div style={{ background: "#F0FAF4", borderRadius: 10, padding: "16px 20px" }}>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2D6A4F", marginBottom: 10 }}>DEPOIS</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <Row label="Faturamento" value="R$110.000/mês" green />
                      <Row
                        label="Lucro"
                        value={<span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: 22, color: "#2D6A4F" }}>
                          R$<CountUp end={22000} suffix="/mês" />
                        </span>}
                        green
                      />
                      <Row label="Pacientes novos" value={<strong style={{ color: "#2D6A4F" }}>Zero</strong>} green />
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontStyle: "italic",
                    fontSize: "1.0625rem",
                    lineHeight: 1.6,
                    color: "#3D3A36",
                    borderLeft: "3px solid #C8A84E",
                    paddingLeft: 16,
                    marginBottom: 16,
                  }}
                >
                  "O faturamento mal se mexeu. O lucro multiplicou por 5. Sem um paciente novo."
                </blockquote>

                {/* Verification */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Hash size={13} color="#A09A8D" strokeWidth={1.5} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#A09A8D" }}>
                    Números verificados via calculadora do Programa Águia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .depo-grid { grid-template-columns: 1fr !important; }
          .depo-grid > div:first-child { padding: 24px; }
        }
      `}</style>
    </section>
  );
}

function Row({ label, value, red, green }: { label: string; value: React.ReactNode; red?: boolean; green?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: red ? "#9B2C2C" : green ? "#2D6A4F" : "#6B6560" }}>{label}</span>
      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 500, color: red ? "#9B2C2C" : green ? "#2D6A4F" : "#3D3A36", textAlign: "right" }}>{value}</span>
    </div>
  );
}

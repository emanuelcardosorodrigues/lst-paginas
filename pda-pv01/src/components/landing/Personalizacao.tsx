import { FadeIn } from "@/lib/FadeIn";
import { MapPin, TrendingUp, Flag } from "lucide-react";

const steps = [
  { icon: <MapPin size={20} color="#C8A84E" strokeWidth={1.5} />, label: "Onde você está", desc: "Faturamento, lucro real, pontos de vazamento" },
  { icon: <TrendingUp size={20} color="#C8A84E" strokeWidth={1.5} />, label: "Alavancas do seu caso", desc: "2-3 movimentos que mais impactam o seu número" },
  { icon: <Flag size={20} color="#C8A84E" strokeWidth={1.5} />, label: "Marcos de lucro", desc: "Checkpoints quinzenais com cobrança real" },
];

export default function Personalizacao() {
  return (
    <section style={{ background: "#F7F3EB", padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container">
        <div
          style={{ display: "grid", gridTemplateColumns: "55fr 45fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}
          className="gps-grid"
        >
          {/* Left: content */}
          <div>
            <FadeIn direction="left">
              <div style={{ marginBottom: 8 }}>
                <span className="kicker">✦ GPS personalizado</span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.875rem,4vw,2.75rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "#1A1A1A",
                  marginBottom: 20,
                }}
              >
                Não existe{" "}
                <em style={{ fontStyle: "italic", color: "#C8A84E" }}>receita genérica</em>.
              </h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#6B6560", lineHeight: 1.7, marginBottom: 36 }}>
                Cada clínica tem um problema diferente travando o lucro. O GPS mapeia o seu — e define quais 2-3 movimentos fazem mais diferença no seu caso específico.
              </p>
            </FadeIn>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {steps.map(({ icon, label, desc }, i) => (
                <FadeIn key={label} direction="left" delay={200 + i * 120}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 8,
                        background: "#F5EFD8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.9375rem", color: "#1A1A1A", marginBottom: 2 }}>
                        {label}
                      </p>
                      <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#6B6560", lineHeight: 1.5 }}>
                        {desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right: GPS mockup */}
          <FadeIn direction="right" delay={100}>
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                background: "#1A1A1A",
                padding: 32,
                boxShadow: "0 16px 48px rgba(45,40,35,0.12)",
                position: "relative",
              }}
            >
              {/* GPS mockup illustration */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#C8A84E", marginBottom: 8 }}>
                  GPS Programa Águia
                </p>
                <p style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.3 }}>
                  Dra. Maria Emília
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "#A09A8D", marginTop: 4 }}>
                  Fase 2 — Mês 3 de 6
                </p>
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#A09A8D" }}>Progresso</span>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#C8A84E" }}>50%</span>
                </div>
                <div style={{ height: 4, background: "#3D3A36", borderRadius: 2 }}>
                  <div style={{ height: "100%", width: "50%", background: "#C8A84E", borderRadius: 2 }} />
                </div>
              </div>

              {/* Milestones */}
              {[
                { label: "Tributação corrigida", done: true, value: "+R$3.200/mês" },
                { label: "Antecipação eliminada", done: true, value: "+R$4.800/mês" },
                { label: "Parceiro precificado", done: false, value: "Meta: mês 4" },
              ].map(({ label, done, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "12px 0",
                    borderBottom: "1px solid #2A2A2A",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: done ? "#C8A84E" : "transparent",
                      border: done ? "none" : "2px solid #3D3A36",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {done && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: done ? "#FFFFFF" : "#6B6560" }}>
                      {label}
                    </p>
                  </div>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: done ? "#C8A84E" : "#3D3A36" }}>
                    {value}
                  </span>
                </div>
              ))}

              <div style={{ marginTop: 20, padding: "14px 16px", background: "#2A2A2A", borderRadius: 8, borderLeft: "3px solid #C8A84E" }}>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "#A09A8D", marginBottom: 4 }}>Próxima quinzena</p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#FFFFFF" }}>
                  Mapear contratos com 3 parceiros → precificar cadeira corretamente
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`.gps-grid { @media (max-width:768px) { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

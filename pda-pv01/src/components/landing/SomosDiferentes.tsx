import { X, Check } from "lucide-react";
import { FadeIn } from "@/lib/FadeIn";

const rows = [
  ["Ensina empresa", "Ensina clínica odontológica"],
  ["200 alunos numa sala", "10 dentistas por turma"],
  ["Você assiste e se vira", "Leandro abre os seus números"],
  ["Teoria que você não aplica", "Quinzena a quinzena, com cobrança"],
  ["Ninguém sabe se você fez", "GPS personalizado com marcos de lucro"],
];

export default function SomosDiferentes() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.875rem,4vw,2.75rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "#1A1A1A",
              }}
            >
              Por que isso aqui não é mais um{" "}
              <em style={{ fontStyle: "italic", color: "#3D3A36" }}>curso de gestão</em>.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div
            style={{
              maxWidth: 750,
              margin: "0 auto",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid #E8E4DB",
            }}
          >
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div style={{ background: "#FFF8F6", padding: "14px 24px", display: "flex", alignItems: "center", gap: 8 }}>
                <X size={16} color="#9B2C2C" strokeWidth={2} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "#9B2C2C" }}>Curso genérico</span>
              </div>
              <div style={{ background: "#F0FAF4", padding: "14px 24px", display: "flex", alignItems: "center", gap: 8 }}>
                <Check size={16} color="#2D6A4F" strokeWidth={2} />
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "#2D6A4F" }}>Programa Águia</span>
              </div>
            </div>

            {/* Rows */}
            {rows.map(([left, right], i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  background: i % 2 === 0 ? "#FFFFFF" : "#FAF9F7",
                  borderTop: "1px solid #F0EDE6",
                }}
              >
                <div style={{ padding: "16px 24px", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "#9B2C2C" }}>
                  {left}
                </div>
                <div style={{ padding: "16px 24px", fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "#2D6A4F", fontWeight: 500, borderLeft: "1px solid #F0EDE6" }}>
                  {right}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

import { CheckCircle } from "lucide-react";
import { FadeIn } from "@/lib/FadeIn";

const items = [
  "Precificação por procedimento real",
  "Tributação correta (Fator R)",
  "Antecipação eliminada",
  "Modelo de gestão que liberta do mocho",
];

export default function Solucao() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.875rem,4vw,2.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "#1A1A1A",
              marginBottom: 40,
            }}
          >
            O que resolve não é mais paciente. É construir uma clínica que{" "}
            <em style={{ fontStyle: "italic", color: "#C8A84E" }}>LUCRA</em>{" "}
            sem você preso nela.
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {items.map((item, i) => (
            <FadeIn key={item} delay={i * 120}>
              <div
                className="comparison-positive"
                style={{ alignItems: "center" }}
              >
                <CheckCircle size={20} color="#2D6A4F" strokeWidth={2} style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", fontWeight: 500, color: "#2D6A4F" }}>
                  {item}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

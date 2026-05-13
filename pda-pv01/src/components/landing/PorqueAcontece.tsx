import { X } from "lucide-react";
import { FadeIn } from "@/lib/FadeIn";

const furos = [
  "Precificação errada",
  "Imposto indevido",
  "Antecipação automática",
  "Parceiro injusto",
];

export default function PorqueAcontece() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container">
        <div
          style={{ display: "grid", gridTemplateColumns: "55fr 45fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}
          className="two-col"
        >
          {/* Left */}
          <FadeIn direction="left">
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.875rem,4vw,2.75rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "#1A1A1A",
                marginBottom: 24,
              }}
            >
              Ninguém te ensinou a ser{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>bem pago</em>{" "}
              como dentista.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#6B6560", lineHeight: 1.7 }}>
                A faculdade ensina a abrir boca. Não ensina a fechar conta.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#6B6560", lineHeight: 1.7 }}>
                Você cobra por intuição. Dá desconto sem calcular. Paga imposto que não deve.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#6B6560", lineHeight: 1.7 }}>
                São 4 furos abertos ao mesmo tempo. Todos invisíveis.
              </p>
            </div>
          </FadeIn>

          {/* Right: 4 problem items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {furos.map((item, i) => (
              <FadeIn key={item} direction="left" delay={i * 100}>
                <div className="comparison-negative">
                  <X size={18} color="#9B2C2C" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", fontWeight: 500 }}>{item}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
      <style>{`.two-col { @media (max-width:768px) { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

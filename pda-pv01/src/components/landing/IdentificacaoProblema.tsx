import { FadeIn } from "@/lib/FadeIn";
import { CountUp } from "@/lib/CountUp";

export default function IdentificacaoProblema() {
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
              Você fatura. Mas{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>não sobra</em>.{" "}
              E não consegue explicar por quê.
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#6B6560", lineHeight: 1.7 }}>
              354 dentistas responderam nosso diagnóstico. 104 escreveram a mesma coisa quando perguntamos quanto sobra: <strong style={{ color: "#1A1A1A" }}>NADA</strong>.
            </p>
          </FadeIn>

          {/* Right: Stat */}
          <FadeIn direction="right" delay={150}>
            <div
              style={{
                background: "#F7F3EB",
                borderRadius: 12,
                padding: "40px 32px",
                textAlign: "center",
              }}
            >
              <div className="stat-number">
                <CountUp end={104} duration={2000} />
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontSize: 16, color: "#6B6560", marginTop: 12 }}>
                dentistas responderam <strong style={{ color: "#1A1A1A" }}>NADA</strong>
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "#A09A8D", marginTop: 8 }}>
                de 354 respondentes no diagnóstico
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`.two-col { @media (max-width:768px) { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

import { FadeIn } from "@/lib/FadeIn";

const phases = [
  {
    phase: "Fase 1",
    months: "Meses 1–2",
    title: "Diagnóstico e base financeira",
    items: [
      "Onboarding: mapeamento completo da clínica",
      "Custo real por procedimento calculado",
      "Tributação ajustada — primeiros R$ voltam",
      "Antecipação eliminada ou renegociada",
    ],
    color: "#C8A84E",
  },
  {
    phase: "Fase 2",
    months: "Meses 3–4",
    title: "Operação e margem",
    items: [
      "Parceiros e associados precificados certo",
      "Secretária treinada com material pronto",
      "Agenda otimizada — sem horário morto",
      "Lucro aumenta sem novos pacientes",
    ],
    color: "#C8A84E",
  },
  {
    phase: "Fase 3",
    months: "Meses 5–6",
    title: "Delegação e liberdade",
    items: [
      "Modelo de gestão sem você no centro",
      "Protocolos que a equipe executa sozinha",
      "Indicadores que você acompanha de longe",
      "Clínica funciona. Você escolhe quando ir.",
    ],
    color: "#C8A84E",
  },
];

export default function Timeline() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }} id="timeline">
      <div className="container">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="kicker" style={{ marginBottom: 12, display: "block" }}>✦ 6 meses · 3 fases</span>
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
              O caminho{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>tem começo, meio e fim</em>.
            </h2>
          </div>
        </FadeIn>

        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 19,
              top: 0,
              bottom: 0,
              width: 2,
              background: "#E8E4DB",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {phases.map(({ phase, months, title, items, color }, i) => (
              <FadeIn key={phase} direction="right" delay={i * 200}>
                <div style={{ display: "flex", gap: 32, paddingBottom: i < phases.length - 1 ? 48 : 0 }}>
                  {/* Node */}
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div
                      className="timeline-node"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        zIndex: 1,
                        boxShadow: `0 0 0 4px #FFFFFF, 0 0 0 6px ${color}40`,
                      }}
                    >
                      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.875rem", color: "#1A1A1A" }}>
                        {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ paddingTop: 8, flex: 1 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 8, flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em", color }}>
                        {phase}
                      </span>
                      <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "#A09A8D" }}>
                        {months}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.25rem", color: "#1A1A1A", marginBottom: 16, lineHeight: 1.3 }}>
                      {title}
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                      {items.map((item) => (
                        <li key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color, fontSize: "0.875rem", lineHeight: 1.6, flexShrink: 0, marginTop: 1 }}>✦</span>
                          <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "#3D3A36", lineHeight: 1.6 }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={700}>
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "1.0625rem",
              color: "#3D3A36",
              marginTop: 56,
            }}
          >
            6 meses. Cada quinzena com cobrança real e número pra bater.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

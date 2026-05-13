import { FadeIn } from "@/lib/FadeIn";

const profiles = [
  {
    color: "#C8A84E",
    title: "Fatura pouco e quer crescer",
    body: "Agenda ainda não enche. Precisa de pacientes certos e preço certo pra sair do sufoco.",
    case: "Dra. Ana Beatriz — 1 cadeira, sozinha. De R$7k pra R$13k de lucro.",
  },
  {
    color: "#D4A574",
    title: "Fatura bem mas não sobra",
    body: "Movimento grande. Dinheiro entra. Mas no fim do mês — cadê? Não consegue explicar.",
    case: "Dr. José Ronaldo — R$100k de faturamento. Lucro era R$4k. Hoje: R$22k.",
  },
  {
    color: "#9B2C2C",
    title: "Fatura, lucra, mas vive preso",
    body: "Clínica funciona. Lucro existe. Mas se você não vai, tudo para.",
    case: 'Dr. Igor Mazziolli — "por favor" foi a resposta quando perguntaram se queria sair do mocho.',
  },
];

export default function ParaQuemServe() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
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
              Esse programa é{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>pra você</em>?
            </h2>
          </div>
        </FadeIn>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 36 }}
          className="prof-grid"
        >
          {profiles.map(({ color, title, body, case: c }, i) => (
            <FadeIn key={title} direction="up" delay={i * 150}>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: 32,
                  borderTop: `4px solid ${color}`,
                  boxShadow: "0 2px 12px rgba(45,40,35,0.06)",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(45,40,35,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(45,40,35,0.06)"; }}
              >
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.125rem", color: "#1A1A1A", marginBottom: 12 }}>
                  {title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "#6B6560", lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                  {body}
                </p>
                <p style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontSize: "0.875rem", color: "#A09A8D", borderTop: "1px solid #E8E4DB", paddingTop: 16 }}>
                  {c}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <p style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#6B6560" }}>
            O Águia tem 3 trilhas. No onboarding, o Leandro identifica onde você está — e a trilha começa pelo que você mais precisa.
          </p>
        </FadeIn>
      </div>
      <style>{`.prof-grid { @media (max-width:768px) { grid-template-columns: 1fr !important; } @media (min-width:640px) and (max-width:900px) { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </section>
  );
}

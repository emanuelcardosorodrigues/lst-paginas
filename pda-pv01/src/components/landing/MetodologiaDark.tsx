import { FadeIn } from "@/lib/FadeIn";
import { DrawLine } from "@/lib/DrawLine";

const statements = [
  {
    kicker: "Diagnóstico",
    headline: "Você não pode consertar o que não consegue ver.",
    body: "A maioria dos dentistas não sabe o custo real de cada procedimento. Não sabe quanto sobra depois de pagar tudo. Não sabe onde o dinheiro some. O trabalho começa aqui — com números reais, não estimativas.",
  },
  {
    kicker: "Execução",
    headline: "Saber não é suficiente. Fazer é o protocolo.",
    body: "Todo encontro termina com uma ação específica pra executar até a próxima quinzena. Não é teoria pra você digerir sozinho. É um passo concreto, com prazo, que vai ao GPS e você apresenta na próxima sessão.",
  },
  {
    kicker: "Ritmo",
    headline: "A quinzena é a unidade de mudança.",
    body: "Projetos anuais morrem na gaveta. Aqui, o ciclo é curto. A cada 15 dias você vê onde está, o que moveu, o que não moveu. O lucro não cresce em teoria — cresce no acúmulo de quinzenas executadas.",
  },
];

export default function MetodologiaDark() {
  return (
    <section className="section-dark" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#C8A84E",
              }}
            >
              ✦ A metodologia
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.875rem,4vw,2.75rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                marginTop: 12,
              }}
            >
              Por que funciona quando{" "}
              <em style={{ fontStyle: "italic", color: "#D4B96A" }}>outros não funcionam</em>.
            </h2>
          </div>
        </FadeIn>

        <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 0 }}>
          {statements.map(({ kicker, headline, body }, i) => (
            <FadeIn key={kicker} delay={i * 600}>
              <div
                style={{
                  padding: "40px 0",
                  borderBottom: i < statements.length - 1 ? "1px solid #2A2A2A" : "none",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#D4B96A",
                    display: "block",
                    marginBottom: 12,
                  }}
                >
                  {kicker}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.25rem,2.5vw,1.625rem)",
                    fontWeight: 700,
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                    marginBottom: 16,
                  }}
                >
                  {headline}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1rem",
                    color: "#A09A8D",
                    lineHeight: 1.75,
                    maxWidth: 640,
                  }}
                >
                  {body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={1800}>
          <div style={{ textAlign: "center", marginTop: 64 }}>
            <DrawLine color="#C8A84E" width={120} thickness={1} delay={2000} />
            <p
              style={{
                fontFamily: "var(--font-accent)",
                fontStyle: "italic",
                fontSize: "clamp(1.125rem,2vw,1.375rem)",
                color: "#D4B96A",
                marginTop: 32,
                lineHeight: 1.6,
              }}
            >
              "Não é o curso que muda a clínica. É a quinzena executada."
            </p>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#6B6560", marginTop: 8 }}>
              Dr. Leandro Stecca
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

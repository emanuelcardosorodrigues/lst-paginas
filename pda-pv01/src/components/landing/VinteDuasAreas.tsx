import { FadeIn } from "@/lib/FadeIn";
import { img } from "@/lib/imgPath";

const areas = [
  "Precificação",
  "Tributário",
  "Financeiro",
  "Jurídico",
  "Contratação",
  "Liderança",
  "Sair do Mocho",
  "Treinamento de secretária",
  "Campanhas internas",
  "Redes Sociais",
  "Google Meu Negócio",
  "Vendas",
  "Processos",
  "Delegar",
  "Dentista parceiro",
  "Negociação",
  "Follow-up",
  "Comercial",
  "Marketing",
  "Crescimento",
  "Compras",
  "Recepção",
];

const randomDelays = areas.map(() => Math.floor(Math.random() * 700));

export default function VinteDuasAreas() {
  return (
    <section style={{ background: "#F7F3EB", padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container">
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <span className="kicker">✦ 22 áreas de atuação</span>
          </div>
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
              Tudo que a sua clínica precisa.{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>Num lugar só</em>.
            </h2>
          </div>
        </FadeIn>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {areas.map((area, i) => (
            <FadeIn key={area} delay={randomDelays[i]} direction="none">
              <span className="tag">{area}</span>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={900}>
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-sans)",
              fontSize: "1rem",
              color: "#6B6560",
              marginTop: 48,
              maxWidth: 560,
              margin: "48px auto 0",
              lineHeight: 1.7,
            }}
          >
            Você não precisa resolver tudo ao mesmo tempo. O GPS identifica as 2–3 alavancas que mais movem o seu lucro agora.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

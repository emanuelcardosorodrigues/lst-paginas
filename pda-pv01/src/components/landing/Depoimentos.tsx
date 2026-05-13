import { FadeIn } from "@/lib/FadeIn";

const testimonials = [
  {
    name: "Dra. Ana Beatriz",
    role: "Cirurgiã-dentista · 1 cadeira",
    quote: "Eu achava que o problema era trazer mais pacientes. O Leandro mostrou que o problema era o que eu fazia com os que já tinham. Dobrei o lucro sem mudar a agenda.",
    initial: "A",
  },
  {
    name: "Dr. José Ronaldo",
    role: "Dono de clínica · 3 cadeiras",
    quote: "Faturava R$100k e sobrava R$4k. Parecia loucura. Em 4 meses entendi por que — e corrigi. Hoje tenho R$22k de lucro líquido. Os pacientes são os mesmos.",
    initial: "J",
  },
  {
    name: "Dra. Maria Emília",
    role: "Periodontista · cidade pequena",
    quote: "Moço de 26 mil habitantes, né? Achei que não tinha como. O Leandro me mostrou que o mercado não era o problema. Era como eu precificava e pagava os parceiros.",
    initial: "M",
  },
  {
    name: "Dr. Igor Mazziolli",
    role: "Proprietário · 2 unidades",
    quote: "Me perguntaram se queria sair do mocho. Respondi 'por favor'. Hoje tenho protocolos que a equipe executa. Não preciso estar lá pra a clínica funcionar.",
    initial: "I",
  },
  {
    name: "Dra. Fernanda Castro",
    role: "Ortodontista · São Paulo",
    quote: "O que mais me surpreendeu foi a tributação. Estava pagando muito mais imposto do que precisava. Em 3 meses, R$3.200 voltaram pro bolso — todo mês.",
    initial: "F",
  },
  {
    name: "Dr. Marcelo Pinto",
    role: "Implantodontista · MG",
    quote: "A antecipação de recebíveis me comia 18% do faturamento. Eu não sabia. Achava que era normal. Não era. Isso foi a primeira alavanca que o Leandro identificou.",
    initial: "M",
  },
];

export default function Depoimentos() {
  return (
    <section style={{ background: "#F7F3EB", padding: "clamp(80px,10vw,120px) 0" }} id="depoimentos">
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
              O que dizem os que{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>já fizeram</em>.
            </h2>
          </div>
        </FadeIn>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="dep-grid"
        >
          {testimonials.map(({ name, role, quote, initial }, i) => (
            <FadeIn key={name} direction="up" delay={i * 100}>
              <div
                className="card"
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontStyle: "italic",
                    fontSize: "1rem",
                    color: "#3D3A36",
                    lineHeight: 1.75,
                    flex: 1,
                    marginBottom: 24,
                  }}
                >
                  "{quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: "#F5EFD8",
                      border: "1px solid #E8E4DB",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1rem", color: "#C8A84E" }}>
                      {initial}
                    </span>
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.875rem", color: "#1A1A1A" }}>
                      {name}
                    </p>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "#A09A8D" }}>
                      {role}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`.dep-grid { @media (max-width:640px) { grid-template-columns: 1fr !important; } @media (min-width:641px) and (max-width:900px) { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </section>
  );
}

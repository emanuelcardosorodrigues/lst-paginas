import { FadeIn } from "@/lib/FadeIn";
import { CountUp } from "@/lib/CountUp";

const cases = [
  {
    name: "Dr. José Ronaldo",
    fat: "R$100k → R$110k",
    lucroLabel: "Lucro",
    lucroEnd: 22000,
    lucroPrefix: "R$",
    extra: "Zero pacientes novos",
  },
  {
    name: "Dra. Maria Emília",
    fat: "R$60k → R$70k",
    lucroLabel: "Lucro",
    lucroEnd: 16000,
    lucroPrefix: "R$",
    extra: "Cidade de 26 mil hab.",
  },
  {
    name: "Dra. Ana Beatriz",
    fat: "1 cadeira. Sozinha.",
    lucroLabel: "Lucro",
    lucroEnd: 13000,
    lucroPrefix: "R$",
    extra: "Mesmos pacientes",
  },
];

export default function ProvaCases() {
  return (
    <section style={{ background: "#F7F3EB", padding: "clamp(80px,10vw,120px) 0" }} id="resultados">
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
              Isso não é teoria. São 30 anos de experiência que geram{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>resultado</em>.
            </h2>
          </div>
        </FadeIn>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}
          className="cases-grid"
        >
          {cases.map(({ name, fat, lucroLabel, lucroEnd, lucroPrefix, extra }, i) => (
            <FadeIn key={name} direction="up" delay={i * 150}>
              <div className="card" style={{ textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.125rem", color: "#1A1A1A", marginBottom: 4 }}>
                  {name}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#A09A8D", marginBottom: 24 }}>
                  {fat}
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "#6B6560", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
                  {lucroLabel}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    fontSize: "clamp(1.75rem,3vw,2.25rem)",
                    color: "#2D6A4F",
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  <CountUp end={lucroEnd} prefix={lucroPrefix} suffix="/mês" duration={1800} />
                </p>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#6B6560" }}>
                  {extra}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={300}>
          <p style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.0625rem", color: "#3D3A36" }}>
            Faturamento mal se mexeu. Lucro explodiu. O movimento foi nos números, não nos pacientes.
          </p>
        </FadeIn>
      </div>
      <style>{`.cases-grid { @media (max-width:768px) { grid-template-columns: 1fr !important; } @media (min-width:640px) and (max-width:768px) { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </section>
  );
}

import { FadeIn } from "@/lib/FadeIn";

const statements = [
  "Faturamento não é sucesso. Clínica lotada não é lucro.",
  "Não é sobre trabalhar mais. É sobre lucrar e ser realizado.",
  "Agenda qualificada + precificação correta + tempo pra viver = a clínica que vale a pena ter.",
];

export default function ManifestoDark() {
  return (
    <section className="section-dark" style={{ padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.875rem,4vw,2.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "#FFFFFF",
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            A gente acredita numa coisa{" "}
            <em style={{ fontStyle: "italic", color: "#D4B96A" }}>diferente</em>.
          </h2>
        </FadeIn>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {statements.map((s, i) => (
            <FadeIn key={i} delay={i * 600} direction="up">
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1rem,2.5vw,1.25rem)",
                  color: "#B0ADA8",
                  textAlign: "center",
                  lineHeight: 1.7,
                }}
              >
                {s}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

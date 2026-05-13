import { FadeIn } from "@/lib/FadeIn";
import { MagneticButton } from "@/lib/MagneticButton";
import { CHECKOUT_URL } from "@/lib/checkout";
import { Check } from "lucide-react";

const future = [
  { text: "Você sabe quanto custa cada procedimento. De verdade.", strong: true },
  { text: "Você sabe quanto sobra. Antes do mês fechar.", strong: false },
  { text: "Sua secretária executa sem precisar de você o tempo todo.", strong: true },
  { text: "Seu parceiro tá precificado certo. Ninguém banca ninguém.", strong: false },
  { text: "Você escolhe os dias que vai à clínica. Não o contrário.", strong: true },
  { text: "E quando chegar em casa — você está presente. Não exausto.", strong: false },
];

const checks = [
  "6 meses de acompanhamento com Leandro",
  "Turmas de 10 dentistas — não é plateia",
  "Garantia dupla — 15 dias + 6 meses de resultado",
];

export default function FuturoCTAFinal() {
  return (
    <section className="section-dark" style={{ padding: "clamp(96px,12vw,140px) 0" }}>
      <div className="container">
        {/* Block A — 6 meses */}
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.75rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#D4B96A",
                display: "block",
                marginBottom: 16,
              }}
            >
              ✦ Daqui a 6 meses
            </span>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem,4.5vw,3rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                marginBottom: 48,
              }}
            >
              Daqui a{" "}
              <em style={{ fontStyle: "italic", color: "#D4B96A" }}>6 meses</em>.
            </h2>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 64, textAlign: "left" }}>
            {future.map(({ text, strong }, i) => (
              <FadeIn key={text} delay={i * 500}>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(1rem,2vw,1.25rem)",
                    lineHeight: 2.2,
                    color: strong ? "#FFFFFF" : "#B0ADA8",
                    textAlign: "center",
                  }}
                >
                  {text}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Divider */}
        <FadeIn delay={3100}>
          <div style={{ maxWidth: 80, margin: "0 auto 72px", height: 1, background: "#C8A84E" }} />
        </FadeIn>

        {/* Block B — CTA */}
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <FadeIn delay={3300}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.875rem,4vw,2.75rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
                color: "#FFFFFF",
                marginBottom: 40,
              }}
            >
              A clínica que vale a pena ter{" "}
              <em style={{ fontStyle: "italic", color: "#D4B96A" }}>começa aqui</em>.
            </h2>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
            {checks.map((check, i) => (
              <FadeIn key={check} delay={3500 + i * 200}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "rgba(200,168,78,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Check size={12} color="#D4B96A" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "#A09A8D" }}>
                    {check}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={4100}>
            <MagneticButton
              href={CHECKOUT_URL}
              className="btn-primary-lg btn-glow"
              data-gtm-id="cta-final"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              QUERO ENTRAR NO PROGRAMA ÁGUIA COM CONDIÇÃO ESPECIAL
            </MagneticButton>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "#6B6560", marginTop: 16 }}>
              R$12.000 · Parcelamento disponível · Garantia dupla
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

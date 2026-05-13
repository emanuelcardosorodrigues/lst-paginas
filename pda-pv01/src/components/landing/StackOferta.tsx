import { FadeIn } from "@/lib/FadeIn";
import { DrawLine } from "@/lib/DrawLine";
import { MagneticButton } from "@/lib/MagneticButton";
import { CHECKOUT_URL } from "@/lib/checkout";
import { Shield, Users, Clock } from "lucide-react";

const stack = [
  { item: "Onboarding individual de 2h com o Dr. Leandro — diagnóstico completo da sua clínica, nos seus números", value: "R$5.000" },
  { item: "12 encontros quinzenais ao vivo — turma de 10 dentistas, tema + dúvida + direcionamento estratégico", value: "R$8.000" },
  { item: "GPS personalizado — marcos de faturamento, lucro e salário mês a mês com acompanhamento", value: "R$3.000" },
  { item: "Grupo de WhatsApp com Leandro — acesso direto, ele responde pessoalmente", value: "R$4.000" },
  { item: "Metodologia completa — precificação, tributação, comercial, liderança, delegação, contratação, marketing interno", value: "R$7.000" },
  { item: "Consultoria tributária — análise do seu regime com orientação de correção (Fator R, Simples Nacional)", value: "R$5.000" },
  { item: "Kit de execução pra secretária — scripts de atendimento, templates de WhatsApp, material de objeções, campanhas de reativação", value: "R$4.000" },
  { item: "Programa de reativação de pacientes — campanha pronta com sequência de 5 contatos via WhatsApp", value: "R$3.000" },
  { item: "Acesso à plataforma com aulas gravadas — conteúdo de todas as turmas, atualizado continuamente", value: "R$3.000" },
  { item: "Teste de Sabotadores da Mente — diagnóstico comportamental pra identificar o que te trava como gestor", value: "R$3.000" },
];

const trustBadges = [
  { icon: <Shield size={16} color="#2D6A4F" strokeWidth={1.5} />, label: "Garantia dupla" },
  { icon: <Users size={16} color="#C8A84E" strokeWidth={1.5} />, label: "10 dentistas por turma" },
  { icon: <Clock size={16} color="#C8A84E" strokeWidth={1.5} />, label: "6 meses de acompanhamento" },
];

export default function StackOferta() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }} id="oferta">
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
              Tudo que está incluído{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>no Programa Águia</em>.
            </h2>
          </div>
        </FadeIn>

        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          {/* Stack table */}
          <FadeIn delay={100}>
            <div style={{ border: "1px solid #E8E4DB", borderRadius: 12, overflow: "hidden", marginBottom: 32 }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", background: "#F0EDE6", padding: "14px 24px" }}>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6560" }}>
                  Entregável
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6B6560" }}>
                  Valor
                </span>
              </div>

              {stack.map(({ item, value }, i) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 24px",
                    background: i % 2 === 0 ? "#FFFFFF" : "#FAF9F7",
                    borderBottom: i < stack.length - 1 ? "1px solid #F0EDE6" : "none",
                    gap: 16,
                    opacity: 0,
                    animation: `fadeUp 0.4s cubic-bezier(0.16,1,0.3,1) ${150 + i * 55}ms both`,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "#3D3A36", lineHeight: 1.5 }}>
                    {item}
                  </span>
                  <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "0.9375rem", color: "#A09A8D", whiteSpace: "nowrap" }}>
                    {value}
                  </span>
                </div>
              ))}

              {/* Total row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 24px",
                  background: "#FAF9F7",
                  borderTop: "2px solid #E8E4DB",
                  gap: 16,
                }}
              >
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1rem", color: "#1A1A1A" }}>
                  TOTAL
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    fontSize: "1.25rem",
                    color: "#A09A8D",
                    textDecoration: "line-through",
                    whiteSpace: "nowrap",
                  }}
                >
                  R$45.000
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Price + CTA */}
          <FadeIn delay={700}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <DrawLine color="#C8A84E" width={80} thickness={1} delay={800} />
            </div>
          </FadeIn>

          <FadeIn delay={900}>
            <div
              style={{
                textAlign: "center",
                background: "#F7F3EB",
                border: "1px solid #E8E4DB",
                borderRadius: 16,
                padding: "40px 32px",
              }}
            >
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "#A09A8D", marginBottom: 8 }}>
                Valor do Programa Águia
              </p>
              <div style={{ marginBottom: 8 }}>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    fontSize: "clamp(2.5rem,5vw,3.5rem)",
                    color: "#1A1A1A",
                    lineHeight: 1,
                    display: "inline-block",
                    animation: "priceEntry 0.6s cubic-bezier(0.16,1,0.3,1) 1000ms both",
                  }}
                >
                  R$12.000,00
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.0625rem", color: "#3D3A36", marginBottom: 8 }}>
                Mas você tem direito a uma condição especial.
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "#6B6560", marginBottom: 32 }}>
                Toque no botão abaixo e peça a sua condição especial!
              </p>

              <MagneticButton
                href={CHECKOUT_URL}
                className="btn-primary-lg btn-glow"
                data-gtm-id="cta-offer-stack"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                QUERO ENTRAR NO PROGRAMA ÁGUIA COM CONDIÇÃO ESPECIAL
              </MagneticButton>

              {/* Trust badges */}
              <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 24, flexWrap: "wrap" }}>
                {trustBadges.map(({ icon, label }) => (
                  <div key={label} className="trust-badge">
                    {icon}
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`
        @keyframes priceEntry {
          from { transform: scale(1.08); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}

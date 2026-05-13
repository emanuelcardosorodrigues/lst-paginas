import { Target, Calendar, MapPin, MessageCircle, Package } from "lucide-react";
import { FadeIn } from "@/lib/FadeIn";

const items = [
  {
    icon: <Target size={28} color="#C8A84E" strokeWidth={1.5} />,
    title: "Onboarding individual (2h)",
    desc: "Leandro mapeia sua clínica antes de começar. Você não entra num programa genérico — entra no seu.",
  },
  {
    icon: <Calendar size={28} color="#C8A84E" strokeWidth={1.5} />,
    title: "Encontros quinzenais ao vivo",
    desc: "A cada 15 dias, você apresenta os números. Leandro aponta o que mover. Sem enrolação.",
  },
  {
    icon: <MapPin size={28} color="#C8A84E" strokeWidth={1.5} />,
    title: "GPS personalizado de lucro",
    desc: "Documento vivo com suas metas, marcos e próximos passos. Você sabe exatamente onde está e pra onde vai.",
  },
  {
    icon: <MessageCircle size={28} color="#C8A84E" strokeWidth={1.5} />,
    title: "Grupo fechado no WhatsApp",
    desc: "10 dentistas. Dúvidas respondidas em horas, não semanas. Contexto real de quem vive o mesmo cenário.",
  },
  {
    icon: <Package size={28} color="#C8A84E" strokeWidth={1.5} />,
    title: "Material de execução pronto",
    desc: "Planilhas, scripts de secretária, contratos e protocolos. Você usa amanhã — não monta do zero.",
  },
];

export default function Entregaveis() {
  return (
    <section style={{ background: "#F7F3EB", padding: "clamp(80px,10vw,120px) 0" }} id="entregaveis">
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
              O que você recebe ao entrar{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>no Águia</em>.
            </h2>
          </div>
        </FadeIn>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="entregaveis-grid"
        >
          {items.slice(0, 3).map(({ icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 100} direction="up">
              <div className="card-feature" style={{ height: "100%" }}>
                <div className="icon-container" style={{ marginBottom: 16 }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.0625rem", color: "#1A1A1A", marginBottom: 8 }}>
                  {title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "#6B6560", lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginTop: 24, maxWidth: 680, margin: "24px auto 0" }}
          className="entregaveis-grid-bottom"
        >
          {items.slice(3).map(({ icon, title, desc }, i) => (
            <FadeIn key={title} delay={300 + i * 100} direction="up">
              <div className="card-feature" style={{ height: "100%" }}>
                <div className="icon-container" style={{ marginBottom: 16 }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.0625rem", color: "#1A1A1A", marginBottom: 8 }}>
                  {title}
                </h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.9375rem", color: "#6B6560", lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`
        .entregaveis-grid { @media (max-width:640px) { grid-template-columns: 1fr !important; } }
        .entregaveis-grid-bottom { @media (max-width:640px) { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

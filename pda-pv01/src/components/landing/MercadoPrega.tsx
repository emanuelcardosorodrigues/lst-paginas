import { Megaphone, BookOpen, Clock, TrendingUp } from "lucide-react";
import { FadeIn } from "@/lib/FadeIn";

const rejections = [
  { icon: <Megaphone size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Tráfego pago", result: '"Veio paciente pedindo Amil Dental."' },
  { icon: <BookOpen size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Curso de gestão", result: '"Fora da minha realidade."' },
  { icon: <Clock size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Trabalhar mais", result: '"Segunda a sábado. Mesmo saldo."' },
  { icon: <TrendingUp size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Mais convênio", result: '"12h por dia. Sobrou menos."' },
];

export default function MercadoPrega() {
  return (
    <section style={{ background: "#F7F3EB", padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container">
        {/* Header */}
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
              Você tentou. O diagnóstico é que{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>estava errado</em>.
            </h2>
          </div>
        </FadeIn>

        {/* Cards 2x2 */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}
          className="cards-grid"
        >
          {rejections.map(({ icon, title, result }, i) => (
            <FadeIn
              key={title}
              delay={i % 2 === 0 ? 0 : 100}
              direction={i % 2 === 0 ? "left" : "right"}
            >
              <div className="card" style={{ height: "100%" }}>
                <div className="icon-container" style={{ marginBottom: 16 }}>
                  {icon}
                </div>
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.0625rem", color: "#1A1A1A", marginBottom: 8 }}>
                  {title}
                </h3>
                <p style={{ fontFamily: "var(--font-accent)", fontStyle: "italic", fontSize: "1rem", color: "#6B6560", lineHeight: 1.6 }}>
                  {result}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Statement */}
        <FadeIn delay={200}>
          <p
            style={{
              textAlign: "center",
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: "1.125rem",
              color: "#3D3A36",
              marginTop: 48,
            }}
          >
            Você não falhou. Te venderam volume pra resolver problema de margem.
          </p>
        </FadeIn>
      </div>
      <style>{`.cards-grid { @media (max-width:640px) { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

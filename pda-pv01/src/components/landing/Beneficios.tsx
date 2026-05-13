import { Calculator, DollarSign, Landmark, Users, ClipboardList, Home } from "lucide-react";
import { FadeIn } from "@/lib/FadeIn";

const features = [
  { icon: <Calculator size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Custo real por procedimento", desc: "Você sabe se tá lucrando ou pagando pra trabalhar" },
  { icon: <DollarSign size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Tributação corrigida", desc: "R$2k–R$5k/mês que voltam pro bolso" },
  { icon: <Landmark size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Antecipação eliminada", desc: "Até 20% do faturamento que parava de sumir" },
  { icon: <Users size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Parceiro precificado certo", desc: "Você para de bancar quem usa sua cadeira" },
  { icon: <ClipboardList size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Equipe treinada por material pronto", desc: "Secretária executa sem você precisar ensinar" },
  { icon: <Home size={28} color="#C8A84E" strokeWidth={1.5} />, title: "Modelo de delegação real", desc: "A clínica funciona. Você escolhe quando estar lá." },
];

export default function Beneficios() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }} id="programa">
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
              O que muda{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>na prática</em>.
            </h2>
          </div>
        </FadeIn>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}
          className="ben-grid"
        >
          {features.map(({ icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 80} direction="up">
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
      <style>{`.ben-grid { @media (max-width:640px) { grid-template-columns: 1fr !important; } @media (min-width:641px) and (max-width:900px) { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
    </section>
  );
}

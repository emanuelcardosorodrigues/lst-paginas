import { FadeIn } from "@/lib/FadeIn";
import { ShieldCheck, Trophy } from "lucide-react";

const guarantees = [
  {
    icon: <ShieldCheck size={48} color="#C8A84E" strokeWidth={1.5} />,
    badge: "GARANTIA 1",
    badgeColor: "#2D6A4F",
    badgeBg: "#F0FAF4",
    title: "15 dias. Sem perguntas.",
    body: "Entrou, não gostou: dinheiro de volta. Sem justificativa. Sem burocracia.",
    bg: "#F0FAF4",
    border: "#C3E8D4",
  },
  {
    icon: <Trophy size={48} color="#C8A84E" strokeWidth={1.5} />,
    badge: "GARANTIA 2",
    badgeColor: "#A8893A",
    badgeBg: "#F5EFD8",
    title: "6 meses. Garantia de resultado.",
    body: "Implementou tudo e não teve resultado? Leandro te acompanha por mais 3 meses. Se ainda não funcionar: devolução integral.",
    bg: "#FDFAF4",
    border: "#E8D9A0",
  },
];

export default function Garantias() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }} id="garantias">
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
              Duas garantias.{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>Risco zero</em>.
            </h2>
          </div>
        </FadeIn>

        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, maxWidth: 820, margin: "0 auto 40px" }}
          className="guar-grid"
        >
          {guarantees.map(({ icon, badge, badgeColor, badgeBg, title, body, bg, border }, i) => (
            <FadeIn key={title} direction="up" delay={i * 150}>
              <div
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: 16,
                  padding: 32,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(45,40,35,0.1)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div>{icon}</div>

                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontWeight: 700,
                      fontSize: "0.6875rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: badgeColor,
                      background: badgeBg,
                      padding: "3px 10px",
                      borderRadius: 20,
                      display: "inline-block",
                      marginBottom: 12,
                    }}
                  >
                    {badge}
                  </span>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.375rem", color: "#1A1A1A", lineHeight: 1.3 }}>
                    {title}
                  </h3>
                </div>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#3D3A36", lineHeight: 1.7 }}>
                  {body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={400}>
          <p style={{ textAlign: "center", fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.0625rem", color: "#3D3A36" }}>
            O risco não é seu. É do Leandro. Se não funcionar, ele paga — não você.
          </p>
        </FadeIn>
      </div>
      <style>{`.guar-grid { @media (max-width:640px) { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

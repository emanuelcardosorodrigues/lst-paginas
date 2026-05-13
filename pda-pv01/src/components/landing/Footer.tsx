import { FadeIn } from "@/lib/FadeIn";
import { img } from "@/lib/imgPath";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#1A1A1A", padding: "clamp(48px,6vw,72px) 0 clamp(32px,4vw,48px)" }}>
      <FadeIn>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 24,
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <img
                src={img("eagle-logo.png")}
                alt="Programa Águia"
                width={48}
                height={48}
                style={{ width: 48, height: 48, objectFit: "contain", filter: "brightness(0) invert(1)" }}
                onError={e => { e.currentTarget.style.display = "none"; }}
              />
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    color: "#FFFFFF",
                    display: "block",
                  }}
                >
                  Programa Águia
                </span>
                <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "#B0ADA8" }}>
                  Dr. Leandro Stecca
                </span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.1)" }} />

            {/* Links */}
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { label: "Política de Privacidade", href: "#" },
                { label: "Termos de Uso", href: "#" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.875rem",
                    color: "#B0ADA8",
                    textDecoration: "none",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = "#D4B96A"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "#B0ADA8"; }}
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Legal */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, width: "100%", marginTop: 8 }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: 680, margin: "0 auto 8px" }}>
                © {year} Dr. Leandro Stecca · Programa Águia · Todos os direitos reservados
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", maxWidth: 680, margin: "0 auto", lineHeight: 1.6 }}>
                Este produto não garante resultados específicos. Os resultados apresentados são de alunos reais e podem variar conforme a realidade de cada clínica e a implementação das estratégias ensinadas.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}

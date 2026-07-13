import { FadeIn } from "@/lib/FadeIn";
import { img } from "@/lib/imgPath";

export default function Footer() {
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

            {/* Copyright + Links */}
            <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", color: "rgba(255,255,255,0.28)", margin: 0 }}>
              Dr. Leandro Stecca © 2026. Todos os direitos reservados.
            </p>

            <nav style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
              <a
                href="https://leandrostecca.com.br/termos-de-uso"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.32)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "rgba(212,185,106,0.7)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.32)"; }}
              >
                Termos de Uso
              </a>
              <span style={{ color: "rgba(255,255,255,0.15)" }} aria-hidden="true">|</span>
              <a
                href="https://leandrostecca.com.br/politica-de-privacidade"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.32)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = "rgba(212,185,106,0.7)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.32)"; }}
              >
                Política de privacidade
              </a>
            </nav>

            {/* Disclaimer Meta (opaco) */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, width: "100%", marginTop: 8 }}>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.6875rem", color: "rgba(255,255,255,0.10)", lineHeight: 1.6, maxWidth: 620, margin: "0 auto" }}>
                Este site não é afiliado, patrocinado ou endossado pela Meta®, Facebook® ou Instagram®. As marcas citadas pertencem aos seus respectivos proprietários. Resultados podem variar de acordo com a dedicação e realidade de cada pessoa.
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
}

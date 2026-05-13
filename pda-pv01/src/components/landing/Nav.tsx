import { useState, useEffect } from "react";
import { CHECKOUT_URL } from "@/lib/checkout";
import { EagleLogo } from "./EagleLogo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        height: 72,
        borderBottom: "1px solid #E8E4DB",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        background: scrolled ? "rgba(255,255,255,0.95)" : "#FFFFFF",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a href="#main" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <EagleLogo size={36} />
          <span style={{ fontFamily: "var(--font-serif)", fontWeight: 600, fontSize: 18, color: "#1A1A1A" }}>
            Programa Águia
          </span>
        </a>

        {/* Desktop links */}
        <nav style={{ display: "flex", alignItems: "center", gap: 32 }} className="hidden md:flex">
          {[["#sobre", "Sobre"], ["#programa", "Programa"], ["#resultados", "Resultados"], ["#faq", "FAQ"]].map(([href, label]) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#6B6560",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C8A84E")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6B6560")}
            >
              {label}
            </a>
          ))}
          <a
            href={CHECKOUT_URL}
            data-gtm-id="cta-nav"
            data-gtm-label="Nav CTA"
            style={{
              background: "#C8A84E",
              color: "#1A1A1A",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 24,
              padding: "10px 24px",
              transition: "background 0.2s ease",
              fontFamily: "var(--font-sans)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#B89A42")}
            onMouseLeave={e => (e.currentTarget.style.background = "#C8A84E")}
          >
            Quero Entrar
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="md:hidden"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }}
        >
          <span style={{ display: "block", width: 22, height: 2, background: "#1A1A1A", marginBottom: 5, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#1A1A1A", marginBottom: 5, opacity: open ? 0 : 1, transition: "opacity 0.3s" }} />
          <span style={{ display: "block", width: 22, height: 2, background: "#1A1A1A", transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: "72px 0 0 0",
            background: "#F7F3EB",
            padding: 32,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            zIndex: 998,
          }}
        >
          {[["#sobre", "Sobre"], ["#programa", "Programa"], ["#resultados", "Resultados"], ["#faq", "FAQ"]].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{ fontFamily: "var(--font-sans)", fontSize: 18, fontWeight: 600, color: "#1A1A1A" }}
            >
              {label}
            </a>
          ))}
          <a
            href={CHECKOUT_URL}
            data-gtm-id="cta-nav"
            onClick={() => setOpen(false)}
            className="btn-primary"
            style={{ textAlign: "center", marginTop: 8 }}
          >
            QUERO ENTRAR NO PROGRAMA ÁGUIA
          </a>
        </div>
      )}
    </header>
  );
}

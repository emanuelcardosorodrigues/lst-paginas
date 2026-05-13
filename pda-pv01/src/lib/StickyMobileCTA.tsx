import { useEffect, useState } from "react";
import { CHECKOUT_URL } from "./checkout";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(pct > 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        padding: "12px 16px",
        background: "#1A1A1A",
        borderTop: "1px solid rgba(200,168,78,0.3)",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
        display: "block",
      }}
      className="md:hidden"
    >
      <a
        href={CHECKOUT_URL}
        data-gtm-id="cta-mobile-sticky"
        data-gtm-label="Sticky Mobile CTA"
        style={{
          display: "block",
          background: "#C8A84E",
          color: "#1A1A1A",
          fontWeight: 700,
          fontSize: "0.9375rem",
          textAlign: "center",
          padding: "14px 24px",
          borderRadius: 8,
          letterSpacing: "0.02em",
        }}
      >
        QUERO ENTRAR NO PROGRAMA ÁGUIA
      </a>
    </div>
  );
}

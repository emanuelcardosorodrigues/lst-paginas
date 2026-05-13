import { useEffect, useRef } from "react";
import { Users, MapPin, ShieldCheck } from "lucide-react";
import { CHECKOUT_URL } from "@/lib/checkout";
import { img } from "@/lib/imgPath";
import { MagneticButton } from "@/lib/MagneticButton";
import { Reveal } from "@/lib/Reveal";

export default function Hero() {
  const photoRef = useRef<HTMLImageElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onLoad = () => {
      if (photoRef.current) {
        photoRef.current.style.animation = "kenBurns 1.4s cubic-bezier(0.16,1,0.3,1) forwards";
      }
      if (blobRef.current) {
        blobRef.current.style.animation = "blobPulse 8s ease-in-out infinite";
      }
    };
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <section style={{ background: "#FFFFFF" }} id="hero">
      {/* Logo bar — replaces nav */}
      <div
        style={{
          padding: "28px 0 0",
          display: "flex",
          justifyContent: "center",
          animation: "fadeUp 0.5s ease both",
        }}
      >
        <img
          src={img("eagle-logo.png")}
          alt="Programa Águia"
          width={72}
          height={72}
          style={{ width: 72, height: 72, objectFit: "contain" }}
          onError={e => {
            e.currentTarget.style.display = "none";
            const span = document.createElement("span");
            span.style.cssText = "font-family:var(--font-serif);font-size:1.5rem;font-weight:700;color:#C8A84E;letter-spacing:-0.01em";
            span.textContent = "Programa Águia";
            e.currentTarget.parentElement!.appendChild(span);
          }}
        />
      </div>

      {/* Hero content */}
      <div style={{ padding: "clamp(40px,6vw,72px) 0 clamp(64px,8vw,100px)" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "55fr 45fr",
              gap: "clamp(32px, 5vw, 72px)",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* LEFT: Text */}
            <div>
              {/* Kicker badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#F5EFD8",
                  borderRadius: 24,
                  padding: "6px 16px",
                  marginBottom: 28,
                  animation: "fadeUp 0.6s ease both",
                }}
              >
                <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#A8893A", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  ✦ 5 Turmas Concluídas · Turmas de 10 Dentistas · 6 Meses de Acompanhamento
                </span>
              </div>

              {/* H1 */}
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                  fontWeight: 700,
                  lineHeight: 1.12,
                  letterSpacing: "-0.02em",
                  color: "#1A1A1A",
                  marginBottom: 24,
                }}
              >
                <Reveal stagger={55}>Uma clínica que lucra</Reveal>{" "}
                <em style={{ fontStyle: "italic", color: "#C8A84E" }}>
                  <Reveal baseDelay={420} stagger={60}>de verdade.</Reveal>
                </em>
                <br />
                <Reveal baseDelay={640} stagger={55}>Uma agenda que te liberta do mocho.</Reveal>
                <br />
                <Reveal baseDelay={920} stagger={55}>Uma vida que vale a pena construir.</Reveal>
              </h1>

              {/* Destaque */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: "#3D3A36",
                  marginBottom: 16,
                  animation: "fadeUp 0.6s ease 0.45s both",
                }}
              >
                É isso que quem dedicou tanto tempo à odontologia deveria ter HOJE.
              </p>

              {/* Subtitle */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "1.125rem",
                  lineHeight: 1.7,
                  color: "#6B6560",
                  maxWidth: 520,
                  marginBottom: 16,
                  animation: "fadeUp 0.6s ease 0.55s both",
                }}
              >
                O Programa Águia de Aceleração de Clínicas é o sistema de 6 meses com o Dr. Leandro Stecca para dentistas que já faturam — mas ainda não construíram a clínica que funciona sem depender deles o tempo todo.
              </p>

              {/* Support text */}
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  fontStyle: "italic",
                  color: "#A09A8D",
                  marginBottom: 36,
                  animation: "fadeUp 0.6s ease 0.65s both",
                }}
              >
                Para quem já cansou de trabalhar de segunda a sábado e levar trabalho pra casa — e quer montar um consultório que lucra, cresce e te dá tempo de volta.
              </p>

              {/* Trust badges */}
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 40, animation: "fadeUp 0.6s ease 0.8s both" }}
              >
                {[
                  { icon: <Users size={18} color="#C8A84E" strokeWidth={1.5} />, text: "Turmas de 10 — não é curso, é acompanhamento de perto" },
                  { icon: <MapPin size={18} color="#C8A84E" strokeWidth={1.5} />, text: "Onboarding individual de 2h — com o Leandro, nos seus números" },
                  { icon: <ShieldCheck size={18} color="#C8A84E" strokeWidth={1.5} />, text: "Garantia dupla — 15 dias sem perguntas + 6 meses de resultado" },
                ].map(({ icon, text }) => (
                  <div key={text} className="trust-badge">
                    {icon}
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <MagneticButton
                href={CHECKOUT_URL}
                data-gtm-id="cta-hero"
                data-gtm-label="Hero CTA"
                className="btn-primary btn-primary-lg btn-glow"
                style={{ animation: "fadeUp 0.6s ease 0.95s both" }}
              >
                QUERO ENTRAR NO PROGRAMA ÁGUIA COM CONDIÇÃO ESPECIAL
              </MagneticButton>
            </div>

            {/* RIGHT: Photo */}
            <div style={{ position: "relative" }}>
              <div
                ref={blobRef}
                style={{
                  position: "absolute",
                  inset: "-24px",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(200,168,78,0.08) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  borderRadius: 12,
                  overflow: "hidden",
                  aspectRatio: "4/5",
                  background: "#F7F3EB",
                  border: "1px solid #E8E4DB",
                }}
              >
                <img
                  ref={photoRef}
                  src={img("hero-leandro.webp")}
                  srcSet={`${img("hero-leandro-480.webp")} 480w, ${img("hero-leandro.webp")} 900w`}
                  sizes="(max-width:768px) 100vw, 45vw"
                  alt="Dr. Leandro Stecca em ambiente de vida — varanda, luz natural, postura relaxada"
                  width={600}
                  height={750}
                  fetchPriority="high"
                  decoding="sync"
                  loading="eager"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  onError={e => {
                    const imgEl = e.currentTarget;
                    imgEl.style.display = "none";
                    const parent = imgEl.parentElement!;
                    parent.style.display = "flex";
                    parent.style.alignItems = "center";
                    parent.style.justifyContent = "center";
                    const ph = document.createElement("span");
                    ph.style.cssText = "font-family:var(--font-accent);font-style:italic;color:#A09A8D;font-size:0.875rem;text-align:center;padding:24px";
                    ph.textContent = "Foto Hero · Dr. Leandro Stecca";
                    parent.appendChild(ph);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { order: -1; max-width: 360px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

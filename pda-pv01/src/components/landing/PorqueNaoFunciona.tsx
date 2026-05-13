import { FadeIn } from "@/lib/FadeIn";

export default function PorqueNaoFunciona() {
  return (
    <section style={{ background: "#FFFFFF", padding: "clamp(80px,10vw,120px) 0" }}>
      <div className="container" style={{ maxWidth: 860 }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.875rem,4vw,2.75rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: "#1A1A1A",
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            Mais faturamento sem estratégia = mais trabalho pro menos lucro.
          </h2>
        </FadeIn>

        {/* Bucket illustration */}
        <FadeIn delay={100}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
            <BucketIllustration />
          </div>
        </FadeIn>

        {/* Statement */}
        <FadeIn delay={200}>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                fontSize: "clamp(1.25rem,2.5vw,1.5rem)",
                color: "#1A1A1A",
                lineHeight: 1.4,
                marginBottom: 12,
              }}
            >
              O dinheiro que você precisa já está dentro da clínica.
            </p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                fontSize: "clamp(1.25rem,2.5vw,1.5rem)",
                color: "#1A1A1A",
                lineHeight: 1.4,
              }}
            >
              Você só nunca teve o{" "}
              <em style={{ fontStyle: "italic", color: "#C8A84E" }}>mapa</em>.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function BucketIllustration() {
  return (
    <svg width="420" height="220" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Dois baldes: um com furos vazando, outro com furos selados">
      {/* === BALDE 1 — COM FUROS === */}
      <g transform="translate(20,0)">
        {/* Handle */}
        <path d="M60 40 Q90 20 120 40" stroke="#A09A8D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Body */}
        <path d="M50 50 L70 190 L130 190 L150 50 Z" stroke="#A09A8D" strokeWidth="2" fill="#F7F3EB" />
        {/* Rim */}
        <rect x="48" y="46" width="106" height="10" rx="5" fill="#E8E4DB" />
        {/* Water level */}
        <path d="M72 100 L128 100 L130 190 L70 190 Z" fill="rgba(200,168,78,0.15)" />
        {/* 4 holes (circles) */}
        <circle cx="85" cy="120" r="5" fill="#E8E4DB" stroke="#9B2C2C" strokeWidth="1.5" />
        <circle cx="115" cy="135" r="5" fill="#E8E4DB" stroke="#9B2C2C" strokeWidth="1.5" />
        <circle cx="78" cy="155" r="5" fill="#E8E4DB" stroke="#9B2C2C" strokeWidth="1.5" />
        <circle cx="122" cy="165" r="5" fill="#E8E4DB" stroke="#9B2C2C" strokeWidth="1.5" />
        {/* Drips from holes */}
        <g style={{ animation: "dropFall 2s ease-in infinite" }}>
          <path d="M83 128 L80 145" stroke="#C8A84E" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.5" />
          <path d="M113 143 L110 160" stroke="#C8A84E" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4" opacity="0.5" />
        </g>
        {/* Label */}
        <text x="100" y="210" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fill="#9B2C2C" fontWeight="600">Mais pacientes</text>
      </g>

      {/* Arrow */}
      <g transform="translate(178, 90)">
        <line x1="0" y1="20" x2="60" y2="20" stroke="#C8A84E" strokeWidth="2" />
        <polyline points="50,13 60,20 50,27" fill="none" stroke="#C8A84E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* === BALDE 2 — FUROS SELADOS === */}
      <g transform="translate(250,0)">
        {/* Handle */}
        <path d="M60 40 Q90 20 120 40" stroke="#A09A8D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Body */}
        <path d="M50 50 L70 190 L130 190 L150 50 Z" stroke="#2D6A4F" strokeWidth="2" fill="#F0FAF4" />
        {/* Rim */}
        <rect x="48" y="46" width="106" height="10" rx="5" fill="#B8D8C8" />
        {/* Water — fuller */}
        <path d="M72 75 L128 75 L130 190 L70 190 Z" fill="rgba(45,106,79,0.2)" />
        {/* Sealed holes — checkmarks */}
        <circle cx="85" cy="120" r="5" fill="#2D6A4F" />
        <circle cx="115" cy="135" r="5" fill="#2D6A4F" />
        <circle cx="78" cy="155" r="5" fill="#2D6A4F" />
        <circle cx="122" cy="165" r="5" fill="#2D6A4F" />
        <text x="100" y="210" textAnchor="middle" fontFamily="var(--font-sans)" fontSize="12" fill="#2D6A4F" fontWeight="600">Furos corrigidos</text>
      </g>
      <style>{`@keyframes dropFall { 0%{opacity:0;transform:translateY(-6px)} 50%{opacity:0.6} 100%{opacity:0;transform:translateY(10px)} }`}</style>
    </svg>
  );
}

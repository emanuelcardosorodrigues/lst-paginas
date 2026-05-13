import { FadeIn } from "@/lib/FadeIn";
import { img } from "@/lib/imgPath";

const bio = [
  "Quase 30 anos de odontologia. Periodontista. Ainda atende.",
  "Clínicas em 3 estados — todas funcionando sem ele lá dentro.",
  "5 turmas do Águia concluídas. Cada uma com 10 dentistas. Acompanhamento de perto.",
  "23 países visitados. Semanas fora. Clínicas rodando. Família por perto.",
  "Criou o Odonto Summit — 140 dentistas presenciais. Entrevistado no SBT em rede nacional.",
  "Errou muito pra chegar aqui. Franquia, sociedade, Malha Fina. Aprendeu no campo, não em slide.",
];

export default function QuemCriou() {
  return (
    <section style={{ background: "#F7F3EB", padding: "clamp(80px,10vw,120px) 0" }} id="sobre">
      <div className="container">
        <div
          style={{ display: "grid", gridTemplateColumns: "45fr 55fr", gap: "clamp(40px,6vw,80px)", alignItems: "center" }}
          className="bio-grid"
        >
          {/* Left: Photo */}
          <FadeIn direction="left">
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                aspectRatio: "1 / 1",
                background: "#F0EDE6",
                border: "1px solid #E8E4DB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={img("leandro-bio.webp")}
                alt="Dr. Leandro Stecca em contexto de viagem ou casa — lifestyle"
                width={500}
                height={500}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", animation: "kenBurns 1.6s cubic-bezier(0.16,1,0.3,1) forwards" }}
                onError={e => {
                  e.currentTarget.style.display = "none";
                  const p = e.currentTarget.parentElement!;
                  const s = document.createElement("span");
                  s.style.cssText = "font-family:var(--font-accent);font-style:italic;color:#A09A8D;font-size:0.875rem;text-align:center;padding:24px";
                  s.textContent = "Foto Leandro · Bio";
                  p.appendChild(s);
                }}
              />
            </div>
          </FadeIn>

          {/* Right: Bio */}
          <div>
            <FadeIn direction="right">
              <div style={{ marginBottom: 8 }}>
                <span className="kicker">✦ Quem está por trás do Programa Águia</span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.875rem,4vw,2.75rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  color: "#1A1A1A",
                  marginBottom: 28,
                }}
              >
                Dr. Leandro Stecca
              </h2>
            </FadeIn>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {bio.map((line, i) => (
                <FadeIn key={i} direction="right" delay={100 + i * 100}>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: "1rem", color: "#3D3A36", lineHeight: 1.8 }}>
                    {line}
                  </p>
                </FadeIn>
              ))}
            </div>

            <FadeIn direction="right" delay={800}>
              <p style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "1.0625rem", color: "#1A1A1A", marginTop: 24 }}>
                Não vende o que gostaria de viver.{" "}
                <em style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "#C8A84E" }}>Vive o que ensina</em>.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
      <style>{`.bio-grid { @media (max-width:768px) { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

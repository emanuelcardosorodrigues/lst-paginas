import { img } from "@/lib/imgPath";

export const Hero = () => {
  return (
    <section className="relative pt-[clamp(100px,12vw,160px)] pb-[clamp(60px,8vw,100px)] bg-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(0,168,142,0.08)_0%,transparent_60%)] -z-10" />

      <div className="container mx-auto px-6 max-w-[980px] relative z-10">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] font-[800] tracking-[-0.02em] text-[#0F172A] mb-6 max-w-[920px]">
            A Calculadora simples para ter <span className="text-[#00A88E]">Lucro</span> com dentista parceiro — em <span className="text-[#00A88E]">10 minutos</span>
          </h1>

          <p className="text-[#64748B] text-[1.125rem] leading-[1.7] mb-10 max-w-[640px]">
            Descubra muito mais do que o preço certo. Aplique a estratégia de remuneração lucrativa — para os dois — e se proteja judicialmente.
          </p>
        </div>

        <div className="relative mb-12">
          <img
            src={img("hero-bundle.webp")}
            alt="Bundle do Protocolo Dentista Parceiro Lucrativo: calculadora, masterclass, vídeos e bônus"
            className="w-full h-auto object-contain max-w-[900px] mx-auto"
            width="900"
            height="444"
            fetchpriority="high"
            decoding="sync"
          />
        </div>
      </div>
    </section>
  );
};

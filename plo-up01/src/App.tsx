import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { id?: string };
    }
  }
}

function VturbPlayer() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/37201b92-a048-47c6-8ba2-e601346d2802/players/6a0481544d614cad1bb99805/v4/player.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);
  return (
    <vturb-smartplayer
      id="vid-6a0481544d614cad1bb99805"
      style={{ display: "block", margin: "0 auto", width: "100%", maxWidth: "400px" }}
    />
  );
}

function useEsconderRevealed(ref: React.RefObject<HTMLDivElement | null>) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      if (window.getComputedStyle(el).display !== "none") setRevealed(true);
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(el, { attributes: true, attributeFilter: ["style", "class"] });
    return () => observer.disconnect();
  }, [ref]);
  return revealed;
}

function HotmartSalesFunnel() {
  useEffect(() => {
    const tryMount = () => {
      const w = window as any;
      if (w.checkoutElements && document.getElementById("hotmart-sales-funnel")) {
        try {
          w.checkoutElements.init("salesFunnel").mount("#hotmart-sales-funnel");
          return true;
        } catch {
          return false;
        }
      }
      return false;
    };
    if (tryMount()) return;
    const id = setInterval(() => { if (tryMount()) clearInterval(id); }, 200);
    return () => clearInterval(id);
  }, []);
  return <div id="hotmart-sales-funnel" className="w-full mb-6"></div>;
}

function HeroSection() {
  const esconderRef = useRef<HTMLDivElement>(null);
  useEsconderRevealed(esconderRef);
  return (
    <section className="section-dark bg-[#080C09] w-full pb-[clamp(4rem,8vw,7rem)]">
      <div className="blob-container blob-green"></div>

      <div className="w-full bg-[#DC2626] py-2.5 px-4 flex items-center justify-center gap-2 relative z-10">
        <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#FCD34D] shadow-[0_0_6px_rgba(252,211,77,0.7)] animate-live-pulse flex-shrink-0"></span>
        <span className="text-[#FCD34D] text-[0.7rem] sm:text-[0.8125rem] font-bold uppercase tracking-wide text-center leading-tight">
          ⚠ NÃO FECHE OU SAIA DA PÁGINA. A SUA COMPRA FOI APROVADA MAS AINDA ESTÁ EM PROCESSAMENTO
        </span>
      </div>

      <div className="content-relative max-w-[480px] mx-auto px-[clamp(1rem,5vw,1.5rem)] pt-4 flex flex-col items-center">

        <div className="w-full h-8 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden relative mb-3 border border-[rgba(255,255,255,0.08)]">
          <div className="progress-bar-fill"></div>
          <div className="absolute inset-0 flex items-center justify-center text-[0.75rem] font-bold text-white z-10 [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">
            Progresso: 93%
          </div>
        </div>

        <h1 className="font-[800] text-[clamp(1.25rem,4.5vw,1.875rem)] leading-[1.2] tracking-[-0.01em] text-[#F8FAF8] text-center mb-3 uppercase">
          ACESSO LIBERADO: A aula mais <span className="text-[#B91C1C]">URGENTE</span> do Protocolo Lucro Oculto! 🎁
        </h1>

        <p className="text-[0.875rem] text-[#F8FAF8] text-center mb-3 leading-snug">
          Essa aula <strong className="text-[#4ADE80] underline">só existe aqui</strong>. Assista <strong className="font-bold">até o final</strong>, pois ela desaparece ao sair ou fechar a página…<br />
          <span className="text-[#F8FAF8] font-semibold">Toque no play e assista agora!</span>
        </p>

        <div className="w-full mb-6">
          <VturbPlayer />
        </div>

        <div ref={esconderRef} className="esconder w-full">
          <HotmartSalesFunnel />
        </div>

      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="bg-[#080C09] min-h-screen text-[#F8FAF8] font-sans selection:bg-[#4ADE80] selection:text-[#080C09] overflow-x-hidden">
      <HeroSection />
      <Footer />
    </div>
  );
}

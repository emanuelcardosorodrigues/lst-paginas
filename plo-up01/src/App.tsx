import { useEffect } from "react";
import { Play, Check } from "lucide-react";

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

        <p className="text-[0.7rem] sm:text-xs font-semibold text-[#A0A89A] text-center mb-2 uppercase tracking-wide">
          ACESSO LIBERADO: A aula mais <span className="text-[#B91C1C] font-bold">URGENTE</span> do Protocolo Lucro Oculto! 🎁
        </p>

        <h1 className="font-[800] text-[clamp(1.125rem,4.2vw,1.875rem)] leading-[1.15] tracking-[-0.02em] text-[#F8FAF8] text-center mb-3">
          O ERRO QUE FAZ DENTISTAS <span className="text-[#4ADE80]">FATURAREM R$100 MIL</span>… E TERMINAREM O MÊS<br />COM <span className="text-[#F87171]">R$4 MIL</span> DE LUCRO
        </h1>

        <p className="text-[0.875rem] text-[#F8FAF8] text-center mb-3 leading-snug">
          Essa aula <strong className="text-[#4ADE80] underline">só existe aqui</strong>. E ela desaparece ao sair ou fechar a página…<br />
          <span className="text-[#F8FAF8] font-semibold">Toque no play e assista agora!</span>
        </p>

        <div className="mx-auto w-[min(280px,33.75vh)] aspect-[9/16] bg-[rgba(255,255,255,0.02)] rounded-[0.875rem] border border-[rgba(74,222,128,0.2)] shadow-[0_8px_64px_rgba(0,0,0,0.6)] overflow-hidden relative flex items-center justify-center cursor-pointer group mb-6">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(34,197,94,0.08)_0%,transparent_70%)]"></div>

          <div className="absolute w-[5rem] h-[5rem] rounded-full border border-[rgba(74,222,128,0.3)] animate-ring-pulse"></div>
          <Play className="w-14 h-14 text-[#4ADE80] drop-shadow-[0_0_12px_rgba(74,222,128,0.5)] relative z-10 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />

          <div className="absolute bottom-[1.25rem] font-semibold text-[0.7rem] tracking-[0.12em] uppercase text-[#4ADE80] opacity-80">
            ▶ ASSISTIR AULA GRATUITA
          </div>
        </div>

        <HotmartSalesFunnel />

        <p className="text-[0.95rem] text-[#A0A89A] text-center mb-6">
          Veja AGORA e Descubra
        </p>

        <ul className="w-full flex flex-col gap-2">
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-[#4ADE80] flex-shrink-0 mt-0.5" />
            <span className="text-[#F8FAF8] text-sm">Como acabar com as 3 armadilhas silenciosas que destroem seu lucro</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-[#4ADE80] flex-shrink-0 mt-0.5" />
            <span className="text-[#F8FAF8] text-sm">Como alguns dentistas aumentaram o lucro sem trazer pacientes novos</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-[#4ADE80] flex-shrink-0 mt-0.5" />
            <span className="text-[#F8FAF8] text-sm">Como dobrar o lucro muito ANTES dos 90 Dias</span>
          </li>
        </ul>

      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="bg-[#080C09] min-h-screen text-[#F8FAF8] font-sans selection:bg-[#4ADE80] selection:text-[#080C09] overflow-x-hidden">
      <HeroSection />
    </div>
  );
}

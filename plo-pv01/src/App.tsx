import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { CtaButton, img, imgSet } from "@/lib/landing-utils";

const BelowFold = lazy(() => import("@/components/BelowFold"));

const queryClient = new QueryClient();

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vturb-smartplayer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { id?: string };
    }
  }
}

function VturbPlayer({ revealSeconds }: { revealSeconds?: number }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/37201b92-a048-47c6-8ba2-e601346d2802/players/6a04bdf5f18251980df2bb48/v4/player.js";
    s.async = true;
    document.head.appendChild(s);

    if (!revealSeconds || !ref.current) return;
    const player = ref.current as unknown as {
      addEventListener: (e: string, fn: () => void) => void;
      removeEventListener: (e: string, fn: () => void) => void;
      displayHiddenElements?: (sec: number, selectors: string[], opts: { persist: boolean }) => void;
    };
    const handler = () => {
      player.displayHiddenElements?.(revealSeconds, [".esconder"], { persist: true });
    };
    player.addEventListener("player:ready", handler);
    return () => player.removeEventListener("player:ready", handler);
  }, [revealSeconds]);
  return (
    <vturb-smartplayer
      ref={ref as React.Ref<HTMLElement>}
      id="vid-6a04bdf5f18251980df2bb48"
      style={{ display: "block", margin: "0 auto", width: "100%", maxWidth: "min(400px, calc((100dvh - 280px) * 0.5625))" }}
    />
  );
}

function CountdownBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const dateLabel = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}`;
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const totalMin = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 60000));
  const timeLabel = `${String(Math.floor(totalMin / 60)).padStart(2, "0")}:${String(totalMin % 60).padStart(2, "0")}`;
  return (
    <div className="w-full bg-[#DC2626] text-white py-3.5 px-4 text-center text-[0.9375rem] sm:text-[1.0625rem] font-bold leading-[1.35]">
      <span className="mr-1.5">⚠️</span>
      <strong>ESSA AULA PODE SAIR DO AR HOJE, {dateLabel}, às 23:59.</strong>{" "}
      VOCÊ TEM MENOS DE <span className="underline">{timeLabel}</span> PARA APROVEITAR ESSA OPORTUNIDADE
    </div>
  );
}

function HeroSection() {
  return (
    <section className="section-dark bg-[#080C09] w-full pt-[clamp(1rem,3vw,2rem)] pb-[clamp(2rem,5vw,4rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-green"></div>
      <div className="content-relative max-w-[480px] mx-auto flex flex-col items-center">

        <h1 className="text-[1.25rem] sm:text-[1.5rem] text-[#F8FAF8] text-center leading-[1.45] mb-4">
          Nos próximos minutos, o <strong className="text-white font-extrabold whitespace-nowrap">Dr. Leandro Stecca</strong> mostra como dentistas estão saindo de <strong className="text-[#EF4444]">R$4 mil</strong> para <strong className="text-[#4ADE80]">R$22 mil de lucro</strong> sem trazer um único paciente novo.
        </h1>

        <p className="text-[0.8125rem] font-normal text-[#A0A89A] text-center leading-[1.5] mb-3">
          Toque abaixo e veja a aula antes que ela saia do ar
        </p>

        <div className="w-full">
          <VturbPlayer revealSeconds={1255} />
        </div>

      </div>
    </section>
  );
}

function BioSection() {
  return (
    <section className="bg-[#080C09] w-full py-[clamp(2.5rem,6vw,4rem)] px-[clamp(1rem,5vw,1.5rem)] border-t border-[rgba(74,222,128,0.08)]">
      <div className="max-w-[680px] mx-auto flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        <img
          src={img("/images/leandro-bio.webp")}
          alt="Dr. Leandro Stecca"
          width="320"
          height="480"
          loading="lazy"
          className="w-full max-w-[320px] sm:w-[260px] sm:max-w-[260px] sm:flex-shrink-0 aspect-[2/3] object-cover rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-[1.5rem] font-bold text-[#4ADE80] mb-4 text-center sm:text-left">
            Dr. Leandro Stecca
          </h3>
          <div className="space-y-3.5 text-[0.9375rem] leading-[1.6] text-[#F8FAF8]">
            <p>Dr. Leandro Stecca é dentista há quase 30 anos e também já viveu a realidade de ter uma clínica com agenda cheia… e pouco dinheiro sobrando no fim do mês.</p>
            <p>Depois de analisar centenas de consultórios, percebeu que o problema da maioria dos dentistas não estava na falta de pacientes — mas em vazamentos invisíveis que consumiam o lucro da clínica todos os meses.</p>
            <p>Hoje, é conhecido por mostrar os "buracos ocultos" que fazem o dinheiro desaparecer antes de chegar no bolso do dentista.</p>
            <p>E foi justamente essa descoberta que fez clínicas saírem de R$4 mil para R$22 mil de lucro sem aumentar a quantidade de pacientes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PosVslSection() {
  return (
    <section className="bg-[#FFFFFF] w-full py-[clamp(3.5rem,7vw,6rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="max-w-[480px] mx-auto">
        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#0A0F0B] mb-6">
          Dobre o Lucro do Seu Consultório em 90 Dias
        </h2>
        <ul className="space-y-2 mb-8">
          <li className="font-normal text-[1.05rem] text-[#4A5244] leading-[1.7]">Sem gastar com tráfego</li>
          <li className="font-normal text-[1.05rem] text-[#4A5244] leading-[1.7]">Sem ter mais pacientes</li>
          <li className="font-normal text-[1.05rem] text-[#4A5244] leading-[1.7]">Sem inflar faturamento tóxico</li>
        </ul>
        <CtaButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          GARANTIR MINHA VAGA!
        </CtaButton>
      </div>
    </section>
  );
}

function StickyFooter() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDepth = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollDepth > 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[rgba(8,12,9,0.92)] backdrop-blur-[16px] border-t border-[rgba(74,222,128,0.2)] md:hidden">
      <div className="max-w-[480px] mx-auto">
        <CtaButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          GARANTIR MINHA VAGA!
        </CtaButton>
      </div>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="bg-[#080C09] min-h-screen text-[#F8FAF8] font-sans selection:bg-[#4ADE80] selection:text-[#080C09] overflow-x-hidden">
      <CountdownBar />
      <HeroSection />
      <BioSection />
      <div className="esconder">
        <PosVslSection />
        <Suspense fallback={<div className="bg-[#080C09] min-h-[200px]" />}>
          <BelowFold />
        </Suspense>
        <StickyFooter />
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

import React, { useEffect, useState, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Play } from "lucide-react";
import NotFound from "@/pages/not-found";
import { CtaButton, img, imgSet } from "@/lib/landing-utils";

const BelowFold = lazy(() => import("@/components/BelowFold"));

const queryClient = new QueryClient();

function HeroSection() {
  const today = new Date();
  const diasSemana = ["domingo","segunda","terça","quarta","quinta","sexta","sábado"];
  const meses = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];
  const diaSemana = diasSemana[today.getDay()];
  const dia = today.getDate();
  const mes = meses[today.getMonth()];

  return (
    <section className="section-dark bg-[#080C09] w-full pt-[clamp(4rem,8vw,7rem)] pb-[clamp(4rem,8vw,7rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-green"></div>
      <div className="content-relative max-w-[480px] mx-auto flex flex-col items-center">

        <div className="mb-6 flex items-center justify-center bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-full px-3 py-1.5">
          <span className="inline-block w-[7px] h-[7px] rounded-full bg-[#F87171] shadow-[0_0_6px_rgba(248,113,113,0.7)] animate-live-pulse mr-2 align-middle"></span>
          <span className="text-sm font-normal italic text-[#A0A89A]">Essa aula sai do ar hoje, {diaSemana}, {dia}/{mes}</span>
        </div>

        <h1 className="font-[800] text-[clamp(2.25rem,9vw,3.25rem)] leading-[1.08] tracking-[-0.03em] text-[#F8FAF8] text-center mb-8">
          Dobre o Lucro do Seu Consultório em <span className="text-[#4ADE80]">90 Dias</span>
        </h1>

        <div className="w-full aspect-video bg-[rgba(255,255,255,0.02)] rounded-[0.875rem] border border-[rgba(74,222,128,0.2)] shadow-[0_8px_64px_rgba(0,0,0,0.6)] overflow-hidden relative flex items-center justify-center cursor-pointer group mb-8">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(34,197,94,0.08)_0%,transparent_70%)]"></div>

          <div className="absolute w-[5rem] h-[5rem] rounded-full border border-[rgba(74,222,128,0.3)] animate-ring-pulse"></div>
          <Play className="w-14 h-14 text-[#4ADE80] drop-shadow-[0_0_12px_rgba(74,222,128,0.5)] relative z-10 group-hover:scale-110 transition-transform duration-300" fill="currentColor" />

          <div className="absolute bottom-[1.25rem] font-semibold text-[0.7rem] tracking-[0.12em] uppercase text-[#4ADE80] opacity-80">
            ▶ ASSISTIR AULA GRATUITA
          </div>
        </div>

        <p className="text-[0.8125rem] font-normal text-[#A0A89A] text-center leading-[1.5] -mt-4">
          Toque abaixo e veja a aula antes que ela saia do ar
        </p>

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
      <HeroSection />
      <PosVslSection />
      <Suspense fallback={<div className="bg-[#080C09] min-h-[200px]" />}>
        <BelowFold />
      </Suspense>
      <StickyFooter />
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

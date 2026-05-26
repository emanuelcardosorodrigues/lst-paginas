import React, { useEffect, useState, lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { CtaButton } from "@/lib/landing-utils";
import { useEsconderRevealed } from "@/lib/useEsconderRevealed";
import BioSection from "@/components/BioSection";

const BelowFold = lazy(() => import("@/components/BelowFold"));

const queryClient = new QueryClient();

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
    s.src = "https://scripts.converteai.net/37201b92-a048-47c6-8ba2-e601346d2802/ab-test/6a04bac6f7dfb345ee3c5450/player.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);
  return (
    <vturb-smartplayer
      id="ab-6a04bac6f7dfb345ee3c5450"
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
  return (
    <div className="w-full bg-[#DC2626] text-white py-3 px-3 text-center text-[clamp(0.6875rem,2.9vw,1rem)] font-bold leading-[1.3] whitespace-nowrap overflow-hidden">
      <span className="mr-1.5">⚠️</span>
      <strong>ESSA AULA SAI DO AR HOJE, {dateLabel}, às 23:59.</strong>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="section-dark bg-[#080C09] w-full pt-[clamp(1rem,3vw,2rem)] pb-[clamp(2rem,5vw,4rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-green"></div>
      <div className="content-relative max-w-[480px] mx-auto flex flex-col items-center">

        <div className="w-full">
          <VturbPlayer />
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
  const revealed = useEsconderRevealed();
  return (
    <div className="bg-[#080C09] min-h-screen text-[#F8FAF8] font-sans selection:bg-[#4ADE80] selection:text-[#080C09] overflow-x-hidden">
      <CountdownBar />
      <HeroSection />
      {!revealed && <BioSection />}
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

import React, { useEffect, useState, useRef } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Play, MapPin, AlertCircle, Calendar, BarChart3, User, X, Check, ArrowRight } from "lucide-react";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();
const checkoutUrl = "https://pay.hotmart.com/K105045449J?off=tanuaurl&split=12&offDiscount=MAPAOCULTO&bid=1776377238546";
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
const img = (path: string) => `${base}${path}`;

// --- Hooks ---
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isIntersecting] as const;
}

function useCountUp(end: number, start = 0, duration = 2000, startAnimation = true) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!startAnimation) return;

    let startTime: number | null = null;
    let rafId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    rafId = window.requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, start, duration, startAnimation]);

  return count;
}

// --- Components ---

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function pushGtmClick(label: string, isPrimary: boolean) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cta_click",
    cta_label: label,
    cta_type: isPrimary ? "primary" : "secondary",
    page_slug: "plo-pv01",
  });
}

function CtaButton({ children, primary = true, className = "", ...props }: any) {
  const { onClick, href = checkoutUrl, ...rest } = props;

  const label = typeof children === "string" ? children : "CTA";

  const handleClick = () => {
    pushGtmClick(label, primary);
    if (onClick) onClick();
  };

  if (primary) {
    return (
      <a
        href={href}
        onClick={handleClick}
        data-gtm-click="cta-primary"
        data-gtm-label={label}
        className={`block w-full py-4 px-8 bg-[#4ADE80] hover:bg-[#22C55E] text-[#080C09] font-bold text-[0.9375rem] tracking-[0.04em] uppercase text-center rounded-lg border-none shadow-[0_0_20px_rgba(74,222,128,0.25)] transition-all duration-200 cursor-pointer animate-cta-glow ${className}`}
        aria-label={label}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      onClick={handleClick}
      data-gtm-click="cta-secondary"
      data-gtm-label={label}
      className={`block w-full py-3.5 bg-transparent hover:bg-[rgba(74,222,128,0.08)] text-[#4ADE80] font-semibold text-[0.9rem] text-center rounded-lg border border-[rgba(74,222,128,0.35)] transition-all duration-200 cursor-pointer ${className}`}
      aria-label={label}
      {...rest}
    >
      {children}
    </a>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <span className="block w-8 h-[1px] bg-[rgba(74,222,128,0.5)] mb-2.5"></span>
      <span className="font-medium text-[0.7rem] tracking-[0.18em] uppercase text-[#4ADE80]">
        {children}
      </span>
    </div>
  );
}

function StickyFooter() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollDepth = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollDepth > 0.5);
    };
    window.addEventListener('scroll', handleScroll);
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


// --- Sections ---

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

function OQueVaiAcontecerSection() {
  const cards = [
    {
      image: img("/images/transformation_01_confusion.webp"),
      alt: "Dentista analisando números da clínica com expressão de dúvida",
      title: 'O FIM DO "NÃO SEI PRA ONDE FOI O DINHEIRO"',
      desc: "Hoje, 1 em cada 3 dentistas termina o mês com zero de lucro. Não por falta de paciente… mas porque o dinheiro some antes de chegar até você.",
    },
    {
      image: img("/images/transformation_02_fixing.webp"),
      alt: "Mãos de dentista analisando painel financeiro no computador",
      title: "O CORTE DOS VAZAMENTOS",
      desc: "Imposto pago errado. Maquininha comendo margem. Parceiro ficando com o lucro. Você vê cada 'buraco' com número — e fecha um por um.",
    },
    {
      image: img("/images/transformation_03_relief.webp"),
      alt: "Dentista aliviado vendo indicadores financeiros positivos",
      title: "DINHEIRO SOBRANDO",
      desc: "A conta começa a ficar mais cheia e o fim do mês não te assusta mais.",
    },
    {
      image: img("/images/transformation_04_control.webp"),
      alt: "Dentista confiante acompanhando agenda e gráficos financeiros",
      title: "CONTROLE REAL",
      desc: "Você passa a saber quanto vai tirar no mês antes dele acabar. Não é mais 'ver quanto sobra' — é olhar sua agenda… e já saber o resultado dela.",
    },
  ];

  return (
    <section className="section-dark bg-[#080C09] w-full py-[clamp(4rem,8vw,7rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-teal"></div>
      <div className="content-relative max-w-[480px] mx-auto">
        <SectionLabel>O QUE VAI ACONTECER</SectionLabel>
        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#F8FAF8] mb-10 text-center">
          Nas próximas semanas, você não vai trabalhar mais…<br /><br />
          você vai finalmente <span className="bg-[#4ADE80] text-[#080C09] px-1">coletar o dinheiro que já está dentro da sua clínica.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[0.875rem]">
          {cards.map((card) => (
            <div key={card.title} className="glass-card overflow-hidden flex flex-col">
              <img src={card.image} alt={card.alt} loading="lazy" className="w-full h-[180px] object-cover rounded-t-[1rem]" />
              <div className="p-[1.5rem] flex flex-col gap-4">
                <h3 className="font-bold text-[0.8rem] tracking-[0.05em] uppercase text-[#F8FAF8]">{card.title}</h3>
                <p className="font-normal text-[0.8125rem] text-[#A0A89A] leading-[1.6]">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SocialProofCard({ data }: any) {
  const [ref, isIntersecting] = useIntersectionObserver();
  const profitEnd = parseInt(data.profitAfter.replace(/\D/g, ''), 10);
  const currentProfit = useCountUp(profitEnd, 0, 1500, isIntersecting);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="glass-card p-[1.5rem] flex flex-col gap-4 mb-6 !bg-[#0A0F0B] !border-[#E2E8F0] shadow-[0_4px_32px_rgba(0,0,0,0.10)] text-[#F8FAF8]">
        <img src={data.photo} alt={data.name} loading="lazy" style={{ objectPosition: data.photoPosition || "center" }} className="w-full h-[140px] object-cover rounded-[0.625rem] bg-[#E2E8F0]" />
      
      <div>
        <h3 className="font-bold text-[1.1rem] text-[#F8FAF8] tracking-[-0.01em]">{data.name}</h3>
        <span className="font-medium text-[0.65rem] uppercase tracking-[0.12em] text-[#5A6354] block mt-1">{data.clinic}</span>
        <div className="flex items-center mt-2">
          <MapPin className="w-3 h-3 text-[#4ADE80] mr-1.5" />
          <span className="font-normal text-[0.75rem] text-[#A0A89A]">{data.location}</span>
        </div>
      </div>

      <div className="mt-2">
        <span className="font-medium text-[0.6rem] tracking-[0.12em] uppercase text-[#5A6354] block mb-1">Faturamento</span>
        <div className="flex items-center gap-2">
          <span className="font-normal text-[0.875rem] line-through text-[#5A6354]">{data.revenueBefore}</span>
          <ArrowRight className="w-4 h-4 text-[#4ADE80]" />
          <span className="font-bold text-[1.5rem] tracking-[-0.02em] text-[#F8FAF8]">{data.revenueAfter}</span>
        </div>
      </div>

      <div ref={ref} className="bg-[rgba(74,222,128,0.06)] border border-[rgba(74,222,128,0.15)] rounded-[0.625rem] p-4 relative overflow-hidden">
        <span className="font-medium text-[0.6rem] tracking-[0.12em] uppercase text-[#4ADE80] opacity-70 block mb-1">Lucro</span>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-normal text-[0.85rem] line-through text-[#5A6354]">{data.profitBefore}</span>
          <ArrowRight className="w-4 h-4 text-[#4ADE80]" />
        </div>
        <div className="flex items-center justify-between">
          <span className="font-[800] text-[1.75rem] tracking-[-0.025em] text-[#4ADE80] drop-shadow-[0_0_8px_rgba(74,222,128,0.4)]">
             {isIntersecting ? formatCurrency(currentProfit) : "R$ 0"}
          </span>
          {isIntersecting && (
            <span className="bg-[rgba(74,222,128,0.12)] border border-[rgba(74,222,128,0.2)] text-[#4ADE80] font-bold text-[0.7rem] px-2 py-0.5 rounded-full animate-pop-in">
              {data.badge}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function SocialProofSection() {
  const proofs = [
    {
      name: "Dr. José Ronaldo",
      clinic: "Clínica com 3 Consultórios",
      location: "Santa Isabel / SP — 53.174 habitantes",
      revenueBefore: "R$100.000",
      revenueAfter: "R$110.000",
      profitBefore: "R$4.000",
      profitAfter: "R$22000",
      badge: "+450%",
      photo: img("/images/social_jose_ronaldo.webp"),
      photoPosition: "center 30%"
    },
    {
      name: "Dra. Maria Emília",
      clinic: "Clínica com 3 Consultórios",
      location: "São João Nepomuceno / MG — 26.478 habitantes",
      revenueBefore: "R$60.000",
      revenueAfter: "R$70.000",
      profitBefore: "R$6.000",
      profitAfter: "R$16000",
      badge: "+167%",
      photo: img("/images/social_maria_emilia.webp"),
      photoPosition: "center 30%"
    },
    {
      name: "Dra. Ana Beatriz",
      clinic: "Consultório com 1 cadeira",
      location: "Juiz de Fora / MG — 567.730 habitantes",
      revenueBefore: "R$30.000",
      revenueAfter: "R$45.000",
      profitBefore: "R$7.000",
      profitAfter: "R$13000",
      badge: "+86%",
      photo: img("/images/social_ana_beatriz.webp")
    }
  ];

  return (
    <section className="bg-[#FFFFFF] w-full py-[clamp(3.5rem,7vw,6rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="max-w-[480px] mx-auto">
        <div className="mb-10 text-center">
          <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#0A0F0B] mb-3">
            Esses dentistas não trouxeram um único paciente novo.
          </h2>
          <p className="font-semibold text-[1.15rem] text-[#4A5244] leading-[1.5] mb-2">
            Só pararam de perder dinheiro…
          </p>
          <p className="font-bold text-[1.15rem]">
            <span className="bg-[#4ADE80] text-[#080C09] px-1">e o lucro apareceu.</span>
          </p>
        </div>
        
        <div>
          {proofs.map((p, i) => <SocialProofCard key={i} data={p} />)}
        </div>
      </div>
    </section>
  );
}

function UrgenciaSection() {
  const [ref, isIntersecting] = useIntersectionObserver();
  const lossEnd1 = 45000;
  const lossEnd2 = 90000;
  const lossEnd3 = 170000;
  
  const v1 = useCountUp(lossEnd1, 0, 1000, isIntersecting);
  const v2 = useCountUp(lossEnd2, 0, 1500, isIntersecting);
  const v3 = useCountUp(lossEnd3, 0, 2000, isIntersecting);

  const format = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(v);

  return (
    <section className="section-dark bg-[#080C09] w-full py-[clamp(4rem,8vw,7rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-green"></div>
      <div className="content-relative max-w-[480px] mx-auto">
        
        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#F8FAF8] mb-10 text-center">
          Cada mês que você continua sem ajustar isso… é dinheiro que sai da sua clínica e não volta mais.
        </h2>

        <p className="font-normal text-[0.9375rem] text-[#A0A89A] mb-4 text-center">Um dentista que fatura R$40.000,00 por mês pode estar perdendo…</p>
        
        <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[0.875rem] overflow-hidden mb-8">
          <div className="bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.06)] text-[#A0A89A] font-medium text-[0.65rem] tracking-[0.12em] uppercase p-3 px-4 flex justify-between">
            <span>Item</span>
            <span>Valor</span>
          </div>
          <div className="border-b border-[rgba(255,255,255,0.05)] p-3.5 px-4 flex justify-between text-[#A0A89A] text-[0.875rem]">
            <span>Imposto Pago Errado</span>
            <span className="text-[#F8FAF8] font-semibold">R$8.000,00</span>
          </div>
          <div className="border-b border-[rgba(255,255,255,0.05)] p-3.5 px-4 flex justify-between text-[#A0A89A] text-[0.875rem]">
            <span>Taxa de Maquininha Errada</span>
            <span className="text-[#F8FAF8] font-semibold">R$4.000,00</span>
          </div>
          <div className="p-3.5 px-4 flex justify-between text-[#A0A89A] text-[0.875rem]">
            <span>Precificação Errada</span>
            <span className="text-[#F8FAF8] font-semibold">R$3.000 a R$5.000,00</span>
          </div>
          <div className="bg-[rgba(74,222,128,0.08)] border-t border-[rgba(74,222,128,0.2)] p-4 flex justify-between items-center text-[#4ADE80] font-bold">
            <span className="text-sm">TOTAL</span>
            <span>Mais de R$15.000 por mês</span>
          </div>
        </div>

        <div ref={ref} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-[0.875rem] overflow-hidden mb-6">
          <div className="bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.06)] text-[#A0A89A] font-medium text-[0.65rem] tracking-[0.12em] uppercase p-3 px-4 flex justify-between">
            <span>Período</span>
            <span>Perda Acumulada</span>
          </div>
          <div className="border-b border-[rgba(255,255,255,0.05)] p-3.5 px-4 flex justify-between items-center">
            <span className="text-[#A0A89A] text-[0.875rem]">3 meses</span>
            <span className="text-[#F87171] font-bold text-[1.1rem] drop-shadow-[0_0_6px_rgba(248,113,113,0.3)]">{isIntersecting ? format(v1) : "R$ 0"}</span>
          </div>
          <div className="border-b border-[rgba(255,255,255,0.05)] p-3.5 px-4 flex justify-between items-center">
            <span className="text-[#A0A89A] text-[0.875rem]">6 meses</span>
            <span className="text-[#F87171] font-bold text-[1.25rem] drop-shadow-[0_0_6px_rgba(248,113,113,0.3)]">{isIntersecting ? format(v2) : "R$ 0"}</span>
          </div>
          <div className="p-3.5 px-4 flex justify-between items-center">
            <span className="text-[#A0A89A] text-[0.875rem]">1 ano</span>
            <span className="text-[#F87171] font-[800] text-[1.5rem] drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]">{isIntersecting ? format(v3) + "+" : "R$ 0"}</span>
          </div>
        </div>

        <p className="text-center italic text-[#5A6354] text-[0.9375rem] mb-12">Dinheiro que não tem reembolso. Não tem aviso. Não volta.</p>


        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#F8FAF8] mb-8 text-center">
          Isso não é só sobre dinheiro.
        </h2>

        <div className="space-y-4 mb-12">
          {[
            "Trabalhar o dia inteiro… e não ver resultado",
            "Chegar em casa com a cabeça pesada",
            "Não conseguir sair do consultório sem preocupação",
            "Continuar dependente da cadeira por anos"
          ].map((pain, i) => (
            <div key={i} className="flex gap-3 bg-[rgba(255,255,255,0.02)] p-4 rounded-lg border border-[rgba(255,255,255,0.04)]">
              <AlertCircle className="w-5 h-5 text-[#F87171] shrink-0 mt-0.5" />
              <span className="text-[#A0A89A] text-[0.9375rem] leading-[1.6]">{pain}</span>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#F8FAF8] mb-6 text-center">
          Se nada mudar… o mais provável é que você continue:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="glass-card p-4 flex flex-col items-center text-center gap-3">
            <Calendar className="w-8 h-8 text-[#5A6354]" />
            <span className="text-[#F8FAF8] font-medium text-[0.875rem]">com agenda cheia</span>
          </div>
          <div className="glass-card p-4 flex flex-col items-center text-center gap-3">
            <BarChart3 className="w-8 h-8 text-[#5A6354]" />
            <span className="text-[#F8FAF8] font-medium text-[0.875rem]">com bom faturamento</span>
          </div>
          <div className="glass-card p-4 flex flex-col items-center text-center gap-3">
            <User className="w-8 h-8 text-[#5A6354]" />
            <span className="text-[#F8FAF8] font-medium text-[0.875rem]">sem construir liberdade nenhuma</span>
          </div>
        </div>

        <p className="text-center italic text-[#5A6354] text-[0.9375rem] mb-10">Até o momento em que o corpo pedir para parar.</p>

        <CtaButton primary={false} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Quero descobrir quanto estou perdendo por mês
        </CtaButton>

      </div>
    </section>
  );
}

function MetodoSection() {
  const fases = [
    { num: "01", image: img("/images/process_01_decision.webp"), title: "Reset do Protocolo de Decisão", desc: "Você para de tomar decisão errada sem perceber." },
    { num: "02", image: img("/images/process_02_diagnosis.webp"), title: "Diagnóstico", desc: "Você descobre exatamente quanto está perdendo hoje." },
    { num: "03", image: img("/images/process_03_leaks.webp"), title: "Tapa Buracos", desc: "Você corrige os vazamentos e o lucro começa a aparecer." },
    { num: "04", image: img("/images/process_04_sales.webp"), title: "Comercial", desc: "Você passa a fechar mais sem depender de \"jeito pra vender\"." },
    { num: "05", image: img("/images/process_05_acquisition.webp"), title: "Captação de Pacientes a Custo Zero", desc: "Pacientes que já confiam em você voltam a gerar receita." },
    { num: "06", image: img("/images/process_06_scale.webp"), title: "Escala e Independência", desc: "Sua clínica começa a funcionar sem depender de você o tempo todo." },
  ];

  return (
    <section className="section-dark bg-[#080C09] w-full py-[clamp(4rem,8vw,7rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-teal"></div>
      <div className="content-relative max-w-[480px] mx-auto">
        
        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#F8FAF8] mb-10 text-center">Você não precisa DOMINAR gestão… 
        só seguir um passo a passo que já foi testado em mais de 300 clínicas.</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fases.map((f) => (
            <div key={f.num} className="bg-[rgba(255,255,255,0.025)] border border-[rgba(74,222,128,0.12)] hover:border-[rgba(74,222,128,0.25)] transition-colors rounded-[0.875rem] overflow-hidden flex flex-col">
              <img src={f.image} alt={f.title} loading="lazy" className="w-full h-[220px] object-cover rounded-t-[0.875rem]" />
              <div className="p-5 flex flex-col gap-3">
                <div className="w-9 h-9 rounded-full bg-[rgba(74,222,128,0.12)] border border-[rgba(74,222,128,0.3)] text-[#4ADE80] font-bold text-[0.875rem] flex items-center justify-center">
                  {f.num}
                </div>
                <h3 className="font-semibold text-[0.9375rem] text-[#F8FAF8] tracking-[-0.01em]">{f.title}</h3>
                <p className="font-normal text-[0.8125rem] text-[#A0A89A] leading-[1.6]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function ProdutoSection() {
  return (
    <section className="bg-[#FFFFFF] w-full py-[clamp(3.5rem,7vw,6rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="max-w-[480px] mx-auto">
        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#0A0F0B] mb-4 text-center">
          Esse é o Sistema Completo que você vai receber dentro do Protocolo Lucro Oculto!
        </h2>
        <p className="font-normal text-[1.05rem] text-[#4A5244] leading-[1.75] mb-8 text-center">
          Tudo foi pensado para gerar resultado rápido — mesmo que você não entenda nada de números ou gestão.
        </p>

        <div className="bg-[#FFFFFF] border border-[rgba(74,222,128,0.25)] rounded-2xl p-6 shadow-[0_4px_32px_rgba(0,0,0,0.05)]">
           <div className="inline-block px-3 py-1 bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.2)] text-[#4ADE80] font-bold text-xs uppercase tracking-wide rounded-full mb-4">
             O PROTOCOLO LUCRO OCULTO
           </div>
           <p className="text-[#4A5244] text-[0.9375rem] leading-[1.7]">
             Um passo a passo validado em mais de 300 clínicas para dobrar o lucro em até 90 dias.
           </p>
        </div>
      </div>
    </section>
  );
}

function ConsultoresSection() {
  const consultores = [
    { image: img("/images/consultant_01_diagnosis.webp"), title: "CONSULTOR DE DIAGNÓSTICO", desc: "Descobre quanto você está perdendo hoje — em minutos" },
    { image: img("/images/consultant_02_pricing.webp"), title: "CONSULTOR DE PRECIFICAÇÃO", desc: "Coloca o preço lucrativo nos seus procedimentos em minutos" },
    { image: img("/images/consultant_03_negotiation.webp"), title: "CONSULTOR DE NEGOCIAÇÃO", desc: "Calcula se seu parceiro te dá lucro ou prejuízo e gera o script pronto pra renegociar" },
    { image: img("/images/consultant_04_financial.webp"), title: "CONSULTOR FINANCEIRO", desc: "Organiza seus números sem planilha complicada" },
    { image: img("/images/consultant_05_commercial.webp"), title: "CONSULTOR COMERCIAL", desc: "Gera mensagens prontas para fechar pacientes" }
  ];

  return (
    <section className="section-dark bg-[#080C09] w-full py-[clamp(4rem,8vw,7rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-green"></div>
      <div className="content-relative max-w-[480px] mx-auto">
        
        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#F8FAF8] mb-2 uppercase text-center">
          OS CONSULTORES
        </h2>
        <h3 className="font-normal text-[1.05rem] text-[#A0A89A] leading-[1.6] mb-4 text-center">
          Você não precisa pensar. Os consultores fazem isso por você.
        </h3>
        <p className="font-normal text-[0.9375rem] text-[#A0A89A] leading-[1.7] mb-10 text-center">
          Dentro do protocolo, você tem acesso a um time de consultores treinados para clínica odontológica:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {consultores.map((c, i) => (
            <div key={i} className="glass-card p-5 hover:border-[rgba(74,222,128,0.2)] flex flex-col gap-4 text-center">
               <img src={c.image} alt={c.title} loading="lazy" className="w-20 h-20 rounded-full object-cover mx-auto shadow-[0_0_12px_rgba(0,255,100,0.3)] border border-[rgba(74,222,128,0.3)]" />
               <div>
                  <h4 className="font-bold text-[0.75rem] tracking-[0.06em] uppercase text-[#F8FAF8] mb-2">{c.title}</h4>
                  <p className="font-normal text-[0.8125rem] text-[#A0A89A] leading-[1.55]">{c.desc}</p>
               </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function BonusSection() {
  const bonus = [
    { num: "BÔNUS 1", image: img("/images/bonus_01_execution.webp"), title: "EXECUÇÃO GARANTIDA", desc: "Você não precisa executar nada sozinho. Se você não tem tempo, não gosta de tecnologia ou simplesmente não quer fazer… você pode entregar tudo para alguém da sua equipe executar por você. Eu gravei aulas simples que qualquer pessoa consegue seguir e aplicar." },
    { num: "BÔNUS 2", image: img("/images/bonus_02_convenios.webp"), title: "COMO SAIR DOS CONVÊNIOS SEM QUEBRAR", desc: "Como parar de depender de convênios… sem ver sua agenda esvaziar. Um plano seguro para transição: sair dos convênios aos poucos / manter faturamento / aumentar margem." },
    { num: "BÔNUS 3", image: img("/images/bonus_03_48h.webp"), title: "LUCRO EM 48 HORAS", desc: "Coloque dinheiro no caixa em até 48 horas. Scripts prontos para reativar pacientes que já passaram pela sua clínica. É copiar, colar… e mandar." },
    { num: "BÔNUS 4", image: img("/images/bonus_04_community.webp"), title: "COMUNIDADE + ACESSO AOS CONSULTORES", desc: "Acesso à comunidade + atualizações dos consultores. Você não vai fazer isso sozinho. Você entra em um grupo com dentistas que estão aplicando o protocolo. Acesso contínuo às atualizações dos consultores de IA." },
    { num: "BÔNUS 5", image: img("/images/bonus_05_intensive.webp"), title: "INTENSIVÃO Lucro no Bolso", desc: "Imersão prática para destravar seu lucro na primeira semana. Um encontro onde você aplica os pilares do protocolo: tapar buracos / organizar comercial / ativar pacientes." }
  ];

  return (
    <section className="bg-[#FFFFFF] w-full py-[clamp(3.5rem,7vw,6rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="max-w-[480px] mx-auto">
        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#0A0F0B] mb-10 text-center">
          E para garantir que você tenha resultado ainda mais rápido… você também recebe isso:
        </h2>

        <div className="flex flex-col gap-4">
           {bonus.map((b, i) => (
             <div key={i} className="bg-[#080C09] border border-[rgba(0,0,0,0.08)] rounded-2xl overflow-hidden shadow-md text-left">
                <img src={b.image} alt={b.title} loading="lazy" className="w-full h-[200px] object-cover rounded-t-2xl" />
                <div className="p-6">
                  <span className="inline-block bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.2)] text-[#4ADE80] font-semibold text-[0.65rem] tracking-[0.1em] uppercase px-2.5 py-1 rounded-full mb-3">
                    {b.num}
                  </span>
                  <h3 className="font-bold text-[0.9375rem] text-[#F8FAF8] tracking-[-0.01em] mb-2">{b.title}</h3>
                  <p className="font-normal text-[0.8125rem] text-[#A0A89A] leading-[1.65]">{b.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

function StackValorSection() {
  const stack = [
    { item: "Protocolo Lucro Oculto", val: "R$1.997" },
    { item: "Consultores Especializados (IA)", val: "R$2.000" },
    { item: "Calculadora Lucro Oculto", val: "R$497" },
    { item: "Scripts Comerciais + Follow-up", val: "R$697" },
    { item: "Sistema de Reativação de Pacientes", val: "R$1.000" },
    { item: "Comunidade + Atualizações", val: "R$997" },
    { item: "EXECUÇÃO GARANTIDA", val: "R$2.000" },
    { item: "COMO SAIR DOS CONVÊNIOS SEM QUEBRAR", val: "R$700" },
    { item: "LUCRO EM 48 HORAS", val: "R$697" },
    { item: "INTENSIVÃO Lucro no Bolso", val: "Não está à venda" }
  ];

  return (
    <section className="section-dark bg-[#080C09] w-full py-[clamp(4rem,8vw,7rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-gold"></div>
      <div className="content-relative max-w-[480px] mx-auto">
        
        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#F8FAF8] mb-4 text-center">
          Se você fosse contratar tudo isso separadamente… quanto isso custaria?
        </h2>
        <p className="font-normal text-[1.05rem] text-[#A0A89A] leading-[1.75] mb-10 text-center">
          Vamos somar o valor real de tudo que você recebe hoje:
        </p>

        <div className="glass-card overflow-hidden mb-12 p-0">
          <div className="mobile-table">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[rgba(255,255,255,0.05)] border-b border-[rgba(255,255,255,0.06)]">
                  <th className="font-medium text-[0.65rem] tracking-[0.12em] uppercase text-[#A0A89A] p-3 px-4">Item</th>
                  <th className="font-medium text-[0.65rem] tracking-[0.12em] uppercase text-[#A0A89A] p-3 px-4 text-right">Valor</th>
                </tr>
              </thead>
              <tbody>
                {stack.map((s, i) => (
                  <tr key={i} className="border-b border-[rgba(255,255,255,0.05)]">
                    <td data-label="Item" className="p-3.5 px-4 font-normal text-[0.875rem] text-[#F8FAF8]">{s.item}</td>
                    <td data-label="Valor" className="p-3.5 px-4 font-normal text-[0.875rem] text-[#A0A89A] line-through sm:text-right">{s.val}</td>
                  </tr>
                ))}
                <tr className="bg-[rgba(212,168,67,0.08)] border-t border-[rgba(212,168,67,0.25)]">
                  <td data-label="Total" className="p-4 font-bold text-[0.875rem] text-[#D4A843]">TOTAL</td>
                  <td data-label="Valor Total" className="p-4 font-bold text-[0.875rem] text-[#D4A843] line-through sm:text-right">R$10.585,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center mb-10">
          <p className="font-light italic text-[1.05rem] text-[#5A6354] mb-2">Mas você não vai pagar isso.</p>
          <div className="w-16 h-px bg-[rgba(74,222,128,0.3)] mx-auto my-3"></div>
          <p className="font-light italic text-[1.05rem] text-[#5A6354] mb-8">Nem perto disso.</p>
          
          <div className="mb-6">
            <span className="font-[800] text-[clamp(2.75rem,11vw,4rem)] leading-none tracking-[-0.035em] text-[#4ADE80] drop-shadow-[0_0_16px_rgba(74,222,128,0.45)]">
              R$597,00
            </span>
            <div className="font-normal text-[0.9375rem] text-[#5A6354] mt-2">em até 12 vezes</div>
          </div>
          
          <p className="font-normal text-[0.9375rem] text-[#A0A89A] leading-[1.6]">
            mas por você estar nessa página você tem direito a um cupom de desconto exclusivo com um valor especial. É só aproveitar clicando no botão abaixo!
          </p>
        </div>

        <CtaButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          QUERO APROVEITAR O CUPOM DESCONTO ADICIONAL!
        </CtaButton>

      </div>
    </section>
  );
}

function GarantiaSection() {
  return (
    <section className="section-dark bg-[#080C09] w-full py-[clamp(4rem,8vw,7rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-green"></div>
      <div className="content-relative max-w-[480px] mx-auto text-center flex flex-col items-center">
        
        <img src={img("/guarantee-seal.svg")} alt="Selo de Garantia 7 Dias" loading="lazy" className="w-[160px] h-[160px] mb-10" />

        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#F8FAF8] mb-8">
          Teste o Protocolo na sua clínica… sem risco nenhum
        </h2>

        <p className="font-normal text-[1.05rem] text-[#A0A89A] leading-[1.8]">
          Você vai entrar, aplicar o protocolo…<br/>
          e ver exatamente onde está perdendo dinheiro.<br/>
          Se em até 7 dias você olhar para os seus números e pensar:<br/>
          "isso não é pra mim" ou "não fez diferença"<br/>
          eu devolvo 100% do seu dinheiro.<br/>
          Sem pergunta. Sem burocracia.
        </p>

      </div>
    </section>
  );
}

function UrgenciaFinalSection() {
  return (
    <section className="section-dark bg-[#080C09] w-full py-[clamp(4rem,8vw,7rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-teal"></div>
      <div className="content-relative max-w-[480px] mx-auto text-center">
        
        <h2 className="font-bold text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.12] tracking-[-0.025em] text-[#F8FAF8] mb-6">
          Cada mês que você adia isso… é dinheiro que não volta mais.
        </h2>

        <p className="font-normal text-[1.05rem] text-[#A0A89A] leading-[1.7] mb-10">
          Não é sobre comprar agora. É sobre pegar de volta o Lucro que já tá no seu consultório te esperando.
        </p>

        <CtaButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          GARANTIR MINHA VAGA AGORA!
        </CtaButton>

      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    { q: "Já fiz curso de gestão antes e não mudou nada. Por que esse seria diferente?", a: "Porque aqui você não aprende gestão. Você descobre o número que decide o seu lucro. Nenhum curso te mostrou quanto custa cada procedimento, quanto você perde com parceiro ou se está pagando imposto errado. Aqui você vê isso na prática, com os seus números." },
    { q: "Não sou bom com números. Vou conseguir aplicar?", a: "Sim. Você não precisa saber calcular nada. Os consultores fazem isso por você. Você responde e o número aparece." },
    { q: "Já trabalho demais. Não tenho tempo pra isso.", a: "Você não precisa de tempo. Precisa de direção. Tem coisas aqui que você resolve em minutos: Ajuste de maquininha / Conversa com contador / Revisão de parceiro. E se quiser, pode delegar para sua equipe." },
    { q: "Tenho medo de aumentar o preço e perder pacientes.", a: "Você não vai aumentar preço no escuro. Primeiro você descobre se já está cobrando errado. Quando entende o número, você para de dar desconto por medo e começa a negociar com segurança." },
    { q: "Minha cidade é pequena. Isso funciona pra mim?", a: "O problema não é a cidade. Imposto errado, preço errado e estrutura ruim acontecem em qualquer lugar. Vários resultados vieram de cidades pequenas, sem trazer paciente novo." },
    { q: "E se eu comprar e não funcionar pra mim?", a: "Você tem 7 dias para testar. Se não enxergar clareza nos seus números, você recebe 100% do seu dinheiro de volta. Sem burocracia." },
    { q: "Isso funciona mesmo sem trazer novos pacientes?", a: "Sim. A base do protocolo é parar de perder dinheiro com o que você já faz hoje. Mais paciente com a conta errada só aumenta o prejuízo." },
    { q: "Preciso aplicar tudo para ter resultado?", a: "Não. Muitos já veem resultado ajustando três coisas: Precificação / Imposto / Parceiros. O restante acelera." }
  ];

  return (
    <section className="bg-[#FFFFFF] w-full py-[clamp(3.5rem,7vw,6rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="max-w-[480px] mx-auto">
        <p className="font-normal text-[1.05rem] text-[#4A5244] leading-[1.7] mb-8 text-center">
          Se você ainda está com alguma dúvida, aqui estão as respostas mais diretas:
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-[rgba(0,0,0,0.08)] rounded-lg px-4 bg-[#FAFAFA]">
              <AccordionTrigger className="text-left font-semibold text-[0.9375rem] text-[#0A0F0B] hover:no-underline py-4 data-[state=open]:text-[#4ADE80] transition-colors">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="font-normal text-[0.9375rem] text-[#4A5244] leading-[1.65] pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function DecisaoFinalSection() {
  return (
    <section className="section-dark bg-[#080C09] w-full py-[clamp(4rem,8vw,7rem)] px-[clamp(1rem,5vw,1.5rem)]">
      <div className="blob-container blob-green"></div>
      <div className="content-relative max-w-[480px] mx-auto">
        
        <p className="font-normal text-[1.05rem] text-[#5A6354] leading-[1.7] mb-6 text-center">
          A decisão agora é simples.
        </p>

        {/* Desktop Table (hidden on small, but since max-width 480px it's almost always mobile layout in practice. Let's just build the stacked cards for mobile first since it's required.) */}
        <div className="flex flex-col gap-6 mb-10">
          
          <div className="glass-card overflow-hidden p-0 border border-[rgba(255,255,255,0.08)]">
            <div className="bg-[rgba(255,255,255,0.04)] text-[#A0A89A] font-semibold text-[0.9375rem] p-4 flex items-center gap-2 border-b border-[rgba(255,255,255,0.05)]">
              <X className="w-5 h-5 text-[#F87171]" /> Fechar essa página
            </div>
            <ul className="p-0 m-0 list-none">
              <li className="p-4 border-b border-[rgba(255,255,255,0.05)] text-[#5A6354] text-[0.875rem] leading-[1.6]">Continuar com a agenda cheia sem entender para onde o dinheiro está indo</li>
              <li className="p-4 border-b border-[rgba(255,255,255,0.05)] text-[#5A6354] text-[0.875rem] leading-[1.6]">Seguir trabalhando o mês inteiro… e torcer para sobrar algo no final</li>
              <li className="p-4 border-b border-[rgba(255,255,255,0.05)] text-[#5A6354] text-[0.875rem] leading-[1.6]">Acreditar que o problema é falta de paciente e continuar tentando resolver do jeito errado</li>
              <li className="p-4 text-[#5A6354] text-[0.875rem] leading-[1.6]">E daqui a alguns meses… perceber que nada mudou</li>
            </ul>
          </div>

          <div className="bg-[rgba(74,222,128,0.04)] border border-[rgba(74,222,128,0.2)] rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(74,222,128,0.08)]">
            <div className="bg-[rgba(74,222,128,0.1)] text-[#4ADE80] font-bold text-[0.9375rem] p-4 flex items-center gap-2 border-b border-[rgba(74,222,128,0.15)]">
              <Check className="w-5 h-5 text-[#4ADE80]" /> Entrar agora
            </div>
            <ul className="p-0 m-0 list-none">
              <li className="p-4 border-b border-[rgba(74,222,128,0.1)] text-[#F8FAF8] text-[0.875rem] leading-[1.6] flex gap-2"><Check className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5 opacity-50"/> Ver, pela primeira vez, quanto cada procedimento realmente te dá</li>
              <li className="p-4 border-b border-[rgba(74,222,128,0.1)] text-[#F8FAF8] text-[0.875rem] leading-[1.6] flex gap-2"><Check className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5 opacity-50"/> Corrigir os vazamentos que estão drenando seu dinheiro</li>
              <li className="p-4 border-b border-[rgba(74,222,128,0.1)] text-[#F8FAF8] text-[0.875rem] leading-[1.6] flex gap-2"><Check className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5 opacity-50"/> Parar de trabalhar no escuro e começar a ter controle do resultado da sua clínica</li>
              <li className="p-4 text-[#F8FAF8] text-[0.875rem] leading-[1.6] flex gap-2"><Check className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5 opacity-50"/> E transformar o que você já faz hoje… em lucro real no final do mês</li>
            </ul>
          </div>

        </div>

        <p className="font-normal text-[0.9375rem] text-[#A0A89A] leading-[1.6] mb-8 text-center px-4">
          Você não precisa de mais pacientes. Precisa enxergar o número que decide o seu lucro.
        </p>

        <CtaButton onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          QUERO DOBRAR O LUCRO DA MINHA CLÍNICA EM 90 DIAS!
        </CtaButton>

      </div>
    </section>
  );
}

// --- Main Page ---

function LandingPage() {
  return (
    <div className="bg-[#080C09] min-h-screen text-[#F8FAF8] font-sans selection:bg-[#4ADE80] selection:text-[#080C09] overflow-x-hidden">
      <HeroSection />
      <PosVslSection />
      <OQueVaiAcontecerSection />
      <SocialProofSection />
      <UrgenciaSection />
      <MetodoSection />
      <ProdutoSection />
      <ConsultoresSection />
      <BonusSection />
      <StackValorSection />
      <GarantiaSection />
      <UrgenciaFinalSection />
      <FaqSection />
      <DecisaoFinalSection />
      
      <StickyFooter />
    </div>
  );
}


// --- App Setup ---

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

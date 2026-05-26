import { motion } from "motion/react";
import { SectionLabel } from "./ui/SectionLabel";
import { Calculator, PlayCircle, ShieldCheck } from "lucide-react";

export function Features() {
  const cards = [
    {
      num: "01",
      icon: Calculator,
      title: "Calculadora OdontoLucro",
      desc: "Coloque seus custos reais, ela calcula o preço certo por procedimento. Plug and play.",
    },
    {
      num: "02",
      icon: PlayCircle,
      title: "Consultor de Precificação com I.A.",
      desc: "Análise inteligente dos seus custos e sugestões de otimização de margem de lucro diretamente na plataforma.",
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Calculadora com histórico de procedimentos",
      desc: "Salve, compare e acompanhe a evolução dos preços e margens de todos os seus procedimentos ao longo do tempo.",
    },
  ];

  return (
    <section className="bg-ice-blue py-16 md:py-[100px] px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <SectionLabel>O QUE ESTÁ INCLUSO</SectionLabel>
          <h2 className="text-[clamp(36px,4.5vw,64px)] leading-[1.1] tracking-[-0.01em]">
            <span className="display-light text-rich-black/40">Tudo que vem na </span>
            <span className="display-bold">Calculadora OdontoLucro</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-[350ms]"
              >
                <div className="absolute -top-4 -right-4 font-body font-light text-[120px] leading-[0.85] text-rich-black/[0.06] select-none pointer-events-none">
                  {card.num}
                </div>

                <div className="bg-card-grey w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative">
                  <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                </div>

                <h3 className="font-body font-bold text-[clamp(20px,2vw,28px)] text-rich-black leading-[1.3] mb-3 relative">
                  {card.title}
                </h3>

                <p className="text-gray-500 font-body text-base leading-[1.6] relative">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

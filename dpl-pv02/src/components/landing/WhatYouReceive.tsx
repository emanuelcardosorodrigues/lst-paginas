import { motion } from "framer-motion";
import { img } from "@/lib/imgPath";

const items = [
  {
    title: "Calculadora do Dentista Parceiro Lucrativo",
    desc: "Precifique a Parceria do jeito certo e lucre mais ainda hoje.",
    image: "stack-calculadora.webp",
    badge: null,
    imageRight: true,
  },
  {
    title: "Vídeo Passo a Passo (7min)",
    desc: "Como usar na prática mesmo se você não entende nada de tecnologia. Passo a passo filmado na tela. Aperte play e vá junto. ZERO curva de aprendizado.",
    image: "stack-video.webp",
    badge: null,
    imageRight: false,
  },
  {
    title: "Masterclass sobre os custos ocultos e como lucrar com eles (estudo de caso)",
    desc: "Entenda porquê você trabalha tanto e sobra pouco ou quase nada.",
    image: "stack-masterclass.webp",
    badge: "Bônus!",
    imageRight: true,
  },
  {
    title: "Consultor de Precificação com IA",
    desc: "Descreva o procedimento. A IA calcula o preço estratégico considerando o parceiro e sua margem.",
    image: "stack-consultor.webp",
    badge: "Bônus!",
    imageRight: false,
  },
  {
    title: "Como Dobrar Seu Lucro em 6 Meses",
    desc: "As 3 principais alavancas que fazem clínicas dobrarem o lucro delas em 6 meses (ou menos).",
    image: "stack-dobrar.webp",
    badge: null,
    imageRight: true,
  },
  {
    title: "Os 5 Perigos da Nova Reforma Tributária",
    desc: "O que muda e o que você precisa ficar atento.",
    image: "stack-reforma.webp",
    badge: null,
    imageRight: false,
  },
];

export const WhatYouReceive = () => {
  return (
    <section className="bg-white py-[clamp(100px,12vw,160px)] px-6">
      <div className="container mx-auto max-w-[1000px]">
        <div className="text-center mb-16">
          <h2 className="text-[#0F172A] text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight">
            O que você vai receber:
          </h2>
        </div>

        <div className="space-y-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] overflow-hidden flex flex-col md:flex-row min-h-[220px]"
            >
              {/* Text side */}
              <div
                className={`p-8 md:p-10 md:w-1/2 flex flex-col justify-center ${item.imageRight ? "md:order-1" : "md:order-2"}`}
              >
                {item.badge && (
                  <div className="inline-block bg-[#00A88E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-fit shadow-sm">
                    {item.badge}
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#0F172A] mb-3 leading-snug">{item.title}</h3>
                <p className="text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>

              {/* Image side */}
              <div
                className={`md:w-1/2 overflow-hidden flex items-center justify-center bg-[#EEF2F7] min-h-[200px] ${item.imageRight ? "md:order-2" : "md:order-1"}`}
              >
                <img
                  src={img(item.image)}
                  alt={item.title}
                  className="w-full h-auto object-contain max-h-[280px] p-4"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

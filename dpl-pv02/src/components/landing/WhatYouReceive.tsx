import { motion } from "framer-motion";
import { img } from "@/lib/imgPath";

export const WhatYouReceive = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="bg-white py-[clamp(100px,12vw,160px)] px-6">
      <div className="container mx-auto max-w-[1000px]">
        <div className="text-center mb-16">
          <h2 className="text-[#0F172A] text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight">
            O que você vai receber:
          </h2>
        </div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Item 1 — Calculadora */}
          <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Calculadora do Dentista Parceiro Lucrativo</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">Precifique a Parceria do jeito certo e lucre mais ainda hoje.</p>
            </div>
            <div className="md:w-1/2 bg-[#00A88E]/5 flex items-center justify-center border-t md:border-t-0 md:border-l border-black/[0.05] overflow-hidden">
              <img
                src={img("stack-calculadora.webp")}
                alt="Calculadora do Dentista Parceiro Lucrativo"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Item 2 — Vídeo */}
          <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 border-t md:border-t-0 md:border-r border-black/[0.05] overflow-hidden order-1 md:order-1">
              <img
                src={img("stack-video.webp")}
                alt="Vídeo Passo a Passo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center order-2 md:order-2">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Vídeo Passo a Passo (7min)</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">Como usar na prática mesmo se você não entende nada de tecnologia. Passo a passo filmado na tela. Aperte play e vá junto. ZERO curva de aprendizado.</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Item 3 — Masterclass */}
            <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] flex flex-col overflow-hidden">
              <div className="overflow-hidden">
                <img
                  src={img("stack-masterclass.webp")}
                  alt="Masterclass Custos Ocultos"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="inline-block bg-[#00A88E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-fit shadow-sm">Bônus!</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Masterclass sobre os custos ocultos e como lucrar com eles (estudo de caso)</h3>
                <p className="text-[#64748B] leading-relaxed flex-grow">Entenda porquê você trabalha tanto e sobra pouco ou quase nada.</p>
              </div>
            </motion.div>

            {/* Item 4 — Consultor IA */}
            <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] flex flex-col overflow-hidden">
              <div className="overflow-hidden">
                <img
                  src={img("stack-consultor.webp")}
                  alt="Consultor de Precificação com IA"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="inline-block bg-[#00A88E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-fit shadow-sm">Bônus!</div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Consultor de Precificação com IA</h3>
                <p className="text-[#64748B] leading-relaxed flex-grow">Descreva o procedimento. A IA calcula o preço estratégico considerando o parceiro e sua margem.</p>
              </div>
            </motion.div>

            {/* Item 5 — Dobrar Lucro */}
            <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] flex flex-col overflow-hidden">
              <div className="overflow-hidden">
                <img
                  src={img("stack-dobrar.webp")}
                  alt="Como Dobrar Seu Lucro em 6 Meses"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Como Dobrar Seu Lucro em 6 Meses</h3>
                <p className="text-[#64748B] leading-relaxed flex-grow">As 3 principais alavancas que fazem clínicas dobrarem o lucro delas em 6 meses (ou menos).</p>
              </div>
            </motion.div>

            {/* Item 6 — Reforma Tributária */}
            <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] flex flex-col overflow-hidden">
              <div className="overflow-hidden">
                <img
                  src={img("stack-reforma.webp")}
                  alt="Os 5 Perigos da Nova Reforma Tributária"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#0F172A] mb-3">Os 5 Perigos da Nova Reforma Tributária</h3>
                <p className="text-[#64748B] leading-relaxed flex-grow">O que muda e o que você precisa ficar atento.</p>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

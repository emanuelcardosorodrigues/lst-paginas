import { motion } from "framer-motion";
import { Calculator, Play, MessageSquare, LineChart, AlertTriangle } from "lucide-react";

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
          {/* Item 1 */}
          <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Calculadora do Dentista Parceiro Lucrativo</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">Precifique a Parceria do jeito certo e lucre mais ainda hoje.</p>
            </div>
            <div className="md:w-1/2 bg-[#00A88E]/5 p-8 flex items-center justify-center border-t md:border-t-0 md:border-l border-black/[0.05]">
              <div className="w-full max-w-[280px] bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center gap-3 mb-4 text-[#00A88E]">
                  <Calculator size={24} />
                  <span className="font-bold">DPL Calc</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                  <div className="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Repasse Sugerido</div>
                  <div className="text-2xl font-mono font-bold text-[#0F172A]">R$ 450,00</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Item 2 */}
          <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center order-2 md:order-1 border-t md:border-t-0 md:border-r border-black/[0.05]">
              <div className="w-full max-w-[280px] mx-auto bg-slate-800 rounded-2xl shadow-sm aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm z-10 cursor-pointer hover:bg-white/30 transition-colors">
                  <Play className="text-white fill-white ml-1" size={20} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-3 left-4 text-xs text-white/80 font-medium">07:24</div>
              </div>
            </div>
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center order-1 md:order-2">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Vídeo Passo a Passo (7min)</h3>
              <p className="text-[#64748B] text-lg leading-relaxed">Como usar na prática mesmo se você não entende nada de tecnologia. Passo a passo filmado na tela. Aperte play e vá junto. ZERO curva de aprendizado.</p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Item 3 */}
            <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] p-8 flex flex-col">
              <div className="inline-block bg-[#00A88E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-fit shadow-sm">Bônus!</div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">Masterclass sobre os custos ocultos e como lucrar com eles (estudo de caso)</h3>
              <p className="text-[#64748B] leading-relaxed mb-6 flex-grow">Entenda porquê você trabalha tanto e sobra pouco ou quase nada.</p>
              <div className="h-32 bg-white rounded-xl border border-slate-100 flex items-center justify-center p-4">
                <div className="w-full space-y-3">
                  <div className="flex justify-between items-center"><span className="text-xs text-slate-400">Custo invisível A</span><span className="text-sm font-mono text-[#EF4444]">-R$ 1.2k</span></div>
                  <div className="flex justify-between items-center"><span className="text-xs text-slate-400">Custo invisível B</span><span className="text-sm font-mono text-[#EF4444]">-R$ 800</span></div>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <div className="flex justify-between items-center"><span className="text-xs font-bold text-[#0F172A]">Total Oculto</span><span className="text-sm font-mono font-bold text-[#EF4444]">-R$ 2k</span></div>
                </div>
              </div>
            </motion.div>

            {/* Item 4 */}
            <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] p-8 flex flex-col">
              <div className="inline-block bg-[#00A88E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 w-fit shadow-sm">Bônus!</div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">Consultor de Precificação com IA</h3>
              <p className="text-[#64748B] leading-relaxed mb-6 flex-grow">Descreva o procedimento. A IA calcula o preço estratégico considerando o parceiro e sua margem.</p>
              <div className="h-32 bg-white rounded-xl border border-slate-100 p-4 flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded bg-slate-100 shrink-0"></div>
                  <div className="bg-slate-50 text-xs text-slate-600 p-2 rounded-r-lg rounded-bl-lg">Implante cone morse...</div>
                </div>
                <div className="flex items-start gap-2 flex-row-reverse">
                  <div className="w-6 h-6 rounded bg-[#00A88E]/10 shrink-0 flex items-center justify-center"><MessageSquare size={12} className="text-[#00A88E]" /></div>
                  <div className="bg-[#00A88E]/5 border border-[#00A88E]/10 text-xs text-slate-700 p-2 rounded-l-lg rounded-br-lg">
                    Preço sugerido: <span className="font-mono font-bold text-[#00A88E]">R$ 1.850</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Item 5 */}
            <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] p-8 flex flex-col">
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">Como Dobrar Seu Lucro em 6 Meses</h3>
              <p className="text-[#64748B] leading-relaxed mb-6 flex-grow">As 3 principais alavancas que fazem clínicas dobrarem o lucro delas em 6 meses (ou menos).</p>
              <div className="h-32 bg-white rounded-xl border border-slate-100 p-4 flex items-end justify-center gap-4">
                <div className="w-8 bg-slate-200 rounded-t h-8"></div>
                <div className="w-8 bg-slate-300 rounded-t h-12"></div>
                <div className="w-8 bg-[#00A88E]/50 rounded-t h-16"></div>
                <div className="w-8 bg-[#00A88E] rounded-t h-24 relative">
                  <LineChart size={16} className="text-white absolute -top-6 left-1/2 -translate-x-1/2" />
                </div>
              </div>
            </motion.div>

            {/* Item 6 */}
            <motion.div variants={itemVariants} className="bg-[#F8F9FA] rounded-3xl border border-black/[0.05] p-8 flex flex-col">
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">Os 5 Perigos da Nova Reforma Tributária</h3>
              <p className="text-[#64748B] leading-relaxed mb-6 flex-grow">O que muda e o que você precisa ficar atento.</p>
              <div className="h-32 bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#EF4444]/10 flex items-center justify-center text-[#EF4444]">
                    <AlertTriangle size={24} />
                  </div>
                  <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">Atenção aos impostos</div>
                </div>
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

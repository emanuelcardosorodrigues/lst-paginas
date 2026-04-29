import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { img } from "@/lib/imgPath";

export const RealityCheck = () => {
  return (
    <section className="bg-[#050B18] pb-[clamp(100px,12vw,160px)] px-6 overflow-hidden relative">
      <div className="container mx-auto max-w-[1000px]">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-white/[0.04] rounded-3xl border border-white/10 p-1 backdrop-blur-sm shadow-[0_0_50px_rgba(0,168,142,0.15)]"
        >
          <div className="grid md:grid-cols-2 bg-[#0A1428] rounded-[20px] overflow-hidden">
            
            {/* Left Side */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/5 opacity-60 transition-opacity hover:opacity-100 flex flex-col justify-center">
              <div className="text-[#EF4444]/80 text-sm font-bold tracking-widest uppercase mb-6">
                VOCÊ ACHA QUE:
              </div>
              <div className="mb-8">
                <div className="text-2xl font-medium text-[#64748B] mb-2">Implante com parceiro →</div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">R$ 1.100</div>
                <div className="text-xl text-[#64748B] font-medium">= Parceria lucrativa</div>
              </div>
              <div className="flex items-center gap-3 text-[#10B981] bg-[#10B981]/10 p-4 rounded-xl inline-flex w-fit border border-[#10B981]/20">
                <Check size={20} />
                <span className="font-bold uppercase tracking-wider text-sm">Bom negócio?</span>
              </div>
            </div>

            {/* Right Side */}
            <div className="p-8 md:p-12 relative bg-[radial-gradient(ellipse_at_top_right,rgba(0,168,142,0.15),transparent_50%)]">
              <div className="text-[#00A88E] text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00A88E] animate-pulse"></span>
                A REALIDADE:
              </div>
              
              <div className="space-y-4 mb-8 text-[#F8F9FA]/90">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm font-medium">Implante (valor cobrado)</span>
                  <span className="font-mono text-white font-bold">R$ 1.100</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm text-slate-400">Material</span>
                  <span className="font-mono text-[#EF4444]">−R$ 240</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm text-slate-400">Imposto</span>
                  <span className="font-mono text-[#EF4444]">−R$ 121</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm text-slate-400">Hora clínica</span>
                  <span className="font-mono text-[#EF4444]">−R$ 352</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                  <span className="text-sm text-slate-400">Repasse ao dentista parceiro</span>
                  <span className="font-mono text-[#EF4444]">−R$ 400</span>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full mb-8"></div>

              <div className="text-center">
                <div className="text-sm font-bold tracking-widest text-[#EF4444] mb-2 uppercase">LUCRO REAL</div>
                <div className="text-[clamp(3rem,5vw,4.5rem)] font-[800] text-[#EF4444] tracking-tighter leading-none mb-2 drop-shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  −R$ 13
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-[700px] mx-auto text-center mt-16"
        >
          <p className="text-xl text-white/80 leading-relaxed mb-6">
            Seu dentista parceiro fez a cirurgia… Você bancou a estrutura, captou o paciente, assumiu o risco jurídico… E ainda saiu no vermelho.
          </p>
          <div className="text-2xl font-bold text-white mb-8 bg-white/5 py-4 px-8 rounded-xl inline-block border border-white/10">
            Isso tá certo?
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { src: img("agit-agenda.webp"), label: "Agenda lotada" },
              { src: img("agit-trabalho.webp"), label: "Trabalho pesado" },
              { src: img("agit-lucro.webp"), label: "Lucro? Mixaria" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-auto rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.4)]"
                />
                <span className="text-sm font-semibold text-white/70 tracking-wide">{item.label}</span>
              </div>
            ))}
          </div>

          <p className="text-lg text-[#64748B] leading-relaxed">
            E aí você faz isso 5, 10, 15 vezes no mês... Agenda lotada. Trabalho pesado. Lucro? Mixaria.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

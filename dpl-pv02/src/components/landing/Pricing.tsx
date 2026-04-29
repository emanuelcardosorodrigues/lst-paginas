import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { img } from "@/lib/imgPath";

export const Pricing = () => {
  return (
    <section id="pricing" className="bg-[#050B18] py-[clamp(100px,12vw,160px)] px-6 relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,168,142,0.1)_0%,transparent_50%)] -z-10" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(0,168,142,0.05)_0%,transparent_50%)] -z-10" />

      <div className="container mx-auto max-w-[800px]">
        <div className="text-center mb-16">
          <h2 className="text-white text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight">
            Quanto é tudo isso?
          </h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-sm relative"
        >
          <div className="space-y-4 mb-8">
            {[
              { name: "Calculadora do Dentista Parceiro Lucrativo", price: "R$ 197,00" },
              { name: "Consultor de Precificação com IA", price: "R$ 147,00" },
              { name: "Masterclass sobre os custos ocultos e como lucrar com eles (com estudo de caso)", price: "R$ 197,00" },
              { name: "Aula completa Como Dobrar Seu Lucro em 6 Meses", price: "R$ 197,00" },
              { name: "Os 5 Perigos da Nova Reforma", price: "R$ 197,00" }
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center text-white/80 py-2 border-b border-white/5 last:border-0 text-sm md:text-base">
                <span className="pr-4">{item.name}</span>
                <span className="font-mono whitespace-nowrap text-white/60">{item.price}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full my-8"></div>

          <div className="flex justify-between items-center mb-12">
            <span className="text-xl font-bold text-white">Total</span>
            <span className="text-2xl font-mono font-bold text-[#EF4444] line-through decoration-2 decoration-white/50">R$ 935,00</span>
          </div>

          <div className="text-center mb-10">
            <p className="text-white/70 text-lg mb-2">No total, isso tudo deveria custar R$ 935,00.</p>
            <p className="text-white font-medium text-lg">Mas aqui, nessa página, você garante o valor especial:</p>
          </div>

          {/* Premium Pricing Card */}
          <div className="bg-[#0A1428] rounded-2xl border border-[#00A88E]/50 p-8 shadow-[0_0_50px_rgba(0,168,142,0.15)] text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00A88E] to-transparent"></div>

            <div className="flex justify-center mb-8 -mx-8 -mt-8">
              <img
                src={img("pricing-bundle.webp")}
                alt="Tudo que você recebe"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="text-[#64748B] font-medium mb-2 line-through">De R$ 935,00</div>
            <div className="text-[clamp(2.5rem,5vw,3.5rem)] font-[800] text-white tracking-tighter leading-none mb-3">
              <span className="text-2xl text-[#00A88E] font-bold tracking-normal align-top mr-2">Por: 9x de</span>
              R$ 8,80
            </div>
            <div className="text-[#00A88E] font-medium mb-10">ou à vista com desconto por R$ 67</div>

            <button className="w-full bg-[#00A88E] hover:bg-[#00967F] text-white font-bold px-8 py-5 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_25px_rgba(0,168,142,0.3)] text-lg mb-6 flex items-center justify-center gap-2">
              GARANTIR MEU ACESSO AGORA →
            </button>

            <div className="flex justify-center items-center gap-2 text-white/50 text-sm font-medium">
              <ShieldCheck size={16} className="text-[#00A88E]" />
              Pagamento 100% seguro · Garantia de 7 dias
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

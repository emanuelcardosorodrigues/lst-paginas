import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export const Guarantee = () => {
  return (
    <section className="bg-[#0A1428] py-[clamp(80px,10vw,120px)] px-6 overflow-hidden">
      <div className="container mx-auto max-w-[1000px]">
        <div className="bg-[#050B18] rounded-3xl border border-[#00A88E]/20 p-8 md:p-16 shadow-[0_0_50px_rgba(0,168,142,0.1)] relative overflow-hidden">
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,rgba(0,168,142,0.1)_0%,transparent_70%)] pointer-events-none" />

          <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center relative z-10">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-48 h-48 rounded-full bg-gradient-to-b from-[#00A88E] to-[#00705E] p-1 shadow-[0_0_40px_rgba(0,168,142,0.4)]">
                <div className="w-full h-full rounded-full bg-[#050B18] flex items-center justify-center border-[6px] border-[#00A88E]/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,168,142,0.2)_0%,transparent_100%)]"></div>
                  <div className="text-center relative z-10">
                    <ShieldCheck className="w-10 h-10 text-[#00A88E] mx-auto mb-2 opacity-80" />
                    <div className="text-3xl font-[800] text-white leading-none tracking-tighter">7 DIAS</div>
                    <div className="text-[10px] text-[#00A88E] font-bold uppercase tracking-widest mt-1">Garantia</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-white text-[clamp(1.5rem,3vw,2rem)] font-[800] leading-[1.2] tracking-tight mb-6">
                Aplique o Protocolo Dentista Parceiro Lucrativo. Veja seus números reais. Lucre mais, de imediato. Ou seu investimento de volta!
              </h2>
              
              <div className="space-y-3 mb-8 text-[#F8F9FA]/80 text-lg leading-relaxed">
                <p>Se por QUALQUER motivo você achar que não valeu a pena...</p>
                <p>É só pedir reembolso em até 7 dias.</p>
                <p>Sem perguntas. Sem burocracia.</p>
                <p className="text-white font-medium">100% do seu dinheiro de volta.</p>
              </div>

              <div className="bg-[#00A88E]/10 border border-[#00A88E]/20 text-[#00A88E] font-bold px-6 py-4 rounded-xl inline-block">
                O risco é todo meu. A clareza é toda sua.
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

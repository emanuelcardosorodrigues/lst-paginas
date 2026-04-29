import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export const FinalDecision = () => {
  return (
    <section className="bg-[#050B18] py-[clamp(100px,12vw,160px)] px-6 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,168,142,0.1)_0%,transparent_60%)] -z-10" />
      
      <div className="container mx-auto max-w-[1000px]">
        <div className="text-center mb-16">
          <h2 className="text-white text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight">
            Agora é com você.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-20">
          
          {/* Opção 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <XCircle className="text-[#EF4444] opacity-70" size={28} />
              <h3 className="text-xl font-bold text-white/70">OPÇÃO 1: CONTINUAR COMO ESTÁ</h3>
            </div>
            
            <div className="space-y-3 text-[#64748B] text-lg leading-relaxed">
              <p>Amanhã você acorda.</p>
              <p>Parceiro atende.</p>
              <p>Você paga todo mundo.</p>
              <p>Olha o que sobrou.</p>
              <p>Quase nada.</p>
              <div className="h-6"></div>
              <p>Daqui 6 meses, você está no mesmo lugar.</p>
              <p>Mesma dúvida. Mesmo cansaço.</p>
              <p>Mesma sensação de que o peso da clínica cresce — mas o lucro não.</p>
            </div>
          </motion.div>

          {/* Opção 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0A1428] border border-[#00A88E]/40 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,168,142,0.15)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-[#00A88E] to-transparent"></div>
            
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="text-[#00A88E]" size={28} />
              <h3 className="text-xl font-bold text-white">OPÇÃO 2: DESCOBRIR O PREÇO CERTO HOJE</h3>
            </div>
            
            <div className="space-y-3 text-[#F8F9FA]/90 text-lg leading-relaxed">
              <p>Você investe um valor ridículo.</p>
              <p>Descobre em 10 minutos se seu parceiro está te dando lucro ou prejuízo.</p>
              <p>Aplica a estratégia correta de remuneração.</p>
              <p>Negocia com segurança.</p>
              <p className="text-[#00A88E] font-medium">E finalmente sobra dinheiro de verdade.</p>
              <div className="h-6"></div>
              <p>Daqui 6 meses, você pensa:</p>
              <p className="font-serif italic text-white text-xl">"Por que demorei tanto?"</p>
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-[800px] mx-auto"
        >
          <div className="text-[#64748B] text-sm font-bold tracking-widest uppercase mb-8">
            A ESCOLHA É SUA:
          </div>
          
          <div className="space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 text-white/50 text-xl">
              <XCircle size={24} />
              <span>Caminho 1: Continuar trabalhando de graça.</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-white font-bold text-xl md:text-2xl">
              <CheckCircle2 className="text-[#00A88E]" size={28} />
              <span>Caminho 2: Aplicar a estratégia certa e lucrar.</span>
            </div>
          </div>

          <a
            href="https://pay.hotmart.com/V103826709U?off=vju7un99&checkoutMode=10&offDiscount=ESPECIALDPL&split=11"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-[#00A88E] hover:bg-[#00967F] text-white font-[800] px-12 py-6 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,168,142,0.3)] text-xl md:text-[1.5rem] tracking-tight inline-block text-center"
          >
            GARANTIR MEU ACESSO AGORA →
          </a>
        </motion.div>

      </div>
    </section>
  );
};

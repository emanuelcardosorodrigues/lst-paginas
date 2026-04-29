import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

export const QuestionAndDecision = () => {
  return (
    <section className="bg-[#050B18] py-[clamp(100px,12vw,160px)] px-6 overflow-hidden">
      <div className="container mx-auto max-w-[900px]">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="text-[#EF4444] text-sm font-bold tracking-widest uppercase mb-4">
            VOU TE FAZER UMA PERGUNTA
          </div>
          <h2 className="text-white text-[clamp(2rem,4vw,3.5rem)] font-[800] leading-[1.1] tracking-tight mb-8">
            Quantos procedimentos seu dentista parceiro fez esse mês?
          </h2>
          
          <div className="flex justify-center gap-4 mb-16">
            <span className="bg-white/5 border border-white/10 text-white font-mono text-xl md:text-2xl px-6 py-3 rounded-xl">5?</span>
            <span className="bg-white/5 border border-white/10 text-white font-mono text-xl md:text-2xl px-6 py-3 rounded-xl">10?</span>
            <span className="bg-white/5 border border-white/10 text-white font-mono text-xl md:text-2xl px-6 py-3 rounded-xl">15?</span>
          </div>

          <div className="mb-4">
            <span className="text-[#64748B] text-xl font-medium">Agora outra — e essa dói:</span>
          </div>
          <h3 className="text-[#00A88E] text-[clamp(1.5rem,3vw,2.5rem)] font-[800] leading-[1.2] tracking-tight mb-4">
            Quanto REALMENTE sobrou no seu bolso?
          </h3>
          <p className="text-white/50 italic">Bem menos do que você imaginava, né?</p>
        </motion.div>

        <div className="max-w-[700px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-[#F8F9FA]/80 text-lg leading-relaxed mb-12"
          >
            <p>Você abre o extrato. Vê um faturamento bonito.</p>
            <p>Aí vem a realidade:</p>
            <ul className="space-y-2 pl-4 py-2">
              <li className="flex items-center gap-2"><span className="text-[#00A88E] font-bold">—</span> repasse do parceiro</li>
              <li className="flex items-center gap-2"><span className="text-[#00A88E] font-bold">—</span> imposto</li>
              <li className="flex items-center gap-2"><span className="text-[#00A88E] font-bold">—</span> folha de pagamento</li>
              <li className="flex items-center gap-2"><span className="text-[#00A88E] font-bold">—</span> aluguel</li>
              <li className="flex items-center gap-2"><span className="text-[#00A88E] font-bold">—</span> material</li>
            </ul>
            <p>E no final… sobra mixaria.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border-l-4 border-[#EF4444] p-6 md:p-8 rounded-r-2xl mb-12"
          >
            <p className="text-white font-bold mb-2">A verdade é simples e dura:</p>
            <p className="text-white/90 text-xl md:text-2xl font-medium leading-snug">
              Você trouxe o parceiro pra crescer. Mas só está crescendo a conta dele.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 text-white/80 text-lg mb-16 text-center"
          >
            <p>E sabe por quê?</p>
            <p className="text-white font-bold text-xl">Porque a estratégia de remuneração está errada.</p>
            <p>Só isso. Não é falta de paciente. Não é marketing. Não é a economia.</p>
            <p className="text-[#00A88E] font-bold text-xl">É a estratégia.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-b from-[#0A1428] to-[#050B18] border border-[#00A88E]/30 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,168,142,0.1)] text-center mb-24"
          >
            <div className="inline-block bg-[#00A88E]/20 text-[#00A88E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6">
              BUNDLE DE PRODUTOS
            </div>
            <p className="text-white text-xl mb-6 leading-relaxed">
              É exatamente por isso que o Protocolo do Dentista Parceiro Lucrativo existe. Pra resolver isso em minutos.
            </p>
            <div className="text-[clamp(3rem,6vw,5rem)] font-[800] text-white tracking-tighter leading-none mb-6 font-mono drop-shadow-md">
              10 minutos.
            </div>
            <p className="text-[#64748B] text-lg leading-relaxed max-w-[500px] mx-auto mb-4">
              Você coloca seus custos e o repasse atual. O protocolo mostra se você está no lucro ou no prejuízo. E qual o modelo correto pra corrigir agora.
            </p>
            <p className="text-white font-bold text-xl">Pronto.</p>
          </motion.div>

          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white mb-8">Agora a decisão é sua:</h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <XCircle className="text-[#EF4444] shrink-0 mt-0.5" />
                    <span className="text-white/70 font-medium">Continuar bancando parceiro sem saber se lucra</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <XCircle className="text-[#EF4444] shrink-0 mt-0.5" />
                    <span className="text-white/70 font-medium">Continuar no modelo de remuneração errado</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#00A88E]/10 rounded-2xl p-6 border border-[#00A88E]/30">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#00A88E] shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Investir um valor ridiculamente baixo</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#00A88E] shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Corrigir e voltar a lucrar hoje ainda!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button className="w-full md:w-auto bg-[#00A88E] hover:bg-[#00967F] text-white font-[800] px-10 py-6 rounded-full transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,168,142,0.3)] text-xl md:text-2xl tracking-tight">
              GARANTIR MEU ACESSO AGORA →
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

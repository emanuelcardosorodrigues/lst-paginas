import { motion } from "framer-motion";

export const Authority = () => {
  return (
    <section className="bg-white py-[clamp(100px,12vw,160px)] px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-[#F8F9FA] p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/[0.03]">
              <div className="rounded-2xl overflow-hidden aspect-[3/4] relative bg-slate-200">
                <img 
                  src="/authority-stecca.png" 
                  alt="Leandro Stecca"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-[#64748B] text-sm font-bold tracking-widest uppercase mb-4">
              SOBRE O AUTOR
            </div>
            <h2 className="text-[#0F172A] text-[clamp(2.5rem,4vw,3.5rem)] font-[800] leading-[1.1] tracking-tight mb-8">
              Leandro Stecca
            </h2>
            
            <div className="space-y-6 text-[#64748B] text-[1.125rem] leading-[1.7] mb-10">
              <p>Leandro Stecca é dentista há quase 30 anos. E já viveu exatamente o que você vive hoje.</p>
              <p>Agenda lotada. Faturamento alto. E no fim do mês, sobra nada. Doze horas por dia. Cansado. Sem entender para onde o dinheiro ia.</p>
              <p>Não era falta de paciente. Não era crise. Era preço errado. Matemática básica que ninguém ensina na faculdade.</p>
              <p>Quando aprendeu a precificar certo, tudo mudou. Mesma agenda. Mesmo faturamento. Lucro triplicado. E o melhor: tempo para viver.</p>
              <p>Hoje, Leandro ajuda dentistas a saírem dessa armadilha. Sem promessa idiota de 'fature 300 mil'. Com a verdade: dá para viver bem da odontologia sem ficar preso ao mocho e aos custos altos.</p>
            </div>

            <div className="relative pl-8 mb-8">
              <div className="absolute top-0 left-0 text-6xl text-[#00A88E]/20 font-serif leading-none mt-2">"</div>
              <p className="text-2xl text-[#0F172A] font-serif font-bold italic relative z-10 leading-tight">
                Faturamento é vaidade.<br/>Lucro é sanidade.
              </p>
            </div>
            
            <div className="text-[#0F172A] font-bold text-lg">
              — Leandro Stecca
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

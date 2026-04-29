import { motion } from "framer-motion";
import step01 from "@assets/step-01_1777343233008.webp";
import step02 from "@assets/step-02_1777343233007.webp";
import step03 from "@assets/step-03_1777343233003.webp";

export const TruthAndSteps = () => {
  return (
    <section className="bg-[#0A1428] py-[clamp(100px,12vw,160px)] px-6 overflow-hidden">
      <div className="container mx-auto max-w-[1000px]">
        
        {/* The Truth Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="text-[#00A88E] text-sm font-bold tracking-widest uppercase mb-8">
            A verdade é esta:
          </div>
          
          <div className="space-y-6 mb-16 text-xl md:text-2xl font-medium text-white/90">
            <p>Não adianta lotar a agenda do parceiro.</p>
            <div className="w-12 h-px bg-white/10 mx-auto"></div>
            <p>Não adianta aumentar o faturamento.</p>
            <div className="w-12 h-px bg-white/10 mx-auto"></div>
            <p className="text-white">Se a estratégia de remuneração estiver errada, você vai continuar no prejuízo — sem saber por quê.</p>
          </div>

          <div className="bg-[#050B18] border border-white/5 rounded-3xl p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] my-16">
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-[800] leading-[1.1] tracking-tight">
              <span className="text-white">Faturamento é </span>
              <span className="text-[#EF4444] drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">VAIDADE.</span>
              <br/>
              <span className="text-white">Lucro é </span>
              <span className="text-[#00A88E] drop-shadow-[0_0_15px_rgba(0,168,142,0.3)]">SANIDADE.</span>
            </h2>
          </div>

          <div className="max-w-[700px] mx-auto space-y-6 text-lg text-[#64748B] leading-relaxed">
            <p>
              E a boa notícia? Você não precisa demitir o parceiro. Você não precisa aumentar o preço do paciente. Você só precisa usar a estratégia certa.
            </p>
            <p className="text-white font-medium">
              E é exatamente isso que o Protocolo do Dentista Parceiro Lucrativo faz por você ↓
            </p>
          </div>
        </motion.div>

        {/* Steps Block */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white text-center mb-16">
            É mais simples do que você imagina. Olha só:
          </h3>

          <div className="space-y-12 relative">
            {/* Connecting line */}
            <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 w-px bg-gradient-to-b from-[#00A88E]/0 via-[#00A88E]/30 to-[#00A88E]/0 hidden md:block"></div>

            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative"
            >
              <div className="w-full md:w-1/2 text-left md:text-right order-2 md:order-1">
                <div className="text-[#00A88E] font-bold tracking-widest text-sm mb-2">PASSO 01</div>
                <h4 className="text-2xl font-bold text-white mb-4">Você coloca seus custos reais</h4>
                <p className="text-[#64748B] text-lg">
                  Aqui, você coloca a remuneração mais lucrativa para a parceria.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-[#050B18] border-4 border-[#0A1428] flex items-center justify-center -translate-x-1/2 z-10 text-[#00A88E] font-bold hidden md:flex">
                1
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <img
                  src={step01}
                  alt="Passo 01 — Despesas Fixas e Variáveis"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  width="600"
                  height="380"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative"
            >
              <div className="w-full md:w-1/2 order-2 md:order-2 text-left">
                <div className="text-[#00A88E] font-bold tracking-widest text-sm mb-2">PASSO 02</div>
                <h4 className="text-2xl font-bold text-white mb-4">A calculadora faz a conta pra você</h4>
                <p className="text-[#64748B] text-lg mb-4">
                  Ela cruza TUDO e mostra:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2 text-white/80">
                    <span className="text-[#00A88E] mt-1">•</span> Seu parceiro está te dando lucro ou prejuízo
                  </li>
                  <li className="flex items-start gap-2 text-white/80">
                    <span className="text-[#00A88E] mt-1">•</span> Quanto você perde por procedimento hoje
                  </li>
                  <li className="flex items-start gap-2 text-white/80">
                    <span className="text-[#00A88E] mt-1">•</span> Qual o valor correto de repasse para você finalmente lucrar
                  </li>
                </ul>
                <div className="text-sm text-[#00A88E] font-medium bg-[#00A88E]/10 py-2 px-4 rounded-lg inline-block">
                  Automático. Sem Excel. Sem dor de cabeça.
                </div>
              </div>
              <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-[#050B18] border-4 border-[#0A1428] flex items-center justify-center -translate-x-1/2 z-10 text-[#00A88E] font-bold hidden md:flex">
                2
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-1">
                <img
                  src={step02}
                  alt="Passo 02 — Custo Específico do Procedimento"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  width="600"
                  height="380"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16 relative"
            >
              <div className="w-full md:w-1/2 text-left md:text-right order-2 md:order-1">
                <div className="text-[#00A88E] font-bold tracking-widest text-sm mb-2">PASSO 03</div>
                <h4 className="text-2xl font-bold text-white mb-4">Você aplica e coloca a parceria no lugar certo</h4>
                <p className="text-[#64748B] text-lg">
                  Ajusta o modelo. Apresenta os números pro parceiro com segurança — sem conflito, sem perder o profissional. E o lucro que devia estar sobrando… aparece.
                </p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-14 h-14 rounded-full bg-[#050B18] border-4 border-[#0A1428] flex items-center justify-center -translate-x-1/2 z-10 text-[#00A88E] font-bold hidden md:flex">
                3
              </div>
              <div className="w-full md:w-1/2 order-1 md:order-2">
                <img
                  src={step03}
                  alt="Passo 03 — Resultados consolidados da Calculadora"
                  className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  width="600"
                  height="380"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};

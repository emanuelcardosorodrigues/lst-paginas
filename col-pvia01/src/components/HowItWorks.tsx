import { motion } from "motion/react";
import { SectionLabel } from "./ui/SectionLabel";
import { ClipboardList, Settings2, CircleDollarSign } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: ClipboardList,
      title: "Coloque seus custos",
      desc: "Laboratório, material, hora clínica, imposto. A calculadora tem todos os campos prontos.",
    },
    {
      num: "02",
      icon: Settings2,
      title: "Ajuste por procedimento",
      desc: "Cada especialidade tem custos diferentes. A calculadora personaliza.",
    },
    {
      num: "03",
      icon: CircleDollarSign,
      title: "Descubra o preço certo",
      desc: "Ela cruza tudo e mostra: quanto cobrar para lucrar de verdade. Automático.",
    },
  ];

  return (
    <section className="bg-card-grey py-16 md:py-[100px] px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="mb-16">
          <SectionLabel>COMO FUNCIONA</SectionLabel>
          <h2 className="text-[clamp(36px,4.5vw,64px)] leading-[1.1] tracking-[-0.01em] flex flex-wrap justify-center gap-x-3 gap-y-1">
            <span className="display-bold text-rich-black">3 passos.</span>
            <span className="display-bold text-rich-black">10 minutos.</span>
            <span className="display-accent">Lucro real.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-transparent text-left relative overflow-hidden group"
              >
                <div className="absolute -top-6 -right-6 font-body font-light text-[140px] leading-[0.85] text-rich-black/[0.04] select-none pointer-events-none transition-transform duration-700 group-hover:scale-105">
                  {step.num}
                </div>

                <div className="bg-white/60 backdrop-blur-sm w-14 h-14 rounded-xl flex items-center justify-center mb-6 relative border border-white">
                  <Icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                </div>

                <h3 className="font-body font-bold text-[clamp(20px,2vw,28px)] text-rich-black leading-[1.3] mb-3 relative">
                  {step.title}
                </h3>

                <p className="text-gray-500 font-body text-base leading-[1.6] relative">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-[80px] bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto border border-gray-100"
        >
          <div className="text-center">
            <span className="block font-body text-rich-black font-medium text-lg md:text-xl">
              Seus custos reais
            </span>
          </div>
          <div className="text-gray-300 font-light text-2xl">+</div>
          <div className="text-center">
            <span className="block font-body text-rich-black font-medium text-lg md:text-xl">
              Sua hora real
            </span>
          </div>
          <div className="text-gray-300 font-light text-2xl">+</div>
          <div className="text-center">
            <span className="block font-body text-rich-black font-medium text-lg md:text-xl">
              Sua margem
            </span>
          </div>
          <div className="text-gray-300 font-light text-2xl">=</div>
          <div className="text-center border-2 border-gold rounded-lg px-6 py-3 bg-gold/5 mt-4 md:mt-0">
            <span className="block font-display font-bold text-gold text-xl md:text-2xl">
              O valor exato que você deve cobrar
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

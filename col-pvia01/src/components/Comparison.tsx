import { motion } from "motion/react";
import { SectionLabel } from "./ui/SectionLabel";

export function Comparison() {
  return (
    <section className="bg-rich-black py-16 md:py-[100px] px-6 text-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <SectionLabel className="!min-w-fit">A CONTA QUE NINGUÉM FAZ</SectionLabel>
          <h2 className="text-[clamp(36px,4.5vw,64px)] leading-[1.1] tracking-[-0.01em] max-w-[800px]">
            <span className="display-light text-white/40">Você </span>
            <span className="display-bold text-white">acha </span>
            <span className="display-light text-white/40">que lucra. </span>
            <span className="display-bold text-gold">A realidade </span>
            <span className="display-light text-white/40">é outra.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative pb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-trust-green rounded-2xl p-10 flex flex-col justify-center items-center text-center min-h-[320px]"
          >
            <h3 className="uppercase tracking-widest text-[13px] font-medium text-white/80 mb-6">
              Você acha que:
            </h3>
            <div className="text-white/80 font-medium text-xl mb-2">Lente</div>
            <div className="font-body font-bold text-5xl md:text-6xl text-white mb-6">R$2.500</div>
            <div className="bg-black/20 px-6 py-2 rounded-full font-medium text-white">
              = Lucro bom
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-danger-red rounded-2xl p-8 md:p-10"
          >
            <h3 className="uppercase tracking-widest text-[13px] font-medium text-white/80 mb-6 text-center">
              Realidade:
            </h3>

            <ul className="space-y-4 font-body text-lg text-white/90 mb-8 border-b border-white/20 pb-8">
              <li className="flex justify-between font-bold text-white text-xl">
                <span>Lente</span> <span>R$ 2.500</span>
              </li>
              <li className="flex justify-between">
                <span>Laboratório</span> <span>– R$ 800</span>
              </li>
              <li className="flex justify-between">
                <span>Descontos</span> <span>– R$ 250</span>
              </li>
              <li className="flex justify-between">
                <span>Material</span> <span>– R$ 100</span>
              </li>
              <li className="flex justify-between">
                <span>Impostos/taxas</span> <span>– R$ 520</span>
              </li>
              <li className="flex justify-between">
                <span>Hora clínica</span> <span>– R$ 600</span>
              </li>
              <li className="flex justify-between">
                <span>Retornos</span> <span>– R$ 150</span>
              </li>
            </ul>

            <div className="flex flex-col items-center">
              <div className="text-white/80 font-medium text-lg uppercase tracking-wide mb-2">
                Lucro final:
              </div>
              <div className="font-body font-bold text-4xl border-2 border-gold text-white rounded-lg px-8 py-3 bg-black/20 inline-block">
                R$ 80
              </div>
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-8 border-t border-white/10 pt-16">
          <p className="text-[clamp(36px,4.5vw,64px)] leading-[1.1]">
            <span className="font-display font-normal text-white">Faturamento é </span>
            <span className="font-display font-bold text-white">VAIDADE.</span>
            <br />
            <span className="font-display font-normal text-gold">Lucro é </span>
            <span className="font-display font-bold text-gold">SANIDADE.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

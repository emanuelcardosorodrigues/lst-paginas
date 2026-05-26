import { motion } from "motion/react";
import { VturbPlayer } from "./VturbPlayer";

export function VideoDemo() {
  return (
    <section className="bg-ice-blue py-16 md:py-[100px] px-6">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="text-[clamp(36px,4.5vw,64px)] leading-[1.1] tracking-[-0.01em] mb-12">
          <span className="display-light text-rich-black/40">Veja por dentro </span>
          <span className="display-bold text-rich-black">da Calculadora OdontoLucro</span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <VturbPlayer />
        </motion.div>

        <p className="font-body text-gray-500 text-base mt-8">
          Sem enrolação. Coloca os números, a calculadora faz a conta.
        </p>
      </div>
    </section>
  );
}

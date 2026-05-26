import { motion } from "motion/react";
import { Button } from "./ui/Button";
import { SectionLabel } from "./ui/SectionLabel";
import { TrustIndicators } from "./ui/TrustIndicators";
import { goToPricing } from "../lib/checkout";

export function Hero() {
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section className="bg-ice-blue pt-6 md:pt-[140px] pb-8 md:pb-[100px] px-5 lg:px-[60px] overflow-hidden">
      <div className="max-w-[1000px] mx-auto flex flex-col items-center text-center">
        <div className="flex flex-col items-center w-full">
          <div className="font-display italic text-gold text-base md:text-2xl mb-1 md:mb-3">
            Calculadora OdontoLucro
          </div>

          <SectionLabel className="!text-[10px] md:!text-[13px] !mb-2 md:!mb-4">
            PARA DENTISTAS QUE QUEREM LUCRAR MAIS!
          </SectionLabel>

          <h1 className="text-[clamp(22px,5.5vw,68px)] leading-[1.18] md:leading-[1.08] tracking-[-0.02em] mb-3 md:mb-6 max-w-[920px]">
            <motion.span custom={0} variants={titleVariants} initial="hidden" animate="visible" className="display-light text-rich-black/40">A calculadora </motion.span>
            <motion.span custom={1} variants={titleVariants} initial="hidden" animate="visible" className="display-bold">simples </motion.span>
            <motion.span custom={2} variants={titleVariants} initial="hidden" animate="visible" className="display-light text-rich-black/40">que coloca o </motion.span>
            <motion.span custom={3} variants={titleVariants} initial="hidden" animate="visible" className="display-accent">preço lucrativo </motion.span>
            <motion.span custom={4} variants={titleVariants} initial="hidden" animate="visible" className="display-light text-rich-black/40">nos seus procedimentos </motion.span>
            <motion.span custom={5} variants={titleVariants} initial="hidden" animate="visible" className="display-bold">em 10 minutos</motion.span>
          </h1>

          <p className="hidden md:block font-body text-lg text-gray-500 max-w-[600px] leading-[1.6]">
            A calculadora que cruza seus custos reais — laboratório, material, hora clínica, imposto — e mostra o preço exato por procedimento. Sem planilha complicada, sem achismo.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
            className="w-full mt-3 md:mt-10 flex justify-center relative z-10"
          >
            <img
              src="/p/col-pvia01/mockup.webp"
              alt="Calculadora OdontoLucro: Masterclass + Calculadora + Aulas + Reforma Tributária"
              width={2000}
              height={923}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="w-full max-w-[900px] h-auto max-h-[160px] md:max-h-none object-contain drop-shadow-2xl"
            />
          </motion.div>

          <Button
            className="mt-4 md:mt-10 w-full sm:w-auto sm:min-w-[320px] !py-3.5 md:!py-4"
            onClick={goToPricing}
          >
            Quero Lucrar de Verdade &rarr;
          </Button>

          <TrustIndicators className="mt-3 md:mt-6 justify-center !text-[11px] md:!text-sm" />
        </div>
      </div>
    </section>
  );
}

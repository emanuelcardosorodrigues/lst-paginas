import { motion } from "motion/react";

export function About() {
  return (
    <section className="bg-ice-blue py-16 md:py-[100px] px-6">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-[400px] mx-auto w-full aspect-[4/5] md:aspect-auto md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-white/50"
        >
          <img
            src="/p/col-pvia01/foto-leandro.webp"
            alt="Dr. Leandro Stecca"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display font-bold text-4xl text-rich-black mb-4">
            Dr. Leandro Stecca
          </h2>

          <h3 className="font-body text-lg text-gray-500 leading-relaxed mb-6">
            Quase 30 anos de experiência. Clínicas em 3 estados. O dentista que parou de faturar e começou a lucrar.
          </h3>

          <p className="font-body text-base text-gray-500 leading-relaxed mb-8">
            Depois de anos com agenda cheia e bolso vazio, construiu uma metodologia de precificação que transformou sua realidade — e a de centenas de colegas.
          </p>

          <blockquote className="border-l-4 border-gold pl-6 py-2">
            <p className="font-display italic text-2xl text-gold leading-tight">
              "Faturamento é vaidade,<br />LUCRO é sanidade."
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

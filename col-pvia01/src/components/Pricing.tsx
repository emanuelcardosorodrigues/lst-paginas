import { motion } from "motion/react";
import { Button } from "./ui/Button";
import { ShieldCheck } from "lucide-react";
import { goToCheckout } from "../lib/checkout";

export function Pricing() {
  return (
    <section id="pricing" className="bg-rich-black py-16 md:py-[100px] px-6">
      <div className="max-w-[800px] mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 md:p-12 w-full max-w-[520px] shadow-[0_16px_48px_rgba(0,0,0,0.2)] text-center relative overflow-hidden"
        >
          <h3 className="uppercase tracking-widest text-[13px] font-medium text-gold mb-6">
            Calculadora OdontoLucro
          </h3>

          <img
            src="/p/col-pvia01/mockup.webp"
            alt="Calculadora OdontoLucro: Masterclass + Calculadora + Aulas"
            width={1100}
            height={508}
            loading="lazy"
            decoding="async"
            className="w-full max-w-[360px] h-auto mx-auto mb-6 object-contain"
          />

          <div className="space-y-1 mb-8">
            <div className="text-gray-400 font-medium line-through">De R$ 588</div>
            <div className="text-5xl font-display font-bold text-rich-black">
              <span className="text-2xl font-body font-medium align-top mr-1 block sm:inline">
                12x de
              </span>
              R$ 8,80
            </div>
            <div className="text-gray-500 font-medium">ou R$ 67 à vista</div>
          </div>

          <Button
            className="w-full !py-4 !text-lg mb-6"
            data-gtm-id="cta-pricing"
            onClick={goToCheckout}
          >
            Quero Lucrar de Verdade &rarr;
          </Button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-2 text-[14px] text-gray-500 font-medium">
            <span>✅ Acesso vitalício</span>
            <span className="hidden sm:inline text-gray-300">·</span>
            <span>✅ Sem mensalidade</span>
            <span className="hidden sm:inline text-gray-300">·</span>
            <span>✅ Sem renovação</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 max-w-[520px] flex flex-col md:flex-row items-center gap-6 text-center md:text-left"
        >
          <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center shrink-0">
            <ShieldCheck className="w-8 h-8 text-gold" strokeWidth={1.5} />
          </div>
          <p className="font-body text-base text-white/80 leading-relaxed">
            Use por 7 dias. Se não valer cada centavo, devolvo 100% do seu dinheiro. Sem perguntas. O risco é todo meu.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

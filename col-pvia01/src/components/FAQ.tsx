import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionLabel } from "./ui/SectionLabel";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Não entendo de Excel. Consigo usar?",
      a: "Sim. Plug and play. Você digita os números, ela faz a conta.",
    },
    {
      q: "Funciona para qualquer especialidade?",
      a: "Sim. A calculadora personaliza por procedimento.",
    },
    {
      q: "Quanto tempo leva pra ver resultado?",
      a: "10 minutos. Você já sai com o preço certo no mesmo dia.",
    },
    {
      q: "E se eu não gostar?",
      a: "Garantia de 7 dias. Devolvemos 100%, sem perguntas.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-card-grey py-16 md:py-[100px] px-6">
      <div className="max-w-[720px] mx-auto text-center">
        <SectionLabel>DÚVIDAS RÁPIDAS</SectionLabel>

        <h2 className="text-[clamp(36px,4.5vw,64px)] leading-[1.1] tracking-[-0.01em] mb-12">
          <span className="display-bold text-rich-black">Dúvidas </span>
          <span className="display-accent">rápidas</span>
        </h2>

        <div className="text-left bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border-b border-rich-black/5 last:border-0 ${idx === 0 ? "pt-0" : "pt-6"} ${idx === faqs.length - 1 ? "pb-0" : "pb-6"}`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="font-body font-medium text-lg text-rich-black pr-8">
                    {faq.q}
                  </span>
                  <span className="shrink-0 text-gold transition-transform duration-300">
                    {isOpen ? (
                      <Minus strokeWidth={2} className="w-5 h-5" />
                    ) : (
                      <Plus strokeWidth={2} className="w-5 h-5" />
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 font-body text-base text-gray-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

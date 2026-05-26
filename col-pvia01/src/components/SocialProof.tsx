import { motion } from "motion/react";
import { SectionLabel } from "./ui/SectionLabel";

export function SocialProof() {
  return (
    <section className="bg-card-grey py-[100px] px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <SectionLabel>PROVA SOCIAL</SectionLabel>
          <h2 className="text-[clamp(36px,4.5vw,56px)] leading-[1.1] tracking-[-0.01em]">
            <span className="display-light text-rich-black/40">Quem já usa a </span>
            <span className="display-bold text-rich-black">OdontoLucro</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 md:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <div className="bg-[#E9ECF1] rounded-2xl overflow-hidden shadow-lg border border-white/50 flex flex-col md:flex-row relative">
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <p className="font-body text-rich-black text-lg md:text-xl font-medium leading-relaxed mb-6">
                  “Finalmente entendi o real valor da minha hora clínica.{" "}
                  <strong className="font-bold">
                    Isso mudou completamente como eu precificado meus serviços.
                  </strong>”
                </p>
                <p className="uppercase text-[11px] tracking-wider text-gray-500 font-medium">
                  Dra. Maria Midori
                </p>
              </div>
              <div className="md:w-1/2 h-[300px] relative bg-[#E9ECF1]">
                <img
                  src="/p/col-pvia01/dra-maria.webp"
                  alt="Dra. Maria Midori"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full max-w-[400px] mx-auto lg:ml-12 rotate-[-1deg] hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col border border-gray-100">
                <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-[13px]">Dra. Maria Midori</span>
                    <span className="text-white/70 text-[11px]">online</span>
                  </div>
                </div>
                <div className="bg-[#E5DDD5] p-5 flex flex-col gap-3 min-h-[160px]">
                  <div className="bg-[#DCF8C6] self-end rounded-lg p-3 max-w-[95%] shadow-sm relative text-sm text-[#303030] rounded-tr-none">
                    <p className="leading-relaxed">
                      Boa tarde Leandro! Acabei de rodar a calculadora aqui e descobri que estava pagando pra trabalhar em alguns procedimentos. 😬
                    </p>
                    <div className="text-[10px] text-gray-500 text-right mt-1 font-medium">
                      14:23 <span className="text-[#4FC3F7]">✓✓</span>
                    </div>
                  </div>
                  <div className="bg-[#DCF8C6] self-end rounded-lg p-3 max-w-[95%] shadow-sm relative text-sm text-[#303030]">
                    <p className="leading-relaxed">
                      Ajustei na hora. O paciente fechou e a margem agora está correta. Muito obrigada por essa ferramenta, salvou meu mês!
                    </p>
                    <div className="text-[10px] text-gray-500 text-right mt-1 font-medium">
                      14:25 <span className="text-[#4FC3F7]">✓✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <div className="w-full max-w-[400px] mx-auto lg:mr-12 rotate-[1deg] hover:rotate-0 transition-transform duration-300 order-2 lg:order-1">
              <div className="bg-white rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col border border-gray-100">
                <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-[13px]">Dr. Otávio Fortes</span>
                    <span className="text-white/70 text-[11px]">online</span>
                  </div>
                </div>
                <div className="bg-[#E5DDD5] p-5 flex flex-col gap-3 min-h-[160px]">
                  <div className="bg-[#DCF8C6] self-end rounded-lg p-3 max-w-[95%] shadow-sm relative text-sm text-[#303030] rounded-tr-none">
                    <p className="leading-relaxed">
                      Meu amigo, isso é um divisor de águas. Trinta anos de profissão pra finalmente ter certeza de quanto a minha hora clínica realmente custa.
                    </p>
                    <div className="text-[10px] text-gray-500 text-right mt-1 font-medium">
                      09:12 <span className="text-[#4FC3F7]">✓✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#E9ECF1] rounded-2xl overflow-hidden shadow-lg border border-white/50 flex flex-col md:flex-row relative order-1 lg:order-2">
              <div className="md:w-1/2 h-[300px] relative order-2 md:order-1 bg-[#E9ECF1]">
                <img
                  src="/p/col-pvia01/dr-otavio.webp"
                  alt="Dr. Otávio Fortes"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2 flex flex-col justify-center order-1 md:order-2">
                <p className="font-body text-rich-black text-lg md:text-xl font-medium leading-relaxed mb-6">
                  “É para que as pessoas{" "}
                  <strong className="font-bold">tenham acesso a algo que pode salvar a carreira delas.</strong>”
                </p>
                <p className="uppercase text-[11px] tracking-wider text-gray-500 font-medium">
                  Dr. Otávio Fortes
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

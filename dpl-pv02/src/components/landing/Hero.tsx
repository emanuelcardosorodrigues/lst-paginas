import { motion } from "framer-motion";
import heroBundle from "@assets/hero-bundle_(2)_1777342976622.webp";

export const Hero = () => {
  return (
    <section className="relative pt-[clamp(100px,12vw,160px)] pb-[clamp(60px,8vw,100px)] bg-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[radial-gradient(circle_at_center,rgba(0,168,142,0.08)_0%,transparent_60%)] -z-10" />

      <div className="container mx-auto px-6 max-w-[980px] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#F1F5F9] text-[#00A88E] text-[11px] font-bold tracking-[0.08em] uppercase mb-8">
            INTELIGÊNCIA FINANCEIRA PARA DENTISTAS
          </div>

          <h1 className="text-[clamp(2rem,5vw,3.75rem)] leading-[1.1] font-[800] tracking-[-0.02em] text-[#0F172A] mb-6 max-w-[920px]">
            A calculadora simples que te diz — em <span className="text-[#00A88E]">dez minutos</span> — o valor exato que você deve pagar ao dentista parceiro para finalmente <span className="text-[#00A88E]">sair do mocho.</span>
          </h1>

          <p className="text-[#64748B] text-[1.125rem] leading-[1.7] mb-10 max-w-[640px]">
            Descubra muito mais do que o preço certo. Aplique a estratégia de remuneração lucrativa — para os dois — e se proteja judicialmente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <img
            src={heroBundle}
            alt="Bundle do Protocolo Dentista Parceiro Lucrativo: calculadora, masterclass, vídeos e bônus"
            className="w-full h-auto object-contain max-w-[900px] mx-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <a
            href="https://pay.hotmart.com/V103826709U?off=vju7un99&checkoutMode=10&offDiscount=ESPECIALDPL&split=11"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00A88E] hover:bg-[#00967F] text-white font-bold px-[36px] py-[18px] rounded-full transition-all duration-300 hover:-translate-y-[2px] shadow-[0_10px_25px_rgba(0,168,142,0.25)] hover:shadow-[0_15px_30px_rgba(0,168,142,0.4)] mb-6 inline-block"
          >
            GARANTIR MEU ACESSO AGORA →
          </a>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[#64748B] text-sm font-medium">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00A88E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Acesso imediato
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00A88E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Garantia de 7 dias
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#00A88E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Pagamento único
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { img } from "@/lib/imgPath";

export const Offer = () => {
  return (
    <section className="bg-[#050B18] py-[clamp(100px,12vw,160px)] px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,168,142,0.15)_0%,transparent_70%)] -z-10" />

      <div className="container mx-auto max-w-[800px] text-center">
        <div className="text-[#00A88E] text-sm font-bold tracking-widest uppercase mb-4">
          OFERTA POR TEMPO LIMITADO
        </div>
        <h2 className="text-white text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight mb-6">
          Retome o lucro da sua clínica agora.
        </h2>
        <p className="text-[#F8F9FA]/80 text-[1.125rem] mb-10">
          O bundle completo do Protocolo DPL com acesso imediato.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[480px] mx-auto mb-10"
        >
          <img
            src={img("bundle-860.webp")}
            alt="Bundle Protocolo DPL"
            className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,168,142,0.2)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/[0.02] backdrop-blur-sm rounded-[32px] p-8 md:p-12 border border-white/10 shadow-[0_0_60px_rgba(0,168,142,0.1)] relative"
        >
          <div className="absolute inset-0 rounded-[32px] border border-[#00A88E]/20 pointer-events-none" />
          
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Acesso Completo ao Protocolo DPL
          </h3>

          <div className="flex flex-col gap-4 text-left max-w-[500px] mx-auto mb-12">
            {[
              "Calculadora do Dentista Parceiro Lucrativo",
              "Consultor de Precificação com IA",
              "Masterclass: Custos Ocultos e Como Lucrar",
              "Bônus: Como Dobrar Seu Lucro em 6 Meses",
              "Atualizações vitalícias",
              "Garantia incondicional de 7 dias"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <Check className="text-[#00A88E] shrink-0" size={20} />
                <span className="text-white/90 font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <div className="flex items-baseline justify-center gap-3 mb-2">
              <span className="text-[#64748B] font-medium text-lg">De</span>
              <span className="text-[#64748B] font-medium text-lg line-through">R$ 935,00</span>
            </div>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl md:text-7xl font-[800] text-white tracking-tighter">R$ 67,04</span>
              <span className="text-white/60 font-medium">à vista</span>
            </div>
            <div className="text-[#00A88E] font-medium mt-2">ou 12x de R$ 6,68</div>
          </div>

          <a
            href="https://pay.hotmart.com/V103826709U?off=vju7un99&checkoutMode=10&offDiscount=ESPECIALDPL&split=11"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-w-[300px] bg-[#00A88E] hover:bg-[#00967F] text-white font-bold px-[36px] py-[22px] text-lg rounded-full transition-all duration-300 hover:-translate-y-[2px] shadow-[0_10px_25px_rgba(0,168,142,0.25)] hover:shadow-[0_15px_30px_rgba(0,168,142,0.4)] mb-6 inline-block text-center"
          >
            GARANTIR MEU ACESSO AGORA →
          </a>

          <div className="flex items-center justify-center gap-2 text-white/50 text-sm font-medium">
            <ShieldCheck size={16} />
            Pagamento 100% seguro. Garantia de 7 dias.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

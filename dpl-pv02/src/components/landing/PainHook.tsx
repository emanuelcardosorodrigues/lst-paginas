import { motion } from "framer-motion";
import { img } from "@/lib/imgPath";

export const PainHook = () => {
  return (
    <section className="bg-[#050B18] py-24 px-6 text-center">
      <div className="container mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-[#64748B] text-sm font-bold tracking-widest uppercase mb-6">
            VOCÊ TROUXE UM PARCEIRO PRA CRESCER...
          </div>
          
          <h2 className="text-white text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight mb-8">
            ...e está ganhando <span className="text-[#EF4444]">MENOS</span> que antes?
          </h2>
          
          <p className="text-[#F8F9FA]/80 text-[1.125rem] leading-[1.7] max-w-[600px] mx-auto mb-10">
            Faturamento subiu. Folha subiu. Imposto subiu. Lucro sumiu. O problema quase sempre é o modelo de remuneração errado.
          </p>

          <div className="max-w-[480px] mx-auto">
            <img
              src={img("pain-percentual.webp")}
              alt="Papel amassado com percentuais de repasse"
              className="w-full h-auto rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

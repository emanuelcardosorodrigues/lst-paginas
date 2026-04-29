import { motion } from "framer-motion";

export const FinalCTA = () => {
  return (
    <section className="bg-[#050B18] py-24 px-6 text-center">
      <div className="container mx-auto max-w-[800px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-white text-[clamp(2rem,3.5vw,2.5rem)] font-[800] leading-[1.2] tracking-tight mb-6">
            Pare de bancar a operação do seu parceiro.
          </h2>
          
          <p className="text-[#F8F9FA]/80 text-[1.125rem] mb-10">
            Em poucos minutos, você sai do achismo e passa a operar com números.
          </p>

          <button className="w-full sm:w-auto bg-[#00A88E] hover:bg-[#00967F] text-white font-bold px-[36px] py-[20px] text-lg rounded-full transition-all duration-300 hover:-translate-y-[2px] shadow-[0_10px_25px_rgba(0,168,142,0.25)] hover:shadow-[0_15px_30px_rgba(0,168,142,0.4)]">
            GARANTIR MEU ACESSO AGORA →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

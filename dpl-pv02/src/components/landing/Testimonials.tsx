import { motion } from "framer-motion";
import { Star } from "lucide-react";

export const Testimonials = () => {
  return (
    <section className="bg-[#F8F9FA] py-[clamp(100px,12vw,160px)] px-6">
      <div className="container mx-auto max-w-[1000px]">
        
        <div className="text-center mb-16">
          <div className="text-[#64748B] text-sm font-bold tracking-widest uppercase mb-4">
            DEPOIMENTOS
          </div>
          <h2 className="text-[#0F172A] text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight">
            Veja o que mudou para quem já aplica o Protocolo Dentista Parceiro Lucrativo
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/[0.03] relative flex flex-col"
          >
            <div className="absolute top-6 right-8 text-6xl text-[#00A88E]/20 font-serif leading-none">"</div>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#00A88E] text-[#00A88E]" />
              ))}
            </div>
            <p className="text-[#0F172A] text-lg font-medium leading-relaxed mb-8 flex-grow">
              "Finalmente entendi o real valor da minha hora clínica. Isso mudou completamente como eu precificava meus serviços."
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="/testimonial-maria.png" 
                alt="Dra. Maria Midori" 
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <div className="font-bold text-[#0F172A]">Dra. Maria Midori</div>
                <div className="text-sm text-[#64748B]">São João del-Rei/MG</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/[0.03] relative flex flex-col"
          >
            <div className="absolute top-6 right-8 text-6xl text-[#00A88E]/20 font-serif leading-none">"</div>
            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#00A88E] text-[#00A88E]" />
              ))}
            </div>
            <p className="text-[#0F172A] text-lg font-medium leading-relaxed mb-8 flex-grow">
              "É para que as pessoas tenham acesso a algo que pode salvar a carreira delas."
            </p>
            <div className="flex items-center gap-4">
              <img 
                src="/testimonial-otavio.png" 
                alt="Dr. Otávio Fartes" 
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
              />
              <div>
                <div className="font-bold text-[#0F172A]">Dr. Otávio Fartes</div>
                <div className="text-sm text-[#64748B]">Instituto Odontológico</div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

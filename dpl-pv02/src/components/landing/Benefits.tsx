import { motion } from "framer-motion";
import { Eye, Sliders, Moon, LineChart, CalendarCheck, MessageSquare } from "lucide-react";

export const Benefits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const benefits = [
    { icon: Eye, title: "Clareza", body: "Saiba exatamente se seu parceiro está te dando lucro ou prejuízo" },
    { icon: Sliders, title: "Controle", body: "Defina o repasse certo — sem achismo, sem pressão do parceiro" },
    { icon: Moon, title: "Paz", body: "Durma tranquilo sabendo que a parceria fecha no azul" },
    { icon: LineChart, title: "Previsibilidade", body: "Planeje a clínica com números reais — não com esperança" },
    { icon: CalendarCheck, title: "Agenda cheia que VALE A PENA", body: "A clínica funciona e lucra mesmo quando você não está no mocho" },
    { icon: MessageSquare, title: "Confiança", body: "Negocie o modelo de remuneração com o parceiro sem gaguejar" }
  ];

  return (
    <section className="bg-[#F8F9FA] py-[clamp(100px,12vw,160px)] px-6">
      <div className="container mx-auto max-w-[1200px]">
        <div className="text-center mb-16">
          <div className="text-[#64748B] text-sm font-bold tracking-widest uppercase mb-4">
            O que muda quando você aplica o Protocolo:
          </div>
          <h2 className="text-[#0F172A] text-[clamp(2rem,4vw,3rem)] font-[800] leading-[1.2] tracking-tight max-w-[800px] mx-auto">
            Você está a um clique de finalmente LUCRAR com a sua parceria e sair do mocho!
          </h2>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {benefits.map((b, i) => (
            <motion.div key={i} variants={itemVariants} className="bg-white rounded-3xl p-8 border border-black/[0.03] shadow-[0_10px_30px_rgba(0,0,0,0.02)] flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#00A88E]/10 flex items-center justify-center text-[#00A88E] mb-6 group-hover:scale-110 transition-transform duration-300">
                <b.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{b.title}</h3>
              <p className="text-[#64748B] leading-relaxed">{b.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
